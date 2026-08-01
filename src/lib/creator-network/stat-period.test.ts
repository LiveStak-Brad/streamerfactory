import { describe, expect, it } from "vitest";
import { importBatchMatchesRankingPeriod } from "@/lib/creator-network/stat-period";

describe("importBatchMatchesRankingPeriod", () => {
  const july = { start: "2026-07-01", end: "2026-07-31" };

  it("matches exact period bounds", () => {
    expect(
      importBatchMatchesRankingPeriod(
        [
          {
            stat_period_label: "Monthly",
            stat_period_start: "2026-07-01",
            stat_period_end: "2026-07-31",
            days_streamed: 10,
          },
        ],
        "monthly",
        july.start,
        july.end,
        "2026-07-31T12:00:00Z",
      ),
    ).toBe(true);
  });

  it("rejects a first-month batch even if labeled Monthly", () => {
    expect(
      importBatchMatchesRankingPeriod(
        [
          {
            stat_period_label: "Contribution details · Monthly",
            stat_period_start: null,
            stat_period_end: null,
            days_streamed: 10,
          },
        ],
        "monthly",
        july.start,
        july.end,
        "2026-01-15T12:00:00Z",
      ),
    ).toBe(false);
  });

  it("accepts unlabeled sync created inside the ranking month", () => {
    expect(
      importBatchMatchesRankingPeriod(
        [
          {
            stat_period_label: null,
            stat_period_start: null,
            stat_period_end: null,
            days_streamed: 10,
          },
        ],
        "monthly",
        july.start,
        july.end,
        "2026-07-20T18:00:00Z",
      ),
    ).toBe(true);
  });

  it("rejects weekly-labeled syncs", () => {
    expect(
      importBatchMatchesRankingPeriod(
        [
          {
            stat_period_label: "Weekly",
            stat_period_start: null,
            stat_period_end: null,
            days_streamed: 3,
          },
        ],
        "monthly",
        july.start,
        july.end,
        "2026-07-20T18:00:00Z",
      ),
    ).toBe(false);
  });
});
