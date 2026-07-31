"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { DashboardWidget } from "@/components/ui/DashboardWidget";
import { EmptyState } from "@/components/ui/EmptyState";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { Button } from "@/components/ui/Button";
import { SuProgressBar } from "@/components/streameru/SuProgressBar";
import { CURRICULUM_TOTAL_LESSONS, getCurriculumLesson } from "@/lib/resources/curriculum";
import {
  computeRecommendedFromStorage,
  getDefaultRecommendedLesson,
  readLastVisitedSlugFromStorage,
  type RecommendedLessonRef,
} from "@/lib/resources/recommended-lesson";
import {
  countCompletedLessons,
  subscribeStreamerUProgress,
} from "@/lib/resources/streameru-progress";

type TrainingSnapshot = {
  completed: number;
  recommended: RecommendedLessonRef;
  continueHref: string | null;
  continueTitle: string | null;
};

const emptySnapshot: TrainingSnapshot = {
  completed: 0,
  recommended: getDefaultRecommendedLesson(),
  continueHref: null,
  continueTitle: null,
};

/** Cached so useSyncExternalStore getSnapshot stays referentially stable. */
let cachedSnapshot: TrainingSnapshot = emptySnapshot;
let cachedSnapshotKey = "";

function readTrainingSnapshot(): TrainingSnapshot {
  const done = countCompletedLessons();
  const next = computeRecommendedFromStorage();
  const last = readLastVisitedSlugFromStorage();
  const lastLesson = last ? getCurriculumLesson(last) : null;
  const continueHref = last ? `/streameru/${last}` : null;
  const continueTitle = lastLesson?.title ?? null;
  const key = [
    String(done),
    next.href,
    next.title,
    String(next.globalOrder),
    continueHref ?? "",
    continueTitle ?? "",
  ].join("|");
  if (key === cachedSnapshotKey) return cachedSnapshot;
  cachedSnapshotKey = key;
  cachedSnapshot = {
    completed: done,
    recommended: next,
    continueHref,
    continueTitle,
  };
  return cachedSnapshot;
}

function getServerSnapshot(): TrainingSnapshot {
  return emptySnapshot;
}

/**
 * Client island: StreamerU progress is device-local today (not DB-synced).
 * Shows real localStorage mission completions only — never invented XP.
 */
export function MemberDashboardStreamerUWidget() {
  const snapshot = useSyncExternalStore(
    subscribeStreamerUProgress,
    readTrainingSnapshot,
    getServerSnapshot,
  );
  const percent =
    CURRICULUM_TOTAL_LESSONS > 0 ? (snapshot.completed / CURRICULUM_TOTAL_LESSONS) * 100 : 0;
  const graduated = snapshot.completed >= CURRICULUM_TOTAL_LESSONS;

  return (
    <DashboardWidget
      eyebrow="StreamerU"
      title="Training progress"
      actionHref="/streameru"
      actionLabel="Academy →"
      featured
    >
      {snapshot.completed === 0 && !snapshot.continueHref ? (
        <EmptyState
          title="No Live Exams completed on this device yet"
          description="Progress is saved in this browser for now. Start Program 1 · Lesson 1 and your next lesson will show here."
          illustration="lessons"
          action={
            <Button href={snapshot.recommended.href} variant="primary" className="min-h-[44px] px-5">
              Start: {snapshot.recommended.title}
            </Button>
          }
        />
      ) : (
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <ProgressRing
            value={percent}
            size={104}
            label="Exams"
            sublabel={`${snapshot.completed}/${CURRICULUM_TOTAL_LESSONS}`}
          />
          <div className="min-w-0 flex-1 space-y-3">
            <SuProgressBar value={percent} label="StreamerU certificate progress" />
            <div>
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-muted">
                {graduated ? "Graduate" : "Recommended next"}
              </p>
              <Link
                href={snapshot.recommended.href}
                className="mt-1 block text-base font-semibold text-foreground hover:text-accent dark:hover:text-accent-muted"
              >
                {graduated
                  ? "You finished the academy — review any lesson"
                  : snapshot.recommended.title}
              </Link>
            </div>
            {snapshot.continueHref && snapshot.continueTitle ? (
              <p className="text-sm text-muted">
                Continue where you left off:{" "}
                <Link
                  href={snapshot.continueHref}
                  className="font-semibold text-accent dark:text-accent-muted"
                >
                  {snapshot.continueTitle}
                </Link>
              </p>
            ) : null}
            <Button href={snapshot.recommended.href} variant="secondary" className="min-h-[44px] px-5">
              {graduated ? "Open academy" : "Open lesson"}
            </Button>
          </div>
        </div>
      )}
    </DashboardWidget>
  );
}
