import Link from "next/link";
import { LessonValueChips } from "@/components/resources/LessonValueChips";
import { getCurriculumLesson } from "@/lib/resources/curriculum";
import { lessonDifficulty, trackDefaultDifficulty } from "@/lib/resources/difficulty-styles";
import { trainingTrackLabel } from "@/lib/resources/tracks";
import type { ResourcePostWithCategory } from "@/lib/resources/types";

type Props = {
  post: ResourcePostWithCategory;
  /** Emphasize curriculum next neighbor */
  emphasize?: boolean;
};

export function ResourceCard({ post, emphasize = false }: Props) {
  const curriculum = getCurriculumLesson(post.slug);
  const displayTitle = curriculum?.title ?? post.title;
  const difficulty =
    (curriculum
      ? lessonDifficulty(curriculum.trackId, curriculum.slug)
      : null) ??
    post.difficulty ??
    trackDefaultDifficulty(curriculum?.trackId ?? post.training_track);

  return (
    <Link
      href={`/streameru/${post.slug}`}
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border p-5 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 sm:p-6 ${
        emphasize
          ? "border-accent/45 bg-accent/[0.07] shadow-md ring-1 ring-accent/20 dark:border-accent/35 dark:bg-accent/[0.08]"
          : "border-zinc-200/90 bg-surface/90 shadow-[0_1px_0_0_rgba(255,255,255,0.65)_inset] hover:border-accent/35 hover:shadow-[0_20px_50px_-28px_rgba(91,59,255,0.45)] dark:border-zinc-800/90 dark:bg-zinc-950/40 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] dark:hover:border-accent/30"
      }`}
    >
      {emphasize ? (
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-accent dark:text-accent-muted">
          Up next
        </p>
      ) : null}
      <div className={`flex flex-wrap items-center gap-2 text-xs font-semibold ${emphasize ? "mt-2" : ""}`}>
        {curriculum ? (
          <span className="tabular-nums text-zinc-500 dark:text-zinc-400">
            Lesson {curriculum.globalOrder}
          </span>
        ) : (
          <span className="uppercase tracking-wider text-accent dark:text-accent-muted">
            {trainingTrackLabel(post.training_track)}
          </span>
        )}
        {curriculum ? (
          <span className="text-zinc-400 dark:text-zinc-500">· {curriculum.programName}</span>
        ) : null}
      </div>
      <h3 className="mt-3 text-lg font-bold tracking-tight text-zinc-950 transition-colors group-hover:text-accent dark:text-zinc-50 dark:group-hover:text-accent-muted">
        {displayTitle}
      </h3>
      {post.excerpt && (
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {post.excerpt}
        </p>
      )}
      <div className="mt-4 space-y-2 border-t border-zinc-200/70 pt-3 dark:border-zinc-800">
        <LessonValueChips slug={post.slug} difficulty={difficulty} density="card" />
        <p className="text-right text-xs font-semibold text-accent opacity-0 transition-opacity group-hover:opacity-100 dark:text-accent-muted">
          Open lesson →
        </p>
      </div>
    </Link>
  );
}
