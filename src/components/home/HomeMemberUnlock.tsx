import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { tiktokCreatorNetworkApplyUrl } from "@/lib/site";

const unlocks = [
  {
    title: "Learn",
    body: "Free StreamerU academy training — lessons, quizzes, and LIVE exams so expectations are clear before you go live with the network.",
    hue: "bg-indigo-500",
  },
  {
    title: "Connect",
    body: "Battle Finder and shared tools help you line up opponents and teammates without losing threads in random group chats.",
    hue: "bg-violet-500",
  },
  {
    title: "Schedule",
    body: "Battle Hub, the scheduler, and the network calendar keep dates, formats, and flyers in one place — fewer missed DMs.",
    hue: "bg-fuchsia-500",
  },
  {
    title: "Grow",
    body: "Coaching and agency support focused on retention and monetization — the same partner mindset we describe on day one.",
    hue: "bg-pink-500",
  },
] as const;

export function HomeMemberUnlock() {
  return (
    <Section id="member-unlock" variant="muted">
      <SectionHeader
        eyebrow="Inside the network"
        title="What approved members unlock"
        description="Membership isn't a badge — it's access to the systems we use to run battles and support creators every week."
      />

      <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {unlocks.map((u) => (
          <li
            key={u.title}
            className="relative overflow-hidden rounded-2xl border border-border/80 bg-gradient-to-b from-surface to-muted-bg/50 p-6 dark:border-zinc-800 dark:from-zinc-950/70 dark:to-zinc-950/30"
          >
            <span className={`absolute left-0 top-0 h-1 w-full ${u.hue}`} aria-hidden />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent dark:text-accent-muted">
              {u.title}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{u.body}</p>
          </li>
        ))}
      </ul>

      <div className="mx-auto mt-12 max-w-3xl rounded-3xl border border-accent/20 bg-gradient-brand-soft px-6 py-7 text-center dark:border-accent/25 sm:px-10">
        <p className="text-sm font-semibold text-foreground">After TikTok &amp; website access</p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Join the Creator Network on TikTok first. Then submit your contact details so we can verify you and unlock
          scheduling and training here — same pipeline for everyone.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Button href={tiktokCreatorNetworkApplyUrl} external variant="primary" className="min-h-[44px] px-5">
            Join on TikTok
          </Button>
          <Link
            href="/apply"
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-foreground dark:border-zinc-600"
          >
            Website access
          </Link>
          <Link
            href="/about"
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold text-muted transition-colors hover:text-foreground"
          >
            How we work
          </Link>
        </div>
      </div>
    </Section>
  );
}
