"use client";

import Link from "next/link";
import { useRecommendedLesson } from "@/components/guidance/useRecommendedLesson";
import {
  BATTLE_HUB_RECOMMENDED_LESSON_SLUG,
} from "@/lib/resources/recommended-lesson";
import { getCurriculumLesson } from "@/lib/resources/curriculum";

/**
 * Battle Hub: non-blocking tips — users can battle anytime; training is optional prep.
 */
export function BattleHubTrainingGuidance() {
  const { recommended, mounted } = useRecommendedLesson();
  const battleLesson = getCurriculumLesson(BATTLE_HUB_RECOMMENDED_LESSON_SLUG);
  const title = battleLesson?.title ?? "Running your first battle";
  const href = `/streameru/${BATTLE_HUB_RECOMMENDED_LESSON_SLUG}`;

  return (
    <div className="mb-8 space-y-4">
      <div className="rounded-2xl border border-zinc-200/90 bg-gradient-to-br from-muted-bg/80 to-surface/90 px-5 py-5 dark:border-zinc-800 dark:from-zinc-950/80 dark:to-zinc-950/40 sm:px-6 sm:py-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent dark:text-accent-muted">
          Before your next battle
        </p>
        <p className="mt-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">{title}</p>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          You can battle anytime — this lesson is here to help you perform better when you&apos;re ready.
        </p>
        <Link
          href={href}
          className="mt-4 inline-flex min-h-[44px] items-center text-sm font-semibold text-accent hover:underline dark:text-accent-muted"
        >
          Open lesson →
        </Link>
        {mounted ? (
          <p className="mt-4 border-t border-zinc-200/80 pt-4 text-xs leading-relaxed text-zinc-500 dark:border-zinc-800 dark:text-zinc-500">
            Recommended next in the program (this device): Lesson {recommended.globalOrder} — {recommended.title}.{" "}
            <Link href={recommended.href} className="font-semibold text-accent hover:underline dark:text-accent-muted">
              Continue training →
            </Link>
          </p>
        ) : null}
      </div>

      <div className="rounded-xl border border-dashed border-zinc-300/90 bg-muted-bg/40 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-950/30">
        <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
          <span className="font-semibold text-zinc-900 dark:text-zinc-100">Tip:</span> Most creators struggle in their
          first battles. When you have a few minutes,{" "}
          <Link href="/streameru/understanding-battles" className="font-semibold text-accent hover:underline dark:text-accent-muted">
            learn this first
          </Link>{" "}
          — scheduling and Battle Hub stay available either way.
        </p>
      </div>
    </div>
  );
}
