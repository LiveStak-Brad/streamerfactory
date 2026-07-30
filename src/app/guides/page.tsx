import type { Metadata } from "next";
import Link from "next/link";
import { ResourceBreadcrumb } from "@/components/resources/ResourceBreadcrumb";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { GUIDE_PILLARS } from "@/lib/guides/pillars";
import { createPageMetadata } from "@/lib/seo/page-metadata";
import { JsonLd, breadcrumbSchema } from "@/lib/seo/json-ld";

export const metadata: Metadata = createPageMetadata({
  title: "Creator Guides",
  description:
    "Streamer Factory creator ecosystem guides — TikTok LIVE agency, Creator Network, monetization, growth tips, and how to join.",
  path: "/guides",
  keywords: [
    "TikTok LIVE agency",
    "TikTok Creator Network",
    "TikTok monetization",
    "creator academy",
    "streamer resources",
  ],
});

const FEATURED = [
  "tiktok-live-agency",
  "tiktok-creator-network",
  "how-to-join-tiktok-live-agency",
  "tiktok-monetization-guide",
  "creator-academy",
  "tiktok-live-tips",
] as const;

export default function GuidesHubPage() {
  const featured = FEATURED.map((slug) => GUIDE_PILLARS.find((g) => g.slug === slug)).filter(
    Boolean,
  ) as typeof GUIDE_PILLARS;

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
            Creator ecosystem guides
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted sm:text-xl">
            Pillar pages for TikTok LIVE agencies, creator networks, monetization, and growth — interlinked
            with StreamerU training and the Streamer Factory join path.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/apply" variant="primary" className="min-h-[48px] px-8">
              Join Streamer Factory
            </Button>
            <Button href="/streameru" variant="secondary" className="min-h-[48px] px-8">
              Open StreamerU
            </Button>
          </div>
        </div>
      </Section>

      <Section variant="muted">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Start with these pillars
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
                    {guide.description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            All guides
          </h2>
          <ul className="mt-8 columns-1 gap-x-10 sm:columns-2">
            {GUIDE_PILLARS.map((guide) => (
              <li key={guide.slug} className="mb-3 break-inside-avoid">
                <Link
                  href={`/guides/${guide.slug}`}
                  className="font-semibold text-accent underline-offset-2 hover:underline dark:text-accent-muted"
                >
                  {guide.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
