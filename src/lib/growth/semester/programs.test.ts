import { describe, expect, it } from "vitest";
import {
  CORE_CURRICULUM_TOTAL_LESSONS,
  countCompletedPrograms,
  getCoreCurriculumLessons,
  isFullGraduate,
  listSemesterPrograms,
  programProgress,
} from "@/lib/growth/semester/programs";
import { CURRICULUM } from "@/lib/resources/curriculum";

describe("programProgress", () => {
  it("tracks incomplete semester", () => {
    const beginner = listSemesterPrograms().find((p) => p.programKey === "beginner");
    expect(beginner).toBeTruthy();
    const progress = programProgress(beginner!.lessons.slice(0, 2).map((l) => l.slug));
    const row = progress.find((p) => p.programKey === "beginner");
    expect(row?.completed).toBe(2);
    expect(row?.complete).toBe(false);
  });

  it("marks Beginner Foundations complete when all program lessons are done", () => {
    const beginner = listSemesterPrograms().find((p) => p.programKey === "beginner");
    expect(beginner).toBeTruthy();
    const slugs = beginner!.lessons.map((l) => l.slug);
    expect(slugs.length).toBe(9);
    expect(countCompletedPrograms(slugs)).toBe(1);
    expect(isFullGraduate(slugs)).toBe(false);
  });

  it("detects Core 24 graduate without requiring Advanced Creator lessons", () => {
    const core = getCoreCurriculumLessons().map((l) => l.slug);
    expect(core.length).toBe(24);
    expect(CORE_CURRICULUM_TOTAL_LESSONS).toBe(24);
    expect(isFullGraduate(core)).toBe(true);
    expect(countCompletedPrograms(core)).toBe(4);

    const advanced = programProgress(core).find((p) => p.programKey === "rules");
    expect(advanced?.total).toBeGreaterThanOrEqual(1);
    expect(advanced?.complete).toBe(false);
  });

  it("does not treat unfinished Advanced Creator as blocking Core graduation", () => {
    const allPublished = CURRICULUM.map((l) => l.slug);
    expect(allPublished.length).toBeGreaterThan(24);
    const coreOnly = getCoreCurriculumLessons().map((l) => l.slug);
    expect(isFullGraduate(coreOnly)).toBe(true);
    expect(isFullGraduate(allPublished)).toBe(true);
  });
});
