import type { Metadata } from "next";
import Link from "next/link";
import { StartHerePathCard } from "@/components/resources/StartHerePathCard";
import { ResourceBreadcrumb } from "@/components/resources/ResourceBreadcrumb";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { getStartHereSections } from "@/lib/resources/start-here-resolve";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Start Here",
  description:
    "A guided path for new TikTok LIVE creators — basics, consistency, battles, and monetization. Streamer Factory.",
  openGraph: {
    title: `Start Here | ${site.name}`,
    description: "Guided learning path for TikTok LIVE creators.",
    url: `${site.url}/resources/start-here`,
  },
};

export default async function StartHerePage() {
  const sections = await getStartHereSections();

  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[min(520px,72vh)] bg-[radial-gradient(ellipse_80%_58%_at_50%_-10%,rgba(99,102,241,0.22),transparent_65%)] dark:bg-[radial-gradient(ellipse_80%_58%_at_50%_-10%,rgba(99,102,241,0.12),transparent_65%)]"
        aria-hidden
      />

      <Container className="relative max-w-3xl pt-16 sm:pt-20 lg:pt-24">
        <ResourceBreadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Resources", href: "/resources" },
            { label: "Start Here" },
          ]}
        />

        <p className="mt-8 text-xs font-bold uppercase tracking-[0.24em] text-accent dark:text-accent-muted">
          Guided path
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-[-0.03em] text-zinc-950 dark:text-zinc-50 sm:text-5xl lg:text-[3.1rem] lg:leading-[1.06]">
          Start Here
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-xl">
          A curated order for new and newly approved creators: fundamentals first, then rhythm, then network
          battles, then sustainable monetization. Read in sequence or jump ahead — but this path is the
          fastest way to feel oriented on TikTok LIVE.
        </p>

        <div className="mt-10 rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/[0.06] via-surface to-surface p-6 dark:from-accent/[0.04] dark:via-zinc-950 dark:to-zinc-950 sm:p-8">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            What this path covers
          </h2>
          <p className="mt-3 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            You&apos;ll move from technical basics and consistency into how Streamer Factory coordinates{" "}
            <strong className="font-semibold text-zinc-900 dark:text-zinc-100">battles and calendars</strong>,
            then into goals and gifts without burning out. It&apos;s the same spine we point members to after
            onboarding — not a course, just a clear sequence.
          </p>
        </div>

        <div className="mt-16 space-y-16">
          {sections.map((section) => (
            <section key={section.id} aria-labelledby={`start-here-${section.id}`}>
              <div className="border-b border-zinc-200/80 pb-6 dark:border-zinc-800/80">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent dark:text-accent-muted">
                  {section.stepLabel}
                </p>
                <h2
                  id={`start-here-${section.id}`}
                  className="mt-2 text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50"
                >
                  {section.title}
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {section.intro}
                </p>
              </div>
              <div className="mt-8 space-y-6">
                {section.items.map((item, idx) => (
                  <StartHerePathCard key={`${section.id}-${idx}`} item={item} />
                ))}
              </div>
            </section>
          ))}
        </div>

        <section
          className="mt-20 border-t border-zinc-200/80 pt-14 dark:border-zinc-800/80"
          aria-labelledby="start-here-next"
        >
          <h2 id="start-here-next" className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            Next steps
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            When you&apos;re ready to coordinate with the network, use Battle Hub. The full library has deeper
            dives on rules, battle weeks, and growth — including{" "}
            <Link
              href="/resources/what-to-expect-when-you-apply"
              className="font-semibold text-accent hover:underline dark:text-accent-muted"
            >
              what to expect from the application process
            </Link>{" "}
            if you are not a member yet.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href="/battle-hub" variant="primary">
              Battle Hub
            </Button>
            <Button href="/battle-hub/calendar" variant="secondary">
              Network calendar
            </Button>
            <Button href="/resources#battles" variant="secondary">
              Battle strategy guides
            </Button>
            <Button href="/resources" variant="secondary">
              All resources
            </Button>
            <Link
              href="/welcome"
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl px-4 text-sm font-semibold text-accent hover:underline dark:text-accent-muted"
            >
              Member onboarding checklist →
            </Link>
          </div>
        </section>
      </Container>
    </div>
  );
}
