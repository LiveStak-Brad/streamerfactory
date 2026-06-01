import Link from "next/link";
import { CreatorNetworkStatsCard } from "@/components/creator-network/CreatorNetworkStatsCard";
import { MemberRankingCard } from "@/components/rankings/MemberRankingCard";
import { Container } from "@/components/ui/Container";
import { getMyLatestImportedStats } from "@/lib/creator-network/queries";
import { getMyLeaderboardSummary } from "@/lib/rankings/queries";
import { getTikTokConnectionPublic } from "@/lib/tiktok/db";
import { getSessionProfile } from "@/lib/auth/server";
import { TikTokMemberCard } from "@/components/member/TikTokMemberCard";

export const metadata = {
  title: "Member dashboard",
  description: "Your Streamer Factory member dashboard — TikTok connection and account tools.",
};

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function firstString(v: string | string[] | undefined): string | undefined {
  if (Array.isArray(v)) return v[0];
  return v;
}

export default async function MemberDashboardPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const session = await getSessionProfile();
  const userId = session?.user?.id;
  const email = session?.user?.email ?? null;

  let connection = null;
  if (userId) {
    try {
      connection = await getTikTokConnectionPublic(userId);
    } catch {
      connection = null;
    }
  }

  const tiktokStatus = firstString(sp.tiktok);
  const tiktokError = firstString(sp.tiktok_error);
  const tiktokWarn = firstString(sp.tiktok_warn);

  let rankingSummary: Awaited<ReturnType<typeof getMyLeaderboardSummary>> | null = null;
  let myImportedStats: Awaited<ReturnType<typeof getMyLatestImportedStats>> | null = null;
  if (userId) {
    try {
      rankingSummary = await getMyLeaderboardSummary(userId, "monthly");
    } catch {
      rankingSummary = null;
    }
    try {
      myImportedStats = await getMyLatestImportedStats(userId);
    } catch {
      myImportedStats = null;
    }
  }

  return (
    <div className="border-b border-zinc-200/80 bg-muted-bg/30 pb-16 pt-12 dark:border-zinc-800 dark:bg-zinc-950/40 sm:pt-16">
      <Container className="max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent dark:text-accent-muted">
          Members
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">Dashboard</h1>
        <p className="mt-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          Connect TikTok to sync public profile stats. Tokens stay on the server — only you can refresh or
          reconnect from this page while signed in.
        </p>

        {email ? (
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Signed in as <span className="font-medium text-zinc-800 dark:text-zinc-200">{email}</span>
          </p>
        ) : null}

        {tiktokStatus === "connected" ? (
          <p className="mt-6 rounded-xl border border-emerald-200/80 bg-emerald-50/80 px-4 py-3 text-sm font-medium text-emerald-950 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-100">
            TikTok connected — your latest stats are saved.
          </p>
        ) : null}
        {tiktokError ? (
          <p className="mt-6 rounded-xl border border-rose-200/80 bg-rose-50/80 px-4 py-3 text-sm font-medium text-rose-950 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-100">
            {tiktokError === "config"
              ? "TikTok sign-in is not configured on the server (missing env vars)."
              : tiktokError === "invalid_state"
                ? "Sign-in with TikTok could not be verified (state mismatch). Try again."
                : tiktokError === "already_linked"
                  ? "This TikTok account is already linked to a different Streamer Factory login."
                : (() => {
                    try {
                      return decodeURIComponent(tiktokError);
                    } catch {
                      return tiktokError;
                    }
                  })()}
          </p>
        ) : null}
        {tiktokWarn ? (
          <p className="mt-6 rounded-xl border border-amber-200/80 bg-amber-50/80 px-4 py-3 text-sm font-medium text-amber-950 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-100">
            Connected, but profile sync had an issue:{" "}
            {(() => {
              try {
                return decodeURIComponent(tiktokWarn);
              } catch {
                return tiktokWarn;
              }
            })()}
            . Try &quot;Refresh TikTok stats&quot; in a moment.
          </p>
        ) : null}

        <div className="mt-10">
          <TikTokMemberCard connection={connection} />
        </div>

        <div className="mt-10">
          <CreatorNetworkStatsCard stats={myImportedStats} />
        </div>

        <div className="mt-10">
          <MemberRankingCard
            entry={rankingSummary?.entry ?? null}
            periodStart={rankingSummary?.periodStart ?? ""}
            periodEnd={rankingSummary?.periodEnd ?? ""}
            leaderboardSize={rankingSummary?.leaderboardSize ?? 0}
          />
        </div>

        <div className="mt-10 flex flex-wrap gap-4 text-sm font-semibold text-zinc-600 dark:text-zinc-400">
          <Link href="/member/leaderboard" className="text-accent hover:underline dark:text-accent-muted">
            Leaderboard
          </Link>
          <span aria-hidden>·</span>
          <Link href="/battle-hub" className="text-accent hover:underline dark:text-accent-muted">
            Battle Hub
          </Link>
          <span aria-hidden>·</span>
          <Link href="/streameru" className="text-accent hover:underline dark:text-accent-muted">
            StreamerU
          </Link>
          <span aria-hidden>·</span>
          <Link href="/application-status" className="hover:underline">
            Application status
          </Link>
        </div>
      </Container>
    </div>
  );
}
