import type { ActivenessLevel } from "@/lib/rankings/types";

export const SCORE_WEIGHTS = {
  coins: 0.45,
  hours: 0.2,
  days: 0.15,
  activeness: 0.1,
  battles: 0.1,
} as const;

const ACTIVENESS_SCORE: Record<ActivenessLevel, number> = {
  none: 0,
  low: 25,
  medium: 50,
  high: 75,
  elite: 100,
};

export type StatsForScoring = {
  profile_id: string;
  coins_earned: number;
  days_streamed: number;
  hours_streamed: number;
  activeness_level: ActivenessLevel;
  battles_played: number;
  battles_won: number;
};

function normalize(values: number[]): Map<number, number> {
  const max = Math.max(...values, 0);
  const map = new Map<number, number>();
  if (max <= 0) {
    values.forEach((v, i) => map.set(i, 0));
    return map;
  }
  values.forEach((v, i) => map.set(i, (v / max) * 100));
  return map;
}

function battleScore(played: number, won: number): number {
  if (played <= 0) return 0;
  const winRate = won / played;
  return Math.min(100, played * 4 + winRate * 40);
}

export type ComputedRanking = {
  profile_id: string;
  rank_score: number;
  coins_norm: number;
  hours_norm: number;
  days_norm: number;
  activity_norm: number;
  battle_norm: number;
};

/** Normalized weighted score (0–100 scale). */
export function computeRankings(rows: StatsForScoring[]): ComputedRanking[] {
  if (rows.length === 0) return [];

  const coins = rows.map((r) => r.coins_earned);
  const hours = rows.map((r) => Number(r.hours_streamed));
  const days = rows.map((r) => r.days_streamed);
  const battles = rows.map((r) => battleScore(r.battles_played, r.battles_won));
  const activity = rows.map((r) => ACTIVENESS_SCORE[r.activeness_level] ?? 0);

  const coinsNorm = normalize(coins);
  const hoursNorm = normalize(hours);
  const daysNorm = normalize(days);
  const battleNorm = normalize(battles);

  return rows.map((row, i) => {
    const c = coinsNorm.get(i) ?? 0;
    const h = hoursNorm.get(i) ?? 0;
    const d = daysNorm.get(i) ?? 0;
    const a = activity[i] ?? 0;
    const b = battleNorm.get(i) ?? 0;
    const rank_score =
      c * SCORE_WEIGHTS.coins +
      h * SCORE_WEIGHTS.hours +
      d * SCORE_WEIGHTS.days +
      a * SCORE_WEIGHTS.activeness +
      b * SCORE_WEIGHTS.battles;

    return {
      profile_id: row.profile_id,
      rank_score: Math.round(rank_score * 100) / 100,
      coins_norm: c,
      hours_norm: h,
      days_norm: d,
      activity_norm: a,
      battle_norm: b,
    };
  });
}

export type RankedCreator = ComputedRanking & {
  rank_position: number;
  coins_rank: number;
  hours_rank: number;
  activity_rank: number;
  battle_rank: number;
};

export function assignRanks(computed: ComputedRanking[]): RankedCreator[] {
  const byScore = [...computed].sort((a, b) => b.rank_score - a.rank_score);
  const positionMap = new Map<string, number>();
  byScore.forEach((r, idx) => positionMap.set(r.profile_id, idx + 1));

  const rankBy = (key: keyof Pick<ComputedRanking, "coins_norm" | "hours_norm" | "days_norm" | "activity_norm" | "battle_norm">) => {
    const sorted = [...computed].sort((a, b) => b[key] - a[key]);
    const m = new Map<string, number>();
    sorted.forEach((r, idx) => m.set(r.profile_id, idx + 1));
    return m;
  };

  const coinsR = rankBy("coins_norm");
  const hoursR = rankBy("hours_norm");
  const activityR = rankBy("activity_norm");
  const battleR = rankBy("battle_norm");

  return computed.map((r) => ({
    ...r,
    rank_position: positionMap.get(r.profile_id) ?? computed.length,
    coins_rank: coinsR.get(r.profile_id) ?? computed.length,
    hours_rank: hoursR.get(r.profile_id) ?? computed.length,
    activity_rank: activityR.get(r.profile_id) ?? computed.length,
    battle_rank: battleR.get(r.profile_id) ?? computed.length,
  }));
}

export function rankingBadge(
  rankPosition: number | null,
  hasStats: boolean,
): import("@/lib/rankings/types").RankingBadge {
  if (!hasStats || rankPosition == null) return "New Member";
  if (rankPosition === 1) return "Factory Champion";
  if (rankPosition <= 3) return "Elite Creator";
  if (rankPosition <= 10) return "Rising Star";
  return "Active Member";
}

export function nextMilestoneMessage(
  rankPosition: number | null,
  rankScore: number,
  stats: { hours_streamed: number; coins_earned: number },
  leaderboardSize: number,
): string | null {
  if (rankPosition == null || leaderboardSize === 0) {
    return "Stats for this week are not in yet. Check back after your creator network update.";
  }
  if (rankPosition === 1) {
    return "You are #1 this period — keep the momentum and defend your Factory Champion spot.";
  }
  if (rankPosition <= 3) {
    return `You are ranked #${rankPosition} this period. Push coins or stream hours to challenge #1.`;
  }
  if (rankPosition <= 10) {
    return `You are ranked #${rankPosition} this period. Stream ~3 more hours or earn more coins to break into the Top 3.`;
  }
  return `You are ranked #${rankPosition} of ${leaderboardSize} (score ${rankScore.toFixed(1)}). Stream consistently and grow coins to climb toward Top 10.`;
}
