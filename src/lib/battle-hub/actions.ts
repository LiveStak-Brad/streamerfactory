"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireBattleScheduler } from "@/lib/auth/server";
import { getSupabasePublicEnv } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import { isValidFormatForCount, normalizeFormatToCanonical } from "./formats";

function isValidBattleAvatarPublicUrl(urlStr: string, supabaseProjectUrl: string): boolean {
  try {
    const u = new URL(urlStr);
    const base = new URL(supabaseProjectUrl);
    if (u.origin !== base.origin) return false;
    return u.pathname.startsWith("/storage/v1/object/public/battleavatars/");
  } catch {
    return false;
  }
}

export type CreateBattleState = { success?: boolean; error?: string };

function normalizeHandle(s: string): string {
  return s.trim().replace(/^@+/, "");
}

export async function createBattleEvent(
  _prev: CreateBattleState,
  formData: FormData,
): Promise<CreateBattleState> {
  await requireBattleScheduler("/battle-hub/scheduler/new");

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Not signed in." };

  const title = String(formData.get("title") ?? "").trim() || "Untitled battle";
  const eventType = String(formData.get("eventType") ?? "battle").trim() || "battle";
  const participantCount = Number(formData.get("participantCount"));
  const formatLabelRaw = String(formData.get("formatLabel") ?? "").trim();
  const scheduledRaw = String(formData.get("scheduledAt") ?? "").trim();
  const timezone = String(formData.get("timezone") ?? "UTC").trim() || "UTC";
  const notes = String(formData.get("notes") ?? "").trim() || null;

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

  const { url: supabaseUrl } = getSupabasePublicEnv();

  const handles: {
    username: string;
    team: string | null;
    order: number;
    flyer_avatar_url: string | null;
  }[] = [];
  for (let i = 0; i < participantCount; i++) {
    const u = normalizeHandle(String(formData.get(`participant_${i}`) ?? ""));
    if (!u) {
      return { error: `Participant ${i + 1} username is required.` };
    }
    const teamRaw = String(formData.get(`team_${i}`) ?? "").trim();
    const team =
      teamRaw === "A" || teamRaw === "B" ? teamRaw : null;
    const flyerRaw = String(formData.get(`flyer_avatar_${i}`) ?? "").trim();
    let flyer_avatar_url: string | null = null;
    if (flyerRaw) {
      if (!isValidBattleAvatarPublicUrl(flyerRaw, supabaseUrl)) {
        return { error: "Flyer photo URL is not valid. Re-upload from the flyer step." };
      }
      flyer_avatar_url = flyerRaw;
    }
    handles.push({ username: u, team, order: i, flyer_avatar_url });
  }

  const { data: inserted, error: insertErr } = await supabase
    .from("battle_events")
    .insert({
      created_by: user.id,
      title,
      event_type: eventType,
      participant_count: participantCount,
      format_label: formatLabel,
      scheduled_at: scheduledAt.toISOString(),
      timezone,
      notes,
      status: "scheduled",
    })
    .select("id")
    .single();

  if (insertErr || !inserted) {
    return { error: insertErr?.message ?? "Could not create event." };
  }

  const eventId = inserted.id as string;

  const participantRows = handles.map((h) => ({
    battle_event_id: eventId,
    profile_id: null,
    tiktok_username: h.username,
    team_label: h.team,
    slot_order: h.order,
    flyer_avatar_url: h.flyer_avatar_url,
  }));

  const { error: partErr } = await supabase.from("battle_event_participants").insert(participantRows);

  if (partErr) {
    await supabase.from("battle_events").delete().eq("id", eventId);
    return { error: partErr.message };
  }

  revalidatePath("/battle-hub/calendar");
  revalidatePath("/battle-hub/scheduler");
  revalidatePath("/battle-hub");

  redirect("/battle-hub/calendar");
}
