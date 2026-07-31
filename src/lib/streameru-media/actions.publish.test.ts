import { describe, expect, it } from "vitest";
import { isPublicRenderableStatus } from "@/lib/streameru-media/types";

describe("asset publication contracts", () => {
  it("only published status is public-renderable", () => {
    expect(isPublicRenderableStatus("published")).toBe(true);
    for (const s of ["requested", "draft", "ready", "archived"] as const) {
      expect(isPublicRenderableStatus(s)).toBe(false);
    }
  });

  it("documents alt text requirement before publish", () => {
    // Mirrors updateLessonMediaStatusAction validation
    function canPublish(alt: string | null | undefined, url: string | null | undefined) {
      return Boolean(url?.trim() && alt?.trim());
    }
    expect(canPublish(null, "https://x.test/a.png")).toBe(false);
    expect(canPublish("  ", "https://x.test/a.png")).toBe(false);
    expect(canPublish("TikTok profile", "https://x.test/a.png")).toBe(true);
  });
});
