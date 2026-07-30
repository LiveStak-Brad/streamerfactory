/**
 * Build an event-derived ProgressSnapshot for requirement evaluation.
 */

import { createClient } from "@/lib/supabase/server";
import { listMemberEvents } from "@/lib/growth/progress/events";
import { getActiveSeason } from "@/lib/growth/seasons/service";
import type { ProgressSnapshot } from "@/lib/growth/types";
import { getTikTokConnectionPublic } from "@/lib/tiktok/db";

export async function buildProgressSnapshot(
  memberId: string,
): Promise<ProgressSnapshot> {
  const supabase = await createClient();
  const season = await getActiveSeason();

  const [
    events,
    profileRes,
    streakRes,
    onboardingRes,
    missionRes,
    streameruRes,
    referralRes,
    connection,
  ] = await Promise.all([
    listMemberEvents(memberId, { limit: 500 }),
    supabase
      .from("profiles")
      .select(
        "tiktok_username, timezone, onboarding_completed_at",
      )
      .eq("id", memberId)
      .maybeSingle(),
    supabase
      .from("member_streaks")
      .select("streak_key, current_count, longest_count")
      .eq("member_id", memberId),
    supabase
      .from("member_onboarding_tasks")
      .select("completed_at, onboarding_tasks!inner(key)")
      .eq("member_id", memberId)
      .not("completed_at", "is", null),
    supabase
      .from("member_missions")
      .select("status, mission_templates!inner(key)")
      .eq("member_id", memberId)
      .eq("status", "completed"),
    supabase
      .from("streameru_mission_completions")
      .select("lesson_slug, mission_id")
      .eq("member_id", memberId),
    supabase
      .from("referrals")
      .select("id", { count: "exact", head: true })
      .eq("inviter_id", memberId)
      .in("status", ["accepted", "eligible", "rewarded"]),
    getTikTokConnectionPublic(memberId).catch(() => null),
  ]);

  const profile = profileRes.data;
  const streaks: ProgressSnapshot["streaks"] = {};
  for (const row of streakRes.data ?? []) {
    streaks[row.streak_key] = {
      current: row.current_count,
      longest: row.longest_count,
    };
  }

  const completedOnboardingTaskKeys = (onboardingRes.data ?? []).map((r) => {
    const t = r.onboarding_tasks as unknown as { key: string } | { key: string }[];
    if (Array.isArray(t)) return t[0]?.key ?? "";
    return t?.key ?? "";
  }).filter(Boolean);

  const completedMissionTemplateKeys = (missionRes.data ?? []).map((r) => {
    const t = r.mission_templates as unknown as { key: string } | { key: string }[];
    if (Array.isArray(t)) return t[0]?.key ?? "";
    return t?.key ?? "";
  }).filter(Boolean);

  let latestRank: number | null = null;
  const { data: rankRow } = await supabase
    .from("creator_rankings")
    .select("rank_position")
    .eq("profile_id", memberId)
    .order("period_start", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (rankRow?.rank_position != null) {
    latestRank = rankRow.rank_position;
  }

  return {
    events,
    seasonId: season?.id ?? null,
    profile: {
      hasTiktokConnection: Boolean(connection),
      hasTiktokUsername: Boolean(profile?.tiktok_username?.trim()),
      hasTimezone: Boolean(profile?.timezone?.trim()),
      hasAvatar: Boolean(connection?.avatar_url),
      onboardingCompleted: Boolean(profile?.onboarding_completed_at),
    },
    streaks,
    completedOnboardingTaskKeys,
    completedMissionTemplateKeys,
    streameruMissionCompletions: (streameruRes.data ?? []).map((r) => ({
      lesson_slug: r.lesson_slug,
      mission_id: r.mission_id,
    })),
    latestRank,
    referralsAccepted: referralRes.count ?? 0,
  };
}
