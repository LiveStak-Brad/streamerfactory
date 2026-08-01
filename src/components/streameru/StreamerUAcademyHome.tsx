"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { AcademyAssessmentStrip } from "@/components/streameru/assessments/AcademyAssessmentStrip";
import { AcademyConversionStrip } from "@/components/streameru/AcademyConversionStrip";
import { AcademyExploreLinks } from "@/components/streameru/AcademyExploreLinks";
import { AcademyFaqSeo } from "@/components/streameru/AcademyFaqSeo";
import { AcademyHallOfFameTeaser } from "@/components/streameru/AcademyHallOfFameTeaser";
import { AcademyLearningPath } from "@/components/streameru/AcademyLearningPath";
import { AcademyReleasePulse } from "@/components/streameru/AcademyReleasePulse";
import { AcademyStatCards } from "@/components/streameru/AcademyStatCards";
import { AcademyVersionBadge } from "@/components/streameru/AcademyVersionBadge";
import { CertificateShowcase } from "@/components/streameru/CertificateShowcase";
import { HeroAuthorityStrip } from "@/components/streameru/HeroAuthorityStrip";
import { HowStreamerUWorks } from "@/components/streameru/HowStreamerUWorks";
import { MotivationCheckpoint } from "@/components/streameru/MotivationCheckpoint";
import { StreamerUCertificatePanel } from "@/components/streameru/StreamerUCertificatePanel";
import { StreamerUGrowingRoadmap } from "@/components/streameru/StreamerUGrowingRoadmap";
import { WhyCreatorsFail } from "@/components/streameru/WhyCreatorsFail";
import { WhyStreamerUWorks } from "@/components/streameru/WhyStreamerUWorks";
import { BradTip } from "@/components/streameru/founder/FounderInsight";
import { CourseModuleCard, type ModuleLessonStatus } from "@/components/ui/CourseModuleCard";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { Button } from "@/components/ui/Button";
import { SuProgressBar } from "@/components/streameru/SuProgressBar";
import { listAcademyPrograms } from "@/lib/assessments/programs";
import {
  readFinalPassed,
  readGraduationPassed,
  readLocalStreamerUXp,
  readQuizPassed,
} from "@/lib/assessments/progress-local";
import { STREAMERU_XP } from "@/lib/assessments/xp";
import {
  CURRICULUM,
  CURRICULUM_TOTAL_LESSONS,
  FIRST_PROGRAM_LESSON_SLUG,
  curriculumByProgram,
  getCurriculumLesson,
} from "@/lib/resources/curriculum";
import { lessonDifficulty, trackDefaultDifficulty } from "@/lib/resources/difficulty-styles";
import { getLessonEstimate, sumStudyMinutesForSlugs } from "@/lib/resources/lesson-estimate";
import { formatMinutesLabel } from "@/lib/resources/mission-minutes";
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
} from "@/lib/streameru/academy-meta";
import { computeStudyStreakDays, getAcademyRank } from "@/lib/streameru/academy-rank";
import { FOUNDER_ACADEMY_NOTE } from "@/lib/streameru/founder-academy";
import { FREE_NETWORK } from "@/lib/positioning/free-network";
import { readMissionCompletionIsoDates } from "@/lib/streameru/read-completion-dates";
import { tiktokCreatorNetworkApplyUrl } from "@/lib/site";

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
  "Beginner Foundations":
    "Setup, essential platform safety, and your first consistent LIVE weeks — everything before you stream regularly.",
  "Live Streaming Mastery": "Presence, retention, and stronger on-stream craft.",
  "Battles & Collaboration": "Battle prep, formats, and collaborating with the network.",
  "Growth & Monetization": "Audience growth and sustainable LIVE income habits.",
  "Advanced Creator":
    "The black-belt bridge — how professionals operate: systems, brand, analytics, standards, and judgment.",
  "Presence Mastery":
    "On-camera craft — voice, confidence, storytelling, pacing, and recovery so you become worth staying for.",
  "Content Creation Mastery":
    "Showcraft — niche, memorability, segments, themes, arcs, events, and anticipation so people choose to watch.",
  "Growth Mastery":
    "Discovery systems — diagnosis, analytics, experiments, scheduling, and durable growth habits so you get found without chasing myths.",
  "Community Mastery":
    "Belonging culture — rituals, return habits, moderation, healthy boundaries, guest hosting, and networking so people keep coming back.",
};

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
  const recommendedSlug =
    snapshot.recommendedHref.replace(/^\/streameru\//, "") || FIRST_PROGRAM_LESSON_SLUG;
  const remaining = Math.max(0, CURRICULUM_TOTAL_LESSONS - completedCount);
  const firstLesson = getFirstLessonMeta();
  const firstSafety = getFirstSafetyLessonMeta();
  const lessonOneEstimate = getLessonEstimate(firstLesson.slug);
  const libraryStats = getLibraryHubStats();
  const academyRank = getAcademyRank(completedCount);
  const studyStreak = useSyncExternalStore(
    subscribeStreamerUProgress,
    () => computeStudyStreakDays(readMissionCompletionIsoDates()),
    () => 0,
  );
  const localXp = useSyncExternalStore(
    subscribeStreamerUProgress,
    readLocalStreamerUXp,
    () => 0,
  );
  const totalStudyMinutes = sumStudyMinutesForSlugs(CURRICULUM.map((l) => l.slug));
  const remainingStudyMinutes = sumStudyMinutesForSlugs(
    CURRICULUM.filter((l) => !snapshot.completedSlugs.has(l.slug)).map((l) => l.slug),
  );
  const finalsPassed = academyPrograms.filter((p) => readFinalPassed(p.programKey)).length;
  const activeProgramCount = academyPrograms.filter((p) => p.lessons.length > 0).length;
  const diplomaPct = Math.min(
    100,
    percent * 0.55 +
      (activeProgramCount > 0 ? (finalsPassed / activeProgramCount) * 30 : 0) +
      (readGraduationPassed() ? 15 : 0),
  );

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
    const allProgramsReady = academyPrograms
      .filter((p) => p.lessons.length > 0)
      .every(
        (p) =>
          p.lessons.every((l) => snapshot.completedSlugs.has(l.slug)) &&
          readFinalPassed(p.programKey),
      );
    if (allProgramsReady && !readGraduationPassed()) {
      return { label: "Graduation Exam", href: "/streameru/graduation" };
    }
    return null;
  })();

  const programsComplete = academyPrograms.filter(
    (p) =>
      p.lessons.length > 0 &&
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
            <div className="mt-3">
              <AcademyVersionBadge />
            </div>
            <HeroAuthorityStrip />
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
                  Continue your creator journey · Lesson {snapshot.recommendedOrder}
                </Button>
              ) : (
                <Button
                  href={tiktokCreatorNetworkApplyUrl}
                  external
                  variant="primary"
                  className="min-h-[48px] px-6"
                >
                  {FREE_NETWORK.joinAndLearnCta}
                </Button>
              )}
              <Button
                href={hasProgress ? "#course-roadmap" : firstLesson.href}
                variant="secondaryOnDark"
                className="min-h-[48px] px-6"
              >
                {hasProgress ? "Earn Your First Certificate" : "Start StreamerU Today"}
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
                      Current rank
                    </p>
                    <p className="mt-1 text-base font-semibold text-white">{academyRank.label}</p>
                    <p className="mt-1 text-xs text-zinc-400">{academyRank.blurb}</p>
                  </div>
                </div>
                <dl className="grid grid-cols-2 gap-2 text-xs">
                  <div className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-2">
                    <dt className="text-zinc-500">Current program</dt>
                    <dd className="mt-0.5 font-semibold text-zinc-100">
                      {currentProgram ?? "—"}
                    </dd>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-2">
                    <dt className="text-zinc-500">Lessons remaining</dt>
                    <dd className="mt-0.5 font-semibold tabular-nums text-zinc-100">{remaining}</dd>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-2">
                    <dt className="text-zinc-500">Study time left</dt>
                    <dd className="mt-0.5 font-semibold tabular-nums text-zinc-100">
                      ~{formatMinutesLabel(remainingStudyMinutes)}
                    </dd>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-2">
                    <dt className="text-zinc-500">Study streak</dt>
                    <dd className="mt-0.5 font-semibold tabular-nums text-zinc-100">
                      {studyStreak} day{studyStreak === 1 ? "" : "s"}
                    </dd>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-2">
                    <dt className="text-zinc-500">Certificates earned</dt>
                    <dd className="mt-0.5 font-semibold tabular-nums text-zinc-100">
                      {programsComplete}/{activeProgramCount}
                    </dd>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-2">
                    <dt className="text-zinc-500">StreamerU XP</dt>
                    <dd className="mt-0.5 font-semibold tabular-nums text-zinc-100">{localXp}</dd>
                  </div>
                </dl>
                <div>
                  <div className="mb-1.5 flex justify-between text-[11px] font-semibold text-zinc-400">
                    <span>Diploma progress</span>
                    <span className="tabular-nums text-zinc-200">{Math.round(diplomaPct)}%</span>
                  </div>
                  <SuProgressBar
                    value={diplomaPct}
                    trackClassName="h-2 bg-white/10"
                    label="Diploma progress"
                  />
                  <p className="mt-1.5 text-[11px] text-zinc-500">
                    Completion {Math.round(percent)}% · Estimated path study ~
                    {formatMinutesLabel(totalStudyMinutes)}
                  </p>
                </div>
                <p className="text-sm text-zinc-400">
                  <span className="text-zinc-500">Continue:</span>{" "}
                  <Link
                    href={snapshot.recommendedHref}
                    className="font-semibold text-white underline-offset-2 hover:underline"
                  >
                    {snapshot.recommendedTitle}
                  </Link>
                  {nextAssessment ? (
                    <>
                      {" · "}
                      <Link
                        href={nextAssessment.href}
                        className="font-medium text-accent-muted underline-offset-2 hover:underline"
                      >
                        {nextAssessment.label}
                      </Link>
                    </>
                  ) : null}
                </p>
                {lastCompleted ? (
                  <p className="text-xs text-zinc-500">
                    Last completed: Lesson {lastCompleted.globalOrder} · {lastCompleted.title}
                  </p>
                ) : null}
              </>
            )}
          </div>
        </div>
      </section>

      <AcademyStatCards />

      <AcademyReleasePulse />

      <MotivationCheckpoint />

      <AcademyLearningPath />

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
          Essential safety lives in Program 1
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
          Protect first. Grow second. Monetize third. Scale last. Platform rules, community
          guidelines, account safety, and safe streaming practices are taught in Beginner Foundations
          — immediately after setup — before you become a regular LIVE streamer.
        </p>
        <p className="mt-3 text-sm">
          <Link
            href={firstSafety.href}
            className="font-semibold text-teal-800 underline-offset-2 hover:underline dark:text-teal-200"
          >
            Safety starts at Lesson {firstSafety.globalOrder}: {firstSafety.title} →
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
            {PUBLISHED_LESSON_COUNT} lessons available now across {activeProgramCount} active
            programs. Follow the numbered path — we recommend order, we don&apos;t hard-lock
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
            const isAdvanced = program.programName === "Advanced Creator";
            const isPresence = program.programName === "Presence Mastery";
            const isCreation = program.programName === "Content Creation Mastery";
            const isGrowth = program.programName === "Growth Mastery";
            const isCommunity = program.programName === "Community Mastery";
            const status = moduleStatus(
              program.lessons,
              snapshot.completedSlugs,
              published,
              recommendedSlug,
            );
            const trackId = program.lessons[0]?.trackId;
            const academyProgram = academyPrograms[index];
            const nextProgram = programs[index + 1];
            const isBeginner = program.programName === "Beginner Foundations";
            const unlocks = [
              { label: "Program Certificate", detail: "after LIVE exams + Program Final" },
              {
                label: `+${STREAMERU_XP.programFinalPass + STREAMERU_XP.programCertificate} StreamerU XP`,
                detail: "final pass + certificate awards",
              },
              nextProgram
                ? { label: "Next program", detail: nextProgram.programName }
                : isCommunity
                  ? {
                      label: "Next steps",
                      detail: "Professional Creator path · optional Community Lab Honors",
                    }
                  : isGrowth
                    ? {
                        label: "Next steps",
                        detail: "Community Mastery · Career Creator path · optional Growth Lab Honors",
                      }
                    : {
                        label: "Graduation progress",
                        detail: "unlocks path to Graduation Exam & StreamerU Diploma",
                      },
              {
                label: isAdvanced
                  ? "Black-belt bridge"
                  : isPresence
                    ? "Craft mastery"
                    : isCreation
                      ? "Showcraft mastery"
                      : isGrowth
                        ? "Discovery mastery"
                        : isCommunity
                          ? "Belonging mastery"
                          : "Career-path progress",
                detail: isAdvanced
                  ? "how professionals think — recommended before Mastery Paths"
                  : isPresence
                    ? "on-camera presence craft — elective for Professional Creator Diploma"
                    : isCreation
                      ? "worth-watching showcraft — recommended before Growth Mastery"
                      : isGrowth
                        ? "required for Career Creator Diploma · Capstone: 30-day growth experiment"
                        : isCommunity
                          ? "elective Mastery Path · Capstone: community appreciation event"
                          : "counts toward StreamerU Graduate recognition",
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
                    isAdvanced || isGrowth || isCommunity
                      ? "advanced"
                      : isPresence || isCreation
                        ? "intermediate"
                        : isBeginner
                          ? "beginner"
                          : lessonDifficulty(trackId, program.lessons[0]?.slug) ||
                            trackDefaultDifficulty(trackId)
                  }
                  badgeLabel={isBeginner ? "Includes essential safety" : null}
                  guidanceNote={
                    isBeginner
                      ? `Lessons ${firstSafety.globalOrder}–6 cover platform rules, bans, violations, and account safety before regular LIVE.`
                      : null
                  }
                  estimatedStudyMinutes={
                    program.lessons.length > 0
                      ? sumStudyMinutesForSlugs(program.lessons.map((l) => l.slug))
                      : undefined
                  }
                  unlocks={unlocks}
                />
                {academyProgram &&
                program.lessons.length > 0 &&
                completedInModule >= program.lessons.length ? (
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

      <CertificateShowcase />

      <StreamerUCertificatePanel />

      <AcademyHallOfFameTeaser />

      <BradTip showFounderLink showPhoto>
        {FOUNDER_ACADEMY_NOTE.paragraphs.map((p) => (
          <p key={p} className="mt-2 first:mt-0">
            {p}
          </p>
        ))}
        <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-500">
          StreamerU packages that experience into free lessons, quizzes, LIVE exams, and credentials
          — {PUBLISHED_LESSON_COUNT} available now, growing toward a{" "}
          {PLANNED_CURRICULUM_LESSON_COUNT}-lesson university curriculum.
        </p>
      </BradTip>

      <WhyStreamerUWorks />

      <WhyCreatorsFail />

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
          </div>
          <Button href="/streameru/library" variant="primary" className="min-h-[44px] shrink-0 px-5">
            Browse Free Worksheets &amp; Checklists
          </Button>
        </div>
      </section>

      <HowStreamerUWorks />

      <StreamerUGrowingRoadmap />

      <AcademyFaqSeo />

      <AcademyConversionStrip />

      <AcademyExploreLinks />
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
        Start StreamerU Today
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
