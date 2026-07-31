"use client";

import { useCallback, useEffect, useState } from "react";
import { AssessmentPlayer } from "@/components/streameru/assessments/AssessmentPlayer";
import {
  addLocalStreamerUXp,
  readQuizPassed,
  writeQuizPassed,
} from "@/lib/assessments/progress-local";
import { publicQuizView, getLessonQuiz } from "@/lib/assessments/registry";
import { dispatchStreamerUProgressUpdate } from "@/lib/resources/streameru-progress-events";

type Props = {
  lessonSlug: string;
};

export function LessonQuiz({ lessonSlug }: Props) {
  const quiz = getLessonQuiz(lessonSlug);
  const [passed, setPassed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setPassed(readQuizPassed(lessonSlug));
  }, [lessonSlug]);

  const onPassed = useCallback(
    (_graded: { percent: number }, xpAwarded: number) => {
      writeQuizPassed(lessonSlug, _graded.percent);
      if (xpAwarded > 0) addLocalStreamerUXp(xpAwarded);
      setPassed(true);
      dispatchStreamerUProgressUpdate();
    },
    [lessonSlug],
  );

  if (!quiz) return null;

  const view = publicQuizView(quiz);

  return (
    <div className="space-y-4">
      {mounted && passed ? (
        <p className="rounded-xl border border-emerald-200/80 bg-emerald-50/50 px-4 py-3 text-sm font-medium text-emerald-950 dark:border-emerald-900/40 dark:bg-emerald-950/25 dark:text-emerald-100">
          Lesson quiz passed — you can complete the LIVE mission below.
        </p>
      ) : null}
      <AssessmentPlayer
        assessmentKey={view.key}
        title={view.title}
        kindLabel="Lesson Quiz"
        questions={view.questions}
        onPassed={onPassed}
      />
    </div>
  );
}
