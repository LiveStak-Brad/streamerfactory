import type { RankingPeriod } from "@/lib/rankings/types";

/** Monday 00:00 local (use UTC date parts for consistency in admin UI). */
export function startOfWeekMonday(d: Date): Date {
  const x = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  const day = x.getUTCDay();
  const diff = day === 0 ? -6 : 1 - day;
  x.setUTCDate(x.getUTCDate() + diff);
  return x;
}

export function toDateString(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export function periodBounds(
  kind: RankingPeriod,
  anchor: Date = new Date(),
): { periodStart: string; periodEnd: string } {
  if (kind === "all-time") {
    return { periodStart: "2000-01-01", periodEnd: "2099-12-31" };
  }

  if (kind === "monthly") {
    const start = new Date(Date.UTC(anchor.getUTCFullYear(), anchor.getUTCMonth(), 1));
    const end = new Date(Date.UTC(anchor.getUTCFullYear(), anchor.getUTCMonth() + 1, 0));
    return { periodStart: toDateString(start), periodEnd: toDateString(end) };
  }

  const start = startOfWeekMonday(anchor);
  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + 6);
  return { periodStart: toDateString(start), periodEnd: toDateString(end) };
}

export function formatPeriodLabel(kind: RankingPeriod, periodStart: string, periodEnd: string): string {
  if (kind === "all-time") return "All time";
  return `${periodStart} → ${periodEnd}`;
}
