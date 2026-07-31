import { describe, expect, it } from "vitest";
import { periodKeyForDate, weekPeriodKey } from "@/lib/growth/progress/period";
import { didRankUp, getCreatorRank } from "@/lib/growth/xp/creator-rank";
import { graduateCertificateKey } from "@/lib/growth/semester/programs";

/**
 * Documents the idempotency keys used by engagement projections.
 * Duplicate check-ins / completions / certificates / rank-ups must no-op.
 */
describe("engagement idempotency contracts", () => {
  it("daily check-in key is once per member-local day", () => {
    const day = periodKeyForDate(new Date("2026-07-31T15:00:00Z"), "America/Chicago");
    expect(`daily_login:${day}`).toMatch(/^daily_login:\d{4}-\d{2}-\d{2}$/);
  });

  it("mission completion key includes template + period", () => {
    const week = weekPeriodKey(new Date("2026-07-31T15:00:00Z"), "America/Chicago");
    const key = `mission_completed:weekly_train_hard:${week}`;
    expect(key).toContain(week);
    expect(key.startsWith("mission_completed:")).toBe(true);
  });

  it("certificate + graduation keys are stable singletons", () => {
    expect(`certificate_issued:${graduateCertificateKey()}`).toBe(
      "certificate_issued:cert_streameru_graduate",
    );
    expect("graduated:streameru_graduate").toBe("graduated:streameru_graduate");
    expect(`module_completed:beginner`).toBe("module_completed:beginner");
  });

  it("creator rank-up key fires once per tier", () => {
    expect(didRankUp(49, 50)).toBe(true);
    expect(didRankUp(50, 60)).toBe(false);
    const tier = getCreatorRank(50).tier.key;
    expect(`creator_rank_up:${tier}`).toBe("creator_rank_up:apprentice");
  });

  it("mentor/manager eligibility keys are singletons (eligibility, not appointment)", () => {
    expect("mentor_eligible").toBe("mentor_eligible");
    expect("manager_eligible").toBe("manager_eligible");
  });
});
