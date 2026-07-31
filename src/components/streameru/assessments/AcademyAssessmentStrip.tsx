"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { listAcademyPrograms, PROGRESSION_STEPS } from "@/lib/assessments/programs";
import {
  readFinalPassed,
  readGraduationPassed,
  readLocalStreamerUXp,
  readQuizPassed,
  STREAMERU_QUIZ_PASSED_KEY_PREFIX,
} from "@/lib/assessments/progress-local";
import { buildMasterySnapshot } from "@/lib/assessments/mastery";
import { CURRICULUM } from "@/lib/resources/curriculum";
import {
  countCompletedLessons,
  getCompletedLessonSlugsServerSnapshot,
  getCompletedLessonSlugsSnapshot,
  subscribeStreamerUProgress,
} from "@/lib/resources/streameru-progress";

type AssessSnap = {
  xp: number;
  mastery: number;
  quizzesPassed: number;
  finalsPassed: number;
  graduationPassed: boolean;
  missionsDone: number;
};

function readAssessSnap(): AssessSnap {
  const bestQuiz: Record<string, number> = {};
  let quizzesPassed = 0;
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key?.startsWith(STREAMERU_QUIZ_PASSED_KEY_PREFIX)) continue;
      const slug = key.slice(STREAMERU_QUIZ_PASSED_KEY_PREFIX.length);
      const raw = localStorage.getItem(key);
      if (!raw) continue;
      const parsed = JSON.parse(raw) as { passed?: boolean; percent?: number };
      if (parsed.passed) {
        quizzesPassed += 1;
        bestQuiz[slug] = Number(parsed.percent ?? 70);
      }
    }
  } catch {
    /* ignore */
  }

  const programs = listAcademyPrograms();
  const programFinals: Record<string, number> = {};
  let finalsPassed = 0;
  for (const p of programs) {
    if (readFinalPassed(p.programKey)) {
      finalsPassed += 1;
      programFinals[p.programKey] = 80;
    }
  }

  const graduationPassed = readGraduationPassed();
  const mastery = buildMasterySnapshot({
    bestQuizPercentBySlug: bestQuiz,
    programFinalBestByKey: programFinals,
    graduationBestPercent: graduationPassed ? 80 : undefined,
  });

  return {
    xp: readLocalStreamerUXp(),
    mastery: mastery.academy,
    quizzesPassed,
    finalsPassed,
    graduationPassed,
    missionsDone: countCompletedLessons(),
  };
}

const empty: AssessSnap = {
  xp: 0,
  mastery: 0,
  quizzesPassed: 0,
  finalsPassed: 0,
  graduationPassed: false,
  missionsDone: 0,
};

let cache = empty;
let cacheKey = "";

function getSnap(): AssessSnap {
  const s = readAssessSnap();
  const key = `${s.xp}|${s.mastery}|${s.quizzesPassed}|${s.finalsPassed}|${s.graduationPassed}|${s.missionsDone}`;
  if (key === cacheKey) return cache;
  cacheKey = key;
  cache = s;
  return cache;
}

export function AcademyAssessmentStrip() {
  const snap = useSyncExternalStore(subscribeStreamerUProgress, getSnap, () => empty);
  const programs = listAcademyPrograms();
  const completed = useSyncExternalStore(
    subscribeStreamerUProgress,
    getCompletedLessonSlugsSnapshot,
    getCompletedLessonSlugsServerSnapshot,
  );

  return (
    <section className="rounded-2xl border border-border/80 bg-surface/80 p-6 dark:border-zinc-800 dark:bg-zinc-950/50 sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-accent dark:text-accent-muted">
            Academy progress
          </p>
          <h2 className="mt-1 text-xl font-bold tracking-tight text-foreground">
            StreamerU XP & mastery
          </h2>
          <p className="mt-1 text-sm text-muted">
            Educational mastery only — separate from Factory Reputation.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="rounded-xl border border-border/70 px-4 py-2 dark:border-zinc-800">
            <p className="text-[0.65rem] font-bold uppercase tracking-wider text-muted">StreamerU XP</p>
            <p className="text-lg font-bold tabular-nums text-foreground">{snap.xp}</p>
          </div>
          <div className="rounded-xl border border-border/70 px-4 py-2 dark:border-zinc-800">
            <p className="text-[0.65rem] font-bold uppercase tracking-wider text-muted">Mastery</p>
            <p className="text-lg font-bold tabular-nums text-foreground">{snap.mastery}%</p>
          </div>
        </div>
      </div>

      <ol className="mt-6 flex flex-wrap gap-2">
        {PROGRESSION_STEPS.map((step) => (
          <li
            key={step}
            className="rounded-full border border-border/70 px-3 py-1 text-[11px] font-semibold text-muted dark:border-zinc-800"
          >
            {step}
          </li>
        ))}
      </ol>

      <p className="mt-4 text-xs text-muted">
        Quizzes passed {snap.quizzesPassed}/{CURRICULUM.length} · Program finals {snap.finalsPassed}/
        {programs.length} · LIVE missions {snap.missionsDone}/{CURRICULUM.length}
        {snap.graduationPassed ? " · Graduation exam passed" : ""}
      </p>

      <ul className="mt-6 space-y-3">
        {programs.map((program, index) => {
          const missions = program.lessons.filter((l) => completed.has(l.slug)).length;
          const quizzes = program.lessons.filter((l) => readQuizPassed(l.slug)).length;
          const finalOk = readFinalPassed(program.programKey);
          const missionsDone = missions >= program.lessons.length;
          const recommendedReady = missionsDone;
          return (
            <li
              key={program.programKey}
              className="flex flex-col gap-2 rounded-xl border border-border/70 px-4 py-3 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800"
            >
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Program {index + 1}: {program.programName}
                </p>
                <p className="text-xs text-muted">
                  Quizzes {quizzes}/{program.lessons.length} · Missions {missions}/
                  {program.lessons.length}
                  {finalOk ? " · Final passed" : ""}
                  {finalOk && missionsDone ? " · Program Certificate ready" : ""}
                </p>
                {!finalOk && !recommendedReady ? (
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-500">
                    Recommended after all LIVE exams in this program. Finals stay open — no hard
                    lock.
                  </p>
                ) : null}
              </div>
              <Link
                href={`/streameru/programs/${program.programKey}/final`}
                className={`inline-flex min-h-[40px] items-center justify-center rounded-xl border px-4 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                  finalOk || recommendedReady
                    ? "border-accent/35 bg-accent/10 text-accent dark:text-accent-muted"
                    : "border-border/80 bg-muted-bg/60 text-muted dark:border-zinc-800"
                }`}
              >
                {finalOk ? "Review Program Final" : "Program Final Exam"}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
        <Link
          href="/streameru/graduation"
          className={`inline-flex min-h-[44px] items-center justify-center rounded-xl px-5 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
            snap.finalsPassed >= programs.length
              ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950"
              : "border border-border/80 bg-muted-bg/60 text-muted dark:border-zinc-800"
          }`}
        >
          {snap.graduationPassed ? "Review Graduation Exam" : "Graduation Exam"}
        </Link>
        {snap.finalsPassed < programs.length && !snap.graduationPassed ? (
          <p className="text-xs text-muted">
            Best after all {programs.length} Program Finals — earns the StreamerU Diploma with full
            LIVE exam completion.
          </p>
        ) : null}
      </div>
    </section>
  );
}
