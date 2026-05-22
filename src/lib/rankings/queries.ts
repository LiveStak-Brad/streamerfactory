import { createClient } from "@/lib/supabase/server";
import { periodBounds } from "@/lib/rankings/periods";
import type {
  ActivenessLevel,
  LeaderboardEntry,
  PerformanceStatsRow,
  RankingPeriod,
} from "@/lib/rankings/types";

export async function getPerformanceStatsForPeriod(
  periodStart: string,
  periodEnd: string,
): Promise<PerformanceStatsRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("creator_performance_stats")
    .select("*")
    .eq("period_start", periodStart)
    .eq("period_end", periodEnd)
    .order("coins_earned", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []) as PerformanceStatsRow[];
}

export async function getPerformanceStatForProfile(
  profileId: string,
  periodStart: string,
  periodEnd: string,
): Promise<PerformanceStatsRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("creator_performance_stats")
    .select("*")
    .eq("profile_id", profileId)
    .eq("period_start", periodStart)
    .eq("period_end", periodEnd)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return (data as PerformanceStatsRow | null) ?? null;
}

/** Aggregate all stat rows per profile for all-time view. */
export async function getAggregatedAllTimeStats(): Promise<
  Array<{
    profile_id: string;
    coins_earned: number;
    days_streamed: number;
    hours_streamed: number;
    activeness_level: ActivenessLevel;
    follower_count: number;
    follower_growth: number;
    battles_played: number;
    battles_won: number;
  }>
> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("creator_performance_stats").select("*");

  if (error) throw new Error(error.message);
  const rows = (data ?? []) as PerformanceStatsRow[];

  const byProfile = new Map<string, (typeof rows)[0][]>();
  for (const row of rows) {
    const list = byProfile.get(row.profile_id) ?? [];
    list.push(row);
    byProfile.set(row.profile_id, list);
  }

  const eliteOrder: ActivenessLevel[] = ["none", "low", "medium", "high", "elite"];

  return [...byProfile.entries()].map(([profile_id, list]) => {
    const maxActiveness = list.reduce<ActivenessLevel>((best, r) => {
      const idx = eliteOrder.indexOf(r.activeness_level);
      const bestIdx = eliteOrder.indexOf(best);
      return idx > bestIdx ? r.activeness_level : best;
    }, "none");

    return {
      profile_id,
      coins_earned: list.reduce((s, r) => s + r.coins_earned, 0),
      days_streamed: list.reduce((s, r) => s + r.days_streamed, 0),
      hours_streamed: list.reduce((s, r) => Number(r.hours_streamed), 0),
      activeness_level: maxActiveness,
      follower_count: Math.max(...list.map((r) => r.follower_count), 0),
      follower_growth: list.reduce((s, r) => s + r.follower_growth, 0),
      battles_played: list.reduce((s, r) => s + r.battles_played, 0),
      battles_won: list.reduce((s, r) => s + r.battles_won, 0),
    };
  });
}

export async function getLeaderboard(
  kind: RankingPeriod,
  anchorDate?: string,
): Promise<LeaderboardEntry[]> {
  const anchor = anchorDate ? new Date(`${anchorDate}T12:00:00Z`) : new Date();
  const { periodStart, periodEnd } = periodBounds(kind, anchor);

  const supabase = await createClient();

  const { data: rankings, error: rankErr } = await supabase
    .from("creator_rankings")
    .select("*")
    .eq("ranking_period", kind)
    .eq("period_start", periodStart)
    .order("rank_position", { ascending: true, nullsFirst: false });

  if (rankErr) throw new Error(rankErr.message);

  let statsMap = new Map<string, PerformanceStatsRow>();
  if (kind === "all-time") {
    const agg = await getAggregatedAllTimeStats();
    for (const a of agg) {
      statsMap.set(a.profile_id, {
        id: "",
        profile_id: a.profile_id,
        period_start: periodStart,
        period_end: periodEnd,
        coins_earned: a.coins_earned,
        days_streamed: a.days_streamed,
        hours_streamed: a.hours_streamed,
        activeness_level: a.activeness_level,
        follower_count: a.follower_count,
        follower_growth: a.follower_growth,
        battles_played: a.battles_played,
        battles_won: a.battles_won,
        created_at: "",
        updated_at: "",
      });
    }
  } else {
    const stats = await getPerformanceStatsForPeriod(periodStart, periodEnd);
    statsMap = new Map(stats.map((s) => [s.profile_id, s]));
  }

  const profileIds = [...new Set((rankings ?? []).map((r) => r.profile_id as string))];
  if (profileIds.length === 0) return [];

  const { data: profiles, error: profErr } = await supabase
    .from("profiles")
    .select("id, email, tiktok_username")
    .in("id", profileIds);

  if (profErr) throw new Error(profErr.message);

  const profileMap = new Map(
    (profiles ?? []).map((p) => [
      p.id as string,
      { email: p.email as string | null, tiktok_username: p.tiktok_username as string | null },
    ]),
  );

  return (rankings ?? [])
    .map((r) => {
      const pid = r.profile_id as string;
      const prof = profileMap.get(pid);
      const stat = statsMap.get(pid);
      return {
        profile_id: pid,
        email: prof?.email ?? null,
        tiktok_username: prof?.tiktok_username ?? null,
        rank_position: r.rank_position as number | null,
        rank_score: Number(r.rank_score),
        coins_rank: r.coins_rank as number | null,
        hours_rank: r.hours_rank as number | null,
        activity_rank: r.activity_rank as number | null,
        battle_rank: r.battle_rank as number | null,
        coins_earned: stat?.coins_earned ?? 0,
        days_streamed: stat?.days_streamed ?? 0,
        hours_streamed: Number(stat?.hours_streamed ?? 0),
        activeness_level: (stat?.activeness_level ?? "none") as ActivenessLevel,
        follower_growth: stat?.follower_growth ?? 0,
        battles_played: stat?.battles_played ?? 0,
        battles_won: stat?.battles_won ?? 0,
      } satisfies LeaderboardEntry;
    })
    .sort((a, b) => (a.rank_position ?? 999) - (b.rank_position ?? 999));
}

export async function getMyLeaderboardSummary(
  profileId: string,
  kind: RankingPeriod = "weekly",
): Promise<{
  entry: LeaderboardEntry | null;
  periodStart: string;
  periodEnd: string;
  leaderboardSize: number;
}> {
  const board = await getLeaderboard(kind);
  const entry = board.find((e) => e.profile_id === profileId) ?? null;
  const { periodStart, periodEnd } = periodBounds(kind);
  return { entry, periodStart, periodEnd, leaderboardSize: board.length };
}
