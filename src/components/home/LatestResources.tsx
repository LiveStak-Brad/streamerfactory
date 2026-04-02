import Link from "next/link";
import { ResourceCard } from "@/components/resources/ResourceCard";
import { Section } from "@/components/ui/Section";
import { getLatestPublishedPosts } from "@/lib/resources/queries";

export async function LatestResources() {
  let posts: Awaited<ReturnType<typeof getLatestPublishedPosts>> = [];
  try {
    posts = await getLatestPublishedPosts(3);
  } catch {
    posts = [];
  }

  if (posts.length === 0) {
    return null;
  }

  return (
    <Section variant="muted" id="latest-resources" containerClassName="max-w-6xl">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent dark:text-accent-muted">
          Creator knowledge center
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-4xl">
          Latest resources for TikTok LIVE growth
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          Short, practical guides you can use on stream this week—monetization, pacing, rules, and growth
          habits. Read first, apply what fits, then come talk to us when you want a team behind you.
        </p>
      </div>

      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <li key={post.id}>
            <ResourceCard post={post} />
          </li>
        ))}
      </ul>

      <div className="mt-12 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
        <Link
          href="/resources"
          className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-zinc-200/90 bg-surface px-7 py-3 text-sm font-semibold text-zinc-900 shadow-sm transition-[transform,box-shadow,border-color] hover:-translate-y-0.5 hover:border-accent/35 hover:shadow-lg dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-accent/35"
        >
          View all resources
        </Link>
        <Link
          href="/apply"
          className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-zinc-950 px-7 py-3 text-sm font-semibold text-white shadow-md transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-lg dark:bg-white dark:text-zinc-950"
        >
          Apply to join
        </Link>
        <Link
          href="/about"
          className="inline-flex min-h-[48px] items-center justify-center px-4 py-3 text-sm font-semibold text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
        >
          How Streamer Factory works
        </Link>
      </div>
    </Section>
  );
}
