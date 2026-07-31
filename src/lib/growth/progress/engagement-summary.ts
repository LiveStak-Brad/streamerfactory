/**
 * Assemble XP, career, semester, certificate, and daily-login reasons
 * for Creator Home / Progress surfaces.
 */

import { getCreatorRank } from "@/lib/growth/xp/creator-rank";
import { resolveCareerStage } from "@/lib/growth/career/path";
import {
  completedSlugsFromEvents,
  programProgress,
} from "@/lib/growth/semester/programs";
import type { CreatorProgressSummary, CreatorSnapshot } from "@/lib/growth/types";

type Mission = CreatorProgressSummary["todayMissions"][number];

export function buildXpSummary(
  snapshot: CreatorSnapshot,
): CreatorProgressSummary["xp"] {
  const rank = getCreatorRank(snapshot.reputation.lifetime);
  return {
    total: rank.xp,
    season: snapshot.reputation.season,
    level: rank.level,
    tierKey: rank.tier.key,
    tierName: rank.tier.name,
    nextTierName: rank.nextTier?.name ?? null,
    xpForNext: rank.xpForNext,
    percentToNext: rank.percentToNext,
    blurb: rank.tier.blurb,
  };
}

export function buildCareerSummary(
  snapshot: CreatorSnapshot,
  completedLessonSlugs: string[],
  graduated: boolean,
): CreatorProgressSummary["career"] {
  const progress = resolveCareerStage(snapshot, completedLessonSlugs, graduated);
  return {
    stageKey: progress.stage.key,
    stageName: progress.stage.name,
    nextStageName: progress.nextStage?.name ?? null,
    percent: progress.percent,
    mentorEligible: progress.eligibility.mentorEligible,
    managerEligible: progress.eligibility.managerEligible,
    mentorAppointed: progress.eligibility.mentorAppointed,
    managerAppointed: progress.eligibility.managerAppointed,
    mentorMissing: progress.eligibility.mentorMissing,
    managerMissing: progress.eligibility.managerMissing,
  };
}

export function buildSemesterSummary(
  completedLessonSlugs: string[],
): CreatorProgressSummary["semesters"] {
  return programProgress(completedLessonSlugs).map((p) => ({
    programKey: p.programKey,
    programName: p.programName,
    completed: p.completed,
    total: p.total,
    percent: p.percent,
    complete: p.complete,
  }));
}

export function buildDailyLoginReasons(input: {
  xp: CreatorProgressSummary["xp"];
  streaks: CreatorSnapshot["streaks"];
  todayMissions: Mission[];
  weeklyChallenges: Mission[];
  career: CreatorProgressSummary["career"];
  semesters: CreatorProgressSummary["semesters"];
  graduation: CreatorProgressSummary["graduation"];
}): CreatorProgressSummary["dailyLoginReasons"] {
  const reasons: CreatorProgressSummary["dailyLoginReasons"] = [];
  const login = input.streaks.daily_login?.current ?? 0;
  const activeDaily = input.todayMissions.filter((m) => m.status === "active");
  const activeWeekly = input.weeklyChallenges.filter((m) => m.status === "active");
  const nextSemester = input.semesters.find((s) => !s.complete);

  reasons.push({
    label: login > 0 ? `Keep your ${login}-day streak` : "Start a login streak",
    detail:
      login > 0
        ? "Check in today so the streak doesn't reset — +5 Factory XP waiting."
        : "Open the dashboard daily for Factory XP, missions, and streak progress.",
    href: "/member/progress",
  });

  if (activeDaily.length > 0) {
    reasons.push({
      label: `${activeDaily.length} daily mission${activeDaily.length === 1 ? "" : "s"} ready`,
      detail: activeDaily[0]!.title,
      href: activeDaily[0]!.href || "/member/dashboard",
    });
  }

  if (activeWeekly.length > 0) {
    const done = input.weeklyChallenges.filter((m) => m.status === "completed").length;
    reasons.push({
      label: "Weekly challenge in progress",
      detail: `${done}/${input.weeklyChallenges.length} done — ${activeWeekly[0]!.title}`,
      href: "/member/progress",
    });
  }

  if (input.xp.nextTierName && input.xp.xpForNext > 0) {
    reasons.push({
      label: `${input.xp.xpForNext} Factory XP to ${input.xp.nextTierName}`,
      detail: `Creator Rank ${input.xp.level} · ${input.xp.tierName}`,
      href: "/member/progress",
    });
  }

  if (nextSemester) {
    reasons.push({
      label: `Continue ${nextSemester.programName}`,
      detail: `${nextSemester.completed}/${nextSemester.total} lessons — semester certificate waiting`,
      href: "/streameru",
    });
  }

  if (input.career.mentorEligible && !input.career.managerEligible) {
    reasons.push({
      label: "Mentor-eligible (approval required)",
      detail:
        input.career.managerMissing[0] ||
        "Staff still approves mentor appointments — keep building.",
      href: "/member/progress#career",
    });
  } else if (!input.career.mentorEligible && input.career.mentorMissing[0]) {
    reasons.push({
      label: "Next career unlock",
      detail: input.career.mentorMissing[0],
      href: "/member/progress#career",
    });
  }

  if (input.graduation.status === "eligible") {
    reasons.push({
      label: "Graduation ceremony ready",
      detail: "You finished StreamerU — celebrate your ceremony.",
      href: "/member/progress#graduation",
    });
  }

  return reasons.slice(0, 5);
}

export function mergeCompletedSlugs(
  lessonSubjects: string[],
  streameruSlugs: string[],
): string[] {
  return completedSlugsFromEvents(lessonSubjects, streameruSlugs);
}
