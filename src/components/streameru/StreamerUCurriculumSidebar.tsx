"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { curriculumByProgram, CURRICULUM_TOTAL_LESSONS, type CurriculumLesson } from "@/lib/resources/curriculum";
import { missionDoneStorageKey } from "@/lib/resources/recommended-lesson";
import { STREAMERU_PROGRESS_EVENT } from "@/lib/resources/streameru-progress-events";
import { trainingTrackLabel } from "@/lib/resources/tracks";
import { getMissionForLessonSlug } from "@/lib/resources/training-missions";

function isLessonMarkedComplete(slug: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = localStorage.getItem(missionDoneStorageKey(slug));
    if (!raw) return false;
    const mission = getMissionForLessonSlug(slug);
    if (!mission) return false;
    const parsed = JSON.parse(raw) as { missionId?: string };
    return parsed.missionId === mission.id;
  } catch {
    return false;
  }
}

function countCompleted(lessons: CurriculumLesson[]): number {
  return lessons.filter((l) => isLessonMarkedComplete(l.slug)).length;
}

function ModuleGroup({
  defaultOpen,
  children,
}: {
  defaultOpen: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  useEffect(() => setOpen(defaultOpen), [defaultOpen]);

  return (
    <details
      className="group rounded-xl border border-zinc-200/80 bg-surface/60 dark:border-zinc-800 dark:bg-zinc-950/30"
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
  const [tick, setTick] = useState(0);

  const refresh = useCallback(() => setTick((t) => t + 1), []);

  useEffect(() => {
    refresh();
  }, [currentSlug, refresh]);

  useEffect(() => {
    const onStorage = () => refresh();
    window.addEventListener("storage", onStorage);
    window.addEventListener(STREAMERU_PROGRESS_EVENT, onStorage);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(STREAMERU_PROGRESS_EVENT, onStorage);
    };
  }, [refresh]);

  const allLessons = useMemo(() => groups.flatMap((g) => g.lessons), [groups]);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // eslint-disable-next-line react-hooks/exhaustive-deps -- tick forces re-read from localStorage
  const completedCount = useMemo(() => countCompleted(allLessons), [allLessons, tick]);

  const currentLesson = currentSlug ? allLessons.find((l) => l.slug === currentSlug) : null;

  return (
    <aside
      className="mb-10 w-full shrink-0 border-b border-zinc-200/80 pb-8 dark:border-zinc-800 lg:mb-0 lg:w-[min(100%,280px)] lg:border-b-0 lg:border-r lg:pb-0 lg:pr-6 xl:w-[300px]"
      aria-label="Course outline"
    >
      <div className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-5.5rem)] lg:overflow-y-auto lg:pr-1">
        <Link
          href="/streameru"
          className="text-xs font-bold uppercase tracking-[0.2em] text-accent transition-colors hover:text-accent/80 dark:text-accent-muted"
        >
          StreamerU
        </Link>
        <p className="mt-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">Course outline</p>

        <div className="mt-4 rounded-xl border border-zinc-200/90 bg-muted-bg/50 px-3 py-3 dark:border-zinc-800 dark:bg-zinc-950/50">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Your progress</p>
          <p className="mt-1 text-lg font-bold tabular-nums text-zinc-950 dark:text-zinc-50">
            {mounted ? completedCount : "—"}{" "}
            <span className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">/ {CURRICULUM_TOTAL_LESSONS}</span>
          </p>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-500">Sessions marked complete on this device.</p>
          {currentLesson ? (
            <p className="mt-3 border-t border-zinc-200/80 pt-3 text-xs leading-snug text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">Now:</span> Lesson {currentLesson.globalOrder}{" "}
              · {trainingTrackLabel(currentLesson.trackId)}
            </p>
          ) : null}
        </div>

        <nav className="mt-6 space-y-4" aria-label="Lessons by module">
          {groups.map(({ programName, lessons }) => {
            const openDefault = lessons.some((l) => l.slug === currentSlug);
            return (
              <ModuleGroup key={programName} defaultOpen={openDefault}>
                <summary className="cursor-pointer list-none px-3 py-2.5 text-sm font-semibold text-zinc-800 marker:content-none dark:text-zinc-200 [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-2">
                    {programName}
                    <span className="text-xs font-normal text-zinc-400 dark:text-zinc-500">
                      {lessons.filter((l) => isLessonMarkedComplete(l.slug)).length}/{lessons.length}
                    </span>
                  </span>
                </summary>
                <ul className="space-y-0.5 border-t border-zinc-200/70 px-2 py-2 dark:border-zinc-800/80">
                  {lessons.map((lesson) => {
                    const published = publishedSlugs.has(lesson.slug);
                    const done = isLessonMarkedComplete(lesson.slug);
                    const active = lesson.slug === currentSlug;
                    return (
                      <li key={lesson.slug}>
                        <Link
                          href={`/streameru/${lesson.slug}`}
                          className={`flex items-start gap-2 rounded-lg px-2 py-2 text-left text-sm transition-colors ${
                            active
                              ? "bg-accent/15 font-semibold text-zinc-950 ring-1 ring-accent/30 dark:bg-accent/10 dark:text-zinc-50 dark:ring-accent/25"
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
                                {trainingTrackLabel(lesson.trackId)}
                              </span>
                            )}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </ModuleGroup>
            );
          })}
        </nav>

        <div className="mt-6 rounded-lg border border-dashed border-zinc-300/90 px-3 py-3 text-xs leading-relaxed text-zinc-500 dark:border-zinc-700 dark:text-zinc-500">
          Tracks are labels along the path — follow lessons in order for the full program.
        </div>
      </div>
    </aside>
  );
}
