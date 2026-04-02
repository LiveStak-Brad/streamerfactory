import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/resources/ArticleBody";
import { RelatedResources } from "@/components/resources/RelatedResources";
import { ResourceArticleCta } from "@/components/resources/ResourceArticleCta";
import { ResourceArticleSidebar } from "@/components/resources/ResourceArticleSidebar";
import { ResourceBreadcrumb } from "@/components/resources/ResourceBreadcrumb";
import { ResourceMeta } from "@/components/resources/ResourceMeta";
import { ResourceSupportCallout } from "@/components/resources/ResourceSupportCallout";
import { Container } from "@/components/ui/Container";
import { StartHereArticleHint } from "@/components/resources/StartHereArticleHint";
import { splitIntroAndBody } from "@/lib/resources/content";
import { getPublishedPostBySlug, getRelatedPublishedPosts } from "@/lib/resources/queries";
import { isStartHereArticleSlug } from "@/lib/resources/start-here";
import { site } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) return { title: "Resource" };
  return {
    title: post.title,
    description: post.excerpt ?? post.title,
    openGraph: {
      title: `${post.title} | ${site.name}`,
      description: post.excerpt ?? undefined,
      url: `${site.url}/resources/${post.slug}`,
    },
  };
}

export default async function ResourcePostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) notFound();

  const related = await getRelatedPublishedPosts(slug, 3);

  const cat = post.resource_categories;
  const { intro, rest } = splitIntroAndBody(post.content);
  const hasSplit = rest !== null;

  return (
    <article className="relative pb-24 pt-14 sm:pb-32 sm:pt-20">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[min(520px,70vh)] bg-[radial-gradient(ellipse_75%_55%_at_50%_0%,rgba(99,102,241,0.14),transparent_62%)] dark:bg-[radial-gradient(ellipse_75%_55%_at_50%_0%,rgba(99,102,241,0.09),transparent_62%)]"
        aria-hidden
      />
      <Container className="relative max-w-6xl">
        <ResourceBreadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Resources", href: "/resources" },
            { label: post.title },
          ]}
        />

        {isStartHereArticleSlug(post.slug) ? (
          <div className="mt-6 max-w-2xl">
            <StartHereArticleHint />
          </div>
        ) : null}

        <div className="mt-8 lg:grid lg:grid-cols-12 lg:items-start lg:gap-10 xl:gap-14">
          <div className="min-w-0 lg:col-span-8">
            <header className="border-b border-zinc-200/80 pb-10 dark:border-zinc-800/80">
              <ResourceMeta publishedAt={post.published_at} category={cat ?? null} />
              <h1 className="mt-6 text-4xl font-bold tracking-[-0.03em] text-zinc-950 dark:text-zinc-50 sm:text-5xl sm:leading-[1.06]">
                {post.title}
              </h1>
              {post.excerpt && (
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-xl">
                  {post.excerpt}
                </p>
              )}
            </header>

            {post.cover_image_url && (
              <div className="mt-10 overflow-hidden rounded-2xl border border-zinc-200/80 bg-zinc-100 ring-1 ring-black/[0.04] dark:border-zinc-800 dark:bg-zinc-900 dark:ring-white/[0.06]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.cover_image_url}
                  alt=""
                  className="h-auto w-full object-cover"
                />
              </div>
            )}

            <div className="mt-12 lg:mt-14">
              {hasSplit ? (
                <>
                  {intro.trim().length > 0 && <ArticleBody content={intro} />}
                  <div className="mt-8 lg:mt-10">
                    <ResourceSupportCallout />
                  </div>
                  {rest && rest.trim().length > 0 && (
                    <div className="mt-8 lg:mt-10">
                      <ArticleBody content={rest} />
                    </div>
                  )}
                </>
              ) : (
                <>
                  {post.content.trim().length > 0 && <ArticleBody content={post.content} />}
                  <div className="mt-8 lg:mt-10">
                    <ResourceSupportCallout />
                  </div>
                </>
              )}
            </div>
          </div>

          <aside className="mt-12 lg:col-span-4 lg:mt-2">
            <ResourceArticleSidebar />
          </aside>
        </div>

        <div className="mt-16 space-y-16 border-t border-zinc-200/80 pt-16 dark:border-zinc-800/80 lg:mt-20 lg:pt-20">
          <RelatedResources posts={related} />
          <ResourceArticleCta />
          <div className="flex flex-col gap-4 border-t border-zinc-200/70 pt-10 text-sm font-semibold dark:border-zinc-800/70 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
            <Link
              href="/resources"
              className="inline-flex items-center text-accent transition-colors hover:underline dark:text-accent-muted"
            >
              ← Back to all resources
            </Link>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/apply"
                className="text-zinc-700 transition-colors hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white"
              >
                Apply
              </Link>
              <Link
                href="/about"
                className="text-zinc-700 transition-colors hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-zinc-700 transition-colors hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </article>
  );
}
