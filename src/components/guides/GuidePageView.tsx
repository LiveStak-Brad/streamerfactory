import Image from "next/image";
import Link from "next/link";
import { TrackedCta } from "@/components/analytics/TrackedCta";
import { ResourceBreadcrumb } from "@/components/resources/ResourceBreadcrumb";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { getCategory } from "@/lib/guides/categories";
import { getRelatedGuides } from "@/lib/guides";
import type { GuideDocument } from "@/lib/guides/types";
import {
  JsonLd,
  articleSchema,
  breadcrumbSchema,
  faqSchema,
  howToSchema,
} from "@/lib/seo/json-ld";

function formatDisplayDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function GuidePageView({ guide }: { guide: GuideDocument }) {
  const related = getRelatedGuides(guide.slug);
  const path = `/guides/${guide.slug}`;
  const category = getCategory(guide.categoryId);

  return (
    <>
      <JsonLd
        id="guide-article"
        data={articleSchema({
          title: guide.h1,
          description: guide.description,
          path,
          datePublished: guide.datePublished,
          dateModified: guide.dateModified,
        })}
      />
      <JsonLd id="guide-faq" data={faqSchema(guide.faqs)} />
      <JsonLd
        id="guide-breadcrumb"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Guides", path: "/guides" },
          { name: category.name, path: `/guides/category/${guide.categoryId}` },
          { name: guide.title, path },
        ])}
      />
      {guide.processSteps && guide.processSteps.length > 0 ? (
        <JsonLd
          id="guide-howto"
          data={howToSchema({
            name: guide.h1,
            description: guide.directAnswer,
            steps: guide.processSteps.map((s) => ({ name: s.title, text: s.body })),
          })}
        />
      ) : null}

      <Section className="!pt-10 sm:!pt-14 !pb-10">
        <div className="mx-auto max-w-3xl">
          <ResourceBreadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Guides", href: "/guides" },
              { label: category.name, href: `/guides/category/${guide.categoryId}` },
              { label: guide.title },
            ]}
          />

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent dark:text-accent-muted">
              {category.name}
            </p>
            <span className="text-xs text-muted">
              Updated {formatDisplayDate(guide.dateModified)}
            </span>
          </div>

          <h1 className="mt-3 text-4xl font-bold tracking-[-0.03em] text-foreground sm:text-5xl">
            {guide.h1}
          </h1>

          <p className="mt-6 rounded-2xl border border-border/70 bg-muted-bg/60 px-5 py-4 text-base font-medium leading-relaxed text-foreground sm:text-lg">
            {guide.directAnswer}
          </p>

          <p className="mt-6 text-lg leading-relaxed text-muted sm:text-xl">{guide.intro}</p>

          {guide.icon ? (
            <div className="mt-8 overflow-hidden rounded-2xl border border-border/70 bg-surface/80 p-6">
              <Image
                src={guide.icon}
                alt=""
                width={64}
                height={64}
                className="h-12 w-12 opacity-90"
              />
              <p className="mt-3 text-sm text-muted">
                Part of the Streamer Factory knowledge center — public guides that complement StreamerU
                training.
              </p>
            </div>
          ) : null}

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <TrackedCta
              href={guide.ctaPrimary.href}
              external={guide.ctaPrimary.external}
              eventMetadata={{ guide: guide.slug, cta: "primary", location: "guide_hero" }}
              variant="primary"
              className="min-h-[52px] px-8"
            >
              {guide.ctaPrimary.label}
            </TrackedCta>
            <TrackedCta
              href={guide.ctaSecondary.href}
              eventMetadata={{ guide: guide.slug, cta: "secondary", location: "guide_hero" }}
              variant="secondary"
              className="min-h-[52px] px-8"
            >
              {guide.ctaSecondary.label}
            </TrackedCta>
          </div>
        </div>
      </Section>

      {guide.keyTakeaways.length > 0 ? (
        <Section variant="elevated" className="!py-12 sm:!py-14">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Key takeaways
            </h2>
            <ul className="mt-6 space-y-3">
              {guide.keyTakeaways.map((item) => (
                <li key={item} className="flex gap-3 text-base leading-relaxed text-muted">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      ) : null}

      {(guide.whoFor || guide.whoNotFor) && (
        <Section className="!py-12 sm:!py-14">
          <div className="mx-auto grid max-w-3xl gap-8 sm:grid-cols-2">
            {guide.whoFor ? (
              <div>
                <h2 className="text-xl font-bold tracking-tight text-foreground">Who this is for</h2>
                <ul className="mt-4 space-y-2">
                  {guide.whoFor.map((item) => (
                    <li key={item} className="text-sm leading-relaxed text-muted">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {guide.whoNotFor ? (
              <div>
                <h2 className="text-xl font-bold tracking-tight text-foreground">Who may not need this</h2>
                <ul className="mt-4 space-y-2">
                  {guide.whoNotFor.map((item) => (
                    <li key={item} className="text-sm leading-relaxed text-muted">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </Section>
      )}

      {guide.comparison ? (
        <Section variant="muted" className="!py-12 sm:!py-14">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Side-by-side comparison
            </h2>
            <div className="mt-6 overflow-x-auto rounded-2xl border border-border/80">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-muted-bg/80">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-foreground">Dimension</th>
                    <th className="px-4 py-3 font-semibold text-foreground">
                      {guide.comparison.optionALabel}
                    </th>
                    <th className="px-4 py-3 font-semibold text-foreground">
                      {guide.comparison.optionBLabel}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {guide.comparison.rows.map((row) => (
                    <tr key={row.dimension} className="border-t border-border/70">
                      <td className="px-4 py-3 font-medium text-foreground">{row.dimension}</td>
                      <td className="px-4 py-3 text-muted">{row.optionA}</td>
                      <td className="px-4 py-3 text-muted">{row.optionB}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <h3 className="mt-10 text-xl font-bold text-foreground">Recommendation by creator type</h3>
            <ul className="mt-4 space-y-4">
              {guide.comparison.verdictByType.map((v) => (
                <li key={v.creatorType} className="rounded-xl border border-border/70 bg-surface/60 px-4 py-3">
                  <p className="font-semibold text-foreground">{v.creatorType}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{v.recommendation}</p>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      ) : null}

      {guide.processSteps && guide.processSteps.length > 0 ? (
        <Section variant="muted" className="!py-12 sm:!py-14">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Step-by-step process
            </h2>
            <ol className="mt-8 space-y-6">
              {guide.processSteps.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-foreground">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                    <p className="mt-2 text-base leading-relaxed text-muted">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Section>
      ) : null}

      {guide.sections.map((section) => (
        <Section key={section.heading} className="!py-12 sm:!py-14">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {section.heading}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">{section.body}</p>
            {section.bullets && section.bullets.length > 0 ? (
              <ul className="mt-5 space-y-2">
                {section.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-base text-muted">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            ) : null}
            {section.subsections?.map((sub) => (
              <div key={sub.heading} className="mt-8">
                <h3 className="text-xl font-semibold text-foreground">{sub.heading}</h3>
                <p className="mt-2 text-base leading-relaxed text-muted">{sub.body}</p>
              </div>
            ))}
          </div>
        </Section>
      ))}

      {guide.commonMistakes && guide.commonMistakes.length > 0 ? (
        <Section variant="muted" className="!py-12 sm:!py-14">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Common mistakes
            </h2>
            <ul className="mt-6 space-y-3">
              {guide.commonMistakes.map((m) => (
                <li key={m} className="rounded-xl border border-border/70 bg-surface/50 px-4 py-3 text-muted">
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </Section>
      ) : null}

      {(guide.streameruLinks?.length || guide.featureLinks?.length) ? (
        <Section className="!py-12 sm:!py-14">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Related training and tools
            </h2>
            {guide.streameruLinks && guide.streameruLinks.length > 0 ? (
              <div className="mt-6">
                <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-muted">
                  StreamerU lessons
                </h3>
                <ul className="mt-3 space-y-2">
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
            ) : null}
            {guide.featureLinks && guide.featureLinks.length > 0 ? (
              <div className="mt-8">
                <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-muted">
                  Platform pages
                </h3>
                <ul className="mt-3 flex flex-wrap gap-3">
                  {guide.featureLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="inline-flex rounded-lg border border-border/80 bg-surface/70 px-3 py-2 text-sm font-semibold text-foreground hover:border-accent/40"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
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
              Related guides
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/guides/${item.slug}`}
                    className="block rounded-xl border border-border/80 bg-surface/60 px-4 py-3 transition-colors hover:border-accent/40 hover:bg-muted-bg"
                  >
                    <span className="font-semibold text-foreground">{item.title}</span>
                    <span className="mt-1 block text-xs text-muted line-clamp-2">
                      {item.directAnswer}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6">
              <Link
                href="/guides"
                className="font-semibold text-accent underline-offset-2 hover:underline dark:text-accent-muted"
              >
                Knowledge center home →
              </Link>
            </p>
          </div>
        </Section>
      ) : null}

      <Section variant="inverse" className="!py-14 sm:!py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white dark:text-zinc-950">
            Ready for the next step?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-zinc-400 dark:text-zinc-600">
            Streamer Factory is an independent TikTok LIVE creator agency — not TikTok. Join the Creator
            Network on TikTok, then request website access for StreamerU and Battle Hub.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <TrackedCta
              href="/apply"
              variant="inverse"
              className="min-h-[52px] px-8"
              eventMetadata={{ guide: guide.slug, cta: "footer_apply", location: "guide_footer" }}
            >
              Request website access
            </TrackedCta>
            <Button href="/about" variant="secondaryOnDark" className="min-h-[52px] px-8">
              About Streamer Factory
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
