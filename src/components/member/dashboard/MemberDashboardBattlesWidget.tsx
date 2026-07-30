import { ActivityItem } from "@/components/ui/ActivityItem";
import { Button } from "@/components/ui/Button";
import { DashboardWidget } from "@/components/ui/DashboardWidget";
import { EmptyState } from "@/components/ui/EmptyState";
import type { BattleEventWithParticipants } from "@/lib/battle-hub/types";

type MemberDashboardBattlesWidgetProps = {
  myUpcoming: BattleEventWithParticipants[];
  networkUpcoming: BattleEventWithParticipants[];
};

function formatWhen(iso: string, timezone: string): string {
  try {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZone: timezone || undefined,
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function vsLine(event: BattleEventWithParticipants): string {
  const parts = event.battle_event_participants ?? [];
  if (parts.length === 0) return event.format_label || event.event_type;
  const names = parts
    .slice(0, 3)
    .map((p) => `@${p.tiktok_username.replace(/^@/, "")}`)
    .join(" vs ");
  return parts.length > 3 ? `${names} +${parts.length - 3}` : names;
}

export function MemberDashboardBattlesWidget({
  myUpcoming,
  networkUpcoming,
}: MemberDashboardBattlesWidgetProps) {
  const mine = myUpcoming.slice(0, 2);
  const network = networkUpcoming.filter((e) => !mine.some((m) => m.id === e.id)).slice(0, 3);

  return (
    <DashboardWidget
      eyebrow="Battle Hub"
      title="Upcoming battles"
      actionHref="/battle-hub"
      actionLabel="Hub →"
    >
      {mine.length === 0 && network.length === 0 ? (
        <EmptyState
          title="No upcoming battles scheduled"
          description="Browse the network calendar or schedule your next match so the crew can show up ready."
          illustration="battles"
          action={
            <div className="flex flex-wrap gap-2">
              <Button href="/battle-hub/scheduler/new" variant="primary" className="min-h-[44px] px-4">
                Schedule a battle
              </Button>
              <Button href="/battle-hub/calendar" variant="secondary" className="min-h-[44px] px-4">
                Open calendar
              </Button>
            </div>
          }
        />
      ) : (
        <div className="space-y-4">
          {mine.length > 0 ? (
            <div className="space-y-2">
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-muted">
                You&apos;re hosting
              </p>
              {mine.map((event) => (
                <ActivityItem
                  key={event.id}
                  title={event.title}
                  meta={`${vsLine(event)} · ${formatWhen(event.scheduled_at, event.timezone)}`}
                  trailing={event.status}
                  href="/battle-hub"
                />
              ))}
            </div>
          ) : null}
          {network.length > 0 ? (
            <div className="space-y-2">
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-muted">
                On the network calendar
              </p>
              {network.map((event) => (
                <ActivityItem
                  key={event.id}
                  title={event.title}
                  meta={`${vsLine(event)} · ${formatWhen(event.scheduled_at, event.timezone)}`}
                  href="/battle-hub/calendar"
                />
              ))}
            </div>
          ) : null}
        </div>
      )}
    </DashboardWidget>
  );
}
