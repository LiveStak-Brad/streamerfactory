/**
 * Explicit metric presence — never coerce missing → 0.
 * Numeric zero is only valid when status === "present" and value === 0.
 */

export const METRIC_STATUSES = [
  "present",
  "missing",
  "not_applicable",
  "not_visible",
  "parse_failed",
] as const;

export type MetricStatus = (typeof METRIC_STATUSES)[number];

export type MetricField<T = number> = {
  status: MetricStatus;
  value?: T;
};

export function presentMetric<T>(value: T): MetricField<T> {
  return { status: "present", value };
}

export function missingMetric<T = number>(): MetricField<T> {
  return { status: "missing" };
}

export function notApplicableMetric<T = number>(): MetricField<T> {
  return { status: "not_applicable" };
}

export function notVisibleMetric<T = number>(): MetricField<T> {
  return { status: "not_visible" };
}

export function parseFailedMetric<T = number>(): MetricField<T> {
  return { status: "parse_failed" };
}

/** Wire / DB: present → value; otherwise null (unknown). */
export function metricToNullable<T>(field: MetricField<T> | undefined | null): T | null {
  if (!field || field.status !== "present" || field.value === undefined) return null;
  return field.value;
}

/**
 * Accept legacy bare numbers (present) or MetricField objects.
 * Bare `null` / omitted → missing.
 */
export function coerceMetricField(raw: unknown): MetricField<number> {
  if (raw === undefined || raw === null) return missingMetric();
  if (typeof raw === "number" && Number.isFinite(raw)) return presentMetric(raw);
  if (typeof raw === "object" && raw !== null && "status" in raw) {
    const status = (raw as { status: unknown }).status;
    if (
      status === "present" ||
      status === "missing" ||
      status === "not_applicable" ||
      status === "not_visible" ||
      status === "parse_failed"
    ) {
      const value = (raw as { value?: unknown }).value;
      if (status === "present" && typeof value === "number" && Number.isFinite(value)) {
        return presentMetric(value);
      }
      return { status };
    }
  }
  return parseFailedMetric();
}

export function formatMetricForDisplay(
  value: number | null | undefined,
  unit?: string,
): string {
  if (value === null || value === undefined) {
    return unit ? `Not available` : "Not available";
  }
  if (unit === "hours") return `${value}h`;
  if (unit === "days") return `${value}d`;
  return String(value);
}
