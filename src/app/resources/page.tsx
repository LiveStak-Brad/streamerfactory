import type { Metadata } from "next";
import Link from "next/link";
import { FeaturedResource } from "@/components/resources/FeaturedResource";
import { ResourceAllGuidesList } from "@/components/resources/ResourceAllGuidesList";
import { ResourceBreadcrumb } from "@/components/resources/ResourceBreadcrumb";
import { ResourceTopicSections } from "@/components/resources/ResourceTopicSections";
import { Container } from "@/components/ui/Container";
import { RESOURCE_HUB_SECTIONS } from "@/lib/resources/hub-sections";
import { getFeaturedPublishedPost, getPublishedPosts } from "@/lib/resources/queries";
import type { ResourcePostWithCategory } from "@/lib/resources/types";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Creator knowledge center for TikTok LIVE — LIVE basics, battles, monetization, rules, and growth from Streamer Factory.",
};

export default async function ResourcesPage() {
  let featured: ResourcePostWithCategory | null = null;
  let posts: ResourcePostWithCategory[] = [];
  try {
    featured = await getFeaturedPublishedPost();
    posts = await getPublishedPosts();
  } catch {
    posts = [];
  }

  const featuredId = featured?.id;
  const gridPosts = featuredId ? posts.filter((p) => p.id !== featuredId) : posts;

  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[min(560px,75vh)] bg-[radial-gradient(ellipse_85%_60%_at_50%_-8%,rgba(99,102,241,0.2),transparent_68%)] dark:bg-[radial-gradient(ellipse_85%_60%_at_50%_-8%,rgba(99,102,241,0.12),transparent_68%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/35 to-transparent opacity-70"
        aria-hidden
      />

      <Container className="relative max-w-6xl pt-16 sm:pt-20 lg:pt-24">
        <ResourceBreadcrumb items={[{ label: "Home", href: "/" }, { label: "Resources" }]} />

        <div className="mt-8 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent dark:text-accent-muted">
            Creator knowledge center
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-[-0.03em] text-zinc-950 dark:text-zinc-50 sm:text-5xl lg:text-[3.15rem] lg:leading-[1.05]">
            Resources for TikTok LIVE creators
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-xl">
            Practical guides on going live, running battles, monetization, rules, and growth — organized by
            topic so you can learn, connect, schedule, and grow without digging through a generic blog.
          </p>
        </div>

        <Link
          href="/resources/start-here"
          className="group mt-10 block max-w-4xl rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/[0.09] via-surface to-muted-bg/30 p-6 shadow-[0_1px_0_0_rgba(255,255,255,0.5)_inset] transition-[transform,box-shadow,border-color] hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-[0_20px_50px_-28px_rgba(99,102,241,0.35)] dark:from-accent/[0.06] dark:via-zinc-950 dark:to-zinc-950/80 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] sm:p-8"
        >
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent dark:text-accent-muted">
            New to TikTok LIVE or the network?
          </p>
          <h2 className="mt-3 text-xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-2xl">
            Start Here — guided order, same spine we give members
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
            Basics → consistency → battles &amp; calendar → monetization. Read in sequence or jump ahead —
            built for applicants and members, not a random scroll.
          </p>
          <span className="mt-5 inline-flex items-center text-sm font-semibold text-accent group-hover:underline dark:text-accent-muted">
            Open Start Here →
          </span>
        </Link>

        <nav
          className="mt-10 flex flex-wrap gap-2 border-b border-zinc-200/70 pb-6 dark:border-zinc-800/70"
          aria-label="Browse by topic"
        >
          <span className="w-full text-xs font-bold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
            Jump to a topic
          </span>
          {RESOURCE_HUB_SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="inline-flex min-h-[40px] items-center rounded-full border border-zinc-200/90 bg-surface/90 px-4 py-2 text-sm font-semibold text-zinc-800 transition-colors hover:border-accent/40 hover:text-accent dark:border-zinc-700 dark:bg-zinc-950/50 dark:text-zinc-200 dark:hover:border-accent/35 dark:hover:text-accent-muted"
            >
              {s.title}
            </a>
          ))}
        </nav>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <Link
            href="/apply"
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-zinc-950 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-xl dark:bg-white dark:text-zinc-950"
          >
            Apply to Streamer Factory
          </Link>
          <Link
            href="/application-status"
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-zinc-200/90 bg-surface/80 px-6 py-3 text-sm font-semibold text-zinc-900 shadow-sm transition-colors hover:border-accent/35 hover:text-accent dark:border-zinc-700 dark:bg-zinc-950/40 dark:text-zinc-100 dark:hover:border-accent/35 dark:hover:text-accent-muted"
          >
            Application status
          </Link>
          <Link
            href="/about"
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-zinc-200/90 bg-surface/80 px-6 py-3 text-sm font-semibold text-zinc-900 shadow-sm transition-colors hover:border-accent/35 hover:text-accent dark:border-zinc-700 dark:bg-zinc-950/40 dark:text-zinc-100 dark:hover:border-accent/35 dark:hover:text-accent-muted"
          >
            How we support creators
          </Link>
        </div>

        {featured && (
          <div className="mt-14 lg:mt-16">
            <FeaturedResource post={featured} />
          </div>
        )}

        <section
          className="mt-16 border-t border-zinc-200/80 pt-14 dark:border-zinc-800/80 lg:mt-20 lg:pt-16"
          aria-labelledby="topics-heading"
        >
          <div className="max-w-3xl">
            <h2
              id="topics-heading"
              className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50"
            >
              Browse by topic
            </h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Each section pulls from our library — same articles as below, grouped so beginners, battlers,
              and operators find the right guide fast.
            </p>
          </div>

          <div className="mt-12">
            <ResourceTopicSections posts={posts} excludeIds={featuredId ? [featuredId] : []} />
          </div>
        </section>

        <section
          className="mt-16 border-t border-zinc-200/80 pt-14 dark:border-zinc-800/80 lg:mt-20 lg:pt-16"
          aria-labelledby="library-heading"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2
                id="library-heading"
                className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50"
              >
                All guides
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
                Newest first — every published article in one list.
              </p>
            </div>
          </div>

          {gridPosts.length === 0 && posts.length === 0 ? (
            <div className="mt-10 rounded-3xl border border-dashed border-zinc-300/90 bg-gradient-to-b from-muted-bg/60 to-surface/40 px-6 py-20 text-center dark:border-zinc-700 dark:from-zinc-950/50 dark:to-zinc-950/20">
              <p className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                The library is getting stocked
              </p>
              <p className="mx-auto mt-3 max-w-md text-zinc-600 dark:text-zinc-400">
                We&apos;re publishing TikTok LIVE guides for serious creators. Check back soon — or apply and
                we&apos;ll coach you directly while this hub grows.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/apply"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-zinc-950 px-6 py-3 text-sm font-semibold text-white shadow-md transition-[transform,box-shadow] hover:-translate-y-0.5 dark:bg-white dark:text-zinc-950"
                >
                  Apply now
                </Link>
                <Link
                  href="/about"
                  className="text-sm font-semibold text-accent hover:underline dark:text-accent-muted"
                >
                  Learn about the agency →
                </Link>
              </div>
            </div>
          ) : gridPosts.length === 0 && featured ? (
            <p className="mt-8 rounded-2xl border border-zinc-200/80 bg-muted-bg/40 px-5 py-6 text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950/40 dark:text-zinc-400">
              You&apos;re seeing our featured guide above. More posts are on the way — bookmark this page or
              open Start Here for the guided path.
            </p>
          ) : (
            <div className="mt-8">
              <ResourceAllGuidesList posts={gridPosts} />
            </div>
          )}
        </section>

        <section
          className="mt-16 border-t border-zinc-200/80 py-14 dark:border-zinc-800/80 lg:mt-20 lg:py-16"
          aria-labelledby="resources-footer-cta-heading"
        >
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-accent/20 bg-gradient-to-br from-accent/[0.07] via-surface to-surface px-6 py-8 sm:flex-row sm:items-center sm:px-10 dark:from-accent/[0.05] dark:via-zinc-950 dark:to-zinc-950">
            <div>
              <h3
                id="resources-footer-cta-heading"
                className="text-base font-semibold text-zinc-900 dark:text-zinc-100"
              >
                Want support beyond reading?
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                Streamer Factory recruits and develops TikTok LIVE creators with onboarding, coaching, and
                management — so you can grow with a real team, not just a bookmark folder.
              </p>
            </div>
            <Link
              href="/apply"
              className="inline-flex shrink-0 items-center justify-center rounded-xl bg-zinc-950 px-6 py-3 text-sm font-semibold text-white shadow-md transition-[transform,box-shadow] hover:-translate-y-0.5 dark:bg-white dark:text-zinc-950"
            >
              Start your application
            </Link>
          </div>
        </section>
      </Container>
    </div>
  );
}
