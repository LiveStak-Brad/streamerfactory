import type { TrainingMission } from "@/lib/resources/training-missions";
import type { TrainingSectionsJson } from "@/lib/resources/training-sections";

export type LessonDownloadItem = {
  id: string;
  title: string;
  typeLabel: string;
  description: string;
  lines: string[];
};

function linesFromText(text: string): string[] {
  return text
    .split(/\n+/)
    .map((l) => l.replace(/^[-*•]\s*/, "").replace(/^\d+[.)]\s*/, "").trim())
    .filter(Boolean);
}

function extractDownloadsSection(content: string | null | undefined): string | null {
  if (!content) return null;
  const match = content.match(/^##\s+Downloads\s*\n([\s\S]*?)(?=^##\s+|\s*$)/m);
  if (!match) return null;
  const body = match[1]?.trim();
  return body || null;
}

/**
 * Build printable/copyable resource cards for a lesson.
 */
export function buildLessonDownloads(opts: {
  lessonTitle: string;
  content?: string | null;
  sections?: TrainingSectionsJson | null;
  mission?: TrainingMission | null;
}): LessonDownloadItem[] {
  const items: LessonDownloadItem[] = [];

  const checklist = opts.sections?.action_checklist?.trim();
  if (checklist) {
    items.push({
      id: "action-checklist",
      title: "Action checklist",
      typeLabel: "Worksheet",
      description: "Execute these steps after you study — before you mark the Live Exam complete.",
      lines: linesFromText(checklist),
    });
  }

  const downloadsBlock = extractDownloadsSection(opts.content);
  if (downloadsBlock) {
    items.push({
      id: "downloads-section",
      title: "Lesson downloads",
      typeLabel: "Handout",
      description: "Templates and lists from this lesson you can keep beside your stream.",
      lines: linesFromText(downloadsBlock),
    });
  }

  if (items.length === 0 && opts.mission) {
    items.push({
      id: "session-worksheet",
      title: "Session worksheet",
      typeLabel: "Live exam prep",
      description: `Prep sheet for “${opts.mission.mission_title}” — copy or print before you go live.`,
      lines: [
        ...opts.mission.mission_steps,
        `Pass criteria: ${opts.mission.mission_goal}`,
      ],
    });
  }

  return items;
}
