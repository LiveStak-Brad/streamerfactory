import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuidePageView } from "@/components/guides/GuidePageView";
import { getAllGuideSlugs, getGuideBySlug } from "@/lib/guides/pillars";
import { createPageMetadata } from "@/lib/seo/page-metadata";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
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
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  return <GuidePageView guide={guide} />;
}
