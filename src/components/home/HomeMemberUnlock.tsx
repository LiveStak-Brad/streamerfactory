import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { tiktokCreatorNetworkApplyUrl } from "@/lib/site";

const unlocks = [
  {
    title: "Learn",
    body: "Structured onboarding and StreamerU training — so expectations are clear before you go live with the network.",
  },
  {
    title: "Connect",
    body: "Battle Finder and shared tools help you line up opponents and teammates without losing threads in random group chats.",
  },
  {
    title: "Schedule",
    body: "Battle Hub, the scheduler, and the network calendar keep dates, formats, and flyers in one place — fewer missed DMs and last‑minute confusion.",
  },
  {
    title: "Grow",
    body: "Coaching and agency support focused on retention and monetization — the same partner mindset we describe on day one, not a one‑off promo.",
  },
] as const;

const cardClass =
  "rounded-2xl border border-zinc-200/90 bg-surface p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/40 sm:p-7";

export function HomeMemberUnlock() {
  return (
    <Section id="member-unlock" variant="muted">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent dark:text-accent-muted">
          Inside the network
        </p>
        <h2 className="mt-4 text-3xl font-bold tracking-[-0.03em] text-foreground sm:text-4xl lg:text-5xl">
          What approved members unlock
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-muted sm:text-xl">
          Membership isn&apos;t a badge — it&apos;s access to the same systems we use to run battles and support
          creators. You can always do everything manually; Streamer Factory exists so your crew doesn&apos;t have
          to juggle five apps to agree on one battle time.
        </p>
      </div>

      <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:gap-6">
        {unlocks.map((u) => (
          <li key={u.title} className={cardClass}>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent dark:text-accent-muted">
              {u.title}
            </p>
            <p className="mt-3 text-base leading-relaxed text-muted">{u.body}</p>
          </li>
        ))}
      </ul>

      <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-zinc-200/80 bg-gradient-to-b from-surface to-muted-bg/40 px-6 py-6 text-center dark:border-zinc-800 dark:from-zinc-950/60 dark:to-zinc-950/30 sm:px-8">
        <p className="text-sm font-medium text-foreground">After TikTok &amp; website access</p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Join the Creator Network on TikTok first. Then submit your contact details so we can verify you and
          unlock scheduling and training here — same pipeline for everyone.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Button href={tiktokCreatorNetworkApplyUrl} external variant="primary" className="min-h-[44px] px-5">
            Join on TikTok
          </Button>
          <Link
            href="/apply"
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-zinc-200 px-5 py-2.5 text-sm font-semibold text-zinc-900 dark:border-zinc-600 dark:text-zinc-100"
          >
            Website access
          </Link>
          <Link
            href="/about"
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-zinc-200 px-5 py-2.5 text-sm font-semibold text-zinc-900 dark:border-zinc-600 dark:text-zinc-100"
          >
            How we work
          </Link>
        </div>
      </div>
    </Section>
  );
}
