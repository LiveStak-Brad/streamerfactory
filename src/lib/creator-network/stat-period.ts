import { periodBounds, toDateString } from "@/lib/rankings/periods";
import type { RankingPeriod } from "@/lib/rankings/types";

export type StatPeriodKind = "weekly" | "monthly";

export function inferPeriodKindFromLabel(label: string | null | undefined): StatPeriodKind | null {
  if (!label?.trim()) return null;
  const t = label.toLowerCase();
  if (/\bmonth(ly)?\b/.test(t)) return "monthly";
  if (/\bweek(ly)?\b/.test(t)) return "weekly";
  return null;
}

export function resolveImportPeriodBounds(payload: {
  statPeriodLabel?: string | null;
  statPeriodStart?: string | null;
  statPeriodEnd?: string | null;
  statPeriodKind?: StatPeriodKind | null;
  importedAt?: Date;
}): {
  kind: StatPeriodKind | null;
  periodStart: string | null;
  periodEnd: string | null;
} {
  const anchor = payload.importedAt ?? new Date();
  const kind =
    payload.statPeriodKind ??
    inferPeriodKindFromLabel(payload.statPeriodLabel) ??
    null;

  if (payload.statPeriodStart && payload.statPeriodEnd) {
    return {
      kind,
      periodStart: payload.statPeriodStart,
      periodEnd: payload.statPeriodEnd,
    };
  }

  if (!kind) {
    return { kind: null, periodStart: null, periodEnd: null };
  }

  const { periodStart, periodEnd } = periodBounds(kind, anchor);
  return { kind, periodStart, periodEnd };
}

export type ImportPeriodFields = {
  stat_period_label: string | null;
  stat_period_start: string | null;
  stat_period_end: string | null;
  days_streamed: number;
};

export function isPlausibleDaysStreamed(days: number, kind: StatPeriodKind): boolean {
  const n = Math.max(0, Math.floor(days));
  if (kind === "weekly") return n <= 7;
  return n <= 31;
}

/** Fix stored/imported day counts (monthly targets like 30 leaking into weekly). */
export function sanitizeLiveDaysForPeriod(
  days: number | undefined | null,
  kind: StatPeriodKind | null,
): number {
  const n = Math.max(0, Math.round(days ?? 0));
  if (!kind) return n;
  if (kind === "weekly") {
    if (n > 7) return 0;
    return n;
  }
  if (n > 31) return 0;
  return n;
}

/** Whether an import batch is for the requested weekly/monthly period (ignore day counts). */
export function importBatchMatchesRankingPeriod(
  rows: ImportPeriodFields[],
  kind: StatPeriodKind,
  periodStart: string,
  periodEnd: string,
  batchCreatedAt?: string | null,
): boolean {
  const sample =
    rows.find((r) => r.stat_period_start && r.stat_period_end) ??
    rows.find((r) => r.stat_period_label);

  if (sample?.stat_period_start && sample.stat_period_end) {
    return sample.stat_period_start === periodStart && sample.stat_period_end === periodEnd;
  }

  const rowKind = inferPeriodKindFromLabel(sample?.stat_period_label ?? null);
  if (rowKind && rowKind !== kind) return false;
  if (rowKind === kind) return true;

  if (!rowKind && batchCreatedAt) {
    const created = toDateString(new Date(batchCreatedAt));
    return created >= periodStart && created <= periodEnd;
  }

  return false;
}

/** @deprecated Use importBatchMatchesRankingPeriod — kept for tests. */
export function rowMatchesRankingPeriod(
  row: ImportPeriodFields,
  kind: StatPeriodKind,
  periodStart: string,
  periodEnd: string,
  batchCreatedAt?: string | null,
): boolean {
  return importBatchMatchesRankingPeriod([row], kind, periodStart, periodEnd, batchCreatedAt);
}

export function periodKindForRanking(kind: RankingPeriod): StatPeriodKind | null {
  if (kind === "weekly" || kind === "monthly") return kind;
  return null;
}
