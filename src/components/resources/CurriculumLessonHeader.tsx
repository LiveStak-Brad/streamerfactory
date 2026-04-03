import type { CurriculumLesson } from "@/lib/resources/curriculum";
import { CURRICULUM_TOTAL_LESSONS } from "@/lib/resources/curriculum";

type Props = {
  lesson: CurriculumLesson;
};

/**
 * School-style placement in the program — never ambiguous which lesson this is.
 */
export function CurriculumLessonHeader({ lesson }: Props) {
  return (
    <div className="rounded-2xl border border-zinc-200/90 bg-muted-bg/50 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-950/50 sm:px-6">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent dark:text-accent-muted">
        Program: StreamerU
      </p>
      <p className="mt-2 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
        Lesson {lesson.globalOrder} of {CURRICULUM_TOTAL_LESSONS}
        <span className="font-normal text-zinc-500 dark:text-zinc-400">
          {" "}
          · {lesson.programName} — Lesson {lesson.lessonInProgram} of {lesson.lessonsInProgram}
        </span>
      </p>
    </div>
  );
}
