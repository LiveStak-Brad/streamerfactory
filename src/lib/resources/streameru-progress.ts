/**
 * Single source of truth for device-local StreamerU mission / Live Exam completion.
 * Hub semester bars, total progress, sidebar, certificate, and member widget must use this.
 */

import { getCurriculumLesson } from "@/lib/resources/curriculum";
import {
  STREAMERU_MISSION_DONE_KEY_PREFIX,
  missionDoneStorageKey,
} from "@/lib/resources/recommended-lesson";
import { getMissionForLessonSlug } from "@/lib/resources/training-missions";
import { STREAMERU_PROGRESS_EVENT } from "@/lib/resources/streameru-progress-events";

/** Whether a curriculum lesson’s Live Exam is marked complete on this device. */
export function isLessonMissionComplete(slug: string): boolean {
  if (typeof window === "undefined") return false;
  if (!getCurriculumLesson(slug)) return false;
  const mission = getMissionForLessonSlug(slug);
  if (!mission) return false;
  try {
    const raw = localStorage.getItem(missionDoneStorageKey(slug));
    if (!raw) return false;
    const parsed = JSON.parse(raw) as { missionId?: string };
    return parsed.missionId === mission.id;
  } catch {
    return false;
  }
}

/** All curriculum slugs with a matching completed Live Exam on this device. */
export function readCompletedLessonSlugs(): Set<string> {
  const set = new Set<string>();
  if (typeof window === "undefined") return set;
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key?.startsWith(STREAMERU_MISSION_DONE_KEY_PREFIX)) continue;
      const slug = key.slice(STREAMERU_MISSION_DONE_KEY_PREFIX.length);
      if (isLessonMissionComplete(slug)) set.add(slug);
    }
  } catch {
    return set;
  }
  return set;
}

/** Stable empty set for useSyncExternalStore getServerSnapshot. */
const EMPTY_COMPLETED_SLUGS = new Set<string>();

let cachedCompletedKey = "";
let cachedCompletedSlugs: Set<string> = EMPTY_COMPLETED_SLUGS;

/**
 * Referentially stable completed-slug Set for useSyncExternalStore getSnapshot.
 * Returning a new Set each call causes infinite re-renders.
 */
export function getCompletedLessonSlugsSnapshot(): Set<string> {
  const next = readCompletedLessonSlugs();
  const key = [...next].sort().join(",");
  if (key === cachedCompletedKey) return cachedCompletedSlugs;
  cachedCompletedKey = key;
  cachedCompletedSlugs = next;
  return cachedCompletedSlugs;
}

/** Stable getServerSnapshot companion for getCompletedLessonSlugsSnapshot. */
export function getCompletedLessonSlugsServerSnapshot(): Set<string> {
  return EMPTY_COMPLETED_SLUGS;
}

export function countCompletedLessons(): number {
  return readCompletedLessonSlugs().size;
}

export function subscribeStreamerUProgress(onStoreChange: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const handler = () => onStoreChange();
  window.addEventListener(STREAMERU_PROGRESS_EVENT, handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(STREAMERU_PROGRESS_EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}
