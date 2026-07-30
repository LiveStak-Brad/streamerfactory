import Link from "next/link";
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
        <div className="flex flex-wrap gap-3 text-xs font-semibold">
          <Link href="/member/notifications" className="text-accent hover:underline dark:text-accent-muted">
            Notifications{unreadNotifications > 0 ? ` (${unreadNotifications})` : ""}
          </Link>
          {referralCode ? (
            <span className="text-muted">
              Invite code: <span className="font-mono text-foreground">{referralCode}</span>
            </span>
          ) : null}
        </div>
        {activity.length === 0 ? (
          <p className="text-sm text-muted">
            No community activity yet. Completions and unlocks will show up here.
          </p>
        ) : (
          <ul className="space-y-2">
            {activity.slice(0, 5).map((item) => (
              <li
                key={item.id}
                className="rounded-xl border border-border/60 bg-muted-bg/30 px-3 py-2 text-sm text-foreground dark:border-zinc-800"
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
