import { describe, expect, it } from "vitest";
import { curriculumByProgram } from "@/lib/resources/curriculum";
import { getLessonEstimate, sumStudyMinutesForSlugs } from "@/lib/resources/lesson-estimate";

describe("lesson estimate source of truth", () => {
  it("sums semester study minutes from the same getLessonEstimate helper", () => {
    const programs = curriculumByProgram();
    for (const program of programs) {
      const slugs = program.lessons.map((l) => l.slug);
      const summed = sumStudyMinutesForSlugs(slugs);
      const manual = slugs.reduce((n, slug) => n + getLessonEstimate(slug).studyMinutes, 0);
      expect(summed).toBe(manual);
      expect(slugs.length).toBeGreaterThan(0);
      expect(summed).toBeGreaterThan(0);
    }
  });

  it("returns study + live + total for a known curriculum slug", () => {
    const estimate = getLessonEstimate("start-strong-on-tiktok-live", {
      content: "word ".repeat(440),
      mission: {
        id: "mission-01-understanding-live",
        mission_title: "Session",
        mission_description: "Execute",
        mission_steps: ["Go live for at least 25 minutes in one continuous session (required)."],
        mission_goal: "Finish a real 25+ minute LIVE",
      },
    });
    expect(estimate.studyMinutes).toBeGreaterThan(0);
    expect(estimate.liveMinutes).toBe(25);
    expect(estimate.totalMinutes).toBe(estimate.studyMinutes + 25);
  });
});
