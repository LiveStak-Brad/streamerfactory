import { describe, expect, it } from "vitest";
import {
  countCompletedPrograms,
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

  it("detects Core 24 graduate without counting empty Advanced Creator as a program completion", () => {
    const all = CURRICULUM.map((l) => l.slug);
    expect(all.length).toBe(24);
    expect(isFullGraduate(all)).toBe(true);
    // Four active programs; Advanced Creator remains Coming Soon (0 lessons → not complete)
    expect(countCompletedPrograms(all)).toBe(4);
    const advanced = programProgress(all).find((p) => p.programKey === "rules");
    expect(advanced?.total).toBe(0);
    expect(advanced?.complete).toBe(false);
  });
});
