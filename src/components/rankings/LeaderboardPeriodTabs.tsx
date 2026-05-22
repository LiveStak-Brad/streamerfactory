"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { RANKING_PERIODS, type RankingPeriod } from "@/lib/rankings/types";

type LeaderboardPeriodTabsProps = {
  /** Base path for period links (default `/rankings`). */
  basePath?: string;
};

export function LeaderboardPeriodTabs({ basePath = "/rankings" }: LeaderboardPeriodTabsProps) {
  const searchParams = useSearchParams();
  const current = (searchParams.get("period") ?? "weekly") as RankingPeriod;
  const anchor = searchParams.get("anchor") ?? "";

  return (
    <div className="flex flex-wrap gap-2">
      {RANKING_PERIODS.map((p) => {
        const params = new URLSearchParams();
        params.set("period", p);
        if (anchor) params.set("anchor", anchor);
        const active = current === p;
        return (
          <Link
            key={p}
            href={`${basePath}?${params.toString()}`}
            className={`rounded-xl px-4 py-2 text-sm font-semibold capitalize transition ${
              active
                ? "bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950"
                : "border border-zinc-200 text-zinc-600 hover:bg-muted-bg dark:border-zinc-700 dark:text-zinc-400"
            }`}
          >
            {p === "all-time" ? "All time" : p}
          </Link>
        );
      })}
    </div>
  );
}
