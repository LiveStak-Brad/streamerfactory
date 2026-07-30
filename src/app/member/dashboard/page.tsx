import { MemberDashboardAchievementWidget } from "@/components/member/dashboard/MemberDashboardAchievementWidget";
import { MemberDashboardBattlesWidget } from "@/components/member/dashboard/MemberDashboardBattlesWidget";
import { MemberDashboardCommunityWidget } from "@/components/member/dashboard/MemberDashboardCommunityWidget";
import { MemberDashboardMissionsWidget } from "@/components/member/dashboard/MemberDashboardMissionsWidget";
import { MemberDashboardProfileWidget } from "@/components/member/dashboard/MemberDashboardProfileWidget";
import { MemberDashboardProgress } from "@/components/member/dashboard/MemberDashboardProgress";
import { MemberDashboardQuickActions } from "@/components/member/dashboard/MemberDashboardQuickActions";
import { MemberDashboardStreakReputationWidget } from "@/components/member/dashboard/MemberDashboardStreakReputationWidget";
import { MemberDashboardStreamerUWidget } from "@/components/member/dashboard/MemberDashboardStreamerUWidget";
import { MemberDashboardWelcome } from "@/components/member/dashboard/MemberDashboardWelcome";
import { MemberGrowthBootstrap } from "@/components/member/dashboard/MemberGrowthBootstrap";
import { DashboardWidget } from "@/components/ui/DashboardWidget";
import { AchievementBadge } from "@/components/ui/AchievementBadge";
import { Container } from "@/components/ui/Container";
import { getMyLatestImportedStats } from "@/lib/creator-network/queries";
import {
  getMyUpcomingBattleEvents,
  getUpcomingBattleEvents,
} from "@/lib/battle-hub/queries";
import { timeOfDayGreeting } from "@/lib/member/dashboard-next-action";
import { rankingBadge } from "@/lib/rankings/scoring";
import { getMyLeaderboardSummary } from "@/lib/rankings/queries";
import { getTikTokConnectionPublic } from "@/lib/tiktok/db";
import { getSessionProfile } from "@/lib/auth/server";
import { getCreatorProgressSummary } from "@/lib/growth/progress/summary";
import { AnalyticsEvents } from "@/lib/analytics/events";
import { trackServerEvent } from "@/lib/analytics/server";

export const metadata = {
  title: "Member dashboard",
  description: "Your Streamer Factory member dashboard — rankings, training, and battles.",
  openGraph: {
    title: "Member Dashboard | Streamer Factory",
    description: "Your Streamer Factory member dashboard — rankings, training, and battles.",
    images: [{ url: "/branding/og/dashboard.png", width: 1200, height: 630 }],
  },
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
  const profile = session?.profile ?? null;

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
  let myUpcoming: Awaited<ReturnType<typeof getMyUpcomingBattleEvents>> = [];
  let networkUpcoming: Awaited<ReturnType<typeof getUpcomingBattleEvents>> = [];
  let growth: Awaited<ReturnType<typeof getCreatorProgressSummary>> | null = null;

  if (userId) {
    const [rankRes, statsRes, myBattlesRes, networkBattlesRes, growthRes] = await Promise.all([
      getMyLeaderboardSummary(userId, "monthly").catch(() => null),
      getMyLatestImportedStats(userId).catch(() => null),
      getMyUpcomingBattleEvents(userId, 3).catch(() => []),
      getUpcomingBattleEvents(6).catch(() => []),
      getCreatorProgressSummary(userId, { email }).catch(() => null),
    ]);
    rankingSummary = rankRes;
    myImportedStats = statsRes;
    myUpcoming = myBattlesRes;
    networkUpcoming = networkBattlesRes;
    growth = growthRes;
  }

  const entry = rankingSummary?.entry ?? null;
  const badge = rankingBadge(entry?.rank_position ?? null, Boolean(entry));
  const handle =
    connection?.tiktok_username?.replace(/^@/, "") ||
    myImportedStats?.tiktok_username?.replace(/^@/, "") ||
    profile?.tiktok_username?.replace(/^@/, "") ||
    null;
  const displayName =
    connection?.display_name?.trim() ||
    myImportedStats?.tiktok_display_name?.trim() ||
    (handle ? `@${handle}` : null) ||
    email?.split("@")[0] ||
    "Creator";
  const avatarUrl = connection?.avatar_url || myImportedStats?.avatar_url || entry?.avatar_url || null;

  const nextAction = growth?.nextAction ?? {
    label: "Continue training",
    href: "/streameru",
    reason: "Keep building consistency in StreamerU.",
  };

  const greeting = timeOfDayGreeting(profile?.timezone);

  void trackServerEvent({
    event: AnalyticsEvents.DASHBOARD_VIEWED,
    route: "/member/dashboard",
  });
  void trackServerEvent({
    event: AnalyticsEvents.DASHBOARD_ENGAGED,
    route: "/member/dashboard",
  });

  return (
    <div className="border-b border-border/70 bg-muted-bg/40 pb-16 pt-8 dark:border-zinc-800 dark:bg-zinc-950/50 sm:pt-10">
      <MemberGrowthBootstrap />
      <Container className="max-w-6xl space-y-6 sm:space-y-8">
        {tiktokStatus === "connected" ? (
          <p className="rounded-xl border border-emerald-200/80 bg-emerald-50/80 px-4 py-3 text-sm font-medium text-emerald-950 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-100">
            TikTok connected — your latest stats are saved.
          </p>
        ) : null}
        {tiktokError ? (
          <p className="rounded-xl border border-rose-200/80 bg-rose-50/80 px-4 py-3 text-sm font-medium text-rose-950 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-100">
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
          <p className="rounded-xl border border-amber-200/80 bg-amber-50/80 px-4 py-3 text-sm font-medium text-amber-950 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-100">
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

        <MemberDashboardWelcome
          greeting={greeting}
          displayName={displayName}
          handle={handle}
          avatarUrl={avatarUrl}
          rankPosition={entry?.rank_position ?? null}
          badge={badge}
          nextAction={nextAction}
          email={email}
        />

        {growth ? (
          <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
            <MemberDashboardMissionsWidget
              missions={growth.todayMissions}
              seasonName={growth.season?.name ?? null}
            />
            <MemberDashboardStreakReputationWidget
              streaks={growth.snapshot.streaks}
              reputation={growth.snapshot.reputation}
              seasonName={growth.season?.name ?? null}
            />
          </div>
        ) : null}

        <MemberDashboardProgress
          entry={entry}
          leaderboardSize={rankingSummary?.leaderboardSize ?? 0}
        />

        <MemberDashboardQuickActions handle={handle} tiktokConnected={Boolean(connection)} />

        <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
          <MemberDashboardStreamerUWidget />
          <MemberDashboardBattlesWidget myUpcoming={myUpcoming} networkUpcoming={networkUpcoming} />
          {growth ? (
            <MemberDashboardAchievementWidget achievement={growth.newestAchievement} />
          ) : null}
          {growth ? (
            <MemberDashboardCommunityWidget
              activity={growth.recentActivity}
              referralCode={growth.referralCode}
              unreadNotifications={growth.unreadNotifications}
            />
          ) : null}
          <MemberDashboardProfileWidget
            connection={connection}
            onboardingComplete={Boolean(profile?.onboarding_completed_at)}
            networkStatus={myImportedStats?.creator_network_status ?? null}
          />
          <DashboardWidget
            eyebrow="Recognition"
            title="Your factory status"
            actionHref="/rankings"
            actionLabel="Public board →"
          >
            <div className="space-y-4">
              <AchievementBadge badge={badge} />
              <p className="text-sm leading-relaxed text-muted">
                {entry?.rank_position != null
                  ? `You're #${entry.rank_position} on the monthly factory board${
                      rankingSummary?.leaderboardSize
                        ? ` of ${rankingSummary.leaderboardSize}`
                        : ""
                    }. Badges update from real Creator Network rankings — Champion (#1), Elite (Top 3), Rising (Top 10).`
                  : "Your badge becomes Active, Rising, Elite, or Champion once Creator Network stats match your TikTok handle."}
              </p>
              {connection ? (
                <dl className="grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl border border-border/70 bg-muted-bg/50 px-3 py-2 dark:border-zinc-800">
                    <dt className="text-[0.65rem] font-bold uppercase tracking-wider text-muted">Followers</dt>
                    <dd className="mt-0.5 text-lg font-bold tabular-nums text-foreground">
                      {connection.follower_count.toLocaleString()}
                    </dd>
                  </div>
                  <div className="rounded-xl border border-border/70 bg-muted-bg/50 px-3 py-2 dark:border-zinc-800">
                    <dt className="text-[0.65rem] font-bold uppercase tracking-wider text-muted">Videos</dt>
                    <dd className="mt-0.5 text-lg font-bold tabular-nums text-foreground">
                      {connection.video_count.toLocaleString()}
                    </dd>
                  </div>
                </dl>
              ) : null}
            </div>
          </DashboardWidget>
        </div>
      </Container>
    </div>
  );
}
