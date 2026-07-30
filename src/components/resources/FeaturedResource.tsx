import Link from "next/link";
import type { ResourcePostWithCategory } from "@/lib/resources/types";
import { ResourceMeta } from "./ResourceMeta";

export function FeaturedResource({
  post,
  curriculumTitle,
}: {
  post: ResourcePostWithCategory;
  /** When set, aligns card with program naming from `curriculum.ts`. */
  curriculumTitle?: string | null;
}) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-accent/25 bg-gradient-to-br from-accent/15 via-surface to-surface p-8 shadow-[0_28px_90px_-48px_rgba(91, 59, 255,0.55)] dark:from-accent/10 dark:via-zinc-950 dark:to-zinc-950 dark:shadow-[0_28px_90px_-48px_rgba(91, 59, 255,0.35)] sm:p-10">
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent/20 blur-3xl dark:bg-accent/15"
        aria-hidden
      />
      <p className="relative text-xs font-bold uppercase tracking-[0.2em] text-accent dark:text-accent-muted">
        Featured lesson
      </p>
      <p className="relative mt-2 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        This week&apos;s highlighted training — chosen to be immediately useful on LIVE.
      </p>
      <h2 className="relative mt-5 max-w-2xl text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-3xl sm:leading-snug">
        {curriculumTitle ?? post.title}
      </h2>
      <div className="relative mt-4">
        <ResourceMeta
          publishedAt={post.published_at}
          category={post.resource_categories ?? null}
          trainingTrack={post.training_track ?? "beginner"}
          difficulty={post.difficulty ?? null}
        />
      </div>
      {post.excerpt && (
        <p className="relative mt-5 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          {post.excerpt}
        </p>
      )}
      <div className="relative mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <Link
          href={`/streameru/${post.slug}`}
          className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-accent/40 bg-zinc-950 px-5 py-3 text-sm font-semibold text-white shadow-lg transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-xl dark:border-accent/50 dark:bg-white dark:text-zinc-950"
        >
          Open lesson
        </Link>
        <Link
          href="/apply"
          className="inline-flex min-h-[48px] items-center justify-center rounded-xl px-2 py-3 text-sm font-semibold text-accent transition-colors hover:underline dark:text-accent-muted"
        >
          Ready to apply? Tell us about your stream →
        </Link>
      </div>
    </div>
  );
}
