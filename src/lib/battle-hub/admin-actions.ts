"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/server";
import { createClient } from "@/lib/supabase/server";
import { isValidFormatForCount, normalizeFormatToCanonical } from "./formats";

export type AdminBattleActionState = { success?: boolean; error?: string };

function normalizeHandle(s: string): string {
  return s.trim().replace(/^@+/, "");
}

function revalidateCalendar() {
  revalidatePath("/admin/calendar");
  revalidatePath("/battle-hub/calendar");
  revalidatePath("/battle-hub/scheduler");
  revalidatePath("/battle-hub");
}

export async function cancelBattleEventAction(eventId: string): Promise<AdminBattleActionState> {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase
    .from("battle_events")
    .update({ status: "cancelled", updated_at: new Date().toISOString() })
    .eq("id", eventId)
    .neq("status", "cancelled");

  if (error) return { error: error.message };
  revalidateCalendar();
  return { success: true };
}

export async function deleteBattleEventAction(eventId: string): Promise<AdminBattleActionState> {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from("battle_events").delete().eq("id", eventId);

  if (error) return { error: error.message };
  revalidateCalendar();
  return { success: true };
}

export async function updateBattleEventAdminAction(
  _prev: AdminBattleActionState,
  formData: FormData,
): Promise<AdminBattleActionState> {
  await requireAdmin();
  const eventId = String(formData.get("eventId") ?? "").trim();
  if (!eventId) return { error: "Missing event id." };

  const supabase = await createClient();

  const title = String(formData.get("title") ?? "").trim() || "Untitled battle";
  const eventType = String(formData.get("eventType") ?? "battle").trim() || "battle";
  const participantCount = Number(formData.get("participantCount"));
  const formatLabelRaw = String(formData.get("formatLabel") ?? "").trim();
  const scheduledRaw = String(formData.get("scheduledAt") ?? "").trim();
  const timezone = String(formData.get("timezone") ?? "UTC").trim() || "UTC";
  const notes = String(formData.get("notes") ?? "").trim() || null;
  const statusRaw = String(formData.get("status") ?? "scheduled").trim();

  const status =
    statusRaw === "cancelled" || statusRaw === "completed" || statusRaw === "scheduled"
      ? statusRaw
      : "scheduled";

  if (!Number.isInteger(participantCount) || participantCount < 2 || participantCount > 8) {
    return { error: "Participant count must be between 2 and 8." };
  }
  if (!isValidFormatForCount(participantCount, formatLabelRaw)) {
    return { error: "That format is not valid for the selected participant count." };
  }
  const formatLabel = normalizeFormatToCanonical(formatLabelRaw);
  if (!scheduledRaw) return { error: "Date and time are required." };
  const scheduledAt = new Date(scheduledRaw);
  if (Number.isNaN(scheduledAt.getTime())) {
    return { error: "Invalid date." };
  }

  const handles: { username: string; team: string | null; order: number }[] = [];
  for (let i = 0; i < participantCount; i++) {
    const u = normalizeHandle(String(formData.get(`participant_${i}`) ?? ""));
    if (!u) {
      return { error: `Participant ${i + 1} username is required.` };
    }
    const teamRaw = String(formData.get(`team_${i}`) ?? "").trim();
    const team = teamRaw === "A" || teamRaw === "B" ? teamRaw : null;
    handles.push({ username: u, team, order: i });
  }

  const { error: updateErr } = await supabase
    .from("battle_events")
    .update({
      title,
      event_type: eventType,
      participant_count: participantCount,
      format_label: formatLabel,
      scheduled_at: scheduledAt.toISOString(),
      timezone,
      notes,
      status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", eventId);

  if (updateErr) return { error: updateErr.message };

  const { data: prevParts, error: prevErr } = await supabase
    .from("battle_event_participants")
    .select("slot_order, tiktok_username, flyer_avatar_url")
    .eq("battle_event_id", eventId);

  if (prevErr) return { error: prevErr.message };

  const { error: delErr } = await supabase.from("battle_event_participants").delete().eq("battle_event_id", eventId);
  if (delErr) return { error: delErr.message };

  const participantRows = handles.map((h) => {
    const prev = prevParts?.find(
      (p) => p.slot_order === h.order && p.tiktok_username === h.username,
    );
    return {
      battle_event_id: eventId,
      profile_id: null as string | null,
      tiktok_username: h.username,
      team_label: h.team,
      slot_order: h.order,
      flyer_avatar_url: prev?.flyer_avatar_url ?? null,
    };
  });

  const { error: insErr } = await supabase.from("battle_event_participants").insert(participantRows);
  if (insErr) return { error: insErr.message };

  revalidateCalendar();
  revalidatePath(`/admin/calendar/${eventId}/edit`);

  return { success: true };
}
