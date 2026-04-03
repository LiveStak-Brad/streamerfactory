import Link from "next/link";
import { getCurriculumLesson } from "@/lib/resources/curriculum";
import { trainingTrackLabel } from "@/lib/resources/tracks";
import type { ResourcePostWithCategory } from "@/lib/resources/types";

function formatDate(iso: string | null) {
  if (!iso) return "";
  try {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(iso));
  } catch {
    return "";
  }
}

export function ResourceCard({ post }: { post: ResourcePostWithCategory }) {
  const cat = post.resource_categories;
  const displayTitle = getCurriculumLesson(post.slug)?.title ?? post.title;
  return (
    <Link
      href={`/streameru/${post.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200/90 bg-surface/90 p-6 shadow-[0_1px_0_0_rgba(255,255,255,0.65)_inset] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-accent/35 hover:shadow-[0_20px_50px_-28px_rgba(99,102,241,0.45)] dark:border-zinc-800/90 dark:bg-zinc-950/40 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] dark:hover:border-accent/30"
    >
      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent dark:text-accent-muted">
        <span>{trainingTrackLabel(post.training_track)}</span>
        {cat?.name ? (
          <span className="text-zinc-500 dark:text-zinc-500">· {cat.name}</span>
        ) : null}
        {post.published_at && (
          <span className="text-zinc-400 dark:text-zinc-500">{formatDate(post.published_at)}</span>
        )}
      </div>
      <h3 className="mt-3 text-lg font-bold tracking-tight text-zinc-950 transition-colors group-hover:text-accent dark:text-zinc-50 dark:group-hover:text-accent-muted">
        {displayTitle}
      </h3>
      {post.excerpt && (
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {post.excerpt}
        </p>
      )}
      <span className="mt-4 inline-flex items-center text-sm font-semibold text-accent opacity-0 transition-opacity group-hover:opacity-100 dark:text-accent-muted">
        Open lesson →
      </span>
    </Link>
  );
}
