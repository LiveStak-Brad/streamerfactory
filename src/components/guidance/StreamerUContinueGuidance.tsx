"use client";

import Link from "next/link";
import { useRecommendedLesson } from "@/components/guidance/useRecommendedLesson";

/**
 * StreamerU hub: soft “continue training” line tied to recommended next lesson.
 */
export function StreamerUContinueGuidance() {
  const { recommended, mounted } = useRecommendedLesson();

  if (!mounted) {
    return (
      <div className="mt-6 h-14 rounded-xl border border-zinc-200/80 bg-muted-bg/40 dark:border-zinc-800 dark:bg-zinc-950/40" />
    );
  }

  return (
    <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-zinc-200/90 bg-muted-bg/50 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-950/50 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent dark:text-accent-muted">
          Continue training
        </p>
        <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">
          Recommended next step:{" "}
          <span className="font-semibold text-zinc-950 dark:text-zinc-50">
            Lesson {recommended.globalOrder} — {recommended.title}
          </span>
        </p>
      </div>
      <Link
        href={recommended.href}
        className="inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-xl bg-zinc-950 px-5 py-2.5 text-sm font-semibold text-white transition-[transform,box-shadow] hover:-translate-y-0.5 dark:bg-white dark:text-zinc-950"
      >
        Open next lesson →
      </Link>
    </div>
  );
}
