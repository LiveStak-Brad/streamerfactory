import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

const points = [
  {
    title: "Built for serious creators",
    body: "We work with people who treat LIVE as a craft—consistency, professionalism, and long-term growth over viral luck.",
  },
  {
    title: "Free network, not a paid upgrade",
    body: "Membership is free. StreamerU is included. TikTok compensates approved creator networks — we don't charge creators or take a percentage of TikTok LIVE earnings.",
  },
  {
    title: "Growth with guardrails",
    body: "Free training and feedback designed to help you scale safely — aligned with platform rules and sustainable audience trust.",
  },
] as const;

export function WhyStreamerFactory() {
  return (
    <Section id="why-us" variant="elevated">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
        <SectionHeader
          align="left"
          eyebrow="Why us"
          title="Why Streamer Factory"
          description="We’re not a gimmick network or a paid course. We’re a free partner network for creators who want a professional path to earning on TikTok LIVE."
          className="lg:sticky lg:top-28"
        />
        <ul className="space-y-4">
          {points.map((p, index) => (
            <li
              key={p.title}
              className="rounded-2xl border border-border/80 bg-surface/90 p-6 shadow-sm transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-accent/35 motion-reduce:transform-none dark:border-zinc-800 dark:bg-zinc-950/50"
            >
              <div className="flex items-start gap-4">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-brand text-sm font-bold text-white">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">{p.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-muted">{p.body}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
