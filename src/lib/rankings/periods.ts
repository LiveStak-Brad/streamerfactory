import type { RankingPeriod } from "@/lib/rankings/types";

export function toDateString(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/** Calendar month (UTC) containing `anchor`. Ranking period is always monthly. */
export function periodBounds(
  _kind: RankingPeriod = "monthly",
  anchor: Date = new Date(),
): { periodStart: string; periodEnd: string } {
  const start = new Date(Date.UTC(anchor.getUTCFullYear(), anchor.getUTCMonth(), 1));
  const end = new Date(Date.UTC(anchor.getUTCFullYear(), anchor.getUTCMonth() + 1, 0));
  return { periodStart: toDateString(start), periodEnd: toDateString(end) };
}

export function formatPeriodLabel(
  _kind: RankingPeriod,
  periodStart: string,
  periodEnd: string,
): string {
  return `${periodStart} → ${periodEnd}`;
}
