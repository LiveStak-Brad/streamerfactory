import Link from "next/link";
import { BattleHubPreviewBanner } from "@/components/battle-hub/BattleHubPreviewBanner";
import { BattleHubSchedulerMock } from "@/components/battle-hub/BattleHubSchedulerMock";
import { Container } from "@/components/ui/Container";
import { effectiveCanUseBattleHubScheduling } from "@/lib/auth/network-view";
import { getSessionProfile } from "@/lib/auth/server";
import { getMyBattleEvents } from "@/lib/battle-hub/queries";

export const dynamic = "force-dynamic";

export default async function BattleSchedulerPage() {
  const session = await getSessionProfile();
  if (!session || !(await effectiveCanUseBattleHubScheduling(session))) {
    return (
      <section className="py-14 sm:py-20">
        <Container className="max-w-3xl">
          <BattleHubPreviewBanner loginNext="/battle-hub/scheduler" />
          <BattleHubSchedulerMock />
        </Container>
      </section>
    );
  }

  let mine: Awaited<ReturnType<typeof getMyBattleEvents>> = [];
  try {
    mine = await getMyBattleEvents(session.user.id);
  } catch {
    mine = [];
  }

  return (
    <section className="py-14 sm:py-20">
      <Container className="max-w-3xl">
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
          <Link
            href="/battle-hub/scheduler/new"
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-zinc-950 px-5 py-2.5 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950"
          >
            New battle / event
          </Link>
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

        <div className="mt-12 border-t border-zinc-200/80 pt-10 dark:border-zinc-800/80">
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-500">Your events</h2>
          {mine.length === 0 ? (
            <p className="mt-4 text-zinc-600 dark:text-zinc-400">No events yet—create one to get started.</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {mine.map((ev) => (
                <li
                  key={ev.id}
                  className="rounded-xl border border-zinc-200/90 bg-surface px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950/40"
                >
                  <p className="font-semibold text-zinc-900 dark:text-zinc-100">{ev.title}</p>
                  <p className="mt-1 text-sm text-zinc-500">
                    {ev.format_label} · {new Date(ev.scheduled_at).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </section>
  );
}
