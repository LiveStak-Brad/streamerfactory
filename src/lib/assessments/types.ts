/**
 * StreamerU assessment types — quizzes, program finals, graduation exam.
 * Separate from Factory Reputation / Creator Rank XP.
 */

import type { TrainingTrackId } from "@/lib/resources/tracks";

export type AssessmentKind = "lesson_quiz" | "program_final" | "graduation";

export type QuizChoice = {
  id: string;
  text: string;
  correct: boolean;
  /** Why this choice is correct, or why it is wrong. */
  explanation: string;
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  choices: QuizChoice[];
};

export type LessonQuiz = {
  kind: "lesson_quiz";
  key: string;
  lessonSlug: string;
  programKey: TrainingTrackId;
  title: string;
  questions: QuizQuestion[];
};

export type ProgramFinalExam = {
  kind: "program_final";
  key: string;
  programKey: TrainingTrackId;
  programName: string;
  title: string;
  questions: QuizQuestion[];
};

export type GraduationExam = {
  kind: "graduation";
  key: "graduation";
  title: string;
  questions: QuizQuestion[];
};

export type Assessment = LessonQuiz | ProgramFinalExam | GraduationExam;

export type AssessmentAnswerMap = Record<string, string>;

export type GradedChoice = {
  choiceId: string;
  text: string;
  correct: boolean;
  explanation: string;
  selected: boolean;
};

export type GradedQuestion = {
  questionId: string;
  prompt: string;
  correct: boolean;
  selectedChoiceId: string | null;
  choices: GradedChoice[];
};

export type GradedAttempt = {
  assessmentKey: string;
  kind: AssessmentKind;
  total: number;
  correctCount: number;
  percent: number;
  passed: boolean;
  perfect: boolean;
  questions: GradedQuestion[];
};

export type StreamerUXpReason =
  | "lesson_quiz_pass"
  | "lesson_quiz_perfect"
  | "program_final_pass"
  | "graduation_exam_pass"
  | "program_certificate"
  | "graduation_diploma";

export type AchievementSuggestion = {
  key: string;
  name: string;
  description: string;
  icon: string | null;
};

export type MasteryScope = "lesson" | "program" | "academy";

export type MasterySnapshot = {
  lesson: Record<string, number>;
  program: Record<string, number>;
  academy: number;
};
