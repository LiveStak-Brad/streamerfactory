import type { Profile } from "@/lib/auth/server";
import type { MemberSafeStatView } from "@/lib/creator-network/types";
import type { BattleEventWithParticipants } from "@/lib/battle-hub/types";
import type { LeaderboardEntry } from "@/lib/rankings/types";
import type { TikTokConnectionPublic } from "@/lib/tiktok/types";
import { getDefaultRecommendedLesson } from "@/lib/resources/recommended-lesson";

export type DashboardNextAction = {
  label: string;
  href: string;
  external?: boolean;
  reason: string;
};

type NextActionInput = {
  profile: Profile | null;
  connection: TikTokConnectionPublic | null;
  rankingEntry: LeaderboardEntry | null;
  importedStats: MemberSafeStatView | null;
  myUpcomingBattles: BattleEventWithParticipants[];
};

/**
 * Server-side recommended next step using only real account/state signals.
 * StreamerU device progress is refined client-side in the training widget.
 */
export function resolveDashboardNextAction(input: NextActionInput): DashboardNextAction {
  const { profile, connection, rankingEntry, importedStats, myUpcomingBattles } = input;

  if (!connection) {
    return {
      label: "Connect TikTok",
      href: "/api/tiktok/oauth/start",
      reason: "Link your TikTok so we can match Creator Network stats and show your rank.",
    };
  }

  if (profile && !profile.onboarding_completed_at) {
    return {
      label: "Finish onboarding",
      href: "/member/onboarding",
      reason: "Complete your checklist so battles, rankings, and training stay in sync.",
    };
  }

  if (myUpcomingBattles[0]) {
    return {
      label: "Open Battle Hub",
      href: "/battle-hub",
      reason: `You have an upcoming battle: ${myUpcomingBattles[0].title}.`,
    };
  }

  if (!rankingEntry && !importedStats) {
    return {
      label: "Start StreamerU training",
      href: getDefaultRecommendedLesson().href,
      reason: "While Creator Network stats sync, start (or continue) your first lessons.",
    };
  }

  if (rankingEntry?.rank_position != null && rankingEntry.rank_position > 10) {
    return {
      label: "View my ranking",
      href: "/member/leaderboard",
      reason: "You're outside the Top 10 — check the board and plan this week's streams.",
    };
  }

  return {
    label: "Continue training",
    href: "/streameru",
    reason: "Keep building consistency in StreamerU between lives and battles.",
  };
}

export function timeOfDayGreeting(timezone?: string | null): string {
  let hour: number;
  try {
    const fmt = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      hour12: false,
      timeZone: timezone?.trim() || undefined,
    });
    hour = Number(fmt.format(new Date()));
  } catch {
    hour = new Date().getHours();
  }

  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}
