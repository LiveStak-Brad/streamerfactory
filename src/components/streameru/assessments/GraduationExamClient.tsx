"use client";

import { useCallback, useEffect, useState } from "react";
import { AssessmentPlayer } from "@/components/streameru/assessments/AssessmentPlayer";
import {
  addLocalStreamerUXp,
  readGraduationPassed,
  writeGraduationPassed,
} from "@/lib/assessments/progress-local";
import { dispatchStreamerUProgressUpdate } from "@/lib/resources/streameru-progress-events";

type Props = {
  assessmentKey: string;
  title: string;
  questions: { id: string; prompt: string; choices: { id: string; text: string }[] }[];
  initiallyEligible?: boolean;
  diplomaIssued?: boolean;
};

export function GraduationExamClient({
  assessmentKey,
  title,
  questions,
  initiallyEligible,
  diplomaIssued,
}: Props) {
  const [passed, setPassed] = useState(false);

  useEffect(() => {
    setPassed(readGraduationPassed());
  }, []);

  const onPassed = useCallback((graded: { percent: number }, xpAwarded: number) => {
    writeGraduationPassed(graded.percent);
    if (xpAwarded > 0) addLocalStreamerUXp(xpAwarded);
    setPassed(true);
    dispatchStreamerUProgressUpdate();
  }, []);

  return (
    <div className="space-y-4">
      {diplomaIssued || initiallyEligible ? (
        <p className="rounded-xl border border-emerald-200/80 bg-emerald-50/50 px-4 py-3 text-sm font-medium text-emerald-950 dark:border-emerald-900/40 dark:bg-emerald-950/25 dark:text-emerald-100">
          {diplomaIssued
            ? "StreamerU Diploma earned — you graduated."
            : "Graduation ceremony eligible — celebrate on your member dashboard when ready."}
        </p>
      ) : passed ? (
        <p className="rounded-xl border border-emerald-200/80 bg-emerald-50/50 px-4 py-3 text-sm font-medium text-emerald-950 dark:border-emerald-900/40 dark:bg-emerald-950/25 dark:text-emerald-100">
          Graduation Exam passed. Complete all five program paths to receive your diploma.
        </p>
      ) : null}

      <AssessmentPlayer
        assessmentKey={assessmentKey}
        title={title}
        kindLabel="Graduation Exam"
        questions={questions}
        onPassed={onPassed}
      />

      <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/60 px-4 py-4 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950/40 dark:text-zinc-400">
        <p className="font-semibold text-zinc-900 dark:text-zinc-100">After graduation</p>
        <p className="mt-1">
          Next pathway: Manager College → Manager Certification (coming as StreamerU expands). Your
          diploma is the gate — not an instant manager title.
        </p>
      </div>
    </div>
  );
}
