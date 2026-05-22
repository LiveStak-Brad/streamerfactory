import { NETWORK_MEMBERS } from "@/lib/members/network-members";
import {
  BACKSTAGE_STAT_SEEDS,
  normalizeHandle,
  resolveCanonicalHandle,
} from "@/lib/rankings/backstage-seed-data";
import { assignRanks, computeRankings } from "@/lib/rankings/scoring";
import type { ActivenessLevel, LeaderboardEntry } from "@/lib/rankings/types";

const displayNameByHandle = new Map(
  NETWORK_MEMBERS.map((m) => [normalizeHandle(m.username), m.displayName]),
);

/**
 * Leaderboard built from the Creator Network screenshots you provided.
 * Does not require Supabase rows or profile matching — always available on /rankings.
 */
export function getLeaderboardFromBackstageSeed(): LeaderboardEntry[] {
  const statsForScoring = BACKSTAGE_STAT_SEEDS.map((s) => ({
    profile_id: normalizeHandle(resolveCanonicalHandle(s.handle)),
    coins_earned: s.diamondsEarned,
    days_streamed: s.validLiveDays,
    hours_streamed: s.hoursStreamed,
    activeness_level: s.activeness,
    battles_played: s.battlesPlayed,
    battles_won: s.battlesWon,
  }));

  const ranked = assignRanks(computeRankings(statsForScoring));

  const entries = ranked.map((r) => {
    const handle = r.profile_id;
    const seed = BACKSTAGE_STAT_SEEDS.find(
      (s) => normalizeHandle(resolveCanonicalHandle(s.handle)) === handle,
    );
    return {
      profile_id: handle,
      email: null,
      tiktok_username: seed?.handle ?? handle,
      rank_position: r.rank_position,
      rank_score: r.rank_score,
      coins_rank: r.coins_rank,
      hours_rank: r.hours_rank,
      activity_rank: r.activity_rank,
      battle_rank: r.battle_rank,
      coins_earned: seed?.diamondsEarned ?? 0,
      days_streamed: seed?.validLiveDays ?? 0,
      hours_streamed: seed?.hoursStreamed ?? 0,
      activeness_level: (seed?.activeness ?? "none") as ActivenessLevel,
      follower_growth: seed?.followerGrowth ?? 0,
      battles_played: seed?.battlesPlayed ?? 0,
      battles_won: seed?.battlesWon ?? 0,
    } satisfies LeaderboardEntry;
  });

  // Public #1, #2, … follow backstage Diamonds column (not composite score alone).
  return entries
    .sort((a, b) => b.coins_earned - a.coins_earned)
    .map((e, index) => ({
      ...e,
      rank_position: index + 1,
      coins_rank: index + 1,
    }));
}

export function displayLabelForHandle(handle: string): string {
  const n = normalizeHandle(handle);
  return displayNameByHandle.get(n) ?? `@${handle}`;
}
