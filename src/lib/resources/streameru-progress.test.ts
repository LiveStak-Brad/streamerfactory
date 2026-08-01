import { describe, expect, it } from "vitest";
import { curriculumByProgram, CURRICULUM_TOTAL_LESSONS } from "@/lib/resources/curriculum";
import { sumStudyMinutesForSlugs } from "@/lib/resources/lesson-estimate";

/**
 * Documents the StreamerU progress / estimate contract used by hub, sidebar,
 * certificate, and member widget (device-local Live Exam completions + shared estimates).
 */
describe("StreamerU progress and estimate sources of truth", () => {
  it("curriculum includes Mastery Paths through Brand Partnerships Mastery and matches program lesson totals", () => {
    expect(CURRICULUM_TOTAL_LESSONS).toBe(184);
    const programs = curriculumByProgram();
    expect(programs).toHaveLength(20);
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
    expect(programs[8]?.programName).toBe("Community Mastery");
    expect(programs[8]?.lessons).toHaveLength(10);
    expect(programs[9]?.programName).toBe("Professional Creator Mastery");
    expect(programs[9]?.lessons).toHaveLength(10);
    expect(programs[10]?.programName).toBe("Production Mastery");
    expect(programs[10]?.lessons).toHaveLength(10);
    expect(programs[11]?.programName).toBe("Battle Mastery");
    expect(programs[11]?.lessons).toHaveLength(8);
    expect(programs[12]?.programName).toBe("Music LIVE Mastery");
    expect(programs[12]?.lessons).toHaveLength(10);
    expect(programs[13]?.programName).toBe("Gaming LIVE Mastery");
    expect(programs[13]?.lessons).toHaveLength(12);
    expect(programs[14]?.programName).toBe("Multi-Guest LIVE Mastery");
    expect(programs[14]?.lessons).toHaveLength(10);
    expect(programs[15]?.programName).toBe("AI Creator Mastery");
    expect(programs[15]?.lessons).toHaveLength(10);
    expect(programs[16]?.programName).toBe("Selling & Influence Mastery");
    expect(programs[16]?.lessons).toHaveLength(10);
    expect(programs[17]?.programName).toBe("TikTok Shop Mastery");
    expect(programs[17]?.lessons).toHaveLength(10);
    expect(programs[18]?.programName).toBe("Creator Wellness & Longevity Mastery");
    expect(programs[18]?.lessons).toHaveLength(10);
    expect(programs[19]?.programName).toBe("Brand Partnerships Mastery");
    expect(programs[19]?.lessons).toHaveLength(10);
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
