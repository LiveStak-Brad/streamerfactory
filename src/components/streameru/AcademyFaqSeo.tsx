import Link from "next/link";
import {
  PLANNED_CURRICULUM_LESSON_COUNT,
  PUBLISHED_LESSON_COUNT,
  getActiveProgramCount,
} from "@/lib/streameru/academy-meta";
import { FOUNDER } from "@/lib/founder/content";
import { FREE_NETWORK } from "@/lib/positioning/free-network";
import { sumStudyMinutesForSlugs } from "@/lib/resources/lesson-estimate";
import { CURRICULUM } from "@/lib/resources/curriculum";
import { formatMinutesLabel } from "@/lib/resources/mission-minutes";

/**
 * Natural FAQ copy for SEO + learner clarity — answers real questions without stuffing.
 */
export function AcademyFaqSeo() {
  const studyMinutes = sumStudyMinutesForSlugs(CURRICULUM.map((l) => l.slug));
  const programs = getActiveProgramCount();

  const faqs = [
    {
      q: "Who is StreamerU for?",
      a: "Anyone with a TikTok account who wants to stream — beginners who want a free TikTok LIVE course, and growing creators who need systems for retention, battles, monetization, and account safety.",
    },
    {
      q: "What will I learn?",
      a: `You'll learn LIVE setup, essential platform safety, on-stream craft, battles, growth, and income habits across ${PUBLISHED_LESSON_COUNT} published lessons in ${programs} active programs — with a ${PLANNED_CURRICULUM_LESSON_COUNT}-lesson university roadmap ahead.`,
    },
    {
      q: "Who created StreamerU?",
      a: `${FOUNDER.name}, founder of Streamer Factory — a professional livestreamer with multi-platform results, TikTok LIVE Pro credentials, and years of LIVE practice packaged into this free creator academy.`,
    },
    {
      q: FREE_NETWORK.whyFreeQuestion,
      a: FREE_NETWORK.whyFreeAnswer,
    },
    {
      q: "How long does it take?",
      a: `Study time across the published path is roughly ${formatMinutesLabel(studyMinutes)} of reading and prep, plus LIVE exam time on each lesson. Move at your pace — progress saves on this device.`,
    },
    {
      q: "What certificates do I earn?",
      a: "Program Certificates after LIVE exams + each Program Final, then the StreamerU Diploma after the Graduation Exam. Credentials recognize educational mastery — separate from Factory Reputation.",
    },
    {
      q: FREE_NETWORK.afterJoinQuestion,
      a: FREE_NETWORK.afterJoinAnswer,
    },
    {
      q: "Can beginners use this with zero followers?",
      a: "Yes. You can apply to join the free creator network with a TikTok account and start StreamerU today. StreamerU starts with setup and safety before regular LIVE — you do not need a big following.",
    },
    {
      q: "Can I start today?",
      a: "Yes. Join Streamer Factory for free and open Lesson 1 — study, pass the quiz, and complete your first LIVE Mission whenever you're ready to stream.",
    },
  ] as const;

  return (
    <section
      className="rounded-2xl border border-border/80 bg-surface/80 p-6 dark:border-zinc-800 dark:bg-zinc-950/50 sm:p-8"
      aria-labelledby="su-faq-heading"
    >
      <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-accent dark:text-accent-muted">
        Free TikTok LIVE course · Free creator network FAQ
      </p>
      <h2
        id="su-faq-heading"
        className="mt-1 text-xl font-bold tracking-tight text-foreground sm:text-2xl"
      >
        Common questions about StreamerU &amp; Streamer Factory
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
        Looking for a free TikTok LIVE course inside a free creator network? Here&apos;s how it works —
        clearly and without the hype.
      </p>
      <dl className="mt-6 space-y-4">
        {faqs.map((item) => (
          <div
            key={item.q}
            className="border-b border-border/60 pb-4 last:border-0 last:pb-0 dark:border-zinc-800"
          >
            <dt className="text-sm font-bold text-foreground">{item.q}</dt>
            <dd className="mt-1.5 text-sm leading-relaxed text-muted">{item.a}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-5 text-xs text-muted">
        Also explore{" "}
        <Link href="/founder" className="font-semibold text-accent hover:underline dark:text-accent-muted">
          the founder
        </Link>
        ,{" "}
        <Link href="/streameru/library" className="font-semibold text-accent hover:underline dark:text-accent-muted">
          free worksheets
        </Link>
        ,{" "}
        <Link href="/hall-of-fame" className="font-semibold text-accent hover:underline dark:text-accent-muted">
          Hall of Fame
        </Link>
        , and{" "}
        <Link href="/rankings" className="font-semibold text-accent hover:underline dark:text-accent-muted">
          creator rankings
        </Link>
        .
      </p>
    </section>
  );
}
