/**
 * Career path — educational progression + leadership eligibility.
 *
 * Visible order:
 * Recruit → Creator → Rising Creator → Mentor → StreamerU Graduate
 *   → Manager Eligible → Manager
 *
 * Mentor / Manager are never auto-appointed. Meeting gates only sets
 * eligibility; Manager stage requires a staff-granted appointment title.
 */

import type { CreatorSnapshot } from "@/lib/growth/types";
import { getCreatorRank } from "@/lib/growth/xp/creator-rank";
import {
  CORE_CURRICULUM_TOTAL_LESSONS,
  countCompletedPrograms,
  CURRICULUM_TOTAL_LESSONS,
  programProgress,
} from "@/lib/growth/semester/programs";

export type CareerStageKey =
  | "recruit"
  | "creator"
  | "rising"
  | "mentor"
  | "graduate"
  | "manager_eligible"
  | "manager";

export type CareerStage = {
  key: CareerStageKey;
  name: string;
  blurb: string;
};

export const CAREER_STAGES: CareerStage[] = [
  {
    key: "recruit",
    name: "Recruit",
    blurb: "Finish onboarding and claim your first Factory XP.",
  },
  {
    key: "creator",
    name: "Creator",
    blurb: "Onboarding done — train in StreamerU and keep a login streak.",
  },
  {
    key: "rising",
    name: "Rising Creator",
    blurb: "Hit Creator Rank 3 and finish your first semester.",
  },
  {
    key: "mentor",
    name: "Mentor",
    blurb: "Mentor-eligible — staff approval still required before you mentor.",
  },
  {
    key: "graduate",
    name: "StreamerU Graduate",
    blurb: "Full academy complete — an educational achievement, not a leadership role.",
  },
  {
    key: "manager_eligible",
    name: "Manager Eligible",
    blurb: "You meet the bar for manager consideration — appointment is staff-only.",
  },
  {
    key: "manager",
    name: "Manager",
    blurb: "Appointed network manager (staff-granted — never automatic).",
  },
];

/** Titles that require human approval — never auto-unlocked by the reputation engine. */
export const STAFF_APPOINTMENT_TITLE_KEYS = ["mentor", "manager"] as const;

export type CareerEligibility = {
  mentorEligible: boolean;
  managerEligible: boolean;
  mentorAppointed: boolean;
  managerAppointed: boolean;
  mentorMissing: string[];
  managerMissing: string[];
};

export type CareerProgress = {
  stage: CareerStage;
  nextStage: CareerStage | null;
  stageIndex: number;
  percent: number;
  eligibility: CareerEligibility;
  checklist: Array<{ label: string; done: boolean }>;
};

export function evaluateCareerEligibility(
  snapshot: CreatorSnapshot,
  completedLessonSlugs: string[],
  graduated: boolean,
): CareerEligibility {
  const xp = snapshot.reputation.lifetime;
  const rank = getCreatorRank(xp);
  const programsDone = countCompletedPrograms(completedLessonSlugs);
  const loginStreak = snapshot.streaks.daily_login?.current ?? 0;
  const learningStreak = snapshot.streaks.weekly_learning?.current ?? 0;
  const battles = snapshot.battle_history.joined;
  const coursePct =
    CURRICULUM_TOTAL_LESSONS > 0
      ? (completedLessonSlugs.length / CURRICULUM_TOTAL_LESSONS) * 100
      : 0;

  const mentorAppointed = snapshot.reputation.titles.includes("mentor");
  const managerAppointed = snapshot.reputation.titles.includes("manager");

  const mentorMissing: string[] = [];
  if (xp < 250) mentorMissing.push(`Reach 250 Factory XP (${xp}/250)`);
  if (coursePct < 40) {
    mentorMissing.push(
      `Complete 40% of StreamerU (${Math.round(coursePct)}%)`,
    );
  }
  if (loginStreak < 7) {
    mentorMissing.push(`Hold a 7-day login streak (${loginStreak}/7)`);
  }
  if (programsDone < 1) mentorMissing.push("Finish at least one semester");
  if (rank.level < 3) mentorMissing.push("Reach Creator Rank 3");

  const managerMissing: string[] = [];
  if (!graduated && completedLessonSlugs.length < CORE_CURRICULUM_TOTAL_LESSONS) {
    managerMissing.push("Graduate StreamerU first");
  }
  if (xp < 750) managerMissing.push(`Reach 750 Factory XP (${xp}/750)`);
  if (coursePct < 80) {
    managerMissing.push(
      `Complete 80% of StreamerU (${Math.round(coursePct)}%)`,
    );
  }
  if (battles < 5) managerMissing.push(`Join 5 battles (${battles}/5)`);
  if (learningStreak < 4) {
    managerMissing.push(`Hold a 4-week learning streak (${learningStreak}/4)`);
  }
  if (mentorMissing.length > 0) {
    managerMissing.push("Reach mentor eligibility first");
  }

  return {
    mentorEligible: mentorMissing.length === 0,
    managerEligible: managerMissing.length === 0,
    mentorAppointed,
    managerAppointed,
    mentorMissing,
    managerMissing,
  };
}

export function resolveCareerStage(
  snapshot: CreatorSnapshot,
  completedLessonSlugs: string[],
  graduated: boolean,
): CareerProgress {
  const eligibility = evaluateCareerEligibility(
    snapshot,
    completedLessonSlugs,
    graduated,
  );
  const programsDone = countCompletedPrograms(completedLessonSlugs);
  const rank = getCreatorRank(snapshot.reputation.lifetime);
  const onboardingDone = snapshot.onboarding.completed;
  const isGraduate =
    graduated || completedLessonSlugs.length >= CORE_CURRICULUM_TOTAL_LESSONS;

  let stageKey: CareerStageKey = "recruit";
  if (eligibility.managerAppointed) {
    stageKey = "manager";
  } else if (eligibility.managerEligible && isGraduate) {
    stageKey = "manager_eligible";
  } else if (isGraduate) {
    stageKey = "graduate";
  } else if (eligibility.mentorEligible) {
    stageKey = "mentor";
  } else if (onboardingDone && (rank.level >= 3 || programsDone >= 1)) {
    stageKey = "rising";
  } else if (onboardingDone) {
    stageKey = "creator";
  }

  const stageIndex = CAREER_STAGES.findIndex((s) => s.key === stageKey);
  const stage = CAREER_STAGES[Math.max(0, stageIndex)];
  const nextStage = CAREER_STAGES[stageIndex + 1] ?? null;
  const percent = Math.round(((stageIndex + 1) / CAREER_STAGES.length) * 100);

  const programs = programProgress(completedLessonSlugs);
  const checklist = [
    { label: "Complete onboarding", done: onboardingDone },
    { label: "Earn Creator Rank 3+", done: rank.level >= 3 },
    { label: "Finish a StreamerU semester", done: programsDone >= 1 },
    {
      label: "Mentor eligible (approval required)",
      done: eligibility.mentorEligible,
    },
    {
      label: "Graduate StreamerU",
      done: isGraduate || programs.every((p) => p.complete),
    },
    {
      label: "Manager eligible (approval required)",
      done: eligibility.managerEligible,
    },
    {
      label: "Manager appointed (staff)",
      done: eligibility.managerAppointed,
    },
  ];

  return {
    stage,
    nextStage,
    stageIndex: Math.max(0, stageIndex),
    percent,
    eligibility,
    checklist,
  };
}
