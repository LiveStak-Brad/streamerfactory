"use client";

import { useMemo, useState } from "react";
import { LeaderboardTable } from "@/components/rankings/LeaderboardTable";
import { EmptyState } from "@/components/ui/EmptyState";
import type { LeaderboardEntry } from "@/lib/rankings/types";

type RankingsBoardProps = {
  /** Entries after the podium (typically rank 4+) */
  entries: LeaderboardEntry[];
  highlightProfileId?: string | null;
  highlightTiktokHandle?: string | null;
  /** Profile id or handle to scroll/jump target */
  jumpTargetId?: string | null;
};

/**
 * Client search over the remaining leaderboard rows (real entries only).
 */
export function RankingsBoard({
  entries,
  highlightProfileId,
  highlightTiktokHandle,
  jumpTargetId,
}: RankingsBoardProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase().replace(/^@/, "");
    if (!q) return entries;
    return entries.filter((e) => {
      const handle = (e.tiktok_username ?? "").toLowerCase().replace(/^@/, "");
      const email = (e.email ?? "").toLowerCase();
      return handle.includes(q) || email.includes(q);
    });
  }, [entries, query]);

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="block min-w-0 flex-1 sm:max-w-md">
          <span className="sr-only">Search creators</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by TikTok handle…"
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm font-medium text-foreground shadow-sm outline-none ring-accent/0 transition focus:border-accent/50 focus:ring-4 focus:ring-accent/15 dark:border-zinc-700 dark:bg-zinc-950"
          />
        </label>
        {jumpTargetId ? (
          <a
            href={`#rank-${jumpTargetId}`}
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-accent/30 bg-accent-soft px-4 py-2.5 text-sm font-semibold text-accent transition-colors hover:border-accent/50 dark:text-accent-muted"
          >
            Jump to my rank
          </a>
        ) : null}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="No creators match that search"
          description="Try a different handle, or clear the search to see the full board."
          action={
            <button
              type="button"
              onClick={() => setQuery("")}
              className="text-sm font-semibold text-accent hover:underline dark:text-accent-muted"
            >
              Clear search
            </button>
          }
        />
      ) : (
        <LeaderboardTable
          entries={filtered}
          highlightProfileId={highlightProfileId}
          highlightTiktokHandle={highlightTiktokHandle}
          showRankAnchor
        />
      )}
    </div>
  );
}
