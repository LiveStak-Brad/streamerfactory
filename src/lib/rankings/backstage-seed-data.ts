import type { ActivenessLevel } from "@/lib/rankings/types";

/** One row from TikTok Creator Network → Creator performance (your May 2026 screenshots). */
export type BackstageStatSeed = {
  handle: string;
  /** Diamonds column (raw count, not USD). */
  diamondsEarned: number;
  /** First number from Valid go LIVE days (e.g. 13d / 14d → 13). */
  validLiveDays: number;
  hoursStreamed: number;
  activeness: ActivenessLevel;
  followerGrowth: number;
  battlesPlayed: number;
  battlesWon: number;
};

/** Backstage handle typos / variants → roster @handle. */
export const BACKSTAGE_HANDLE_ALIASES: Record<string, string> = {
  jennym55: "jennyrn55",
  triciaxv3: "tricioxv3",
  sahm_251_2: "_sahm_251_2",
  genx_missouri_mom: "gonx_missouri_mom",
  "myla.williams8": "nyla.williams8",
  "nyla.williams3": "nyla.williams8",
  choppaboiofficial4: "choppaboiofficial45p",
  blazinbaby120: "blazinbaby420",
  silvanita1444: "silvanita4444",
  robertljerryjr: "robertljterryjr",
  clroantequero131: "ciraantequera131",
  byunginn225: "lilyunginn225",
};

function levelToActiveness(level: number | null): ActivenessLevel {
  if (level == null || level <= 0) return "none";
  if (level === 1) return "low";
  if (level === 2) return "medium";
  if (level === 3) return "high";
  return "elite";
}

/** LIVE duration → decimal hours. */
function liveHours(h: number, m: number): number {
  return Math.round((h + m / 60) * 100) / 100;
}

/**
 * Creator performance tab — Diamonds, valid LIVE days, LIVE duration, Level.
 * Synced to NETWORK_MEMBERS roster (28 handles).
 */
export const BACKSTAGE_STAT_SEEDS: BackstageStatSeed[] = [
  { handle: "sunshine42882", diamondsEarned: 113_466, validLiveDays: 13, hoursStreamed: liveHours(21, 46), activeness: levelToActiveness(3), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "high.blondie", diamondsEarned: 59_883, validLiveDays: 9, hoursStreamed: liveHours(67, 7), activeness: levelToActiveness(2), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "cj_allycat93", diamondsEarned: 32_830, validLiveDays: 13, hoursStreamed: liveHours(74, 47), activeness: levelToActiveness(4), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "jasmine_wren", diamondsEarned: 29_340, validLiveDays: 12, hoursStreamed: liveHours(60, 26), activeness: levelToActiveness(3), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "ruthie8910", diamondsEarned: 23_403, validLiveDays: 14, hoursStreamed: liveHours(58, 12), activeness: levelToActiveness(4), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "rosysmokes", diamondsEarned: 17_606, validLiveDays: 10, hoursStreamed: liveHours(28, 33), activeness: levelToActiveness(2), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "robertljterryjr", diamondsEarned: 15_814, validLiveDays: 8, hoursStreamed: liveHours(71, 16), activeness: levelToActiveness(2), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "royaltystr8", diamondsEarned: 13_643, validLiveDays: 9, hoursStreamed: liveHours(26, 27), activeness: levelToActiveness(2), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "browneyedbrat6", diamondsEarned: 10_682, validLiveDays: 4, hoursStreamed: liveHours(10, 37), activeness: levelToActiveness(0), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "lilyunginn225", diamondsEarned: 7_907, validLiveDays: 3, hoursStreamed: liveHours(10, 32), activeness: levelToActiveness(0), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "deeindabox", diamondsEarned: 6_494, validLiveDays: 5, hoursStreamed: liveHours(22, 19), activeness: levelToActiveness(1), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "daddyslittlemonster87", diamondsEarned: 6_838, validLiveDays: 13, hoursStreamed: liveHours(45, 9), activeness: levelToActiveness(4), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "rissa7683", diamondsEarned: 3_862, validLiveDays: 11, hoursStreamed: liveHours(28, 51), activeness: levelToActiveness(3), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "kaleidoscope_views", diamondsEarned: 3_649, validLiveDays: 4, hoursStreamed: liveHours(11, 40), activeness: levelToActiveness(1), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "kimberly.clarke396", diamondsEarned: 3_144, validLiveDays: 7, hoursStreamed: liveHours(21, 12), activeness: levelToActiveness(2), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "_sahm_251_2", diamondsEarned: 4_288, validLiveDays: 6, hoursStreamed: liveHours(17, 3), activeness: levelToActiveness(1), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "silvanita4444", diamondsEarned: 2_939, validLiveDays: 7, hoursStreamed: liveHours(19, 0), activeness: levelToActiveness(1), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "choppaboiofficial45p", diamondsEarned: 1_527, validLiveDays: 3, hoursStreamed: liveHours(8, 25), activeness: levelToActiveness(0), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "tricioxv3", diamondsEarned: 533, validLiveDays: 3, hoursStreamed: liveHours(9, 28), activeness: levelToActiveness(0), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "gonx_missouri_mom", diamondsEarned: 426, validLiveDays: 5, hoursStreamed: liveHours(10, 57), activeness: levelToActiveness(0), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "ciraantequera131", diamondsEarned: 899, validLiveDays: 6, hoursStreamed: liveHours(10, 30), activeness: levelToActiveness(0), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "bugzyboy.j", diamondsEarned: 212, validLiveDays: 1, hoursStreamed: liveHours(1, 13), activeness: levelToActiveness(1), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "bigmommagapo", diamondsEarned: 233, validLiveDays: 7, hoursStreamed: liveHours(14, 59), activeness: levelToActiveness(1), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "blazinbaby420", diamondsEarned: 146, validLiveDays: 2, hoursStreamed: liveHours(6, 11), activeness: levelToActiveness(0), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "jennyrn55", diamondsEarned: 137, validLiveDays: 0, hoursStreamed: liveHours(1, 12), activeness: levelToActiveness(0), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "nyla.williams8", diamondsEarned: 10, validLiveDays: 1, hoursStreamed: liveHours(1, 53), activeness: levelToActiveness(0), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "ashley8178", diamondsEarned: 10, validLiveDays: 0, hoursStreamed: liveHours(0, 19), activeness: levelToActiveness(0), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "brittanykavanagh09", diamondsEarned: 0, validLiveDays: 0, hoursStreamed: liveHours(0, 0), activeness: levelToActiveness(0), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
];

export function normalizeHandle(raw: string): string {
  return raw.trim().replace(/^@+/, "").toLowerCase();
}

export function resolveCanonicalHandle(handle: string): string {
  const n = normalizeHandle(handle);
  return BACKSTAGE_HANDLE_ALIASES[n] ?? handle.trim().replace(/^@+/, "");
}
