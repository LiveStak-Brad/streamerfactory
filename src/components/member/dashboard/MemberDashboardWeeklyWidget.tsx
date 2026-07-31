import Link from "next/link";
import { DashboardWidget } from "@/components/ui/DashboardWidget";
import type { CreatorProgressSummary } from "@/lib/growth/types";

type Props = {
  challenges: CreatorProgressSummary["weeklyChallenges"];
};

export function MemberDashboardWeeklyWidget({ challenges }: Props) {
  const done = challenges.filter((m) => m.status === "completed").length;

  return (
    <DashboardWidget
      eyebrow="This week"
      title="Weekly challenges"
      actionHref="/member/progress"
      actionLabel="All progress →"
    >
      {challenges.length === 0 ? (
        <p className="text-sm leading-relaxed text-muted">
          Weekly challenges refresh every Monday. Check in daily to keep them moving.
        </p>
      ) : (
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">
            {done} of {challenges.length} complete
          </p>
          <ul className="space-y-2">
            {challenges.slice(0, 4).map((m) => (
              <li key={m.id}>
                <Link
                  href={m.href ?? "/member/progress"}
                  className="flex min-h-[48px] items-start gap-3 rounded-xl border border-border/70 bg-muted-bg/40 px-3 py-2.5 transition-colors hover:border-accent/30 dark:border-zinc-800"
                >
                  <span
                    className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-xs font-bold ${
                      m.status === "completed"
                        ? "bg-emerald-500/20 text-emerald-800 dark:text-emerald-200"
                        : "bg-muted-bg text-muted"
                    }`}
                    aria-hidden
                  >
                    {m.status === "completed" ? "✓" : "○"}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-foreground">
                      {m.title}
                    </span>
                    {m.xpReward ? (
                      <span className="mt-0.5 block text-xs font-semibold text-accent dark:text-accent-muted">
                        +{m.xpReward} Factory XP
                      </span>
                    ) : m.description ? (
                      <span className="mt-0.5 block text-xs text-muted">{m.description}</span>
                    ) : null}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </DashboardWidget>
  );
}
