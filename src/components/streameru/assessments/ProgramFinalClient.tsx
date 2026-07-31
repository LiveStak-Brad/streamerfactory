"use client";

import { useCallback, useEffect, useState } from "react";
import { AssessmentPlayer } from "@/components/streameru/assessments/AssessmentPlayer";
import {
  addLocalStreamerUXp,
  readFinalPassed,
  writeFinalPassed,
} from "@/lib/assessments/progress-local";
import { dispatchStreamerUProgressUpdate } from "@/lib/resources/streameru-progress-events";

type Props = {
  assessmentKey: string;
  title: string;
  programKey: string;
  questions: { id: string; prompt: string; choices: { id: string; text: string }[] }[];
};

export function ProgramFinalClient({
  assessmentKey,
  title,
  programKey,
  questions,
}: Props) {
  const [passed, setPassed] = useState(false);

  useEffect(() => {
    setPassed(readFinalPassed(programKey));
  }, [programKey]);

  const onPassed = useCallback(
    (graded: { percent: number }, xpAwarded: number) => {
      writeFinalPassed(programKey, graded.percent);
      if (xpAwarded > 0) addLocalStreamerUXp(xpAwarded);
      setPassed(true);
      dispatchStreamerUProgressUpdate();
    },
    [programKey],
  );

  return (
    <div className="space-y-4">
      {passed ? (
        <p className="rounded-xl border border-emerald-200/80 bg-emerald-50/50 px-4 py-3 text-sm font-medium text-emerald-950 dark:border-emerald-900/40 dark:bg-emerald-950/25 dark:text-emerald-100">
          Program Final passed. When every LIVE mission in this program is complete, your Program
          Certificate can issue.
        </p>
      ) : null}
      <AssessmentPlayer
        assessmentKey={assessmentKey}
        title={title}
        kindLabel="Program Final Exam"
        questions={questions}
        onPassed={onPassed}
      />
    </div>
  );
}
