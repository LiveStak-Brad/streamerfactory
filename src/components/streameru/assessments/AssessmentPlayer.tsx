"use client";

import { useMemo, useState, useTransition } from "react";
import { submitAssessmentAction } from "@/lib/assessments/actions";
import { gradeAssessment } from "@/lib/assessments/scoring";
import { passThresholdForKind } from "@/lib/assessments/xp";
import { getAssessmentByKey } from "@/lib/assessments/registry";
import type {
  AchievementSuggestion,
  AssessmentAnswerMap,
  GradedAttempt,
} from "@/lib/assessments/types";
import { dispatchStreamerUProgressUpdate } from "@/lib/resources/streameru-progress-events";

type PublicQuestion = {
  id: string;
  prompt: string;
  choices: { id: string; text: string }[];
};

type Props = {
  assessmentKey: string;
  title: string;
  kindLabel: string;
  questions: PublicQuestion[];
  onPassed?: (graded: GradedAttempt, xpAwarded: number) => void;
};

export function AssessmentPlayer({
  assessmentKey,
  title,
  kindLabel,
  questions,
  onPassed,
}: Props) {
  const [answers, setAnswers] = useState<AssessmentAnswerMap>({});
  const [graded, setGraded] = useState<GradedAttempt | null>(null);
  const [xpAwarded, setXpAwarded] = useState(0);
  const [xpTotal, setXpTotal] = useState<number | null>(null);
  const [masteryAcademy, setMasteryAcademy] = useState<number | null>(null);
  const [achievements, setAchievements] = useState<AchievementSuggestion[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const allAnswered = useMemo(
    () => questions.every((q) => Boolean(answers[q.id])),
    [answers, questions],
  );

  const threshold = useMemo(() => {
    const a = getAssessmentByKey(assessmentKey);
    return a ? passThresholdForKind(a.kind) : 70;
  }, [assessmentKey]);

  function select(questionId: string, choiceId: string) {
    if (graded) return;
    setAnswers((prev) => ({ ...prev, [questionId]: choiceId }));
  }

  function submit() {
    setError(null);
    startTransition(() => {
      void (async () => {
        const full = getAssessmentByKey(assessmentKey);
        if (!full) {
          setError("Assessment not found.");
          return;
        }

        const local = gradeAssessment(full, answers);
        setGraded(local);

        const res = await submitAssessmentAction({ assessmentKey, answers });
        if ("error" in res && res.error) {
          setError(res.error);
          if (local.passed) onPassed?.(local, 0);
          dispatchStreamerUProgressUpdate();
          return;
        }
        if ("ok" in res && res.ok) {
          setGraded(res.graded);
          setXpAwarded(res.xpAwarded);
          setXpTotal(res.streameruXpTotal);
          setMasteryAcademy(res.mastery.academy);
          setAchievements(res.newlyUnlocked);
          if (res.graded.passed) onPassed?.(res.graded, res.xpAwarded);
          dispatchStreamerUProgressUpdate();
        }
      })();
    });
  }

  function retry() {
    setGraded(null);
    setAnswers({});
    setXpAwarded(0);
    setAchievements([]);
    setError(null);
  }

  return (
    <section
      className="rounded-2xl border border-zinc-200/80 bg-surface p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.55)] dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] sm:p-8"
      aria-labelledby="assessment-heading"
    >
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent dark:text-accent-muted">
        {kindLabel}
      </p>
      <h2
        id="assessment-heading"
        className="mt-2 text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50"
      >
        {title}
      </h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        {questions.length} multiple-choice questions · Pass at {threshold}% · Earns StreamerU XP
      </p>

      <ol className="mt-8 space-y-8">
        {questions.map((q, index) => {
          const result = graded?.questions.find((g) => g.questionId === q.id) ?? null;
          return (
            <li key={q.id} className="space-y-3">
              <p className="text-base font-semibold text-zinc-950 dark:text-zinc-50">
                <span className="mr-2 text-zinc-400">{index + 1}.</span>
                {q.prompt}
              </p>
              <div className="space-y-2" role="radiogroup" aria-label={q.prompt}>
                {q.choices.map((choice) => {
                  const gradedChoice = result?.choices.find((c) => c.choiceId === choice.id);
                  const selected = result
                    ? Boolean(gradedChoice?.selected)
                    : answers[q.id] === choice.id;
                  const correct = Boolean(gradedChoice?.correct);
                  let styles =
                    "border-zinc-200 bg-white hover:border-accent/40 dark:border-zinc-800 dark:bg-zinc-900";
                  if (result) {
                    if (correct) {
                      styles =
                        "border-emerald-500/50 bg-emerald-500/10 dark:border-emerald-500/40 dark:bg-emerald-500/10";
                    } else if (selected) {
                      styles =
                        "border-rose-400/50 bg-rose-500/10 dark:border-rose-500/40 dark:bg-rose-500/10";
                    } else {
                      styles =
                        "border-zinc-200 bg-zinc-50/80 dark:border-zinc-800 dark:bg-zinc-950/60";
                    }
                  } else if (selected) {
                    styles =
                      "border-accent/50 bg-accent/10 dark:border-accent/40 dark:bg-accent/10";
                  }

                  return (
                    <div key={choice.id}>
                      <button
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        disabled={Boolean(graded) || pending}
                        onClick={() => select(q.id, choice.id)}
                        className={`flex w-full min-h-[44px] items-start rounded-xl border px-4 py-3 text-left text-sm transition-colors ${styles}`}
                      >
                        {choice.text}
                      </button>
                      {gradedChoice && (selected || correct) ? (
                        <p
                          className={`mt-1.5 px-1 text-xs leading-relaxed ${
                            correct
                              ? "text-emerald-800 dark:text-emerald-200"
                              : "text-rose-800 dark:text-rose-200"
                          }`}
                        >
                          {gradedChoice.explanation}
                        </p>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </li>
          );
        })}
      </ol>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {!graded ? (
          <button
            type="button"
            disabled={!allAnswered || pending}
            onClick={submit}
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-zinc-950 px-6 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white dark:text-zinc-950"
          >
            {pending ? "Scoring…" : "Submit answers"}
          </button>
        ) : (
          <button
            type="button"
            onClick={retry}
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-zinc-300 px-6 py-2.5 text-sm font-semibold text-zinc-800 dark:border-zinc-700 dark:text-zinc-100"
          >
            Retake
          </button>
        )}
        {!allAnswered && !graded ? (
          <p className="text-xs text-zinc-500">Answer every question to submit.</p>
        ) : null}
      </div>

      {error ? (
        <p className="mt-4 text-sm text-amber-800 dark:text-amber-200">{error}</p>
      ) : null}

      {graded ? (
        <div
          className={`mt-8 rounded-xl border px-4 py-4 ${
            graded.passed
              ? "su-celebrate-pass border-emerald-200/80 bg-emerald-50/60 dark:border-emerald-900/40 dark:bg-emerald-950/30"
              : "border-rose-200/80 bg-rose-50/60 dark:border-rose-900/40 dark:bg-rose-950/30"
          }`}
        >
          <p className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
            Score {graded.percent}% ({graded.correctCount}/{graded.total}) —{" "}
            {graded.passed ? "Passed — well done" : `Need ${threshold}% to pass`}
          </p>
          {graded.passed ? (
            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
              StreamerU XP earned this attempt: +{xpAwarded}
              {xpTotal != null ? ` · Total StreamerU XP: ${xpTotal}` : null}
              {masteryAcademy != null ? ` · Academy mastery: ${masteryAcademy}%` : null}
              {" · Keep learning."}
            </p>
          ) : (
            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
              Review the explanations above, then retake when ready.
            </p>
          )}
          {achievements.length > 0 ? (
            <div className="mt-4">
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                Suggested achievements unlocked
              </p>
              <ul className="mt-2 space-y-2">
                {achievements.map((a) => (
                  <li
                    key={a.key}
                    className="rounded-lg border border-zinc-200/80 bg-white/70 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900/70"
                  >
                    <span className="font-semibold">{a.name}</span>
                    {a.description ? (
                      <span className="block text-xs text-zinc-500 dark:text-zinc-400">
                        {a.description}
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
