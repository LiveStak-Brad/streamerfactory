import Link from "next/link";
import { ResourceCard } from "@/components/resources/ResourceCard";
import type { ResourcePostWithCategory } from "@/lib/resources/types";

export function RelatedResources({ posts }: { posts: ResourcePostWithCategory[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="scroll-mt-24" aria-labelledby="related-lessons-heading">
      <div className="flex flex-col gap-2 border-b border-zinc-200/80 pb-4 dark:border-zinc-800/80 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2
            id="related-lessons-heading"
            className="text-lg font-bold tracking-tight text-zinc-950 dark:text-zinc-50"
          >
            Continue your training
          </h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Next in the program, then previous, then more from the same track — in curriculum order.
          </p>
        </div>
        <Link
          href="/streameru"
          className="text-sm font-semibold text-accent transition-colors hover:underline dark:text-accent-muted"
        >
          StreamerU hub →
        </Link>
      </div>
      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <li key={post.id}>
            <ResourceCard post={post} />
          </li>
        ))}
      </ul>
    </section>
  );
}
