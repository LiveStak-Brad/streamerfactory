import Link from "next/link";
import { ResourceBreadcrumb } from "@/components/resources/ResourceBreadcrumb";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { getRelatedGuides, type GuidePillar } from "@/lib/guides/pillars";
import { JsonLd, articleSchema, breadcrumbSchema, faqSchema } from "@/lib/seo/json-ld";
import { TrackedCta } from "@/components/analytics/TrackedCta";

export function GuidePageView({ guide }: { guide: GuidePillar }) {
  const related = getRelatedGuides(guide.slug);
  const path = `/guides/${guide.slug}`;

  return (
    <>
      <JsonLd
        id="guide-article"
        data={articleSchema({
          title: guide.h1,
          description: guide.description,
          path,
        })}
      />
      <JsonLd id="guide-faq" data={faqSchema(guide.faqs)} />
      <JsonLd
        id="guide-breadcrumb"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Guides", path: "/guides" },
          { name: guide.title, path },
        ])}
      />

      <Section className="!pt-10 sm:!pt-14 !pb-10">
        <div className="mx-auto max-w-3xl">
          <ResourceBreadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Guides", href: "/guides" },
              { label: guide.title },
            ]}
          />

          <p className="mt-8 text-xs font-bold uppercase tracking-[0.22em] text-accent dark:text-accent-muted">
            Creator ecosystem guide
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-[-0.03em] text-foreground sm:text-5xl">
            {guide.h1}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted sm:text-xl">{guide.intro}</p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <TrackedCta
              href={guide.ctaPrimary.href}
              external={guide.ctaPrimary.external}
              eventMetadata={{ guide: guide.slug, cta: "primary" }}
              variant="primary"
              className="min-h-[52px] px-8"
            >
              {guide.ctaPrimary.label}
            </TrackedCta>
            <TrackedCta
              href={guide.ctaSecondary.href}
              eventMetadata={{ guide: guide.slug, cta: "secondary" }}
              variant="secondary"
              className="min-h-[52px] px-8"
            >
              {guide.ctaSecondary.label}
            </TrackedCta>
          </div>
        </div>
      </Section>

      {guide.sections.map((section) => (
        <Section key={section.heading} variant="muted" className="!py-12 sm:!py-14">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {section.heading}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">{section.body}</p>
          </div>
        </Section>
      ))}

      {guide.streameruLinks && guide.streameruLinks.length > 0 ? (
        <Section className="!py-12 sm:!py-14">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Related StreamerU lessons
            </h2>
            <ul className="mt-6 space-y-3">
              {guide.streameruLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-semibold text-accent underline-offset-2 hover:underline dark:text-accent-muted"
                  >
                    {link.label} →
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      ) : null}

      <Section variant="elevated" className="!py-12 sm:!py-14">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Frequently asked questions
          </h2>
          <dl className="mt-8 space-y-8">
            {guide.faqs.map((faq) => (
              <div key={faq.question}>
                <dt className="text-lg font-semibold text-foreground">{faq.question}</dt>
                <dd className="mt-2 text-base leading-relaxed text-muted">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {related.length > 0 ? (
        <Section className="!py-12 sm:!py-14">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Keep exploring the creator ecosystem
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/guides/${item.slug}`}
                    className="block rounded-xl border border-border/80 bg-surface/60 px-4 py-3 font-semibold text-foreground transition-colors hover:border-accent/40 hover:bg-muted-bg"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6">
              <Link
                href="/guides"
                className="font-semibold text-accent underline-offset-2 hover:underline dark:text-accent-muted"
              >
                All creator guides →
              </Link>
            </p>
          </div>
        </Section>
      ) : null}

      <Section variant="inverse" className="!py-14 sm:!py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white dark:text-zinc-950">
            Ready to join Streamer Factory?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-zinc-400 dark:text-zinc-600">
            Join the Creator Network on TikTok, then request website access for StreamerU and Battle Hub.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/apply" variant="inverse" className="min-h-[52px] px-8">
              Request website access
            </Button>
            <Button href="/about" variant="secondaryOnDark" className="min-h-[52px] px-8">
              Why Streamer Factory
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
