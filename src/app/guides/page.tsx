import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ResourceBreadcrumb } from "@/components/resources/ResourceBreadcrumb";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import {
  GUIDE_CATEGORIES,
  getBeginnerPathway,
  getFeaturedGuides,
  getGuidesByCategory,
} from "@/lib/guides";
import { createPageMetadata } from "@/lib/seo/page-metadata";
import { JsonLd, breadcrumbSchema } from "@/lib/seo/json-ld";

export const metadata: Metadata = createPageMetadata({
  title: "TikTok LIVE Knowledge Center",
  description:
    "Streamer Factory knowledge center for TikTok LIVE creators — agencies, creator networks, monetization, battles, training, and growth guides. Public resources that complement StreamerU.",
  path: "/guides",
  keywords: [
    "TikTok LIVE guides",
    "TikTok LIVE agency",
    "TikTok Creator Network",
    "TikTok monetization",
    "creator academy",
    "streamer resources",
  ],
});

export default function GuidesHubPage() {
  const featured = getFeaturedGuides();
  const beginner = getBeginnerPathway();

  return (
    <>
      <JsonLd
        id="guides-breadcrumb"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Guides", path: "/guides" },
        ])}
      />

      <Section className="!pt-12 sm:!pt-16">
        <div className="mx-auto max-w-3xl">
          <ResourceBreadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Guides" },
            ]}
          />
          <h1 className="mt-8 text-4xl font-bold tracking-[-0.03em] text-foreground sm:text-5xl">
            TikTok LIVE knowledge center
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted sm:text-xl">
            Public guides on agencies, creator networks, monetization, battles, and growth — written for
            creators who treat TikTok LIVE like a craft. StreamerU is the training curriculum; these guides
            explain the ecosystem around it.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/apply" variant="primary" className="min-h-[48px] px-8">
              Join Streamer Factory
            </Button>
            <Button href="/streameru" variant="secondary" className="min-h-[48px] px-8">
              Open StreamerU training
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted">
            Streamer Factory is an independent creator agency — not TikTok.{" "}
            <Link href="/guides/editorial-standards" className="font-semibold text-accent hover:underline dark:text-accent-muted">
              Editorial standards
            </Link>
          </p>
        </div>
      </Section>

      <Section variant="muted">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Browse by category
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {GUIDE_CATEGORIES.map((category) => {
              const count = getGuidesByCategory(category.id).length;
              if (count === 0) return null;
              return (
                <li key={category.id}>
                  <Link
                    href={`/guides/category/${category.id}`}
                    className="flex h-full gap-4 rounded-2xl border border-border/80 bg-surface/70 p-5 transition-colors hover:border-accent/40 hover:bg-muted-bg"
                  >
                    <Image
                      src={category.icon}
                      alt=""
                      width={40}
                      height={40}
                      className="mt-0.5 h-10 w-10 shrink-0 opacity-90"
                    />
                    <div>
                      <p className="font-bold text-foreground">{category.name}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{category.description}</p>
                      <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-accent dark:text-accent-muted">
                        {count} guide{count === 1 ? "" : "s"}
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Featured pillars
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {featured.map((guide) => (
              <li key={guide.slug}>
                <Link
                  href={`/guides/${guide.slug}`}
                  className="block h-full rounded-2xl border border-border/80 bg-surface/70 p-5 transition-colors hover:border-accent/40 hover:bg-muted-bg"
                >
                  <p className="text-lg font-bold text-foreground">{guide.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-3">
                    {guide.directAnswer}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section variant="elevated">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Beginner pathway
          </h2>
          <p className="mt-3 text-base text-muted">
            New to TikTok LIVE or evaluating agencies? Start here, then move into StreamerU Start Here.
          </p>
          <ol className="mt-8 space-y-3">
            {beginner.map((guide, index) => (
              <li key={guide.slug}>
                <Link
                  href={`/guides/${guide.slug}`}
                  className="flex items-start gap-4 rounded-xl border border-border/70 bg-surface/60 px-4 py-3 hover:border-accent/40"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                    {index + 1}
                  </span>
                  <span>
                    <span className="font-semibold text-foreground">{guide.title}</span>
                    <span className="mt-1 block text-sm text-muted line-clamp-2">{guide.directAnswer}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
          <p className="mt-6">
            <Link
              href="/streameru/start-here"
              className="font-semibold text-accent underline-offset-2 hover:underline dark:text-accent-muted"
            >
              Continue in StreamerU Start Here →
            </Link>
          </p>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Guides vs StreamerU
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            <strong className="text-foreground">Guides</strong> explain the ecosystem — agencies, networks,
            monetization, and trade-offs. <strong className="text-foreground">StreamerU</strong> is the
            lesson-by-lesson training curriculum with missions. Use both: learn the landscape here, then
            practice with StreamerU.
          </p>
        </div>
      </Section>
    </>
  );
}
