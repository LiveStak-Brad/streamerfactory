import {
  ACADEMY_RELEASE,
  PLANNED_CURRICULUM_LESSON_COUNT,
  PUBLISHED_LESSON_COUNT,
} from "@/lib/streameru/academy-meta";

type Props = {
  className?: string;
  /** Dark hero vs light surface */
  tone?: "onDark" | "onLight";
};

/**
 * Current-version badge — makes the academy feel like living software.
 */
export function AcademyVersionBadge({ className = "", tone = "onDark" }: Props) {
  const shell =
    tone === "onDark"
      ? "border-white/15 bg-white/5 text-zinc-200"
      : "border-border/80 bg-muted-bg/50 text-foreground dark:border-zinc-700 dark:bg-zinc-900/50";
  const muted = tone === "onDark" ? "text-zinc-500" : "text-muted";

  return (
    <div
      className={`inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-full border px-3 py-1.5 text-xs font-semibold ${shell} ${className}`}
      aria-label={`${ACADEMY_RELEASE.versionLabel}, ${PUBLISHED_LESSON_COUNT} lessons available`}
    >
      <span className="font-bold tracking-wide text-accent-muted">{ACADEMY_RELEASE.versionLabel}</span>
      <span className={muted} aria-hidden>
        ·
      </span>
      <span className="tabular-nums">
        {PUBLISHED_LESSON_COUNT} lessons · {PLANNED_CURRICULUM_LESSON_COUNT} planned
      </span>
    </div>
  );
}
