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
    expect(PUBLISHED_LESSON_COUNT).toBe(124);
  });

  it("includes Presence then Content Creation before Growth, then Community, Professional, Production, Battle, Music LIVE, then Gaming LIVE", () => {
    expect(getPublishedProgramCount()).toBe(14);
    expect(getActiveProgramCount()).toBe(14);
    expect(STREAMERU_PROGRAM_NAMES[0]).toBe("Beginner Foundations");
    expect(STREAMERU_PROGRAM_NAMES[4]).toBe("Advanced Creator");
    expect(STREAMERU_PROGRAM_NAMES[5]).toBe("Presence Mastery");
    expect(STREAMERU_PROGRAM_NAMES[6]).toBe("Content Creation Mastery");
    expect(STREAMERU_PROGRAM_NAMES[7]).toBe("Growth Mastery");
    expect(STREAMERU_PROGRAM_NAMES[8]).toBe("Community Mastery");
    expect(STREAMERU_PROGRAM_NAMES[9]).toBe("Professional Creator Mastery");
    expect(STREAMERU_PROGRAM_NAMES[10]).toBe("Production Mastery");
    expect(STREAMERU_PROGRAM_NAMES[11]).toBe("Battle Mastery");
    expect(STREAMERU_PROGRAM_NAMES[12]).toBe("Music LIVE Mastery");
    expect(STREAMERU_PROGRAM_NAMES[13]).toBe("Gaming LIVE Mastery");
    const beginner = curriculumByProgram().find((p) => p.programName === "Beginner Foundations");
    expect(beginner?.lessons).toHaveLength(9);
    expect(beginner?.lessons.some((l) => l.slug === "platform-rules-new-live-creators")).toBe(true);
    const advanced = curriculumByProgram().find((p) => p.programName === "Advanced Creator");
    expect(advanced?.lessons).toHaveLength(8);
    expect(advanced?.lessons[0]?.slug).toBe("your-creator-operating-system");
    expect(advanced?.lessons[7]?.slug).toBe("advanced-creator-capstone-30-day-pro-sprint");
    const presence = curriculumByProgram().find((p) => p.programName === "Presence Mastery");
    expect(presence?.lessons).toHaveLength(10);
    expect(presence?.lessons[0]?.slug).toBe("camera-presence-owning-the-frame");
    expect(presence?.lessons[9]?.slug).toBe("presence-capstone-signature-20-minute-live");
    const creation = curriculumByProgram().find((p) => p.programName === "Content Creation Mastery");
    expect(creation?.lessons).toHaveLength(10);
    expect(creation?.lessons[0]?.slug).toBe("finding-your-niche-without-boxing-yourself-in");
    expect(creation?.lessons[9]?.slug).toBe(
      "content-creation-capstone-7-day-themed-live-series",
    );
    const growth = curriculumByProgram().find((p) => p.programName === "Growth Mastery");
    expect(growth?.lessons).toHaveLength(12);
    expect(growth?.lessons[0]?.slug).toBe("growth-diagnosis-framework");
    expect(growth?.lessons[11]?.slug).toBe("growth-capstone-30-day-growth-experiment");
    const community = curriculumByProgram().find((p) => p.programName === "Community Mastery");
    expect(community?.lessons).toHaveLength(10);
    expect(community?.lessons[0]?.slug).toBe("community-design-belonging-on-purpose");
    expect(community?.lessons[9]?.slug).toBe(
      "community-capstone-community-appreciation-event",
    );
    const professional = curriculumByProgram().find(
      (p) => p.programName === "Professional Creator Mastery",
    );
    expect(professional?.lessons).toHaveLength(10);
    expect(professional?.lessons[0]?.slug).toBe(
      "positioning-for-money-without-selling-your-soul",
    );
    expect(professional?.lessons[9]?.slug).toBe(
      "professional-creator-capstone-creator-operating-manual",
    );
    const production = curriculumByProgram().find((p) => p.programName === "Production Mastery");
    expect(production?.lessons).toHaveLength(10);
    expect(production?.lessons[0]?.slug).toBe("production-decisions-before-gear-purchases");
    expect(production?.lessons[9]?.slug).toBe("production-capstone-your-signature-look");
    const battle = curriculumByProgram().find((p) => p.programName === "Battle Mastery");
    expect(battle?.lessons).toHaveLength(8);
    expect(battle?.lessons[0]?.slug).toBe("battle-strategy-beyond-basics");
    expect(battle?.lessons[7]?.slug).toBe("battle-capstone-signature-battle-system");
    const music = curriculumByProgram().find((p) => p.programName === "Music LIVE Mastery");
    expect(music?.lessons).toHaveLength(10);
    expect(music?.lessons[0]?.slug).toBe("music-live-formats-that-work");
    expect(music?.lessons[9]?.slug).toBe("music-live-capstone-signature-show");
    const gaming = curriculumByProgram().find((p) => p.programName === "Gaming LIVE Mastery");
    expect(gaming?.lessons).toHaveLength(12);
    expect(gaming?.lessons[0]?.slug).toBe("choosing-your-gaming-live-setup");
    expect(gaming?.lessons[11]?.slug).toBe("gaming-live-capstone-signature-show");
  });

  it("planned university scale is roadmap-only and distinct from published", () => {
    expect(PLANNED_CURRICULUM_LESSON_COUNT).toBe(171);
    expect(PLANNED_TRACK_COUNT).toBe(18);
    expect(PLANNED_CURRICULUM_LESSON_COUNT).toBeGreaterThan(PUBLISHED_LESSON_COUNT);
  });

  it("exposes release metadata and a finishable study-hours estimate", () => {
    expect(ACADEMY_RELEASE.version).toBe("1.11");
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
