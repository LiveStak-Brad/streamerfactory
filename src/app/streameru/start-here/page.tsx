import type { Metadata } from "next";
import Link from "next/link";
import { StartHerePathCard } from "@/components/resources/StartHerePathCard";
import { ResourceBreadcrumb } from "@/components/resources/ResourceBreadcrumb";
import { Button } from "@/components/ui/Button";
import { getStartHereSections } from "@/lib/resources/start-here-resolve";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Start your training",
  description:
    "Start StreamerU today — the first four lessons of Beginner Foundations. Membership is free. StreamerU is included.",
  openGraph: {
    title: `Start your training | ${site.name}`,
    description:
      "First four lessons of StreamerU Program 1 — free live streaming academy inside a free creator network.",
    url: `${site.url}/streameru/start-here`,
  },
};

export default async function StartHerePage() {
  const sections = await getStartHereSections();

  return (
    <div className="max-w-3xl pb-12 pt-2">
        <ResourceBreadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "StreamerU", href: "/streameru" },
            { label: "Start your training" },
          ]}
        />

        <p className="mt-8 text-xs font-bold uppercase tracking-[0.24em] text-accent dark:text-accent-muted">
          StreamerU · Program 1 · lessons 1–4
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-[-0.03em] text-zinc-950 dark:text-zinc-50 sm:text-5xl lg:text-[3.1rem] lg:leading-[1.06]">
          Start your training
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-xl">
          This is the opening sprint of{" "}
          <strong className="font-semibold text-zinc-800 dark:text-zinc-200">Program 1 · Beginner Foundations</strong>{" "}
          — setup, then essential safety, before you become a regular LIVE streamer. Lessons{" "}
          <strong className="font-semibold text-zinc-800 dark:text-zinc-200">1 through 4</strong> cover
          LIVE setup, structure, platform rules, and what gets accounts banned. Study each lesson,
          pass the quiz and Live Exam, then use{" "}
          <strong className="font-semibold text-zinc-800 dark:text-zinc-200">Next lesson</strong> at the
          bottom — or follow the path below.
        </p>
        <p className="mt-4 rounded-xl border border-teal-500/25 bg-teal-500/10 px-4 py-3 text-sm leading-relaxed text-teal-950 dark:border-teal-400/25 dark:bg-teal-500/10 dark:text-teal-100">
          Protect first: Lesson 3 begins essential safety inside Program 1 — not a separate later
          program. Continue through Lessons 3–6 before treating LIVE as a regular habit.
        </p>

        <ol className="mt-8 list-decimal space-y-2 pl-5 text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {sections.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`} className="text-accent hover:underline dark:text-accent-muted">
                {section.title}
              </a>
              <span className="font-normal text-zinc-500 dark:text-zinc-500">
                {" "}
                — {section.intro.length > 100 ? `${section.intro.slice(0, 97)}…` : section.intro}
              </span>
            </li>
          ))}
        </ol>

        <div className="mt-10 rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/[0.06] via-surface to-surface p-6 dark:from-accent/[0.04] dark:via-zinc-950 dark:to-zinc-950 sm:p-8">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            After lesson 4
          </h2>
          <p className="mt-3 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            Continue with{" "}
            <Link href="/streameru" className="font-semibold text-accent hover:underline dark:text-accent-muted">
              the rest of the course on the StreamerU home page
            </Link>{" "}
            — lesson 5 and beyond use the same single path.
          </p>
        </div>

        <div className="mt-16 space-y-20">
          {sections.map((section, i) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-28"
              aria-labelledby={`start-here-${section.id}`}
            >
              <div className="border-b border-zinc-200/80 pb-6 dark:border-zinc-800/80">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent dark:text-accent-muted">
                  {section.stepLabel} of {sections.length}
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
              <nav
                className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-zinc-200/80 pt-6 dark:border-zinc-800/80"
                aria-label={`Navigate steps for ${section.title}`}
              >
                {i > 0 ? (
                  <Link
                    href={`#${sections[i - 1].id}`}
                    className="text-sm font-semibold text-accent hover:underline dark:text-accent-muted"
                  >
                    ← Previous: {sections[i - 1].title}
                  </Link>
                ) : (
                  <span className="text-sm text-zinc-400 dark:text-zinc-600">First step</span>
                )}
                {i < sections.length - 1 ? (
                  <Link
                    href={`#${sections[i + 1].id}`}
                    className="text-sm font-semibold text-accent hover:underline dark:text-accent-muted"
                  >
                    Next: {sections[i + 1].title} →
                  </Link>
                ) : (
                  <Link
                    href="/streameru"
                    className="text-sm font-semibold text-accent hover:underline dark:text-accent-muted"
                  >
                    Continue the course →
                  </Link>
                )}
              </nav>
            </section>
          ))}
        </div>

        <section
          className="mt-20 border-t border-zinc-200/80 pt-14 dark:border-zinc-800/80"
          aria-labelledby="start-here-next"
        >
          <h2 id="start-here-next" className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            Free academy · Free creator network
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Membership is free. StreamerU is included. Use Battle Hub for battles and scheduling with the
            network — education stays on{" "}
            <Link href="/streameru" className="font-semibold text-accent hover:underline dark:text-accent-muted">
              StreamerU
            </Link>
            .
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href="/apply" variant="primary">
              Join Streamer Factory FREE
            </Button>
            <Button href="/battle-hub" variant="secondary">
              Battle Hub
            </Button>
            <Button href="/battle-hub/calendar" variant="secondary">
              Network calendar
            </Button>
            <Button href="/streameru/understanding-battles" variant="secondary">
              Battles lessons
            </Button>
            <Button href="/streameru" variant="secondary">
              StreamerU hub
            </Button>
            <Link
              href="/streameru"
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl px-4 text-sm font-semibold text-accent hover:underline dark:text-accent-muted"
            >
              StreamerU home →
            </Link>
          </div>
        </section>
    </div>
  );
}
