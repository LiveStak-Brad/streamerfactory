import { describe, expect, it } from "vitest";
import { CURRICULUM } from "@/lib/resources/curriculum";
import { getAllLibraryResources, getLibraryResource } from "@/lib/streameru-library/catalog";
import { getResourcesForLesson } from "@/lib/streameru-library/by-lesson";

describe("StreamerU Resource Library catalog", () => {
  it("has unique resource ids", () => {
    const ids = getAllLibraryResources().map((r) => r.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("gives every curriculum lesson at least one ready resource", () => {
    for (const lesson of CURRICULUM) {
      const resources = getResourcesForLesson(lesson.slug);
      const ready = resources.filter((r) => r.status === "ready");
      expect(ready.length, lesson.slug).toBeGreaterThanOrEqual(1);
      for (const r of ready) {
        expect(r.blocks?.length ?? 0, r.id).toBeGreaterThan(0);
      }
    }
  });

  it("includes gold-standard beginner packs", () => {
    expect(getLibraryResource("first-stream-checklist")?.status).toBe("ready");
    expect(getLibraryResource("profile-optimization-worksheet")?.status).toBe("ready");
    expect(getLibraryResource("thirty-minute-stream-outline")?.status).toBe("ready");
    expect(getLibraryResource("first-live-structure-sheet")?.status).toBe("ready");
    expect(getLibraryResource("transition-cheat-sheet")?.status).toBe("ready");
    expect(getLibraryResource("emergency-conversation-list")?.status).toBe("ready");
    expect(getLibraryResource("closing-checklist")?.status).toBe("ready");
    expect(getLibraryResource("first-week-planner")?.status).toBe("ready");
    expect(getLibraryResource("mistake-prevention-checklist")?.status).toBe("ready");
  });

  it("includes category seed placeholders in the central library", () => {
    expect(getLibraryResource("gift-tracker")?.status).toBe("placeholder");
    expect(getLibraryResource("creator-brand-workbook")?.status).toBe("placeholder");
    expect(getLibraryResource("expense-tracker")?.status).toBe("placeholder");
  });
});
