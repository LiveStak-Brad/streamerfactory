import Link from "next/link";
import { formatLabelToDisplay } from "@/lib/battle-hub/formats";
import {
  battleTitleOrFallback,
  formatBattleScheduleTime,
} from "@/lib/battle-hub/display";
import type { BattleEventWithParticipants } from "@/lib/battle-hub/types";

type BattleCardProps = {
  event: BattleEventWithParticipants;
  featured?: boolean;
  href?: string;
  isHosting?: boolean;
  className?: string;
};

function countdownLabel(scheduledAt: string): string | null {
  const target = new Date(scheduledAt).getTime();
  if (!Number.isFinite(target)) return null;
  const diffMs = target - Date.now();
  if (diffMs <= 0) return null; // do not claim "live" without confirmation
  const mins = Math.floor(diffMs / 60000);
  if (mins < 60) return `Starts in ${mins}m`;
  const hours = Math.floor(mins / 60);
  if (hours < 48) return `Starts in ${hours}h`;
  const days = Math.floor(hours / 24);
  return `Starts in ${days}d`;
}

function vsLine(event: BattleEventWithParticipants): string {
  const parts = [...(event.battle_event_participants ?? [])].sort(
    (a, b) => a.slot_order - b.slot_order,
  );
  if (parts.length === 0) return "Participants TBA";
  if (parts.length === 1) return `@${parts[0].tiktok_username.replace(/^@/, "")}`;
  if (parts.length === 2) {
    return `@${parts[0].tiktok_username.replace(/^@/, "")} vs @${parts[1].tiktok_username.replace(/^@/, "")}`;
  }
  return parts
    .slice(0, 4)
    .map((p) => `@${p.tiktok_username.replace(/^@/, "")}`)
    .join(" · ");
}

/**
 * Event-style battle card. Countdown only when scheduled_at is in the future.
 * Never implies a battle is live unless status data confirms it.
 */
export function BattleCard({
  event,
  featured = false,
  href = "/battle-hub/calendar",
  isHosting = false,
  className = "",
}: BattleCardProps) {
  const format = formatLabelToDisplay(event.format_label, event.participant_count);
  const when = formatBattleScheduleTime(event.scheduled_at, event.timezone);
  const countdown = countdownLabel(event.scheduled_at);
  const title = battleTitleOrFallback(event.title);
  const matchup = vsLine(event);

  const body = (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-lg border border-white/15 bg-white/10 px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-zinc-200">
          {format}
        </span>
        <span className="rounded-lg border border-white/10 bg-black/20 px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-zinc-400">
          {event.status}
        </span>
        {isHosting ? (
          <span className="rounded-lg border border-accent/40 bg-accent/20 px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-accent-muted">
            You&apos;re hosting
          </span>
        ) : null}
        {countdown ? (
          <span className="rounded-lg border border-emerald-400/30 bg-emerald-500/15 px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-emerald-200">
            {countdown}
          </span>
        ) : null}
      </div>
      <h3
        className={`mt-3 font-bold tracking-tight text-white ${featured ? "text-2xl sm:text-3xl" : "text-lg"}`}
      >
        {title}
      </h3>
      <p className={`mt-2 font-semibold text-zinc-200 ${featured ? "text-base sm:text-lg" : "text-sm"}`}>
        {matchup}
      </p>
      <p className={`mt-3 font-medium text-zinc-400 ${featured ? "text-base" : "text-sm"}`}>{when}</p>
      <p className="mt-4 text-sm font-semibold text-accent-muted">
        {featured ? "Open calendar →" : "View on calendar →"}
      </p>
    </>
  );

  if (featured) {
    return (
      <Link
        href={href}
        className={`group relative block overflow-hidden rounded-3xl border border-white/10 bg-[#0b0a12] p-6 shadow-[0_24px_60px_-36px_rgba(255, 46, 209,0.35)] transition-transform hover:-translate-y-0.5 motion-reduce:transform-none sm:p-8 ${className}`}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_0%_0%,rgba(255, 46, 209,0.28),transparent_55%),radial-gradient(ellipse_50%_50%_at_100%_20%,rgba(91, 59, 255,0.3),transparent_50%)]"
          aria-hidden
        />
        <div className="relative">{body}</div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={`block rounded-2xl border border-border/80 bg-surface/95 p-4 shadow-sm transition-[transform,border-color,box-shadow] hover:-translate-y-0.5 hover:border-accent/35 hover:shadow-md motion-reduce:transform-none dark:border-zinc-800 dark:bg-zinc-950/55 sm:p-5 ${className}`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-lg border border-border bg-muted-bg px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-foreground/80">
          {format}
        </span>
        <span className="rounded-lg border border-border/80 px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-muted">
          {event.status}
        </span>
        {isHosting ? (
          <span className="rounded-lg border border-accent/30 bg-accent-soft px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-accent dark:text-accent-muted">
            Hosting
          </span>
        ) : null}
        {countdown ? (
          <span className="rounded-lg border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
            {countdown}
          </span>
        ) : null}
      </div>
      <h3 className="mt-3 text-base font-bold tracking-tight text-foreground">{title}</h3>
      <p className="mt-1 text-sm font-semibold text-foreground/85">{matchup}</p>
      <p className="mt-2 text-sm text-muted">{when}</p>
    </Link>
  );
}
