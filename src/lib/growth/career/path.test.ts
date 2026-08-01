import { describe, expect, it } from "vitest";
import {
  evaluateCareerEligibility,
  resolveCareerStage,
  STAFF_APPOINTMENT_TITLE_KEYS,
} from "@/lib/growth/career/path";
import type { CreatorSnapshot } from "@/lib/growth/types";
import { CURRICULUM } from "@/lib/resources/curriculum";

function baseSnapshot(overrides: Partial<CreatorSnapshot> = {}): CreatorSnapshot {
  return {
    member_id: "m1",
    season: null,
    onboarding: { completed: true, percent: 100, incomplete_task_keys: [] },
    lessons_completed: [],
    modules_completed: [],
    missions_completed: 0,
    missions_failed: 0,
    streaks: {
      daily_login: { current: 7, longest: 7, last_completed: null },
      weekly_learning: { current: 4, longest: 4, last_completed: null },
    },
    battle_history: { joined: 5, completed: 0, recent_event_ids: [] },
    ranking_history: { peaks: [], latest_rank: null },
    strongest_categories: [],
    weakest_categories: [],
    inactive_days: 0,
    last_activity: null,
    profile_completion: 100,
    referrals: { accepted: 0, pending: 0, code: null },
    reputation: { lifetime: 250, season: 50, titles: [] },
    recent_events: [],
    ...overrides,
  };
}

describe("career eligibility vs appointment", () => {
  it("unlocks mentor eligibility without appointing mentor", () => {
    // Mentor eligibility requires 40% of the published StreamerU curriculum.
    const need = Math.ceil(CURRICULUM.length * 0.4);
    const more = CURRICULUM.slice(0, need).map((l) => l.slug);
    const elig = evaluateCareerEligibility(baseSnapshot(), more, false);
    expect(elig.mentorEligible).toBe(true);
    expect(elig.mentorAppointed).toBe(false);
    expect(elig.managerEligible).toBe(false);
  });

  it("keeps manager eligibility locked until graduation", () => {
    const more = CURRICULUM.slice(0, 20).map((l) => l.slug);
    const elig = evaluateCareerEligibility(
      baseSnapshot({ reputation: { lifetime: 800, season: 100, titles: [] } }),
      more,
      false,
    );
    expect(elig.managerEligible).toBe(false);
    expect(elig.managerMissing.some((m) => /Graduate/i.test(m))).toBe(true);
  });

  it("orders stages graduate before manager eligible", () => {
    const all = CURRICULUM.map((l) => l.slug);
    const progress = resolveCareerStage(
      baseSnapshot({
        reputation: { lifetime: 800, season: 100, titles: [] },
        battle_history: { joined: 5, completed: 0, recent_event_ids: [] },
      }),
      all,
      true,
    );
    expect(progress.stage.key).toBe("manager_eligible");
    expect(progress.eligibility.managerAppointed).toBe(false);
  });

  it("requires staff appointment for Manager stage", () => {
    const all = CURRICULUM.map((l) => l.slug);
    const progress = resolveCareerStage(
      baseSnapshot({
        reputation: { lifetime: 2000, season: 100, titles: ["manager"] },
      }),
      all,
      true,
    );
    expect(progress.stage.key).toBe("manager");
  });

  it("lists mentor/manager as staff appointment keys", () => {
    expect([...STAFF_APPOINTMENT_TITLE_KEYS]).toEqual(["mentor", "manager"]);
  });
});
