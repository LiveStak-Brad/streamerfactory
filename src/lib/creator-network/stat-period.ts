import { periodBounds, toDateString } from "@/lib/rankings/periods";
import type { RankingPeriod } from "@/lib/rankings/types";

/** Backstage import period — site uses monthly only (weekly tab syncs map to monthly). */
export type StatPeriodKind = "monthly";

/** Label detection only (weekly label → needs re-sync on Monthly tab). */
export type DetectedStatPeriodLabel = "weekly" | "monthly";

export function inferPeriodKindFromLabel(
  label: string | null | undefined,
): DetectedStatPeriodLabel | null {
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

  if (payload.statPeriodStart && payload.statPeriodEnd) {
    return {
      kind: "monthly",
      periodStart: payload.statPeriodStart,
      periodEnd: payload.statPeriodEnd,
    };
  }

  const { periodStart, periodEnd } = periodBounds("monthly", anchor);
  return { kind: "monthly", periodStart, periodEnd };
}

export type ImportPeriodFields = {
  stat_period_label: string | null;
  stat_period_start: string | null;
  stat_period_end: string | null;
  days_streamed: number;
};

export function isPlausibleDaysStreamed(days: number): boolean {
  return Math.max(0, Math.floor(days)) <= 31;
}

/** Cap impossible monthly day counts (e.g. target 30 mis-read as achievement). */
export function sanitizeLiveDaysForPeriod(days: number | undefined | null): number {
  return sanitizeLiveDaysForPeriodNullable(days) ?? 0;
}

/**
 * Nullable variant — missing input stays missing (null).
 * Only returns 0 when the source value is a present zero (or sanitized target misread).
 */
export function sanitizeLiveDaysForPeriodNullable(
  days: number | undefined | null,
): number | null {
  if (days === undefined || days === null || !Number.isFinite(days)) return null;
  const n = Math.max(0, Math.round(days));
  if (n > 31) return null;
  // Monthly Backstage target is 30d (0d / 30d) — often stored as 30 when actual is 0.
  if (n === 30) return 0;
  return n;
}

/**
 * Whether an import batch matches the ranking month.
 *
 * Exact Backstage period bounds win when present.
 * A bare "Monthly" label is NOT enough — that used to let the first-month sync
 * keep matching every later month. Sync time must fall in the ranking window.
 */
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
  if (rowKind === "weekly") return false;
  if (rowKind && rowKind !== kind) return false;

  if (!batchCreatedAt) return false;
  const created = toDateString(new Date(batchCreatedAt));
  return created >= periodStart && created <= periodEnd;
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

export function periodKindForRanking(_kind: RankingPeriod): StatPeriodKind {
  return "monthly";
}
