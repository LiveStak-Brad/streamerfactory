import { BACKSTAGE_STAT_SEEDS } from "@/lib/rankings/backstage-seed-data";
import { formatDiamondsEarned } from "@/lib/rankings/diamonds";
import { getLeaderboardFromBackstageSeed } from "@/lib/rankings/leaderboard-from-seed";

/** Read-only preview: stats from your Creator Network screenshots (already in the app). */
export function AdminRankingsSnapshot() {
  const ranked = getLeaderboardFromBackstageSeed();
  const withDiamonds = BACKSTAGE_STAT_SEEDS.filter((s) => s.diamondsEarned > 0 || s.hoursStreamed > 0);

  return (
    <section className="rounded-2xl border border-emerald-200/80 bg-emerald-50/50 p-6 dark:border-emerald-900/40 dark:bg-emerald-950/20">
      <h2 className="text-lg font-bold text-zinc-950 dark:text-zinc-50">Loaded from your backstage screenshots</h2>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
        {BACKSTAGE_STAT_SEEDS.length} creators · {withDiamonds.length} with diamonds/hours from backstage Gifts column.
        Public <strong>/rankings</strong> uses this data automatically — no manual entry required.
      </p>
      <ol className="mt-4 space-y-2 text-sm">
        {ranked.slice(0, 10).map((e) => {
          const handle = e.tiktok_username?.replace(/^@/, "") ?? e.profile_id;
          return (
            <li
              key={e.profile_id}
              className="flex flex-wrap items-baseline justify-between gap-2 rounded-lg border border-emerald-200/60 bg-white/60 px-3 py-2 dark:border-emerald-900/30 dark:bg-zinc-950/40"
            >
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                #{e.rank_position} @{handle}
              </span>
              <span className="text-zinc-600 dark:text-zinc-400">
                score {e.rank_score.toFixed(1)} · {formatDiamondsEarned(e.coins_earned)} diamonds ·{" "}
                {Number(e.hours_streamed).toFixed(1)}h ·{" "}
                {e.days_streamed}d · {e.activeness_level}
              </span>
            </li>
          );
        })}
      </ol>
      <p className="mt-4 text-xs text-zinc-500">
        Optional: use <strong>Import backstage stats & rank</strong> below to copy into Supabase for signed-in member
        dashboards (needs service role key in env).
      </p>
    </section>
  );
}
