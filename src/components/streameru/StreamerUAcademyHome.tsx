"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { CourseModuleCard, type ModuleLessonStatus } from "@/components/ui/CourseModuleCard";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { Button } from "@/components/ui/Button";
import {
  CURRICULUM,
  CURRICULUM_TOTAL_LESSONS,
  FIRST_PROGRAM_LESSON_SLUG,
  curriculumByProgram,
  getCurriculumLesson,
} from "@/lib/resources/curriculum";
import {
  STREAMERU_MISSION_DONE_KEY_PREFIX,
  computeRecommendedFromStorage,
  getDefaultRecommendedLesson,
  readLastVisitedSlugFromStorage,
} from "@/lib/resources/recommended-lesson";
import { STREAMERU_PROGRESS_EVENT } from "@/lib/resources/streameru-progress-events";

type Props = {
  publishedSlugs: string[];
};

type Snapshot = {
  completedSlugs: Set<string>;
  recommendedHref: string;
  recommendedTitle: string;
  recommendedOrder: number;
  continueHref: string | null;
  continueTitle: string | null;
};

function readCompletedSlugs(): Set<string> {
  const set = new Set<string>();
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key?.startsWith(STREAMERU_MISSION_DONE_KEY_PREFIX)) continue;
      const slug = key.slice(STREAMERU_MISSION_DONE_KEY_PREFIX.length);
      const raw = localStorage.getItem(key);
      if (!raw) continue;
      try {
        const parsed = JSON.parse(raw) as { missionId?: string };
        if (parsed?.missionId && getCurriculumLesson(slug)) set.add(slug);
      } catch {
        // skip
      }
    }
  } catch {
    return set;
  }
  return set;
}

const emptySnapshot: Snapshot = {
  completedSlugs: new Set(),
  recommendedHref: getDefaultRecommendedLesson().href,
  recommendedTitle: getDefaultRecommendedLesson().title,
  recommendedOrder: getDefaultRecommendedLesson().globalOrder,
  continueHref: null,
  continueTitle: null,
};

/** Cached so useSyncExternalStore getSnapshot stays referentially stable. */
let cachedSnapshot: Snapshot = emptySnapshot;
let cachedSnapshotKey = "";

function readSnapshot(): Snapshot {
  const completedSlugs = readCompletedSlugs();
  const recommended = computeRecommendedFromStorage();
  const last = readLastVisitedSlugFromStorage();
  const lastLesson = last ? getCurriculumLesson(last) : null;
  const continueHref = last ? `/streameru/${last}` : null;
  const continueTitle = lastLesson?.title ?? null;
  const key = [
    [...completedSlugs].sort().join(","),
    recommended.href,
    recommended.title,
    String(recommended.globalOrder),
    continueHref ?? "",
    continueTitle ?? "",
  ].join("|");
  if (key === cachedSnapshotKey) return cachedSnapshot;
  cachedSnapshotKey = key;
  cachedSnapshot = {
    completedSlugs,
    recommendedHref: recommended.href,
    recommendedTitle: recommended.title,
    recommendedOrder: recommended.globalOrder,
    continueHref,
    continueTitle,
  };
  return cachedSnapshot;
}

function getServerSnapshot(): Snapshot {
  return emptySnapshot;
}

function subscribe(onStoreChange: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const handler = () => onStoreChange();
  window.addEventListener(STREAMERU_PROGRESS_EVENT, handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(STREAMERU_PROGRESS_EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}

function moduleStatus(
  lessons: { slug: string }[],
  completed: Set<string>,
  published: Set<string>,
  recommendedSlug: string,
): ModuleLessonStatus {
  const anyPublished = lessons.some((l) => published.has(l.slug));
  if (!anyPublished) return "unpublished";
  const done = lessons.filter((l) => completed.has(l.slug)).length;
  if (done >= lessons.length) return "completed";
  if (lessons.some((l) => l.slug === recommendedSlug)) return "current";
  if (done > 0) return "current";
  return "available";
}

/**
 * Academy hub: progress from device-local missions + curriculum roadmap.
 * Does not invent XP or locked gates.
 */
export function StreamerUAcademyHome({ publishedSlugs }: Props) {
  const snapshot = useSyncExternalStore(subscribe, readSnapshot, getServerSnapshot);
  const published = new Set(publishedSlugs);
  const completedCount = snapshot.completedSlugs.size;
  const percent = CURRICULUM_TOTAL_LESSONS > 0 ? (completedCount / CURRICULUM_TOTAL_LESSONS) * 100 : 0;
  const programs = curriculumByProgram();
  const recommendedSlug =
    snapshot.recommendedHref.replace(/^\/streameru\//, "") || FIRST_PROGRAM_LESSON_SLUG;
  const remaining = Math.max(0, CURRICULUM_TOTAL_LESSONS - completedCount);

  const moduleDescriptions: Record<string, string> = {
    "Beginner Foundations": "Setup, structure, and your first consistent LIVE weeks.",
    "Live Streaming Mastery": "Presence, retention, and stronger on-stream craft.",
    "Battles & Collaboration": "Battle prep, formats, and collaborating with the network.",
    "Growth & Monetization": "Audience growth and sustainable LIVE income habits.",
    "Rules & Safety": "Platform rules, violations, and long-term account health.",
  };

  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0b0a12] px-5 py-8 text-zinc-50 sm:px-8 sm:py-10">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_10%_0%,rgba(91, 59, 255,0.35),transparent_55%),radial-gradient(ellipse_50%_50%_at_100%_30%,rgba(160, 32, 240,0.22),transparent_50%)]"
          aria-hidden
        />
        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-accent-muted">
              Streamer University
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-[-0.03em] text-white sm:text-5xl">
              StreamerU
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-zinc-400">
              A 24-lesson academy path — study each lesson, run the LIVE mission, then move to the next
              step. Progress on this device is saved as you complete missions.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button href={snapshot.recommendedHref} variant="primary" className="min-h-[48px] px-6">
                Continue: Lesson {snapshot.recommendedOrder}
              </Button>
              <Button
                href={`/streameru/${FIRST_PROGRAM_LESSON_SLUG}`}
                variant="secondaryOnDark"
                className="min-h-[48px] px-6"
              >
                Start from lesson 1
              </Button>
            </div>
            {snapshot.continueTitle && snapshot.continueHref ? (
              <p className="mt-4 text-sm text-zinc-500">
                Last opened:{" "}
                <Link href={snapshot.continueHref} className="font-semibold text-zinc-300 hover:text-white">
                  {snapshot.continueTitle}
                </Link>
              </p>
            ) : null}
          </div>
          <div className="flex items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur-md">
            <ProgressRing
              value={percent}
              size={120}
              label="Complete"
              sublabel={`${completedCount}/${CURRICULUM_TOTAL_LESSONS}`}
              toneClassName="text-violet-400"
            />
            <div>
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-zinc-500">
                Recommended next
              </p>
              <p className="mt-1 text-base font-semibold text-white">{snapshot.recommendedTitle}</p>
              <p className="mt-2 text-sm text-zinc-400">
                {remaining} lesson{remaining === 1 ? "" : "s"} remaining in the program
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-6">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-accent dark:text-accent-muted">
            Course roadmap
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-foreground">Modules</h2>
          <p className="mt-1 text-sm text-muted">
            Follow the numbered path. Modules stay available — we recommend order, we don&apos;t hard-lock
            lessons.
          </p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2">
          {programs.map((program, index) => {
            const completedInModule = program.lessons.filter((l) =>
              snapshot.completedSlugs.has(l.slug),
            ).length;
            const firstPublished =
              program.lessons.find((l) => published.has(l.slug))?.slug ?? program.lessons[0]?.slug;
            const status = moduleStatus(
              program.lessons,
              snapshot.completedSlugs,
              published,
              recommendedSlug,
            );
            return (
              <li key={program.programName}>
                <CourseModuleCard
                  programName={program.programName}
                  lessonCount={program.lessons.length}
                  completedCount={completedInModule}
                  href={firstPublished ? `/streameru/${firstPublished}` : "/streameru"}
                  status={status}
                  description={moduleDescriptions[program.programName]}
                  index={index}
                />
              </li>
            );
          })}
        </ul>
      </section>

      <section className="rounded-2xl border border-border/80 bg-surface/80 p-6 dark:border-zinc-800 dark:bg-zinc-950/50 sm:p-8">
        <h2 className="text-lg font-bold text-foreground">How this academy works</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted">
          <li>
            <strong className="font-semibold text-foreground/90">Learn</strong> — concepts on each lesson
            page.
          </li>
          <li>
            <strong className="font-semibold text-foreground/90">Execute</strong> — complete the LIVE mission,
            then mark it done on this device.
          </li>
          <li>
            <strong className="font-semibold text-foreground/90">Progress</strong> — {CURRICULUM.length}{" "}
            lessons across {programs.length} modules; use the sidebar anytime.
          </li>
        </ul>
      </section>
    </div>
  );
}
