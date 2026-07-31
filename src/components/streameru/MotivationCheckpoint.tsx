"use client";

import { useSyncExternalStore } from "react";
import { listAcademyPrograms } from "@/lib/assessments/programs";
import {
  readFinalPassed,
  readGraduationPassed,
  readQuizPassed,
} from "@/lib/assessments/progress-local";
import {
  computeRecommendedFromStorage,
  getDefaultRecommendedLesson,
} from "@/lib/resources/recommended-lesson";
import {
  getCompletedLessonSlugsServerSnapshot,
  getCompletedLessonSlugsSnapshot,
  subscribeStreamerUProgress,
} from "@/lib/resources/streameru-progress";
import { buildMotivationMessages } from "@/lib/streameru/academy-motivation";

type Props = {
  /** When set, prefer this lesson for quiz/mission messaging (lesson pages). */
  lessonSlug?: string;
  className?: string;
  compact?: boolean;
};

function readMotivation(lessonSlug?: string) {
  const completedSlugs = getCompletedLessonSlugsSnapshot();
  const recommended = computeRecommendedFromStorage();
  const slug = lessonSlug ?? recommended.slug;
  const programs = listAcademyPrograms();
  const programsComplete = programs.filter(
    (p) =>
      p.lessons.length > 0 && p.lessons.every((l) => completedSlugs.has(l.slug)),
  ).length;
  const finalsPassed = programs.filter((p) => readFinalPassed(p.programKey)).length;
  const activePrograms = programs.filter((p) => p.lessons.length > 0).length;

  return buildMotivationMessages({
    completedSlugs,
    recommendedSlug: slug,
    quizPassedForRecommended: readQuizPassed(slug),
    finalsPassed,
    activePrograms,
    programsComplete,
    graduationPassed: readGraduationPassed(),
  });
}

let cacheKey = "";
let cache: ReturnType<typeof buildMotivationMessages> = [];

function getSnap(lessonSlug?: string) {
  const messages = readMotivation(lessonSlug);
  const key = `${lessonSlug ?? ""}|${messages.map((m) => m.id).join(",")}|${messages.map((m) => m.text).join("|")}`;
  if (key === cacheKey) return cache;
  cacheKey = key;
  cache = messages;
  return cache;
}

/**
 * Dynamic motivational checkpoints — device-local progress only.
 */
export function MotivationCheckpoint({ lessonSlug, className = "", compact = false }: Props) {
  const messages = useSyncExternalStore(
    subscribeStreamerUProgress,
    () => getSnap(lessonSlug),
    () =>
      buildMotivationMessages({
        completedSlugs: getCompletedLessonSlugsServerSnapshot(),
        recommendedSlug: lessonSlug ?? getDefaultRecommendedLesson().slug,
        quizPassedForRecommended: false,
        finalsPassed: 0,
        activePrograms: 4,
        programsComplete: 0,
        graduationPassed: false,
      }),
  );

  if (messages.length === 0) return null;
  const primary = messages[0];
  const rest = compact ? [] : messages.slice(1);

  return (
    <aside
      className={`rounded-2xl border border-accent/25 bg-accent/[0.06] px-4 py-3.5 dark:border-accent/20 dark:bg-accent/[0.08] ${className}`}
      aria-label="Motivation"
    >
      <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-accent dark:text-accent-muted">
        {primary.eyebrow}
      </p>
      <p className="mt-1 text-sm font-medium leading-relaxed text-foreground">{primary.text}</p>
      {rest.length > 0 ? (
        <ul className="mt-2 space-y-1 text-xs leading-relaxed text-muted">
          {rest.map((m) => (
            <li key={m.id}>
              <span className="font-semibold text-foreground/80">{m.eyebrow}:</span> {m.text}
            </li>
          ))}
        </ul>
      ) : null}
    </aside>
  );
}
