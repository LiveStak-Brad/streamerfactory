import { describe, expect, it } from "vitest";
import { CURRICULUM } from "@/lib/resources/curriculum";
import { getAllLessonSeoPacks, getLessonSeo, getLessonSeoKeywords } from "@/lib/resources/lesson-seo";
import { getGuideBySlug } from "@/lib/guides";

describe("lesson SEO packs", () => {
  it("covers every curriculum lesson exactly once", () => {
    const packs = getAllLessonSeoPacks();
    expect(packs).toHaveLength(CURRICULUM.length);

    for (const lesson of CURRICULUM) {
      const pack = getLessonSeo(lesson.slug);
      expect(pack, `missing SEO pack for ${lesson.slug}`).not.toBeNull();
      expect(pack!.slug).toBe(lesson.slug);
    }
  });

  it("has human-first SEO fields without empty FAQ or guide maps", () => {
    for (const pack of getAllLessonSeoPacks()) {
      expect(pack.primaryKeyword.trim().length).toBeGreaterThan(3);
      expect(pack.secondaryKeywords.length).toBeGreaterThanOrEqual(3);
      expect(pack.metaTitle.length).toBeGreaterThan(10);
      expect(pack.metaTitle.length).toBeLessThanOrEqual(70);
      expect(pack.metaDescription.length).toBeGreaterThan(50);
      expect(pack.metaDescription.length).toBeLessThanOrEqual(170);
      expect(pack.faqs.length).toBeGreaterThanOrEqual(3);
      expect(pack.relatedGuideSlugs.length).toBeGreaterThanOrEqual(2);
      expect(pack.internalLinks.length).toBeGreaterThanOrEqual(3);
      expect(pack.suggestedGlossaryTerms.length).toBeGreaterThanOrEqual(1);
      expect(pack.suggestedDownloads.length).toBeGreaterThanOrEqual(1);
      expect(pack.suggestedBlogSupport.length).toBeGreaterThanOrEqual(1);

      for (const slug of pack.relatedGuideSlugs) {
        expect(getGuideBySlug(slug), `unknown guide slug ${slug} on ${pack.slug}`).toBeTruthy();
      }

      const keywords = getLessonSeoKeywords(pack);
      expect(keywords[0]).toBe(pack.primaryKeyword);
    }
  });
});
