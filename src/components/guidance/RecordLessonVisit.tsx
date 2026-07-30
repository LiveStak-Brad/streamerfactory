"use client";

import { useEffect } from "react";
import { recordLessonStartedAction } from "@/lib/growth/actions";
import { STREAMERU_LAST_LESSON_SLUG_KEY } from "@/lib/resources/recommended-lesson";

/**
 * Records last-visited lesson locally and emits lesson_started to the growth event stream.
 */
export function RecordLessonVisit({ slug }: { slug: string }) {
  useEffect(() => {
    try {
      localStorage.setItem(STREAMERU_LAST_LESSON_SLUG_KEY, slug);
    } catch {
      // ignore quota / private mode
    }
    void recordLessonStartedAction(slug);
  }, [slug]);

  return null;
}
