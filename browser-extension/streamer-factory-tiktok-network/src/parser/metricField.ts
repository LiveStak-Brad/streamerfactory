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

export function parseFailedMetric<T = number>(): MetricField<T> {
  return { status: "parse_failed" };
}

export function metricToOptionalNumber(field: MetricField<number> | undefined): number | undefined {
  if (!field || field.status !== "present" || field.value === undefined) return undefined;
  return field.value;
}
