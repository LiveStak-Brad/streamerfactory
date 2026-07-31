import type { RankingBadge } from "@/lib/rankings/types";

/** Calendar month key: `YYYY-MM` (UTC). */
export type YearMonth = string;

export type HallOfFamePlacement = {
  place: 1 | 2 | 3 | 4 | 5;
  displayName: string;
  tiktokUsername: string;
  avatarUrl?: string | null;
  badge: RankingBadge | string;
  /** TikTok Creator Network level at archive time. */
  networkLevel?: number | null;
  profileId?: string | null;
};

export type HallOfFameMonthStatus = "locked" | "live";

export type HallOfFameMonth = {
  yearMonth: YearMonth;
  status: HallOfFameMonthStatus;
  lockedAt?: string | null;
  source?: "seed" | "archive" | "live";
  placements: HallOfFamePlacement[];
};

export type NetworkManager = {
  id: string;
  displayName: string;
  title: string;
  contactHandle: string;
  avatarUrl?: string | null;
  sortOrder: number;
  isPrimary?: boolean;
};

export type FactoryLegendCategory = {
  key: string;
  title: string;
  description: string;
  sortOrder: number;
};

export type FactoryLegendHolder = {
  categoryKey: string;
  displayName: string;
  tiktokUsername: string;
  avatarUrl?: string | null;
  valueLabel?: string | null;
  achievedAt?: string | null;
};

export type FactoryLegend = FactoryLegendCategory & {
  holder: FactoryLegendHolder | null;
};

/** Celebrated StreamerU graduates shown on the Hall of Fame. */
export type StreamerUGraduate = {
  memberId: string;
  displayName: string;
  tiktokUsername: string;
  diplomaLabel: string;
  certifiedLabel: string;
  careerPath?: string | null;
  graduatedAt: string;
  avatarUrl?: string | null;
};

export type HallOfFamePageData = {
  managers: NetworkManager[];
  /** Locked historical months, newest first. */
  archivedMonths: HallOfFameMonth[];
  /** Current calendar month provisional board (not yet locked). */
  liveMonth: HallOfFameMonth | null;
  legends: FactoryLegend[];
  /** StreamerU academy graduates (celebrated). */
  streamerUGraduates: StreamerUGraduate[];
  /** First month that archives places 2–5 (July 2026). */
  runnerUpStartMonth: YearMonth;
};
