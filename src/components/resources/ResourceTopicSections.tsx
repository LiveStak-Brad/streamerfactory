import Link from "next/link";
import { ResourceCard } from "@/components/resources/ResourceCard";
import { RESOURCE_HUB_SECTIONS } from "@/lib/resources/hub-sections";
import type { ResourceHubSection } from "@/lib/resources/hub-sections";
import type { ResourcePostWithCategory } from "@/lib/resources/types";

function postsForSection(posts: ResourcePostWithCategory[], section: ResourceHubSection, excludeIds: Set<string>) {
  return posts
    .filter((p) => {
      if (excludeIds.has(p.id)) return false;
      const slug = p.resource_categories?.slug;
      if (!slug) return false;
      return section.categorySlugs.includes(slug);
    })
    .sort((a, b) => {
      const ta = a.published_at ? new Date(a.published_at).getTime() : 0;
      const tb = b.published_at ? new Date(b.published_at).getTime() : 0;
      return tb - ta;
    });
}

type Props = {
  posts: ResourcePostWithCategory[];
  /** Usually the featured post id so it does not repeat in a topic strip. */
  excludeIds?: string[];
};

const MAX_PER_SECTION = 4;

export function ResourceTopicSections({ posts, excludeIds = [] }: Props) {
  const exclude = new Set(excludeIds);

  return (
    <div className="space-y-16 lg:space-y-20">
      {RESOURCE_HUB_SECTIONS.map((section) => {
        const sectionPosts = postsForSection(posts, section, exclude);
        return (
          <section
            key={section.id}
            id={section.id}
            className="scroll-mt-28"
            aria-labelledby={`hub-section-${section.id}`}
          >
            <div className="border-b border-zinc-200/80 pb-5 dark:border-zinc-800/80">
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

            {sectionPosts.length === 0 ? (
              <div className="mt-8 rounded-2xl border border-dashed border-zinc-300/90 bg-muted-bg/30 px-5 py-10 text-center dark:border-zinc-700 dark:bg-zinc-950/30 sm:px-8">
                <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                  More guides coming in this area
                </p>
                <p className="mx-auto mt-2 max-w-md text-sm text-zinc-600 dark:text-zinc-400">
                  We&apos;re adding depth here first — browse{" "}
                  <Link href="/resources/start-here" className="font-semibold text-accent hover:underline dark:text-accent-muted">
                    Start Here
                  </Link>{" "}
                  or the full library below for related topics.
                </p>
              </div>
            ) : (
              <ul className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
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
