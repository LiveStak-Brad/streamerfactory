import Link from "next/link";
import { AdminCalendarEventActions } from "@/components/admin/AdminCalendarEventActions";
import { Container } from "@/components/ui/Container";
import { formatLabelToDisplay } from "@/lib/battle-hub/formats";
import { getAllBattleEventsForAdmin } from "@/lib/battle-hub/queries";
import { requireAdmin } from "@/lib/auth/server";

function formatWhen(iso: string, tz: string) {
  try {
    return new Date(iso).toLocaleString("en-US", {
      timeZone: tz,
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return new Date(iso).toLocaleString("en-US");
  }
}

function statusBadge(status: string) {
  const base = "inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold";
  if (status === "scheduled")
    return `${base} border border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900/50 dark:bg-emerald-950/50 dark:text-emerald-200`;
  if (status === "cancelled")
    return `${base} border border-zinc-200 bg-zinc-100 text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300`;
  return `${base} border border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-900/50 dark:bg-blue-950/50 dark:text-blue-200`;
}

export default async function AdminCalendarPage() {
  await requireAdmin();
  let events: Awaited<ReturnType<typeof getAllBattleEventsForAdmin>> = [];
  try {
    events = await getAllBattleEventsForAdmin();
  } catch {
    events = [];
  }

  return (
    <section className="py-12 sm:py-16">
      <Container className="max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-accent dark:text-accent-muted">
              Admin
            </p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
              Network calendar
            </h1>
            <p className="mt-2 max-w-2xl text-zinc-600 dark:text-zinc-400">
              View, edit, cancel, or delete scheduled battles. Changes apply to the public Battle Hub calendar
              immediately.
            </p>
          </div>
          <Link
            href="/battle-hub/calendar"
            className="text-sm font-semibold text-accent hover:underline dark:text-accent-muted"
          >
            Open public calendar →
          </Link>
        </div>

        {events.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-zinc-300/90 bg-muted-bg/40 px-6 py-14 text-center dark:border-zinc-700 dark:bg-zinc-950/40">
            <p className="font-semibold text-zinc-800 dark:text-zinc-200">No events yet</p>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Members can create battles from the scheduler; they will appear here.
            </p>
          </div>
        ) : (
          <div className="mt-10 overflow-x-auto rounded-2xl border border-zinc-200/90 dark:border-zinc-800">
            <table className="w-full min-w-[720px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-zinc-200/90 bg-muted-bg/50 dark:border-zinc-800 dark:bg-zinc-900/40">
                  <th className="px-4 py-3 font-semibold text-zinc-700 dark:text-zinc-300">When</th>
                  <th className="px-4 py-3 font-semibold text-zinc-700 dark:text-zinc-300">Title</th>
                  <th className="px-4 py-3 font-semibold text-zinc-700 dark:text-zinc-300">Format</th>
                  <th className="px-4 py-3 font-semibold text-zinc-700 dark:text-zinc-300">Status</th>
                  <th className="px-4 py-3 font-semibold text-zinc-700 dark:text-zinc-300">Created by</th>
                  <th className="px-4 py-3 font-semibold text-zinc-700 dark:text-zinc-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map((ev) => (
                  <tr
                    key={ev.id}
                    className="border-b border-zinc-100/90 dark:border-zinc-800/80 last:border-0"
                  >
                    <td className="px-4 py-3 align-top text-zinc-600 dark:text-zinc-400">
                      {formatWhen(ev.scheduled_at, ev.timezone)}
                    </td>
                    <td className="max-w-[220px] px-4 py-3 align-top font-medium text-zinc-900 dark:text-zinc-100">
                      {ev.title}
                    </td>
                    <td className="px-4 py-3 align-top text-zinc-600 dark:text-zinc-400">
                      {formatLabelToDisplay(ev.format_label, ev.participant_count)}
                    </td>
                    <td className="px-4 py-3 align-top">
                      <span className={statusBadge(ev.status)}>{ev.status}</span>
                    </td>
                    <td className="px-4 py-3 align-top font-mono text-xs text-zinc-500">
                      {ev.created_by.slice(0, 8)}…
                    </td>
                    <td className="px-4 py-3 align-top">
                      <AdminCalendarEventActions eventId={ev.id} status={ev.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Container>
    </section>
  );
}
