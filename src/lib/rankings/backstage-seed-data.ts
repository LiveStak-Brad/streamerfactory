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
 * Synced to NETWORK_MEMBERS roster (27 handles).
 */
export const BACKSTAGE_STAT_SEEDS: BackstageStatSeed[] = [
  { handle: "sunshine42882", diamondsEarned: 154_935, validLiveDays: 10, hoursStreamed: liveHours(42, 26), activeness: levelToActiveness(3), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "high.blondie", diamondsEarned: 92_014, validLiveDays: 12, hoursStreamed: liveHours(84, 8), activeness: levelToActiveness(3), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "cj_allycat93", diamondsEarned: 51_834, validLiveDays: 18, hoursStreamed: liveHours(77, 26), activeness: levelToActiveness(4), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "jasmine_wren", diamondsEarned: 38_799, validLiveDays: 17, hoursStreamed: liveHours(81, 24), activeness: levelToActiveness(3), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "ruthie8910", diamondsEarned: 25_975, validLiveDays: 15, hoursStreamed: liveHours(63, 50), activeness: levelToActiveness(4), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "rosysmokes", diamondsEarned: 18_257, validLiveDays: 11, hoursStreamed: liveHours(33, 20), activeness: levelToActiveness(2), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "robertljterryjr", diamondsEarned: 17_047, validLiveDays: 9, hoursStreamed: liveHours(73, 21), activeness: levelToActiveness(3), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "royaltystr8", diamondsEarned: 20_431, validLiveDays: 14, hoursStreamed: liveHours(46, 5), activeness: levelToActiveness(4), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "browneyedbrat6", diamondsEarned: 13_699, validLiveDays: 7, hoursStreamed: liveHours(20, 12), activeness: levelToActiveness(1), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "lilyunginn225", diamondsEarned: 8_119, validLiveDays: 2, hoursStreamed: liveHours(13, 48), activeness: levelToActiveness(1), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "deeindabox", diamondsEarned: 9_302, validLiveDays: 8, hoursStreamed: liveHours(30, 52), activeness: levelToActiveness(2), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "daddyslittlemonster87", diamondsEarned: 8_902, validLiveDays: 17, hoursStreamed: liveHours(52, 26), activeness: levelToActiveness(4), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "rissa7683", diamondsEarned: 6_345, validLiveDays: 17, hoursStreamed: liveHours(58, 56), activeness: levelToActiveness(3), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "kimberly.clarke396", diamondsEarned: 3_402, validLiveDays: 10, hoursStreamed: liveHours(57, 31), activeness: levelToActiveness(3), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "_sahm_251_2", diamondsEarned: 6_145, validLiveDays: 9, hoursStreamed: liveHours(23, 46), activeness: levelToActiveness(3), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "silvanita4444", diamondsEarned: 3_067, validLiveDays: 10, hoursStreamed: liveHours(26, 10), activeness: levelToActiveness(2), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "choppaboiofficial45p", diamondsEarned: 3_856, validLiveDays: 6, hoursStreamed: liveHours(13, 57), activeness: levelToActiveness(1), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "tricioxv3", diamondsEarned: 535, validLiveDays: 3, hoursStreamed: liveHours(10, 28), activeness: levelToActiveness(1), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "gonx_missouri_mom", diamondsEarned: 426, validLiveDays: 5, hoursStreamed: liveHours(10, 57), activeness: levelToActiveness(0), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "ciraantequera131", diamondsEarned: 899, validLiveDays: 6, hoursStreamed: liveHours(10, 30), activeness: levelToActiveness(0), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "bugzyboy.j", diamondsEarned: 311, validLiveDays: 0, hoursStreamed: liveHours(23, 58), activeness: levelToActiveness(1), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "bigmommagapo", diamondsEarned: 310, validLiveDays: 7, hoursStreamed: liveHours(14, 8), activeness: levelToActiveness(1), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "blazinbaby420", diamondsEarned: 160, validLiveDays: 2, hoursStreamed: liveHours(7, 35), activeness: levelToActiveness(1), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "jennyrn55", diamondsEarned: 1_557, validLiveDays: 1, hoursStreamed: liveHours(22, 2), activeness: levelToActiveness(1), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "nyla.williams8", diamondsEarned: 10, validLiveDays: 1, hoursStreamed: liveHours(15, 52), activeness: levelToActiveness(1), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "ashley8178", diamondsEarned: 578, validLiveDays: 0, hoursStreamed: liveHours(10, 1), activeness: levelToActiveness(1), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "brittanykavanagh09", diamondsEarned: 0, validLiveDays: 0, hoursStreamed: liveHours(0, 0), activeness: levelToActiveness(0), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
];

export function normalizeHandle(raw: string): string {
  return raw.trim().replace(/^@+/, "").toLowerCase();
}

export function resolveCanonicalHandle(handle: string): string {
  const n = normalizeHandle(handle);
  return BACKSTAGE_HANDLE_ALIASES[n] ?? handle.trim().replace(/^@+/, "");
}
