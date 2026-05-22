import type { ActivenessLevel } from "@/lib/rankings/types";

/** One row from TikTok Creator Network → Creator performance (May 2026 screenshots). */
export type BackstageStatSeed = {
  /** TikTok @handle (no @) — must match profiles.tiktok_username or alias below. */
  handle: string;
  /** Diamond / net income in cents ($8.14 → 814). */
  coinsCents: number;
  validLiveDays: number;
  /** Parsed from live duration (e.g. 57h1m → 57.02). */
  hoursStreamed: number;
  activeness: ActivenessLevel;
  followerGrowth: number;
  battlesPlayed: number;
  battlesWon: number;
};

/** Alternate handles seen in backstage vs profiles / directory. */
export const BACKSTAGE_HANDLE_ALIASES: Record<string, string> = {
  jennym55: "jennyrn55",
  triciaxv3: "tricioxv3",
  sahm_251_2: "_sahm_251_2",
  genx_missouri_mom: "gonx_missouri_mom",
  "myla.williams8": "nyla.williams8",
  choppaboiofficial4: "choppaboiofficial45p",
};

function levelToActiveness(level: number | null): ActivenessLevel {
  if (level == null || level <= 0) return "none";
  if (level === 1) return "low";
  if (level === 2) return "medium";
  if (level === 3) return "high";
  return "elite";
}

/** Stats extracted from backstage screenshots you provided. */
export const BACKSTAGE_STAT_SEEDS: BackstageStatSeed[] = [
  // bugzyboy.j — $50.00, 0d/5d, 1h43m, Level 1
  {
    handle: "bugzyboy.j",
    coinsCents: 5000,
    validLiveDays: 0,
    hoursStreamed: 1.72,
    activeness: levelToActiveness(1),
    followerGrowth: 18,
    battlesPlayed: 0,
    battlesWon: 0,
  },
  // ruthie8910 — top row: $8.14, 14d/17d, 57h1m, Level 4
  {
    handle: "ruthie8910",
    coinsCents: 814,
    validLiveDays: 14,
    hoursStreamed: 57.02,
    activeness: levelToActiveness(4),
    followerGrowth: 23,
    battlesPlayed: 0,
    battlesWon: 0,
  },
  { handle: "cj_allycat93", coinsCents: 0, validLiveDays: 0, hoursStreamed: 0, activeness: levelToActiveness(4), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "daddyslittlemonster87", coinsCents: 0, validLiveDays: 0, hoursStreamed: 0, activeness: levelToActiveness(4), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "sunshine42882", coinsCents: 0, validLiveDays: 0, hoursStreamed: 0, activeness: levelToActiveness(2), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "jasmine_wren", coinsCents: 0, validLiveDays: 0, hoursStreamed: 0, activeness: levelToActiveness(3), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "rissa7683", coinsCents: 0, validLiveDays: 0, hoursStreamed: 0, activeness: levelToActiveness(3), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "rosysmokes", coinsCents: 0, validLiveDays: 0, hoursStreamed: 0, activeness: levelToActiveness(2), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "high.blondie", coinsCents: 0, validLiveDays: 0, hoursStreamed: 0, activeness: levelToActiveness(2), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "royaltystr8", coinsCents: 0, validLiveDays: 0, hoursStreamed: 0, activeness: levelToActiveness(2), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "robertljterryjr", coinsCents: 0, validLiveDays: 0, hoursStreamed: 0, activeness: levelToActiveness(2), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "silvanita4444", coinsCents: 0, validLiveDays: 0, hoursStreamed: 0, activeness: levelToActiveness(1), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "bigmommagapo", coinsCents: 0, validLiveDays: 0, hoursStreamed: 0, activeness: levelToActiveness(1), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "kimberly.clarke396", coinsCents: 0, validLiveDays: 0, hoursStreamed: 0, activeness: levelToActiveness(2), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "_sahm_251_2", coinsCents: 0, validLiveDays: 0, hoursStreamed: 0, activeness: levelToActiveness(1), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "ciraantequera131", coinsCents: 0, validLiveDays: 0, hoursStreamed: 0, activeness: levelToActiveness(0), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "gonx_missouri_mom", coinsCents: 0, validLiveDays: 0, hoursStreamed: 0, activeness: levelToActiveness(0), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  // deeindabox — $0.64, 5d/7d, ~22h19m, Level 1
  {
    handle: "deeindabox",
    coinsCents: 64,
    validLiveDays: 5,
    hoursStreamed: 22.32,
    activeness: levelToActiveness(1),
    followerGrowth: 19,
    battlesPlayed: 0,
    battlesWon: 0,
  },
  // kaleidoscope_views — $0.36, Level 1
  {
    handle: "kaleidoscope_views",
    coinsCents: 36,
    validLiveDays: 0,
    hoursStreamed: 0,
    activeness: levelToActiveness(1),
    followerGrowth: 0,
    battlesPlayed: 0,
    battlesWon: 0,
  },
  { handle: "tricioxv3", coinsCents: 0, validLiveDays: 0, hoursStreamed: 0, activeness: levelToActiveness(0), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "choppaboiofficial45p", coinsCents: 0, validLiveDays: 0, hoursStreamed: 0, activeness: levelToActiveness(0), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "nyla.williams8", coinsCents: 0, validLiveDays: 0, hoursStreamed: 0, activeness: levelToActiveness(0), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "jennyrn55", coinsCents: 0, validLiveDays: 0, hoursStreamed: 0, activeness: levelToActiveness(0), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "brittanykavanagh09", coinsCents: 0, validLiveDays: 0, hoursStreamed: 0, activeness: levelToActiveness(0), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "lilyunginn225", coinsCents: 0, validLiveDays: 0, hoursStreamed: 0, activeness: levelToActiveness(0), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "blazinbaby420", coinsCents: 0, validLiveDays: 0, hoursStreamed: 0, activeness: levelToActiveness(0), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "ashley8178", coinsCents: 0, validLiveDays: 0, hoursStreamed: 0, activeness: levelToActiveness(0), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
  { handle: "browneyedbrat6", coinsCents: 0, validLiveDays: 0, hoursStreamed: 0, activeness: levelToActiveness(0), followerGrowth: 0, battlesPlayed: 0, battlesWon: 0 },
];

export function normalizeHandle(raw: string): string {
  return raw.trim().replace(/^@+/, "").toLowerCase();
}

export function resolveCanonicalHandle(handle: string): string {
  const n = normalizeHandle(handle);
  return BACKSTAGE_HANDLE_ALIASES[n] ?? handle.trim().replace(/^@+/, "");
}
