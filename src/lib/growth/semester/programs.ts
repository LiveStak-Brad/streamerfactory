/**
 * StreamerU programs = curriculum programs.
 * Completion drives certificates, career gates, and graduation.
 *
 * Internal note: Advanced Creator keeps programKey `rules` so existing
 * `final:rules` / `cert_rules_safety` storage IDs remain valid after the
 * safety-first curriculum reorganization.
 */

import {
  CURRICULUM,
  CURRICULUM_TOTAL_LESSONS,
  STREAMERU_PROGRAM_NAMES,
  curriculumByProgram,
  type CurriculumLesson,
  type StreamerUProgramName,
} from "@/lib/resources/curriculum";
import type { TrainingTrackId } from "@/lib/resources/tracks";

export { CURRICULUM_TOTAL_LESSONS };

export type SemesterProgram = {
  programKey: TrainingTrackId;
  programName: string;
  certificateKey: string;
  lessons: CurriculumLesson[];
};

type ProgramMeta = {
  programKey: TrainingTrackId;
  certificateKey: string;
};

/**
 * Stable program keys / certificate keys by display program name.
 * Do not derive programKey from the first lesson's trackId — Beginner Foundations
 * mixes beginner + rules topical tracks.
 */
export const PROGRAM_META_BY_NAME: Record<StreamerUProgramName, ProgramMeta> = {
  "Beginner Foundations": {
    programKey: "beginner",
    certificateKey: "cert_beginner_foundations",
  },
  "Live Streaming Mastery": {
    programKey: "content",
    certificateKey: "cert_live_mastery",
  },
  "Battles & Collaboration": {
    programKey: "battles",
    certificateKey: "cert_battles",
  },
  "Growth & Monetization": {
    programKey: "monetization",
    certificateKey: "cert_monetization",
  },
  /** Formerly Rules & Safety — ID preserved; display is Advanced Creator. */
  "Advanced Creator": {
    programKey: "rules",
    certificateKey: "cert_rules_safety",
  },
};

export function listSemesterPrograms(): SemesterProgram[] {
  const byName = new Map(
    curriculumByProgram().map((g) => [g.programName, g.lessons] as const),
  );
  return STREAMERU_PROGRAM_NAMES.map((programName) => {
    const meta = PROGRAM_META_BY_NAME[programName];
    return {
      programKey: meta.programKey,
      programName,
      certificateKey: meta.certificateKey,
      lessons: byName.get(programName) ?? [],
    };
  });
}

export type ProgramProgress = {
  programKey: TrainingTrackId;
  programName: string;
  certificateKey: string;
  completed: number;
  total: number;
  percent: number;
  complete: boolean;
  remainingSlugs: string[];
};

export function programProgress(
  completedLessonSlugs: string[],
): ProgramProgress[] {
  const done = new Set(completedLessonSlugs);
  return listSemesterPrograms().map((program) => {
    const completed = program.lessons.filter((l) => done.has(l.slug)).length;
    const total = program.lessons.length;
    return {
      programKey: program.programKey,
      programName: program.programName,
      certificateKey: program.certificateKey,
      completed,
      total,
      percent: total === 0 ? 0 : Math.round((completed / total) * 100),
      /** Empty roadmap programs (Advanced Creator until lessons ship) are not complete. */
      complete: total > 0 && completed >= total,
      remainingSlugs: program.lessons
        .filter((l) => !done.has(l.slug))
        .map((l) => l.slug),
    };
  });
}

export function countCompletedPrograms(completedLessonSlugs: string[]): number {
  return programProgress(completedLessonSlugs).filter((p) => p.complete).length;
}

export function isFullGraduate(completedLessonSlugs: string[]): boolean {
  const done = new Set(completedLessonSlugs);
  return CURRICULUM.every((l) => done.has(l.slug));
}

export function completedSlugsFromEvents(
  lessonCompletedSubjects: string[],
  streameruLessonSlugs: string[],
): string[] {
  return [...new Set([...lessonCompletedSubjects, ...streameruLessonSlugs])];
}

export function graduateCertificateKey(): string {
  return "cert_streameru_graduate";
}

/** Public certificate title overrides for preserved keys after reorganization. */
export function certificateDisplayName(certificateKey: string): string {
  if (certificateKey === "cert_rules_safety") return "Advanced Creator Certificate";
  return certificateKey;
}
