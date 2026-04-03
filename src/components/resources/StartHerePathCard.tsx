import Link from "next/link";
import type { StartHereResolvedItem } from "@/lib/resources/start-here";

export function StartHerePathCard({ item }: { item: StartHereResolvedItem }) {
  if (item.exists) {
    return (
      <div className="group relative overflow-hidden rounded-2xl border border-zinc-200/90 bg-gradient-to-br from-surface to-muted-bg/50 p-6 shadow-sm transition-[transform,box-shadow] hover:-translate-y-0.5 hover:border-accent/35 hover:shadow-[0_20px_48px_-28px_rgba(99,102,241,0.35)] dark:border-zinc-800 dark:from-zinc-950/80 dark:to-zinc-950/40 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-950 text-sm font-bold text-white dark:bg-white dark:text-zinc-950">
            {item.stepLabel}
          </span>
          <span className="rounded-full border border-emerald-200/80 bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-900 dark:border-emerald-900/40 dark:bg-emerald-950/40 dark:text-emerald-200">
            Lesson
          </span>
        </div>
        <h3 className="mt-4 text-xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">{item.cardTitle}</h3>
        <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{item.cardDescription}</p>
        <Link
          href={item.href}
          className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-xl bg-zinc-950 px-5 py-2.5 text-sm font-semibold text-white transition-[transform,box-shadow] hover:-translate-y-0.5 dark:bg-white dark:text-zinc-950"
        >
          Open lesson
        </Link>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-dashed border-zinc-300/90 bg-muted-bg/40 p-6 dark:border-zinc-600/50 dark:bg-zinc-950/30 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-300 bg-surface text-sm font-bold text-zinc-700 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-200">
          {item.stepLabel}
        </span>
        <span className="rounded-full border border-amber-200/90 bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200">
          Coming soon
        </span>
      </div>
      <h3 className="mt-4 text-xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">{item.cardTitle}</h3>
      <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{item.cardDescription}</p>
      <p className="mt-4 text-xs leading-relaxed text-zinc-500 dark:text-zinc-500">
        This lesson isn&apos;t published yet. Continue with the next published lesson in the program list on the hub.
      </p>
      <Link
        href={item.browseHref}
        className="mt-5 inline-flex min-h-[44px] items-center justify-center rounded-xl border border-zinc-200 bg-surface px-5 py-2.5 text-sm font-semibold text-zinc-900 shadow-sm transition-colors hover:border-accent/35 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
      >
        StreamerU hub
      </Link>
    </div>
  );
}
