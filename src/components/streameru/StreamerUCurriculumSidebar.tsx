"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useMemo, useState, useSyncExternalStore } from "react";
import { SuProgressBar } from "@/components/streameru/SuProgressBar";
import {
  curriculumByProgram,
  CURRICULUM_TOTAL_LESSONS,
} from "@/lib/resources/curriculum";
import {
  getCompletedLessonSlugsServerSnapshot,
  getCompletedLessonSlugsSnapshot,
  subscribeStreamerUProgress,
} from "@/lib/resources/streameru-progress";
import { trainingTrackLabel } from "@/lib/resources/tracks";

/** Parent remounts via `key` when navigation changes which semester should open. */
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
  const coursePct =
    CURRICULUM_TOTAL_LESSONS > 0 ? (completedCount / CURRICULUM_TOTAL_LESSONS) * 100 : 0;

  const allLessons = useMemo(() => groups.flatMap((g) => g.lessons), [groups]);
  const currentLesson = currentSlug ? allLessons.find((l) => l.slug === currentSlug) : null;

  return (
    <aside
      className="mb-10 w-full shrink-0 border-b border-zinc-200/80 pb-8 dark:border-zinc-800 lg:mb-0 lg:w-[min(100%,280px)] lg:border-b-0 lg:border-r lg:pb-0 lg:pr-5 xl:w-[300px] xl:pr-6"
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
        <div className="mt-4 rounded-xl border border-zinc-200/90 bg-muted-bg/50 px-3 py-3.5 dark:border-zinc-800 dark:bg-zinc-950/50">
          <p className="text-[0.65rem] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Your progress
          </p>
          <p className="mt-1 text-lg font-bold tabular-nums text-zinc-950 dark:text-zinc-50">
            {completedCount}{" "}
            <span className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
              / {CURRICULUM_TOTAL_LESSONS}
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
              {currentLesson.globalOrder} · {trainingTrackLabel(currentLesson.trackId)}
            </p>
          ) : null}
        </div>

        <nav className="mt-5 space-y-3" aria-label="Lessons by semester">
          {groups.map(({ programName, lessons }, semesterIndex) => {
            const openDefault = lessons.some((l) => l.slug === currentSlug);
            const doneInSemester = lessons.filter((l) => completedSlugs.has(l.slug)).length;
            const semesterPct =
              lessons.length > 0 ? (doneInSemester / lessons.length) * 100 : 0;
            return (
              <ModuleGroup
                key={`${programName}-${currentSlug ?? "none"}-${openDefault ? "open" : "closed"}`}
                initiallyOpen={openDefault}
              >
                <summary className="cursor-pointer list-none px-3 py-2.5 marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-2 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                    <span className="min-w-0">
                      <span className="block text-[0.65rem] font-bold uppercase tracking-wider text-accent dark:text-accent-muted">
                        Semester {semesterIndex + 1}
                      </span>
                      <span className="mt-0.5 block truncate">{programName}</span>
                    </span>
                    <span className="shrink-0 text-xs font-normal tabular-nums text-zinc-400 dark:text-zinc-500">
                      {doneInSemester}/{lessons.length}
                    </span>
                  </span>
                  <SuProgressBar
                    className="mt-2"
                    value={semesterPct}
                    trackClassName="h-1"
                    label={`${programName} progress`}
                  />
                </summary>
                <ul className="space-y-0.5 border-t border-zinc-200/70 px-2 py-2 dark:border-zinc-800/80">
                  {lessons.map((lesson) => {
                    const published = publishedSlugs.has(lesson.slug);
                    const done = completedSlugs.has(lesson.slug);
                    const active = lesson.slug === currentSlug;
                    return (
                      <li key={lesson.slug}>
                        <Link
                          href={`/streameru/${lesson.slug}`}
                          className={`flex items-start gap-2 rounded-lg px-2 py-2 text-left text-sm transition-colors ${
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

        <div className="mt-5 rounded-lg border border-dashed border-zinc-300/90 px-3 py-3 text-xs leading-relaxed text-zinc-500 dark:border-zinc-700 dark:text-zinc-500">
          Follow lessons in order for the full program. Semesters stay open — no hard locks.
        </div>
      </div>
    </aside>
  );
}
