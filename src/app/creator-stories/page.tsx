import type { Metadata } from "next";
import Link from "next/link";
import { CreatorStoryView } from "@/components/guides/CreatorStoryView";
import { ResourceBreadcrumb } from "@/components/resources/ResourceBreadcrumb";
import { Section } from "@/components/ui/Section";
import { getPublishedCreatorStories } from "@/lib/guides/creator-stories";
import { createPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Creator Stories",
  description:
    "Verified Streamer Factory creator stories — published only with permission and public-safe details. No fabricated case studies.",
  path: "/creator-stories",
});

export default function CreatorStoriesIndexPage() {
  const stories = getPublishedCreatorStories();

  return (
    <>
      <Section className="!pt-12 sm:!pt-16">
        <div className="mx-auto max-w-3xl">
          <ResourceBreadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Creator stories" },
            ]}
          />
          <h1 className="mt-8 text-4xl font-bold tracking-[-0.03em] text-foreground sm:text-5xl">
            Creator stories
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            Real member stories will appear here only after creators approve what we publish. We do not invent
            earnings, growth numbers, or testimonials for SEO.
          </p>
        </div>
      </Section>

      {stories.length === 0 ? (
        <Section variant="muted">
          <div className="mx-auto max-w-3xl rounded-2xl border border-dashed border-border/80 px-6 py-12 text-center">
            <h2 className="text-xl font-bold text-foreground">Awaiting verified creator content</h2>
            <p className="mt-3 text-base leading-relaxed text-muted">
              The story template is ready (timeline, training, battles, interviews, before/after). Publication
              is blocked until we have permissioned, public-safe source material.
            </p>
            <p className="mt-6">
              <Link
                href="/guides"
                className="font-semibold text-accent underline-offset-2 hover:underline dark:text-accent-muted"
              >
                Explore knowledge center guides →
              </Link>
            </p>
            <p className="mt-3">
              <Link
                href="/members"
                className="font-semibold text-accent underline-offset-2 hover:underline dark:text-accent-muted"
              >
                View public network members →
              </Link>
            </p>
          </div>
        </Section>
      ) : (
        <Section variant="muted">
          <div className="mx-auto max-w-3xl space-y-16">
            {stories.map((story) => (
              <CreatorStoryView key={story.slug} story={story} />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
