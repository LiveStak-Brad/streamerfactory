import { Section } from "@/components/ui/Section";

const points = [
  {
    title: "Built for serious creators",
    body: "We work with people who treat LIVE as a craft—consistency, professionalism, and long-term growth over viral luck.",
  },
  {
    title: "Agency operations, not noise",
    body: "Clear communication, defined processes, and management support that respects your time and your brand.",
  },
  {
    title: "Growth with guardrails",
    body: "Training and feedback designed to help you scale safely—aligned with platform rules and sustainable audience trust.",
  },
] as const;

const cardClass =
  "group rounded-2xl border border-zinc-200/80 bg-gradient-to-b from-surface/95 to-muted-bg/40 p-8 shadow-sm ring-1 ring-zinc-950/[0.04] transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:-translate-y-1 hover:border-accent/30 hover:shadow-[0_20px_44px_-32px_rgba(15,23,42,0.4)] hover:ring-accent/15 motion-reduce:transform-none motion-reduce:transition-none dark:border-zinc-800 dark:from-zinc-950/80 dark:to-zinc-950/30 dark:ring-white/[0.06] dark:hover:border-accent/35 dark:hover:shadow-[0_24px_50px_-28px_rgba(0,0,0,0.6)]";

export function WhyStreamerFactory() {
  return (
    <Section id="why-us" variant="elevated">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent dark:text-accent-muted">
          Why us
        </p>
        <h2 className="mt-4 text-3xl font-bold tracking-[-0.03em] text-foreground sm:text-4xl lg:text-5xl">
          Why Streamer Factory
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-muted sm:text-xl">
          We’re not a gimmick network. We’re a partner for creators who want a
          professional path to earning on TikTok LIVE.
        </p>
      </div>
      <div className="mt-14 grid gap-6 lg:grid-cols-3 lg:gap-8">
        {points.map((p) => (
          <div key={p.title} className={cardClass}>
            <div className="mb-5 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-accent/25 bg-accent-soft text-sm font-bold text-accent dark:border-accent/35 dark:bg-accent-soft dark:text-accent-muted">
              SF
            </div>
            <h3 className="text-xl font-semibold tracking-tight text-foreground">{p.title}</h3>
            <p className="mt-4 text-base leading-relaxed text-muted">{p.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
