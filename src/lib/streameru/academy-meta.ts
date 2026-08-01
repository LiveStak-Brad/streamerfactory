/**
 * Shared StreamerU positioning + catalog facts for hub, SEO, and CTAs.
 * Published counts always derive from curriculum / assessments / library SoTs.
 * Planned university scale is roadmap-only — never imply it is published.
 */

import { CURRICULUM, CURRICULUM_TOTAL_LESSONS, curriculumByProgram } from "@/lib/resources/curriculum";
import { STREAMERU_XP } from "@/lib/assessments/xp";
import { sumStudyMinutesForSlugs } from "@/lib/resources/lesson-estimate";
import { getAllLibraryResources } from "@/lib/streameru-library/catalog";
import { getReadyResourceCount } from "@/lib/streameru-library/by-lesson";
import { LIBRARY_CATEGORIES } from "@/lib/streameru-library/types";

/** Lessons currently in the shipped academy catalog. */
export const PUBLISHED_LESSON_COUNT = CURRICULUM_TOTAL_LESSONS;

/**
 * Software-style release metadata — keeps the academy feeling maintained.
 * Bump version / dates when a meaningful lesson batch ships.
 */
export const ACADEMY_RELEASE = {
  version: "1.13",
  versionLabel: "StreamerU v1.13",
  currentReleaseLabel: "Current Release",
  lastUpdatedLabel: "July 2026",
  lastLessonAddedLabel: "July 2026",
  reviewedBy: "Brad Morris",
  cadence: "Updated weekly · New lessons every month",
} as const;

/** Study-only estimate for the published catalog (excludes LIVE exam minutes). */
export function getPublishedAcademyStudyMinutes(): number {
  return sumStudyMinutesForSlugs(CURRICULUM.map((l) => l.slug));
}

/** Human label like "5–6 hours" from published study minutes. */
export function getPublishedAcademyStudyHoursLabel(): string {
  const minutes = getPublishedAcademyStudyMinutes();
  const hours = minutes / 60;
  const low = Math.max(1, Math.floor(hours));
  const high = Math.max(low, Math.ceil(hours));
  if (low === high) return `~${low} hour${low === 1 ? "" : "s"}`;
  return `${low}–${high} hours`;
}

/** All programs in the academy roadmap (Programs 1–5). */
export function getPublishedProgramCount(): number {
  return curriculumByProgram().length;
}

/** Programs that currently have curriculum lessons. */
export function getActiveProgramCount(): number {
  return curriculumByProgram().filter((p) => p.lessons.length > 0).length;
}

/**
 * Approved university curriculum roadmap size (architecture), not the live catalog.
 * Surface only with “planned / in development” framing.
 */
export const PLANNED_CURRICULUM_LESSON_COUNT = 171;

/** Planned track count from the university architecture roadmap. */
export const PLANNED_TRACK_COUNT = 18;

/** First essential safety lesson inside Beginner Foundations — before regular LIVE. */
export const FIRST_SAFETY_LESSON_SLUG = "platform-rules-new-live-creators";

export const ACADEMY_POSITIONING = {
  brandLine: "StreamerU — The Internet's Free Live Streaming Academy",
  eyebrow: "Free Live Streaming Academy",
  title: "StreamerU",
  valueProposition:
    "Free live-streaming education inside the free Streamer Factory creator network — lessons, quizzes, LIVE exams, printables, certificates, and graduation. Membership is free. StreamerU is included.",
  freeAccess: "Free academy · Free creator network · Creators never pay us",
  growNote: "Built to grow continually from beginner through professional creator education",
} as const;

export const ACADEMY_SEO = {
  title: "StreamerU — Free TikTok LIVE Course & Live Streaming Academy",
  description:
    "Free TikTok LIVE course and live streaming academy from Streamer Factory. Join the free creator network and learn how to grow on TikTok LIVE with lessons, quizzes, LIVE exams, certificates, and graduation — no membership fees, no followers required.",
  shortDescription:
    "Free TikTok LIVE training inside a free creator network — lessons, quizzes, LIVE exams, certificates, and graduation. Creators never pay us.",
  keywords: [
    "StreamerU",
    "free TikTok LIVE course",
    "TikTok LIVE course",
    "live streaming course",
    "creator academy",
    "TikTok LIVE training",
    "become a TikTok LIVE creator",
    "live streaming education",
    "how to grow on TikTok LIVE",
    "learn TikTok LIVE",
    "free streaming academy",
    "free TikTok LIVE creator network",
  ],
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
  const lesson = CURRICULUM.find((l) => l.slug === FIRST_SAFETY_LESSON_SLUG) ?? CURRICULUM[2];
  return {
    slug: lesson.slug,
    title: lesson.title,
    globalOrder: lesson.globalOrder,
    href: `/streameru/${lesson.slug}`,
  };
}

export function catalogAvailabilityLine(): string {
  const programs = getActiveProgramCount();
  return `${PUBLISHED_LESSON_COUNT} lessons available now · ${programs} active programs · ${PLANNED_CURRICULUM_LESSON_COUNT}-lesson university curriculum planned`;
}
