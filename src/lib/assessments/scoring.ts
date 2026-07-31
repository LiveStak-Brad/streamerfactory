import type {
  Assessment,
  AssessmentAnswerMap,
  GradedAttempt,
  GradedQuestion,
} from "@/lib/assessments/types";
import { passThresholdForKind } from "@/lib/assessments/xp";

export function gradeAssessment(
  assessment: Assessment,
  answers: AssessmentAnswerMap,
): GradedAttempt {
  const questions: GradedQuestion[] = assessment.questions.map((q) => {
    const selectedChoiceId = answers[q.id] ?? null;
    const correctChoice = q.choices.find((c) => c.correct);
    const correct =
      Boolean(selectedChoiceId) &&
      Boolean(correctChoice) &&
      selectedChoiceId === correctChoice!.id;

    return {
      questionId: q.id,
      prompt: q.prompt,
      correct,
      selectedChoiceId,
      choices: q.choices.map((c) => ({
        choiceId: c.id,
        text: c.text,
        correct: c.correct,
        explanation: c.explanation,
        selected: c.id === selectedChoiceId,
      })),
    };
  });

  const total = questions.length;
  const correctCount = questions.filter((q) => q.correct).length;
  const percent = total === 0 ? 0 : Math.round((correctCount / total) * 100);
  const threshold = passThresholdForKind(assessment.kind);

  return {
    assessmentKey: assessment.key,
    kind: assessment.kind,
    total,
    correctCount,
    percent,
    passed: percent >= threshold,
    perfect: total > 0 && correctCount === total,
    questions,
  };
}
