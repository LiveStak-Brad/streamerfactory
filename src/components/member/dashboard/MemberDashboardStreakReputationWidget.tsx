import Link from "next/link";
import { DashboardWidget } from "@/components/ui/DashboardWidget";
import type { CreatorProgressSummary, CreatorSnapshot } from "@/lib/growth/types";

type Props = {
  streaks: CreatorSnapshot["streaks"];
  reputation: CreatorSnapshot["reputation"];
  seasonName: string | null;
  creatorRank?: CreatorProgressSummary["xp"];
};

export function MemberDashboardStreakReputationWidget({
  streaks,
  reputation,
  seasonName,
  creatorRank,
}: Props) {
  const login = streaks.daily_login;
  const learning = streaks.weekly_learning;
  const titles = reputation.titles;
  const current = login?.current ?? 0;

  return (
    <DashboardWidget
      eyebrow="Consistency"
      title="Streaks & XP"
      actionHref="/member/progress"
      actionLabel="Details →"
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-border/70 bg-muted-bg/50 px-3 py-3 dark:border-zinc-800">
            <p className="text-[0.65rem] font-bold uppercase tracking-wider text-muted">Login streak</p>
            <p className="mt-1 text-2xl font-bold tabular-nums text-foreground">
              {current}
              <span className="ml-1 text-sm font-semibold text-muted">days</span>
            </p>
            <p className="mt-1 text-xs text-muted">
              {current === 0
                ? "Check in daily for +5 Factory XP"
                : `Best ${login?.longest ?? 0} · don't break it`}
            </p>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted-bg/50 px-3 py-3 dark:border-zinc-800">
            <p className="text-[0.65rem] font-bold uppercase tracking-wider text-muted">
              Factory XP{seasonName ? ` · ${seasonName}` : ""}
            </p>
            <p className="mt-1 text-2xl font-bold tabular-nums text-foreground">
              {creatorRank?.total ?? reputation.lifetime}
            </p>
            <p className="mt-1 text-xs text-muted">
              {creatorRank
                ? `Rank ${creatorRank.level} · ${creatorRank.tierName}`
                : `Season +${reputation.season}`}
              {titles[0] ? ` · ${titles[0]}` : ""}
            </p>
          </div>
        </div>
        <p className="text-xs leading-relaxed text-muted">
          Learning streak: {learning?.current ?? 0} weeks
          {learning?.longest ? ` (best ${learning.longest})` : ""}. Factory XP comes from
          real actions — missions, training, battles, and showing up.
        </p>
        <Link
          href="/member/progress"
          className="inline-flex min-h-[40px] items-center text-sm font-semibold text-accent hover:underline dark:text-accent-muted"
        >
          Protect your streak →
        </Link>
      </div>
    </DashboardWidget>
  );
}
