/**
 * Soft guidance: recommends the next curriculum step from local device hints only.
 * No gating — server defaults to Lesson 1; client may refine using localStorage.
 */

import {
  CURRICULUM,
  type CurriculumLesson,
  getCurriculumLesson,
  getCurriculumNeighbors,
} from "@/lib/resources/curriculum";

export const STREAMERU_LAST_LESSON_SLUG_KEY = "sf_streameru_last_lesson_slug";

/** Must match `LessonMissionComplete` keys — single source for mission completion detection. */
export const STREAMERU_MISSION_DONE_KEY_PREFIX = "sf_streameru_mission_done_";

export function missionDoneStorageKey(slug: string): string {
  return `${STREAMERU_MISSION_DONE_KEY_PREFIX}${slug}`;
}

/** Battle track lesson — linked from Battle Hub as a soft “before you battle” suggestion. */
export const BATTLE_HUB_RECOMMENDED_LESSON_SLUG = "structure-your-first-battle-week";

export type RecommendedLessonRef = {
  slug: string;
  title: string;
  globalOrder: number;
  href: string;
};

function lessonToRef(lesson: CurriculumLesson): RecommendedLessonRef {
  return {
    slug: lesson.slug,
    title: lesson.title,
    globalOrder: lesson.globalOrder,
    href: `/streameru/${lesson.slug}`,
  };
}

export function getDefaultRecommendedLesson(): RecommendedLessonRef {
  return lessonToRef(CURRICULUM[0]);
}

/**
 * Server-safe default when there is no synced progress (no DB yet).
 * Call from RSC or anywhere you cannot read localStorage.
 */
export function getNextRecommendedLesson(_user?: unknown): RecommendedLessonRef {
  return getDefaultRecommendedLesson();
}

function neighborToRef(slug: string): RecommendedLessonRef | null {
  const lesson = getCurriculumLesson(slug);
  return lesson ? lessonToRef(lesson) : null;
}

/**
 * Client-only: derive the next suggested lesson from mission completion + last visit.
 * Safe to call inside `useEffect` or after mount.
 */
export function computeRecommendedFromStorage(): RecommendedLessonRef {
  if (typeof window === "undefined") return getDefaultRecommendedLesson();

  let maxCompletedOrder = -1;
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key?.startsWith(STREAMERU_MISSION_DONE_KEY_PREFIX)) continue;
      const slug = key.slice(STREAMERU_MISSION_DONE_KEY_PREFIX.length);
      const raw = localStorage.getItem(key);
      if (!raw) continue;
      try {
        const parsed = JSON.parse(raw) as { missionId?: string };
        if (!parsed?.missionId) continue;
        const lesson = getCurriculumLesson(slug);
        if (lesson && lesson.globalOrder > maxCompletedOrder) {
          maxCompletedOrder = lesson.globalOrder;
        }
      } catch {
        continue;
      }
    }
  } catch {
    return getDefaultRecommendedLesson();
  }

  if (maxCompletedOrder >= 0) {
    const completed = CURRICULUM.find((l) => l.globalOrder === maxCompletedOrder);
    if (completed) {
      const { next } = getCurriculumNeighbors(completed.slug);
      if (next) {
        const ref = neighborToRef(next.slug);
        if (ref) return ref;
      }
      return lessonToRef(completed);
    }
  }

  try {
    const last = localStorage.getItem(STREAMERU_LAST_LESSON_SLUG_KEY);
    if (last) {
      const cur = getCurriculumLesson(last);
      if (cur) {
        const { next } = getCurriculumNeighbors(last);
        if (next) {
          const ref = neighborToRef(next.slug);
          if (ref) return ref;
        }
        return lessonToRef(cur);
      }
    }
  } catch {
    // ignore
  }

  return getDefaultRecommendedLesson();
}

export function readLastVisitedSlugFromStorage(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(STREAMERU_LAST_LESSON_SLUG_KEY);
  } catch {
    return null;
  }
}
