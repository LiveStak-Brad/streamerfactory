/**
 * Mastery percentage math for StreamerU assessments.
 *
 * Lesson mastery = best quiz % for that slug
 * Program mastery = 80% avg lesson mastery + 20% program final best %
 * Academy mastery = weighted avg of program masteries by lesson count,
 *   blended 80/20 with graduation exam best %
 */

import { listAcademyPrograms } from "@/lib/assessments/programs";
import type { MasterySnapshot } from "@/lib/assessments/types";
import type { TrainingTrackId } from "@/lib/resources/tracks";

export function computeLessonMastery(
  bestQuizPercentBySlug: Record<string, number>,
  lessonSlug: string,
): number {
  return clampPercent(bestQuizPercentBySlug[lessonSlug] ?? 0);
}

export function computeProgramMastery(
  bestQuizPercentBySlug: Record<string, number>,
  programFinalBestPercent: number | undefined,
  programKey: TrainingTrackId,
): number {
  const program = listAcademyPrograms().find((p) => p.programKey === programKey);
  if (!program || program.lessons.length === 0) return 0;

  const lessonAvg =
    program.lessons.reduce(
      (sum, l) => sum + (bestQuizPercentBySlug[l.slug] ?? 0),
      0,
    ) / program.lessons.length;

  const finalPct = programFinalBestPercent ?? 0;
  return clampPercent(Math.round(lessonAvg * 0.8 + finalPct * 0.2));
}

export function computeAcademyMastery(
  bestQuizPercentBySlug: Record<string, number>,
  programFinalBestByKey: Record<string, number>,
  graduationBestPercent: number | undefined,
): number {
  const programs = listAcademyPrograms();
  if (programs.length === 0) return 0;

  let weighted = 0;
  let weight = 0;
  for (const program of programs) {
    const pct = computeProgramMastery(
      bestQuizPercentBySlug,
      programFinalBestByKey[program.programKey],
      program.programKey,
    );
    weighted += pct * program.lessons.length;
    weight += program.lessons.length;
  }

  const programBlend = weight === 0 ? 0 : weighted / weight;
  const grad = graduationBestPercent ?? 0;
  return clampPercent(Math.round(programBlend * 0.8 + grad * 0.2));
}

export function buildMasterySnapshot(opts: {
  bestQuizPercentBySlug: Record<string, number>;
  programFinalBestByKey: Record<string, number>;
  graduationBestPercent?: number;
}): MasterySnapshot {
  const lesson: Record<string, number> = {};
  for (const [slug, pct] of Object.entries(opts.bestQuizPercentBySlug)) {
    lesson[slug] = clampPercent(pct);
  }

  const program: Record<string, number> = {};
  for (const p of listAcademyPrograms()) {
    program[p.programKey] = computeProgramMastery(
      opts.bestQuizPercentBySlug,
      opts.programFinalBestByKey[p.programKey],
      p.programKey,
    );
  }

  return {
    lesson,
    program,
    academy: computeAcademyMastery(
      opts.bestQuizPercentBySlug,
      opts.programFinalBestByKey,
      opts.graduationBestPercent,
    ),
  };
}

function clampPercent(n: number): number {
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(100, Math.round(n)));
}
