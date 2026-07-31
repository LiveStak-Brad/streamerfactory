/**
 * Maps StreamerU lesson slugs → related public knowledge-center guides.
 * Sourced from lesson SEO packs (single source of truth).
 */
import { getLessonSeo } from "@/lib/resources/lesson-seo";

const FALLBACK_GUIDE_SLUGS = ["tiktok-live-tips", "creator-academy", "streamer-resources"];

export function getRelatedGuideSlugsForLesson(lessonSlug: string): string[] {
  const fromSeo = getLessonSeo(lessonSlug)?.relatedGuideSlugs;
  if (fromSeo && fromSeo.length > 0) return fromSeo;
  return FALLBACK_GUIDE_SLUGS;
}
