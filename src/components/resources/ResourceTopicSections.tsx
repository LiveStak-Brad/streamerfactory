import Link from "next/link";
import { ResourceCard } from "@/components/resources/ResourceCard";
import { getCurriculumOrderIndex } from "@/lib/resources/curriculum";
import { TRAINING_TRACK_SECTIONS } from "@/lib/resources/tracks";
import type { ResourcePostWithCategory } from "@/lib/resources/types";

function postsForTrack(posts: ResourcePostWithCategory[], trackId: string, excludeIds: Set<string>) {
  return posts
    .filter((p) => {
      if (excludeIds.has(p.id)) return false;
      return (p.training_track ?? "beginner") === trackId;
    })
    .sort((a, b) => getCurriculumOrderIndex(a.slug) - getCurriculumOrderIndex(b.slug));
}

type Props = {
  posts: ResourcePostWithCategory[];
  /** Usually the featured post id so it does not repeat in a topic strip. */
  excludeIds?: string[];
  /** Optional heading above the grid — e.g. “Optional: browse by topic”. */
  introHeading?: string;
  introDescription?: string;
};

const MAX_PER_SECTION = 5;

export function ResourceTopicSections({
  posts,
  excludeIds = [],
  introHeading,
  introDescription,
}: Props) {
  const exclude = new Set(excludeIds);

  return (
    <div className="space-y-16 lg:space-y-20">
      {introHeading || introDescription ? (
        <div className="max-w-3xl border-b border-zinc-200/80 pb-6 dark:border-zinc-800/80">
          {introHeading ? (
            <h2 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">{introHeading}</h2>
          ) : null}
          {introDescription ? (
            <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{introDescription}</p>
          ) : null}
        </div>
      ) : null}
      {TRAINING_TRACK_SECTIONS.map((section) => {
        const sectionPosts = postsForTrack(posts, section.id, exclude);
        return (
          <section
            key={section.id}
            id={section.id}
            className="scroll-mt-28"
            aria-labelledby={`hub-section-${section.id}`}
          >
            <div className="flex flex-col gap-4 border-b border-zinc-200/80 pb-5 dark:border-zinc-800/80 sm:flex-row sm:items-end sm:justify-between">
              <div className="min-w-0">
                <h2
                  id={`hub-section-${section.id}`}
                  className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50"
                >
                  {section.title}
                </h2>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
                  {section.description}
                </p>
              </div>
              <Link
                href={`/streameru?track=${section.id}`}
                className="shrink-0 text-sm font-semibold text-accent hover:underline dark:text-accent-muted"
              >
                Full list →
              </Link>
            </div>

            {sectionPosts.length === 0 ? (
              <div className="mt-8 rounded-2xl border border-dashed border-zinc-300/90 bg-muted-bg/30 px-5 py-10 text-center dark:border-zinc-700 dark:bg-zinc-950/30 sm:px-8">
                <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                  More lessons coming in this track
                </p>
                <p className="mx-auto mt-2 max-w-md text-sm text-zinc-600 dark:text-zinc-400">
                  Browse{" "}
                  <Link href="/streameru/start-here" className="font-semibold text-accent hover:underline dark:text-accent-muted">
                    Start your training
                  </Link>{" "}
                  or the full lesson list below.
                </p>
              </div>
            ) : (
              <ul className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {sectionPosts.slice(0, MAX_PER_SECTION).map((post) => (
                  <li key={post.id}>
                    <ResourceCard post={post} />
                  </li>
                ))}
              </ul>
            )}
          </section>
        );
      })}
    </div>
  );
}
