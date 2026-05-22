"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/server";
import { seedBackstageStatsFromSnapshots } from "@/lib/rankings/seed-backstage";
import { periodBounds } from "@/lib/rankings/periods";
import { assignRanks, computeRankings } from "@/lib/rankings/scoring";
import { getAggregatedAllTimeStats, getPerformanceStatsForPeriod } from "@/lib/rankings/queries";
import { createClient } from "@/lib/supabase/server";
import type { ActivenessLevel, RankingPeriod } from "@/lib/rankings/types";
import { ACTIVENESS_LEVELS, RANKING_PERIODS } from "@/lib/rankings/types";

export type SaveStatsInput = {
  profileId: string;
  periodKind: RankingPeriod;
  periodAnchor?: string;
  coinsEarned: number;
  daysStreamed: number;
  hoursStreamed: number;
  activenessLevel: ActivenessLevel;
  followerCount: number;
  followerGrowth: number;
  battlesPlayed: number;
  battlesWon: number;
};

function parseActiveness(v: string): ActivenessLevel {
  const x = v.trim().toLowerCase();
  return ACTIVENESS_LEVELS.includes(x as ActivenessLevel) ? (x as ActivenessLevel) : "none";
}

/** Import stats from TikTok Creator Network screenshots (see backstage-seed-data.ts). */
export async function importBackstageSnapshotAction(): Promise<
  Awaited<ReturnType<typeof seedBackstageStatsFromSnapshots>>
> {
  await requireAdmin();
  const result = await seedBackstageStatsFromSnapshots();
  if (result.ok) {
    revalidatePath("/admin/rankings");
    revalidatePath("/rankings");
    revalidatePath("/member/leaderboard");
    revalidatePath("/member/dashboard");
  }
  return result;
}

export async function savePerformanceStatsAction(
  input: SaveStatsInput,
): Promise<{ ok: true } | { ok: false; error: string }> {
  await requireAdmin();

  if (!RANKING_PERIODS.includes(input.periodKind)) {
    return { ok: false, error: "Invalid period." };
  }

  const anchor = input.periodAnchor ? new Date(`${input.periodAnchor}T12:00:00Z`) : new Date();
  const { periodStart, periodEnd } = periodBounds(input.periodKind, anchor);

  const supabase = await createClient();
  const row = {
    profile_id: input.profileId,
    period_start: periodStart,
    period_end: periodEnd,
    coins_earned: Math.max(0, Math.floor(input.coinsEarned)),
    days_streamed: Math.max(0, Math.floor(input.daysStreamed)),
    hours_streamed: Math.max(0, Number(input.hoursStreamed)),
    activeness_level: parseActiveness(input.activenessLevel),
    follower_count: Math.max(0, Math.floor(input.followerCount)),
    follower_growth: Math.floor(input.followerGrowth),
    battles_played: Math.max(0, Math.floor(input.battlesPlayed)),
    battles_won: Math.max(0, Math.floor(input.battlesWon)),
  };

  const { error } = await supabase.from("creator_performance_stats").upsert(row, {
    onConflict: "profile_id,period_start,period_end",
  });

  if (error) return { ok: false, error: error.message };

  const recalc = await recalculateRankingsAction(input.periodKind, input.periodAnchor);
  if (!recalc.ok) return recalc;

  revalidatePath("/admin/rankings");
  revalidatePath("/member/leaderboard");
  revalidatePath("/member/dashboard");

  return { ok: true };
}

export async function recalculateRankingsAction(
  kind: RankingPeriod,
  periodAnchor?: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  await requireAdmin();

  const anchor = periodAnchor ? new Date(`${periodAnchor}T12:00:00Z`) : new Date();
  const { periodStart, periodEnd } = periodBounds(kind, anchor);

  let statsForScoring: Array<{
    profile_id: string;
    coins_earned: number;
    days_streamed: number;
    hours_streamed: number;
    activeness_level: ActivenessLevel;
    battles_played: number;
    battles_won: number;
  }>;

  if (kind === "all-time") {
    statsForScoring = await getAggregatedAllTimeStats();
  } else {
    const rows = await getPerformanceStatsForPeriod(periodStart, periodEnd);
    statsForScoring = rows.map((r) => ({
      profile_id: r.profile_id,
      coins_earned: r.coins_earned,
      days_streamed: r.days_streamed,
      hours_streamed: Number(r.hours_streamed),
      activeness_level: r.activeness_level,
      battles_played: r.battles_played,
      battles_won: r.battles_won,
    }));
  }

  const computed = computeRankings(statsForScoring);
  const ranked = assignRanks(computed);

  const supabase = await createClient();

  await supabase
    .from("creator_rankings")
    .delete()
    .eq("ranking_period", kind)
    .eq("period_start", periodStart);

  if (ranked.length === 0) {
    revalidatePath("/admin/rankings");
    revalidatePath("/member/leaderboard");
    return { ok: true };
  }

  const inserts = ranked.map((r) => ({
    profile_id: r.profile_id,
    ranking_period: kind,
    period_start: periodStart,
    period_end: periodEnd,
    rank_score: r.rank_score,
    rank_position: r.rank_position,
    coins_rank: r.coins_rank,
    hours_rank: r.hours_rank,
    activity_rank: r.activity_rank,
    battle_rank: r.battle_rank,
    calculated_at: new Date().toISOString(),
  }));

  const { error } = await supabase.from("creator_rankings").insert(inserts);
  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/rankings");
  revalidatePath("/member/leaderboard");
  revalidatePath("/member/dashboard");

  return { ok: true };
}
