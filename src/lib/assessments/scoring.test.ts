import { describe, expect, it } from "vitest";
import { gradeAssessment } from "@/lib/assessments/scoring";
import { getLessonQuiz, getGraduationExam, getProgramFinal } from "@/lib/assessments/registry";
import { assertCurriculumQuizzesComplete } from "@/lib/assessments/registry";

describe("StreamerU assessments", () => {
  it("has a quiz for every curriculum lesson", () => {
    expect(assertCurriculumQuizzesComplete()).toEqual([]);
  });

  it("grades a perfect lesson quiz as passed + perfect", () => {
    const quiz = getLessonQuiz("start-strong-on-tiktok-live");
    expect(quiz).toBeTruthy();
    const answers: Record<string, string> = {};
    for (const q of quiz!.questions) {
      const correct = q.choices.find((c) => c.correct)!;
      answers[q.id] = correct.id;
    }
    const graded = gradeAssessment(quiz!, answers);
    expect(graded.passed).toBe(true);
    expect(graded.perfect).toBe(true);
    expect(graded.percent).toBe(100);
  });

  it("ships program finals and graduation exam", () => {
    expect(getProgramFinal("beginner")?.questions.length).toBeGreaterThanOrEqual(10);
    expect(getGraduationExam().questions.length).toBe(20);
  });
});
