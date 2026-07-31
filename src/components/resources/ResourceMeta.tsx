import {
  difficultyBadgeClass,
  difficultyShortLabel,
} from "@/lib/resources/difficulty-styles";
import {
  getTrainingTrackSection,
  trainingTrackLabel,
} from "@/lib/resources/tracks";
import type { ResourceCategoryRow } from "@/lib/resources/types";

function formatDate(iso: string | null) {
  if (!iso) return "";
  try {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(iso));
  } catch {
    return "";
  }
}

export function ResourceMeta({
  publishedAt,
  category,
  trainingTrack,
  difficulty,
  omitLessonContext = false,
}: {
  publishedAt: string | null;
  category: Pick<ResourceCategoryRow, "name"> | null | undefined;
  /** Program track label (beginner, battles, …). */
  trainingTrack?: string | null;
  difficulty?: string | null;
  /** Hide “Lesson in / Part of” when curriculum header already shows placement. */
  omitLessonContext?: boolean;
}) {
  const diff = difficultyShortLabel(difficulty ?? null);
  const trackSection = getTrainingTrackSection(trainingTrack ?? null);

  return (
    <div className="space-y-2">
      {trackSection && !omitLessonContext ? (
        <div className="flex flex-col gap-0.5 text-xs text-zinc-500 dark:text-zinc-400">
          <span>
            <span className="font-medium text-zinc-600 dark:text-zinc-300">Lesson in:</span>{" "}
            {trackSection.lessonInLabel}
          </span>
          <span>
            <span className="font-medium text-zinc-600 dark:text-zinc-300">Part of:</span>{" "}
            {trackSection.partOfLabel}
          </span>
        </div>
      ) : null}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-zinc-500 dark:text-zinc-400">
        {trainingTrack && !trackSection ? (
          <span className="inline-flex items-center rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-violet-800 dark:border-violet-500/25 dark:bg-violet-500/10 dark:text-violet-200">
            {trainingTrackLabel(trainingTrack)} track
          </span>
        ) : null}
        {diff ? (
          <span
            className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider ${difficultyBadgeClass(difficulty)}`}
          >
            {diff}
          </span>
        ) : null}
        {category?.name && (
          <span className="inline-flex items-center rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent dark:text-accent-muted">
            {category.name}
          </span>
        )}
        {publishedAt && (
          <time dateTime={publishedAt} className="font-medium text-zinc-600 dark:text-zinc-400">
            {formatDate(publishedAt)}
          </time>
        )}
      </div>
    </div>
  );
}
