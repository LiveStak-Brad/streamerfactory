import Link from "next/link";

type QuickAction = {
  label: string;
  href: string;
  external?: boolean;
  description: string;
};

type MemberDashboardQuickActionsProps = {
  handle: string | null;
  tiktokConnected: boolean;
  onboardingComplete?: boolean;
  unreadNotifications?: number;
};

export function MemberDashboardQuickActions({
  handle,
  tiktokConnected,
  onboardingComplete = true,
  unreadNotifications = 0,
}: MemberDashboardQuickActionsProps) {
  const actions: QuickAction[] = [
    !onboardingComplete
      ? {
          label: "Onboarding",
          href: "/member/onboarding",
          description: "Finish your Factory checklist",
        }
      : {
          label: "Continue training",
          href: "/streameru",
          description: "StreamerU lessons & missions",
        },
    {
      label: "Find a battle",
      href: "/battle-hub",
      description: "Schedule or browse Battle Hub",
    },
    {
      label: unreadNotifications > 0 ? `Inbox (${unreadNotifications})` : "Inbox",
      href: "/member/notifications",
      description: "Missions, unlocks, reminders",
    },
    tiktokConnected && handle
      ? {
          label: "My rankings",
          href: "/member/leaderboard",
          description: "Monthly factory leaderboard",
        }
      : {
          label: "Connect TikTok",
          href: "/api/tiktok/oauth/start",
          description: "Link account for stats sync",
        },
  ];

  return (
    <nav aria-label="Quick actions">
      <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {actions.map((action) => {
          const className =
            "group flex h-full min-h-[88px] flex-col rounded-2xl border border-border/80 bg-surface px-4 py-4 shadow-sm transition-[transform,border-color,box-shadow] hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md motion-reduce:transform-none dark:border-zinc-800 dark:bg-zinc-950/50 dark:hover:border-accent/40";
          const body = (
            <>
              <span className="text-sm font-bold text-foreground group-hover:text-accent dark:group-hover:text-accent-muted">
                {action.label}
              </span>
              <span className="mt-1 text-xs leading-snug text-muted">{action.description}</span>
            </>
          );
          return (
            <li key={action.label}>
              {action.external ? (
                <a href={action.href} target="_blank" rel="noopener noreferrer" className={className}>
                  {body}
                </a>
              ) : (
                <Link href={action.href} className={className}>
                  {body}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
