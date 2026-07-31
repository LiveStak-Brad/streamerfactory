import {
  ACADEMY_RELEASE,
  PLANNED_CURRICULUM_LESSON_COUNT,
  PUBLISHED_LESSON_COUNT,
} from "@/lib/streameru/academy-meta";

const PULSE = [
  `${PUBLISHED_LESSON_COUNT} lessons published`,
  `${PLANNED_CURRICULUM_LESSON_COUNT} planned`,
  "Updated weekly",
  "New lessons every month",
  `Version ${ACADEMY_RELEASE.version}`,
  `Last lesson added ${ACADEMY_RELEASE.lastLessonAddedLabel}`,
] as const;

/**
 * Compact “this product is maintained” signals — not a long SEO block.
 */
export function AcademyReleasePulse() {
  return (
    <ul
      className="flex flex-wrap gap-2"
      aria-label="StreamerU release status"
    >
      {PULSE.map((item) => (
        <li
          key={item}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border/70 bg-muted-bg/40 px-2.5 py-1 text-[11px] font-semibold text-muted dark:border-zinc-800 dark:bg-zinc-900/40"
        >
          <span className="text-emerald-600 dark:text-emerald-400" aria-hidden>
            ✓
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}
