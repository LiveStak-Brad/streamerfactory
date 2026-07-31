"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { AcademyAssessmentStrip } from "@/components/streameru/assessments/AcademyAssessmentStrip";
import { HowStreamerUWorks } from "@/components/streameru/HowStreamerUWorks";
import { StreamerUCertificatePanel } from "@/components/streameru/StreamerUCertificatePanel";
import { StreamerUGrowingRoadmap } from "@/components/streameru/StreamerUGrowingRoadmap";
import { BradTip } from "@/components/streameru/founder/FounderInsight";
import { CourseModuleCard, type ModuleLessonStatus } from "@/components/ui/CourseModuleCard";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { Button } from "@/components/ui/Button";
import { SuProgressBar } from "@/components/streameru/SuProgressBar";
import { listAcademyPrograms } from "@/lib/assessments/programs";
import {
  readFinalPassed,
  readGraduationPassed,
  readQuizPassed,
} from "@/lib/assessments/progress-local";
import { STREAMERU_XP } from "@/lib/assessments/xp";
import { FOUNDER_PLATFORMS } from "@/lib/founder/content";
import {
  CURRICULUM_TOTAL_LESSONS,
  FIRST_PROGRAM_LESSON_SLUG,
  curriculumByProgram,
  getCurriculumLesson,
} from "@/lib/resources/curriculum";
import { lessonDifficulty, trackDefaultDifficulty } from "@/lib/resources/difficulty-styles";
import { getLessonEstimate, sumStudyMinutesForSlugs } from "@/lib/resources/lesson-estimate";
import {
  computeRecommendedFromStorage,
  getDefaultRecommendedLesson,
  readLastVisitedSlugFromStorage,
} from "@/lib/resources/recommended-lesson";
import {
  readCompletedLessonSlugs,
  subscribeStreamerUProgress,
} from "@/lib/resources/streameru-progress";
import {
  ACADEMY_POSITIONING,
  LESSON_ONE_QUIZ_XP,
  PLANNED_CURRICULUM_LESSON_COUNT,
  PUBLISHED_LESSON_COUNT,
  catalogAvailabilityLine,
  getFirstLessonMeta,
  getFirstSafetyLessonMeta,
  getLibraryHubStats,
  getPublishedProgramCount,
} from "@/lib/streameru/academy-meta";

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
  const completedSlugs = readCompletedLessonSlugs();
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

const moduleDescriptions: Record<string, string> = {
  "Beginner Foundations": "Setup, structure, and your first consistent LIVE weeks.",
  "Live Streaming Mastery": "Presence, retention, and stronger on-stream craft.",
  "Battles & Collaboration": "Battle prep, formats, and collaborating with the network.",
  "Growth & Monetization": "Audience growth and sustainable LIVE income habits.",
  "Rules & Safety":
    "Essential account protection — start before going LIVE regularly. Advanced compliance comes later in the program.",
};

const founderSfLesson =
  FOUNDER_PLATFORMS.find((p) => p.id === "sf")?.lesson ??
  "Everything I learned the hard way now lives here — so you don't have to.";

/**
 * Academy hub: progress from device-local missions + curriculum roadmap.
 * StreamerU XP is academy-only (separate from Factory Reputation).
 */
export function StreamerUAcademyHome({ publishedSlugs }: Props) {
  const snapshot = useSyncExternalStore(
    subscribeStreamerUProgress,
    readSnapshot,
    getServerSnapshot,
  );
  const published = new Set(publishedSlugs);
  const completedCount = snapshot.completedSlugs.size;
  const hasProgress = completedCount > 0;
  const percent =
    CURRICULUM_TOTAL_LESSONS > 0 ? (completedCount / CURRICULUM_TOTAL_LESSONS) * 100 : 0;
  const programs = curriculumByProgram();
  const academyPrograms = listAcademyPrograms();
  const programCount = getPublishedProgramCount();
  const recommendedSlug =
    snapshot.recommendedHref.replace(/^\/streameru\//, "") || FIRST_PROGRAM_LESSON_SLUG;
  const remaining = Math.max(0, CURRICULUM_TOTAL_LESSONS - completedCount);
  const firstLesson = getFirstLessonMeta();
  const firstSafety = getFirstSafetyLessonMeta();
  const lessonOneEstimate = getLessonEstimate(firstLesson.slug);
  const libraryStats = getLibraryHubStats();

  const currentProgram =
    getCurriculumLesson(recommendedSlug)?.programName ??
    (hasProgress
      ? programs.find((p) =>
          p.lessons.some((l) => snapshot.completedSlugs.has(l.slug)),
        )?.programName
      : null);

  const lastCompleted = [...snapshot.completedSlugs]
    .map((slug) => getCurriculumLesson(slug))
    .filter(Boolean)
    .sort((a, b) => (b!.globalOrder ?? 0) - (a!.globalOrder ?? 0))[0];

  const nextAssessment = (() => {
    const current = getCurriculumLesson(recommendedSlug);
    if (current && !readQuizPassed(current.slug)) {
      return {
        label: `Lesson quiz · Lesson ${current.globalOrder}`,
        href: snapshot.recommendedHref,
      };
    }
    for (const program of academyPrograms) {
      const missionsDone = program.lessons.every((l) => snapshot.completedSlugs.has(l.slug));
      if (!missionsDone) continue;
      if (!readFinalPassed(program.programKey)) {
        return {
          label: `Program Final · ${program.programName}`,
          href: `/streameru/programs/${program.programKey}/final`,
        };
      }
    }
    const allProgramsReady = academyPrograms.every(
      (p) =>
        p.lessons.every((l) => snapshot.completedSlugs.has(l.slug)) &&
        readFinalPassed(p.programKey),
    );
    if (allProgramsReady && !readGraduationPassed()) {
      return { label: "Graduation Exam", href: "/streameru/graduation" };
    }
    return null;
  })();

  const programsComplete = academyPrograms.filter((p) =>
    p.lessons.every((l) => snapshot.completedSlugs.has(l.slug)),
  ).length;

  return (
    <div className="space-y-12">
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0b0a12] px-5 py-8 text-zinc-50 sm:px-8 sm:py-10">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_10%_0%,rgba(91,59,255,0.35),transparent_55%),radial-gradient(ellipse_50%_50%_at_100%_30%,rgba(160,32,240,0.22),transparent_50%)] motion-reduce:opacity-80"
          aria-hidden
        />
        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xl">
            <p className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.22em] text-accent-muted">
              {ACADEMY_POSITIONING.eyebrow}
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-[-0.03em] text-white sm:text-5xl">
              {ACADEMY_POSITIONING.title}
            </h1>
            <p className="mt-2 text-base font-medium text-zinc-300 sm:text-lg">
              The Internet&apos;s Free Live Streaming Academy
            </p>
            <p className="mt-4 text-base leading-relaxed text-zinc-400 sm:text-lg">
              {ACADEMY_POSITIONING.valueProposition}
            </p>
            <p className="mt-3 text-sm font-medium text-zinc-300">{ACADEMY_POSITIONING.freeAccess}</p>
            <p className="mt-2 text-sm text-zinc-500">{catalogAvailabilityLine()}</p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {hasProgress ? (
                <Button
                  href={snapshot.recommendedHref}
                  variant="primary"
                  className="min-h-[48px] px-6"
                >
                  Continue learning · Lesson {snapshot.recommendedOrder}
                </Button>
              ) : (
                <Button href={firstLesson.href} variant="primary" className="min-h-[48px] px-6">
                  Start Lesson 1
                </Button>
              )}
              <Button
                href="#course-roadmap"
                variant="secondaryOnDark"
                className="min-h-[48px] px-6"
              >
                Browse course roadmap
              </Button>
              <Button
                href="/streameru/library"
                variant="secondaryOnDark"
                className="min-h-[48px] px-6"
              >
                Browse Free Worksheets &amp; Checklists
              </Button>
            </div>
            {hasProgress && snapshot.continueTitle && snapshot.continueHref ? (
              <p className="mt-4 text-sm text-zinc-500">
                Last opened:{" "}
                <Link
                  href={snapshot.continueHref}
                  className="font-semibold text-zinc-300 underline-offset-2 hover:text-white hover:underline"
                >
                  {snapshot.continueTitle}
                </Link>
              </p>
            ) : null}
          </div>

          <div className="flex w-full flex-col gap-5 rounded-2xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur-md sm:max-w-md lg:min-w-[300px]">
            {!hasProgress ? (
              <ZeroProgressWelcome
                estimateLabel={lessonOneEstimate.totalLabel}
                studyLabel={lessonOneEstimate.studyLabel}
                liveLabel={lessonOneEstimate.liveLabel}
                quizXp={LESSON_ONE_QUIZ_XP}
                lessonHref={firstLesson.href}
                lessonTitle={firstLesson.title}
              />
            ) : (
              <>
                <div className="flex items-center gap-5">
                  <ProgressRing
                    value={percent}
                    size={120}
                    label="Complete"
                    sublabel={`${completedCount}/${PUBLISHED_LESSON_COUNT}`}
                    toneClassName="text-violet-400"
                  />
                  <div>
                    <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-zinc-500">
                      Continue next
                    </p>
                    <p className="mt-1 text-base font-semibold text-white">
                      {snapshot.recommendedTitle}
                    </p>
                    <p className="mt-2 text-sm text-zinc-400">
                      {remaining} lesson{remaining === 1 ? "" : "s"} remaining ·{" "}
                      {programsComplete}/{programCount} programs complete
                    </p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-zinc-400">
                  {lastCompleted ? (
                    <li>
                      <span className="text-zinc-500">Last completed:</span>{" "}
                      <span className="font-medium text-zinc-200">
                        Lesson {lastCompleted.globalOrder} · {lastCompleted.title}
                      </span>
                    </li>
                  ) : null}
                  {currentProgram ? (
                    <li>
                      <span className="text-zinc-500">Current program:</span>{" "}
                      <span className="font-medium text-zinc-200">{currentProgram}</span>
                    </li>
                  ) : null}
                  {nextAssessment ? (
                    <li>
                      <span className="text-zinc-500">Next assessment:</span>{" "}
                      <Link
                        href={nextAssessment.href}
                        className="font-medium text-accent-muted underline-offset-2 hover:underline"
                      >
                        {nextAssessment.label}
                      </Link>
                    </li>
                  ) : null}
                  <li>
                    <span className="text-zinc-500">Diploma path:</span>{" "}
                    <span className="font-medium text-zinc-200">
                      {programsComplete}/{programCount} programs · then Graduation Exam
                    </span>
                  </li>
                </ul>
                <div>
                  <p className="mb-2 text-[0.65rem] font-bold uppercase tracking-wider text-zinc-500">
                    Program breakdown
                  </p>
                  <ul className="space-y-2.5">
                    {programs.map((program, index) => {
                      const done = program.lessons.filter((l) =>
                        snapshot.completedSlugs.has(l.slug),
                      ).length;
                      const pct =
                        program.lessons.length > 0
                          ? (done / program.lessons.length) * 100
                          : 0;
                      return (
                        <li key={program.programName}>
                          <div className="mb-1 flex justify-between text-[11px] font-semibold text-zinc-400">
                            <span>
                              P{index + 1} · {program.programName}
                            </span>
                            <span className="tabular-nums text-zinc-300">
                              {done}/{program.lessons.length}
                            </span>
                          </div>
                          <SuProgressBar
                            value={pct}
                            trackClassName="h-1 bg-white/10"
                            label={`${program.programName} progress`}
                          />
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <section
        className="rounded-2xl border border-teal-500/25 bg-teal-500/[0.07] px-5 py-5 dark:border-teal-400/20 dark:bg-teal-500/10 sm:px-6"
        aria-labelledby="safety-first-heading"
      >
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-teal-800 dark:text-teal-200">
          Protect first
        </p>
        <h2
          id="safety-first-heading"
          className="mt-1 text-lg font-bold tracking-tight text-foreground"
        >
          Rules &amp; Safety — required from the beginning
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
          Protect first. Grow second. Monetize third. Scale last. Essential safety starts before
          your first serious stream — not after you scale. Advanced compliance and long-term account
          protection stay later in the Rules &amp; Safety program.
        </p>
        <p className="mt-3 text-sm">
          <Link
            href={firstSafety.href}
            className="font-semibold text-teal-800 underline-offset-2 hover:underline dark:text-teal-200"
          >
            Start here before going LIVE regularly → Lesson {firstSafety.globalOrder}:{" "}
            {firstSafety.title}
          </Link>
        </p>
      </section>

      <section id="course-roadmap">
        <div className="mb-6">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-accent dark:text-accent-muted">
            Course roadmap
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-foreground">Programs</h2>
          <p className="mt-1 text-sm text-muted">
            {PUBLISHED_LESSON_COUNT} lessons available now across {programCount} programs. Follow the
            numbered path — programs stay available; we recommend order, we don&apos;t hard-lock
            lessons.
          </p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2">
          {programs.map((program, index) => {
            const completedInModule = program.lessons.filter((l) =>
              snapshot.completedSlugs.has(l.slug),
            ).length;
            const firstPublished =
              program.lessons.find((l) => published.has(l.slug))?.slug ??
              program.lessons[0]?.slug;
            const status = moduleStatus(
              program.lessons,
              snapshot.completedSlugs,
              published,
              recommendedSlug,
            );
            const trackId = program.lessons[0]?.trackId;
            const academyProgram = academyPrograms[index];
            const nextProgram = programs[index + 1];
            const isRules = program.programName === "Rules & Safety";
            const unlocks = [
              { label: "Program Certificate", detail: "after LIVE exams + Program Final" },
              {
                label: `+${STREAMERU_XP.programFinalPass + STREAMERU_XP.programCertificate} StreamerU XP`,
                detail: "final pass + certificate awards",
              },
              nextProgram
                ? { label: "Next program", detail: nextProgram.programName }
                : {
                    label: "Graduation progress",
                    detail: "unlocks path to Graduation Exam & StreamerU Diploma",
                  },
              {
                label: "Career-path progress",
                detail: "counts toward StreamerU Graduate recognition",
              },
            ];
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
                  difficulty={
                    isRules
                      ? "beginner"
                      : lessonDifficulty(trackId, program.lessons[0]?.slug) ||
                        trackDefaultDifficulty(trackId)
                  }
                  badgeLabel={isRules ? "Required · Essential" : null}
                  guidanceNote={
                    isRules
                      ? "Start here before going LIVE regularly — foundational safety is not advanced-only."
                      : program.programName === "Beginner Foundations"
                        ? `Also review Lesson ${firstSafety.globalOrder}: ${firstSafety.title} before streaming regularly.`
                        : null
                  }
                  estimatedStudyMinutes={sumStudyMinutesForSlugs(
                    program.lessons.map((l) => l.slug),
                  )}
                  unlocks={unlocks}
                />
                {academyProgram && completedInModule >= program.lessons.length ? (
                  <p className="mt-2 px-1 text-xs text-muted">
                    <Link
                      href={`/streameru/programs/${academyProgram.programKey}/final`}
                      className="font-semibold text-accent hover:underline dark:text-accent-muted"
                    >
                      {readFinalPassed(academyProgram.programKey)
                        ? "Review Program Final →"
                        : "Take Program Final Exam →"}
                    </Link>
                  </p>
                ) : null}
              </li>
            );
          })}
        </ul>
      </section>

      <AcademyAssessmentStrip />

      <StreamerUCertificatePanel />

      <section className="rounded-2xl border border-border/80 bg-surface/80 p-6 dark:border-zinc-800 dark:bg-zinc-950/50 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-accent dark:text-accent-muted">
              Printables
            </p>
            <h2 className="mt-1 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              Free worksheets &amp; checklists
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
              {libraryStats.ready} ready to print · {libraryStats.total} tools catalogued ·{" "}
              {libraryStats.beginnerReady} beginner packs available now · checklists across all{" "}
              {PUBLISHED_LESSON_COUNT} lessons
              {libraryStats.placeholder > 0
                ? ` · ${libraryStats.placeholder} additional worksheets marked coming soon`
                : ""}
              .
            </p>
            <p className="mt-2 text-xs text-muted">
              Categories: beginner, battles, monetization, safety, branding, content, and business.
            </p>
          </div>
          <Button href="/streameru/library" variant="primary" className="min-h-[44px] shrink-0 px-5">
            Browse Free Worksheets &amp; Checklists
          </Button>
        </div>
      </section>

      <HowStreamerUWorks />

      <StreamerUGrowingRoadmap />

      <BradTip showFounderLink>
        <p>{founderSfLesson}</p>
        <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-500">
          StreamerU packages that experience into free lessons, quizzes, LIVE exams, and credentials
          — {PUBLISHED_LESSON_COUNT} available now, growing toward a{" "}
          {PLANNED_CURRICULUM_LESSON_COUNT}-lesson university curriculum.
        </p>
      </BradTip>
    </div>
  );
}

function ZeroProgressWelcome({
  estimateLabel,
  studyLabel,
  liveLabel,
  quizXp,
  lessonHref,
  lessonTitle,
}: {
  estimateLabel: string;
  studyLabel: string;
  liveLabel: string | null;
  quizXp: number;
  lessonHref: string;
  lessonTitle: string;
}) {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-accent-muted">
          Day one
        </p>
        <h2 className="mt-1 text-xl font-bold tracking-tight text-white">
          Welcome to StreamerU
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
          Lesson 1 — <span className="font-semibold text-zinc-200">{lessonTitle}</span> — gets your
          account and setup LIVE-ready and walks you into your first broadcast with a plan instead of
          a guess.
        </p>
      </div>
      <dl className="grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5">
          <dt className="text-[0.65rem] font-bold uppercase tracking-wider text-zinc-500">
            Est. study time
          </dt>
          <dd className="mt-1 font-semibold tabular-nums text-white">
            ~{estimateLabel}
            <span className="mt-0.5 block text-xs font-normal text-zinc-500">
              Study {studyLabel}
              {liveLabel ? ` · LIVE ${liveLabel}` : ""}
            </span>
          </dd>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5">
          <dt className="text-[0.65rem] font-bold uppercase tracking-wider text-zinc-500">
            Quiz XP
          </dt>
          <dd className="mt-1 font-semibold tabular-nums text-white">+{quizXp} StreamerU XP</dd>
        </div>
      </dl>
      <ul className="space-y-1.5 text-xs leading-relaxed text-zinc-400">
        <li>After Lesson 1: quiz, LIVE exam, and your first progress on this device</li>
        <li>Unlock worksheets, the next lesson, and Program 1 momentum</li>
        <li>
          {PUBLISHED_LESSON_COUNT} lessons · quizzes · LIVE exams · certificates · graduation path
        </li>
      </ul>
      <Button href={lessonHref} variant="primary" className="min-h-[48px] w-full px-6 sm:w-auto">
        Start Lesson 1
      </Button>
      <p className="text-xs text-zinc-500">
        <a
          href="#how-streameru-works"
          className="font-semibold text-zinc-300 underline-offset-2 hover:text-white hover:underline"
        >
          How StreamerU works
        </a>
      </p>
    </div>
  );
}
