import { getExpandedLesson } from "@/content/streameru/lessons";
import { extractLiveMinutesFromMission, formatMinutesLabel } from "@/lib/resources/mission-minutes";
import { getMissionForLessonSlug } from "@/lib/resources/training-missions";
import type { TrainingMission } from "@/lib/resources/training-missions";

export type LessonEstimate = {
  studyMinutes: number;
  liveMinutes: number | null;
  totalMinutes: number;
  studyLabel: string;
  liveLabel: string | null;
  totalLabel: string;
};

function wordCount(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).filter(Boolean).length;
}

/** ~220 wpm reading pace, clamped for academy UX. */
function studyMinutesFromContent(content: string): number {
  const words = wordCount(content);
  if (words === 0) return 12;
  return Math.min(45, Math.max(8, Math.round(words / 220)));
}

export function getLessonEstimate(
  slug: string,
  opts?: {
    content?: string | null;
    mission?: TrainingMission | null;
  },
): LessonEstimate {
  const expanded = getExpandedLesson(slug);
  const mission = opts?.mission ?? getMissionForLessonSlug(slug);
  const content = opts?.content ?? expanded?.content ?? "";

  const studyMinutes =
    expanded?.estimatedMinutes && expanded.estimatedMinutes > 0
      ? expanded.estimatedMinutes
      : studyMinutesFromContent(content);

  const liveMinutes = extractLiveMinutesFromMission(mission);
  const totalMinutes = studyMinutes + (liveMinutes ?? 0);

  return {
    studyMinutes,
    liveMinutes,
    totalMinutes,
    studyLabel: formatMinutesLabel(studyMinutes),
    liveLabel: liveMinutes != null ? formatMinutesLabel(liveMinutes) : null,
    totalLabel: formatMinutesLabel(totalMinutes),
  };
}

export function sumStudyMinutesForSlugs(slugs: string[]): number {
  return slugs.reduce((sum, slug) => sum + getLessonEstimate(slug).studyMinutes, 0);
}
