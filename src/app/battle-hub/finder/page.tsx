import type { Metadata } from "next";
import Link from "next/link";

import { BattleFinderRequestCard } from "@/components/battle-finder/BattleFinderRequestCard";
import { Container } from "@/components/ui/Container";
import { listOpenBattleRequests } from "@/lib/battle-finder/queries";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Battle Finder",
  description: `Find opponents and fill battle slots on ${site.name} before you schedule.`,
};

export default async function BattleFinderPage() {
  let rows: Awaited<ReturnType<typeof listOpenBattleRequests>> = [];
  try {
    rows = await listOpenBattleRequests(40);
  } catch {
    rows = [];
  }

  return (
    <div className="relative pb-24 pt-14 sm:pt-20">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[min(480px,70vh)] bg-[radial-gradient(ellipse_80%_55%_at_50%_-10%,rgba(91, 59, 255,0.12),transparent_65%)]"
        aria-hidden
      />
      <Container className="relative max-w-4xl">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent dark:text-accent-muted">
          Network
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-5xl">
          Battle Finder
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          Post what you need — an opponent, teammates, or an open match — and let other members claim slots before
          you head to the scheduler. Nothing hits the calendar until you&apos;re ready.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/battle-hub/finder/new"
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-zinc-950 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/10 transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
          >
            Post a request
          </Link>
          <Link
            href="/battle-hub/scheduler/new"
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-zinc-200 px-6 py-3 text-sm font-semibold text-zinc-900 dark:border-zinc-700 dark:text-zinc-100"
          >
            Skip to scheduler
          </Link>
          <Link
            href="/battle-hub"
            className="inline-flex min-h-[48px] items-center justify-center px-4 py-3 text-sm font-semibold text-zinc-500 hover:text-accent dark:text-zinc-400 dark:hover:text-accent-muted"
          >
            ← Battle Hub
          </Link>
        </div>

        <section className="mt-16 border-t border-zinc-200/80 pt-12 dark:border-zinc-800/80">
          <h2 className="text-xl font-semibold text-zinc-950 dark:text-zinc-50">Open requests</h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Soonest activity first. Join a slot to show you&apos;re in — then schedule together.
          </p>

          {rows.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-dashed border-zinc-300/90 bg-zinc-50/40 p-10 text-center dark:border-zinc-700 dark:bg-zinc-900/30">
              <p className="text-base font-semibold text-zinc-950 dark:text-zinc-50">No open requests yet</p>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                Be the first to post what you&apos;re looking for — the network only gets more useful when creators
                show up here.
              </p>
              <Link
                href="/battle-hub/finder/new"
                className="mt-6 inline-flex min-h-[48px] items-center justify-center rounded-xl bg-zinc-950 px-6 py-3 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950"
              >
                Create a request
              </Link>
            </div>
          ) : (
            <ul className="mt-8 space-y-5">
              {rows.map((req) => (
                <li key={req.id}>
                  <BattleFinderRequestCard req={req} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </Container>
    </div>
  );
}
