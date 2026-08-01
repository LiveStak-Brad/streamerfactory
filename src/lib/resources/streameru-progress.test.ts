import { describe, expect, it } from "vitest";
import { curriculumByProgram, CURRICULUM_TOTAL_LESSONS } from "@/lib/resources/curriculum";
import { sumStudyMinutesForSlugs } from "@/lib/resources/lesson-estimate";

/**
 * Documents the StreamerU progress / estimate contract used by hub, sidebar,
 * certificate, and member widget (device-local Live Exam completions + shared estimates).
 */
describe("StreamerU progress and estimate sources of truth", () => {
  it("curriculum includes Content Creation Mastery and matches program lesson totals", () => {
    expect(CURRICULUM_TOTAL_LESSONS).toBe(64);
    const programs = curriculumByProgram();
    expect(programs).toHaveLength(8);
    expect(programs[0]?.programName).toBe("Beginner Foundations");
    expect(programs[0]?.lessons).toHaveLength(9);
    expect(programs[4]?.programName).toBe("Advanced Creator");
    expect(programs[4]?.lessons).toHaveLength(8);
    expect(programs[5]?.programName).toBe("Presence Mastery");
    expect(programs[5]?.lessons).toHaveLength(10);
    expect(programs[6]?.programName).toBe("Content Creation Mastery");
    expect(programs[6]?.lessons).toHaveLength(10);
    expect(programs[7]?.programName).toBe("Growth Mastery");
    expect(programs[7]?.lessons).toHaveLength(12);
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
