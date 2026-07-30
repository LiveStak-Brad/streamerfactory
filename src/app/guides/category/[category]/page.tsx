import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ResourceBreadcrumb } from "@/components/resources/ResourceBreadcrumb";
import { Section } from "@/components/ui/Section";
import {
  GUIDE_CATEGORIES,
  getCategory,
  getGuidesByCategory,
  type GuideCategoryId,
} from "@/lib/guides";
import { createPageMetadata } from "@/lib/seo/page-metadata";
import { JsonLd, breadcrumbSchema } from "@/lib/seo/json-ld";

type Props = {
  params: Promise<{ category: string }>;
};

export function generateStaticParams() {
  return GUIDE_CATEGORIES.map((c) => ({ category: c.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: categoryId } = await params;
  const category = GUIDE_CATEGORIES.find((c) => c.id === categoryId);
  if (!category) return { title: "Category" };

  return createPageMetadata({
    title: `${category.name} Guides`,
    description: category.description,
    path: `/guides/category/${category.id}`,
    keywords: [category.name, "TikTok LIVE", "Streamer Factory guides"],
  });
}

export default async function GuideCategoryPage({ params }: Props) {
  const { category: categoryId } = await params;
  const exists = GUIDE_CATEGORIES.some((c) => c.id === categoryId);
  if (!exists) notFound();

  const category = getCategory(categoryId as GuideCategoryId);
  const guides = getGuidesByCategory(category.id);

  return (
    <>
      <JsonLd
        id="category-breadcrumb"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Guides", path: "/guides" },
          { name: category.name, path: `/guides/category/${category.id}` },
        ])}
      />

      <Section className="!pt-12 sm:!pt-16">
        <div className="mx-auto max-w-3xl">
          <ResourceBreadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Guides", href: "/guides" },
              { label: category.name },
            ]}
          />
          <h1 className="mt-8 text-4xl font-bold tracking-[-0.03em] text-foreground sm:text-5xl">
            {category.name}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">{category.description}</p>
        </div>
      </Section>

      <Section variant="muted">
        <div className="mx-auto max-w-3xl">
          <ul className="space-y-4">
            {guides.map((guide) => (
              <li key={guide.slug}>
                <Link
                  href={`/guides/${guide.slug}`}
                  className="block rounded-2xl border border-border/80 bg-surface/70 p-5 transition-colors hover:border-accent/40"
                >
                  <p className="text-lg font-bold text-foreground">{guide.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{guide.directAnswer}</p>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8">
            <Link
              href="/guides"
              className="font-semibold text-accent underline-offset-2 hover:underline dark:text-accent-muted"
            >
              ← All categories
            </Link>
          </p>
        </div>
      </Section>
    </>
  );
}
