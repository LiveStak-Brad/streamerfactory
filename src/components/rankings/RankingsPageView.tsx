import Link from "next/link";
import { RankingsBoard } from "@/components/rankings/RankingsBoard";
import { RankingsPodium } from "@/components/rankings/RankingsPodium";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatPeriodLabel, periodBounds, toDateString } from "@/lib/rankings/periods";
import { createClient } from "@/lib/supabase/server";
import { getLeaderboardWithMeta } from "@/lib/rankings/queries";
import { parseRankingPeriod, type RankingPeriod } from "@/lib/rankings/types";
import { getSessionProfile } from "@/lib/auth/server";

type RankingsPageViewProps = {
  periodKind?: RankingPeriod;
  anchor?: string;
  highlightProfileId?: string | null;
  showAdminHint?: boolean;
};

export async function RankingsPageView({
  periodKind: periodKindProp = "monthly",
  anchor: anchorProp,
  highlightProfileId = null,
  showAdminHint = false,
}: RankingsPageViewProps) {
  const periodKind = parseRankingPeriod(periodKindProp);
  const anchor = anchorProp ?? toDateString(new Date());
  const calendarPeriod = periodBounds(
    periodKind,
    anchor ? new Date(`${anchor}T12:00:00Z`) : new Date(),
  );

  let entries: Awaited<ReturnType<typeof getLeaderboardWithMeta>>["entries"] = [];
  let highlightTiktokHandle: string | null = null;
  let syncMeta: Awaited<ReturnType<typeof getLeaderboardWithMeta>>["syncMeta"] = null;
  let loadIssue: Awaited<ReturnType<typeof getLeaderboardWithMeta>>["loadIssue"];
  let wrongPeriodHint: string | null = null;
  try {
    const board = await getLeaderboardWithMeta(periodKind, anchor);
    entries = board.entries;
    syncMeta = board.syncMeta;
    loadIssue = board.loadIssue;
    wrongPeriodHint = board.wrongPeriodHint ?? null;
  } catch {
    entries = [];
  }

  const periodStart = syncMeta?.periodStart ?? calendarPeriod.periodStart;
  const periodEnd = syncMeta?.periodEnd ?? calendarPeriod.periodEnd;

  const lastSyncedLabel =
    syncMeta?.importedAt != null
      ? new Date(syncMeta.importedAt).toLocaleString(undefined, {
          dateStyle: "medium",
          timeStyle: "short",
        })
      : null;

  let resolvedHighlight = highlightProfileId;
  if (!resolvedHighlight) {
    try {
      const session = await getSessionProfile();
      resolvedHighlight = session?.user?.id ?? null;
    } catch {
      resolvedHighlight = null;
    }
  }

  if (resolvedHighlight) {
    try {
      const supabase = await createClient();
      const { data: profile } = await supabase
        .from("profiles")
        .select("tiktok_username")
        .eq("id", resolvedHighlight)
        .maybeSingle();
      highlightTiktokHandle =
        profile?.tiktok_username?.replace(/^@+/, "").trim().toLowerCase() ?? null;
    } catch {
      highlightTiktokHandle = null;
    }
  }

  const podium = entries.slice(0, 3);
  const rest = entries.slice(3);

  const myEntry =
    resolvedHighlight || highlightTiktokHandle
      ? entries.find((e) => {
          if (resolvedHighlight && e.profile_id === resolvedHighlight) return true;
          if (!highlightTiktokHandle) return false;
          return (
            (e.tiktok_username ?? "").replace(/^@+/, "").trim().toLowerCase() ===
            highlightTiktokHandle
          );
        })
      : null;

  const jumpTargetId =
    myEntry && (myEntry.rank_position ?? 0) > 3
      ? myEntry.profile_id || myEntry.tiktok_username?.replace(/^@/, "") || null
      : null;

  return (
    <>
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0b0a12] px-5 py-10 text-zinc-50 sm:px-8 sm:py-12">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_-20%,rgba(251,191,36,0.18),transparent_50%),radial-gradient(ellipse_60%_50%_at_90%_20%,rgba(139,92,246,0.25),transparent_50%),radial-gradient(ellipse_50%_40%_at_10%_80%,rgba(99,102,241,0.2),transparent_50%)]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-200/90">Competition</p>
          <h1 className="mt-3 text-4xl font-bold tracking-[-0.03em] text-white sm:text-5xl">
            Factory rankings
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-zinc-400">
            Monthly diamonds, stream hours, and activeness from TikTok Creator Network — climb the board,
            earn recognition.
          </p>
          <p className="mt-3 text-sm text-zinc-500">
            {formatPeriodLabel(periodKind, periodStart, periodEnd)}
            <span className="mx-2 text-zinc-700">·</span>
            Monthly view
            {syncMeta?.statPeriodLabel ? (
              <span className="mt-1 block text-xs text-zinc-500">
                Backstage: {syncMeta.statPeriodLabel}
              </span>
            ) : null}
          </p>

          {lastSyncedLabel ? (
            <p className="mt-5 rounded-xl border border-emerald-400/25 bg-emerald-500/10 px-4 py-2.5 text-sm text-emerald-100">
              Live from TikTok Backstage · last sync {lastSyncedLabel}
              {syncMeta?.acceptedRows ? ` · ${syncMeta.acceptedRows} creators` : ""}
            </p>
          ) : loadIssue === "wrong_period" && wrongPeriodHint ? (
            <p className="mt-5 rounded-xl border border-amber-400/30 bg-amber-500/10 px-4 py-2.5 text-sm text-amber-100">
              {wrongPeriodHint}
            </p>
          ) : loadIssue === "import_not_readable" ? (
            <p className="mt-5 rounded-xl border border-amber-400/30 bg-amber-500/10 px-4 py-2.5 text-sm text-amber-100">
              Sync saved, but public rankings cannot read it yet. Run{" "}
              <code className="text-xs">supabase/apply-public-leaderboard-now.sql</code>, then refresh.
            </p>
          ) : loadIssue === "empty_diamonds" ? (
            <p className="mt-5 rounded-xl border border-amber-400/30 bg-amber-500/10 px-4 py-2.5 text-sm text-amber-100">
              Latest import has no diamond values. Sync again from Backstage Monthly tab.
            </p>
          ) : (
            <p className="mt-5 text-sm text-zinc-500">
              Showing snapshot data until staff sync from the Chrome extension.
            </p>
          )}

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button href="/members" variant="secondaryOnDark">
              Member directory
            </Button>
            {myEntry ? (
              <Button href="/member/dashboard" variant="primary">
                My dashboard
              </Button>
            ) : (
              <Button href="/login?next=/member/leaderboard" variant="primary">
                Sign in for your rank
              </Button>
            )}
          </div>

          {myEntry?.rank_position != null ? (
            <p className="mt-5 text-sm font-semibold text-zinc-300">
              You&apos;re currently{" "}
              <span className="text-white">#{myEntry.rank_position}</span> this month
              {myEntry.rank_position <= 3 ? " — on the podium." : "."}
            </p>
          ) : null}
        </div>

        {podium.length > 0 ? (
          <div className="relative mt-10">
            <RankingsPodium
              entries={podium}
              highlightProfileId={resolvedHighlight}
              highlightTiktokHandle={highlightTiktokHandle}
            />
          </div>
        ) : null}
      </section>

      {showAdminHint && entries.length === 0 ? (
        <div className="mx-auto mt-10 max-w-2xl">
          <EmptyState
            title="Rankings could not be loaded"
            description="Check the sync pipeline or contact support if this persists."
            className="items-center text-center"
            action={
              <Link href="/rankings" className="text-sm font-semibold text-accent hover:underline dark:text-accent-muted">
                Retry /rankings
              </Link>
            }
          />
        </div>
      ) : null}

      {rest.length > 0 ? (
        <div className="mx-auto mt-12 max-w-4xl">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-accent dark:text-accent-muted">
                Full board
              </p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-foreground">
                Ranks 4–{entries.length}
              </h2>
            </div>
            <p className="text-sm text-muted">{entries.length} creators ranked</p>
          </div>
          <RankingsBoard
            entries={rest}
            highlightProfileId={resolvedHighlight}
            highlightTiktokHandle={highlightTiktokHandle}
            jumpTargetId={jumpTargetId}
          />
        </div>
      ) : entries.length > 0 && entries.length <= 3 ? (
        <p className="mx-auto mt-10 max-w-xl text-center text-sm text-muted">
          Showing the full board on the podium — more creators will appear here as the network grows.
        </p>
      ) : null}
    </>
  );
}

export function parseRankingsSearchParams(
  sp: Record<string, string | string[] | undefined>,
): { periodKind: RankingPeriod; anchor: string } {
  const periodKind = parseRankingPeriod(typeof sp.period === "string" ? sp.period : undefined);
  const anchor = typeof sp.anchor === "string" ? sp.anchor : toDateString(new Date());
  return { periodKind, anchor };
}
