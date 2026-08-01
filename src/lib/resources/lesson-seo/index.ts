import { CURRICULUM } from "@/lib/resources/curriculum";
import { BEGINNER_LESSON_SEO } from "@/lib/resources/lesson-seo/packs/beginner";
import { BATTLES_LESSON_SEO } from "@/lib/resources/lesson-seo/packs/battles";
import { MASTERY_LESSON_SEO } from "@/lib/resources/lesson-seo/packs/mastery";
import { MONETIZATION_LESSON_SEO } from "@/lib/resources/lesson-seo/packs/monetization";
import { RULES_LESSON_SEO } from "@/lib/resources/lesson-seo/packs/rules";
import { ADVANCED_CREATOR_LESSON_SEO } from "@/lib/resources/lesson-seo/packs/advanced-creator";
import { PRESENCE_LESSON_SEO } from "@/lib/resources/lesson-seo/packs/presence";
import { CONTENT_CREATION_LESSON_SEO } from "@/lib/resources/lesson-seo/packs/content-creation";
import { GROWTH_MASTERY_LESSON_SEO } from "@/lib/resources/lesson-seo/packs/growth-mastery";
import { COMMUNITY_MASTERY_LESSON_SEO } from "@/lib/resources/lesson-seo/packs/community-mastery";
import { PROFESSIONAL_CREATOR_MASTERY_LESSON_SEO } from "@/lib/resources/lesson-seo/packs/professional-creator-mastery";
import { PRODUCTION_MASTERY_LESSON_SEO } from "@/lib/resources/lesson-seo/packs/production-mastery";
import { BATTLE_MASTERY_LESSON_SEO } from "@/lib/resources/lesson-seo/packs/battle-mastery";
import { MUSIC_LIVE_MASTERY_LESSON_SEO } from "@/lib/resources/lesson-seo/packs/music-live-mastery";
import { GAMING_LIVE_MASTERY_LESSON_SEO } from "@/lib/resources/lesson-seo/packs/gaming-live-mastery";
import { MULTI_GUEST_LIVE_MASTERY_LESSON_SEO } from "@/lib/resources/lesson-seo/packs/multi-guest-live-mastery";
import { AI_CREATOR_MASTERY_LESSON_SEO } from "@/lib/resources/lesson-seo/packs/ai-creator-mastery";
import type { LessonSeoPack } from "@/lib/resources/lesson-seo/types";

export type { LessonSeoPack, LessonFaq, LessonInternalLink, LessonContentSuggestion } from "@/lib/resources/lesson-seo/types";

const ALL_PACKS: LessonSeoPack[] = [
  ...BEGINNER_LESSON_SEO,
  ...MASTERY_LESSON_SEO,
  ...BATTLES_LESSON_SEO,
  ...MONETIZATION_LESSON_SEO,
  ...RULES_LESSON_SEO,
  ...ADVANCED_CREATOR_LESSON_SEO,
  ...PRESENCE_LESSON_SEO,
  ...CONTENT_CREATION_LESSON_SEO,
  ...GROWTH_MASTERY_LESSON_SEO,
  ...COMMUNITY_MASTERY_LESSON_SEO,
  ...PROFESSIONAL_CREATOR_MASTERY_LESSON_SEO,
  ...PRODUCTION_MASTERY_LESSON_SEO,
  ...BATTLE_MASTERY_LESSON_SEO,
  ...MUSIC_LIVE_MASTERY_LESSON_SEO,
  ...GAMING_LIVE_MASTERY_LESSON_SEO,
  ...MULTI_GUEST_LIVE_MASTERY_LESSON_SEO,
  ...AI_CREATOR_MASTERY_LESSON_SEO,
];

const PACKS_BY_SLUG = new Map(ALL_PACKS.map((pack) => [pack.slug, pack]));

/** All curriculum lesson SEO packs in curriculum order when possible. */
export function getAllLessonSeoPacks(): LessonSeoPack[] {
  const ordered: LessonSeoPack[] = [];
  for (const lesson of CURRICULUM) {
    const pack = PACKS_BY_SLUG.get(lesson.slug);
    if (pack) ordered.push(pack);
  }
  for (const pack of ALL_PACKS) {
    if (!ordered.some((p) => p.slug === pack.slug)) ordered.push(pack);
  }
  return ordered;
}

export function getLessonSeo(slug: string): LessonSeoPack | null {
  return PACKS_BY_SLUG.get(slug) ?? null;
}

/** Keywords array for metadata: primary first, then secondaries. */
export function getLessonSeoKeywords(pack: LessonSeoPack): string[] {
  return [pack.primaryKeyword, ...pack.secondaryKeywords];
}
