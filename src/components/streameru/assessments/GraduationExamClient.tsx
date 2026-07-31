"use client";

import { useCallback, useState, useSyncExternalStore } from "react";
import { CredentialBadge } from "@/components/credentials";
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

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function GraduationExamClient({
  assessmentKey,
  title,
  questions,
  initiallyEligible,
  diplomaIssued,
}: Props) {
  const isClient = useIsClient();
  const [justPassed, setJustPassed] = useState(false);
  const passed = justPassed || (isClient && readGraduationPassed());

  const onPassed = useCallback((graded: { percent: number }, xpAwarded: number) => {
    writeGraduationPassed(graded.percent);
    if (xpAwarded > 0) addLocalStreamerUXp(xpAwarded);
    setJustPassed(true);
    dispatchStreamerUProgressUpdate();
  }, []);

  return (
    <div className="space-y-4">
      {diplomaIssued || initiallyEligible ? (
        <div className="su-celebrate-cert flex items-center gap-4 rounded-xl border border-emerald-200/80 bg-emerald-50/50 px-4 py-3 dark:border-emerald-900/40 dark:bg-emerald-950/25">
          <CredentialBadge type="diploma" size="sm" earned />
          <p className="text-sm font-medium text-emerald-950 dark:text-emerald-100">
            {diplomaIssued
              ? "StreamerU Diploma earned — you graduated."
              : "Graduation ceremony eligible — celebrate on your member dashboard when ready."}
          </p>
        </div>
      ) : passed ? (
        <div className="su-celebrate-pass flex items-center gap-4 rounded-xl border border-emerald-200/80 bg-emerald-50/50 px-4 py-3 dark:border-emerald-900/40 dark:bg-emerald-950/25">
          <CredentialBadge type="diploma" size="sm" />
          <p className="text-sm font-medium text-emerald-950 dark:text-emerald-100">
            Graduation Exam passed. Complete all published LIVE exams and active Program Finals to
            receive your diploma.
          </p>
        </div>
      ) : null}

      <AssessmentPlayer
        assessmentKey={assessmentKey}
        title={title}
        kindLabel="Graduation Exam"
        questions={questions}
        onPassed={onPassed}
      />

      <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/60 px-4 py-4 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950/40 dark:text-zinc-400">
        <p className="font-semibold text-zinc-900 dark:text-zinc-100">After you join &amp; graduate</p>
        <p className="mt-1">
          You don&apos;t need to graduate to be a member — membership is free. Graduating unlocks
          recognition and may help prepare you for future leadership pathways (Manager College →
          Manager Certification as StreamerU expands). A diploma is recognition — not an instant
          manager title.
        </p>
      </div>
    </div>
  );
}
