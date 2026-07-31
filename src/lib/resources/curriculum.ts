/**
 * Single source of truth for StreamerU program order.
 *
 * Add a lesson:
 * 1. Append to `CURRICULUM` with the next `globalOrder`, correct `programName`, and a unique `slug`
 *    (must match `resource_posts.slug` when published).
 * 2. Add a matching mission in `training-missions.ts` keyed by the same `slug`.
 * 3. Register at least one StreamerU library resource in `src/lib/streameru-library/` (checklist minimum).
 * 4. Publish the post in admin with that slug (or seed it).
 *
 * Program layout (safety-first):
 * 1. Beginner Foundations — setup + essential platform safety before regular LIVE
 * 2. Live Streaming Mastery
 * 3. Battles & Collaboration
 * 4. Growth & Monetization
 * 5. Advanced Creator — long-term scaling, branding, and creator business (lessons shipping next)
 */

import type { TrainingTrackId } from "@/lib/resources/tracks";

export type CurriculumLesson = {
  /** 1–N across the full academy path */
  globalOrder: number;
  /** Must match `resource_posts.slug` */
  slug: string;
  /** Program display title (may differ slightly from CMS title until aligned) */
  title: string;
  trackId: TrainingTrackId;
  /** Human-readable program (e.g. Beginner Foundations) */
  programName: string;
  /** Lesson index within this program (1-based) */
  lessonInProgram: number;
  lessonsInProgram: number;
};

/**
 * Canonical program display names — order defines hub / sidebar / finals sequence.
 * Advanced Creator keeps internal programKey `rules` so finals/certificate storage IDs stay stable.
 */
export const STREAMERU_PROGRAM_NAMES = [
  "Beginner Foundations",
  "Live Streaming Mastery",
  "Battles & Collaboration",
  "Growth & Monetization",
  "Advanced Creator",
] as const;

export type StreamerUProgramName = (typeof STREAMERU_PROGRAM_NAMES)[number];

/** Planned Advanced Creator topics until lesson bodies ship (not curriculum slugs). */
export const ADVANCED_CREATOR_ROADMAP_TOPICS = [
  "Creator brand systems",
  "Analytics for LIVE growth",
  "Creator business foundations",
  "Advanced growth strategy",
] as const;

/** Strict global order — the only sequence users should follow for the full course. */
export const CURRICULUM: CurriculumLesson[] = [
  // BEGINNER FOUNDATIONS (9) — setup, then essential safety, then first regular LIVE habits
  {
    globalOrder: 1,
    slug: "start-strong-on-tiktok-live",
    title: "Understanding TikTok LIVE + Setup",
    trackId: "beginner",
    programName: "Beginner Foundations",
    lessonInProgram: 1,
    lessonsInProgram: 9,
  },
  {
    globalOrder: 2,
    slug: "your-first-live-structure",
    title: "Your first live structure",
    trackId: "beginner",
    programName: "Beginner Foundations",
    lessonInProgram: 2,
    lessonsInProgram: 9,
  },
  {
    globalOrder: 3,
    slug: "platform-rules-new-live-creators",
    title: "TikTok rules explained",
    trackId: "rules",
    programName: "Beginner Foundations",
    lessonInProgram: 3,
    lessonsInProgram: 9,
  },
  {
    globalOrder: 4,
    slug: "what-gets-you-banned",
    title: "What gets you banned",
    trackId: "rules",
    programName: "Beginner Foundations",
    lessonInProgram: 4,
    lessonsInProgram: 9,
  },
  {
    globalOrder: 5,
    slug: "how-to-avoid-violations",
    title: "How to avoid violations",
    trackId: "rules",
    programName: "Beginner Foundations",
    lessonInProgram: 5,
    lessonsInProgram: 9,
  },
  {
    globalOrder: 6,
    slug: "long-term-account-safety",
    title: "Long-term account safety",
    trackId: "rules",
    programName: "Beginner Foundations",
    lessonInProgram: 6,
    lessonsInProgram: 9,
  },
  {
    globalOrder: 7,
    slug: "first-10-tiktok-live-sessions",
    title: "First 30-minute live session",
    trackId: "beginner",
    programName: "Beginner Foundations",
    lessonInProgram: 7,
    lessonsInProgram: 9,
  },
  {
    globalOrder: 8,
    slug: "first-week-of-lives-consistency",
    title: "First week of lives (consistency focus)",
    trackId: "beginner",
    programName: "Beginner Foundations",
    lessonInProgram: 8,
    lessonsInProgram: 9,
  },
  {
    globalOrder: 9,
    slug: "common-live-mistakes-new-creators",
    title: "Avoiding beginner mistakes",
    trackId: "beginner",
    programName: "Beginner Foundations",
    lessonInProgram: 9,
    lessonsInProgram: 9,
  },
  // LIVE STREAMING MASTERY (5) — uses `content` track id
  {
    globalOrder: 10,
    slug: "talking-with-empty-room",
    title: "Talking when no one is watching",
    trackId: "content",
    programName: "Live Streaming Mastery",
    lessonInProgram: 1,
    lessonsInProgram: 5,
  },
  {
    globalOrder: 11,
    slug: "hooks-and-first-impressions",
    title: "Hooks and first impressions",
    trackId: "content",
    programName: "Live Streaming Mastery",
    lessonInProgram: 2,
    lessonsInProgram: 5,
  },
  {
    globalOrder: 12,
    slug: "content-loops-repeatable-segments",
    title: "Viewer retention techniques",
    trackId: "content",
    programName: "Live Streaming Mastery",
    lessonInProgram: 3,
    lessonsInProgram: 5,
  },
  {
    globalOrder: 13,
    slug: "structuring-longer-lives",
    title: "Structuring longer lives",
    trackId: "content",
    programName: "Live Streaming Mastery",
    lessonInProgram: 4,
    lessonsInProgram: 5,
  },
  {
    globalOrder: 14,
    slug: "growth-weekly-system",
    title: "Building repeat viewers",
    trackId: "content",
    programName: "Live Streaming Mastery",
    lessonInProgram: 5,
    lessonsInProgram: 5,
  },
  // BATTLES & COLLABORATION (5)
  {
    globalOrder: 15,
    slug: "understanding-battles",
    title: "Understanding battles",
    trackId: "battles",
    programName: "Battles & Collaboration",
    lessonInProgram: 1,
    lessonsInProgram: 5,
  },
  {
    globalOrder: 16,
    slug: "preparing-for-your-first-battle",
    title: "Preparing for your first battle",
    trackId: "battles",
    programName: "Battles & Collaboration",
    lessonInProgram: 2,
    lessonsInProgram: 5,
  },
  {
    globalOrder: 17,
    slug: "structure-your-first-battle-week",
    title: "Running your first battle",
    trackId: "battles",
    programName: "Battles & Collaboration",
    lessonInProgram: 3,
    lessonsInProgram: 5,
  },
  {
    globalOrder: 18,
    slug: "improving-battle-performance",
    title: "Improving battle performance",
    trackId: "battles",
    programName: "Battles & Collaboration",
    lessonInProgram: 4,
    lessonsInProgram: 5,
  },
  {
    globalOrder: 19,
    slug: "building-battle-partners",
    title: "Building battle partners",
    trackId: "battles",
    programName: "Battles & Collaboration",
    lessonInProgram: 5,
    lessonsInProgram: 5,
  },
  // GROWTH & MONETIZATION (5)
  {
    globalOrder: 20,
    slug: "gifts-goals-momentum",
    title: "How gifting works",
    trackId: "monetization",
    programName: "Growth & Monetization",
    lessonInProgram: 1,
    lessonsInProgram: 5,
  },
  {
    globalOrder: 21,
    slug: "creating-reasons-to-gift",
    title: "Creating reasons to gift",
    trackId: "monetization",
    programName: "Growth & Monetization",
    lessonInProgram: 2,
    lessonsInProgram: 5,
  },
  {
    globalOrder: 22,
    slug: "setting-goals-during-lives",
    title: "Setting goals during lives",
    trackId: "monetization",
    programName: "Growth & Monetization",
    lessonInProgram: 3,
    lessonsInProgram: 5,
  },
  {
    globalOrder: 23,
    slug: "building-income-habits",
    title: "Building income habits",
    trackId: "monetization",
    programName: "Growth & Monetization",
    lessonInProgram: 4,
    lessonsInProgram: 5,
  },
  {
    globalOrder: 24,
    slug: "scaling-consistency",
    title: "Scaling consistency",
    trackId: "monetization",
    programName: "Growth & Monetization",
    lessonInProgram: 5,
    lessonsInProgram: 5,
  },
];

const CURRICULUM_BY_SLUG = new Map(CURRICULUM.map((l) => [l.slug, l]));

export const CURRICULUM_TOTAL_LESSONS = CURRICULUM.length;

/** First lesson in the program — primary entry for the hub hero. */
export const FIRST_PROGRAM_LESSON_SLUG = CURRICULUM[0].slug;

/** Opening sprint — setup + first safety lessons before regular LIVE. */
export function getStartHereCurriculumLessons(): CurriculumLesson[] {
  return CURRICULUM.slice(0, 4);
}

export function getCurriculumLesson(slug: string): CurriculumLesson | null {
  return CURRICULUM_BY_SLUG.get(slug) ?? null;
}

/** Sort key for mixing DB posts with curriculum order (unknown slugs sort last). */
export function getCurriculumOrderIndex(slug: string): number {
  const i = CURRICULUM.findIndex((l) => l.slug === slug);
  return i < 0 ? 9999 + slug.charCodeAt(0) : i;
}

export type CurriculumNeighbor = {
  slug: string;
  title: string;
  programName: string;
};

export function getCurriculumNeighbors(slug: string): {
  prev: CurriculumNeighbor | null;
  next: CurriculumNeighbor | null;
} {
  const idx = CURRICULUM.findIndex((l) => l.slug === slug);
  if (idx < 0) return { prev: null, next: null };
  const prev = idx > 0 ? CURRICULUM[idx - 1] : null;
  const next = idx < CURRICULUM.length - 1 ? CURRICULUM[idx + 1] : null;
  return {
    prev: prev
      ? { slug: prev.slug, title: prev.title, programName: prev.programName }
      : null,
    next: next
      ? { slug: next.slug, title: next.title, programName: next.programName }
      : null,
  };
}

/** Group ordered lessons for hub / docs — preserves STREAMERU_PROGRAM_NAMES order. */
export function curriculumByProgram(): { programName: string; lessons: CurriculumLesson[] }[] {
  const map = new Map<string, CurriculumLesson[]>();
  for (const l of CURRICULUM) {
    const list = map.get(l.programName) ?? [];
    list.push(l);
    map.set(l.programName, list);
  }
  return STREAMERU_PROGRAM_NAMES.map((programName) => ({
    programName,
    lessons: map.get(programName) ?? [],
  }));
}

/** Safety lessons living inside Beginner Foundations (track topic, not a separate program). */
export function isEssentialSafetyLesson(slug: string): boolean {
  const lesson = CURRICULUM_BY_SLUG.get(slug);
  return lesson?.trackId === "rules" && lesson.programName === "Beginner Foundations";
}
