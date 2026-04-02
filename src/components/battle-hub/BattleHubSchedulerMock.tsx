import Link from "next/link";

/**
 * Static mock of the scheduler hub for visitors — no data, no server actions.
 */
export function BattleHubSchedulerMock() {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent dark:text-accent-muted">
        Battle Hub
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-4xl">
        Scheduler
      </h1>
      <p className="mt-3 text-zinc-600 dark:text-zinc-400">
        Create battles with flexible formats, then publish to the shared calendar.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <span
          className="inline-flex min-h-[48px] cursor-not-allowed items-center justify-center rounded-xl border border-dashed border-zinc-300 bg-zinc-100/80 px-5 py-2.5 text-sm font-semibold text-zinc-500 dark:border-zinc-600 dark:bg-zinc-900/50 dark:text-zinc-500"
          title="Members only"
        >
          New battle / event
        </span>
        <Link
          href="/battle-hub/calendar"
          className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-zinc-200 px-5 py-2.5 text-sm font-semibold dark:border-zinc-700"
        >
          View calendar
        </Link>
        <Link href="/battle-hub" className="inline-flex items-center px-2 py-2 text-sm font-semibold text-zinc-500">
          ← Battle Hub
        </Link>
      </div>

      <div className="relative mt-12 border-t border-zinc-200/80 pt-10 dark:border-zinc-800/80">
        <p className="absolute -top-2.5 left-0 rounded bg-zinc-200/90 px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
          Sample
        </p>
        <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-500">Your events</h2>
        <ul className="mt-4 space-y-3">
          <li className="rounded-xl border border-zinc-200/90 bg-surface px-4 py-3 opacity-90 dark:border-zinc-800 dark:bg-zinc-950/40">
            <p className="font-semibold text-zinc-900 dark:text-zinc-100">Friday Night Throwdown</p>
            <p className="mt-1 text-sm text-zinc-500">2v2 · Sat, Apr 12 · 8:00 PM</p>
          </li>
          <li className="rounded-xl border border-zinc-200/90 bg-surface px-4 py-3 opacity-90 dark:border-zinc-800 dark:bg-zinc-950/40">
            <p className="font-semibold text-zinc-900 dark:text-zinc-100">Creator clash (sample)</p>
            <p className="mt-1 text-sm text-zinc-500">1v1 · Wed, Apr 9 · 6:30 PM</p>
          </li>
        </ul>
        <p className="mt-4 text-xs text-zinc-500">
          Placeholder rows only — your real events appear here after you sign in and schedule.
        </p>
      </div>
    </div>
  );
}
