import { Suspense } from "react";
import { AdminRankingsDbSetup } from "@/components/admin/AdminRankingsDbSetup";
import { AdminRankingsSnapshot } from "@/components/rankings/AdminRankingsSnapshot";
import { AdminRankingsForm } from "@/components/rankings/AdminRankingsForm";
import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";
import { AdminPanel } from "@/components/admin/ui/AdminPanel";
import { AdminSkeleton } from "@/components/admin/ui/AdminSkeleton";
import { createClient } from "@/lib/supabase/server";
import { Container } from "@/components/ui/Container";
import { StatCard } from "@/components/ui/StatCard";
import { periodBounds, toDateString } from "@/lib/rankings/periods";
import { getPerformanceStatsForPeriod } from "@/lib/rankings/queries";
import { parseRankingPeriod } from "@/lib/rankings/types";
import { getNetworkMemberProfiles } from "@/lib/profiles/queries";

export const metadata = {
  title: "Creator rankings",
  description: "Enter TikTok Creator Network performance stats and recalculate member rankings.",
};

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AdminRankingsPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const periodKind = parseRankingPeriod(typeof sp.period === "string" ? sp.period : undefined);
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
    if (!tablesMissing) {
      existingStats = await getPerformanceStatsForPeriod(periodStart, periodEnd);
    } else {
      existingStats = [];
    }
  } catch {
    existingStats = [];
    if (!tablesMissing) tablesMissing = true;
  }

  return (
    <section className="py-10 sm:py-14">
      <Container className="max-w-3xl">
        <AdminPageHeader
          title="Creator rankings"
          description="Stats from Creator Network screenshots drive the public leaderboard. Use the form below to override one member or sync into the database."
          breadcrumbs={[
            { label: "Admin", href: "/admin" },
            { label: "Rankings" },
          ]}
        />

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <StatCard label="Network members" value={members.length} accent />
          <StatCard
            label="Stats this period"
            value={existingStats.length}
            hint={`${periodStart} → ${periodEnd}`}
          />
        </div>

        <div className="mt-6">
          <AdminRankingsDbSetup tablesMissing={tablesMissing} />
        </div>

        <AdminPanel className="mt-8" raised>
          <AdminRankingsSnapshot />
        </AdminPanel>

        <AdminPanel className="mt-8" raised>
          <Suspense
            fallback={
              <div className="space-y-3" role="status" aria-label="Loading rankings form">
                <AdminSkeleton className="h-6 w-40" />
                <AdminSkeleton className="h-24 w-full" />
                <AdminSkeleton className="h-40 w-full" />
              </div>
            }
          >
            <AdminRankingsForm
              members={members}
              existingStats={existingStats}
              periodKind={periodKind}
              periodAnchor={anchor}
            />
          </Suspense>
        </AdminPanel>
      </Container>
    </section>
  );
}
