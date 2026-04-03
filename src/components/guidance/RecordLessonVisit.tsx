"use client";

import { useEffect } from "react";
import { STREAMERU_LAST_LESSON_SLUG_KEY } from "@/lib/resources/recommended-lesson";

/**
 * Records the current lesson as “last visited” for soft guidance (no server sync).
 */
export function RecordLessonVisit({ slug }: { slug: string }) {
  useEffect(() => {
    try {
      localStorage.setItem(STREAMERU_LAST_LESSON_SLUG_KEY, slug);
    } catch {
      // ignore quota / private mode
    }
  }, [slug]);

  return null;
}
