/**
 * Assessment registry — lesson quizzes, program finals, graduation exam.
 */

import type {
  Assessment,
  GraduationExam,
  LessonQuiz,
  ProgramFinalExam,
} from "@/lib/assessments/types";
import type { TrainingTrackId } from "@/lib/resources/tracks";
import { CURRICULUM } from "@/lib/resources/curriculum";

import { quiz as startStrongOnTiktokLive } from "@/lib/assessments/quizzes/beginner/start-strong-on-tiktok-live";
import { quiz as yourFirstLiveStructure } from "@/lib/assessments/quizzes/beginner/your-first-live-structure";
import { quiz as first10TiktokLiveSessions } from "@/lib/assessments/quizzes/beginner/first-10-tiktok-live-sessions";
import { quiz as firstWeekOfLivesConsistency } from "@/lib/assessments/quizzes/beginner/first-week-of-lives-consistency";
import { quiz as commonLiveMistakesNewCreators } from "@/lib/assessments/quizzes/beginner/common-live-mistakes-new-creators";

import { quiz as talkingWithEmptyRoom } from "@/lib/assessments/quizzes/content/talking-with-empty-room";
import { quiz as hooksAndFirstImpressions } from "@/lib/assessments/quizzes/content/hooks-and-first-impressions";
import { quiz as contentLoopsRepeatableSegments } from "@/lib/assessments/quizzes/content/content-loops-repeatable-segments";
import { quiz as structuringLongerLives } from "@/lib/assessments/quizzes/content/structuring-longer-lives";
import { quiz as growthWeeklySystem } from "@/lib/assessments/quizzes/content/growth-weekly-system";

import { quiz as understandingBattles } from "@/lib/assessments/quizzes/battles/understanding-battles";
import { quiz as preparingForYourFirstBattle } from "@/lib/assessments/quizzes/battles/preparing-for-your-first-battle";
import { quiz as structureYourFirstBattleWeek } from "@/lib/assessments/quizzes/battles/structure-your-first-battle-week";
import { quiz as improvingBattlePerformance } from "@/lib/assessments/quizzes/battles/improving-battle-performance";
import { quiz as buildingBattlePartners } from "@/lib/assessments/quizzes/battles/building-battle-partners";

import { quiz as giftsGoalsMomentum } from "@/lib/assessments/quizzes/monetization/gifts-goals-momentum";
import { quiz as creatingReasonsToGift } from "@/lib/assessments/quizzes/monetization/creating-reasons-to-gift";
import { quiz as settingGoalsDuringLives } from "@/lib/assessments/quizzes/monetization/setting-goals-during-lives";
import { quiz as scalingConsistency } from "@/lib/assessments/quizzes/monetization/scaling-consistency";
import { quiz as buildingIncomeHabits } from "@/lib/assessments/quizzes/monetization/building-income-habits";

import { quiz as platformRulesNewLiveCreators } from "@/lib/assessments/quizzes/rules/platform-rules-new-live-creators";
import { quiz as whatGetsYouBanned } from "@/lib/assessments/quizzes/rules/what-gets-you-banned";
import { quiz as howToAvoidViolations } from "@/lib/assessments/quizzes/rules/how-to-avoid-violations";
import { quiz as longTermAccountSafety } from "@/lib/assessments/quizzes/rules/long-term-account-safety";

import { exam as finalBeginner } from "@/lib/assessments/exams/program-beginner";
import { exam as finalContent } from "@/lib/assessments/exams/program-content";
import { exam as finalBattles } from "@/lib/assessments/exams/program-battles";
import { exam as finalMonetization } from "@/lib/assessments/exams/program-monetization";
import { exam as finalRules } from "@/lib/assessments/exams/program-rules";
import { exam as graduation } from "@/lib/assessments/exams/graduation";

const LESSON_QUIZZES: LessonQuiz[] = [
  startStrongOnTiktokLive,
  yourFirstLiveStructure,
  first10TiktokLiveSessions,
  firstWeekOfLivesConsistency,
  commonLiveMistakesNewCreators,
  talkingWithEmptyRoom,
  hooksAndFirstImpressions,
  contentLoopsRepeatableSegments,
  structuringLongerLives,
  growthWeeklySystem,
  understandingBattles,
  preparingForYourFirstBattle,
  structureYourFirstBattleWeek,
  improvingBattlePerformance,
  buildingBattlePartners,
  giftsGoalsMomentum,
  creatingReasonsToGift,
  settingGoalsDuringLives,
  scalingConsistency,
  buildingIncomeHabits,
  platformRulesNewLiveCreators,
  whatGetsYouBanned,
  howToAvoidViolations,
  longTermAccountSafety,
];

const PROGRAM_FINALS: ProgramFinalExam[] = [
  finalBeginner,
  finalContent,
  finalBattles,
  finalMonetization,
  finalRules,
];

const QUIZ_BY_SLUG = new Map(LESSON_QUIZZES.map((q) => [q.lessonSlug, q]));
const FINAL_BY_PROGRAM = new Map(PROGRAM_FINALS.map((e) => [e.programKey, e]));
const ASSESSMENT_BY_KEY = new Map<string, Assessment>();

for (const q of LESSON_QUIZZES) ASSESSMENT_BY_KEY.set(q.key, q);
for (const e of PROGRAM_FINALS) ASSESSMENT_BY_KEY.set(e.key, e);
ASSESSMENT_BY_KEY.set(graduation.key, graduation);

export function getLessonQuiz(slug: string): LessonQuiz | null {
  return QUIZ_BY_SLUG.get(slug) ?? null;
}

export function getProgramFinal(
  programKey: TrainingTrackId | string,
): ProgramFinalExam | null {
  return FINAL_BY_PROGRAM.get(programKey as TrainingTrackId) ?? null;
}

export function getGraduationExam(): GraduationExam {
  return graduation;
}

export function getAssessmentByKey(key: string): Assessment | null {
  return ASSESSMENT_BY_KEY.get(key) ?? null;
}

export function listLessonQuizzes(): LessonQuiz[] {
  return LESSON_QUIZZES;
}

export function listProgramFinals(): ProgramFinalExam[] {
  return PROGRAM_FINALS;
}

/** Public quiz payload — strips correctness until graded server-side... actually client needs to show choices. Correctness revealed after submit. */
export function publicQuizView(assessment: Assessment) {
  return {
    key: assessment.key,
    kind: assessment.kind,
    title: assessment.title,
    questionCount: assessment.questions.length,
    questions: assessment.questions.map((q) => ({
      id: q.id,
      prompt: q.prompt,
      choices: q.choices.map((c) => ({ id: c.id, text: c.text })),
    })),
  };
}

export function assertCurriculumQuizzesComplete(): string[] {
  const missing: string[] = [];
  for (const lesson of CURRICULUM) {
    if (!QUIZ_BY_SLUG.has(lesson.slug)) missing.push(lesson.slug);
  }
  return missing;
}
