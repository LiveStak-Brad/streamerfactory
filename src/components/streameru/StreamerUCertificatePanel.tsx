"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { CredentialBadge } from "@/components/credentials";
import { SuProgressBar } from "@/components/streameru/SuProgressBar";
import { listAcademyPrograms } from "@/lib/assessments/programs";
import {
  readFinalPassed,
  readGraduationPassed,
} from "@/lib/assessments/progress-local";
import { CURRICULUM_TOTAL_LESSONS } from "@/lib/resources/curriculum";
import {
  getCompletedLessonSlugsServerSnapshot,
  getCompletedLessonSlugsSnapshot,
  subscribeStreamerUProgress,
} from "@/lib/resources/streameru-progress";
import { PUBLISHED_LESSON_COUNT, getActiveProgramCount } from "@/lib/streameru/academy-meta";

type Props = {
  /** Compact variant for lesson footers */
  variant?: "full" | "compact";
  className?: string;
};

type DiplomaSnap = {
  missionsDone: number;
  programsMissionComplete: number;
  finalsPassed: number;
  graduationPassed: boolean;
  programCount: number;
};

function readDiplomaSnap(): DiplomaSnap {
  const completed = getCompletedLessonSlugsSnapshot();
  const programs = listAcademyPrograms().filter((p) => p.lessons.length > 0);
  const programsMissionComplete = programs.filter((p) =>
    p.lessons.every((l) => completed.has(l.slug)),
  ).length;
  const finalsPassed = programs.filter((p) => readFinalPassed(p.programKey)).length;
  return {
    missionsDone: completed.size,
    programsMissionComplete,
    finalsPassed,
    graduationPassed: readGraduationPassed(),
    programCount: programs.length,
  };
}

const emptySnap: DiplomaSnap = {
  missionsDone: 0,
  programsMissionComplete: 0,
  finalsPassed: 0,
  graduationPassed: false,
  programCount: getActiveProgramCount(),
};

let cache = emptySnap;
let cacheKey = "";

function getSnap(): DiplomaSnap {
  const s = readDiplomaSnap();
  const key = `${s.missionsDone}|${s.programsMissionComplete}|${s.finalsPassed}|${s.graduationPassed}|${s.programCount}`;
  if (key === cacheKey) return cache;
  cacheKey = key;
  cache = s;
  return cache;
}

/**
 * Graduate diploma destination — matches real rules:
 * all LIVE exams in the five-program academy + Graduation Exam.
 * Server diploma issuance also requires those; local UI mirrors device progress.
 */
export function StreamerUCertificatePanel({ variant = "full", className = "" }: Props) {
  const snap = useSyncExternalStore(subscribeStreamerUProgress, getSnap, () => emptySnap);
  const completed = useSyncExternalStore(
    subscribeStreamerUProgress,
    getCompletedLessonSlugsSnapshot,
    getCompletedLessonSlugsServerSnapshot,
  );

  const missionsComplete = completed.size >= CURRICULUM_TOTAL_LESSONS;
  const programsReady =
    snap.programsMissionComplete >= snap.programCount && snap.finalsPassed >= snap.programCount;
  const graduated = missionsComplete && snap.graduationPassed;
  const missionPercent =
    CURRICULUM_TOTAL_LESSONS > 0 ? (snap.missionsDone / CURRICULUM_TOTAL_LESSONS) * 100 : 0;

  // Weighted path: missions (50%) + program finals (30%) + graduation exam (20%)
  const pathPercent = Math.min(
    100,
    missionPercent * 0.5 +
      (snap.programCount > 0 ? (snap.finalsPassed / snap.programCount) * 30 : 0) +
      (snap.graduationPassed ? 20 : 0),
  );

  if (variant === "compact" && snap.missionsDone === 0) return null;

  return (
    <section
      className={`relative overflow-hidden rounded-2xl border border-border/80 bg-gradient-to-br from-[#0b0a12] via-[#12101c] to-[#0b0f1a] p-6 text-zinc-50 shadow-sm sm:p-8 ${graduated ? "su-celebrate-cert" : ""} ${className}`}
      aria-labelledby="su-certificate-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_90%_0%,rgba(91,59,255,0.28),transparent_55%)]"
        aria-hidden
      />
      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
        <div className="relative mx-auto flex h-28 w-28 shrink-0 flex-col items-center justify-center sm:mx-0">
          <CredentialBadge
            type="diploma"
            size="lg"
            locked={!graduated}
            earned={graduated}
          />
          <span
            className={`mt-1 rounded-md px-1.5 py-0.5 text-center text-[10px] font-bold uppercase tracking-wider ${
              graduated
                ? "bg-emerald-500/90 text-white"
                : "bg-black/55 text-zinc-300"
            }`}
          >
            {graduated ? "Unlocked" : "Locked"}
          </span>
        </div>
        <div className="min-w-0 flex-1 text-center sm:text-left">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-accent-muted">
            Credential destination
          </p>
          <h2
            id="su-certificate-heading"
            className="mt-1 text-xl font-bold tracking-tight text-white sm:text-2xl"
          >
            {graduated
              ? "StreamerU Graduate"
              : "Become a StreamerU Graduate"}
          </h2>
          <p className="mt-1 text-sm font-medium text-zinc-300">
            Earn the Professional LIVE Creator Diploma
          </p>
          {graduated ? (
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              You completed the five-program academy path and passed the Graduation Exam. Unlock
              Certified LIVE Creator recognition — celebrate on your member dashboard and the Hall of
              Fame graduates board when your ceremony is eligible.
            </p>
          ) : (
            <>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                Complete all {PUBLISHED_LESSON_COUNT} LIVE exams (Beginner Foundations includes
                essential safety), pass each active Program Final, then pass the Graduation Exam to
                earn the StreamerU Diploma. Advanced Creator expands as new lessons ship.
              </p>
              <div className="mt-4 space-y-3">
                <div>
                  <div className="mb-1.5 flex justify-between text-xs font-semibold text-zinc-400">
                    <span>Progress toward diploma</span>
                    <span className="tabular-nums text-zinc-200">{Math.round(pathPercent)}%</span>
                  </div>
                  <SuProgressBar
                    value={pathPercent}
                    label="Diploma progress"
                    trackClassName="h-2 bg-white/10"
                  />
                </div>
                <ul className="grid gap-1.5 text-xs text-zinc-400 sm:grid-cols-2">
                  <li>
                    LIVE exams {snap.missionsDone}/{PUBLISHED_LESSON_COUNT}
                    {missionsComplete ? " ✓" : ""}
                  </li>
                  <li>
                    Program Finals {snap.finalsPassed}/{snap.programCount}
                    {programsReady ? " ✓" : ""}
                  </li>
                  <li>
                    Graduation Exam {snap.graduationPassed ? "passed ✓" : "not yet"}
                  </li>
                  <li>Career path: StreamerU Graduate → Manager College (expanding)</li>
                </ul>
              </div>
            </>
          )}
          <div className="mt-5 flex flex-wrap justify-center gap-3 sm:justify-start">
            <Link
              href={graduated ? "/hall-of-fame" : "/streameru/graduation"}
              className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-zinc-950 transition-[transform] hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transform-none"
            >
              {graduated ? "Hall of Fame Graduates" : "Graduation Exam"}
            </Link>
            {!graduated ? (
              <Link
                href="#course-roadmap"
                className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                View course roadmap
              </Link>
            ) : (
              <Link
                href="/battle-hub"
                className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/40"
              >
                Battle Hub →
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
