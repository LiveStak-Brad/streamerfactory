import { Suspense } from "react";
import { LeaderboardPeriodTabs } from "@/components/rankings/LeaderboardPeriodTabs";
import { LeaderboardTable } from "@/components/rankings/LeaderboardTable";
import { Container } from "@/components/ui/Container";
import { formatPeriodLabel, periodBounds, toDateString } from "@/lib/rankings/periods";
import { getLeaderboard } from "@/lib/rankings/queries";
import { RANKING_PERIODS, type RankingPeriod } from "@/lib/rankings/types";
import { getSessionProfile } from "@/lib/auth/server";

export const metadata = {
  title: "Leaderboard",
  description: "Streamer Factory network creator rankings by performance.",
};

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function parsePeriod(raw: string | undefined): RankingPeriod {
  if (raw && RANKING_PERIODS.includes(raw as RankingPeriod)) return raw as RankingPeriod;
  return "weekly";
}

export default async function MemberLeaderboardPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const periodKind = parsePeriod(typeof sp.period === "string" ? sp.period : undefined);
  const anchor = typeof sp.anchor === "string" ? sp.anchor : undefined;

  const session = await getSessionProfile();
  const userId = session?.user?.id ?? null;

  let entries: Awaited<ReturnType<typeof getLeaderboard>> = [];
  try {
    entries = await getLeaderboard(periodKind, anchor);
  } catch {
    entries = [];
  }

  const { periodStart, periodEnd } = periodBounds(
    periodKind,
    anchor ? new Date(`${anchor}T12:00:00Z`) : new Date(),
  );

  return (
    <div className="border-b border-zinc-200/80 bg-muted-bg/30 pb-16 pt-12 dark:border-zinc-800 dark:bg-zinc-950/40 sm:pt-16">
      <Container className="max-w-4xl">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent dark:text-accent-muted">
          Network
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">Leaderboard</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          Rankings from Creator Network performance — coins, stream time, activeness, and battles. Scores are
          normalized so one huge stat does not dominate.
        </p>
        <p className="mt-2 text-sm text-zinc-500">{formatPeriodLabel(periodKind, periodStart, periodEnd)}</p>

        <div className="mt-8">
          <Suspense fallback={null}>
            <LeaderboardPeriodTabs />
          </Suspense>
        </div>

        <div className="mt-10">
          <LeaderboardTable entries={entries} highlightProfileId={userId} />
        </div>
      </Container>
    </div>
  );
}
