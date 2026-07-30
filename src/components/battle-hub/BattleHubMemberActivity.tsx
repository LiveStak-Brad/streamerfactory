import Link from "next/link";

import { BattleCard } from "@/components/ui/BattleCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import {
  battleTitleOrFallback,
  formatBattleScheduleTime,
} from "@/lib/battle-hub/display";
import type { BattleEventWithParticipants } from "@/lib/battle-hub/types";

export type BattleHubMemberActivityProps = {
  userId: string;
  nextNetworkEvent: BattleEventWithParticipants | null;
  /** Additional upcoming events after `nextNetworkEvent` (same sort: soonest first). */
  upcomingNetwork: BattleEventWithParticipants[];
  myNextBattle: BattleEventWithParticipants | null;
  createdBattleCount: number;
};

function MemberContextStrip({
  userId,
  nextNetworkEvent,
  myNextBattle,
  createdBattleCount,
}: Pick<
  BattleHubMemberActivityProps,
  "userId" | "nextNetworkEvent" | "myNextBattle" | "createdBattleCount"
>) {
  const hostingNext =
    nextNetworkEvent && nextNetworkEvent.created_by === userId ? nextNetworkEvent : null;

  return (
    <section
      aria-label="Your battle context"
      className="rounded-2xl border border-zinc-200/90 bg-white/80 p-5 shadow-sm backdrop-blur-sm dark:border-zinc-800/90 dark:bg-zinc-950/40"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1 space-y-2">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
            For you
          </p>
          {createdBattleCount === 0 ? (
            <>
              <p className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                Welcome — schedule your first battle
              </p>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                When you add a battle, it can appear on the shared network calendar so other creators know
                what&apos;s coming.
              </p>
            </>
          ) : hostingNext ? (
            <>
              <p className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                You&apos;re hosting the next network battle
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {battleTitleOrFallback(hostingNext.title)} ·{" "}
                {formatBattleScheduleTime(hostingNext.scheduled_at, hostingNext.timezone)}
              </p>
            </>
          ) : myNextBattle ? (
            <>
              <p className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">Your next scheduled battle</p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {battleTitleOrFallback(myNextBattle.title)} ·{" "}
                {formatBattleScheduleTime(myNextBattle.scheduled_at, myNextBattle.timezone)}
              </p>
            </>
          ) : (
            <>
              <p className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                No upcoming battles you&apos;re hosting
              </p>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                You&apos;ve created {createdBattleCount} {createdBattleCount === 1 ? "battle" : "battles"}{" "}
                before. When you&apos;re ready, schedule another to stay visible on the calendar.
              </p>
            </>
          )}
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:items-end">
          <Link
            href="/battle-hub/scheduler"
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-zinc-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
          >
            Schedule a battle
          </Link>
          {createdBattleCount > 0 ? (
            <p className="text-center text-xs text-zinc-500 sm:text-right dark:text-zinc-400">
              {createdBattleCount} created total
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function NextUpSection({
  userId,
  nextNetworkEvent,
}: {
  userId: string;
  nextNetworkEvent: BattleEventWithParticipants | null;
}) {
  return (
    <section aria-labelledby="battle-hub-next-up" className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 id="battle-hub-next-up" className="text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            Next up
          </h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          The soonest battle on the shared network calendar.
        </p>
        <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
          Need someone to battle first?{" "}
          <Link
            href="/battle-hub/finder"
            className="font-semibold text-accent hover:underline dark:text-accent-muted"
          >
            Battle Finder
          </Link>
        </p>
      </div>
    </div>

      {nextNetworkEvent ? (
        <div className="space-y-4">
          <BattleCard
            featured
            event={nextNetworkEvent}
            isHosting={nextNetworkEvent.created_by === userId}
          />
          <div className="flex flex-wrap gap-2">
            <Button href="/battle-hub/calendar" variant="secondary" className="min-h-[44px] px-4">
              View calendar
            </Button>
            <Button href="/battle-hub/scheduler" variant="primary" className="min-h-[44px] px-4">
              Create another battle
            </Button>
          </div>
        </div>
      ) : (
        <EmptyState
          className="items-center text-center py-10"
          title="No battles on the calendar yet"
          description="The network calendar fills up as members schedule battles. Add yours to kick things off — everyone with access will see it in one place."
          illustration="battles"
          action={
            <div className="flex flex-wrap justify-center gap-2">
              <Button href="/battle-hub/scheduler" variant="primary" className="min-h-[48px] px-6">
                Schedule a battle
              </Button>
              <Button href="/battle-hub/calendar" variant="secondary" className="min-h-[48px] px-6">
                Open calendar
              </Button>
            </div>
          }
        />
      )}
    </section>
  );
}

function UpcomingListSection({
  events,
  hasNextScheduled,
}: {
  events: BattleEventWithParticipants[];
  /** True when at least one upcoming event exists (shown in Next up or this list). */
  hasNextScheduled: boolean;
}) {
  const empty = events.length === 0;

  return (
    <section aria-labelledby="battle-hub-upcoming" className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 id="battle-hub-upcoming" className="text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            Upcoming battles
          </h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            What&apos;s coming next on the network calendar.
          </p>
        </div>
        <Link
          href="/battle-hub/calendar"
          className="text-sm font-semibold text-accent transition hover:underline dark:text-accent-muted"
        >
          See all on calendar
        </Link>
      </div>

      {empty && !hasNextScheduled ? (
        <EmptyState
          title="No battles scheduled yet"
          description="Create your first battle to see it here and on the shared calendar."
          illustration="battles"
          action={
            <div className="flex flex-wrap gap-2">
              <Button href="/battle-hub/scheduler" variant="primary" className="min-h-[44px] px-4">
                Schedule a battle
              </Button>
              <Button href="/battle-hub/calendar" variant="secondary" className="min-h-[44px] px-4">
                Review calendar
              </Button>
            </div>
          }
        />
      ) : empty ? (
        <EmptyState
          title="Nothing else queued yet"
          description="When more battles are scheduled, they will show here in order."
          action={
            <Button href="/battle-hub/calendar" variant="secondary" className="min-h-[44px] px-4">
              Open network calendar
            </Button>
          }
        />
      ) : (
        <ul className="space-y-3">
          {events.map((ev) => (
            <li key={ev.id}>
              <BattleCard event={ev} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function QuickActionsSection() {
  const actions = [
    {
      href: "/battle-hub/scheduler",
      title: "Schedule a battle",
      description: "Set format, participants, time, and flyer.",
      primary: true as const,
    },
    {
      href: "/battle-hub/finder",
      title: "Battle Finder",
      description: "Find opponents, teammates, or open slots.",
      primary: false as const,
    },
    {
      href: "/battle-hub/calendar",
      title: "Battle calendar",
      description: "See everything the network has scheduled.",
      primary: false as const,
    },
    {
      href: "/streameru/start-here",
      title: "Start your training",
      description: "Foundations → first battles — train before you coordinate.",
      primary: false as const,
    },
    {
      href: "/streameru",
      title: "StreamerU",
      description: "Full training course — follow lessons in order.",
      primary: false as const,
    },
  ];

  return (
    <section aria-labelledby="battle-hub-quick-actions" className="space-y-4">
      <div>
        <h2 id="battle-hub-quick-actions" className="text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          Quick actions
        </h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Keep your workflow moving.</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {actions.map((a) => (
          <Link
            key={a.href}
            href={a.href}
            className={`group flex min-h-[100px] flex-col justify-between rounded-xl border p-4 transition duration-200 ${
              a.primary
                ? "border-zinc-900 bg-zinc-950 text-white hover:bg-zinc-900 dark:border-zinc-100 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100"
                : "border-zinc-200/90 bg-white/70 hover:border-zinc-300 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-950/40 dark:hover:border-zinc-600"
            }`}
          >
            <span
              className={`text-sm font-semibold ${a.primary ? "" : "text-zinc-950 dark:text-zinc-50"}`}
            >
              {a.title}
              <span className="ml-1 inline-block transition group-hover:translate-x-0.5">→</span>
            </span>
            <span
              className={`mt-2 text-xs leading-relaxed ${
                a.primary ? "text-zinc-300 dark:text-zinc-600" : "text-zinc-600 dark:text-zinc-400"
              }`}
            >
              {a.description}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function BattleHubMemberActivity({
  userId,
  nextNetworkEvent,
  upcomingNetwork,
  myNextBattle,
  createdBattleCount,
}: BattleHubMemberActivityProps) {
  return (
    <div className="mt-12 space-y-12">
      <MemberContextStrip
        userId={userId}
        nextNetworkEvent={nextNetworkEvent}
        myNextBattle={myNextBattle}
        createdBattleCount={createdBattleCount}
      />

      <NextUpSection userId={userId} nextNetworkEvent={nextNetworkEvent} />

      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <UpcomingListSection
            events={upcomingNetwork}
            hasNextScheduled={nextNetworkEvent !== null}
          />
        </div>
        <div className="lg:col-span-5">
          <QuickActionsSection />
        </div>
      </div>
    </div>
  );
}
