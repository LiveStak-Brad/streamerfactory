import { difficultyLabel } from "@/lib/resources/tracks";

export type DifficultyLevel = "beginner" | "intermediate" | "advanced";

export function normalizeDifficulty(level: string | null | undefined): DifficultyLevel | null {
  if (!level) return null;
  const key = level.trim().toLowerCase();
  if (key === "beginner" || key === "intermediate" || key === "advanced") return key;
  return null;
}

/** Short badge label (Beginner / Intermediate / Advanced). */
export function difficultyShortLabel(level: string | null | undefined): string | null {
  const n = normalizeDifficulty(level);
  if (!n) return difficultyLabel(level);
  if (n === "beginner") return "Beginner";
  if (n === "intermediate") return "Intermediate";
  return "Advanced";
}

/**
 * Tailwind classes for difficulty badges — Beginner (teal) → Intermediate (amber) → Advanced (rose).
 */
export function difficultyBadgeClass(level: string | null | undefined): string {
  const n = normalizeDifficulty(level);
  switch (n) {
    case "beginner":
      return "border-teal-500/35 bg-teal-500/12 text-teal-800 dark:border-teal-400/30 dark:bg-teal-500/15 dark:text-teal-200";
    case "intermediate":
      return "border-amber-500/40 bg-amber-500/12 text-amber-900 dark:border-amber-400/30 dark:bg-amber-500/15 dark:text-amber-200";
    case "advanced":
      return "border-rose-500/40 bg-rose-500/12 text-rose-900 dark:border-rose-400/35 dark:bg-rose-500/15 dark:text-rose-200";
    default:
      return "border-zinc-200/90 bg-muted-bg/80 text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-300";
  }
}

/** Soft left-border / accent for semester cards by track difficulty band. */
export function difficultyTrackAccentClass(level: string | null | undefined): string {
  const n = normalizeDifficulty(level);
  switch (n) {
    case "beginner":
      return "from-teal-500/25 to-transparent";
    case "intermediate":
      return "from-amber-500/25 to-transparent";
    case "advanced":
      return "from-rose-500/25 to-transparent";
    default:
      return "from-accent/20 to-transparent";
  }
}

/**
 * Map curriculum track → typical difficulty band for program UI.
 * Essential safety (`rules` topical track) lives inside Beginner Foundations.
 */
export function trackDefaultDifficulty(trackId: string | null | undefined): DifficultyLevel {
  switch (trackId) {
    case "beginner":
    case "rules":
      return "beginner";
    case "content":
    case "battles":
      return "intermediate";
    case "monetization":
      return "advanced";
    case "presence":
    case "creation":
      return "intermediate";
    case "growth":
    case "community":
    case "professional":
    case "production":
    case "battle":
    case "music":
    case "gaming":
      return "advanced";
    default:
      return "beginner";
  }
}

/** Per-lesson override — deeper account protection sits later inside Beginner Foundations. */
export function lessonDifficulty(
  trackId: string | null | undefined,
  slug: string | null | undefined,
): DifficultyLevel {
  if (slug === "long-term-account-safety") return "intermediate";
  return trackDefaultDifficulty(trackId);
}
