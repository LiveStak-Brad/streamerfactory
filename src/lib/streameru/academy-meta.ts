/**
 * Shared StreamerU positioning + catalog facts for hub, SEO, and CTAs.
 * Published counts always derive from curriculum / assessments / library SoTs.
 * Planned university scale is roadmap-only — never imply it is published.
 */

import { CURRICULUM, CURRICULUM_TOTAL_LESSONS, curriculumByProgram } from "@/lib/resources/curriculum";
import { STREAMERU_XP } from "@/lib/assessments/xp";
import { getAllLibraryResources } from "@/lib/streameru-library/catalog";
import { getReadyResourceCount } from "@/lib/streameru-library/by-lesson";
import { LIBRARY_CATEGORIES } from "@/lib/streameru-library/types";

/** Lessons currently in the shipped academy catalog. */
export const PUBLISHED_LESSON_COUNT = CURRICULUM_TOTAL_LESSONS;

/** Programs currently published in the academy (Beginner → Rules). */
export function getPublishedProgramCount(): number {
  return curriculumByProgram().length;
}

/**
 * Approved university curriculum roadmap size (architecture), not the live catalog.
 * Surface only with “planned / in development” framing.
 */
export const PLANNED_CURRICULUM_LESSON_COUNT = 171;

/** Planned track count from the university architecture roadmap. */
export const PLANNED_TRACK_COUNT = 18;

/** First Rules & Safety lesson — essential before regular LIVE. */
export const FIRST_SAFETY_LESSON_SLUG = "platform-rules-new-live-creators";

export const ACADEMY_POSITIONING = {
  brandLine: "StreamerU — The Internet's Free Live Streaming Academy",
  eyebrow: "Free Live Streaming Academy",
  title: "StreamerU",
  valueProposition:
    "100% free live-streaming education — no subscription, no course fees. Lessons, quizzes, LIVE exams, printables, certificates, and graduation. Built to grow from beginner through professional creator training.",
  freeAccess: "100% free · No subscription · No course fees · Learn before applying",
  growNote: "Built to grow continually from beginner through professional creator education",
} as const;

export const ACADEMY_SEO = {
  title: "StreamerU — The Internet's Free Live Streaming Academy",
  description:
    "Free live-streaming academy from Streamer Factory. Lessons, quizzes, LIVE exams, printables, certificates, and graduation — no subscription or course fees. Learn before you apply.",
  shortDescription:
    "The internet's free live streaming academy — lessons, quizzes, LIVE exams, certificates, and graduation. No course fees.",
} as const;

export type LibraryHubStats = {
  total: number;
  ready: number;
  placeholder: number;
  readyChecklists: number;
  beginnerReady: number;
  categoriesWithResources: number;
};

export function getLibraryHubStats(): LibraryHubStats {
  const all = getAllLibraryResources();
  const ready = getReadyResourceCount();
  const readyChecklists = all.filter((r) => r.status === "ready" && r.kind === "checklist").length;
  const beginnerReady = all.filter((r) => r.status === "ready" && r.category === "beginner").length;
  const categoriesWithResources = LIBRARY_CATEGORIES.filter((c) =>
    all.some((r) => r.category === c.id),
  ).length;
  return {
    total: all.length,
    ready,
    placeholder: all.length - ready,
    readyChecklists,
    beginnerReady,
    categoriesWithResources,
  };
}

/** XP learners can earn from a lesson quiz pass (real assessment table). */
export const LESSON_ONE_QUIZ_XP = STREAMERU_XP.lessonQuizPass;

export function getFirstLessonMeta() {
  const lesson = CURRICULUM[0];
  return {
    slug: lesson.slug,
    title: lesson.title,
    globalOrder: lesson.globalOrder,
    programName: lesson.programName,
    href: `/streameru/${lesson.slug}`,
  };
}

export function getFirstSafetyLessonMeta() {
  const lesson = CURRICULUM.find((l) => l.slug === FIRST_SAFETY_LESSON_SLUG) ?? CURRICULUM[20];
  return {
    slug: lesson.slug,
    title: lesson.title,
    globalOrder: lesson.globalOrder,
    href: `/streameru/${lesson.slug}`,
  };
}

export function catalogAvailabilityLine(): string {
  const programs = getPublishedProgramCount();
  return `${PUBLISHED_LESSON_COUNT} lessons available now · ${programs} programs · ${PLANNED_CURRICULUM_LESSON_COUNT}-lesson university curriculum planned`;
}
