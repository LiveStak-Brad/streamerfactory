import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/resources/ArticleBody";
import { ResourceArticleTraining } from "@/components/resources/ResourceArticleTraining";
import { RelatedResources } from "@/components/resources/RelatedResources";
import { ResourceArticleCta } from "@/components/resources/ResourceArticleCta";
import { ResourceBreadcrumb } from "@/components/resources/ResourceBreadcrumb";
import { ResourceMeta } from "@/components/resources/ResourceMeta";
import { ResourceSupportCallout } from "@/components/resources/ResourceSupportCallout";
import { LessonQuickLinks } from "@/components/resources/LessonQuickLinks";
import { StartHereArticleHint } from "@/components/resources/StartHereArticleHint";
import { LessonMission } from "@/components/resources/LessonMission";
import { CurriculumLessonHeader } from "@/components/resources/CurriculumLessonHeader";
import { LessonNavigation } from "@/components/resources/LessonNavigation";
import { RecordLessonVisit } from "@/components/guidance/RecordLessonVisit";
import { splitIntroAndBody } from "@/lib/resources/content";
import { parseTrainingSectionsJson } from "@/lib/resources/training-sections";
import { getCurriculumRelatedPosts, getPublishedPostBySlug } from "@/lib/resources/queries";
import { isStartHereArticleSlug } from "@/lib/resources/start-here";
import { getMissionForLessonSlug } from "@/lib/resources/training-missions";
import { getCurriculumLesson, getCurriculumNeighbors } from "@/lib/resources/curriculum";
import { site } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) return { title: "Lesson" };
  const curriculum = getCurriculumLesson(slug);
  const title = curriculum?.title ?? post.title;
  return {
    title,
    description: post.excerpt ?? title,
    openGraph: {
      title: `${title} | ${site.name}`,
      description: post.excerpt ?? undefined,
      url: `${site.url}/streameru/${post.slug}`,
    },
  };
}

export default async function ResourcePostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) notFound();

  const related = await getCurriculumRelatedPosts(slug, post.training_track ?? null);
  const mission = getMissionForLessonSlug(slug);
  const curriculum = getCurriculumLesson(slug);
  const neighbors = getCurriculumNeighbors(slug);
  const displayTitle = curriculum?.title ?? post.title;
  const metaTrack = curriculum?.trackId ?? post.training_track ?? "beginner";
  const nextLessonForMission =
    curriculum && neighbors.next
      ? (() => {
          const n = getCurriculumLesson(neighbors.next.slug);
          return n ? { slug: n.slug, title: n.title, globalOrder: n.globalOrder } : null;
        })()
      : null;

  const cat = post.resource_categories;
  const { intro, rest } = splitIntroAndBody(post.content);
  const hasSplit = rest !== null;

  return (
    <article className="relative pb-20 pt-4 sm:pb-28 sm:pt-2">
      <RecordLessonVisit slug={slug} />
      <div className="max-w-3xl">
        <ResourceBreadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "StreamerU", href: "/streameru" },
            { label: displayTitle },
          ]}
        />

        {isStartHereArticleSlug(post.slug) ? (
          <div className="mt-6">
            <StartHereArticleHint />
          </div>
        ) : null}

        <header className="mt-8 border-b border-zinc-200/80 pb-8 dark:border-zinc-800/80">
          {curriculum ? (
            <div className="mb-6">
              <CurriculumLessonHeader lesson={curriculum} />
            </div>
          ) : null}
          <ResourceMeta
            publishedAt={post.published_at}
            category={cat ?? null}
            trainingTrack={metaTrack}
            difficulty={post.difficulty ?? null}
            omitLessonContext={Boolean(curriculum)}
          />
          <h1 className="mt-6 text-3xl font-bold tracking-[-0.03em] text-zinc-950 dark:text-zinc-50 sm:text-4xl sm:leading-[1.08]">
            {displayTitle}
          </h1>
          {post.excerpt && (
            <p className="mt-5 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              {post.excerpt}
            </p>
          )}
          {curriculum && neighbors.next ? (
            <div className="mt-8 max-w-xl">
              <Link
                href={`/streameru/${neighbors.next.slug}`}
                className="inline-flex min-h-[48px] w-full items-center justify-center rounded-xl bg-zinc-950 px-6 py-3 text-sm font-semibold text-white shadow-md transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-lg dark:bg-white dark:text-zinc-950 sm:w-auto"
              >
                Next lesson: {neighbors.next.title} →
              </Link>
            </div>
          ) : null}
        </header>

        {post.cover_image_url && (
          <div className="mt-10 overflow-hidden rounded-2xl border border-zinc-200/80 bg-zinc-100 ring-1 ring-black/[0.04] dark:border-zinc-800 dark:bg-zinc-900 dark:ring-white/[0.06]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.cover_image_url} alt="" className="h-auto w-full object-cover" />
          </div>
        )}

        <section className="mt-12" aria-labelledby="learning-heading">
          <h2
            id="learning-heading"
            className="text-xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50"
          >
            What you&apos;ll learn
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Read this section before your mission — every lesson pairs study with a real TikTok LIVE.
          </p>
          <div className="mt-8 space-y-12 lg:space-y-14">
            <ResourceArticleTraining sections={parseTrainingSectionsJson(post.training_sections) ?? undefined} />
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
        </section>

        {mission ? (
          <div className="mt-14">
            <LessonMission lessonSlug={slug} mission={mission} nextLesson={nextLessonForMission} />
          </div>
        ) : null}

        {curriculum ? (
          <div className="mt-14">
            <LessonNavigation prev={neighbors.prev} next={neighbors.next} />
          </div>
        ) : null}

        <div className="mt-14 space-y-12 border-t border-zinc-200/80 pt-12 dark:border-zinc-800/80">
          <LessonQuickLinks />
          <RelatedResources posts={related} />
          <ResourceArticleCta />
          <div className="flex flex-col gap-4 border-t border-zinc-200/70 pt-8 text-sm font-semibold dark:border-zinc-800/70 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
            <Link
              href="/streameru"
              className="inline-flex items-center text-accent transition-colors hover:underline dark:text-accent-muted"
            >
              ← StreamerU home
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
