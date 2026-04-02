import { Section } from "@/components/ui/Section";

const items = [
  {
    title: "Recruiting streamers",
    body: "We partner with ambitious TikTok LIVE creators who want structure, coaching, and a clear path to growth—not overnight hype.",
  },
  {
    title: "Onboarding creators",
    body: "Expect a professional onboarding process: expectations, brand safety, scheduling, and how we work together as partners.",
  },
  {
    title: "Training for growth",
    body: "Practical playbooks for content rhythm, live retention, and audience building—delivered in a way that fits real schedules.",
  },
  {
    title: "Monetizing live content",
    body: "We help you think like a business: offers, conversion, and sustainable revenue—without gimmicks or empty promises.",
  },
] as const;

const cardClass =
  "group relative overflow-hidden rounded-2xl border border-zinc-200/90 bg-surface p-8 shadow-[0_1px_0_0_rgba(255,255,255,0.7)_inset] transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_24px_48px_-28px_rgba(15,23,42,0.35)] motion-reduce:transform-none motion-reduce:transition-none dark:border-zinc-800/90 dark:bg-zinc-950/35 dark:shadow-none dark:hover:border-accent/45 dark:hover:shadow-[0_28px_56px_-24px_rgba(0,0,0,0.65)]";

export function WhatWeDo() {
  return (
    <Section id="what-we-do" variant="muted">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent dark:text-accent-muted">
          Services
        </p>
        <h2 className="mt-4 text-3xl font-bold tracking-[-0.03em] text-foreground sm:text-4xl lg:text-5xl">
          What we do
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-muted sm:text-xl">
          A full-service agency layer for TikTok LIVE—so creators can grow with
          confidence and clarity.
        </p>
      </div>
      <ul className="mt-14 grid gap-6 sm:grid-cols-2 sm:gap-8 lg:gap-10">
        {items.map((item) => (
          <li key={item.title} className={cardClass}>
            <span
              className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-accent via-accent-muted to-accent opacity-90 shadow-[0_0_0_0_rgba(99,102,241,0)] transition-[box-shadow,width] duration-300 group-hover:w-1.5 group-hover:shadow-[0_0_28px_rgba(99,102,241,0.55)]"
              aria-hidden
            />
            <div className="relative pl-4">
              <h3 className="text-xl font-semibold tracking-tight text-foreground">
                {item.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-muted">{item.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
