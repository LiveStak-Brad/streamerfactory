import Link from "next/link";
import type { CurriculumNeighbor } from "@/lib/resources/curriculum";

type Props = {
  prev: CurriculumNeighbor | null;
  next: CurriculumNeighbor | null;
};

/**
 * Prev / next lesson — curriculum order only.
 */
export function LessonNavigation({ prev, next }: Props) {
  if (!prev && !next) return null;

  return (
    <nav
      className="flex flex-col gap-4 border-t border-zinc-200/80 pt-10 dark:border-zinc-800/80 sm:flex-row sm:items-stretch sm:justify-between"
      aria-label="Lesson progression"
    >
      {prev ? (
        <Link
          href={`/streameru/${prev.slug}`}
          className="group flex max-w-md flex-1 flex-col rounded-2xl border border-zinc-200/90 bg-surface/80 px-5 py-5 transition-[transform,border-color,box-shadow] hover:-translate-y-0.5 hover:border-accent/35 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-950/40"
        >
          <span className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
            Previous lesson
          </span>
          <span className="mt-2 font-semibold text-zinc-900 group-hover:text-accent dark:text-zinc-100 dark:group-hover:text-accent-muted">
            ← {prev.title}
          </span>
          <span className="mt-1 text-xs text-zinc-500 dark:text-zinc-500">{prev.programName}</span>
        </Link>
      ) : (
        <div className="hidden flex-1 sm:block" aria-hidden />
      )}
      {next ? (
        <Link
          href={`/streameru/${next.slug}`}
          className="group flex max-w-md flex-1 flex-col rounded-2xl border-2 border-accent/45 bg-gradient-to-br from-accent/[0.12] via-accent/[0.06] to-transparent px-5 py-5 text-right shadow-sm transition-[transform,box-shadow,border-color] hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-md dark:from-accent/[0.14] sm:ml-auto"
        >
          <span className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-accent dark:text-accent-muted">
            Next lesson
          </span>
          <span className="mt-2 text-base font-bold text-zinc-950 group-hover:underline dark:text-zinc-50">
            {next.title} →
          </span>
          <span className="mt-1 text-xs text-zinc-500 dark:text-zinc-500">{next.programName}</span>
        </Link>
      ) : (
        <div className="hidden flex-1 sm:block" aria-hidden />
      )}
    </nav>
  );
}
