import Link from "next/link";
import { Suspense } from "react";
import { LeaderboardPeriodTabs } from "@/components/rankings/LeaderboardPeriodTabs";
import { LeaderboardTable } from "@/components/rankings/LeaderboardTable";
import { Button } from "@/components/ui/Button";
import { formatPeriodLabel, periodBounds, toDateString } from "@/lib/rankings/periods";
import { createClient } from "@/lib/supabase/server";
import { getLeaderboardWithMeta } from "@/lib/rankings/queries";
import { RANKING_PERIODS, type RankingPeriod } from "@/lib/rankings/types";

type RankingsPageViewProps = {
  periodKind: RankingPeriod;
  anchor?: string;
  highlightProfileId?: string | null;
  showAdminHint?: boolean;
};

function parsePeriod(raw: string | undefined): RankingPeriod {
  if (raw && RANKING_PERIODS.includes(raw as RankingPeriod)) return raw as RankingPeriod;
  return "weekly";
}

export async function RankingsPageView({
  periodKind: periodKindProp,
  anchor: anchorProp,
  highlightProfileId = null,
  showAdminHint = false,
}: RankingsPageViewProps) {
  const periodKind = periodKindProp;
  const anchor = anchorProp ?? toDateString(new Date());
  const { periodStart, periodEnd } = periodBounds(
    periodKind,
    anchor ? new Date(`${anchor}T12:00:00Z`) : new Date(),
  );

  let entries: Awaited<ReturnType<typeof getLeaderboardWithMeta>>["entries"] = [];
  let highlightTiktokHandle: string | null = null;
  let syncMeta: Awaited<ReturnType<typeof getLeaderboardWithMeta>>["syncMeta"] = null;
  let loadIssue: Awaited<ReturnType<typeof getLeaderboardWithMeta>>["loadIssue"];
  try {
    const board = await getLeaderboardWithMeta(periodKind, anchor);
    entries = board.entries;
    syncMeta = board.syncMeta;
    loadIssue = board.loadIssue;
  } catch {
    entries = [];
  }

  const lastSyncedLabel =
    syncMeta?.importedAt != null
      ? new Date(syncMeta.importedAt).toLocaleString(undefined, {
          dateStyle: "medium",
          timeStyle: "short",
        })
      : null;

  if (highlightProfileId) {
    try {
      const supabase = await createClient();
      const { data: profile } = await supabase
        .from("profiles")
        .select("tiktok_username")
        .eq("id", highlightProfileId)
        .maybeSingle();
      highlightTiktokHandle = profile?.tiktok_username?.replace(/^@+/, "").trim().toLowerCase() ?? null;
    } catch {
      highlightTiktokHandle = null;
    }
  }

  return (
    <>
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-accent dark:text-accent-muted">
          Creator network
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-[-0.03em] text-foreground sm:text-5xl">
          Factory rankings
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted sm:text-xl">
          Weekly performance leaderboard from TikTok Creator Network backstage — diamonds earned (Gifts),
          stream time, activeness, and battles.
        </p>
        <p className="mt-2 text-sm text-zinc-500">{formatPeriodLabel(periodKind, periodStart, periodEnd)}</p>
        {lastSyncedLabel ? (
          <p className="mt-3 rounded-xl border border-emerald-200/80 bg-emerald-50/70 px-4 py-2 text-sm text-emerald-950 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-100">
            Live from TikTok Backstage · last extension sync {lastSyncedLabel}
            {syncMeta?.acceptedRows ? ` · ${syncMeta.acceptedRows} creators` : ""}. Sync again anytime to
            refresh this page.
          </p>
        ) : loadIssue === "import_not_readable" ? (
          <p className="mt-3 rounded-xl border border-amber-200/80 bg-amber-50/70 px-4 py-2 text-sm text-amber-950 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-100">
            Sync saved in the database, but public rankings cannot read it yet. In Supabase SQL Editor,
            run <code className="text-xs">supabase/apply-public-leaderboard-now.sql</code>, then hard-refresh
            this page.
          </p>
        ) : loadIssue === "empty_diamonds" ? (
          <p className="mt-3 rounded-xl border border-amber-200/80 bg-amber-50/70 px-4 py-2 text-sm text-amber-950 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-100">
            Latest import has no diamond values. Reload the Chrome extension, refresh preview on TikTok
            Backstage (confirm diamond counts show), then sync again.
          </p>
        ) : periodKind === "weekly" || periodKind === "monthly" ? (
          <p className="mt-3 text-sm text-zinc-500">
            Showing snapshot data until staff sync from the Chrome extension.
          </p>
        ) : null}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button href="/members" variant="secondary">
            Member directory
          </Button>
          <Button href="/login?next=/member/dashboard" variant="primary">
            Sign in for your rank
          </Button>
        </div>
      </div>

      {showAdminHint && entries.length === 0 ? (
        <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-amber-200/90 bg-amber-50/80 px-5 py-4 text-center text-sm text-amber-950 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-100">
          Rankings could not be loaded. Check{" "}
          <Link href="/rankings" className="font-semibold underline">
            /rankings
          </Link>{" "}
          or contact support.
        </div>
      ) : null}

      <div className="mx-auto mt-10 max-w-4xl">
        <Suspense fallback={null}>
          <LeaderboardPeriodTabs basePath="/rankings" />
        </Suspense>
      </div>

      <div className="mx-auto mt-10 max-w-4xl">
        <LeaderboardTable
          entries={entries}
          highlightProfileId={highlightProfileId}
          highlightTiktokHandle={highlightTiktokHandle}
        />
      </div>
    </>
  );
}

export function parseRankingsSearchParams(
  sp: Record<string, string | string[] | undefined>,
): { periodKind: RankingPeriod; anchor: string } {
  const periodKind = parsePeriod(typeof sp.period === "string" ? sp.period : undefined);
  const anchor = typeof sp.anchor === "string" ? sp.anchor : toDateString(new Date());
  return { periodKind, anchor };
}
