import { Suspense } from "react";
import { AdminRankingsDbSetup } from "@/components/admin/AdminRankingsDbSetup";
import { AdminRankingsSnapshot } from "@/components/rankings/AdminRankingsSnapshot";
import { AdminRankingsForm } from "@/components/rankings/AdminRankingsForm";
import { createClient } from "@/lib/supabase/server";
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
  let tablesMissing = false;

  const supabase = await createClient();
  const { error: tableProbe } = await supabase.from("creator_performance_stats").select("id").limit(1);
  if (tableProbe?.code === "42P01" || tableProbe?.message?.includes("does not exist")) {
    tablesMissing = true;
  }

  try {
    members = await getNetworkMemberProfiles();
  } catch {
    members = [];
  }

  try {
    if (!tablesMissing && periodKind !== "all-time") {
      existingStats = await getPerformanceStatsForPeriod(periodStart, periodEnd);
    } else {
      existingStats = [];
    }
  } catch {
    existingStats = [];
    if (!tablesMissing) tablesMissing = true;
  }

  return (
    <section className="py-12 sm:py-16">
      <Container className="max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-wider text-accent dark:text-accent-muted">Admin</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
          Creator rankings
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Stats from your Creator Network screenshots are already loaded. The public leaderboard updates from that
          snapshot; use the form below only to override one member or sync into the database.
        </p>

        <AdminRankingsDbSetup tablesMissing={tablesMissing} />

        <div className="mt-8">
          <AdminRankingsSnapshot />
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
