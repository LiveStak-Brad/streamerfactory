import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";

const pillars = [
  {
    href: "/streameru",
    eyebrow: "Academy",
    title: "StreamerU",
    body: "Curriculum-style training with clear next lessons — onboarding, LIVE craft, and monetization that compounds.",
    accent: "from-indigo-500/20 via-transparent to-transparent",
    chip: "Modules · missions · progress",
  },
  {
    href: "/battle-hub",
    eyebrow: "Ops",
    title: "Battle Hub",
    body: "Event-style scheduling, flyers, and a shared calendar so battles feel like a scene — not a spreadsheet.",
    accent: "from-fuchsia-500/20 via-transparent to-transparent",
    chip: "Schedule · finder · flyers",
  },
  {
    href: "/rankings",
    eyebrow: "Competition",
    title: "Rankings",
    body: "Monthly factory leaderboard fueled by Creator Network diamonds, hours, and activeness.",
    accent: "from-amber-400/20 via-transparent to-transparent",
    chip: "Champion · elite · rising",
  },
] as const;

export function HomePlatformPreview() {
  return (
    <Section id="platform" variant="elevated">
      <SectionHeader
        eyebrow="The operating system"
        title="See the platform, not just the pitch"
        description="Streamer Factory is built around the tools creators actually use every week — training, battles, and rankings in one network."
      />

      <div className="mt-14 grid gap-5 lg:grid-cols-3 lg:gap-6">
        {pillars.map((pillar) => (
          <Link key={pillar.href} href={pillar.href} className="group block h-full">
            <GlassCard hover className="h-full p-7 sm:p-8">
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${pillar.accent} opacity-80 transition-opacity group-hover:opacity-100`}
                aria-hidden
              />
              <div className="relative">
                <p className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-accent dark:text-accent-muted">
                  {pillar.eyebrow}
                </p>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-foreground">{pillar.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-muted">{pillar.body}</p>
                <p className="mt-6 inline-flex rounded-lg border border-border/80 bg-muted-bg/70 px-2.5 py-1 text-xs font-semibold text-zinc-600 dark:text-zinc-300">
                  {pillar.chip}
                </p>
                <p className="mt-5 text-sm font-semibold text-accent transition-transform group-hover:translate-x-0.5 dark:text-accent-muted">
                  Explore →
                </p>
              </div>
            </GlassCard>
          </Link>
        ))}
      </div>
    </Section>
  );
}
