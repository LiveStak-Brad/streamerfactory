/**
 * Training program tracks — each published lesson belongs to one track.
 * Display copy for StreamerU hub sections (canonical path `/streameru`).
 */

export const TRAINING_TRACK_IDS = [
  "beginner",
  "battles",
  "monetization",
  "rules",
  "content",
] as const;

export type TrainingTrackId = (typeof TRAINING_TRACK_IDS)[number];

export type TrainingTrackSection = {
  id: TrainingTrackId;
  /** Section heading on the StreamerU hub */
  title: string;
  description: string;
  /** Lesson page line: “Lesson in: …” */
  lessonInLabel: string;
  /** Lesson page line: “Part of: …” */
  partOfLabel: string;
};

export const TRAINING_TRACK_SECTIONS: TrainingTrackSection[] = [
  {
    id: "beginner",
    title: "Beginner foundations",
    lessonInLabel: "Beginner foundations",
    partOfLabel: "StreamerU · Beginner track",
    description:
      "TikTok LIVE fundamentals — sound, framing, pacing, and sessions that feel intentional before you optimize anything else.",
  },
  {
    id: "battles",
    title: "Battles & collaboration",
    lessonInLabel: "Battles & collaboration",
    partOfLabel: "StreamerU · Battles track",
    description:
      "Partners, formats, battle weeks, and promotion — so network battles feel organized and worth showing up for.",
  },
  {
    id: "monetization",
    title: "Growth & monetization",
    lessonInLabel: "Growth & monetization",
    partOfLabel: "StreamerU · Growth track",
    description:
      "Gifts, goals, momentum, and sustainable schedules — building income without burning out your audience (or yourself).",
  },
  {
    id: "rules",
    title: "Platform rules",
    lessonInLabel: "Platform rules & safety",
    partOfLabel: "StreamerU · Rules track",
    description:
      "Guidelines, moderation habits, and staying compliant while you scale on LIVE.",
  },
  {
    id: "content",
    title: "Content & promotion",
    lessonInLabel: "Content & promotion",
    partOfLabel: "StreamerU · Content track",
    description:
      "Hooks, segments, and how you talk about battles and collabs without noise.",
  },
];

export function isTrainingTrackId(value: string | null | undefined): value is TrainingTrackId {
  return Boolean(value && (TRAINING_TRACK_IDS as readonly string[]).includes(value));
}

export function getTrainingTrackSection(track: string | null | undefined): TrainingTrackSection | null {
  if (!isTrainingTrackId(track)) return null;
  return TRAINING_TRACK_SECTIONS.find((s) => s.id === track) ?? null;
}

const TRACK_LABELS: Record<TrainingTrackId, string> = {
  beginner: "Beginner",
  battles: "Battles",
  monetization: "Monetization",
  rules: "Rules",
  content: "Content",
};

export function trainingTrackLabel(track: string | null | undefined): string {
  if (isTrainingTrackId(track)) return TRACK_LABELS[track];
  return "Training";
}

const DIFF_LABELS: Record<string, string> = {
  beginner: "Beginner level",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

export function difficultyLabel(level: string | null | undefined): string | null {
  if (!level) return null;
  return DIFF_LABELS[level] ?? level;
}
