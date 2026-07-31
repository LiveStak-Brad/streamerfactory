/**
 * StreamerU semesters = curriculum programs.
 * Completion drives certificates, career gates, and graduation.
 */

import {
  CURRICULUM,
  CURRICULUM_TOTAL_LESSONS,
  curriculumByProgram,
  type CurriculumLesson,
} from "@/lib/resources/curriculum";
import type { TrainingTrackId } from "@/lib/resources/tracks";

export { CURRICULUM_TOTAL_LESSONS };

export type SemesterProgram = {
  programKey: TrainingTrackId;
  programName: string;
  certificateKey: string;
  lessons: CurriculumLesson[];
};

const CERT_BY_TRACK: Record<TrainingTrackId, string> = {
  beginner: "cert_beginner_foundations",
  content: "cert_live_mastery",
  battles: "cert_battles",
  monetization: "cert_monetization",
  rules: "cert_rules_safety",
};

export function listSemesterPrograms(): SemesterProgram[] {
  return curriculumByProgram().map(({ programName, lessons }) => {
    const trackId = lessons[0]!.trackId;
    return {
      programKey: trackId,
      programName,
      certificateKey: CERT_BY_TRACK[trackId],
      lessons,
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
