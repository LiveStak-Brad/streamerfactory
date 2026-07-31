import { describe, expect, it } from "vitest";
import {
  countCompletedPrograms,
  isFullGraduate,
  programProgress,
} from "@/lib/growth/semester/programs";
import { CURRICULUM } from "@/lib/resources/curriculum";

describe("programProgress", () => {
  it("tracks incomplete semester", () => {
    const beginner = CURRICULUM.filter((l) => l.trackId === "beginner");
    const progress = programProgress(beginner.slice(0, 2).map((l) => l.slug));
    const row = progress.find((p) => p.programKey === "beginner");
    expect(row?.completed).toBe(2);
    expect(row?.complete).toBe(false);
  });

  it("marks semester complete", () => {
    const beginner = CURRICULUM.filter((l) => l.trackId === "beginner").map(
      (l) => l.slug,
    );
    expect(countCompletedPrograms(beginner)).toBe(1);
    expect(isFullGraduate(beginner)).toBe(false);
  });

  it("detects full graduate", () => {
    const all = CURRICULUM.map((l) => l.slug);
    expect(isFullGraduate(all)).toBe(true);
    expect(countCompletedPrograms(all)).toBe(5);
  });
});
