"use client";

import { useEffect, useState } from "react";
import {
  computeRecommendedFromStorage,
  getDefaultRecommendedLesson,
  readLastVisitedSlugFromStorage,
  type RecommendedLessonRef,
} from "@/lib/resources/recommended-lesson";
import { getCurriculumLesson } from "@/lib/resources/curriculum";

export type RecommendedLessonState = {
  recommended: RecommendedLessonRef;
  /** Last lesson page opened on this device — for “continue where you left off”. */
  lastVisitedSlug: string | null;
  continueHref: string | null;
  continueTitle: string | null;
  mounted: boolean;
};

/**
 * Hydrates from localStorage after mount — matches `computeRecommendedFromStorage` + last visit.
 */
export function useRecommendedLesson(): RecommendedLessonState {
  const [state, setState] = useState<RecommendedLessonState>(() => ({
    recommended: getDefaultRecommendedLesson(),
    lastVisitedSlug: null,
    continueHref: null,
    continueTitle: null,
    mounted: false,
  }));

  useEffect(() => {
    const recommended = computeRecommendedFromStorage();
    const lastVisitedSlug = readLastVisitedSlugFromStorage();
    const lastLesson = lastVisitedSlug ? getCurriculumLesson(lastVisitedSlug) : null;
    setState({
      recommended,
      lastVisitedSlug,
      continueHref: lastVisitedSlug ? `/streameru/${lastVisitedSlug}` : null,
      continueTitle: lastLesson?.title ?? null,
      mounted: true,
    });
  }, []);

  return state;
}
