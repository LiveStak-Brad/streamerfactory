import Link from "next/link";
import { DashboardWidget } from "@/components/ui/DashboardWidget";
import type { CreatorProgressSummary } from "@/lib/growth/types";

type Props = {
  xp: CreatorProgressSummary["xp"];
  seasonName: string | null;
};

export function MemberDashboardXpRankWidget({ xp, seasonName }: Props) {
  return (
    <DashboardWidget
      eyebrow={seasonName ? `${seasonName} · XP` : "Factory XP"}
      title="Creator Rank"
      featured
      actionHref="/member/progress"
      actionLabel="Progress →"
    >
      <div className="space-y-4">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-[0.65rem] font-bold uppercase tracking-wider text-muted">
              Level {xp.level}
            </p>
            <p className="mt-1 text-2xl font-bold tracking-tight text-foreground">
              {xp.tierName}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold tabular-nums text-foreground">{xp.total}</p>
            <p className="text-xs font-semibold text-muted">
              Factory XP{seasonName ? ` · +${xp.season} season` : ""}
            </p>
          </div>
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between text-xs text-muted">
            <span>{xp.nextTierName ? `Next: ${xp.nextTierName}` : "Max rank"}</span>
            <span className="tabular-nums">
              {xp.nextTierName ? `${xp.xpForNext} Factory XP to go` : "100%"}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-muted-bg dark:bg-zinc-800">
            <div
              className="h-full rounded-full bg-accent transition-[width] duration-500"
              style={{ width: `${xp.percentToNext}%` }}
            />
          </div>
        </div>

        <p className="text-xs leading-relaxed text-muted">{xp.blurb}</p>
        <Link
          href="/member/progress"
          className="inline-flex min-h-[44px] items-center text-sm font-semibold text-accent hover:underline dark:text-accent-muted"
        >
          See streaks, certificates & career path →
        </Link>
      </div>
    </DashboardWidget>
  );
}
