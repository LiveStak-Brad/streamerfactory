import Link from "next/link";
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

export function ResourceAllGuidesList({ posts }: { posts: ResourcePostWithCategory[] }) {
  if (posts.length === 0) return null;

  return (
    <ul className="divide-y divide-zinc-200/80 dark:divide-zinc-800/80">
      {posts.map((post) => (
        <li key={post.id}>
          <Link
            href={`/resources/${post.slug}`}
            className="group flex flex-col gap-1 py-4 transition-colors sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
          >
            <span className="text-base font-semibold text-zinc-950 group-hover:text-accent dark:text-zinc-50 dark:group-hover:text-accent-muted">
              {post.title}
            </span>
            <span className="shrink-0 text-xs font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              {formatDate(post.published_at)}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
