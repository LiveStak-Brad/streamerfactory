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
import { LessonFaq } from "@/components/resources/LessonFaq";
import { LessonAuthorityLinks } from "@/components/resources/LessonAuthorityLinks";
import { StartHereArticleHint } from "@/components/resources/StartHereArticleHint";
import { LessonMission } from "@/components/resources/LessonMission";
import { CurriculumLessonHeader } from "@/components/resources/CurriculumLessonHeader";
import { LessonNavigation } from "@/components/resources/LessonNavigation";
import { LessonDownloadCards } from "@/components/resources/LessonDownloadCards";
import { LessonEstimateChips } from "@/components/resources/LessonEstimateChips";
import { StreamerUCertificatePanel } from "@/components/streameru/StreamerUCertificatePanel";
import { RecordLessonVisit } from "@/components/guidance/RecordLessonVisit";
import { RelatedGuidesForLesson } from "@/components/guides/RelatedGuidesForLesson";
import { FOUNDER } from "@/lib/founder/content";
import { splitIntroAndBody } from "@/lib/resources/content";
import {
  CURRICULUM,
  curriculumByProgram,
  getCurriculumLesson,
  getCurriculumNeighbors,
} from "@/lib/resources/curriculum";
import { lessonDifficulty } from "@/lib/resources/difficulty-styles";
import { getLessonEstimate } from "@/lib/resources/lesson-estimate";
import { buildLessonDownloads } from "@/lib/resources/lesson-downloads";
import { getLessonSeo, getLessonSeoKeywords } from "@/lib/resources/lesson-seo";
import { parseTrainingSectionsJson } from "@/lib/resources/training-sections";
import { getCurriculumRelatedPosts, getPublishedPostBySlug } from "@/lib/resources/queries";
import { isStartHereArticleSlug } from "@/lib/resources/start-here";
import { getMissionForLessonSlug } from "@/lib/resources/training-missions";
import { createPageMetadata } from "@/lib/seo/page-metadata";
import {
  JsonLd,
  articleSchema,
  breadcrumbSchema,
  faqSchema,
  howToSchema,
} from "@/lib/seo/json-ld";

type Props = {
  params: Promise<{ slug: string }>;
};

function semesterIndexForProgram(programName: string): number {
  const programs = curriculumByProgram();
  const idx = programs.findIndex((p) => p.programName === programName);
  return idx >= 0 ? idx + 1 : 1;
}

export function generateStaticParams() {
  return CURRICULUM.map((lesson) => ({ slug: lesson.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) return { title: "Lesson" };

  const curriculum = getCurriculumLesson(slug);
  const seo = getLessonSeo(slug);
  const title = seo?.metaTitle ?? curriculum?.title ?? post.title;
  const description = seo?.metaDescription ?? post.excerpt ?? title;
  const keywords = seo ? getLessonSeoKeywords(seo) : undefined;

  return createPageMetadata({
    title,
    description,
    path: `/streameru/${post.slug}`,
    keywords,
    ogType: "article",
    ogImage: post.cover_image_url ?? undefined,
  });
}

export default async function ResourcePostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) notFound();

  const related = await getCurriculumRelatedPosts(slug, post.training_track ?? null);
  const mission = getMissionForLessonSlug(slug);
  const curriculum = getCurriculumLesson(slug);
  const neighbors = getCurriculumNeighbors(slug);
  const seo = getLessonSeo(slug);
  const displayTitle = curriculum?.title ?? post.title;
  const description = seo?.metaDescription ?? post.excerpt ?? displayTitle;
  const metaTrack = curriculum?.trackId ?? post.training_track ?? "beginner";
  const estimate = getLessonEstimate(slug, { content: post.content, mission });
  const trainingSections = parseTrainingSectionsJson(post.training_sections);
  const downloads = buildLessonDownloads({
    lessonTitle: displayTitle,
    content: post.content,
    sections: trainingSections,
    mission,
  });
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
  const keywords = seo ? getLessonSeoKeywords(seo) : undefined;
  const showFaqs = Boolean(seo && seo.faqs.length > 0);
  const howToSteps =
    mission?.mission_steps.map((step, index) => ({
      name: `Step ${index + 1}`,
      text: step,
    })) ?? [];
  const showHowTo = Boolean(mission && howToSteps.length > 0);

  return (
    <article className="relative pb-20 pt-4 sm:pb-28 sm:pt-2">
      <JsonLd
        id="lesson-article"
        data={articleSchema({
          title: displayTitle,
          description,
          path: `/streameru/${post.slug}`,
          datePublished: post.published_at ?? undefined,
          author: {
            name: FOUNDER.name,
            path: "/founder",
            jobTitle: FOUNDER.title,
          },
          keywords,
        })}
      />
      <JsonLd
        id="lesson-breadcrumb"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "StreamerU", path: "/streameru" },
          { name: displayTitle, path: `/streameru/${post.slug}` },
        ])}
      />
      {showFaqs ? <JsonLd id="lesson-faq" data={faqSchema(seo!.faqs)} /> : null}
      {showHowTo ? (
        <JsonLd
          id="lesson-howto"
          data={howToSchema({
            name: mission!.mission_title,
            description: mission!.mission_description,
            steps: howToSteps,
          })}
        />
      ) : null}
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

        <header className="mt-8 border-b border-zinc-200/80 pb-10 dark:border-zinc-800/80">
          {curriculum ? (
            <div className="mb-8">
              <CurriculumLessonHeader
                lesson={curriculum}
                semesterIndex={semesterIndexForProgram(curriculum.programName)}
                estimate={estimate}
                difficulty={
                  lessonDifficulty(curriculum.trackId, curriculum.slug) ??
                  post.difficulty ??
                  null
                }
              />
            </div>
          ) : null}
          <ResourceMeta
            publishedAt={post.published_at}
            category={cat ?? null}
            trainingTrack={metaTrack}
            difficulty={curriculum ? null : post.difficulty ?? null}
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
          {!curriculum ? (
            <div className="mt-5">
              <LessonEstimateChips estimate={estimate} />
            </div>
          ) : null}
        </header>

        {post.cover_image_url && (
          <div className="mt-10 overflow-hidden rounded-2xl border border-zinc-200/80 bg-zinc-100 ring-1 ring-black/[0.04] dark:border-zinc-800 dark:bg-zinc-900 dark:ring-white/[0.06]">
            {/* eslint-disable-next-line @next/next/no-img-element -- remote CMS covers; next/image host allowlist may not cover all sources */}
            <img
              src={post.cover_image_url}
              alt={`Cover image for ${displayTitle}`}
              className="h-auto w-full object-cover"
            />
          </div>
        )}

        <section className="mt-12" aria-labelledby="learning-heading">
          <div className="mb-8">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-accent dark:text-accent-muted">
              Study
            </p>
            <h2
              id="learning-heading"
              className="mt-1 text-xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50"
            >
              What you&apos;ll learn
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Read this section before your Live Exam — every lesson pairs study with a real TikTok
              LIVE.
            </p>
          </div>
          <div className="space-y-12 lg:space-y-14">
            <ResourceArticleTraining
              sections={trainingSections ?? undefined}
              omitActionChecklist
            />
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

        {downloads.length > 0 ? (
          <div className="mt-14">
            <LessonDownloadCards items={downloads} />
          </div>
        ) : null}

        {mission ? (
          <div className="mt-14">
            <LessonMission lessonSlug={slug} mission={mission} nextLesson={nextLessonForMission} />
          </div>
        ) : null}

        {showFaqs ? <LessonFaq faqs={seo!.faqs} /> : null}

        {curriculum ? (
          <div className="mt-14">
            <LessonNavigation prev={neighbors.prev} next={neighbors.next} />
          </div>
        ) : null}

        <div className="mt-14 space-y-12 border-t border-zinc-200/80 pt-12 dark:border-zinc-800/80">
          <RelatedGuidesForLesson lessonSlug={slug} />
          {seo ? <LessonAuthorityLinks links={seo.internalLinks} /> : null}
          <LessonQuickLinks />
          <RelatedResources posts={related} currentSlug={slug} />
          <StreamerUCertificatePanel variant="compact" />
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
