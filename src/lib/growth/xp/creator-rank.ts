/**
 * Creator Rank — leveled progression driven by Factory XP.
 *
 * Naming:
 * - Member UI: "Factory XP" / Creator Rank
 * - Database: `reputation_ledger` / Factory Reputation (canonical store)
 * - StreamerU assessment XP (`src/lib/assessments/xp.ts`) is a separate
 *   academy-mastery currency and must never write to reputation_ledger.
 */

export type CreatorRankTier = {
  key: string;
  name: string;
  /** Inclusive minimum lifetime XP */
  minXp: number;
  blurb: string;
};

/** Ordered lowest → highest. Level index = array index + 1. */
export const CREATOR_RANKS: CreatorRankTier[] = [
  {
    key: "recruit",
    name: "Recruit",
    minXp: 0,
    blurb: "Just stepped onto the floor. Check in daily and start training.",
  },
  {
    key: "apprentice",
    name: "Apprentice",
    minXp: 50,
    blurb: "Showing up. Keep the streak and knock out StreamerU missions.",
  },
  {
    key: "creator",
    name: "Creator",
    minXp: 150,
    blurb: "Building real habit. Missions, lessons, and battles count.",
  },
  {
    key: "rising",
    name: "Rising Creator",
    minXp: 350,
    blurb: "Momentum is visible. Weekly challenges unlock bigger XP.",
  },
  {
    key: "proven",
    name: "Proven Creator",
    minXp: 650,
    blurb: "Consistency earned. Mentor track is coming into view.",
  },
  {
    key: "elite",
    name: "Elite Creator",
    minXp: 1100,
    blurb: "Top-tier Factory presence. Lead by example in battles and training.",
  },
  {
    key: "legend",
    name: "Factory Legend",
    minXp: 1800,
    blurb: "The ceiling others aim for. Ceremony, mentorship, and network leadership.",
  },
];

export type CreatorRankProgress = {
  xp: number;
  level: number;
  tier: CreatorRankTier;
  nextTier: CreatorRankTier | null;
  xpIntoTier: number;
  xpForNext: number;
  percentToNext: number;
};

export function getCreatorRank(xp: number): CreatorRankProgress {
  const safeXp = Math.max(0, Math.floor(xp));
  let tierIndex = 0;
  for (let i = 0; i < CREATOR_RANKS.length; i++) {
    if (safeXp >= CREATOR_RANKS[i].minXp) tierIndex = i;
  }
  const tier = CREATOR_RANKS[tierIndex];
  const nextTier = CREATOR_RANKS[tierIndex + 1] ?? null;
  const xpIntoTier = safeXp - tier.minXp;
  const span = nextTier ? nextTier.minXp - tier.minXp : Math.max(xpIntoTier, 1);
  const percentToNext = nextTier
    ? Math.min(100, Math.round((xpIntoTier / span) * 100))
    : 100;

  return {
    xp: safeXp,
    level: tierIndex + 1,
    tier,
    nextTier,
    xpIntoTier,
    xpForNext: nextTier ? Math.max(0, nextTier.minXp - safeXp) : 0,
    percentToNext,
  };
}

/** True when crossing into a new tier (not first-time at recruit). */
export function didRankUp(prevXp: number, nextXp: number): boolean {
  if (nextXp <= prevXp) return false;
  return getCreatorRank(prevXp).tier.key !== getCreatorRank(nextXp).tier.key;
}
