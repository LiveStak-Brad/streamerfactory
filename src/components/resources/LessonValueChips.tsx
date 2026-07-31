"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import { getLessonQuiz } from "@/lib/assessments/registry";
import { STREAMERU_XP } from "@/lib/assessments/xp";
import { getCurriculumLesson } from "@/lib/resources/curriculum";
import { difficultyBadgeClass, difficultyShortLabel } from "@/lib/resources/difficulty-styles";
import { getLessonEstimate } from "@/lib/resources/lesson-estimate";
import {
  getCompletedLessonSlugsServerSnapshot,
  getCompletedLessonSlugsSnapshot,
  subscribeStreamerUProgress,
} from "@/lib/resources/streameru-progress";
import { getResourcesForLesson } from "@/lib/streameru-library/by-lesson";

type Props = {
  slug: string;
  difficulty?: string | null;
  /** Compact for cards; default shows a fuller chip set */
  density?: "card" | "header";
  /** When false, skip difficulty (already shown nearby). */
  showDifficulty?: boolean;
  className?: string;
};

function Chip({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "accent" | "done";
}) {
  const toneClass =
    tone === "accent"
      ? "border-accent/30 bg-accent/[0.08] text-accent dark:text-accent-muted"
      : tone === "done"
        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200"
        : "border-border/80 bg-muted-bg/50 text-muted dark:border-zinc-700 dark:bg-zinc-900/50";
  return (
    <span
      className={`inline-flex items-center rounded-md border px-1.5 py-0.5 text-[0.65rem] font-semibold tabular-nums ${toneClass}`}
    >
      {children}
    </span>
  );
}

/**
 * Compact lesson value signals — difficulty, time, quiz, tools, XP, status.
 */
export function LessonValueChips({
  slug,
  difficulty,
  density = "card",
  showDifficulty = true,
  className = "",
}: Props) {
  const completed = useSyncExternalStore(
    subscribeStreamerUProgress,
    getCompletedLessonSlugsSnapshot,
    getCompletedLessonSlugsServerSnapshot,
  );
  const curriculum = getCurriculumLesson(slug);
  const estimate = getLessonEstimate(slug);
  const quiz = getLessonQuiz(slug);
  const library = getResourcesForLesson(slug);
  const hasWorksheet = library.some((r) => r.kind === "worksheet" || r.kind === "template");
  const hasChecklist = library.some((r) => r.kind === "checklist");
  const diffLabel = difficultyShortLabel(difficulty ?? null);
  const done = completed.has(slug);

  return (
    <div
      className={`flex flex-wrap items-center gap-1.5 ${className}`}
      aria-label="Lesson includes"
    >
      {showDifficulty && diffLabel ? (
        <span
          className={`inline-flex items-center rounded-md border px-1.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider ${difficultyBadgeClass(difficulty)}`}
        >
          {diffLabel}
        </span>
      ) : null}
      <Chip>Study {estimate.studyLabel}</Chip>
      {estimate.liveLabel ? <Chip>LIVE {estimate.liveLabel}</Chip> : null}
      {quiz ? <Chip tone="accent">Quiz</Chip> : null}
      {hasWorksheet ? <Chip>Worksheet</Chip> : null}
      {hasChecklist ? <Chip>Checklist</Chip> : null}
      {curriculum ? <Chip>Mission</Chip> : null}
      {quiz ? <Chip tone="accent">+{STREAMERU_XP.lessonQuizPass} XP</Chip> : null}
      {curriculum ? <Chip>{density === "header" ? "Certificate progress" : "Cert path"}</Chip> : null}
      {done ? (
        <Chip tone="done">Complete</Chip>
      ) : density === "header" ? (
        <Chip>Not complete</Chip>
      ) : null}
    </div>
  );
}
