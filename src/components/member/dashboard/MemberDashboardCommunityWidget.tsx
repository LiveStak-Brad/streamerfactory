import Link from "next/link";
import { CopyInviteCodeButton } from "@/components/member/CopyInviteCodeButton";
import { DashboardWidget } from "@/components/ui/DashboardWidget";
import type { CreatorProgressSummary } from "@/lib/growth/types";

type Props = {
  activity: CreatorProgressSummary["recentActivity"];
  referralCode: string | null;
  unreadNotifications: number;
};

export function MemberDashboardCommunityWidget({
  activity,
  referralCode,
  unreadNotifications,
}: Props) {
  return (
    <DashboardWidget
      eyebrow="Community"
      title="Highlights"
      actionHref="/member/activity"
      actionLabel="Activity →"
    >
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/member/notifications"
            className="inline-flex min-h-[40px] items-center rounded-xl border border-border/80 px-3 text-xs font-semibold text-foreground transition-colors hover:border-accent/40 dark:border-zinc-700"
          >
            Notifications
            {unreadNotifications > 0 ? (
              <span className="ml-2 inline-flex min-w-[1.25rem] items-center justify-center rounded-full bg-accent px-1.5 py-0.5 text-[0.65rem] font-bold text-accent-foreground">
                {unreadNotifications}
              </span>
            ) : null}
          </Link>
          {referralCode ? <CopyInviteCodeButton code={referralCode} /> : null}
        </div>
        {activity.length === 0 ? (
          <div className="space-y-2">
            <p className="text-sm leading-relaxed text-muted">
              Your wins will land here — missions, unlocks, and Factory milestones.
            </p>
            <Link
              href="/member/activity"
              className="inline-flex min-h-[40px] items-center text-sm font-semibold text-accent hover:underline dark:text-accent-muted"
            >
              Browse community activity →
            </Link>
          </div>
        ) : (
          <ul className="space-y-2">
            {activity.slice(0, 5).map((item) => (
              <li
                key={item.id}
                className="rounded-xl border border-border/60 bg-muted-bg/30 px-3 py-2.5 text-sm text-foreground dark:border-zinc-800"
              >
                {item.summary}
                <span className="mt-0.5 block text-[0.65rem] text-muted">
                  {new Date(item.created_at).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </DashboardWidget>
  );
}
