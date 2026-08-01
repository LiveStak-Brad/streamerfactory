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
  "Presence Mastery": {
    programKey: "presence",
    certificateKey: "cert_presence_mastery",
  },
  "Content Creation Mastery": {
    programKey: "creation",
    certificateKey: "cert_content_creation_mastery",
  },
  "Growth Mastery": {
    programKey: "growth",
    certificateKey: "cert_growth_mastery",
  },
  "Community Mastery": {
    programKey: "community",
    certificateKey: "cert_community_mastery",
  },
  "Professional Creator Mastery": {
    programKey: "professional",
    certificateKey: "cert_professional_creator_mastery",
  },
  "Production Mastery": {
    programKey: "production",
    certificateKey: "cert_production_mastery",
  },
  "Battle Mastery": {
    programKey: "battle",
    certificateKey: "cert_battle_mastery",
  },
  "Music LIVE Mastery": {
    programKey: "music",
    certificateKey: "cert_music_live_mastery",
  },
  "Gaming LIVE Mastery": {
    programKey: "gaming",
    certificateKey: "cert_gaming_live_mastery",
  },
  "Multi-Guest LIVE Mastery": {
    programKey: "multiguest",
    certificateKey: "cert_multi_guest_live_mastery",
  },
  "AI Creator Mastery": {
    programKey: "aicreator",
    certificateKey: "cert_ai_creator_mastery",
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
      /** Programs with no lessons are not complete. */
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

/**
 * Core Certification programs only (Beginner → Growth & Monetization).
 * Advanced Creator is the black-belt bridge after Core — it must never gate the StreamerU Diploma.
 */
export const CORE_PROGRAM_NAMES: readonly StreamerUProgramName[] = [
  "Beginner Foundations",
  "Live Streaming Mastery",
  "Battles & Collaboration",
  "Growth & Monetization",
] as const;

export function getCoreCurriculumLessons(): CurriculumLesson[] {
  const core = new Set<string>(CORE_PROGRAM_NAMES);
  return CURRICULUM.filter((l) => core.has(l.programName));
}

export const CORE_CURRICULUM_TOTAL_LESSONS = getCoreCurriculumLessons().length;

/**
 * StreamerU Diploma / Core Graduate — all Core lessons complete.
 * Advanced Creator and Mastery Paths never gate the Core Diploma.
 */
export function isFullGraduate(completedLessonSlugs: string[]): boolean {
  const done = new Set(completedLessonSlugs);
  return getCoreCurriculumLessons().every((l) => done.has(l.slug));
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
  if (certificateKey === "cert_presence_mastery") return "Presence Mastery Certificate";
  if (certificateKey === "cert_content_creation_mastery") {
    return "Content Creation Mastery Certificate";
  }
  if (certificateKey === "cert_growth_mastery") return "Growth Mastery Certificate";
  if (certificateKey === "cert_community_mastery") return "Community Mastery Certificate";
  if (certificateKey === "cert_professional_creator_mastery") {
    return "Professional Creator Mastery Certificate";
  }
  if (certificateKey === "cert_production_mastery") {
    return "Production Mastery Certificate";
  }
  if (certificateKey === "cert_battle_mastery") {
    return "Battle Mastery Certificate";
  }
  if (certificateKey === "cert_music_live_mastery") {
    return "Music LIVE Mastery Certificate";
  }
  if (certificateKey === "cert_gaming_live_mastery") {
    return "Gaming LIVE Mastery Certificate";
  }
  if (certificateKey === "cert_multi_guest_live_mastery") {
    return "Multi-Guest LIVE Mastery Certificate";
  }
  if (certificateKey === "cert_ai_creator_mastery") {
    return "AI Creator Mastery Certificate";
  }
  return certificateKey;
}
