import Link from "next/link";
import { ResourceCard } from "@/components/resources/ResourceCard";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { getPublishedPostsInCurriculumOrder } from "@/lib/resources/queries";
import { tiktokCreatorNetworkApplyUrl } from "@/lib/site";

export async function LatestResources() {
  let posts: Awaited<ReturnType<typeof getPublishedPostsInCurriculumOrder>> = [];
  try {
    const ordered = await getPublishedPostsInCurriculumOrder();
    posts = ordered.slice(0, 3);
  } catch {
    posts = [];
  }

  if (posts.length === 0) {
    return null;
  }

  return (
    <Section variant="muted" id="streameru-latest" containerClassName="max-w-6xl">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent dark:text-accent-muted">
          StreamerU
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-4xl">
          StreamerU — free education included
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          Lessons available now from the free live streaming academy (curriculum order — not
          &quot;newest&quot;). Join Streamer Factory for free and use StreamerU to accelerate your growth.
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
        <Button href={tiktokCreatorNetworkApplyUrl} external variant="primary" className="min-h-[48px] px-7">
          Join Streamer Factory FREE
        </Button>
        <Link
          href="/streameru"
          className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-zinc-200/90 bg-surface px-7 py-3 text-sm font-semibold text-zinc-900 shadow-sm transition-[transform,box-shadow,border-color] hover:-translate-y-0.5 hover:border-accent/35 hover:shadow-lg dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-accent/35"
        >
          Start StreamerU Today
        </Link>
        <Link
          href="/apply"
          className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-zinc-200/90 bg-surface px-7 py-3 text-sm font-semibold text-zinc-900 shadow-sm transition-[transform,box-shadow,border-color] hover:-translate-y-0.5 hover:border-accent/35 hover:shadow-lg dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-accent/35"
        >
          Apply to join the free creator network
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
