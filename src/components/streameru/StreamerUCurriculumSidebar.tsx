"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useMemo, useState, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/Button";
import { SuProgressBar } from "@/components/streameru/SuProgressBar";
import {
  ADVANCED_CREATOR_ROADMAP_TOPICS,
  curriculumByProgram,
  CURRICULUM_TOTAL_LESSONS,
  FIRST_PROGRAM_LESSON_SLUG,
  isEssentialSafetyLesson,
} from "@/lib/resources/curriculum";
import {
  getRecommendedLessonServerSnapshot,
  getRecommendedLessonSnapshot,
} from "@/lib/resources/recommended-lesson";
import {
  getCompletedLessonSlugsServerSnapshot,
  getCompletedLessonSlugsSnapshot,
  subscribeStreamerUProgress,
} from "@/lib/resources/streameru-progress";
import { FIRST_SAFETY_LESSON_SLUG, PUBLISHED_LESSON_COUNT } from "@/lib/streameru/academy-meta";

/** Parent remounts via `key` when navigation changes which program should open. */
function ModuleGroup({
  initiallyOpen,
  children,
}: {
  initiallyOpen: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(initiallyOpen);
  return (
    <details
      className="group rounded-xl border border-zinc-200/80 bg-surface/70 dark:border-zinc-800 dark:bg-zinc-950/40"
      open={open}
      onToggle={(e) => setOpen(e.currentTarget.open)}
    >
      {children}
    </details>
  );
}

function CheckIcon({ done }: { done: boolean }) {
  return (
    <span
      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold ${
        done
          ? "border-emerald-500/50 bg-emerald-500/15 text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-300"
          : "border-zinc-200 bg-transparent text-transparent dark:border-zinc-700"
      }`}
      aria-hidden
    >
      {done ? "✓" : ""}
    </span>
  );
}

type Props = {
  publishedSlugs: Set<string>;
  currentSlug: string | null;
};

export function StreamerUCurriculumSidebar({ publishedSlugs, currentSlug }: Props) {
  const groups = useMemo(() => curriculumByProgram(), []);
  const completedSlugs = useSyncExternalStore(
    subscribeStreamerUProgress,
    getCompletedLessonSlugsSnapshot,
    getCompletedLessonSlugsServerSnapshot,
  );
  const completedCount = completedSlugs.size;
  const hasProgress = completedCount > 0;
  const coursePct =
    CURRICULUM_TOTAL_LESSONS > 0 ? (completedCount / CURRICULUM_TOTAL_LESSONS) * 100 : 0;

  const recommended = useSyncExternalStore(
    subscribeStreamerUProgress,
    getRecommendedLessonSnapshot,
    getRecommendedLessonServerSnapshot,
  );

  const allLessons = useMemo(() => groups.flatMap((g) => g.lessons), [groups]);
  const currentLesson = currentSlug ? allLessons.find((l) => l.slug === currentSlug) : null;
  const primaryHref = hasProgress ? recommended.href : `/streameru/${FIRST_PROGRAM_LESSON_SLUG}`;
  const primaryLabel = hasProgress
    ? `Continue · Lesson ${recommended.globalOrder}`
    : "Start Your Creator Journey";

  return (
    <aside
      className="mb-10 w-full shrink-0 border-b border-zinc-200/80 pb-8 dark:border-zinc-800 lg:mb-0 lg:w-[min(100%,280px)] lg:border-b-0 lg:border-r lg:pb-0 lg:pr-5 xl:w-[300px] xl:pr-6"
      aria-label="Course outline"
    >
      <div className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-5.5rem)] lg:overflow-y-auto lg:pr-1">
        <Link
          href="/streameru"
          className="text-xs font-bold uppercase tracking-[0.2em] text-accent transition-colors hover:text-accent/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:text-accent-muted"
        >
          StreamerU
        </Link>
        <p className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
          Free Live Streaming Academy
        </p>
        <p className="mt-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">Course outline</p>

        <div className="mt-3">
          <Button href={primaryHref} variant="primary" className="min-h-[40px] w-full px-4 text-sm">
            {primaryLabel}
          </Button>
        </div>

        <div className="mt-4 rounded-xl border border-zinc-200/90 bg-muted-bg/50 px-3 py-3.5 dark:border-zinc-800 dark:bg-zinc-950/50">
          <p className="text-[0.65rem] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Your progress
          </p>
          <p className="mt-1 text-lg font-bold tabular-nums text-zinc-950 dark:text-zinc-50">
            {completedCount}{" "}
            <span className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
              / {PUBLISHED_LESSON_COUNT}
            </span>
          </p>
          <SuProgressBar
            className="mt-2.5"
            value={coursePct}
            label="Overall StreamerU progress"
          />
          <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-500">
            Live Exams marked complete on this device.
          </p>
          {currentLesson ? (
            <p className="mt-3 border-t border-zinc-200/80 pt-3 text-xs leading-snug text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">Now:</span> Lesson{" "}
              {currentLesson.globalOrder} · {currentLesson.programName}
            </p>
          ) : null}
        </div>

        <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs font-semibold">
          <Link
            href="/streameru/library"
            className="text-accent hover:underline dark:text-accent-muted"
          >
            Resource Library →
          </Link>
          <Link
            href="/streameru/graduation"
            className="text-zinc-600 hover:underline dark:text-zinc-400"
          >
            Graduation Exam
          </Link>
        </div>

        <p className="mt-3 text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-500">
          Path: Lesson → Quiz → LIVE Exam → Program Final → Program Certificate → Graduation Exam →
          Diploma
        </p>

        <nav className="mt-5 space-y-3" aria-label="Lessons by program">
          {groups.map(({ programName, lessons }, programIndex) => {
            const openDefault = lessons.some((l) => l.slug === currentSlug);
            const doneInProgram = lessons.filter((l) => completedSlugs.has(l.slug)).length;
            const programPct =
              lessons.length > 0 ? (doneInProgram / lessons.length) * 100 : 0;
            const isBeginner = programName === "Beginner Foundations";
            const isAdvanced = programName === "Advanced Creator";
            return (
              <ModuleGroup
                key={`${programName}-${currentSlug ?? "none"}-${openDefault ? "open" : "closed"}`}
                initiallyOpen={openDefault || (isBeginner && !currentSlug)}
              >
                <summary className="cursor-pointer list-none px-3 py-2.5 marker:content-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-2 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                    <span className="min-w-0">
                      <span className="block text-[0.65rem] font-bold uppercase tracking-wider text-accent dark:text-accent-muted">
                        Program {programIndex + 1}
                        {isBeginner ? " · Safety inside" : ""}
                        {isAdvanced ? " · Expanding" : ""}
                      </span>
                      <span className="mt-0.5 block truncate">{programName}</span>
                    </span>
                    <span className="shrink-0 text-xs font-normal tabular-nums text-zinc-400 dark:text-zinc-500">
                      {isAdvanced && lessons.length === 0
                        ? "Soon"
                        : `${doneInProgram}/${lessons.length}`}
                    </span>
                  </span>
                  {lessons.length > 0 ? (
                    <SuProgressBar
                      className="mt-2"
                      value={programPct}
                      trackClassName="h-1"
                      label={`${programName} progress`}
                    />
                  ) : null}
                </summary>
                {isAdvanced && lessons.length === 0 ? (
                  <ul className="space-y-1 border-t border-zinc-200/70 px-3 py-3 text-[11px] leading-snug text-zinc-500 dark:border-zinc-800/80 dark:text-zinc-500">
                    <li className="font-medium text-zinc-600 dark:text-zinc-400">
                      Lessons in development:
                    </li>
                    {ADVANCED_CREATOR_ROADMAP_TOPICS.map((topic) => (
                      <li key={topic}>· {topic}</li>
                    ))}
                  </ul>
                ) : (
                  <ul className="space-y-0.5 border-t border-zinc-200/70 px-2 py-2 dark:border-zinc-800/80">
                    {isBeginner ? (
                      <li className="px-2 pb-2 text-[11px] leading-snug text-teal-800 dark:text-teal-200">
                        Essential safety is taught here before regular LIVE — not as a separate later
                        program.
                      </li>
                    ) : null}
                    {lessons.map((lesson) => {
                      const published = publishedSlugs.has(lesson.slug);
                      const done = completedSlugs.has(lesson.slug);
                      const active = lesson.slug === currentSlug;
                      const isSafety = isEssentialSafetyLesson(lesson.slug);
                      const isFirstSafety = lesson.slug === FIRST_SAFETY_LESSON_SLUG;
                      return (
                        <li key={lesson.slug}>
                          <Link
                            href={`/streameru/${lesson.slug}`}
                            className={`flex items-start gap-2 rounded-lg px-2 py-2 text-left text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                              active
                                ? "bg-accent/15 font-semibold text-zinc-950 shadow-sm ring-1 ring-accent/35 dark:bg-accent/12 dark:text-zinc-50 dark:ring-accent/30"
                                : "text-zinc-700 hover:bg-zinc-100/90 dark:text-zinc-300 dark:hover:bg-zinc-800/60"
                            } ${!published ? "opacity-60" : ""}`}
                          >
                            <CheckIcon done={done} />
                            <span className="min-w-0 flex-1">
                              <span className="font-mono text-[11px] font-semibold text-zinc-400 dark:text-zinc-500">
                                {lesson.globalOrder}.
                              </span>{" "}
                              <span className="leading-snug">{lesson.title}</span>
                              {!published ? (
                                <span className="mt-0.5 block text-[11px] font-normal text-amber-700/90 dark:text-amber-400/90">
                                  Coming soon
                                </span>
                              ) : (
                                <span className="mt-0.5 block text-[11px] font-normal text-zinc-500 dark:text-zinc-500">
                                  {isFirstSafety
                                    ? "Essential safety starts here"
                                    : isSafety
                                      ? "Essential safety"
                                      : lesson.programName}
                                </span>
                              )}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </ModuleGroup>
            );
          })}
        </nav>

        <div className="mt-5 rounded-lg border border-dashed border-zinc-300/90 px-3 py-3 text-xs leading-relaxed text-zinc-500 dark:border-zinc-700 dark:text-zinc-500">
          Follow lessons in order for the full academy. Programs stay open — no hard locks.{" "}
          {PUBLISHED_LESSON_COUNT} lessons available now.
        </div>
      </div>
    </aside>
  );
}
