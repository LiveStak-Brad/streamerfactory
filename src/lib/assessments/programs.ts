/**
 * StreamerU programs for assessment UI — wraps curriculum program groupings.
 * Product language: Program (not Semester).
 */

import {
  listSemesterPrograms,
  programProgress,
  graduateCertificateKey,
  type ProgramProgress,
  type SemesterProgram,
} from "@/lib/growth/semester/programs";
import type { TrainingTrackId } from "@/lib/resources/tracks";

export type AcademyProgram = SemesterProgram;

export function listAcademyPrograms(): AcademyProgram[] {
  return listSemesterPrograms();
}

export function getAcademyProgram(
  programKey: TrainingTrackId | string,
): AcademyProgram | null {
  return listAcademyPrograms().find((p) => p.programKey === programKey) ?? null;
}

export function academyProgramProgress(
  completedLessonSlugs: string[],
): ProgramProgress[] {
  return programProgress(completedLessonSlugs);
}

export { graduateCertificateKey };

export const PROGRESSION_STEPS = [
  "Lesson",
  "Quiz",
  "Mission",
  "Program Final",
  "Program Certificate",
  "Next Program",
  "Graduation Exam",
  "Diploma",
  "Manager College",
] as const;

export type ProgressionStep = (typeof PROGRESSION_STEPS)[number];
