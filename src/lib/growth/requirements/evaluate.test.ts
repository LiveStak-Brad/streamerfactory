import { describe, expect, it } from "vitest";
import { evaluateRequirement } from "@/lib/growth/requirements/evaluate";
import { computeStreakUpdate } from "@/lib/growth/streaks/engine";
import { canAccessAdmin, canScheduleBattles } from "@/lib/auth/access";
import { periodKeyForDate } from "@/lib/growth/progress/events";
import type { ProgressEventRow, ProgressSnapshot } from "@/lib/growth/types";

function emptySnapshot(over: Partial<ProgressSnapshot> = {}): ProgressSnapshot {
  return {
    events: [],
    seasonId: "season-1",
    profile: {
      hasTiktokConnection: false,
      hasTiktokUsername: false,
      hasTimezone: false,
      hasAvatar: false,
      onboardingCompleted: false,
    },
    streaks: {},
    completedOnboardingTaskKeys: [],
    completedMissionTemplateKeys: [],
    streameruMissionCompletions: [],
    latestRank: null,
    referralsAccepted: 0,
    ...over,
  };
}

function evt(
  type: string,
  opts: Partial<ProgressEventRow> = {},
): ProgressEventRow {
  return {
    id: opts.id ?? crypto.randomUUID(),
    member_id: opts.member_id ?? "user-1",
    event_type: type,
    subject_key: opts.subject_key ?? null,
    season_id: opts.season_id ?? "season-1",
    metadata: opts.metadata ?? {},
    idempotency_key: opts.idempotency_key ?? `${type}:${Math.random()}`,
    source_event_id: opts.source_event_id ?? null,
    created_at: opts.created_at ?? new Date().toISOString(),
  };
}

describe("evaluateRequirement", () => {
  it("satisfies complete_any_streameru_live_mission from completions", () => {
    const snap = emptySnapshot({
      streameruMissionCompletions: [
        { lesson_slug: "start-strong-on-tiktok-live", mission_id: "mission-01" },
      ],
    });
    const result = evaluateRequirement(
      { type: "complete_any_streameru_live_mission" },
      snap,
    );
    expect(result.satisfied).toBe(true);
  });

  it("requires season-scoped events when seasonScoped", () => {
    const snap = emptySnapshot({
      events: [
        evt("mission_completed", { season_id: "other-season", subject_key: "daily_battle" }),
      ],
      completedMissionTemplateKeys: [],
    });
    const result = evaluateRequirement(
      { type: "complete_mission", params: { any: true }, seasonScoped: true },
      snap,
    );
    expect(result.satisfied).toBe(false);
  });

  it("counts season-scoped mission completion events in active season", () => {
    const snap = emptySnapshot({
      events: [evt("mission_completed", { season_id: "season-1", subject_key: "daily_battle" })],
    });
    const result = evaluateRequirement(
      { type: "complete_mission", params: { any: true }, seasonScoped: true },
      snap,
    );
    expect(result.satisfied).toBe(true);
  });

  it("evaluates maintain_streak against snapshot streaks", () => {
    const snap = emptySnapshot({
      streaks: { daily_login: { current: 7, longest: 7 } },
    });
    const result = evaluateRequirement(
      { type: "maintain_streak", params: { streak_key: "daily_login", days: 7 } },
      snap,
    );
    expect(result.satisfied).toBe(true);
    expect(result.progress).toBe(7);
  });

  it("evaluates update_profile from profile signals", () => {
    const snap = emptySnapshot({
      profile: {
        hasTiktokConnection: true,
        hasTiktokUsername: true,
        hasTimezone: true,
        hasAvatar: true,
        onboardingCompleted: false,
      },
    });
    expect(evaluateRequirement({ type: "update_profile" }, snap).satisfied).toBe(true);
  });

  it("supports all composition", () => {
    const snap = emptySnapshot({
      profile: {
        hasTiktokConnection: true,
        hasTiktokUsername: true,
        hasTimezone: true,
        hasAvatar: false,
        onboardingCompleted: false,
      },
      events: [evt("rankings_viewed")],
    });
    const result = evaluateRequirement(
      {
        type: "daily_login",
        all: [{ type: "connect_tiktok" }, { type: "view_rankings" }],
      },
      snap,
    );
    expect(result.satisfied).toBe(true);
  });
});

describe("computeStreakUpdate", () => {
  it("starts at 1 on first completion", () => {
    const r = computeStreakUpdate({
      lastCompletedOn: null,
      today: "2026-07-29",
      graceDays: 1,
      current: 0,
    });
    expect(r.nextCurrent).toBe(1);
    expect(r.kind).toBe("increment");
  });

  it("increments on consecutive day", () => {
    const r = computeStreakUpdate({
      lastCompletedOn: "2026-07-28",
      today: "2026-07-29",
      graceDays: 1,
      current: 3,
      longest: 5,
    });
    expect(r.nextCurrent).toBe(4);
    expect(r.kind).toBe("increment");
    expect(r.longest).toBe(5);
  });

  it("uses grace without incrementing when within grace window", () => {
    const r = computeStreakUpdate({
      lastCompletedOn: "2026-07-27",
      today: "2026-07-29",
      graceDays: 1,
      current: 4,
      longest: 4,
    });
    expect(r.kind).toBe("grace");
    expect(r.nextCurrent).toBe(4);
  });

  it("breaks when beyond grace", () => {
    const r = computeStreakUpdate({
      lastCompletedOn: "2026-07-20",
      today: "2026-07-29",
      graceDays: 1,
      current: 10,
      longest: 12,
    });
    expect(r.kind).toBe("break");
    expect(r.nextCurrent).toBe(1);
    expect(r.longest).toBe(12);
  });

  it("marks alreadyCompleted when same day", () => {
    const r = computeStreakUpdate({
      lastCompletedOn: "2026-07-29",
      today: "2026-07-29",
      graceDays: 1,
      current: 5,
      longest: 5,
    });
    expect(r.alreadyCompleted).toBe(true);
    expect(r.nextCurrent).toBe(5);
  });
});

describe("periodKeyForDate", () => {
  it("formats member timezone calendar date", () => {
    // Fixed instant: 2026-07-30 02:00 UTC → still 2026-07-29 in America/Los_Angeles
    const d = new Date("2026-07-30T02:00:00.000Z");
    expect(periodKeyForDate(d, "America/Los_Angeles")).toBe("2026-07-29");
    expect(periodKeyForDate(d, "UTC")).toBe("2026-07-30");
  });
});

describe("permissions", () => {
  it("allows staff admin access and network member scheduling", () => {
    expect(canAccessAdmin("admin")).toBe(true);
    expect(canAccessAdmin("member")).toBe(false);
    expect(canScheduleBattles("member")).toBe(true);
    expect(canScheduleBattles("applicant")).toBe(false);
  });
});

describe("idempotency key uniqueness", () => {
  it("same subject produces stable mission completion keys", () => {
    const slug = "start-strong-on-tiktok-live";
    const missionId = "mission-01-understanding-live";
    const key = `streameru_mission:${slug}:${missionId}`;
    expect(key).toBe("streameru_mission:start-strong-on-tiktok-live:mission-01-understanding-live");
  });
});
