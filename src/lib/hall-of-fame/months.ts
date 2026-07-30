import type { YearMonth } from "@/lib/hall-of-fame/types";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

/** Months at/after this key archive places 2–5 in addition to the champion. */
export const RUNNER_UP_START_MONTH: YearMonth = "2026-07";

export function isValidYearMonth(value: string): value is YearMonth {
  return /^\d{4}-(0[1-9]|1[0-2])$/.test(value);
}

export function yearMonthFromDate(date: Date = new Date()): YearMonth {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

/** Mid-month UTC anchor for leaderboard period queries. */
export function anchorDateForYearMonth(yearMonth: YearMonth): Date {
  const [y, m] = yearMonth.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, 15, 12, 0, 0));
}

export function formatYearMonthLabel(yearMonth: YearMonth): string {
  const [y, m] = yearMonth.split("-").map(Number);
  return `${MONTH_NAMES[m - 1]} ${y}`;
}

export function compareYearMonthDesc(a: YearMonth, b: YearMonth): number {
  return b.localeCompare(a);
}

export function tracksRunnerUps(yearMonth: YearMonth): boolean {
  return yearMonth >= RUNNER_UP_START_MONTH;
}

export function placementLabel(place: number): string {
  if (place === 1) return "Champion";
  if (place === 2) return "2nd Place";
  if (place === 3) return "3rd Place";
  if (place === 4) return "4th Place";
  if (place === 5) return "5th Place";
  return `#${place}`;
}

export function placementMedal(place: number): string {
  if (place === 1) return "🥇";
  if (place === 2) return "🥈";
  if (place === 3) return "🥉";
  return `#${place}`;
}

/** How many placements to lock for a given month. */
export function archivePlaceCount(yearMonth: YearMonth): number {
  return tracksRunnerUps(yearMonth) ? 5 : 1;
}
