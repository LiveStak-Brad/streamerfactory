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
    "The first four lessons of the StreamerU program — same curriculum order as the full course. TikTok LIVE training from Streamer Factory.",
  openGraph: {
    title: `Start your training | ${site.name}`,
    description: "First four lessons of the StreamerU program in order.",
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
          StreamerU · Semester 1 · lessons 1–4
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-[-0.03em] text-zinc-950 dark:text-zinc-50 sm:text-5xl lg:text-[3.1rem] lg:leading-[1.06]">
          Start your training
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-xl">
          This is the opening sprint of{" "}
          <strong className="font-semibold text-zinc-800 dark:text-zinc-200">Semester 1</strong> in the
          same StreamerU academy — lessons{" "}
          <strong className="font-semibold text-zinc-800 dark:text-zinc-200">1 through 4</strong> in
          order. Study each lesson, pass the Live Exam, then use{" "}
          <strong className="font-semibold text-zinc-800 dark:text-zinc-200">Next lesson</strong> at the
          bottom — or follow the path below.
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
            Network &amp; agency tools
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            When you want battles and scheduling with the network, use Battle Hub. The main program for learning stays on{" "}
            <Link href="/streameru" className="font-semibold text-accent hover:underline dark:text-accent-muted">
              StreamerU
            </Link>
            .
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href="/battle-hub" variant="primary">
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
