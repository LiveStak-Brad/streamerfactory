/**
 * Creator-facing progress snapshot derived from progress_events + projections.
 */

import { createClient } from "@/lib/supabase/server";
import { getActiveSeason } from "@/lib/growth/seasons/service";
import { listMemberEvents } from "@/lib/growth/progress/events";
import type { CreatorSnapshot, MissionCategory } from "@/lib/growth/types";
import { getTikTokConnectionPublic } from "@/lib/tiktok/db";
import { ensureReferralCode } from "@/lib/growth/referrals/service";

function daysSince(iso: string | null, now = new Date()): number {
  if (!iso) return 0;
  const then = new Date(iso);
  if (Number.isNaN(then.getTime())) return 0;
  const startToday = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const startThen = Date.UTC(then.getUTCFullYear(), then.getUTCMonth(), then.getUTCDate());
  const diff = Math.floor((startToday - startThen) / 86_400_000);
  return Math.max(0, diff);
}

function scoreProfileCompletion(flags: {
  hasTiktokConnection: boolean;
  hasUsername: boolean;
  hasTimezone: boolean;
  hasAvatar: boolean;
  onboardingCompleted: boolean;
}): number {
  const parts = [
    flags.hasTiktokConnection,
    flags.hasUsername,
    flags.hasTimezone,
    flags.hasAvatar,
    flags.onboardingCompleted,
  ];
  return Math.round((parts.filter(Boolean).length / parts.length) * 100);
}

function topCategories(
  counts: Record<string, number>,
  limit = 3,
): string[] {
  return Object.entries(counts)
    .filter(([, n]) => n > 0)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([k]) => k);
}

function joinCategory(
  raw: unknown,
): MissionCategory | string | null {
  if (!raw) return null;
  if (Array.isArray(raw)) {
    const first = raw[0] as { category?: string } | undefined;
    return (first?.category as MissionCategory | undefined) ?? null;
  }
  return ((raw as { category?: string }).category as MissionCategory | undefined) ?? null;
}

export async function getCreatorSnapshot(memberId: string): Promise<CreatorSnapshot> {
  const supabase = await createClient();
  const season = await getActiveSeason();

  const [
    events,
    profileRes,
    streakRes,
    onboardingTasksRes,
    memberOnboardingRes,
    missionRes,
    reputationRes,
    titlesRes,
    referralAcceptedRes,
    referralPendingRes,
    connection,
    referralCode,
    rankingsRes,
  ] = await Promise.all([
    listMemberEvents(memberId, { limit: 500 }),
    supabase
      .from("profiles")
      .select("tiktok_username, timezone, onboarding_completed_at")
      .eq("id", memberId)
      .maybeSingle(),
    supabase
      .from("member_streaks")
      .select("streak_key, current_count, longest_count, last_completed_on")
      .eq("member_id", memberId),
    supabase
      .from("onboarding_tasks")
      .select("id, key, required, active")
      .eq("active", true),
    supabase
      .from("member_onboarding_tasks")
      .select("task_id, completed_at")
      .eq("member_id", memberId),
    supabase
      .from("member_missions")
      .select("status, mission_templates!inner(key, category)")
      .eq("member_id", memberId),
    supabase
      .from("reputation_ledger")
      .select("points, season_id")
      .eq("member_id", memberId),
    supabase
      .from("member_reputation_titles")
      .select("title_key")
      .eq("member_id", memberId),
    supabase
      .from("referrals")
      .select("id", { count: "exact", head: true })
      .eq("inviter_id", memberId)
      .in("status", ["accepted", "eligible", "rewarded"]),
    supabase
      .from("referrals")
      .select("id", { count: "exact", head: true })
      .eq("inviter_id", memberId)
      .eq("status", "pending"),
    getTikTokConnectionPublic(memberId).catch(() => null),
    ensureReferralCode(memberId).catch(() => null),
    supabase
      .from("creator_rankings")
      .select("rank_position, period_start")
      .eq("profile_id", memberId)
      .order("period_start", { ascending: false })
      .limit(24),
  ]);

  const profile = profileRes.data;
  const hasUsername = Boolean(
    profile?.tiktok_username?.trim() || connection?.tiktok_username?.trim(),
  );
  const hasTimezone = Boolean(profile?.timezone?.trim());
  const hasAvatar = Boolean(connection?.avatar_url);
  const onboardingCompleted = Boolean(profile?.onboarding_completed_at);

  const completedTaskIds = new Set(
    (memberOnboardingRes.data ?? [])
      .filter((r) => r.completed_at)
      .map((r) => r.task_id as string),
  );
  const activeTasks = onboardingTasksRes.data ?? [];
  const requiredTasks = activeTasks.filter((t) => t.required);
  const incompleteRequired = requiredTasks.filter((t) => !completedTaskIds.has(t.id));
  const incomplete_task_keys = incompleteRequired.map((t) => t.key as string);
  const requiredDone = requiredTasks.length - incompleteRequired.length;
  const onboardingPercent =
    requiredTasks.length === 0
      ? onboardingCompleted
        ? 100
        : 0
      : Math.round((requiredDone / requiredTasks.length) * 100);

  const lessons_completed = [
    ...new Set(
      events
        .filter((e) => e.event_type === "lesson_completed" && e.subject_key)
        .map((e) => e.subject_key as string),
    ),
  ];
  const modules_completed = [
    ...new Set(
      events
        .filter((e) => e.event_type === "module_completed" && e.subject_key)
        .map((e) => e.subject_key as string),
    ),
  ];

  let missions_completed = 0;
  let missions_failed = 0;
  const strongCounts: Record<string, number> = {};
  const weakCounts: Record<string, number> = {};

  for (const row of missionRes.data ?? []) {
    const category = joinCategory(row.mission_templates);
    if (!category) continue;
    if (row.status === "completed") {
      missions_completed += 1;
      strongCounts[category] = (strongCounts[category] ?? 0) + 1;
    } else if (row.status === "failed" || row.status === "active") {
      if (row.status === "failed") missions_failed += 1;
      weakCounts[category] = (weakCounts[category] ?? 0) + 1;
    }
  }

  const streaks: CreatorSnapshot["streaks"] = {};
  for (const row of streakRes.data ?? []) {
    streaks[row.streak_key] = {
      current: row.current_count ?? 0,
      longest: row.longest_count ?? 0,
      last_completed: (row.last_completed_on as string | null) ?? null,
    };
  }

  const battleJoined = events.filter((e) => e.event_type === "battle_joined");
  const battleCompleted = events.filter((e) => e.event_type === "battle_completed");
  const battle_history = {
    joined: battleJoined.length,
    completed: battleCompleted.length,
    recent_event_ids: [...battleJoined, ...battleCompleted]
      .sort((a, b) => b.created_at.localeCompare(a.created_at))
      .slice(0, 10)
      .map((e) => e.id),
  };

  const rankingPeaks = (rankingsRes.data ?? [])
    .map((r) => r.rank_position)
    .filter((n): n is number => typeof n === "number" && n > 0);
  const eventRanks = events
    .filter((e) => e.event_type === "ranking_reached")
    .map((e) => Number(e.metadata?.rank ?? e.subject_key))
    .filter((n) => Number.isFinite(n) && n > 0);
  const allRanks = [...rankingPeaks, ...eventRanks];
  let latestFromEvents: number | null = null;
  for (const e of events) {
    if (e.event_type !== "ranking_reached") continue;
    const rank = Number(e.metadata?.rank ?? e.subject_key);
    if (Number.isFinite(rank) && rank > 0) {
      latestFromEvents = rank;
      break;
    }
  }

  const lifetimeRep = (reputationRes.data ?? []).reduce(
    (sum, r) => sum + (Number(r.points) || 0),
    0,
  );
  const seasonRep = (reputationRes.data ?? [])
    .filter((r) => season && r.season_id === season.id)
    .reduce((sum, r) => sum + (Number(r.points) || 0), 0);

  const last_activity = events[0]?.created_at ?? null;

  return {
    member_id: memberId,
    season: season
      ? { id: season.id, key: season.key, name: season.name }
      : null,
    onboarding: {
      completed: onboardingCompleted || incomplete_task_keys.length === 0,
      percent: onboardingCompleted ? 100 : onboardingPercent,
      incomplete_task_keys,
    },
    lessons_completed,
    modules_completed,
    missions_completed,
    missions_failed,
    streaks,
    battle_history,
    ranking_history: {
      peaks: [...new Set(allRanks)].sort((a, b) => a - b).slice(0, 10),
      latest_rank: rankingPeaks[0] ?? latestFromEvents,
    },
    strongest_categories: topCategories(strongCounts),
    weakest_categories: topCategories(weakCounts),
    inactive_days: daysSince(last_activity),
    last_activity,
    profile_completion: scoreProfileCompletion({
      hasTiktokConnection: Boolean(connection),
      hasUsername,
      hasTimezone,
      hasAvatar,
      onboardingCompleted,
    }),
    referrals: {
      accepted: referralAcceptedRes.count ?? 0,
      pending: referralPendingRes.count ?? 0,
      code: referralCode,
    },
    reputation: {
      lifetime: lifetimeRep,
      season: seasonRep,
      titles: (titlesRes.data ?? []).map((t) => t.title_key as string),
    },
    recent_events: events.slice(0, 20).map((e) => ({
      type: e.event_type,
      subject_key: e.subject_key,
      at: e.created_at,
    })),
  };
}
