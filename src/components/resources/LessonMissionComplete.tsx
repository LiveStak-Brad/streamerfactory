"use client";

import Link from "next/link";
import { useCallback, useSyncExternalStore, useTransition, useState } from "react";
import { recordStreamerUMissionCompletionAction } from "@/lib/growth/actions";
import { readQuizPassed } from "@/lib/assessments/progress-local";
import { missionDoneStorageKey } from "@/lib/resources/recommended-lesson";
import {
  isLessonMissionComplete,
  subscribeStreamerUProgress,
} from "@/lib/resources/streameru-progress";
import { dispatchStreamerUProgressUpdate } from "@/lib/resources/streameru-progress-events";

type NextLesson = { slug: string; title: string; globalOrder: number };

type Props = {
  lessonSlug: string;
  missionId: string;
  /** Shown after the user marks the session complete — soft nudge only. */
  nextLesson: NextLesson | null;
};

/**
 * Curriculum SoT remains localStorage. Dual-writes to the growth event stream
 * so daily missions / achievements / reputation can observe completion.
 * Soft-gates completion until the lesson quiz is passed.
 */
export function LessonMissionComplete({ lessonSlug, missionId, nextLesson }: Props) {
  const key = missionDoneStorageKey(lessonSlug);
  const done = useSyncExternalStore(
    subscribeStreamerUProgress,
    () => isLessonMissionComplete(lessonSlug),
    () => false,
  );
  const quizPassed = useSyncExternalStore(
    subscribeStreamerUProgress,
    () => readQuizPassed(lessonSlug),
    () => false,
  );
  const [syncNote, setSyncNote] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const blocked = !done && !quizPassed;

  const toggle = useCallback(() => {
    if (!done && !readQuizPassed(lessonSlug)) {
      setSyncNote("Take the lesson quiz first — pass it, then submit this LIVE exam.");
      return;
    }
    const next = !done;
    setSyncNote(null);
    try {
      if (next) {
        localStorage.setItem(key, JSON.stringify({ missionId, at: new Date().toISOString() }));
        startTransition(() => {
          void recordStreamerUMissionCompletionAction({ lessonSlug, missionId }).then((res) => {
            if ("error" in res && res.error) {
              setSyncNote("Saved on this device. Server sync will retry next time you’re signed in.");
            } else {
              setSyncNote("Saved on this device and synced to your Factory progress.");
            }
          });
        });
      } else {
        localStorage.removeItem(key);
      }
      dispatchStreamerUProgressUpdate();
    } catch {
      // ignore quota / private mode
    }
  }, [done, key, lessonSlug, missionId]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={toggle}
          disabled={blocked}
          className={`inline-flex min-h-[48px] items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold transition-[transform,colors,box-shadow] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 ${
            done
              ? "border border-emerald-500/45 bg-emerald-500/15 text-emerald-900 shadow-sm dark:border-emerald-500/35 dark:bg-emerald-500/12 dark:text-emerald-200"
              : "bg-gradient-brand text-white shadow-md hover:-translate-y-0.5 hover:shadow-lg"
          }`}
        >
          {done
            ? "Exam submitted — tap to undo"
            : blocked
              ? "Take the quiz first"
              : "Submit Live Exam"}
        </button>
        {done ? (
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {syncNote ?? "Saved on this device."}
          </p>
        ) : (
          <p className="max-w-xs text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
            {blocked
              ? "Pass the lesson quiz above, then finish the LIVE requirements."
              : syncNote ??
                "Mark complete only after you finish the LIVE requirements and pass criteria."}
          </p>
        )}
      </div>

      {done && nextLesson ? (
        <div className="rounded-xl border border-emerald-200/80 bg-emerald-50/60 px-5 py-5 dark:border-emerald-900/40 dark:bg-emerald-950/30">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-800 dark:text-emerald-300">
            Passed
          </p>
          <p className="mt-2 text-sm font-semibold text-emerald-950 dark:text-emerald-100">
            Ready for the next lesson?
          </p>
          <Link
            href={`/streameru/${nextLesson.slug}`}
            className="mt-4 inline-flex min-h-[44px] items-center rounded-xl bg-zinc-950 px-5 py-2.5 text-sm font-semibold text-white transition-[transform,box-shadow] hover:-translate-y-0.5 dark:bg-white dark:text-zinc-950"
          >
            Next — Lesson {nextLesson.globalOrder}: {nextLesson.title} →
          </Link>
        </div>
      ) : null}
    </div>
  );
}
