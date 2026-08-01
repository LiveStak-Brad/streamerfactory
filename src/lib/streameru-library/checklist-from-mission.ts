import { getCurriculumLesson } from "@/lib/resources/curriculum";
import type { TrainingTrackId } from "@/lib/resources/tracks";
import { getMissionForLessonSlug } from "@/lib/resources/training-missions";
import type {
  LibraryCategoryId,
  LibraryResource,
  PrintBlock,
} from "@/lib/streameru-library/types";

const TRACK_TO_CATEGORY: Record<TrainingTrackId, LibraryCategoryId> = {
  beginner: "beginner",
  content: "content",
  battles: "battles",
  monetization: "monetization",
  rules: "safety",
  presence: "content",
  creation: "content",
  growth: "content",
  community: "content",
  professional: "content",
  production: "content",
  battle: "battles",
  music: "content",
  gaming: "content",
  multiguest: "content",
  aicreator: "content",
  selling: "monetization",
  tts: "monetization",
};

export function libraryCategoryForLessonSlug(slug: string): LibraryCategoryId {
  const lesson = getCurriculumLesson(slug);
  if (!lesson) return "beginner";
  return TRACK_TO_CATEGORY[lesson.trackId] ?? "beginner";
}

/** Build a ready branded checklist from the lesson's LIVE mission. */
export function buildMissionChecklistResource(
  slug: string,
  opts?: {
    id?: string;
    title?: string;
    description?: string;
    extraItems?: string[];
  },
): LibraryResource | null {
  const lesson = getCurriculumLesson(slug);
  const mission = getMissionForLessonSlug(slug);
  if (!lesson || !mission) return null;

  const items = [...mission.mission_steps, ...(opts?.extraItems ?? [])];
  const blocks: PrintBlock[] = [
    {
      type: "intro",
      text: `${mission.mission_description} Print this sheet, complete each step, then bring it back when you mark the mission done in StreamerU.`,
    },
    {
      type: "callout",
      text: `Mission goal: ${mission.mission_goal}`,
    },
    {
      type: "checkbox_list",
      title: "Mission checklist",
      items,
    },
    {
      type: "fill_lines",
      title: "After your LIVE",
      lines: [
        { label: "What worked?", rows: 2 },
        { label: "What will you change next time?", rows: 2 },
        { label: "One technique you practiced from this lesson", rows: 1 },
      ],
    },
    {
      type: "notes",
      title: "Notes",
      lines: 4,
    },
  ];

  return {
    id: opts?.id ?? `checklist-${slug}`,
    title: opts?.title ?? `${lesson.title} — Mission Checklist`,
    description:
      opts?.description ??
      `Printable checklist for Lesson ${lesson.globalOrder}: ${lesson.title}. Complete before and during your LIVE mission.`,
    category: TRACK_TO_CATEGORY[lesson.trackId],
    kind: "checklist",
    status: "ready",
    lessonSlugs: [slug],
    blocks,
  };
}

export function buildPlaceholderWorksheet(
  slug: string,
  opts: {
    id: string;
    title: string;
    description: string;
    kind?: LibraryResource["kind"];
    category?: LibraryCategoryId;
    comingSoonNote?: string;
  },
): LibraryResource {
  const lesson = getCurriculumLesson(slug);
  return {
    id: opts.id,
    title: opts.title,
    description: opts.description,
    category: opts.category ?? libraryCategoryForLessonSlug(slug),
    kind: opts.kind ?? "worksheet",
    status: "placeholder",
    lessonSlugs: lesson ? [slug] : [],
    comingSoonNote:
      opts.comingSoonNote ??
      "This worksheet is on the roadmap. Your mission checklist is ready to print today — check back soon for the full pack.",
  };
}
