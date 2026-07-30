import Image from "next/image";
import Link from "next/link";
import { DashboardWidget } from "@/components/ui/DashboardWidget";
import type { CreatorProgressSummary } from "@/lib/growth/types";

type Props = {
  achievement: CreatorProgressSummary["newestAchievement"];
};

export function MemberDashboardAchievementWidget({ achievement }: Props) {
  return (
    <DashboardWidget eyebrow="Achievements" title="Newest unlock">
      {!achievement ? (
        <div className="space-y-3">
          <p className="text-sm leading-relaxed text-muted">
            Finish a lesson or checklist step to unlock your first achievement.
          </p>
          <div className="flex flex-wrap gap-3 text-sm font-semibold">
            <Link href="/member/onboarding" className="text-accent hover:underline dark:text-accent-muted">
              Open checklist →
            </Link>
            <Link href="/streameru" className="text-accent hover:underline dark:text-accent-muted">
              Start a lesson →
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-3">
          {achievement.icon ? (
            <Image
              src={achievement.icon}
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 shrink-0"
            />
          ) : (
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-sm font-bold text-accent">
              ★
            </span>
          )}
          <div className="min-w-0">
            <p className="text-sm font-bold text-foreground">{achievement.name}</p>
            {achievement.description ? (
              <p className="mt-1 text-xs leading-relaxed text-muted">{achievement.description}</p>
            ) : null}
            <p className="mt-2 text-[0.65rem] font-semibold uppercase tracking-wider text-muted">
              Unlocked {new Date(achievement.unlocked_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      )}
    </DashboardWidget>
  );
}
