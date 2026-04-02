import Link from "next/link";
import { BattleNetworkCalendar } from "@/components/battle-hub/BattleNetworkCalendar";
import { BattleHubPreviewBanner } from "@/components/battle-hub/BattleHubPreviewBanner";
import { Container } from "@/components/ui/Container";
import { effectiveCanUseBattleHubScheduling } from "@/lib/auth/network-view";
import { getSessionProfile } from "@/lib/auth/server";
import { generatePreviewBattleEvents } from "@/lib/battle-hub/preview-events";
import { getUpcomingBattleEvents } from "@/lib/battle-hub/queries";

export const dynamic = "force-dynamic";

export default async function BattleCalendarPage() {
  const session = await getSessionProfile();
  const canUse = session ? await effectiveCanUseBattleHubScheduling(session) : false;

  let events = await (async () => {
    if (!canUse) return generatePreviewBattleEvents();
    try {
      return await getUpcomingBattleEvents(80);
    } catch (err) {
      console.error("battle-hub calendar getUpcomingBattleEvents", err);
      return [];
    }
  })();

  if (!canUse) {
    return (
      <section className="relative pb-24 pt-14 sm:pt-20">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(99,102,241,0.12),transparent_60%)]"
          aria-hidden
        />
        <Container className="relative max-w-6xl">
          <BattleHubPreviewBanner loginNext="/battle-hub/calendar" />
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent dark:text-accent-muted">
                Battle Hub
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-4xl">
                Network calendar
              </h1>
              <p className="mt-3 text-zinc-600 dark:text-zinc-400">
                Upcoming battles across the network — nearest first. Sign in with a member account for the live
                feed and scheduling.
              </p>
            </div>
            <Link
              href="/battle-hub"
              className="text-sm font-semibold text-accent hover:underline dark:text-accent-muted"
            >
              ← Battle Hub
            </Link>
          </div>
          <BattleNetworkCalendar events={events} isPreview />
        </Container>
      </section>
    );
  }

  return (
    <section className="relative pb-24 pt-14 sm:pt-20">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(99,102,241,0.12),transparent_60%)]"
        aria-hidden
      />
      <Container className="relative max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent dark:text-accent-muted">
              Battle Hub
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-4xl">
              Network calendar
            </h1>
            <p className="mt-3 text-zinc-600 dark:text-zinc-400">
              Upcoming scheduled battles — nearest first. Use the list for detail or the month grid to browse by
              day.
            </p>
          </div>
          <Link
            href="/battle-hub"
            className="text-sm font-semibold text-accent hover:underline dark:text-accent-muted"
          >
            ← Battle Hub
          </Link>
        </div>

        <BattleNetworkCalendar events={events} />
      </Container>
    </section>
  );
}
