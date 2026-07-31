"use client";

import { useSyncExternalStore } from "react";
import { AcademyHubFooter } from "@/components/streameru/AcademyHubFooter";
import {
  getRecommendedLessonServerSnapshot,
  getRecommendedLessonSnapshot,
} from "@/lib/resources/recommended-lesson";
import {
  countCompletedLessons,
  subscribeStreamerUProgress,
} from "@/lib/resources/streameru-progress";

type Props = {
  isSignedIn: boolean;
};

/**
 * Reads device-local progress so the hub footer can show Continue vs Start.
 */
export function AcademyHubFooterBridge({ isSignedIn }: Props) {
  const completed = useSyncExternalStore(
    subscribeStreamerUProgress,
    countCompletedLessons,
    () => 0,
  );
  const recommended = useSyncExternalStore(
    subscribeStreamerUProgress,
    getRecommendedLessonSnapshot,
    getRecommendedLessonServerSnapshot,
  );

  return (
    <AcademyHubFooter
      isSignedIn={isSignedIn}
      hasProgress={completed > 0}
      continueHref={recommended.href}
    />
  );
}
