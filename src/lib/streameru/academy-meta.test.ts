import { describe, expect, it } from "vitest";
import { CURRICULUM_TOTAL_LESSONS } from "@/lib/resources/curriculum";
import {
  ACADEMY_RELEASE,
  PLANNED_CURRICULUM_LESSON_COUNT,
  PLANNED_TRACK_COUNT,
  PUBLISHED_LESSON_COUNT,
  catalogAvailabilityLine,
  getActiveProgramCount,
  getLibraryHubStats,
  getPublishedAcademyStudyHoursLabel,
  getPublishedAcademyStudyMinutes,
  getPublishedProgramCount,
} from "@/lib/streameru/academy-meta";
import { STREAMERU_PROGRAM_NAMES, curriculumByProgram } from "@/lib/resources/curriculum";

describe("StreamerU academy-meta source of truth", () => {
  it("published lesson count matches curriculum SoT", () => {
    expect(PUBLISHED_LESSON_COUNT).toBe(CURRICULUM_TOTAL_LESSONS);
    expect(PUBLISHED_LESSON_COUNT).toBe(32);
  });

  it("tracks five programs with safety inside Beginner Foundations and Advanced Creator shipping", () => {
    expect(getPublishedProgramCount()).toBe(5);
    expect(getActiveProgramCount()).toBe(5);
    expect(STREAMERU_PROGRAM_NAMES[0]).toBe("Beginner Foundations");
    expect(STREAMERU_PROGRAM_NAMES[4]).toBe("Advanced Creator");
    const beginner = curriculumByProgram().find((p) => p.programName === "Beginner Foundations");
    expect(beginner?.lessons).toHaveLength(9);
    expect(beginner?.lessons.some((l) => l.slug === "platform-rules-new-live-creators")).toBe(true);
    const advanced = curriculumByProgram().find((p) => p.programName === "Advanced Creator");
    expect(advanced?.lessons).toHaveLength(8);
    expect(advanced?.lessons[0]?.slug).toBe("your-creator-operating-system");
    expect(advanced?.lessons[7]?.slug).toBe("advanced-creator-capstone-30-day-pro-sprint");
  });

  it("planned university scale is roadmap-only and distinct from published", () => {
    expect(PLANNED_CURRICULUM_LESSON_COUNT).toBe(171);
    expect(PLANNED_TRACK_COUNT).toBe(18);
    expect(PLANNED_CURRICULUM_LESSON_COUNT).toBeGreaterThan(PUBLISHED_LESSON_COUNT);
  });

  it("exposes release metadata and a finishable study-hours estimate", () => {
    expect(ACADEMY_RELEASE.version).toBe("1.2");
    expect(getPublishedAcademyStudyMinutes()).toBeGreaterThan(60);
    expect(getPublishedAcademyStudyHoursLabel()).toMatch(/\d/);
  });

  it("catalog line mentions available now vs planned", () => {
    const line = catalogAvailabilityLine();
    expect(line).toContain(`${PUBLISHED_LESSON_COUNT} lessons available now`);
    expect(line).toContain("active programs");
    expect(line).toContain(`${PLANNED_CURRICULUM_LESSON_COUNT}-lesson`);
    expect(line).not.toMatch(/expanding/i);
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
