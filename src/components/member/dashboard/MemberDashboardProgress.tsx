import { ProgressRing } from "@/components/ui/ProgressRing";
import { StatCard } from "@/components/ui/StatCard";
import { formatDiamondsEarned } from "@/lib/rankings/diamonds";
import { nextMilestoneMessage } from "@/lib/rankings/scoring";
import type { LeaderboardEntry } from "@/lib/rankings/types";

type MemberDashboardProgressProps = {
  entry: LeaderboardEntry | null;
  leaderboardSize: number;
};

/**
 * Progress toward Top 10 / Top 3 / #1 using real rank position only.
 * Ring = how close to #1 on the board (inverse of position), not invented XP.
 */
function rankProgressPercent(rankPosition: number | null, size: number): number {
  if (rankPosition == null || size <= 1) return 0;
  return Math.max(0, Math.min(100, ((size - rankPosition) / (size - 1)) * 100));
}

export function MemberDashboardProgress({ entry, leaderboardSize }: MemberDashboardProgressProps) {
  const rank = entry?.rank_position ?? null;
  const progress = rankProgressPercent(rank, leaderboardSize);
  const milestone = nextMilestoneMessage(
    rank,
    entry?.rank_score ?? 0,
    {
      hours_streamed: entry?.hours_streamed ?? 0,
      coins_earned: entry?.coins_earned ?? 0,
    },
    leaderboardSize,
  );

  return (
    <section className="rounded-3xl border border-border/80 bg-surface/90 p-5 shadow-[var(--shadow-card)] dark:border-zinc-800 dark:bg-zinc-950/50 sm:p-6">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <div className="flex shrink-0 justify-center sm:justify-start">
          <ProgressRing
            value={progress}
            size={120}
            label="Board climb"
            sublabel={rank != null ? `#${rank} of ${leaderboardSize || "—"}` : "No rank yet"}
            toneClassName="text-violet-500 dark:text-violet-400"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-accent dark:text-accent-muted">
            This month
          </p>
          <h2 className="mt-1 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            Monthly performance
          </h2>
          {milestone ? (
            <p className="mt-2 text-sm leading-relaxed text-muted">{milestone}</p>
          ) : null}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          accent
          label="Diamonds"
          value={entry ? formatDiamondsEarned(entry.coins_earned) : "—"}
          hint="Creator Network"
        />
        <StatCard
          label="Stream hours"
          value={entry ? Number(entry.hours_streamed).toFixed(1) : "—"}
        />
        <StatCard label="Active days" value={entry ? entry.days_streamed : "—"} />
        <StatCard
          label="Rank score"
          value={entry ? entry.rank_score.toFixed(1) : "—"}
          hint={entry ? `Activeness: ${entry.activeness_level}` : "Awaiting sync"}
        />
      </div>
    </section>
  );
}
