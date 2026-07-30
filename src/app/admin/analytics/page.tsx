import { AdminAlert } from "@/components/admin/ui/AdminAlert";
import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";
import { AdminPanel } from "@/components/admin/ui/AdminPanel";
import { AdminSectionTitle } from "@/components/admin/ui/AdminSectionTitle";
import {
  AdminTable,
  AdminTableHead,
  AdminTd,
  AdminTh,
  AdminTr,
} from "@/components/admin/ui/AdminTable";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { StatCard } from "@/components/ui/StatCard";
import { AnalyticsEvents } from "@/lib/analytics/events";
import { getAnalyticsEventCounts, getRecentAnalyticsEvents, ratioPart } from "@/lib/analytics/queries";
import { requireAdmin } from "@/lib/auth/server";
import Link from "next/link";

function n(map: Record<string, number>, key: string): number {
  return map[key] ?? 0;
}

function trendHint(current: number, previousWindowApprox: number): string | undefined {
  if (previousWindowApprox <= 0 && current <= 0) return undefined;
  if (previousWindowApprox <= 0) return "Up vs quieter prior window";
  const delta = ((current - previousWindowApprox) / previousWindowApprox) * 100;
  if (Math.abs(delta) < 5) return "Flat vs prior window";
  return delta > 0 ? `↑ ${Math.round(delta)}% vs prior window` : `↓ ${Math.round(Math.abs(delta))}% vs prior window`;
}

export default async function AdminAnalyticsPage() {
  await requireAdmin();

  // eslint-disable-next-line react-hooks/purity -- analytics windows are wall-clock relative
  const now = Date.now();
  const d7 = new Date(now - 7 * 24 * 60 * 60 * 1000);
  const d30 = new Date(now - 30 * 24 * 60 * 60 * 1000);
  const d14 = new Date(now - 14 * 24 * 60 * 60 * 1000);

  const [allRes, last7Res, last30Res, last14Res, recentEvents] = await Promise.all([
    getAnalyticsEventCounts(null),
    getAnalyticsEventCounts(d7),
    getAnalyticsEventCounts(d30),
    getAnalyticsEventCounts(d14),
    getRecentAnalyticsEvents(10),
  ]);

  const all = allRes.counts;
  const last7 = last7Res.counts;
  const last30 = last30Res.counts;
  const last14 = last14Res.counts;
  const aggregateError = allRes.error ?? last7Res.error ?? last30Res.error ?? last14Res.error;

  const metrics = [
    { label: "Homepage views", keys: [AnalyticsEvents.HOMEPAGE_VIEWED] },
    { label: "Apply page views", keys: [AnalyticsEvents.APPLY_PAGE_VIEWED] },
    { label: "Application status page views", keys: [AnalyticsEvents.APPLICATION_STATUS_VIEWED] },
    { label: "Applications submitted", keys: [AnalyticsEvents.APPLICATION_SUBMITTED] },
    { label: "Applications resubmitted", keys: [AnalyticsEvents.APPLICATION_RESUBMITTED] },
    { label: "Applications approved", keys: [AnalyticsEvents.APPLICATION_APPROVED] },
    { label: "Applications rejected", keys: [AnalyticsEvents.APPLICATION_REJECTED] },
    { label: "Welcome views", keys: [AnalyticsEvents.WELCOME_VIEWED] },
    { label: "Onboarding completed", keys: [AnalyticsEvents.ONBOARDING_COMPLETED] },
    { label: "TikTok username set", keys: [AnalyticsEvents.TIKTOK_USERNAME_SET] },
    { label: "Timezone set", keys: [AnalyticsEvents.TIMEZONE_SET] },
    { label: "Battle requests created", keys: [AnalyticsEvents.BATTLE_REQUEST_CREATED] },
    { label: "Battle requests joined", keys: [AnalyticsEvents.BATTLE_REQUEST_JOINED] },
    { label: "Battle requests matched", keys: [AnalyticsEvents.BATTLE_REQUEST_MATCHED] },
    { label: "Battle requests promoted", keys: [AnalyticsEvents.BATTLE_REQUEST_PROMOTED] },
    { label: "Battle events created", keys: [AnalyticsEvents.BATTLE_EVENT_CREATED] },
    { label: "Lesson views", keys: [AnalyticsEvents.RESOURCE_VIEWED] },
    { label: "StreamerU index views", keys: [AnalyticsEvents.RESOURCES_PAGE_VIEWED] },
    { label: "Start your training views", keys: [AnalyticsEvents.START_HERE_VIEWED] },
    {
      label: "Start Here checklist acknowledged (welcome)",
      keys: [AnalyticsEvents.START_HERE_OPENED],
    },
    { label: "Battle Hub views", keys: [AnalyticsEvents.BATTLE_HUB_VIEWED] },
    { label: "Battle Finder views", keys: [AnalyticsEvents.BATTLE_FINDER_VIEWED] },
    { label: "Battle calendar views", keys: [AnalyticsEvents.BATTLE_CALENDAR_VIEWED] },
    { label: "Battle scheduler views", keys: [AnalyticsEvents.BATTLE_SCHEDULER_OPENED] },
  ] as const;

  const sumKeys = (map: Record<string, number>, keys: readonly string[]) =>
    keys.reduce((acc, k) => acc + n(map, k), 0);

  /** Approximate prior 7d = 14d total − last 7d (same metric keys). */
  const prior7Approx = (keys: readonly string[]) =>
    Math.max(0, sumKeys(last14, keys) - sumKeys(last7, keys));

  const approvalRate7 = ratioPart(
    sumKeys(last7, [AnalyticsEvents.APPLICATION_APPROVED]),
    sumKeys(last7, [AnalyticsEvents.APPLICATION_APPROVED, AnalyticsEvents.APPLICATION_REJECTED]),
  );
  const approvalRate30 = ratioPart(
    sumKeys(last30, [AnalyticsEvents.APPLICATION_APPROVED]),
    sumKeys(last30, [AnalyticsEvents.APPLICATION_APPROVED, AnalyticsEvents.APPLICATION_REJECTED]),
  );
  const approvalRateAll = ratioPart(
    sumKeys(all, [AnalyticsEvents.APPLICATION_APPROVED]),
    sumKeys(all, [AnalyticsEvents.APPLICATION_APPROVED, AnalyticsEvents.APPLICATION_REJECTED]),
  );

  const funnelRows = [
    {
      label: "Homepage view → apply page view",
      num: sumKeys(last30, [AnalyticsEvents.APPLY_PAGE_VIEWED]),
      den: sumKeys(last30, [AnalyticsEvents.HOMEPAGE_VIEWED]),
    },
    {
      label: "Apply page view → application submitted",
      num: sumKeys(last30, [
        AnalyticsEvents.APPLICATION_SUBMITTED,
        AnalyticsEvents.APPLICATION_RESUBMITTED,
      ]),
      den: sumKeys(last30, [AnalyticsEvents.APPLY_PAGE_VIEWED]),
    },
    {
      label: "Application submitted → approved (counts)",
      num: sumKeys(last30, [AnalyticsEvents.APPLICATION_APPROVED]),
      den: sumKeys(last30, [
        AnalyticsEvents.APPLICATION_SUBMITTED,
        AnalyticsEvents.APPLICATION_RESUBMITTED,
      ]),
    },
    {
      label: "Approved → welcome viewed",
      num: sumKeys(last30, [AnalyticsEvents.WELCOME_VIEWED]),
      den: sumKeys(last30, [AnalyticsEvents.APPLICATION_APPROVED]),
    },
    {
      label: "Welcome viewed → onboarding completed",
      num: sumKeys(last30, [AnalyticsEvents.ONBOARDING_COMPLETED]),
      den: sumKeys(last30, [AnalyticsEvents.WELCOME_VIEWED]),
    },
    {
      label: "Onboarding completed → battle request or event",
      num: sumKeys(last30, [
        AnalyticsEvents.BATTLE_REQUEST_CREATED,
        AnalyticsEvents.BATTLE_EVENT_CREATED,
      ]),
      den: sumKeys(last30, [AnalyticsEvents.ONBOARDING_COMPLETED]),
    },
  ];

  const highlightMetrics = [
    {
      label: "Applications submitted",
      keys: [AnalyticsEvents.APPLICATION_SUBMITTED] as const,
    },
    {
      label: "Homepage views",
      keys: [AnalyticsEvents.HOMEPAGE_VIEWED] as const,
    },
    {
      label: "Battle Hub views",
      keys: [AnalyticsEvents.BATTLE_HUB_VIEWED] as const,
    },
    {
      label: "Lesson views",
      keys: [AnalyticsEvents.RESOURCE_VIEWED] as const,
    },
  ];

  return (
    <section className="py-10 sm:py-14">
      <Container>
        <AdminPageHeader
          title="Analytics"
          description="First-party product events (page views + server-confirmed actions). Anonymous visitors appear in page-view counts without a user id; funnel ratios are best-effort and not unique-user cohorts."
          breadcrumbs={[
            { label: "Admin", href: "/admin" },
            { label: "Analytics" },
          ]}
        />

        {aggregateError ? (
          <div className="mt-6">
            <AdminAlert title="Could not load aggregate counts" tone="warning">
              <p className="font-mono text-xs opacity-90">{aggregateError}</p>
              <p className="mt-2">
                Typical causes: migration{" "}
                <code className="rounded bg-black/5 px-1 py-0.5 dark:bg-white/10">
                  20250425130000_analytics_admin_rpc.sql
                </code>{" "}
                not applied, or RPC name mismatch. Recent events below still work if the table exists.
              </p>
            </AdminAlert>
          </div>
        ) : null}

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Approval rate (7d)"
            value={approvalRate7 != null ? `${approvalRate7}%` : "—"}
            hint="Approved ÷ decided"
            accent
          />
          <StatCard
            label="Approval rate (30d)"
            value={approvalRate30 != null ? `${approvalRate30}%` : "—"}
            hint="Approved ÷ decided"
          />
          <StatCard
            label="Approval rate (all)"
            value={approvalRateAll != null ? `${approvalRateAll}%` : "—"}
            hint="Approved ÷ decided"
          />
          <StatCard
            label="Events sampled"
            value={recentEvents.length}
            hint="Latest diagnostic rows below"
          />
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {highlightMetrics.map((m) => {
            const v7 = sumKeys(last7, m.keys);
            const prior = prior7Approx(m.keys);
            return (
              <StatCard key={m.label} label={`${m.label} (7d)`} value={v7} hint={trendHint(v7, prior)} />
            );
          })}
        </div>

        <div className="mt-10">
          <AdminSectionTitle
            title="Event counts"
            description="Windows: last 7 days · last 30 days · all time. Trends on highlight cards compare last 7d to the prior 7d (from 14d totals)."
          />
          <div className="mt-4">
            <AdminTable caption="Analytics event counts" minWidth="680px">
              <AdminTableHead>
                <AdminTr>
                  <AdminTh>Metric</AdminTh>
                  <AdminTh>Last 7 days</AdminTh>
                  <AdminTh>Last 30 days</AdminTh>
                  <AdminTh>All time</AdminTh>
                </AdminTr>
              </AdminTableHead>
              <tbody>
                <AdminTr className="bg-muted-bg/40 dark:bg-zinc-900/30">
                  <AdminTd className="font-medium">Approval rate (approved ÷ decided)</AdminTd>
                  <AdminTd className="tabular-nums text-muted">
                    {approvalRate7 != null ? `${approvalRate7}%` : "—"}
                  </AdminTd>
                  <AdminTd className="tabular-nums text-muted">
                    {approvalRate30 != null ? `${approvalRate30}%` : "—"}
                  </AdminTd>
                  <AdminTd className="tabular-nums text-muted">
                    {approvalRateAll != null ? `${approvalRateAll}%` : "—"}
                  </AdminTd>
                </AdminTr>
                {metrics.map((m) => (
                  <AdminTr key={m.label}>
                    <AdminTd>{m.label}</AdminTd>
                    <AdminTd className="tabular-nums text-muted">{sumKeys(last7, m.keys)}</AdminTd>
                    <AdminTd className="tabular-nums text-muted">{sumKeys(last30, m.keys)}</AdminTd>
                    <AdminTd className="tabular-nums text-muted">{sumKeys(all, m.keys)}</AdminTd>
                  </AdminTr>
                ))}
              </tbody>
            </AdminTable>
          </div>
        </div>

        <div className="mt-10">
          <AdminSectionTitle
            title="Funnel snapshots (30 days)"
            description="Ratios use raw event counts, not unique users. Anonymous traffic affects top-of-funnel steps."
          />
          <ul className="mt-4 space-y-2">
            {funnelRows.map((row) => {
              const r = ratioPart(row.num, row.den);
              const pct = r ?? 0;
              return (
                <li key={row.label}>
                  <AdminPanel className="!p-4">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className="text-sm font-medium text-foreground">{row.label}</span>
                      <span className="tabular-nums text-sm text-muted">
                        {row.num} / {row.den}
                        {r != null ? ` (${r}%)` : ""}
                      </span>
                    </div>
                    <div
                      className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted-bg dark:bg-zinc-800"
                      role="presentation"
                    >
                      <div
                        className="h-full rounded-full bg-gradient-brand transition-[width] duration-500 motion-reduce:transition-none"
                        style={{ width: `${Math.min(100, Math.max(0, pct))}%` }}
                      />
                    </div>
                  </AdminPanel>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-10">
          <AdminSectionTitle
            title="Recent events"
            description={
              <>
                Staff diagnostic: confirms writes reach{" "}
                <code className="rounded bg-muted-bg px-1 py-0.5 text-xs">analytics_events</code>. User
                ids are opaque UUIDs.
              </>
            }
          />
          <div className="mt-4">
            {recentEvents.length === 0 ? (
              <EmptyState
                title="No events yet"
                description="Trigger a page view or complete an action, then refresh. If this stays empty, check migrations and RLS inserts."
              />
            ) : (
              <AdminTable caption="Recent analytics events" minWidth="720px">
                <AdminTableHead>
                  <AdminTr>
                    <AdminTh>Time (UTC)</AdminTh>
                    <AdminTh>Event</AdminTh>
                    <AdminTh>Route</AdminTh>
                    <AdminTh>Resource</AdminTh>
                    <AdminTh>User id</AdminTh>
                  </AdminTr>
                </AdminTableHead>
                <tbody>
                  {recentEvents.map((ev) => (
                    <AdminTr key={ev.id}>
                      <AdminTd className="whitespace-nowrap tabular-nums text-muted">
                        {new Date(ev.created_at).toISOString().replace("T", " ").slice(0, 19)}
                      </AdminTd>
                      <AdminTd className="font-mono text-xs">{ev.event_name}</AdminTd>
                      <AdminTd className="max-w-[200px] truncate font-mono text-xs text-muted">
                        {ev.route ?? "—"}
                      </AdminTd>
                      <AdminTd className="max-w-[140px] truncate font-mono text-xs text-muted">
                        {ev.resource_slug ?? "—"}
                      </AdminTd>
                      <AdminTd className="max-w-[120px] truncate font-mono text-xs text-muted">
                        {ev.user_id ?? "—"}
                      </AdminTd>
                    </AdminTr>
                  ))}
                </tbody>
              </AdminTable>
            )}
          </div>
        </div>

        <p className="mt-10 text-xs leading-relaxed text-muted">
          Events are stored in{" "}
          <code className="rounded bg-muted-bg px-1 py-0.5">analytics_events</code>. Sensitive data is
          not duplicated in event payloads. Failed analytics writes are logged and never block user flows.{" "}
          <Link href="/admin" className="font-semibold text-accent hover:underline dark:text-accent-muted">
            ← Dashboard
          </Link>
        </p>
      </Container>
    </section>
  );
}
