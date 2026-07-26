export const ACTIVENESS_LEVELS = ["none", "low", "medium", "high", "elite"] as const;
export type ActivenessLevel = (typeof ACTIVENESS_LEVELS)[number];

/** Site leaderboards are monthly only (legacy weekly / all-time URLs map here). */
export const RANKING_PERIODS = ["monthly"] as const;
export type RankingPeriod = (typeof RANKING_PERIODS)[number];

/** Legacy URLs may still say weekly or all-time — treat as monthly. */
export function parseRankingPeriod(raw: string | undefined): RankingPeriod {
  if (raw === "weekly" || raw === "all-time") return "monthly";
  if (raw && (RANKING_PERIODS as readonly string[]).includes(raw)) {
    return raw as RankingPeriod;
  }
  return "monthly";
}

export type PerformanceStatsRow = {
  id: string;
  profile_id: string;
  period_start: string;
  period_end: string;
  coins_earned: number;
  days_streamed: number;
  hours_streamed: number;
  activeness_level: ActivenessLevel;
  follower_count: number;
  follower_growth: number;
  battles_played: number;
  battles_won: number;
  created_at: string;
  updated_at: string;
};

export type CreatorRankingRow = {
  id: string;
  profile_id: string;
  ranking_period: RankingPeriod;
  period_start: string | null;
  period_end: string | null;
  rank_score: number;
  rank_position: number | null;
  coins_rank: number | null;
  hours_rank: number | null;
  activity_rank: number | null;
  battle_rank: number | null;
  calculated_at: string;
};

export type LeaderboardEntry = {
  profile_id: string;
  email: string | null;
  tiktok_username: string | null;
  /** Resolved avatar: profile TikTok OAuth → imported Backstage → none. */
  avatar_url?: string | null;
  rank_position: number | null;
  rank_score: number;
  coins_rank: number | null;
  hours_rank: number | null;
  activity_rank: number | null;
  battle_rank: number | null;
  coins_earned: number;
  days_streamed: number;
  hours_streamed: number;
  activeness_level: ActivenessLevel;
  follower_growth: number;
  battles_played: number;
  battles_won: number;
};

export type RankingBadge =
  | "Factory Champion"
  | "Elite Creator"
  | "Rising Star"
  | "Active Member"
  | "New Member";
