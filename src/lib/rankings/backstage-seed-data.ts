import type { ActivenessLevel } from "@/lib/rankings/types";

/** One row from TikTok Creator Network → Contribution details / Creator performance. */
export type BackstageStatSeed = {
  handle: string;
  /** Diamonds column (raw count, not USD). */
  diamondsEarned: number;
  /** First number from Valid go LIVE days (e.g. 21d / 17d → 21). */
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
  trikloxy3: "tricioxv3",
  sahm_251_2: "_sahm_251_2",
  genx_missouri_mom: "gonx_missouri_mom",
  "myla.williams8": "nyla.williams8",
  "nyla.williams3": "nyla.williams8",
  "nyia.williams8": "nyla.williams8",
  choppaboiofficial4: "choppaboiofficial45p",
  blazinbaby120: "blazinbaby420",
  silvanita1444: "silvanita4444",
  silvwhite4444: "silvanita4444",
  bottsmart633: "bettsmart633",
  lilyanginn225: "lilyunginn225",
  byunginn225: "lilyunginn225",
  ciroantequera131: "ciraantequera131",
  royaltyctr8: "royaltystr8",
  melissahelmig11998: "melissaholmig41998",
  melissahelmig41998: "melissaholmig41998",
  melissaholmig41998: "melissaholmig41998",
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
 * Eligible (35) minus quit/disconnected: robertljterryjr, kaleidoscope_views,
 * youngsaint187, floating.byx, pettynay._, skyywalker87.
 * Synced to NETWORK_MEMBERS (29 handles).
 */
export const BACKSTAGE_STAT_SEEDS: BackstageStatSeed[] = [
  { handle: "sunshine42882", diamondsEarned: 168_368, validLiveDays: 21, hoursStreamed: liveHours(46, 0), activeness: levelToActiveness(4), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "high.blondie", diamondsEarned: 104_844, validLiveDays: 15, hoursStreamed: liveHours(93, 10), activeness: levelToActiveness(4), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "jasmine_wren", diamondsEarned: 77_718, validLiveDays: 19, hoursStreamed: liveHours(96, 3), activeness: levelToActiveness(5), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "cj_allycat93", diamondsEarned: 62_993, validLiveDays: 22, hoursStreamed: liveHours(158, 44), activeness: levelToActiveness(5), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "royaltystr8", diamondsEarned: 30_656, validLiveDays: 18, hoursStreamed: liveHours(64, 18), activeness: levelToActiveness(5), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "ruthie8910", diamondsEarned: 25_576, validLiveDays: 14, hoursStreamed: liveHours(64, 17), activeness: levelToActiveness(4), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "rosysmokes", diamondsEarned: 23_762, validLiveDays: 18, hoursStreamed: liveHours(58, 11), activeness: levelToActiveness(4), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "daddyslittlemonster87", diamondsEarned: 10_516, validLiveDays: 20, hoursStreamed: liveHours(70, 10), activeness: levelToActiveness(4), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "_sahm_251_2", diamondsEarned: 12_891, validLiveDays: 14, hoursStreamed: liveHours(32, 18), activeness: levelToActiveness(3), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "browneyedbrat6", diamondsEarned: 13_748, validLiveDays: 7, hoursStreamed: liveHours(20, 13), activeness: levelToActiveness(1), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "deeindabox", diamondsEarned: 9_912, validLiveDays: 8, hoursStreamed: liveHours(30, 52), activeness: levelToActiveness(2), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "lilyunginn225", diamondsEarned: 8_119, validLiveDays: 2, hoursStreamed: liveHours(13, 41), activeness: levelToActiveness(1), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "rissa7683", diamondsEarned: 6_358, validLiveDays: 17, hoursStreamed: liveHours(58, 56), activeness: levelToActiveness(3), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "bettsmart633", diamondsEarned: 4_238, validLiveDays: 0, hoursStreamed: 0, activeness: levelToActiveness(2), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "choppaboiofficial45p", diamondsEarned: 3_914, validLiveDays: 6, hoursStreamed: liveHours(13, 57), activeness: levelToActiveness(2), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "silvanita4444", diamondsEarned: 3_206, validLiveDays: 10, hoursStreamed: liveHours(24, 10), activeness: levelToActiveness(2), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "jennyrn55", diamondsEarned: 1_537, validLiveDays: 1, hoursStreamed: liveHours(2, 22), activeness: levelToActiveness(1), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "ciraantequera131", diamondsEarned: 899, validLiveDays: 5, hoursStreamed: liveHours(10, 30), activeness: levelToActiveness(1), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "ashley8178", diamondsEarned: 578, validLiveDays: 6, hoursStreamed: liveHours(0, 19), activeness: levelToActiveness(1), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "amylong86", diamondsEarned: 457, validLiveDays: 0, hoursStreamed: liveHours(0, 0), activeness: levelToActiveness(0), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "gonx_missouri_mom", diamondsEarned: 426, validLiveDays: 5, hoursStreamed: liveHours(11, 51), activeness: levelToActiveness(1), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "bugzyboy.j", diamondsEarned: 311, validLiveDays: 0, hoursStreamed: liveHours(2, 54), activeness: levelToActiveness(1), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "bigmommagapo", diamondsEarned: 310, validLiveDays: 7, hoursStreamed: liveHours(16, 38), activeness: levelToActiveness(1), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "blazinbaby420", diamondsEarned: 160, validLiveDays: 2, hoursStreamed: liveHours(7, 55), activeness: levelToActiveness(1), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "judy_132", diamondsEarned: 119, validLiveDays: 1, hoursStreamed: liveHours(3, 44), activeness: levelToActiveness(0), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "nyla.williams8", diamondsEarned: 10, validLiveDays: 1, hoursStreamed: liveHours(1, 53), activeness: levelToActiveness(1), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "melissaholmig41998", diamondsEarned: 0, validLiveDays: 1, hoursStreamed: liveHours(1, 38), activeness: levelToActiveness(0), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "brittanykavanagh09", diamondsEarned: 0, validLiveDays: 0, hoursStreamed: liveHours(0, 0), activeness: levelToActiveness(0), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
];

export function normalizeHandle(raw: string): string {
  return raw.trim().replace(/^@+/, "").toLowerCase();
}

export function resolveCanonicalHandle(handle: string): string {
  const n = normalizeHandle(handle);
  return BACKSTAGE_HANDLE_ALIASES[n] ?? handle.trim().replace(/^@+/, "");
}
