import Link from "next/link";
import type { TrainingMission } from "@/lib/resources/training-missions";
import { LessonMissionComplete } from "@/components/resources/LessonMissionComplete";
import { extractLiveMinutesFromMission, formatMinutesLabel } from "@/lib/resources/mission-minutes";

type Props = {
  lessonSlug: string;
  mission: TrainingMission;
  /** Next lesson in `curriculum.ts` order — strong CTA after execution. */
  nextLesson: { slug: string; title: string; globalOrder: number } | null;
};

/**
 * Live Exam block — real-world LIVE execution is the grade for each lesson.
 */
export function LessonMission({ lessonSlug, mission, nextLesson }: Props) {
  const liveMinutes = extractLiveMinutesFromMission(mission);

  return (
    <section
      className="relative overflow-hidden rounded-2xl border border-accent/35 bg-gradient-to-br from-accent/[0.1] via-surface to-surface p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.55)] dark:from-accent/[0.08] dark:via-zinc-950 dark:to-zinc-950 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] sm:p-8"
      aria-labelledby="lesson-mission-heading"
    >
      <div
        className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-accent/15 blur-3xl dark:bg-accent/10"
        aria-hidden
      />

      <div className="relative flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent dark:text-accent-muted">
            Assessment
          </p>
          <h2
            id="lesson-mission-heading"
            className="mt-2 text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-[1.75rem]"
          >
            Live Exam
          </h2>
        </div>
        {liveMinutes != null ? (
          <span className="inline-flex items-center rounded-full border border-accent/35 bg-accent/12 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-accent dark:border-accent/40 dark:bg-accent/15 dark:text-accent-muted">
            {formatMinutesLabel(liveMinutes)} LIVE required
          </span>
        ) : (
          <span className="inline-flex items-center rounded-full border border-accent/35 bg-accent/12 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-accent dark:border-accent/40 dark:bg-accent/15 dark:text-accent-muted">
            LIVE required
          </span>
        )}
      </div>

      <p className="relative mt-3 text-sm font-medium leading-relaxed text-zinc-600 dark:text-zinc-400">
        This class isn&apos;t finished until you execute on TikTok LIVE. Study + Live Exam are one unit —
        complete both before moving on.
      </p>
      <p className="relative mt-4 text-base font-semibold leading-relaxed text-zinc-900 dark:text-zinc-100">
        {mission.mission_title}
      </p>
      <p className="relative mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {mission.mission_description}
      </p>

      <ol className="relative mt-7 list-none space-y-3 border-t border-zinc-200/80 pt-6 dark:border-zinc-800/80">
        {mission.mission_steps.map((step, i) => (
          <li
            key={i}
            className="flex gap-3 rounded-xl border border-zinc-200/60 bg-surface/70 px-3 py-3 text-sm leading-relaxed text-zinc-700 dark:border-zinc-800/80 dark:bg-zinc-950/50 dark:text-zinc-300"
          >
            <span
              className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-zinc-950 text-xs font-bold text-white dark:bg-white dark:text-zinc-950"
              aria-hidden
            >
              {i + 1}
            </span>
            <span className="min-w-0 pt-0.5">{step}</span>
          </li>
        ))}
      </ol>

      <div className="relative mt-8 rounded-xl border border-emerald-500/25 bg-emerald-500/[0.07] px-4 py-4 dark:border-emerald-500/20 dark:bg-emerald-500/[0.08]">
        <p className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
          Pass criteria
        </p>
        <p className="mt-2 text-sm font-medium leading-relaxed text-zinc-800 dark:text-zinc-200">
          {mission.mission_goal}
        </p>
      </div>

      {mission.links && mission.links.length > 0 ? (
        <nav className="relative mt-6 flex flex-wrap gap-3" aria-label="Exam resources">
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

      <div className="relative mt-8 border-t border-zinc-200/80 pt-6 dark:border-zinc-800/80">
        <LessonMissionComplete
          lessonSlug={lessonSlug}
          missionId={mission.id}
          nextLesson={nextLesson}
        />
      </div>
    </section>
  );
}
