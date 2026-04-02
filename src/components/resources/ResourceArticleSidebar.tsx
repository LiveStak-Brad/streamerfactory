import Link from "next/link";

/**
 * Sticky desktop rail: keeps Apply / About / Resources one glance away while reading.
 */
export function ResourceArticleSidebar() {
  return (
    <div className="lg:sticky lg:top-28">
      <div className="rounded-2xl border border-zinc-200/90 bg-surface/90 p-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.65)] backdrop-blur-sm dark:border-zinc-800/90 dark:bg-zinc-950/50 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
          Next steps
        </p>
        <ul className="mt-4 space-y-2">
          <li>
            <Link
              href="/apply"
              className="flex items-center justify-between rounded-xl border border-accent/30 bg-accent/10 px-3 py-2.5 text-sm font-semibold text-accent transition-colors hover:border-accent/50 hover:bg-accent/15 dark:text-accent-muted"
            >
              Apply to join
              <span aria-hidden className="text-accent/80">
                →
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/resources/start-here"
              className="block rounded-xl px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-800/80 dark:hover:text-white"
            >
              Start Here path
            </Link>
          </li>
          <li>
            <Link
              href="/battle-hub"
              className="block rounded-xl px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-800/80 dark:hover:text-white"
            >
              Battle Hub
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="block rounded-xl px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-800/80 dark:hover:text-white"
            >
              How we work
            </Link>
          </li>
          <li>
            <Link
              href="/resources"
              className="block rounded-xl px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-800/80 dark:hover:text-white"
            >
              All resources
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="block rounded-xl px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-800/80 dark:hover:text-white"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
