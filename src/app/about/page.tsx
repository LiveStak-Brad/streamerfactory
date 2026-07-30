import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { createPageMetadata } from "@/lib/seo/page-metadata";
import { tiktokCreatorNetworkApplyUrl } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "About",
  description:
    "Learn how Streamer Factory helps TikTok LIVE creators grow with professional onboarding, StreamerU training, Battle Hub, and creator management.",
  path: "/about",
  keywords: ["Streamer Factory", "TikTok LIVE agency", "creator agency about"],
});

const pillars = [
  {
    title: "Recruit selectively",
    body: "Fit matters as much as follower count — we partner with creators who treat LIVE like a craft.",
  },
  {
    title: "Onboard with clarity",
    body: "Documentation and expectations up front so everyone knows how the network works.",
  },
  {
    title: "Train for compounding",
    body: "StreamerU missions and Battle Hub systems built for retention and sustainable monetization.",
  },
] as const;

export default function AboutPage() {
  return (
    <div className="border-b border-border/70 bg-muted-bg/30 pb-16 pt-8 dark:border-zinc-800 dark:bg-zinc-950/40 sm:pt-10">
      <Container className="max-w-6xl">
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0b0a12] px-5 py-10 text-zinc-50 sm:px-10 sm:py-14">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_20%_-10%,rgba(99,102,241,0.35),transparent_55%),radial-gradient(ellipse_50%_50%_at_100%_30%,rgba(168,85,247,0.22),transparent_50%)]"
            aria-hidden
          />
          <div className="relative mx-auto max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-accent-muted">About</p>
            <h1 className="mt-3 text-4xl font-bold tracking-[-0.03em] text-white sm:text-5xl">
              About Streamer Factory
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-zinc-400">
              A TikTok LIVE creator agency for operators — creators who want audience, trust, and sustainable
              income. Recruitment, onboarding, StreamerU training, and Battle Hub coordination in one network.
            </p>
          </div>
        </section>

        <section className="mx-auto mt-12 max-w-3xl space-y-6 text-lg leading-relaxed text-muted">
          <p>
            This isn&apos;t a gaming brand and it isn&apos;t a viewer product. It&apos;s a partner network: clear
            expectations, real coaching, and a conversion-focused approach to helping creators win on LIVE.
          </p>
          <p>
            Approved members use the same platform to learn (StreamerU), connect (Battle Finder), schedule
            (Battle Hub and the calendar), and grow — with support aligned to how you actually go live.
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-center text-3xl font-bold tracking-tight text-foreground">
            What “agency” means here
          </h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-3">
            {pillars.map((p, i) => (
              <li
                key={p.title}
                className="rounded-2xl border border-border/80 bg-surface/95 p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/55"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-brand text-sm font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-foreground">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href={tiktokCreatorNetworkApplyUrl} external variant="primary" className="min-h-[48px] px-8">
              Join Creator Network on TikTok
            </Button>
            <Button href="/apply" variant="secondary" className="min-h-[48px] px-8">
              Request website access
            </Button>
          </div>
          <p className="mt-8 text-center text-sm leading-relaxed text-muted">
            Dig deeper:{" "}
            <Link
              href="/guides/tiktok-live-agency"
              className="font-semibold text-accent hover:underline dark:text-accent-muted"
            >
              TikTok LIVE Agency
            </Link>
            {" · "}
            <Link
              href="/guides/how-to-join-tiktok-live-agency"
              className="font-semibold text-accent hover:underline dark:text-accent-muted"
            >
              How to join
            </Link>
            {" · "}
            <Link
              href="/guides/creator-academy"
              className="font-semibold text-accent hover:underline dark:text-accent-muted"
            >
              Creator Academy
            </Link>
          </p>
        </section>
      </Container>
    </div>
  );
}
