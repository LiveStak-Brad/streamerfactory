import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

const items = [
  {
    title: "Recruiting streamers",
    body: "We partner with ambitious TikTok LIVE creators who want structure, coaching, and a clear path to growth—not overnight hype.",
    mark: "01",
  },
  {
    title: "Onboarding creators",
    body: "Expect a professional onboarding process: expectations, brand safety, scheduling, and how we work together as partners.",
    mark: "02",
  },
  {
    title: "Training for growth",
    body: "Practical playbooks for content rhythm, live retention, and audience building—delivered in a way that fits real schedules.",
    mark: "03",
  },
  {
    title: "Monetizing live content",
    body: "We help you think like a business: offers, conversion, and sustainable revenue—without gimmicks or empty promises.",
    mark: "04",
  },
] as const;

export function WhatWeDo() {
  return (
    <Section id="what-we-do" variant="muted">
      <SectionHeader
        eyebrow="Services"
        title="What we do"
        description="A full-service agency layer for TikTok LIVE—so creators can grow with confidence and clarity."
      />
      <ul className="mt-14 grid gap-0 overflow-hidden rounded-3xl border border-border/80 bg-surface shadow-[var(--shadow-card)] dark:border-zinc-800 dark:bg-zinc-950/40 sm:grid-cols-2">
        {items.map((item, index) => (
          <li
            key={item.title}
            className={`group relative p-7 sm:p-8 ${
              index % 2 === 0 ? "sm:border-r sm:border-border/70 dark:sm:border-zinc-800" : ""
            } ${index < 2 ? "border-b border-border/70 dark:border-zinc-800" : ""}`}
          >
            <span className="text-3xl font-bold tracking-tight text-accent/25 transition-colors group-hover:text-accent/45 dark:text-accent-muted/25 dark:group-hover:text-accent-muted/50">
              {item.mark}
            </span>
            <h3 className="mt-3 text-xl font-semibold tracking-tight text-foreground">{item.title}</h3>
            <p className="mt-3 text-base leading-relaxed text-muted">{item.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
