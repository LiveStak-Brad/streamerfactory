import Link from "next/link";
import { CURRICULUM_TOTAL_LESSONS, FIRST_PROGRAM_LESSON_SLUG } from "@/lib/resources/curriculum";

type Props = {
  lesson1Title: string;
};

/**
 * Dominant hub entry: one primary path — follow the full StreamerU program.
 */
export function StreamerUProgramHero({ lesson1Title }: Props) {
  return (
    <section
      className="relative mt-10 overflow-hidden rounded-3xl border border-accent/25 bg-gradient-to-br from-accent/[0.12] via-surface to-muted-bg/40 p-6 shadow-[0_1px_0_0_rgba(255,255,255,0.45)_inset] dark:from-accent/[0.07] dark:via-zinc-950 dark:to-zinc-950/90 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] sm:p-10"
      aria-labelledby="streameru-program-hero-heading"
    >
      <div className="pointer-events-none absolute -right-16 -top-24 h-56 w-56 rounded-full bg-accent/20 blur-3xl dark:bg-accent/10" aria-hidden />
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent dark:text-accent-muted">
        Follow the program
      </p>
      <h2
        id="streameru-program-hero-heading"
        className="mt-3 text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-3xl"
      >
        Start the StreamerU program
      </h2>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
        One ordered training path — {CURRICULUM_TOTAL_LESSONS} lessons from foundations to advanced LIVE work. Your next
        step is always the next lesson in sequence.
      </p>

      <div className="mt-8 rounded-2xl border border-zinc-200/80 bg-surface/90 px-5 py-4 dark:border-zinc-700/80 dark:bg-zinc-900/50">
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Lesson 1 · Program start
        </p>
        <p className="mt-2 text-lg font-semibold text-zinc-950 dark:text-zinc-50">{lesson1Title}</p>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Progress tracking syncs here in a future update — for now, follow lesson order in the list below.
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <Link
          href="/streameru/start-here"
          className="inline-flex min-h-[48px] flex-1 items-center justify-center rounded-xl bg-zinc-950 px-6 py-3 text-center text-sm font-semibold text-white shadow-lg transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-xl sm:max-w-xs dark:bg-white dark:text-zinc-950"
        >
          Start training
        </Link>
        <Link
          href={`/streameru/${FIRST_PROGRAM_LESSON_SLUG}`}
          className="inline-flex min-h-[48px] flex-1 items-center justify-center rounded-xl border border-zinc-200/90 bg-surface px-6 py-3 text-center text-sm font-semibold text-zinc-900 shadow-sm transition-colors hover:border-accent/40 hover:text-accent dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-accent/35 dark:hover:text-accent-muted sm:max-w-xs"
        >
          Open lesson 1
        </Link>
      </div>
    </section>
  );
}
