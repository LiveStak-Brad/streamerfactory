"use client";

import Link from "next/link";
import { useRecommendedLesson } from "@/components/guidance/useRecommendedLesson";

/**
 * Welcome page: StreamerU as the default path — recommended, continue, and start links.
 */
export function WelcomeTrainingGuidance() {
  const { recommended, continueHref, continueTitle, mounted, lastVisitedSlug } = useRecommendedLesson();

  return (
    <div className="mt-10 space-y-4 rounded-2xl border border-accent/25 bg-gradient-to-br from-accent/[0.07] via-surface to-muted-bg/30 p-6 shadow-sm dark:from-accent/[0.05] dark:via-zinc-950 dark:to-zinc-950/80 sm:p-8">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent dark:text-accent-muted">
        Recommended next step
      </p>
      <div className="grid gap-6 sm:grid-cols-1 sm:gap-8 lg:grid-cols-3">
        <div>
          <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Start your training</h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Open the first four lessons in order — same curriculum as the full program.
          </p>
          <Link
            href="/streameru/start-here"
            className="mt-4 inline-flex min-h-[44px] items-center text-sm font-semibold text-accent hover:underline dark:text-accent-muted"
          >
            Start your training →
          </Link>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Continue where you left off</h2>
          {!mounted ? (
            <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-500">Loading…</p>
          ) : continueHref && lastVisitedSlug ? (
            <>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                Last opened on this device — pick up the same lesson anytime.
              </p>
              <Link
                href={continueHref}
                className="mt-4 inline-flex min-h-[44px] items-center text-sm font-semibold text-accent hover:underline dark:text-accent-muted"
              >
                {continueTitle ?? "Open lesson"} →
              </Link>
            </>
          ) : (
            <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Visit a lesson in StreamerU and we&apos;ll remember it here for your next visit.
            </p>
          )}
        </div>
        <div>
          <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Your next lesson</h2>
          {!mounted ? (
            <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-500">Loading…</p>
          ) : (
            <>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                Suggested from your progress on this device (missions + last visit).{" "}
                <span className="text-zinc-500 dark:text-zinc-500">Not required — just a nudge.</span>
              </p>
              <Link
                href={recommended.href}
                className="mt-4 inline-flex min-h-[44px] items-center rounded-xl bg-zinc-950 px-4 py-2.5 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950"
              >
                Lesson {recommended.globalOrder}: {recommended.title} →
              </Link>
            </>
          )}
        </div>
      </div>
      <p className="border-t border-zinc-200/80 pt-4 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-500">
        Battles, scheduling, and the rest of the app stay open — this is guidance, not a gate.
      </p>
    </div>
  );
}
