import { RUNNER_UP_START_MONTH } from "@/lib/hall-of-fame/months";
import type {
  FactoryLegendCategory,
  FactoryLegendHolder,
  HallOfFameMonth,
  NetworkManager,
} from "@/lib/hall-of-fame/types";

/**
 * Network leadership — expand this list to add managers later.
 * Prefer DB rows when present; this seed is the bootstrap / fallback.
 */
export const NETWORK_MANAGERS_SEED: readonly NetworkManager[] = [
  {
    id: "brad-morris",
    displayName: "Brad Morris",
    title: "Founder of Streamer Factory",
    contactHandle: "warrentonjunk",
    /** Drop the photo at public/branding/team/brad-morris.png */
    avatarUrl: "/branding/team/brad-morris.png",
    sortOrder: 0,
    isPrimary: true,
  },
];

/**
 * Permanent historical champions before the automated archive pipeline.
 * May / June 2026: champion only. Runner-ups begin July 2026.
 */
export const HISTORICAL_MONTHS_SEED: readonly HallOfFameMonth[] = [
  {
    yearMonth: "2026-06",
    status: "locked",
    source: "seed",
    lockedAt: "2026-06-30T23:59:59.000Z",
    placements: [
      {
        place: 1,
        displayName: "Allyson",
        tiktokUsername: "cj_allycat93",
        badge: "Rising Star",
        networkLevel: 4,
      },
    ],
  },
  {
    yearMonth: "2026-05",
    status: "locked",
    source: "seed",
    lockedAt: "2026-05-31T23:59:59.000Z",
    placements: [
      {
        place: 1,
        displayName: "SunShine[SF]",
        tiktokUsername: "sunshine42882",
        badge: "Active Member",
        networkLevel: 12,
      },
    ],
  },
];

/** Lifetime achievement categories — add new keys here; holders attach separately. */
export const LEGEND_CATEGORIES_SEED: readonly FactoryLegendCategory[] = [
  {
    key: "first-level-50",
    title: "First Level 50 Creator",
    description: "The first Streamer Factory creator to reach Creator Network Level 50.",
    sortOrder: 10,
  },
  {
    key: "highest-level",
    title: "Highest Level",
    description: "Highest TikTok Creator Network level achieved in the Factory.",
    sortOrder: 20,
  },
  {
    key: "most-xp",
    title: "Most XP Earned",
    description: "Lifetime leader for Creator Network XP earned.",
    sortOrder: 30,
  },
  {
    key: "most-referrals",
    title: "Most Referrals",
    description: "Brought the most creators into Streamer Factory.",
    sortOrder: 40,
  },
  {
    key: "longest-streak",
    title: "Longest Active Streak",
    description: "Longest consecutive active streaming streak.",
    sortOrder: 50,
  },
  {
    key: "largest-following",
    title: "Largest TikTok Following",
    description: "Largest TikTok following among network creators.",
    sortOrder: 60,
  },
  {
    key: "highest-monthly-growth",
    title: "Highest Monthly Growth",
    description: "Biggest single-month follower growth in Factory history.",
    sortOrder: 70,
  },
  {
    key: "most-battles-won",
    title: "Most Battles Won",
    description: "Career leader for network battles won.",
    sortOrder: 80,
  },
  {
    key: "most-community",
    title: "Most Community Contributions",
    description: "Recognized for outstanding community leadership and support.",
    sortOrder: 90,
  },
];

/** Optional holders for legend categories (empty until earned). */
export const LEGEND_HOLDERS_SEED: readonly FactoryLegendHolder[] = [];

export { RUNNER_UP_START_MONTH };
