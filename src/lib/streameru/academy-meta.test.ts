import { describe, expect, it } from "vitest";
import { CURRICULUM_TOTAL_LESSONS } from "@/lib/resources/curriculum";
import {
  PLANNED_CURRICULUM_LESSON_COUNT,
  PLANNED_TRACK_COUNT,
  PUBLISHED_LESSON_COUNT,
  catalogAvailabilityLine,
  getLibraryHubStats,
  getPublishedProgramCount,
} from "@/lib/streameru/academy-meta";

describe("StreamerU academy-meta source of truth", () => {
  it("published lesson count matches curriculum SoT", () => {
    expect(PUBLISHED_LESSON_COUNT).toBe(CURRICULUM_TOTAL_LESSONS);
    expect(PUBLISHED_LESSON_COUNT).toBe(24);
  });

  it("published program count is five", () => {
    expect(getPublishedProgramCount()).toBe(5);
  });

  it("planned university scale is roadmap-only and distinct from published", () => {
    expect(PLANNED_CURRICULUM_LESSON_COUNT).toBe(171);
    expect(PLANNED_TRACK_COUNT).toBe(18);
    expect(PLANNED_CURRICULUM_LESSON_COUNT).toBeGreaterThan(PUBLISHED_LESSON_COUNT);
  });

  it("catalog line mentions available now vs planned", () => {
    const line = catalogAvailabilityLine();
    expect(line).toContain(`${PUBLISHED_LESSON_COUNT} lessons available now`);
    expect(line).toContain(`${PLANNED_CURRICULUM_LESSON_COUNT}-lesson`);
  });

  it("library stats do not invent ready counts", () => {
    const stats = getLibraryHubStats();
    expect(stats.ready).toBeGreaterThan(0);
    expect(stats.ready).toBeLessThanOrEqual(stats.total);
    expect(stats.readyChecklists).toBeGreaterThan(0);
    expect(stats.beginnerReady).toBeGreaterThan(0);
    expect(stats.placeholder).toBe(stats.total - stats.ready);
  });
});
