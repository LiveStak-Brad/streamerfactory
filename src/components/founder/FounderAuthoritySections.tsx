import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/hall-of-fame/Reveal";
import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import {
  FOUNDER_FAILURE_LESSONS,
  FOUNDER_JOURNEY_MILESTONES,
  FOUNDER_PHILOSOPHY,
  FOUNDER_YEARS_TAUGHT,
} from "@/lib/founder/content";

function InlineLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="font-semibold text-[#5B3BFF] underline-offset-2 hover:underline dark:text-accent-muted"
    >
      {children}
    </Link>
  );
}

function DarkInlineLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="font-semibold text-cyan-200/90 underline-offset-2 transition-colors hover:text-white hover:underline"
    >
      {children}
    </Link>
  );
}

export function FounderExperienceSection() {
  return (
    <section
      aria-labelledby="experience-heading"
      className="relative border-b border-zinc-200/80 bg-[#f4f6fb] py-20 text-[#0b0f1a] sm:py-24"
    >
      <Container className="max-w-3xl">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#5B3BFF]">
            Cross-platform experience
          </p>
          <h2
            id="experience-heading"
            className="mt-4 text-3xl font-bold tracking-[-0.03em] sm:text-4xl lg:text-5xl"
          >
            My Experience Across Live Streaming Platforms
          </h2>
        </Reveal>

        <div className="mt-8 space-y-6 text-lg leading-relaxed text-[#5c6478]">
          <Reveal delayMs={60}>
            <p>
              People ask how I became a TikTok LIVE creator and coach. The honest answer is that it
              didn&apos;t start on TikTok. It started years earlier in livestream communities where I
              learned the hard lessons about audience retention, viewer engagement, and creator
              monetization before those phrases were content-marketing buzzwords.
            </p>
          </Reveal>
          <Reveal delayMs={100}>
            <p>
              On MeetMe LIVE I learned how fast a room can grow when you take hospitality seriously —
              and how quickly it empties when you don&apos;t. Tagged reinforced the same truth in a
              different culture. Kik LIVE became proof that systems compound: years later I&apos;m
              still ranked among the all-time leaders even after stepping away. BIGO LIVE tested
              whether the playbook traveled. TikTok LIVE became the biggest stage — battles,
              networking, and LIVE Pro pressure included. Favorited showed what happens when
              experience meets a new room with urgency.
            </p>
          </Reveal>
          <Reveal delayMs={140}>
            <p>
              Across those apps I kept coming back to the same craft: livestream battles for
              discovery, creator networking for acceleration, retention for longevity, and LIVE
              coaching instincts that only show up after enough quiet nights. That&apos;s the
              experience Streamer Factory packages into{" "}
              <InlineLink href="/streameru">StreamerU</InlineLink>,{" "}
              <InlineLink href="/battle-hub">Battle Hub</InlineLink>, and our{" "}
              <InlineLink href="/guides">Guides</InlineLink> — creator education built from the
              field, not a slide deck.
            </p>
          </Reveal>
          <Reveal delayMs={180}>
            <blockquote className="rounded-3xl border border-[#5B3BFF]/20 bg-white px-6 py-5 text-xl font-medium leading-relaxed text-[#0b0f1a] shadow-[0_18px_40px_-28px_rgba(91,59,255,0.35)]">
              &ldquo;If your live streaming strategy only works on one algorithm, it was never a
              strategy — it was a temporary advantage.&rdquo;
            </blockquote>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

export function FounderJourneyMilestonesSection() {
  return (
    <section
      aria-labelledby="journey-timeline-heading"
      className="relative overflow-hidden border-b border-white/5 py-20 sm:py-24"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_20%_10%,rgba(91,59,255,0.22),transparent_55%),radial-gradient(ellipse_45%_40%_at_90%_80%,rgba(0,229,255,0.12),transparent_50%)]"
        aria-hidden
      />
      <Container className="relative">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-accent-muted">
              Timeline
            </p>
            <h2
              id="journey-timeline-heading"
              className="mt-4 text-3xl font-bold tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl"
            >
              The Journey, Milestone by Milestone
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-zinc-400">
              Not a highlight reel — the arc that turned years of streaming into a TikTok LIVE agency
              and creator network.
            </p>
          </div>
        </Reveal>

        <ol className="relative mx-auto mt-14 max-w-3xl space-y-6 before:absolute before:left-[1.15rem] before:top-3 before:bottom-3 before:w-px before:bg-gradient-to-b before:from-[#5B3BFF] before:via-[#00E5FF]/70 before:to-[#FF2ED1] sm:before:left-6">
          {FOUNDER_JOURNEY_MILESTONES.map((item, i) => (
            <li key={item.id} className="relative pl-12 sm:pl-16">
              <span
                className="absolute left-3 top-6 h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(0,229,255,0.85)] sm:left-[1.35rem]"
                aria-hidden
              />
              <Reveal delayMs={i * 70}>
                <GlassCard tone="dark" hover className="p-6">
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-accent-muted">
                    Chapter {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 text-xl font-bold tracking-tight text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">{item.body}</p>
                </GlassCard>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

export function FounderYearsTaughtSection() {
  return (
    <section
      aria-labelledby="years-taught-heading"
      className="relative border-b border-zinc-200/80 bg-[#eef1f8] py-20 text-[#0b0f1a] sm:py-24"
    >
      <Container className="max-w-3xl">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#5B3BFF]">
            Long-form lessons
          </p>
          <h2
            id="years-taught-heading"
            className="mt-4 text-3xl font-bold tracking-[-0.03em] sm:text-4xl lg:text-5xl"
          >
            What Years of Streaming Taught Me
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-[#5c6478]">
            These are the live streaming strategies I wish someone had handed me on day one — the
            same ideas we teach across Streamer Factory.
          </p>
        </Reveal>

        <div className="mt-12 space-y-10">
          {FOUNDER_YEARS_TAUGHT.map((section, i) => (
            <Reveal key={section.id} delayMs={i * 40}>
              <article className="rounded-3xl border border-zinc-200/90 bg-white/95 p-6 shadow-[0_16px_40px_-28px_rgba(15,23,42,0.25)] sm:p-8">
                <h3 className="text-2xl font-bold tracking-tight text-[#0b0f1a]">{section.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-[#5c6478] sm:text-lg">
                  {section.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delayMs={120}>
          <p className="mt-10 text-base leading-relaxed text-[#5c6478]">
            Want the applied version? Start in{" "}
            <InlineLink href="/streameru">StreamerU</InlineLink>, study our{" "}
            <InlineLink href="/guides">Guides</InlineLink> on TikTok LIVE growth, then put it into
            practice with the{" "}
            <InlineLink href="/members">Members</InlineLink> community and{" "}
            <InlineLink href="/rankings">Rankings</InlineLink>.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

export function FounderFailureLessonsSection() {
  return (
    <section
      aria-labelledby="failure-lessons-heading"
      className="relative border-b border-white/5 bg-[#0b0a12] py-20 sm:py-24"
    >
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-accent-muted">
              Hard-earned
            </p>
            <h2
              id="failure-lessons-heading"
              className="mt-4 text-3xl font-bold tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl"
            >
              Lessons Learned the Hard Way
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-zinc-400">
              Expertise isn&apos;t only trophies. It&apos;s the nights that didn&apos;t work — and what
              changed after.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {FOUNDER_FAILURE_LESSONS.map((lesson, i) => (
            <Reveal key={lesson.title} delayMs={i * 70}>
              <GlassCard tone="dark" hover className="h-full p-6 sm:p-7">
                <h3 className="text-xl font-bold tracking-tight text-white">{lesson.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">{lesson.body}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function FounderPhilosophySection() {
  return (
    <section
      aria-labelledby="philosophy-heading"
      className="relative border-b border-zinc-200/80 bg-[#f4f6fb] py-20 text-[#0b0f1a] sm:py-24"
    >
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#5B3BFF]">
              Creator philosophy
            </p>
            <h2
              id="philosophy-heading"
              className="mt-4 text-3xl font-bold tracking-[-0.03em] sm:text-4xl lg:text-5xl"
            >
              How I Approach Helping Creators
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-[#5c6478]">
              As a live streaming mentor and TikTok LIVE coach, my job isn&apos;t to hype you — it&apos;s
              to give you a path that still works when motivation dips.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {FOUNDER_PHILOSOPHY.map((item, i) => (
            <Reveal key={item.title} delayMs={i * 70}>
              <article className="h-full rounded-3xl border border-zinc-200/90 bg-white p-6 shadow-[0_16px_40px_-28px_rgba(15,23,42,0.28)] sm:p-7">
                <h3 className="text-xl font-bold tracking-tight text-[#0b0f1a]">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#5c6478] sm:text-base">{item.body}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delayMs={120}>
          <p className="mx-auto mt-10 max-w-2xl text-center text-base leading-relaxed text-[#5c6478]">
            See that philosophy in action across the{" "}
            <InlineLink href="/hall-of-fame">Hall of Fame</InlineLink>, weekly{" "}
            <InlineLink href="/rankings">Rankings</InlineLink>, and when you{" "}
            <InlineLink href="/apply">join Streamer Factory</InlineLink>.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

export function FounderInternalLinksNote() {
  return (
    <section className="relative border-b border-white/5 py-12">
      <Container className="max-w-3xl text-center">
        <p className="text-sm leading-relaxed text-zinc-500">
          Explore more of the network:{" "}
          <DarkInlineLink href="/streameru">StreamerU</DarkInlineLink>
          {" · "}
          <DarkInlineLink href="/battle-hub">Battle Hub</DarkInlineLink>
          {" · "}
          <DarkInlineLink href="/members">Members</DarkInlineLink>
          {" · "}
          <DarkInlineLink href="/guides">Guides</DarkInlineLink>
          {" · "}
          <DarkInlineLink href="/hall-of-fame">Hall of Fame</DarkInlineLink>
          {" · "}
          <DarkInlineLink href="/apply">Join</DarkInlineLink>
        </p>
      </Container>
    </section>
  );
}
