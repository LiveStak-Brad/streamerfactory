import { Container } from "@/components/ui/Container";
import { AnalyticsEvents } from "@/lib/analytics/events";
import { getAnalyticsEventCounts, getRecentAnalyticsEvents, ratioPart } from "@/lib/analytics/queries";
import { requireAdmin } from "@/lib/auth/server";

function n(map: Record<string, number>, key: string): number {
  return map[key] ?? 0;
}

export default async function AdminAnalyticsPage() {
  await requireAdmin();

  const now = Date.now();
  const d7 = new Date(now - 7 * 24 * 60 * 60 * 1000);
  const d30 = new Date(now - 30 * 24 * 60 * 60 * 1000);

  const [allRes, last7Res, last30Res, recentEvents] = await Promise.all([
    getAnalyticsEventCounts(null),
    getAnalyticsEventCounts(d7),
    getAnalyticsEventCounts(d30),
    getRecentAnalyticsEvents(10),
  ]);

  const all = allRes.counts;
  const last7 = last7Res.counts;
  const last30 = last30Res.counts;
  const aggregateError = allRes.error ?? last7Res.error ?? last30Res.error;

  const metrics = [
    {
      label: "Homepage views",
      keys: [AnalyticsEvents.HOMEPAGE_VIEWED],
    },
    {
      label: "Apply page views",
      keys: [AnalyticsEvents.APPLY_PAGE_VIEWED],
    },
    {
      label: "Application status page views",
      keys: [AnalyticsEvents.APPLICATION_STATUS_VIEWED],
    },
    {
      label: "Applications submitted",
      keys: [AnalyticsEvents.APPLICATION_SUBMITTED],
    },
    {
      label: "Applications resubmitted",
      keys: [AnalyticsEvents.APPLICATION_RESUBMITTED],
    },
    {
      label: "Applications approved",
      keys: [AnalyticsEvents.APPLICATION_APPROVED],
    },
    {
      label: "Applications rejected",
      keys: [AnalyticsEvents.APPLICATION_REJECTED],
    },
    {
      label: "Welcome views",
      keys: [AnalyticsEvents.WELCOME_VIEWED],
    },
    {
      label: "Onboarding completed",
      keys: [AnalyticsEvents.ONBOARDING_COMPLETED],
    },
    {
      label: "TikTok username set",
      keys: [AnalyticsEvents.TIKTOK_USERNAME_SET],
    },
    {
      label: "Timezone set",
      keys: [AnalyticsEvents.TIMEZONE_SET],
    },
    {
      label: "Battle requests created",
      keys: [AnalyticsEvents.BATTLE_REQUEST_CREATED],
    },
    {
      label: "Battle requests joined",
      keys: [AnalyticsEvents.BATTLE_REQUEST_JOINED],
    },
    {
      label: "Battle requests matched",
      keys: [AnalyticsEvents.BATTLE_REQUEST_MATCHED],
    },
    {
      label: "Battle requests promoted",
      keys: [AnalyticsEvents.BATTLE_REQUEST_PROMOTED],
    },
    {
      label: "Battle events created",
      keys: [AnalyticsEvents.BATTLE_EVENT_CREATED],
    },
    {
      label: "Lesson views",
      keys: [AnalyticsEvents.RESOURCE_VIEWED],
    },
    {
      label: "StreamerU index views",
      keys: [AnalyticsEvents.RESOURCES_PAGE_VIEWED],
    },
    {
      label: "Start your training views",
      keys: [AnalyticsEvents.START_HERE_VIEWED],
    },
    {
      label: "Start Here checklist acknowledged (welcome)",
      keys: [AnalyticsEvents.START_HERE_OPENED],
    },
    {
      label: "Battle Hub views",
      keys: [AnalyticsEvents.BATTLE_HUB_VIEWED],
    },
    {
      label: "Battle Finder views",
      keys: [AnalyticsEvents.BATTLE_FINDER_VIEWED],
    },
    {
      label: "Battle calendar views",
      keys: [AnalyticsEvents.BATTLE_CALENDAR_VIEWED],
    },
    {
      label: "Battle scheduler views",
      keys: [AnalyticsEvents.BATTLE_SCHEDULER_OPENED],
    },
  ] as const;

  const sumKeys = (map: Record<string, number>, keys: readonly string[]) =>
    keys.reduce((acc, k) => acc + n(map, k), 0);

  const approvalRate7 = ratioPart(
    sumKeys(last7, [AnalyticsEvents.APPLICATION_APPROVED]),
    sumKeys(last7, [AnalyticsEvents.APPLICATION_APPROVED, AnalyticsEvents.APPLICATION_REJECTED]),
  );
  const approvalRate30 = ratioPart(
    sumKeys(last30, [AnalyticsEvents.APPLICATION_APPROVED]),
    sumKeys(last30, [AnalyticsEvents.APPLICATION_APPROVED, AnalyticsEvents.APPLICATION_REJECTED]),
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

  return (
    <section className="py-10 sm:py-14">
      <Container className="max-w-5xl">
        <p className="text-sm font-medium uppercase tracking-wider text-accent dark:text-accent-muted">Admin</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">Analytics</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          First-party product events (page views + server-confirmed actions). Anonymous visitors appear in page-view
          counts without a user id; funnel ratios are best-effort and not unique-user cohorts.
        </p>

        {aggregateError ? (
          <div
            className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-100"
            role="alert"
          >
            <p className="font-semibold">Could not load aggregate counts</p>
            <p className="mt-1 font-mono text-xs opacity-90">{aggregateError}</p>
            <p className="mt-2 text-xs opacity-90">
              Typical causes: migration <code className="rounded bg-black/5 px-1 py-0.5 dark:bg-white/10">20250425130000_analytics_admin_rpc.sql</code> not applied, or RPC name mismatch. Recent events below still work if the table exists.
            </p>
          </div>
        ) : null}

        <div className="mt-8 overflow-x-auto rounded-2xl border border-zinc-200/90 dark:border-zinc-800">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-200/90 bg-muted-bg/60 dark:border-zinc-800 dark:bg-zinc-950/50">
                <th className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-100">Metric</th>
                <th className="px-4 py-3 font-semibold text-zinc-700 dark:text-zinc-300">Last 7 days</th>
                <th className="px-4 py-3 font-semibold text-zinc-700 dark:text-zinc-300">Last 30 days</th>
                <th className="px-4 py-3 font-semibold text-zinc-700 dark:text-zinc-300">All time</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-zinc-100 dark:border-zinc-800/80">
                <td className="px-4 py-3 font-medium text-zinc-800 dark:text-zinc-200">Approval rate (approved ÷ decided)</td>
                <td className="px-4 py-3 tabular-nums text-zinc-700 dark:text-zinc-300">
                  {approvalRate7 != null ? `${approvalRate7}%` : "—"}
                </td>
                <td className="px-4 py-3 tabular-nums text-zinc-700 dark:text-zinc-300">
                  {approvalRate30 != null ? `${approvalRate30}%` : "—"}
                </td>
                <td className="px-4 py-3 tabular-nums text-zinc-700 dark:text-zinc-300">
                  {ratioPart(
                    sumKeys(all, [AnalyticsEvents.APPLICATION_APPROVED]),
                    sumKeys(all, [
                      AnalyticsEvents.APPLICATION_APPROVED,
                      AnalyticsEvents.APPLICATION_REJECTED,
                    ]),
                  ) != null
                    ? `${ratioPart(
                        sumKeys(all, [AnalyticsEvents.APPLICATION_APPROVED]),
                        sumKeys(all, [
                          AnalyticsEvents.APPLICATION_APPROVED,
                          AnalyticsEvents.APPLICATION_REJECTED,
                        ]),
                      )}%`
                    : "—"}
                </td>
              </tr>
              {metrics.map((m) => (
                <tr
                  key={m.label}
                  className="border-b border-zinc-100 last:border-0 dark:border-zinc-800/80"
                >
                  <td className="px-4 py-3 text-zinc-800 dark:text-zinc-200">{m.label}</td>
                  <td className="px-4 py-3 tabular-nums text-zinc-600 dark:text-zinc-400">
                    {sumKeys(last7, m.keys)}
                  </td>
                  <td className="px-4 py-3 tabular-nums text-zinc-600 dark:text-zinc-400">
                    {sumKeys(last30, m.keys)}
                  </td>
                  <td className="px-4 py-3 tabular-nums text-zinc-600 dark:text-zinc-400">
                    {sumKeys(all, m.keys)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="mt-10 text-lg font-bold text-zinc-950 dark:text-zinc-50">Recent events (latest 10)</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Staff-only diagnostic: confirms writes are reaching <code className="rounded bg-muted-bg px-1 py-0.5 text-zinc-700 dark:text-zinc-300">analytics_events</code>. User ids are shown as opaque UUIDs.
        </p>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-zinc-200/90 dark:border-zinc-800">
          <table className="w-full min-w-[720px] border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-zinc-200/90 bg-muted-bg/60 dark:border-zinc-800 dark:bg-zinc-950/50">
                <th className="px-3 py-2 font-semibold text-zinc-900 dark:text-zinc-100">Time (UTC)</th>
                <th className="px-3 py-2 font-semibold text-zinc-900 dark:text-zinc-100">Event</th>
                <th className="px-3 py-2 font-semibold text-zinc-900 dark:text-zinc-100">Route</th>
                <th className="px-3 py-2 font-semibold text-zinc-900 dark:text-zinc-100">Resource</th>
                <th className="px-3 py-2 font-semibold text-zinc-900 dark:text-zinc-100">User id</th>
              </tr>
            </thead>
            <tbody>
              {recentEvents.length === 0 ? (
                <tr>
                  <td className="px-3 py-4 text-zinc-500 dark:text-zinc-400" colSpan={5}>
                    No rows yet — trigger a page view or complete an action, then refresh. If this stays empty, check
                    that migrations ran and RLS allows inserts.
                  </td>
                </tr>
              ) : (
                recentEvents.map((ev) => (
                  <tr key={ev.id} className="border-b border-zinc-100 last:border-0 dark:border-zinc-800/80">
                    <td className="px-3 py-2 tabular-nums text-zinc-600 dark:text-zinc-400">
                      {new Date(ev.created_at).toISOString().replace("T", " ").slice(0, 19)}
                    </td>
                    <td className="px-3 py-2 font-mono text-zinc-800 dark:text-zinc-200">{ev.event_name}</td>
                    <td className="max-w-[200px] truncate px-3 py-2 font-mono text-zinc-600 dark:text-zinc-400">
                      {ev.route ?? "—"}
                    </td>
                    <td className="max-w-[140px] truncate px-3 py-2 font-mono text-zinc-600 dark:text-zinc-400">
                      {ev.resource_slug ?? "—"}
                    </td>
                    <td className="max-w-[120px] truncate px-3 py-2 font-mono text-zinc-500 dark:text-zinc-500">
                      {ev.user_id ?? "—"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <h2 className="mt-12 text-lg font-bold text-zinc-950 dark:text-zinc-50">Funnel snapshots (30 days)</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Ratios use raw event counts, not unique users. Anonymous traffic affects top-of-funnel steps.
        </p>
        <ul className="mt-4 space-y-2 text-sm">
          {funnelRows.map((row) => {
            const r = ratioPart(row.num, row.den);
            return (
              <li
                key={row.label}
                className="flex flex-wrap items-baseline justify-between gap-2 rounded-xl border border-zinc-200/80 bg-surface/80 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950/40"
              >
                <span className="font-medium text-zinc-800 dark:text-zinc-200">{row.label}</span>
                <span className="tabular-nums text-zinc-600 dark:text-zinc-400">
                  {row.num} / {row.den}
                  {r != null ? ` (${r}%)` : ""}
                </span>
              </li>
            );
          })}
        </ul>

        <p className="mt-10 text-xs leading-relaxed text-zinc-500 dark:text-zinc-500">
          Events are stored in <code className="rounded bg-muted-bg px-1 py-0.5 text-zinc-700 dark:text-zinc-300">analytics_events</code>.
          Sensitive data is not duplicated in event payloads. Failed analytics writes are logged and never block user
          flows.
        </p>
      </Container>
    </section>
  );
}
