import Link from "next/link";

/**
 * Compact footer links for lesson pages (replaces a second sidebar rail).
 */
export function LessonQuickLinks() {
  return (
    <div className="rounded-2xl border border-zinc-200/90 bg-muted-bg/40 px-4 py-4 dark:border-zinc-800 dark:bg-zinc-950/40">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">Next steps</p>
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium">
        <li>
          <Link href="/apply" className="text-accent hover:underline dark:text-accent-muted">
            Apply
          </Link>
        </li>
        <li>
          <Link href="/streameru/start-here" className="text-zinc-700 hover:text-accent dark:text-zinc-300 dark:hover:text-accent-muted">
            Start training
          </Link>
        </li>
        <li>
          <Link href="/battle-hub" className="text-zinc-700 hover:text-accent dark:text-zinc-300 dark:hover:text-accent-muted">
            Battle Hub
          </Link>
        </li>
        <li>
          <Link href="/about" className="text-zinc-700 hover:text-accent dark:text-zinc-300 dark:hover:text-accent-muted">
            How we work
          </Link>
        </li>
        <li>
          <Link href="/contact" className="text-zinc-700 hover:text-accent dark:text-zinc-300 dark:hover:text-accent-muted">
            Contact
          </Link>
        </li>
      </ul>
    </div>
  );
}
