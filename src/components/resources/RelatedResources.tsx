import Link from "next/link";
import { ResourceCard } from "@/components/resources/ResourceCard";
import { getCurriculumNeighbors } from "@/lib/resources/curriculum";
import type { ResourcePostWithCategory } from "@/lib/resources/types";

export function RelatedResources({
  posts,
  currentSlug,
}: {
  posts: ResourcePostWithCategory[];
  currentSlug?: string;
}) {
  if (posts.length === 0) return null;

  const nextSlug = currentSlug ? getCurriculumNeighbors(currentSlug).next?.slug : null;

  return (
    <section className="scroll-mt-24" aria-labelledby="related-lessons-heading">
      <div className="flex flex-col gap-2 border-b border-zinc-200/80 pb-4 dark:border-zinc-800/80 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-accent dark:text-accent-muted">
            Curriculum
          </p>
          <h2
            id="related-lessons-heading"
            className="mt-1 text-lg font-bold tracking-tight text-zinc-950 dark:text-zinc-50"
          >
            Related lessons
          </h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Continue in program order — next first, then previous, then same-track lessons.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm font-semibold">
          <Link
            href="/streameru"
            className="text-accent transition-colors hover:underline dark:text-accent-muted"
          >
            StreamerU hub →
          </Link>
          <Link
            href="/streameru/library"
            className="text-muted transition-colors hover:text-accent hover:underline dark:hover:text-accent-muted"
          >
            Worksheets →
          </Link>
          <Link
            href="/founder"
            className="text-muted transition-colors hover:text-accent hover:underline dark:hover:text-accent-muted"
          >
            Founder →
          </Link>
        </div>
      </div>
      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <li key={post.id}>
            <ResourceCard post={post} emphasize={Boolean(nextSlug && post.slug === nextSlug)} />
          </li>
        ))}
      </ul>
    </section>
  );
}
