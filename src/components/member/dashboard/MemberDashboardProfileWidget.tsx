import { Button } from "@/components/ui/Button";
import { DashboardWidget } from "@/components/ui/DashboardWidget";
import { EmptyState } from "@/components/ui/EmptyState";
import type { TikTokConnectionPublic } from "@/lib/tiktok/types";
import { TikTokRefreshForm } from "@/components/member/TikTokRefreshForm";

type MemberDashboardProfileWidgetProps = {
  connection: TikTokConnectionPublic | null;
  onboardingComplete: boolean;
  networkStatus: string | null;
};

export function MemberDashboardProfileWidget({
  connection,
  onboardingComplete,
  networkStatus,
}: MemberDashboardProfileWidgetProps) {
  const checks = [
    { label: "TikTok connected", done: Boolean(connection) },
    { label: "Profile synced", done: Boolean(connection?.last_synced_at) },
    { label: "Network onboarding", done: onboardingComplete },
  ];
  const doneCount = checks.filter((c) => c.done).length;
  const complete = doneCount === checks.length;

  return (
    <DashboardWidget eyebrow="Profile" title="Account readiness" actionHref="/application-status" actionLabel="Status →">
      {complete ? (
        <div className="space-y-3">
          <p className="text-sm leading-relaxed text-muted">
            Your member account is ready. Refresh TikTok anytime to update public follower stats on this
            dashboard.
          </p>
          {networkStatus ? (
            <p className="text-xs font-semibold uppercase tracking-wider text-accent dark:text-accent-muted">
              Network: {networkStatus}
            </p>
          ) : null}
          {connection ? (
            <div className="flex flex-wrap gap-2">
              <TikTokRefreshForm />
              <Button href="/api/tiktok/oauth/start" variant="secondary" className="min-h-[44px] px-4">
                Reconnect
              </Button>
            </div>
          ) : null}
        </div>
      ) : (
        <EmptyState
          title={`${doneCount} of ${checks.length} setup steps done`}
          description="Finish these so rankings and Battle Hub can match you cleanly."
          action={
            <ul className="w-full space-y-2">
              {checks.map((c) => (
                <li
                  key={c.label}
                  className="flex items-center justify-between rounded-xl border border-border/70 bg-surface px-3 py-2 text-sm dark:border-zinc-800"
                >
                  <span className="font-medium text-foreground">{c.label}</span>
                  <span className={c.done ? "font-semibold text-emerald-600 dark:text-emerald-400" : "text-muted"}>
                    {c.done ? "Done" : "Needed"}
                  </span>
                </li>
              ))}
              {!connection ? (
                <li className="pt-1">
                  <Button href="/api/tiktok/oauth/start" variant="primary" className="min-h-[44px] w-full px-4">
                    Connect TikTok
                  </Button>
                </li>
              ) : !onboardingComplete ? (
                <li className="pt-1">
                  <Button href="/battle-hub" variant="primary" className="min-h-[44px] w-full px-4">
                    Continue onboarding
                  </Button>
                </li>
              ) : null}
            </ul>
          }
        />
      )}
    </DashboardWidget>
  );
}
