import { formatLabelToDisplay } from "@/lib/battle-hub/formats";
import type { BattleEventWithParticipants } from "@/lib/battle-hub/types";
import { createClient } from "@/lib/supabase/server";
import { createServiceRoleClient } from "@/lib/supabase/service-role";
import {
  buildBattleMatchedEmail,
  buildBattlePromotedEmail,
  buildBattleReminderEmail,
  formatBattleEmailDateTime,
} from "@/lib/email/templates/battle-emails";
import { sendTransactionalEmail } from "@/lib/email/send-email";
import { absoluteUrl } from "@/lib/site-url";

function sortParticipants(ev: BattleEventWithParticipants): BattleEventWithParticipants {
  const parts = ev.battle_event_participants ?? [];
  return {
    ...ev,
    battle_event_participants: [...parts].sort((a, b) => a.slot_order - b.slot_order),
  };
}

/** Deduplicate by lowercase email; preserve first occurrence order. */
function uniqueEmails(emails: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const e of emails) {
    const t = e.trim().toLowerCase();
    if (!t || seen.has(t)) continue;
    seen.add(t);
    out.push(e.trim());
  }
  return out;
}

/**
 * Loads emails for arbitrary member user ids. Requires service role: RLS only allows
 * self-or-staff profile reads, so the cookie session cannot see other participants' emails.
 */
async function loadEmailsForUserIds(userIds: string[]): Promise<Map<string, string>> {
  const ids = [...new Set(userIds)].filter(Boolean);
  const map = new Map<string, string>();
  if (ids.length === 0) return map;

  const admin = createServiceRoleClient();
  const client = admin;
  if (!client) {
    console.warn(
      "[battle-email] SUPABASE_SERVICE_ROLE_KEY unset; cannot load other participants' emails. Set it on the server for battle notifications.",
    );
    return map;
  }

  const { data, error } = await client.from("profiles").select("id, email").in("id", ids);
  if (error) {
    console.warn("[battle-email] profiles email lookup:", error.message);
    return map;
  }
  for (const row of data ?? []) {
    const id = row.id as string;
    const em = row.email;
    if (em && String(em).trim()) map.set(id, String(em).trim());
  }
  return map;
}

/**
 * After a battle_request becomes matched: notify creator + everyone who joined a slot.
 * Idempotent via battle_requests.matched_email_sent_at + mark_battle_request_matched_email_sent RPC.
 */
export async function sendBattleMatchedEmail(requestId: string): Promise<void> {
  const supabase = await createClient();
  const { data: req, error: reqErr } = await supabase
    .from("battle_requests")
    .select("id, title, status, participant_count, preferred_format, matched_email_sent_at, battle_request_slots(*)")
    .eq("id", requestId)
    .maybeSingle();

  if (reqErr || !req) {
    console.warn("[battle-email] matched: request not loaded", reqErr?.message);
    return;
  }
  if (req.status !== "matched" || req.matched_email_sent_at) return;

  type SlotRow = { joined_by: string | null; tiktok_username: string | null; slot_order: number };
  const slots = [...((req.battle_request_slots as SlotRow[] | null) ?? [])].sort((a, b) => a.slot_order - b.slot_order);
  const userIds = [...new Set(slots.map((s) => s.joined_by).filter(Boolean))] as string[];
  const emailByUser = await loadEmailsForUserIds(userIds);
  const handles = slots
    .map((s) => String(s.tiktok_username ?? "").replace(/^@/, "").trim())
    .filter((h) => h.length > 0);

  const formatLabel = formatLabelToDisplay(String(req.preferred_format ?? ""), Number(req.participant_count) || 2);
  const title = (req.title && String(req.title).trim()) || "Battle";

  const { subject, html, text } = buildBattleMatchedEmail({
    title,
    participantHandles: handles.length ? handles : ["(see Battle Finder)"],
    formatLabel,
    finderUrl: absoluteUrl(`/battle-hub/finder/${requestId}`),
    schedulerUrl: absoluteUrl("/battle-hub/scheduler"),
  });

  const recipients = uniqueEmails(userIds.map((id) => emailByUser.get(id)).filter((e): e is string => Boolean(e)));
  if (recipients.length === 0) {
    console.warn("[battle-email] matched: no recipient emails (check SUPABASE_SERVICE_ROLE_KEY)", requestId);
    return;
  }

  for (const to of recipients) {
    await sendTransactionalEmail({ to, subject, html, text });
  }

  const { data: marked, error: markErr } = await supabase.rpc("mark_battle_request_matched_email_sent", {
    p_request_id: requestId,
  });
  if (markErr) {
    console.error("[battle-email] matched: mark RPC failed", markErr.message);
  } else if (marked !== true) {
    console.warn("[battle-email] matched: mark returned false (already sent or not allowed)", requestId);
  }
}

/**
 * After promote_battle_finder_request creates battle_events: notify all roster participants.
 * Idempotent via battle_events.promoted_email_sent_at + mark_battle_event_promoted_email_sent RPC.
 */
export async function sendBattlePromotedEmail(eventId: string): Promise<void> {
  const supabase = await createClient();
  const { data: row, error } = await supabase
    .from("battle_events")
    .select("*, battle_event_participants(*)")
    .eq("id", eventId)
    .maybeSingle();

  if (error || !row) {
    console.warn("[battle-email] promoted: event not loaded", error?.message);
    return;
  }
  const ev = sortParticipants(row as BattleEventWithParticipants);
  if (ev.promoted_email_sent_at) return;

  const parts = ev.battle_event_participants ?? [];
  const userIds = [...new Set(parts.map((p) => p.profile_id).filter(Boolean))] as string[];
  const emailByUser = await loadEmailsForUserIds(userIds);
  const handles = parts.map((p) => String(p.tiktok_username ?? "").replace(/^@/, "").trim()).filter(Boolean);

  const whenLabel = formatBattleEmailDateTime(ev.scheduled_at, ev.timezone || "UTC");
  const title = (ev.title && String(ev.title).trim()) || "Battle";

  const { subject, html, text } = buildBattlePromotedEmail({
    title,
    participantHandles: handles.length ? handles : ["(see calendar)"],
    whenLabel,
    calendarUrl: absoluteUrl("/battle-hub/calendar"),
  });

  const recipients = uniqueEmails(userIds.map((id) => emailByUser.get(id)).filter((e): e is string => Boolean(e)));
  if (recipients.length === 0) {
    console.warn("[battle-email] promoted: no recipient emails (check SUPABASE_SERVICE_ROLE_KEY)", eventId);
    return;
  }

  for (const to of recipients) {
    await sendTransactionalEmail({ to, subject, html, text });
  }

  const { data: marked, error: markErr } = await supabase.rpc("mark_battle_event_promoted_email_sent", {
    p_event_id: eventId,
  });
  if (markErr) {
    console.error("[battle-email] promoted: mark RPC failed", markErr.message);
  } else if (marked !== true) {
    console.warn("[battle-email] promoted: mark returned false", eventId);
  }
}

/**
 * One upcoming-battle reminder for a single event (used by batch reminder job).
 * Marks reminder_sent_at via service role (cron has no user session).
 */
export async function sendBattleReminderEmail(eventId: string): Promise<void> {
  const admin = createServiceRoleClient();
  if (!admin) {
    console.warn("[battle-email] reminder: SUPABASE_SERVICE_ROLE_KEY unset; cannot load or mark event", eventId);
    return;
  }

  const { data: row, error } = await admin
    .from("battle_events")
    .select("*, battle_event_participants(*)")
    .eq("id", eventId)
    .maybeSingle();

  if (error || !row) {
    console.warn("[battle-email] reminder: event not loaded", error?.message);
    return;
  }
  const ev = sortParticipants(row as BattleEventWithParticipants);
  if (ev.reminder_sent_at || ev.status !== "scheduled") return;

  const parts = ev.battle_event_participants ?? [];
  const userIds = [...new Set(parts.map((p) => p.profile_id).filter(Boolean))] as string[];
  const emailByUser = await loadEmailsForUserIds(userIds);
  const recipients = uniqueEmails(userIds.map((id) => emailByUser.get(id)).filter((e): e is string => Boolean(e)));

  if (recipients.length > 0) {
    const handles = parts.map((p) => String(p.tiktok_username ?? "").replace(/^@/, "").trim()).filter(Boolean);
    const whenLabel = formatBattleEmailDateTime(ev.scheduled_at, ev.timezone || "UTC");
    const title = (ev.title && String(ev.title).trim()) || "Battle";
    const { subject, html, text } = buildBattleReminderEmail({
      title,
      participantHandles: handles.length ? handles : ["(see calendar)"],
      whenLabel,
      calendarUrl: absoluteUrl("/battle-hub/calendar"),
    });
    for (const to of recipients) {
      await sendTransactionalEmail({ to, subject, html, text });
    }
  } else {
    console.warn("[battle-email] reminder: no recipient emails; marking sent to avoid cron loops", eventId);
  }

  const { error: upErr } = await admin
    .from("battle_events")
    .update({ reminder_sent_at: new Date().toISOString() })
    .eq("id", eventId)
    .is("reminder_sent_at", null);

  if (upErr) {
    console.error("[battle-email] reminder: could not set reminder_sent_at", upErr.message);
  }
}

/**
 * Events starting in 60–120 minutes, scheduled, reminder not yet sent.
 * Query uses DB time; intended for Vercel cron or Supabase pg_cron calling an Edge Function / route.
 */
export async function findBattleEventsNeedingReminders(): Promise<BattleEventWithParticipants[]> {
  const admin = createServiceRoleClient();
  if (!admin) {
    console.warn("[battle-email] findBattleEventsNeedingReminders: SUPABASE_SERVICE_ROLE_KEY unset");
    return [];
  }

  const from = new Date(Date.now() + 60 * 60 * 1000).toISOString();
  const to = new Date(Date.now() + 120 * 60 * 1000).toISOString();

  const { data, error } = await admin
    .from("battle_events")
    .select("*, battle_event_participants(*)")
    .eq("status", "scheduled")
    .is("reminder_sent_at", null)
    .gte("scheduled_at", from)
    .lte("scheduled_at", to)
    .order("scheduled_at", { ascending: true })
    .limit(50);

  if (error) {
    console.error("[battle-email] findBattleEventsNeedingReminders:", error.message);
    return [];
  }

  return (data ?? []).map((r) => sortParticipants(r as BattleEventWithParticipants));
}

export type BattleReminderBatchResult = {
  processed: number;
  errors: number;
  skippedNoServiceRole: boolean;
};

/**
 * Sends reminders for all events in the 60–120 minute window and sets reminder_sent_at.
 * Requires SUPABASE_SERVICE_ROLE_KEY on the server (e.g. Vercel cron hitting /api/cron/battle-reminders).
 */
export async function sendUpcomingBattleReminders(): Promise<BattleReminderBatchResult> {
  if (!createServiceRoleClient()) {
    return { processed: 0, errors: 0, skippedNoServiceRole: true };
  }

  const events = await findBattleEventsNeedingReminders();
  let errors = 0;
  for (const ev of events) {
    try {
      await sendBattleReminderEmail(ev.id);
    } catch (e) {
      errors += 1;
      console.error("[battle-email] reminder batch failed for", ev.id, e);
    }
  }
  return { processed: events.length, errors, skippedNoServiceRole: false };
}
