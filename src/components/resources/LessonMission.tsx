import Link from "next/link";
import type { TrainingMission } from "@/lib/resources/training-missions";
import { LessonMissionComplete } from "@/components/resources/LessonMissionComplete";

type Props = {
  lessonSlug: string;
  mission: TrainingMission;
  /** Next lesson in `curriculum.ts` order — strong CTA after execution. */
  nextLesson: { slug: string; title: string; globalOrder: number } | null;
};

/**
 * Action block: real-world tasks for a lesson — not passive reading.
 */
export function LessonMission({ lessonSlug, mission, nextLesson }: Props) {
  return (
    <section
      className="rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/[0.08] via-surface to-surface p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6)] dark:from-accent/[0.06] dark:via-zinc-950 dark:to-zinc-950 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] sm:p-8"
      aria-labelledby="lesson-mission-heading"
    >
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent dark:text-accent-muted">
        Execution
      </p>
      <h2
        id="lesson-mission-heading"
        className="mt-2 text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50"
      >
        Your mission
      </h2>
      <p className="mt-3 text-sm font-medium leading-relaxed text-zinc-600 dark:text-zinc-400">
        This class session isn’t finished until you execute. Learning + execution are one unit — complete both before the
        next lesson.
      </p>
      <p className="mt-3 text-base font-medium leading-relaxed text-zinc-800 dark:text-zinc-200">
        {mission.mission_title}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {mission.mission_description}
      </p>

      <ul className="mt-6 list-none space-y-3 border-t border-zinc-200/80 pt-6 dark:border-zinc-800/80">
        {mission.mission_steps.map((step, i) => (
          <li key={i} className="flex gap-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            <span
              className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-zinc-300 bg-surface text-xs font-bold text-zinc-600 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-300"
              aria-hidden
            >
              {i + 1}
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8 rounded-xl border border-zinc-200/90 bg-muted-bg/50 px-4 py-4 dark:border-zinc-800 dark:bg-zinc-950/50">
        <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Goal</p>
        <p className="mt-2 text-sm font-medium leading-relaxed text-zinc-800 dark:text-zinc-200">
          {mission.mission_goal}
        </p>
      </div>

      {mission.links && mission.links.length > 0 ? (
        <nav className="mt-6 flex flex-wrap gap-3" aria-label="Mission links">
          {mission.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex min-h-[40px] items-center rounded-xl border border-zinc-200/90 bg-surface px-4 py-2 text-sm font-semibold text-zinc-800 transition-colors hover:border-accent/40 hover:text-accent dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-accent/35 dark:hover:text-accent-muted"
            >
              {link.label} →
            </Link>
          ))}
        </nav>
      ) : null}

      <div className="mt-8 border-t border-zinc-200/80 pt-6 dark:border-zinc-800/80">
        <LessonMissionComplete lessonSlug={lessonSlug} missionId={mission.id} nextLesson={nextLesson} />
      </div>
    </section>
  );
}
