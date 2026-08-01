import { describe, expect, it } from "vitest";
import {
  archivePlaceCount,
  completedYearMonthToArchive,
  formatYearMonthLabel,
  isValidYearMonth,
  previousYearMonth,
  tracksRunnerUps,
  yearMonthFromDate,
} from "@/lib/hall-of-fame/months";

describe("hall-of-fame months", () => {
  it("validates year-month keys", () => {
    expect(isValidYearMonth("2026-05")).toBe(true);
    expect(isValidYearMonth("2026-13")).toBe(false);
    expect(isValidYearMonth("2026-5")).toBe(false);
  });

  it("formats labels", () => {
    expect(formatYearMonthLabel("2026-05")).toBe("May 2026");
    expect(formatYearMonthLabel("2026-07")).toBe("July 2026");
  });

  it("tracks runner-ups from July 2026", () => {
    expect(tracksRunnerUps("2026-06")).toBe(false);
    expect(tracksRunnerUps("2026-07")).toBe(true);
    expect(archivePlaceCount("2026-05")).toBe(1);
    expect(archivePlaceCount("2026-07")).toBe(5);
  });

  it("builds year-month from UTC date", () => {
    expect(yearMonthFromDate(new Date("2026-07-29T12:00:00Z"))).toBe("2026-07");
    expect(yearMonthFromDate(new Date("2026-08-01T00:05:00Z"))).toBe("2026-08");
  });

  it("previous / completed month for rollover archive", () => {
    expect(previousYearMonth("2026-08")).toBe("2026-07");
    expect(previousYearMonth("2026-01")).toBe("2025-12");
    expect(completedYearMonthToArchive(new Date("2026-08-01T05:00:00Z"))).toBe("2026-07");
    expect(completedYearMonthToArchive(new Date("2026-07-31T23:00:00Z"))).toBe("2026-06");
  });
});
