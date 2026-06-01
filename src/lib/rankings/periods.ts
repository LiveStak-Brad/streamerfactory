import { parseRankingPeriod, type RankingPeriod } from "@/lib/rankings/types";

export function toDateString(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export function periodBounds(
  kind: RankingPeriod,
  anchor: Date = new Date(),
): { periodStart: string; periodEnd: string } {
  const period = parseRankingPeriod(kind);

  if (period === "all-time") {
    return { periodStart: "2000-01-01", periodEnd: "2099-12-31" };
  }

  const start = new Date(Date.UTC(anchor.getUTCFullYear(), anchor.getUTCMonth(), 1));
  const end = new Date(Date.UTC(anchor.getUTCFullYear(), anchor.getUTCMonth() + 1, 0));
  return { periodStart: toDateString(start), periodEnd: toDateString(end) };
}

export function formatPeriodLabel(kind: RankingPeriod, periodStart: string, periodEnd: string): string {
  if (kind === "all-time") return "All time";
  return `${periodStart} → ${periodEnd}`;
}
