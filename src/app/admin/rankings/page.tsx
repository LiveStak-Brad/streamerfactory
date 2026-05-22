import { Suspense } from "react";
import { AdminRankingsForm } from "@/components/rankings/AdminRankingsForm";
import { Container } from "@/components/ui/Container";
import { periodBounds, toDateString } from "@/lib/rankings/periods";
import { getPerformanceStatsForPeriod } from "@/lib/rankings/queries";
import { RANKING_PERIODS, type RankingPeriod } from "@/lib/rankings/types";
import { getNetworkMemberProfiles } from "@/lib/profiles/queries";

export const metadata = {
  title: "Creator rankings",
  description: "Enter TikTok Creator Network performance stats and recalculate member rankings.",
};

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function parsePeriod(raw: string | undefined): RankingPeriod {
  if (raw && RANKING_PERIODS.includes(raw as RankingPeriod)) return raw as RankingPeriod;
  return "weekly";
}

export default async function AdminRankingsPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const periodKind = parsePeriod(typeof sp.period === "string" ? sp.period : undefined);
  const anchorRaw = typeof sp.anchor === "string" ? sp.anchor : toDateString(new Date());
  const anchor = anchorRaw || toDateString(new Date());
  const { periodStart, periodEnd } = periodBounds(periodKind, new Date(`${anchor}T12:00:00Z`));

  let members: Awaited<ReturnType<typeof getNetworkMemberProfiles>> = [];
  let existingStats: Awaited<ReturnType<typeof getPerformanceStatsForPeriod>> = [];

  try {
    members = await getNetworkMemberProfiles();
  } catch {
    members = [];
  }

  try {
    if (periodKind !== "all-time") {
      existingStats = await getPerformanceStatsForPeriod(periodStart, periodEnd);
    } else {
      existingStats = [];
    }
  } catch {
    existingStats = [];
  }

  return (
    <section className="py-12 sm:py-16">
      <Container className="max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-wider text-accent dark:text-accent-muted">Admin</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
          Creator rankings
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Paste stats from TikTok Creator Network backstage. Saving recalculates the member leaderboard.
        </p>
        <div className="mt-4 rounded-xl border border-zinc-200/80 bg-muted-bg/50 px-4 py-3 text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
          <p className="font-semibold text-zinc-800 dark:text-zinc-200">Backstage → form fields</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>
              <strong>Coins earned</strong> — Diamond / net diamond income ($); enter as whole number (e.g. $8.14 →
              814 or your coin count).
            </li>
            <li>
              <strong>Days streamed</strong> — Valid live days (e.g. <code>14d / 17d</code> → use the first number).
            </li>
            <li>
              <strong>Hours streamed</strong> — Live duration (e.g. <code>57h1m</code> → 57.02 hours).
            </li>
            <li>
              <strong>Activeness</strong> — Map TikTok level badge: No level = none, L1 = low, L2 = medium, L3 = high,
              L4+ = elite.
            </li>
            <li>
              <strong>Follower growth</strong> — Last column day count or follower delta when shown.
            </li>
            <li>
              <strong>Battles</strong> — Enter manually if not in this Creator performance tab.
            </li>
          </ul>
        </div>

        <div className="mt-10">
          <Suspense fallback={<p className="text-sm text-zinc-500">Loading form…</p>}>
            <AdminRankingsForm
              members={members}
              existingStats={existingStats}
              periodKind={periodKind}
              periodAnchor={anchor}
            />
          </Suspense>
        </div>
      </Container>
    </section>
  );
}
