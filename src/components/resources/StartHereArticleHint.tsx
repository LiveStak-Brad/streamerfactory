import Link from "next/link";

/** Subtle promo on lessons that are part of the Start your training path. */
export function StartHereArticleHint() {
  return (
    <div className="rounded-xl border border-accent/20 bg-accent/[0.06] px-4 py-3 dark:border-accent/30 dark:bg-accent/[0.08]">
      <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <span className="font-semibold text-zinc-900 dark:text-zinc-100">Lessons 1–4 of the StreamerU program</span>
        {" — "}
        The &quot;Start your training&quot; page walks these first four lessons in curriculum order — same sequence as
        the main program, not a separate track.
      </p>
      <Link
        href="/streameru/start-here"
        className="mt-2 inline-flex text-sm font-semibold text-accent hover:underline dark:text-accent-muted"
      >
        Open Start training →
      </Link>
    </div>
  );
}
