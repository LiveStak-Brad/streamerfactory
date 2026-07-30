import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { GuidePageView } from "@/components/guides/GuidePageView";
import { RecordGuideRead } from "@/components/guides/RecordGuideRead";
import {
  getAllGuideSlugs,
  getGuideBySlug,
  GUIDE_REDIRECTS,
} from "@/lib/guides";
import { createPageMetadata } from "@/lib/seo/page-metadata";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (GUIDE_REDIRECTS[slug]) {
    return { title: "Guide" };
  }
  const guide = getGuideBySlug(slug);
  if (!guide) return { title: "Guide" };

  return createPageMetadata({
    title: guide.title,
    description: guide.description,
    path: `/guides/${guide.slug}`,
    keywords: guide.keywords,
    ogType: "article",
  });
}

export default async function GuideSlugPage({ params }: Props) {
  const { slug } = await params;

  const redirectTo = GUIDE_REDIRECTS[slug];
  if (redirectTo) {
    redirect(`/guides/${redirectTo}`);
  }

  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  return (
    <>
      <RecordGuideRead slug={guide.slug} />
      <GuidePageView guide={guide} />
    </>
  );
}
