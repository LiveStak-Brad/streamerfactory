import { describe, expect, it } from "vitest";
import {
  coerceMetricField,
  metricToNullable,
  missingMetric,
  presentMetric,
} from "./metric-field";

describe("metric-field", () => {
  it("stores present zero without converting missing to zero", () => {
    expect(metricToNullable(presentMetric(0))).toBe(0);
    expect(metricToNullable(missingMetric())).toBeNull();
    expect(metricToNullable(coerceMetricField(undefined))).toBeNull();
    expect(metricToNullable(coerceMetricField(null))).toBeNull();
  });

  it("accepts legacy bare numbers as present", () => {
    expect(coerceMetricField(12.5)).toEqual({ status: "present", value: 12.5 });
  });
});
