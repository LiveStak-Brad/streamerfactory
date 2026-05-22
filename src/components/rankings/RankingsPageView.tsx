import Link from "next/link";
import { Suspense } from "react";
import { LeaderboardPeriodTabs } from "@/components/rankings/LeaderboardPeriodTabs";
import { LeaderboardTable } from "@/components/rankings/LeaderboardTable";
import { Button } from "@/components/ui/Button";
import { formatPeriodLabel, periodBounds, toDateString } from "@/lib/rankings/periods";
import { createClient } from "@/lib/supabase/server";
import { getLeaderboard } from "@/lib/rankings/queries";
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

  let entries: Awaited<ReturnType<typeof getLeaderboard>> = [];
  let highlightTiktokHandle: string | null = null;
  try {
    entries = await getLeaderboard(periodKind, anchor);
  } catch {
    entries = [];
  }

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
