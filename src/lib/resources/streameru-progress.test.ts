import { describe, expect, it } from "vitest";
import { curriculumByProgram, CURRICULUM_TOTAL_LESSONS } from "@/lib/resources/curriculum";
import { sumStudyMinutesForSlugs } from "@/lib/resources/lesson-estimate";

/**
 * Documents the StreamerU progress / estimate contract used by hub, sidebar,
 * certificate, and member widget (device-local Live Exam completions + shared estimates).
 */
describe("StreamerU progress and estimate sources of truth", () => {
  it("curriculum has a stable 24-lesson total used by all progress UI", () => {
    expect(CURRICULUM_TOTAL_LESSONS).toBe(24);
    const programs = curriculumByProgram();
    expect(programs).toHaveLength(5);
    expect(programs[0]?.programName).toBe("Beginner Foundations");
    expect(programs[0]?.lessons).toHaveLength(9);
    expect(programs[4]?.programName).toBe("Advanced Creator");
    expect(programs[4]?.lessons).toHaveLength(0);
    const lessonCount = programs.reduce((n, p) => n + p.lessons.length, 0);
    expect(lessonCount).toBe(CURRICULUM_TOTAL_LESSONS);
  });

  it("program study totals use the shared lesson-estimate helper", () => {
    const programs = curriculumByProgram();
    const grand = sumStudyMinutesForSlugs(
      programs.flatMap((p) => p.lessons.map((l) => l.slug)),
    );
    const byProgram = programs.reduce(
      (n, p) => n + sumStudyMinutesForSlugs(p.lessons.map((l) => l.slug)),
      0,
    );
    expect(grand).toBe(byProgram);
    expect(grand).toBeGreaterThan(0);
  });
});
