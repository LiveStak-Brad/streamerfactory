/**
 * Optional structured fields for resource articles (stored as JSONB).
 * Keys use snake_case in the database; all values are plain text (paragraphs).
 */

export type TrainingSectionsJson = {
  what_youll_learn?: string;
  why_it_matters?: string;
  core_strategy?: string;
  step_by_step?: string;
  common_mistakes?: string;
  action_checklist?: string;
};

export const TRAINING_SECTION_KEYS: {
  key: keyof TrainingSectionsJson;
  heading: string;
}[] = [
  { key: "what_youll_learn", heading: "What you'll learn" },
  { key: "why_it_matters", heading: "Why this matters" },
  { key: "core_strategy", heading: "Core strategy" },
  { key: "step_by_step", heading: "Step-by-step breakdown" },
  { key: "common_mistakes", heading: "Common mistakes" },
  { key: "action_checklist", heading: "Action checklist" },
];

export function hasAnyTrainingSection(data: TrainingSectionsJson | null | undefined): boolean {
  if (!data || typeof data !== "object") return false;
  return TRAINING_SECTION_KEYS.some(({ key }) => {
    const v = data[key];
    return typeof v === "string" && v.trim().length > 0;
  });
}

export function parseTrainingSectionsJson(raw: unknown): TrainingSectionsJson | null {
  if (raw == null) return null;
  let o: unknown = raw;
  if (typeof raw === "string") {
    try {
      o = JSON.parse(raw) as unknown;
    } catch {
      return null;
    }
  }
  if (typeof o !== "object" || o === null || Array.isArray(o)) return null;
  const rec = o as Record<string, unknown>;
  const out: TrainingSectionsJson = {};
  for (const { key } of TRAINING_SECTION_KEYS) {
    const v = rec[key as string];
    if (typeof v === "string" && v.trim()) {
      out[key] = v.trim();
    }
  }
  return Object.keys(out).length ? out : null;
}
