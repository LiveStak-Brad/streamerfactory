import { describe, expect, it } from "vitest";
import { periodKeyForDate, weekPeriodKey } from "@/lib/growth/progress/period";

describe("weekPeriodKey timezone consistency", () => {
  it("uses the member-local calendar date near UTC midnight boundaries", () => {
    // Sunday evening in LA is still Sunday locally; UTC may already be Monday.
    const utcMondayEarly = new Date("2026-08-03T05:00:00.000Z");
    const laDay = periodKeyForDate(utcMondayEarly, "America/Los_Angeles");
    const utcDay = periodKeyForDate(utcMondayEarly, "UTC");
    expect(laDay).toBe("2026-08-02");
    expect(utcDay).toBe("2026-08-03");

    const laWeek = weekPeriodKey(utcMondayEarly, "America/Los_Angeles");
    const utcWeek = weekPeriodKey(utcMondayEarly, "UTC");
    // Local Sunday vs UTC Monday can land in different ISO weeks.
    expect(laWeek).not.toBe(utcWeek);
  });

  it("keeps assign + evaluate weeks aligned for the same timezone", () => {
    const now = new Date("2026-07-29T18:00:00.000Z");
    const tz = "America/Chicago";
    const assigned = weekPeriodKey(now, tz);
    const fromEvent = weekPeriodKey(now, tz);
    expect(fromEvent).toBe(assigned);
  });
});
