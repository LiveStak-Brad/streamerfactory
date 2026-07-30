import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";
import { AdminPanel } from "@/components/admin/ui/AdminPanel";
import { AdminSectionTitle } from "@/components/admin/ui/AdminSectionTitle";
import { AdminStatusBadge } from "@/components/admin/ui/AdminStatusBadge";
import { ActivityItem } from "@/components/ui/ActivityItem";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { StatCard } from "@/components/ui/StatCard";
import { AnalyticsEvents } from "@/lib/analytics/events";
import { getAnalyticsEventCounts, getRecentAnalyticsEvents } from "@/lib/analytics/queries";
import { getApplications } from "@/lib/applications/queries";
import { requireAdmin } from "@/lib/auth/server";
import { getAllBattleEventsForAdmin } from "@/lib/battle-hub/queries";
import { getImportMatchReviewSummary } from "@/lib/creator-network/queries";
import { getApplicantProfiles, getNetworkMemberProfiles } from "@/lib/profiles/queries";
import { getAllResourcePosts } from "@/lib/resources/queries";

function formatShort(iso: string) {
  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function startOfTodayUtc() {
  const d = new Date();
  d.setUTCHours(0, 0, 0, 0);
  return d;
}

export default async function AdminHomePage() {
  const session = await requireAdmin();
  // Server snapshot time for attention windows (not client render purity).
  // eslint-disable-next-line react-hooks/purity -- admin dashboard uses wall-clock windows
  const now = Date.now();
  const d7 = new Date(now - 7 * 24 * 60 * 60 * 1000);
  const todayStart = startOfTodayUtc();

  const [
    applications,
    applicants,
    members,
    events,
    posts,
    analytics7,
    recentEvents,
    matchReview,
  ] = await Promise.all([
    getApplications().catch(() => [] as Awaited<ReturnType<typeof getApplications>>),
    getApplicantProfiles().catch(() => [] as Awaited<ReturnType<typeof getApplicantProfiles>>),
    getNetworkMemberProfiles().catch(() => [] as Awaited<ReturnType<typeof getNetworkMemberProfiles>>),
    getAllBattleEventsForAdmin(80).catch(
      () => [] as Awaited<ReturnType<typeof getAllBattleEventsForAdmin>>,
    ),
    getAllResourcePosts().catch(() => [] as Awaited<ReturnType<typeof getAllResourcePosts>>),
    getAnalyticsEventCounts(d7).catch(() => ({ counts: {} as Record<string, number>, error: null })),
    getRecentAnalyticsEvents(8).catch(() => [] as Awaited<ReturnType<typeof getRecentAnalyticsEvents>>),
    getImportMatchReviewSummary().catch(() => ({
      matchedProfiles: 0,
      unmatchedProfiles: 0,
      lowConfidenceMatches: 0,
    })),
  ]);

  const pendingApps = applications.filter((a) => a.status === "submitted" || a.status === "in_review");
  const appsToday = applications.filter((a) => new Date(a.created_at) >= todayStart);
  const upcomingBattles = events
    .filter((e) => e.status === "scheduled" && new Date(e.scheduled_at).getTime() >= now)
    .sort((a, b) => new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime())
    .slice(0, 5);
  const draftPosts = posts.filter((p) => p.status !== "published");
  const newestMembers = [...members]
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    .slice(0, 5);
  const recentApps = [...applications]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);

  const counts7 = analytics7.counts ?? {};
  const appsSubmitted7 = counts7[AnalyticsEvents.APPLICATION_SUBMITTED] ?? 0;
  const battleEvents7 = counts7[AnalyticsEvents.BATTLE_EVENT_CREATED] ?? 0;
  const lessonViews7 = counts7[AnalyticsEvents.RESOURCE_VIEWED] ?? 0;

  const attentionItems: {
    id: string;
    title: string;
    meta: string;
    href: string;
    tone: "warning" | "info" | "danger";
  }[] = [];

  if (applicants.length > 0) {
    attentionItems.push({
      id: "applicants",
      title: `${applicants.length} account${applicants.length === 1 ? "" : "s"} awaiting member approval`,
      meta: "Promote after TikTok / Apply verification",
      href: "/admin/members",
      tone: "warning",
    });
  }
  if (pendingApps.length > 0) {
    attentionItems.push({
      id: "apps",
      title: `${pendingApps.length} application${pendingApps.length === 1 ? "" : "s"} in the review pipeline`,
      meta: "Submitted or in review",
      href: "/admin/applications",
      tone: "info",
    });
  }
  if (matchReview.unmatchedProfiles > 0 || matchReview.lowConfidenceMatches > 0) {
    attentionItems.push({
      id: "cn",
      title: "Creator Network match review needed",
      meta: `${matchReview.unmatchedProfiles} unmatched · ${matchReview.lowConfidenceMatches} low confidence`,
      href: "/admin/creator-network",
      tone: "danger",
    });
  }
  if (draftPosts.length > 0) {
    attentionItems.push({
      id: "drafts",
      title: `${draftPosts.length} StreamerU draft${draftPosts.length === 1 ? "" : "s"}`,
      meta: "Publish when ready for the public library",
      href: "/admin/streameru",
      tone: "info",
    });
  }

  const role = session.profile?.role ?? "—";
  const email = session.user.email ?? session.user.id;

  return (
    <section className="py-10 sm:py-14">
      <Container>
        <AdminPageHeader
          title="Dashboard"
          description={
            <>
              Signed in as <span className="font-medium text-foreground">{email}</span>
              <span className="mx-1.5 text-border">·</span>
              Role <span className="font-medium text-foreground">{role}</span>
            </>
          }
          actions={
            <Button href="/admin/analytics" variant="secondary" className="min-h-[40px] px-4 text-sm">
              Open analytics
            </Button>
          }
        />

        {/* Attention strip — first viewport answer */}
        <div className="mt-8">
          <AdminSectionTitle
            title="Needs attention"
            description="Live queues from applications, members, imports, and StreamerU drafts."
          />
          {attentionItems.length === 0 ? (
            <div className="mt-4">
              <EmptyState
                title="You're caught up"
                description="No pending approvals, open applications, CN match issues, or StreamerU drafts right now."
                illustration="members"
              />
            </div>
          ) : (
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {attentionItems.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className="flex h-full flex-col rounded-2xl border border-border/80 bg-surface/95 p-4 shadow-sm transition-[border-color,box-shadow,transform] hover:-translate-y-0.5 hover:border-accent/35 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:transform-none dark:border-zinc-800 dark:bg-zinc-950/50"
                  >
                    <AdminStatusBadge
                      tone={
                        item.tone === "danger" ? "danger" : item.tone === "warning" ? "warning" : "info"
                      }
                    >
                      Attention
                    </AdminStatusBadge>
                    <p className="mt-3 text-base font-semibold text-foreground">{item.title}</p>
                    <p className="mt-1 text-sm text-muted">{item.meta}</p>
                    <span className="mt-3 text-sm font-semibold text-accent dark:text-accent-muted">
                      Review →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* KPI row — real counts only */}
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Applications today"
            value={appsToday.length}
            hint="Submitted since 00:00 UTC"
            accent
          />
          <StatCard
            label="Pending approvals"
            value={applicants.length}
            hint="Applicant accounts waiting"
          />
          <StatCard
            label="Open applications"
            value={pendingApps.length}
            hint="Received or in review"
          />
          <StatCard
            label="Upcoming battles"
            value={upcomingBattles.length}
            hint="Scheduled, future only"
          />
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <StatCard
            label="Apps submitted (7d)"
            value={appsSubmitted7}
            hint={analytics7.error ? "Counts unavailable" : "Analytics events"}
          />
          <StatCard label="Battles created (7d)" value={battleEvents7} hint="Analytics events" />
          <StatCard label="Lesson views (7d)" value={lessonViews7} hint="Analytics events" />
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <AdminPanel>
            <AdminSectionTitle
              title="Recent applications"
              actionHref="/admin/applications"
              actionLabel="All applications →"
            />
            {recentApps.length === 0 ? (
              <div className="mt-4">
                <EmptyState
                  title="No applications yet"
                  description="When creators submit Join / Apply, they appear here for review."
                  action={
                    <Button href="/apply" variant="secondary" className="min-h-[40px] px-4 text-sm">
                      View Join page
                    </Button>
                  }
                />
              </div>
            ) : (
              <ul className="mt-4 space-y-2">
                {recentApps.map((app) => (
                  <li key={app.id}>
                    <ActivityItem
                      href="/admin/applications"
                      title={app.full_name}
                      meta={`${app.tiktok_username.startsWith("@") ? app.tiktok_username : `@${app.tiktok_username}`} · ${formatShort(app.created_at)}`}
                      trailing={
                        <AdminStatusBadge
                          tone={
                            app.status === "approved"
                              ? "success"
                              : app.status === "rejected"
                                ? "danger"
                                : app.status === "in_review"
                                  ? "info"
                                  : "neutral"
                          }
                        >
                          {app.status === "submitted"
                            ? "Received"
                            : app.status === "in_review"
                              ? "In review"
                              : app.status === "approved"
                                ? "Approved"
                                : "Rejected"}
                        </AdminStatusBadge>
                      }
                    />
                  </li>
                ))}
              </ul>
            )}
          </AdminPanel>

          <AdminPanel>
            <AdminSectionTitle
              title="Newest members"
              actionHref="/admin/members"
              actionLabel="Manage members →"
            />
            {newestMembers.length === 0 ? (
              <div className="mt-4">
                <EmptyState
                  title="No promoted members yet"
                  description="Approve applicants after verifying TikTok Creator Network membership."
                  action={
                    <Button href="/admin/members" variant="secondary" className="min-h-[40px] px-4 text-sm">
                      Open members
                    </Button>
                  }
                />
              </div>
            ) : (
              <ul className="mt-4 space-y-2">
                {newestMembers.map((m) => (
                  <li key={m.id}>
                    <ActivityItem
                      href="/admin/members"
                      title={m.email ?? m.id.slice(0, 8)}
                      meta={`${m.role}${m.tiktok_username ? ` · @${m.tiktok_username.replace(/^@/, "")}` : ""} · ${formatShort(m.updated_at)}`}
                    />
                  </li>
                ))}
              </ul>
            )}
          </AdminPanel>

          <AdminPanel>
            <AdminSectionTitle
              title="Upcoming battles"
              actionHref="/admin/calendar"
              actionLabel="Calendar →"
            />
            {upcomingBattles.length === 0 ? (
              <div className="mt-4">
                <EmptyState
                  title="No upcoming battles"
                  description="Scheduled future battles from the network calendar will show here."
                  action={
                    <Button href="/battle-hub" variant="secondary" className="min-h-[40px] px-4 text-sm">
                      Open Battle Hub
                    </Button>
                  }
                />
              </div>
            ) : (
              <ul className="mt-4 space-y-2">
                {upcomingBattles.map((ev) => (
                  <li key={ev.id}>
                    <ActivityItem
                      href={`/admin/calendar/${ev.id}/edit`}
                      title={ev.title}
                      meta={`${formatShort(ev.scheduled_at)} · ${ev.format_label}`}
                      trailing={<AdminStatusBadge tone="success">{ev.status}</AdminStatusBadge>}
                    />
                  </li>
                ))}
              </ul>
            )}
          </AdminPanel>

          <AdminPanel>
            <AdminSectionTitle
              title="Recent activity"
              description="Latest first-party analytics events."
              actionHref="/admin/analytics"
              actionLabel="Analytics →"
            />
            {recentEvents.length === 0 ? (
              <div className="mt-4">
                <EmptyState
                  title="No events logged yet"
                  description="Page views and confirmed actions appear here once analytics writes succeed."
                />
              </div>
            ) : (
              <ul className="mt-4 space-y-2">
                {recentEvents.map((ev) => (
                  <li key={ev.id}>
                    <ActivityItem
                      title={ev.event_name}
                      meta={`${formatShort(ev.created_at)}${ev.route ? ` · ${ev.route}` : ""}`}
                    />
                  </li>
                ))}
              </ul>
            )}
          </AdminPanel>
        </div>

        {/* Quick links — denser than old card grid */}
        <div className="mt-10">
          <AdminSectionTitle title="Quick links" description="Jump to console tools." />
          <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { href: "/admin/applications", label: "Applications" },
              { href: "/admin/members", label: "Members" },
              { href: "/admin/calendar", label: "Calendar" },
              { href: "/admin/rankings", label: "Rankings" },
              { href: "/admin/creator-network", label: "CN imports" },
              { href: "/admin/streameru", label: "StreamerU" },
              { href: "/admin/analytics", label: "Analytics" },
              { href: "/battle-hub", label: "Battle Hub (public)" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl border border-border/70 bg-surface/80 px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent/35 hover:bg-accent-soft/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:border-zinc-800 dark:bg-zinc-950/40"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
