import { LessonEstimateChips } from "@/components/resources/LessonEstimateChips";
import { SuProgressBar } from "@/components/streameru/SuProgressBar";
import type { CurriculumLesson } from "@/lib/resources/curriculum";
import { CURRICULUM_TOTAL_LESSONS } from "@/lib/resources/curriculum";
import type { LessonEstimate } from "@/lib/resources/lesson-estimate";
import { difficultyBadgeClass, difficultyShortLabel } from "@/lib/resources/difficulty-styles";

type Props = {
  lesson: CurriculumLesson;
  /** 1-based semester index within the program list */
  semesterIndex: number;
  estimate: LessonEstimate;
  difficulty?: string | null;
};

/**
 * School-style placement — course + semester dual progress.
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

  return (
    <div className="overflow-hidden rounded-2xl border border-border/80 bg-gradient-to-b from-accent-soft/35 via-surface to-surface px-5 py-5 shadow-sm dark:border-zinc-800 dark:from-accent/10 dark:via-zinc-950/70 dark:to-zinc-950/80 sm:px-6 sm:py-6">
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent dark:text-accent-muted">
          Semester {semesterIndex} · {lesson.programName}
        </p>
        {diffLabel ? (
          <span
            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider ${difficultyBadgeClass(difficulty)}`}
          >
            {diffLabel}
          </span>
        ) : null}
      </div>

      <div className="mt-3 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <p className="text-sm font-semibold text-foreground">
          Lesson {lesson.globalOrder} of {CURRICULUM_TOTAL_LESSONS}
          <span className="font-normal text-muted">
            {" "}
            · Semester lesson {lesson.lessonInProgram} of {lesson.lessonsInProgram}
          </span>
        </p>
        <p className="text-xs font-bold tabular-nums text-muted">{coursePct}% through program</p>
      </div>

      <div className="mt-4 space-y-3">
        <div>
          <div className="mb-1.5 flex items-center justify-between text-[0.65rem] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            <span>Course progress</span>
            <span className="tabular-nums">
              {lesson.globalOrder}/{CURRICULUM_TOTAL_LESSONS}
            </span>
          </div>
          <SuProgressBar value={coursePct} label="Course progress through curriculum" />
        </div>
        <div>
          <div className="mb-1.5 flex items-center justify-between text-[0.65rem] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            <span>Semester progress</span>
            <span className="tabular-nums">
              {lesson.lessonInProgram}/{lesson.lessonsInProgram}
            </span>
          </div>
          <SuProgressBar
            value={modulePct}
            label="Progress within this semester"
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
