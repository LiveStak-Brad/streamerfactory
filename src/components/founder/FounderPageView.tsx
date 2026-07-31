import Link from "next/link";
import { TrackedCta } from "@/components/analytics/TrackedCta";
import { CountUp } from "@/components/founder/CountUp";
import {
  FounderExperienceSection,
  FounderFailureLessonsSection,
  FounderInternalLinksNote,
  FounderJourneyMilestonesSection,
  FounderPhilosophySection,
  FounderYearsTaughtSection,
} from "@/components/founder/FounderAuthoritySections";
import { FounderFaq } from "@/components/founder/FounderFaq";
import { FounderHero } from "@/components/founder/FounderHero";
import { FounderParticles } from "@/components/founder/FounderParticles";
import { PrincipleIcon } from "@/components/founder/PrincipleIcon";
import { Reveal } from "@/components/hall-of-fame/Reveal";
import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  FOUNDER_LEARN,
  FOUNDER_PLATFORMS,
  FOUNDER_PRINCIPLES,
  FOUNDER_STATS,
  FOUNDER_TRUST,
} from "@/lib/founder/content";
import { tiktokCreatorNetworkApplyUrl } from "@/lib/site";

export function FounderPageView() {
  return (
    <div className="relative overflow-hidden bg-[#0b0a12] text-zinc-50">
      <FounderHero />

      {/* Section 2 — Why I Built */}
      <section
        id="why-i-built"
        aria-labelledby="why-built-heading"
        className="relative border-b border-white/5 bg-[#f4f6fb] py-20 text-[#0b0f1a] sm:py-24"
      >
        <Container className="max-w-3xl">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#5B3BFF]">The origin</p>
            <h2
              id="why-built-heading"
              className="mt-4 text-3xl font-bold tracking-[-0.03em] sm:text-4xl lg:text-5xl"
            >
              Why I Built Streamer Factory
            </h2>
          </Reveal>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-[#5c6478]">
            <Reveal delayMs={80}>
              <p>
                I didn&apos;t learn live streaming from a course. I learned it the long way — years of
                trial and error, nights that went nowhere, and mornings spent figuring out what
                actually moved the needle.
              </p>
            </Reveal>
            <Reveal delayMs={140}>
              <p>
                I learned every platform the hard way. I started over repeatedly. New apps. New
                accounts. New audiences who had never heard my name. Each restart taught me something
                the previous one couldn&apos;t.
              </p>
            </Reveal>
            <Reveal delayMs={200}>
              <p className="text-[#0b0f1a]">
                Streamer Factory exists so creators can skip years of those mistakes — and build with
                a system instead of guesswork. That system lives in{" "}
                <Link
                  href="/streameru"
                  className="font-semibold text-[#5B3BFF] underline-offset-2 hover:underline"
                >
                  StreamerU
                </Link>
                , our{" "}
                <Link
                  href="/guides"
                  className="font-semibold text-[#5B3BFF] underline-offset-2 hover:underline"
                >
                  Guides
                </Link>
                , and the day-to-day rhythm of the creator network.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Section 3 — Proven stats */}
      <section
        aria-labelledby="proven-heading"
        className="relative overflow-hidden border-b border-white/5 py-20 sm:py-24"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_10%_20%,rgba(91,59,255,0.28),transparent_55%),radial-gradient(ellipse_50%_40%_at_90%_80%,rgba(0,229,255,0.14),transparent_50%)]"
          aria-hidden
        />
        <FounderParticles density="section" />
        <Container className="relative">
          <SectionHeader
            eyebrow="Receipts"
            title="Proven Across Multiple Platforms"
            description="Not theory. Not screenshots of someone else's grind. Years of results across apps that don't share an algorithm."
            tone="inverse"
            align="center"
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FOUNDER_STATS.map((stat, i) => (
              <Reveal key={stat.id} delayMs={i * 70}>
                <GlassCard
                  tone="dark"
                  hover
                  className="h-full p-6 shadow-[0_0_40px_-20px_rgba(160,32,240,0.4)]"
                >
                  <p className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    {stat.numeric && typeof stat.value === "number" ? (
                      <CountUp value={stat.value} suffix={stat.suffix} />
                    ) : (
                      <span className="text-gradient-brand">{stat.display}</span>
                    )}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">{stat.label}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
          <p id="proven-heading" className="sr-only">
            Proven across multiple platforms
          </p>
        </Container>
      </section>

      {/* Section 4 — Platforms timeline */}
      <section
        aria-labelledby="platforms-heading"
        className="relative border-b border-white/5 bg-[#11101a] py-20 sm:py-24"
      >
        <Container>
          <SectionHeader
            eyebrow="The path"
            title="The Platforms"
            description="MeetMe LIVE, Tagged, Kik LIVE, BIGO LIVE, TikTok LIVE, Favorited — each chapter taught a different lesson. Together they became Streamer Factory."
            tone="inverse"
            align="center"
          />

          <div className="relative mt-14">
            <div
              className="pointer-events-none absolute left-6 top-2 bottom-2 w-px bg-gradient-to-b from-[#5B3BFF] via-[#00E5FF]/60 to-[#FF2ED1] md:left-1/2 md:-translate-x-px"
              aria-hidden
            />
            <ol className="space-y-8">
              {FOUNDER_PLATFORMS.map((platform, i) => {
                const left = i % 2 === 0;
                return (
                  <li key={platform.id} className="relative md:grid md:grid-cols-2 md:gap-12">
                    <div
                      className="pointer-events-none absolute left-6 top-8 z-10 h-3 w-3 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(0,229,255,0.8)] md:left-1/2"
                      aria-hidden
                    />
                    <Reveal
                      delayMs={i * 90}
                      className={left ? "md:col-start-1 md:pr-4" : "md:col-start-2 md:pl-4"}
                    >
                      <article className="group relative ml-12 rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_28px_56px_-28px_rgba(91,59,255,0.4)] motion-reduce:transform-none md:ml-0">
                        <div className="flex items-start gap-4">
                          <div
                            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${platform.accent} text-sm font-bold text-white shadow-lg`}
                            aria-hidden
                          >
                            {platform.monogram}
                          </div>
                          <div className="min-w-0">
                            <h3
                              id={i === 0 ? "platforms-heading" : undefined}
                              className="text-2xl font-bold tracking-tight text-white"
                            >
                              {platform.name}
                            </h3>
                            <p className="mt-1 text-sm font-semibold text-cyan-200/90">
                              {platform.followers}
                            </p>
                          </div>
                        </div>
                        <ul className="mt-5 space-y-2 text-sm text-zinc-400">
                          {platform.achievements.map((a) => (
                            <li key={a} className="flex gap-2">
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-hot" />
                              <span>{a}</span>
                            </li>
                          ))}
                        </ul>
                        <p className="mt-5 border-t border-white/10 pt-4 text-sm leading-relaxed text-zinc-300">
                          <span className="font-semibold text-white">Lesson: </span>
                          {platform.lesson}
                        </p>
                      </article>
                    </Reveal>
                  </li>
                );
              })}
            </ol>
          </div>
        </Container>
      </section>

      <FounderExperienceSection />
      <FounderJourneyMilestonesSection />
      <FounderYearsTaughtSection />

      {/* Section 5 — What I Learned */}
      <section
        aria-labelledby="learned-heading"
        className="relative border-b border-zinc-200/80 bg-[#f4f6fb] py-20 text-[#0b0f1a] sm:py-24"
      >
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#5B3BFF]">Principles</p>
            <h2
              id="learned-heading"
              className="mt-4 text-3xl font-bold tracking-[-0.03em] text-[#0b0f1a] sm:text-4xl lg:text-5xl"
            >
              What I Learned
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-[#5c6478] sm:text-xl">
              Not features. The rules that actually decide who lasts on LIVE.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FOUNDER_PRINCIPLES.map((p, i) => (
              <Reveal key={p.title} delayMs={i * 60}>
                <article
                  className={`group h-full rounded-3xl border border-zinc-200/90 bg-white/90 p-6 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.35)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_28px_50px_-24px_rgba(91,59,255,0.28)] motion-reduce:transform-none ${
                    i === FOUNDER_PRINCIPLES.length - 1 ? "sm:col-span-2 lg:col-span-1" : ""
                  }`}
                >
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-[0_8px_24px_-8px_rgba(160,32,240,0.55)]">
                    <PrincipleIcon name={p.icon} className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold tracking-tight text-[#0b0f1a]">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5c6478]">{p.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <FounderFailureLessonsSection />

      {/* Section 6 — Trust */}
      <section
        aria-labelledby="trust-heading"
        className="relative overflow-hidden border-b border-white/5 py-20 sm:py-24"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_45%_at_80%_10%,rgba(0,229,255,0.12),transparent_50%),radial-gradient(ellipse_45%_40%_at_10%_90%,rgba(160,32,240,0.2),transparent_50%)]"
          aria-hidden
        />
        <Container className="relative">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-accent-muted">
                Objections answered
              </p>
              <h2
                id="trust-heading"
                className="mt-4 text-3xl font-bold tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl"
              >
                Why You Can Trust Me
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-zinc-400">
                I&apos;m not selling a fantasy. I&apos;m teaching what survived contact with real
                platforms, real audiences, and real restarts.
              </p>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {FOUNDER_TRUST.map((card, i) => (
              <Reveal key={card.quote} delayMs={i * 90}>
                <GlassCard
                  tone="dark"
                  hover
                  className={`h-full p-6 ${i % 2 === 1 ? "sm:translate-y-4 motion-reduce:translate-y-0" : ""}`}
                >
                  <p className="text-lg font-bold tracking-tight text-white">&ldquo;{card.quote}&rdquo;</p>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">{card.detail}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <FounderPhilosophySection />

      {/* Section 7 — Mission */}
      <section
        aria-labelledby="mission-heading"
        className="relative overflow-hidden border-b border-white/5 bg-[#08070e] py-24 sm:py-28"
      >
        <div
          className="pointer-events-none absolute inset-0 founder-mission-gradient"
          aria-hidden
        />
        <FounderParticles density="section" />
        <Container className="relative max-w-3xl text-center">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-accent-muted">
              The mission
            </p>
            <h2
              id="mission-heading"
              className="mt-4 text-3xl font-bold tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl"
            >
              This isn&apos;t about recruiting creators.
            </h2>
          </Reveal>
          <Reveal delayMs={100}>
            <p className="mt-8 text-xl leading-relaxed text-zinc-300 sm:text-2xl">
              Streamer Factory exists to help people change their lives.
            </p>
          </Reveal>
          <Reveal delayMs={180}>
            <p className="mt-6 text-lg leading-relaxed text-zinc-400">
              To create opportunities. Build confidence. Create income. Help creators become
              full-time — not someday, but with a path they can actually follow.
            </p>
          </Reveal>
          <Reveal delayMs={240}>
            <p className="mt-8 text-lg font-medium leading-relaxed text-white">
              If LIVE changed my life, it can change yours too. That&apos;s why this place exists.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Section 8 — What You'll Learn */}
      <section
        aria-labelledby="learn-heading"
        className="relative border-b border-zinc-200/80 bg-[#eef1f8] py-20 text-[#0b0f1a] sm:py-24"
      >
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#5B3BFF]">
              Inside Streamer Factory
            </p>
            <h2
              id="learn-heading"
              className="mt-4 text-3xl font-bold tracking-[-0.03em] text-[#0b0f1a] sm:text-4xl lg:text-5xl"
            >
              What You&apos;ll Learn
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-[#5c6478] sm:text-xl">
              The same pillars I rebuilt my career around — packaged so you can move faster.
            </p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {FOUNDER_LEARN.map((item, i) => (
              <Reveal key={item.title} delayMs={i * 50}>
                <article
                  className={`group relative h-full overflow-hidden rounded-3xl border border-zinc-200/90 bg-white/95 p-6 shadow-[0_16px_40px_-28px_rgba(15,23,42,0.3)] transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-[#5B3BFF]/35 motion-reduce:transform-none ${item.span}`}
                >
                  <div
                    className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-[#5B3BFF]/15 to-[#00E5FF]/10 blur-2xl transition-opacity group-hover:opacity-100"
                    aria-hidden
                  />
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#5B3BFF]/80">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 text-xl font-bold tracking-tight text-[#0b0f1a]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5c6478]">{item.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Section 9 — Journey continues */}
      <section
        aria-labelledby="still-going-heading"
        className="relative overflow-hidden border-b border-white/5 py-20 sm:py-24"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_50%_0%,rgba(91,59,255,0.22),transparent_55%)]"
          aria-hidden
        />
        <Container className="relative max-w-3xl text-center">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-accent-muted">
              Still live
            </p>
            <h2
              id="still-going-heading"
              className="mt-4 text-3xl font-bold tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl"
            >
              The Journey Is Still Going
            </h2>
          </Reveal>
          <Reveal delayMs={100}>
            <div className="mt-10 space-y-3 text-xl font-medium leading-relaxed text-zinc-300 sm:text-2xl">
              <p>I&apos;m still streaming.</p>
              <p>Still learning.</p>
              <p>Still testing.</p>
              <p>Still improving.</p>
            </div>
          </Reveal>
          <Reveal delayMs={180}>
            <p className="mt-8 text-lg leading-relaxed text-zinc-400">
              Everything new I discover gets added back into Streamer Factory. You&apos;re not
              learning from a finished chapter — you&apos;re learning alongside someone who is still
              in the room. Follow progress in{" "}
              <Link
                href="/hall-of-fame"
                className="font-semibold text-cyan-200/90 underline-offset-2 hover:text-white hover:underline"
              >
                Hall of Fame
              </Link>{" "}
              and compete on the{" "}
              <Link
                href="/rankings"
                className="font-semibold text-cyan-200/90 underline-offset-2 hover:text-white hover:underline"
              >
                Rankings
              </Link>
              .
            </p>
          </Reveal>
        </Container>
      </section>

      <FounderFaq />
      <FounderInternalLinksNote />

      {/* Final CTA */}
      <section
        aria-labelledby="founder-cta-heading"
        className="relative overflow-hidden py-24 sm:py-28"
      >
        <div className="pointer-events-none absolute inset-0 founder-cta-gradient" aria-hidden />
        <FounderParticles density="hero" />
        <Container className="relative max-w-3xl text-center">
          <Reveal>
            <h2
              id="founder-cta-heading"
              className="text-4xl font-bold tracking-[-0.035em] text-white sm:text-5xl lg:text-6xl"
            >
              Ready to Build Something Bigger?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
              Join the network. Train in StreamerU. Climb the rankings. Build the career you keep
              saying you want — or{" "}
              <Link
                href="/apply"
                className="font-semibold text-cyan-200/90 underline-offset-2 hover:text-white hover:underline"
              >
                request website access
              </Link>{" "}
              after you join on TikTok.
            </p>
          </Reveal>
          <Reveal delayMs={120}>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
              <TrackedCta
                href={tiktokCreatorNetworkApplyUrl}
                external
                variant="primary"
                className="min-h-[52px] px-8 sm:min-w-[220px]"
                eventMetadata={{ location: "founder_final_cta", cta: "join" }}
              >
                Join Streamer Factory
              </TrackedCta>
              <TrackedCta
                href="/streameru"
                variant="secondaryOnDark"
                className="min-h-[52px] px-8 sm:min-w-[200px]"
                eventMetadata={{ location: "founder_final_cta", cta: "streameru" }}
              >
                Browse StreamerU
              </TrackedCta>
              <TrackedCta
                href="/rankings"
                variant="secondaryOnDark"
                className="min-h-[52px] px-8 sm:min-w-[200px]"
                eventMetadata={{ location: "founder_final_cta", cta: "rankings" }}
              >
                Explore Rankings
              </TrackedCta>
              <TrackedCta
                href="/battle-hub"
                variant="secondaryOnDark"
                className="min-h-[52px] px-8 sm:min-w-[200px]"
                eventMetadata={{ location: "founder_final_cta", cta: "battle_hub" }}
              >
                Open Battle Hub
              </TrackedCta>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
