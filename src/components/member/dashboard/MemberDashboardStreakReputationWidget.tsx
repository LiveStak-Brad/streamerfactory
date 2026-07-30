import { DashboardWidget } from "@/components/ui/DashboardWidget";
import type { CreatorSnapshot } from "@/lib/growth/types";

type Props = {
  streaks: CreatorSnapshot["streaks"];
  reputation: CreatorSnapshot["reputation"];
  seasonName: string | null;
};

export function MemberDashboardStreakReputationWidget({
  streaks,
  reputation,
  seasonName,
}: Props) {
  const login = streaks.daily_login;
  const titles = reputation.titles;

  return (
    <DashboardWidget eyebrow="Consistency" title="Streaks & reputation">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-border/70 bg-muted-bg/50 px-3 py-3 dark:border-zinc-800">
            <p className="text-[0.65rem] font-bold uppercase tracking-wider text-muted">Login streak</p>
            <p className="mt-1 text-2xl font-bold tabular-nums text-foreground">
              {login?.current ?? 0}
              <span className="ml-1 text-sm font-semibold text-muted">days</span>
            </p>
            <p className="mt-1 text-xs text-muted">Best {login?.longest ?? 0}</p>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted-bg/50 px-3 py-3 dark:border-zinc-800">
            <p className="text-[0.65rem] font-bold uppercase tracking-wider text-muted">
              Reputation{seasonName ? ` · ${seasonName}` : ""}
            </p>
            <p className="mt-1 text-2xl font-bold tabular-nums text-foreground">
              {reputation.lifetime}
            </p>
            <p className="mt-1 text-xs text-muted">
              Season +{reputation.season}
              {titles[0] ? ` · ${titles[0]}` : ""}
            </p>
          </div>
        </div>
        <p className="text-xs leading-relaxed text-muted">
          Reputation is earned from real Factory actions — not likes or popularity.
        </p>
      </div>
    </DashboardWidget>
  );
}
