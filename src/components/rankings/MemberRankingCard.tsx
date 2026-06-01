import Link from "next/link";
import { formatDiamondsEarned } from "@/lib/rankings/diamonds";
import { nextMilestoneMessage, rankingBadge } from "@/lib/rankings/scoring";
import { formatPeriodLabel } from "@/lib/rankings/periods";
import type { LeaderboardEntry } from "@/lib/rankings/types";

type MemberRankingCardProps = {
  entry: LeaderboardEntry | null;
  periodStart: string;
  periodEnd: string;
  leaderboardSize: number;
};

export function MemberRankingCard({
  entry,
  periodStart,
  periodEnd,
  leaderboardSize,
}: MemberRankingCardProps) {
  const badge = rankingBadge(entry?.rank_position ?? null, Boolean(entry));
  const milestone = nextMilestoneMessage(
    entry?.rank_position ?? null,
    entry?.rank_score ?? 0,
    {
      hours_streamed: entry?.hours_streamed ?? 0,
      coins_earned: entry?.coins_earned ?? 0,
    },
    leaderboardSize,
  );

  return (
    <section className="rounded-2xl border border-zinc-200/90 bg-surface p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/50">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent dark:text-accent-muted">
            Factory ranking
          </p>
          <h2 className="mt-2 text-2xl font-bold text-zinc-950 dark:text-zinc-50">
            {entry?.rank_position != null ? `#${entry.rank_position}` : "—"} this month
          </h2>
          <p className="mt-1 text-sm text-zinc-500">
            {formatPeriodLabel("monthly", periodStart, periodEnd)}
          </p>
          <p className="mt-2 inline-flex rounded-full bg-accent/10 px-3 py-1 text-sm font-semibold text-accent dark:text-accent-muted">
            {badge === "Factory Champion"
              ? "#1 Factory Champion"
              : badge === "Elite Creator"
                ? "Top 3 Elite Creator"
                : badge === "Rising Star"
                  ? "Top 10 Rising Star"
                  : badge}
          </p>
        </div>
        <Link
          href="/member/leaderboard"
          className="shrink-0 text-sm font-semibold text-accent hover:underline dark:text-accent-muted"
        >
          Full leaderboard →
        </Link>
      </div>

      {entry ? (
        <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div>
            <dt className="text-xs font-medium uppercase tracking-wider text-zinc-500">Score</dt>
            <dd className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{entry.rank_score.toFixed(1)}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wider text-zinc-500">Diamonds</dt>
            <dd className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
              {formatDiamondsEarned(entry.coins_earned)}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wider text-zinc-500">Hours</dt>
            <dd className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
              {Number(entry.hours_streamed).toFixed(1)}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wider text-zinc-500">Days</dt>
            <dd className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">{entry.days_streamed}</dd>
          </div>
          <div className="col-span-2 sm:col-span-4">
            <dt className="text-xs font-medium uppercase tracking-wider text-zinc-500">Activeness</dt>
            <dd className="mt-0.5 capitalize font-semibold text-zinc-800 dark:text-zinc-200">
              {entry.activeness_level}
            </dd>
          </div>
        </dl>
      ) : (
        <p className="mt-6 text-sm text-zinc-600 dark:text-zinc-400">
          No stats for you this week yet. Your rank will appear after staff enters Creator Network numbers.
        </p>
      )}

      {milestone ? (
        <p className="mt-6 rounded-xl border border-accent/20 bg-accent/5 px-4 py-3 text-sm leading-relaxed text-zinc-700 dark:border-accent/30 dark:bg-accent/10 dark:text-zinc-300">
          {milestone}
        </p>
      ) : null}
    </section>
  );
}
