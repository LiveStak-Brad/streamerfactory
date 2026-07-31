import { LessonEstimateChips } from "@/components/resources/LessonEstimateChips";
import { SuProgressBar } from "@/components/streameru/SuProgressBar";
import type { CurriculumLesson } from "@/lib/resources/curriculum";
import { CURRICULUM_TOTAL_LESSONS } from "@/lib/resources/curriculum";
import type { LessonEstimate } from "@/lib/resources/lesson-estimate";
import { difficultyBadgeClass, difficultyShortLabel } from "@/lib/resources/difficulty-styles";
import { PUBLISHED_LESSON_COUNT } from "@/lib/streameru/academy-meta";

type Props = {
  lesson: CurriculumLesson;
  /** 1-based program index within the program list */
  semesterIndex: number;
  estimate: LessonEstimate;
  difficulty?: string | null;
};

/**
 * School-style placement — course + program dual progress.
 * Bars show position in the curriculum path (not mission completion %).
 */
export function CurriculumLessonHeader({
  lesson,
  semesterIndex,
  estimate,
  difficulty,
}: Props) {
  const coursePct = Math.round((lesson.globalOrder / CURRICULUM_TOTAL_LESSONS) * 100);
  const modulePct = Math.round((lesson.lessonInProgram / lesson.lessonsInProgram) * 100);
  const diffLabel = difficultyShortLabel(difficulty ?? null);
  const isRules = lesson.programName === "Rules & Safety";
  const isFirstSafety = lesson.slug === "platform-rules-new-live-creators";

  return (
    <div className="overflow-hidden rounded-2xl border border-border/80 bg-gradient-to-b from-accent-soft/35 via-surface to-surface px-5 py-5 shadow-sm dark:border-zinc-800 dark:from-accent/10 dark:via-zinc-950/70 dark:to-zinc-950/80 sm:px-6 sm:py-6">
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent dark:text-accent-muted">
          Program {semesterIndex} · {lesson.programName}
        </p>
        {diffLabel ? (
          <span
            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider ${difficultyBadgeClass(difficulty)}`}
          >
            {diffLabel}
          </span>
        ) : null}
        {isRules ? (
          <span className="inline-flex items-center rounded-full border border-teal-500/35 bg-teal-500/12 px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-teal-800 dark:border-teal-400/30 dark:bg-teal-500/15 dark:text-teal-200">
            Essential
          </span>
        ) : null}
      </div>

      {isFirstSafety ? (
        <p className="mt-3 rounded-lg border border-teal-500/25 bg-teal-500/10 px-3 py-2 text-xs font-medium leading-relaxed text-teal-900 dark:border-teal-400/25 dark:bg-teal-500/10 dark:text-teal-100">
          Start here before going LIVE regularly — protect first, then grow.
        </p>
      ) : null}

      <div className="mt-3 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <p className="text-sm font-semibold text-foreground">
          Lesson {lesson.globalOrder} of {PUBLISHED_LESSON_COUNT}
          <span className="font-normal text-muted">
            {" "}
            · Program lesson {lesson.lessonInProgram} of {lesson.lessonsInProgram}
          </span>
        </p>
        <p className="text-xs font-bold tabular-nums text-muted">
          {coursePct}% through published path
        </p>
      </div>

      <div className="mt-4 space-y-3">
        <div>
          <div className="mb-1.5 flex items-center justify-between text-[0.65rem] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            <span>Path position</span>
            <span className="tabular-nums">
              {lesson.globalOrder}/{PUBLISHED_LESSON_COUNT}
            </span>
          </div>
          <SuProgressBar value={coursePct} label="Position through published curriculum" />
        </div>
        <div>
          <div className="mb-1.5 flex items-center justify-between text-[0.65rem] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            <span>Program position</span>
            <span className="tabular-nums">
              {lesson.lessonInProgram}/{lesson.lessonsInProgram}
            </span>
          </div>
          <SuProgressBar
            value={modulePct}
            label="Position within this program"
            trackClassName="h-1.5"
          />
        </div>
      </div>

      <div className="mt-5 border-t border-zinc-200/70 pt-4 dark:border-zinc-800/80">
        <p className="mb-2 text-[0.65rem] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Estimated completion
        </p>
        <LessonEstimateChips estimate={estimate} />
      </div>
    </div>
  );
}
