/**
 * Member referral codes + claim flow (event-backed when accepted).
 */

import { appendProgressEvent } from "@/lib/growth/progress/events";
import { createClient } from "@/lib/supabase/server";
import { createServiceRoleClient } from "@/lib/supabase/service-role";
import { getActiveSeason } from "@/lib/growth/seasons/service";
import { mapEventRow } from "@/lib/growth/progress/append";
import { runProjectionPipeline } from "@/lib/growth/progress/pipeline";
import { canScheduleBattles } from "@/lib/auth/access";

const CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export type ReferralSummary = {
  code: string | null;
  accepted: number;
  pending: number;
  eligible: number;
  rewarded: number;
};

function randomReferralCode(length = 8): string {
  let out = "";
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  for (let i = 0; i < length; i++) {
    out += CODE_ALPHABET[bytes[i]! % CODE_ALPHABET.length];
  }
  return out;
}

export async function ensureReferralCode(memberId: string): Promise<string> {
  const supabase = await createClient();
  const { data: existing } = await supabase
    .from("referral_codes")
    .select("code")
    .eq("member_id", memberId)
    .maybeSingle();

  if (existing?.code) return existing.code;

  for (let attempt = 0; attempt < 8; attempt++) {
    const code = randomReferralCode(8);
    const { data, error } = await supabase
      .from("referral_codes")
      .insert({ member_id: memberId, code })
      .select("code")
      .maybeSingle();

    if (!error && data?.code) return data.code;

    const { data: raced } = await supabase
      .from("referral_codes")
      .select("code")
      .eq("member_id", memberId)
      .maybeSingle();
    if (raced?.code) return raced.code;
  }

  throw new Error("Could not allocate referral code");
}

export async function getReferralSummary(memberId: string): Promise<ReferralSummary> {
  const supabase = await createClient();
  const code = await ensureReferralCode(memberId).catch(() => null);

  const { data: rows } = await supabase
    .from("referrals")
    .select("status")
    .eq("inviter_id", memberId);

  let accepted = 0;
  let pending = 0;
  let eligible = 0;
  let rewarded = 0;
  for (const row of rows ?? []) {
    switch (row.status) {
      case "accepted":
        accepted += 1;
        break;
      case "pending":
        pending += 1;
        break;
      case "eligible":
        eligible += 1;
        break;
      case "rewarded":
        rewarded += 1;
        break;
      default:
        break;
    }
  }

  return { code, accepted, pending, eligible, rewarded };
}

async function appendReferralAcceptedEvent(params: {
  inviterId: string;
  inviteeId: string;
  code: string;
}): Promise<void> {
  const idempotencyKey = `referral_accepted:${params.inviteeId}`;
  const metadata = {
    invitee_id: params.inviteeId,
    code: params.code,
  };

  try {
    await appendProgressEvent({
      memberId: params.inviterId,
      eventType: "referral_accepted",
      subjectKey: params.inviteeId,
      metadata,
      idempotencyKey,
    });
    return;
  } catch {
    // Cross-user append often needs service role (RPC is scoped to auth.uid()).
  }

  const admin = createServiceRoleClient();
  if (!admin) return;

  const { data: existing } = await admin
    .from("progress_events")
    .select("*")
    .eq("member_id", params.inviterId)
    .eq("idempotency_key", idempotencyKey)
    .maybeSingle();
  if (existing) return;

  const season = await getActiveSeason();
  const { data: inserted, error } = await admin
    .from("progress_events")
    .insert({
      member_id: params.inviterId,
      event_type: "referral_accepted",
      subject_key: params.inviteeId,
      season_id: season?.id ?? null,
      metadata,
      idempotency_key: idempotencyKey,
    })
    .select("*")
    .single();

  if (error || !inserted) return;
  await runProjectionPipeline(mapEventRow(inserted as Record<string, unknown>), {
    isNew: true,
    depth: 0,
  });
}

/**
 * Invitee claims an inviter's code. Requires invitee to be a network member.
 * Creates/updates referrals as accepted and appends referral_accepted for the inviter.
 */
export async function claimReferralCode(
  inviteeId: string,
  code: string,
): Promise<{ ok: true } | { error: string }> {
  const normalized = code.trim().toUpperCase();
  if (!normalized) return { error: "Referral code required" };

  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, email")
    .eq("id", inviteeId)
    .maybeSingle();

  if (!profile || !canScheduleBattles(profile.role)) {
    return { error: "Only network members can claim a referral" };
  }

  const { data: codeRow } = await supabase
    .from("referral_codes")
    .select("member_id, code")
    .eq("code", normalized)
    .maybeSingle();

  if (!codeRow) return { error: "Invalid referral code" };
  if (codeRow.member_id === inviteeId) {
    return { error: "You cannot claim your own referral code" };
  }

  const { data: existingForInvitee } = await supabase
    .from("referrals")
    .select("id, status, inviter_id")
    .eq("invitee_id", inviteeId)
    .in("status", ["accepted", "eligible", "rewarded"])
    .maybeSingle();

  if (existingForInvitee) {
    return { error: "Referral already claimed" };
  }

  const now = new Date().toISOString();
  const { data: pendingSame } = await supabase
    .from("referrals")
    .select("id")
    .eq("inviter_id", codeRow.member_id)
    .eq("code", codeRow.code)
    .eq("invitee_id", inviteeId)
    .maybeSingle();

  if (pendingSame?.id) {
    const { error } = await supabase
      .from("referrals")
      .update({
        status: "accepted",
        accepted_at: now,
        invitee_email: profile.email ?? null,
        updated_at: now,
      })
      .eq("id", pendingSame.id);
    if (error) return { error: error.message };
  } else {
    const { error } = await supabase.from("referrals").insert({
      inviter_id: codeRow.member_id,
      invitee_id: inviteeId,
      invitee_email: profile.email ?? null,
      code: codeRow.code,
      status: "accepted",
      accepted_at: now,
    });
    if (error) return { error: error.message };
  }

  await appendReferralAcceptedEvent({
    inviterId: codeRow.member_id,
    inviteeId,
    code: codeRow.code,
  });

  return { ok: true };
}
