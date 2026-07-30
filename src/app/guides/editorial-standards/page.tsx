import type { Metadata } from "next";
import Link from "next/link";
import { ResourceBreadcrumb } from "@/components/resources/ResourceBreadcrumb";
import { Section } from "@/components/ui/Section";
import { createPageMetadata } from "@/lib/seo/page-metadata";
import { site } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Editorial Standards",
  description:
    "How Streamer Factory writes and updates public TikTok LIVE guides — accuracy, independence from TikTok, disclosures, and update practices.",
  path: "/guides/editorial-standards",
});

export default function EditorialStandardsPage() {
  return (
    <>
      <Section className="!pt-12 sm:!pt-16">
        <div className="mx-auto max-w-3xl">
          <ResourceBreadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Guides", href: "/guides" },
              { label: "Editorial standards" },
            ]}
          />
          <h1 className="mt-8 text-4xl font-bold tracking-[-0.03em] text-foreground sm:text-5xl">
            Editorial standards
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            These standards apply to public knowledge-center guides on {site.domain}. They exist so creators
            can trust how we explain agencies, networks, training, and growth — without hype or invented
            proof.
          </p>
          <p className="mt-3 text-sm text-muted">Last updated July 29, 2026</p>
        </div>
      </Section>

      <Section variant="muted">
        <div className="mx-auto max-w-3xl space-y-10">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Who we are (and are not)</h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Streamer Factory is an independent TikTok LIVE creator agency and Creator Network operator. We
              are <strong className="text-foreground">not TikTok</strong>, not a TikTok-owned product, and
              not an official TikTok policy source. Platform rules, Creator Network features, and monetization
              products can change — always verify critical policy details in TikTok&apos;s own help centers.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground">What we will and will not claim</h2>
            <ul className="mt-4 space-y-3 text-base leading-relaxed text-muted">
              <li>We describe systems we operate: StreamerU, Battle Hub, rankings, and the join path.</li>
              <li>We do not invent earnings, follower growth, testimonials, or case studies.</li>
              <li>We do not guarantee income, virality, or ranking outcomes.</li>
              <li>We acknowledge when going solo or a different path may be a better fit.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground">Updates and corrections</h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Guide pages show an updated date. When our join process, product tools, or public recommendations
              change, we revise the affected guides. If you spot an error, email{" "}
              <a
                href={`mailto:${site.contactEmail}`}
                className="font-semibold text-accent hover:underline dark:text-accent-muted"
              >
                {site.contactEmail}
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground">Guides vs member training</h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Public guides explain the ecosystem. StreamerU lessons teach execution. Member tools (Battle
              Hub scheduling and related features) unlock after Creator Network membership and website
              verification — we will not blur that boundary to inflate SEO pages.
            </p>
          </div>

          <p>
            <Link
              href="/guides"
              className="font-semibold text-accent underline-offset-2 hover:underline dark:text-accent-muted"
            >
              ← Back to knowledge center
            </Link>
          </p>
        </div>
      </Section>
    </>
  );
}
