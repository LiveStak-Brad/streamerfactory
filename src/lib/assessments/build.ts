import type {
  LessonQuiz,
  ProgramFinalExam,
  GraduationExam,
  QuizChoice,
  QuizQuestion,
} from "@/lib/assessments/types";
import type { TrainingTrackId } from "@/lib/resources/tracks";

/** Compact choice tuple: [text, correct, explanation] */
export type ChoiceTuple = [string, boolean, string];

export function choice(id: string, text: string, correct: boolean, explanation: string): QuizChoice {
  return { id, text, correct, explanation };
}

export function question(id: string, prompt: string, tuples: ChoiceTuple[]): QuizQuestion {
  const letters = ["a", "b", "c", "d", "e", "f"] as const;
  if (tuples.length < 2) {
    throw new Error(`Question ${id} needs at least 2 choices`);
  }
  const correctCount = tuples.filter((t) => t[1]).length;
  if (correctCount !== 1) {
    throw new Error(`Question ${id} must have exactly one correct choice`);
  }
  return {
    id,
    prompt,
    choices: tuples.map(([text, correct, explanation], i) =>
      choice(`${id}-${letters[i] ?? i}`, text, correct, explanation),
    ),
  };
}

export function lessonQuiz(opts: {
  lessonSlug: string;
  programKey: TrainingTrackId;
  title: string;
  questions: QuizQuestion[];
}): LessonQuiz {
  const n = opts.questions.length;
  if (n < 5 || n > 10) {
    throw new Error(`Lesson quiz ${opts.lessonSlug} must have 5–10 questions (got ${n})`);
  }
  return {
    kind: "lesson_quiz",
    key: `quiz:${opts.lessonSlug}`,
    lessonSlug: opts.lessonSlug,
    programKey: opts.programKey,
    title: opts.title,
    questions: opts.questions,
  };
}

export function programFinal(opts: {
  programKey: TrainingTrackId;
  programName: string;
  title: string;
  questions: QuizQuestion[];
}): ProgramFinalExam {
  return {
    kind: "program_final",
    key: `final:${opts.programKey}`,
    programKey: opts.programKey,
    programName: opts.programName,
    title: opts.title,
    questions: opts.questions,
  };
}

export function graduationExam(opts: {
  title: string;
  questions: QuizQuestion[];
}): GraduationExam {
  return {
    kind: "graduation",
    key: "graduation",
    title: opts.title,
    questions: opts.questions,
  };
}
