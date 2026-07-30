import Link from "next/link";
import { AdminCalendarEventActions } from "@/components/admin/AdminCalendarEventActions";
import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";
import { AdminStatusBadge } from "@/components/admin/ui/AdminStatusBadge";
import {
  AdminTable,
  AdminTableHead,
  AdminTd,
  AdminTh,
  AdminTr,
} from "@/components/admin/ui/AdminTable";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { StatCard } from "@/components/ui/StatCard";
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

function statusTone(status: string): "success" | "neutral" | "info" {
  if (status === "scheduled") return "success";
  if (status === "cancelled") return "neutral";
  return "info";
}

export default async function AdminCalendarPage() {
  await requireAdmin();
  let events: Awaited<ReturnType<typeof getAllBattleEventsForAdmin>> = [];
  try {
    events = await getAllBattleEventsForAdmin();
  } catch {
    events = [];
  }

  // eslint-disable-next-line react-hooks/purity -- upcoming filter uses wall clock
  const now = Date.now();
  const upcoming = events.filter(
    (e) => e.status === "scheduled" && new Date(e.scheduled_at).getTime() >= now,
  ).length;
  const cancelled = events.filter((e) => e.status === "cancelled").length;

  return (
    <section className="py-10 sm:py-14">
      <Container>
        <AdminPageHeader
          title="Network calendar"
          description="Edit, cancel, or delete battles. The public calendar only shows future scheduled events; changes apply to Battle Hub immediately."
          breadcrumbs={[
            { label: "Admin", href: "/admin" },
            { label: "Calendar" },
          ]}
          actions={
            <Link
              href="/battle-hub/calendar"
              className="text-sm font-semibold text-accent hover:underline dark:text-accent-muted"
            >
              Public calendar →
            </Link>
          }
        />

        {events.length > 0 ? (
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <StatCard label="Total events" value={events.length} accent />
            <StatCard label="Upcoming scheduled" value={upcoming} />
            <StatCard label="Cancelled" value={cancelled} />
          </div>
        ) : null}

        <div className="mt-8">
          {events.length === 0 ? (
            <EmptyState
              title="No events yet"
              description="Members can create battles from the scheduler; they appear here for moderation."
              illustration="battles"
              action={
                <Button href="/battle-hub" variant="secondary" className="min-h-[40px] px-4 text-sm">
                  Open Battle Hub
                </Button>
              }
            />
          ) : (
            <AdminTable caption="Battle events" minWidth="720px">
              <AdminTableHead>
                <AdminTr>
                  <AdminTh>When</AdminTh>
                  <AdminTh>Title</AdminTh>
                  <AdminTh className="hidden md:table-cell">Format</AdminTh>
                  <AdminTh>Status</AdminTh>
                  <AdminTh className="hidden lg:table-cell">Created by</AdminTh>
                  <AdminTh>Actions</AdminTh>
                </AdminTr>
              </AdminTableHead>
              <tbody>
                {events.map((ev) => (
                  <AdminTr key={ev.id}>
                    <AdminTd className="whitespace-nowrap text-muted">
                      {formatWhen(ev.scheduled_at, ev.timezone)}
                    </AdminTd>
                    <AdminTd className="max-w-[220px] font-medium">{ev.title}</AdminTd>
                    <AdminTd className="hidden text-muted md:table-cell">
                      {formatLabelToDisplay(ev.format_label, ev.participant_count)}
                    </AdminTd>
                    <AdminTd>
                      <AdminStatusBadge tone={statusTone(ev.status)}>{ev.status}</AdminStatusBadge>
                    </AdminTd>
                    <AdminTd className="hidden font-mono text-xs text-muted lg:table-cell">
                      {ev.created_by.slice(0, 8)}…
                    </AdminTd>
                    <AdminTd>
                      <AdminCalendarEventActions eventId={ev.id} status={ev.status} />
                    </AdminTd>
                  </AdminTr>
                ))}
              </tbody>
            </AdminTable>
          )}
        </div>
      </Container>
    </section>
  );
}
