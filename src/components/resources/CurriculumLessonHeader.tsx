import type { CurriculumLesson } from "@/lib/resources/curriculum";
import { CURRICULUM_TOTAL_LESSONS } from "@/lib/resources/curriculum";

type Props = {
  lesson: CurriculumLesson;
};

/**
 * School-style placement in the program — never ambiguous which lesson this is.
 */
export function CurriculumLessonHeader({ lesson }: Props) {
  const pct = Math.round((lesson.globalOrder / CURRICULUM_TOTAL_LESSONS) * 100);

  return (
    <div className="overflow-hidden rounded-2xl border border-border/80 bg-gradient-to-b from-accent-soft/40 to-surface px-5 py-4 shadow-sm dark:border-zinc-800 dark:from-accent/10 dark:to-zinc-950/60 sm:px-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent dark:text-accent-muted">
            {lesson.programName}
          </p>
          <p className="mt-2 text-sm font-semibold text-foreground">
            Lesson {lesson.globalOrder} of {CURRICULUM_TOTAL_LESSONS}
            <span className="font-normal text-muted">
              {" "}
              · Module lesson {lesson.lessonInProgram} of {lesson.lessonsInProgram}
            </span>
          </p>
        </div>
        <p className="text-xs font-bold tabular-nums text-muted">{pct}% through program</p>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted-bg dark:bg-zinc-800">
        <div
          className="h-full rounded-full bg-gradient-brand transition-[width] duration-500 motion-reduce:transition-none"
          style={{ width: `${pct}%` }}
          aria-hidden
        />
      </div>
    </div>
  );
}
