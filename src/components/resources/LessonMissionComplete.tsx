"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { missionDoneStorageKey } from "@/lib/resources/recommended-lesson";
import { dispatchStreamerUProgressUpdate } from "@/lib/resources/streameru-progress-events";

type NextLesson = { slug: string; title: string; globalOrder: number };

type Props = {
  lessonSlug: string;
  missionId: string;
  /** Shown after the user marks the session complete — soft nudge only. */
  nextLesson: NextLesson | null;
};

/**
 * Persists “mission complete” in localStorage only (no server / gamification).
 */
export function LessonMissionComplete({ lessonSlug, missionId, nextLesson }: Props) {
  const key = missionDoneStorageKey(lessonSlug);
  const [done, setDone] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const parsed = JSON.parse(raw) as { missionId?: string; at?: string };
        setDone(parsed.missionId === missionId);
      }
    } catch {
      setDone(false);
    }
  }, [key, missionId]);

  const toggle = useCallback(() => {
    const next = !done;
    setDone(next);
    try {
      if (next) {
        localStorage.setItem(key, JSON.stringify({ missionId, at: new Date().toISOString() }));
      } else {
        localStorage.removeItem(key);
      }
      dispatchStreamerUProgressUpdate();
    } catch {
      // ignore quota / private mode
    }
  }, [done, key, missionId]);

  if (!mounted) {
    return (
      <div className="h-11 rounded-xl border border-zinc-200/80 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-950/40" />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={toggle}
          className={`inline-flex min-h-[44px] items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors ${
            done
              ? "border border-emerald-500/40 bg-emerald-500/15 text-emerald-900 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200"
              : "border border-accent/35 bg-accent/10 text-accent dark:border-accent/40 dark:bg-accent/10 dark:text-accent-muted"
          }`}
        >
          {done ? "Session complete — tap to undo" : "Complete this session"}
        </button>
        {done ? (
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Saved on this device. Sign-in sync can be added later.
          </p>
        ) : null}
      </div>

      {done && nextLesson ? (
        <div className="rounded-xl border border-emerald-200/80 bg-emerald-50/50 px-4 py-4 dark:border-emerald-900/40 dark:bg-emerald-950/25">
          <p className="text-sm font-semibold text-emerald-950 dark:text-emerald-100">Nice — ready for the next lesson?</p>
          <Link
            href={`/streameru/${nextLesson.slug}`}
            className="mt-3 inline-flex min-h-[44px] items-center text-sm font-semibold text-accent hover:underline dark:text-accent-muted"
          >
            Next lesson — Lesson {nextLesson.globalOrder}: {nextLesson.title} →
          </Link>
        </div>
      ) : null}
    </div>
  );
}
