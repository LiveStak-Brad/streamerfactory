/**
 * StreamerU XP reward table — academy mastery only.
 * Never writes to reputation_ledger / Factory Reputation.
 */

import type { AssessmentKind, StreamerUXpReason } from "@/lib/assessments/types";

export const LESSON_QUIZ_PASS_PERCENT = 70;
export const EXAM_PASS_PERCENT = 80;

export const STREAMERU_XP = {
  lessonQuizPass: 25,
  lessonQuizPerfectBonus: 10,
  programFinalPass: 100,
  graduationExamPass: 250,
  programCertificate: 50,
  graduationDiploma: 100,
} as const;

export type StreamerUXpAward = {
  reason: StreamerUXpReason;
  amount: number;
};

export function passThresholdForKind(kind: AssessmentKind): number {
  return kind === "lesson_quiz" ? LESSON_QUIZ_PASS_PERCENT : EXAM_PASS_PERCENT;
}

/** XP granted on a newly passed attempt (idempotent caller should skip re-awards). */
export function xpAwardsForPassedAttempt(opts: {
  kind: AssessmentKind;
  perfect: boolean;
  alreadyPassedBefore: boolean;
}): StreamerUXpAward[] {
  if (opts.alreadyPassedBefore) return [];

  if (opts.kind === "lesson_quiz") {
    const awards: StreamerUXpAward[] = [
      { reason: "lesson_quiz_pass", amount: STREAMERU_XP.lessonQuizPass },
    ];
    if (opts.perfect) {
      awards.push({
        reason: "lesson_quiz_perfect",
        amount: STREAMERU_XP.lessonQuizPerfectBonus,
      });
    }
    return awards;
  }

  if (opts.kind === "program_final") {
    return [
      { reason: "program_final_pass", amount: STREAMERU_XP.programFinalPass },
    ];
  }

  return [
    { reason: "graduation_exam_pass", amount: STREAMERU_XP.graduationExamPass },
  ];
}

export function totalXp(awards: StreamerUXpAward[]): number {
  return awards.reduce((sum, a) => sum + a.amount, 0);
}
