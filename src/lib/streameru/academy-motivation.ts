/**
 * Dynamic motivational checkpoints for StreamerU — real progress only.
 */

import { curriculumByProgram, getCurriculumLesson } from "@/lib/resources/curriculum";
import { STREAMERU_XP } from "@/lib/assessments/xp";
import { PUBLISHED_LESSON_COUNT } from "@/lib/streameru/academy-meta";

export type MotivationContext = {
  completedSlugs: Set<string>;
  recommendedSlug: string | null;
  quizPassedForRecommended: boolean;
  finalsPassed: number;
  activePrograms: number;
  programsComplete: number;
  graduationPassed: boolean;
};

export type MotivationMessage = {
  id: string;
  eyebrow: string;
  text: string;
};

export function buildMotivationMessages(ctx: MotivationContext): MotivationMessage[] {
  const messages: MotivationMessage[] = [];
  const completedCount = ctx.completedSlugs.size;
  const lesson = ctx.recommendedSlug ? getCurriculumLesson(ctx.recommendedSlug) : null;
  const programs = curriculumByProgram().filter((p) => p.lessons.length > 0);

  if (completedCount === 0) {
    return [
      {
        id: "start",
        eyebrow: "Keep learning",
        text: "You're building a professional creator career — start free today.",
      },
    ];
  }

  if (lesson) {
    const program = programs.find((p) => p.programName === lesson.programName);
    if (program) {
      const remainingInProgram = program.lessons.filter(
        (l) => !ctx.completedSlugs.has(l.slug),
      ).length;
      if (remainingInProgram > 0 && remainingInProgram <= 3) {
        if (program.programName === "Beginner Foundations") {
          messages.push({
            id: "beginner-close",
            eyebrow: "Beginner Foundations",
            text:
              remainingInProgram === 1
                ? "Only one lesson left until you complete Beginner Foundations."
                : `You're ${remainingInProgram} lessons away from completing Beginner Foundations.`,
          });
        } else if (remainingInProgram === 1) {
          messages.push({
            id: "program-one-left",
            eyebrow: program.programName,
            text: "Only one lesson left until your next Program Certificate checkpoint.",
          });
        }
      }
    }

    if (!ctx.quizPassedForRecommended) {
      messages.push({
        id: "quiz-unlock",
        eyebrow: "Next step",
        text: `Complete this quiz to unlock your LIVE Mission (+${STREAMERU_XP.lessonQuizPass} StreamerU XP).`,
      });
    } else if (!ctx.completedSlugs.has(lesson.slug)) {
      messages.push({
        id: "mission-ready",
        eyebrow: "LIVE Mission ready",
        text: "Quiz passed — complete your LIVE Mission to lock in progress.",
      });
    }
  }

  if (ctx.programsComplete === 0 && completedCount >= 6) {
    messages.push({
      id: "first-cert",
      eyebrow: "Certificate path",
      text: "Earn your first Program Certificate after LIVE exams + the Program Final.",
    });
  }

  if (ctx.programsComplete > 0 && ctx.programsComplete < ctx.activePrograms) {
    messages.push({
      id: "certs-progress",
      eyebrow: "Certificates",
      text: `${ctx.programsComplete} program path${ctx.programsComplete === 1 ? "" : "s"} complete — keep going toward graduation.`,
    });
  }

  const remaining = Math.max(0, PUBLISHED_LESSON_COUNT - completedCount);
  if (remaining > 0 && remaining <= 3 && !ctx.graduationPassed) {
    messages.push({
      id: "diploma-close",
      eyebrow: "Diploma path",
      text:
        remaining === 1
          ? "One LIVE exam left on the published path — then the Graduation Exam."
          : `${remaining} LIVE exams left on the published path toward your diploma.`,
    });
  }

  messages.push({
    id: "career",
    eyebrow: "Keep learning",
    text: "You're building a professional creator career — free, structured, and built to last.",
  });

  const seen = new Set<string>();
  return messages
    .filter((m) => {
      if (seen.has(m.id)) return false;
      seen.add(m.id);
      return true;
    })
    .slice(0, 3);
}
