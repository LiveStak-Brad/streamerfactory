"use server";

import { revalidatePath } from "next/cache";

import { effectiveCanUseBattleHubScheduling } from "@/lib/auth/network-view";
import { getSessionProfile, requireBattleScheduler } from "@/lib/auth/server";
import { createClient } from "@/lib/supabase/server";
import { isValidFormatForCount, normalizeFormatToCanonical } from "@/lib/battle-hub/formats";

import type { BattleRequestType } from "./db";

export type CreateBattleRequestState = { success?: boolean; error?: string; id?: string };

const REQUEST_TYPES = new Set<BattleRequestType>([
  "need_opponent",
  "need_teammate",
  "open_match",
  "themed_battle",
]);

function trim(s: unknown, max: number): string {
  const t = String(s ?? "").trim();
  return t.length > max ? t.slice(0, max) : t;
}

export async function createBattleRequestAction(
  _prev: CreateBattleRequestState,
  formData: FormData,
): Promise<CreateBattleRequestState> {
  await requireBattleScheduler("/battle-hub/finder/new");

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Not signed in." };

  const { data: profile } = await supabase
    .from("profiles")
    .select("tiktok_username")
    .eq("id", user.id)
    .maybeSingle();

  const creatorHandle =
    (profile?.tiktok_username && String(profile.tiktok_username).trim().replace(/^@/, "")) ||
    (user.email?.split("@")[0] ?? "creator");

  const titleRaw = trim(formData.get("title"), 200);
  const requestType = trim(formData.get("requestType"), 40) as BattleRequestType;
  const participantCount = Number(formData.get("participantCount"));
  const formatLabelRaw = trim(formData.get("formatLabel"), 40);
  const timezone = trim(formData.get("timezone"), 80) || "UTC";
  const notesRaw = trim(formData.get("notes"), 4000);
  const preferredRaw = trim(formData.get("preferredAt"), 40);

  if (!REQUEST_TYPES.has(requestType)) {
    return { error: "Please choose a valid request type." };
  }
  if (!Number.isInteger(participantCount) || participantCount < 2 || participantCount > 4) {
    return { error: "Participant count must be between 2 and 4 (matches scheduler formats)." };
  }
  if (!isValidFormatForCount(participantCount, formatLabelRaw)) {
    return { error: "That format does not match the participant count." };
  }
  const preferred_format = normalizeFormatToCanonical(formatLabelRaw);

  let preferred_at: string | null = null;
  if (preferredRaw) {
    const d = new Date(preferredRaw);
    if (Number.isNaN(d.getTime())) {
      return { error: "Invalid preferred date/time." };
    }
    preferred_at = d.toISOString();
  }

  const { data: inserted, error: insErr } = await supabase
    .from("battle_requests")
    .insert({
      created_by: user.id,
      title: titleRaw || null,
      creator_display_handle: creatorHandle,
      request_type: requestType,
      participant_count: participantCount,
      preferred_format,
      preferred_at,
      timezone,
      notes: notesRaw || null,
      status: "open",
    })
    .select("id")
    .single();

  if (insErr || !inserted) {
    return { error: insErr?.message ?? "Could not create request." };
  }

  const requestId = inserted.id as string;
  const slotRows = Array.from({ length: participantCount }, (_, i) => ({
    battle_request_id: requestId,
    slot_order: i,
    slot_type: i === 0 ? "creator" : "open",
    joined_by: i === 0 ? user.id : null,
    tiktok_username: i === 0 ? creatorHandle : null,
  }));

  const { error: slotErr } = await supabase.from("battle_request_slots").insert(slotRows);
  if (slotErr) {
    await supabase.from("battle_requests").delete().eq("id", requestId);
    return { error: slotErr.message };
  }

  revalidatePath("/battle-hub/finder");
  revalidatePath(`/battle-hub/finder/${requestId}`);
  return { success: true, id: requestId };
}

export type PromoteBattleRequestResult =
  | { ok: true; eventId: string }
  | { ok: false; error: string };

export async function joinBattleRequestSlotAction(
  slotId: string,
  tiktokUsername: string,
): Promise<{ ok: boolean; error?: string }> {
  await requireBattleScheduler("/battle-hub/finder");
  const supabase = await createClient();
  const handle = String(tiktokUsername ?? "").trim().replace(/^@/, "");
  if (!handle) {
    return { ok: false, error: "TikTok username is required." };
  }

  const { error } = await supabase.rpc("join_battle_request_slot", {
    p_slot_id: slotId,
    p_tiktok_username: handle,
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  revalidatePath("/battle-hub/finder");
  revalidatePath("/battle-hub");
  return { ok: true };
}

export async function promoteBattleRequestAction(requestId: string): Promise<PromoteBattleRequestResult> {
  await requireBattleScheduler("/battle-hub/finder");
  const supabase = await createClient();

  const { data: eventId, error } = await supabase.rpc("promote_battle_finder_request", {
    p_request_id: requestId,
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  if (!eventId || typeof eventId !== "string") {
    return { ok: false, error: "Promotion did not return an event id." };
  }

  revalidatePath("/battle-hub/calendar");
  revalidatePath("/battle-hub/scheduler");
  revalidatePath("/battle-hub");
  revalidatePath("/battle-hub/finder");
  revalidatePath(`/battle-hub/finder/${requestId}`);
  revalidatePath("/admin/calendar");
  return { ok: true, eventId };
}

export async function leaveBattleRequestSlotAction(slotId: string): Promise<{ ok: boolean; error?: string }> {
  await requireBattleScheduler("/battle-hub/finder");
  const supabase = await createClient();
  const { error } = await supabase.rpc("leave_battle_request_slot", { p_slot_id: slotId });
  if (error) {
    return { ok: false, error: error.message };
  }
  revalidatePath("/battle-hub/finder");
  return { ok: true };
}

export async function setBattleRequestStatusAction(
  requestId: string,
  status: "closed" | "cancelled",
): Promise<{ ok: boolean; error?: string }> {
  const session = await getSessionProfile();
  if (!session) {
    return { ok: false, error: "Not signed in." };
  }
  if (!(await effectiveCanUseBattleHubScheduling(session))) {
    return { ok: false, error: "Not allowed." };
  }
  const supabase = await createClient();
  const { data: row } = await supabase.from("battle_requests").select("created_by").eq("id", requestId).single();
  if (!row || row.created_by !== session.user.id) {
    return { ok: false, error: "Not allowed." };
  }

  const { error } = await supabase.from("battle_requests").update({ status }).eq("id", requestId);
  if (error) {
    return { ok: false, error: error.message };
  }
  revalidatePath("/battle-hub/finder");
  revalidatePath(`/battle-hub/finder/${requestId}`);
  return { ok: true };
}
