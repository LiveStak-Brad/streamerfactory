import Link from "next/link";

import {
  BattleHubMemberActivity,
  type BattleHubMemberActivityProps,
} from "@/components/battle-hub/BattleHubMemberActivity";
import { BattleHubFlyerTemplateShowcase } from "@/components/battle-hub/BattleHubFlyerTemplateShowcase";
import { BattleHubTrainingGuidance } from "@/components/guidance/BattleHubTrainingGuidance";
import { Container } from "@/components/ui/Container";

type Props = {
  /** First-run members who have not finished / dismissed onboarding. */
  showOnboardingNudge?: boolean;
  activity: BattleHubMemberActivityProps;
};

export function BattleHubMemberHome({ showOnboardingNudge = false, activity }: Props) {
  return (
    <div className="relative pb-24 pt-14 sm:pt-20">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[min(420px,65vh)] bg-[radial-gradient(ellipse_80%_55%_at_50%_-10%,rgba(99,102,241,0.14),transparent_65%)]"
        aria-hidden
      />
      <Container className="relative max-w-6xl">
        {showOnboardingNudge ? (
          <div className="mb-8 rounded-2xl border border-accent/30 bg-accent/5 px-4 py-4 dark:border-accent/40 dark:bg-accent/10 sm:px-6 sm:py-5">
            <p className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">Finish your StreamerU setup</p>
            <p className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              You haven&apos;t marked onboarding complete yet — when you have a moment, continue training in StreamerU
              and work through the course in order.
            </p>
            <Link
              href="/streameru"
              className="mt-3 inline-flex text-sm font-semibold text-accent hover:underline dark:text-accent-muted"
            >
              Open StreamerU →
            </Link>
          </div>
        ) : null}

        <BattleHubTrainingGuidance />

        <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent dark:text-accent-muted">
          Network tools
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-5xl">
          Battle Hub
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          See what&apos;s next on the network calendar, schedule battles, and share polished flyers — one place
          for TikTok LIVE creators to coordinate.
        </p>

        <p className="mt-6 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Quick links — optional anytime:{" "}
          <Link
            href="/member/dashboard"
            className="font-semibold text-zinc-700 hover:text-accent dark:text-zinc-300 dark:hover:text-accent-muted"
          >
            Member dashboard
          </Link>
          <span className="text-zinc-400 dark:text-zinc-600" aria-hidden>
            {" "}
            ·{" "}
          </span>
          <Link href="/streameru" className="font-semibold text-accent hover:underline dark:text-accent-muted">
            StreamerU hub
          </Link>
          <span className="text-zinc-400 dark:text-zinc-600" aria-hidden>
            {" "}
            ·{" "}
          </span>
          <Link
            href="/streameru/understanding-battles"
            className="font-semibold text-zinc-700 hover:text-accent dark:text-zinc-300 dark:hover:text-accent-muted"
          >
            Battles lessons
          </Link>
          <span className="text-zinc-400 dark:text-zinc-600" aria-hidden>
            {" "}
            ·{" "}
          </span>
          <Link
            href="/streameru/promote-your-battles-without-spamming"
            className="font-semibold text-zinc-700 hover:text-accent dark:text-zinc-300 dark:hover:text-accent-muted"
          >
            Promoting battles
          </Link>
        </p>

        <BattleHubMemberActivity {...activity} />

        <BattleHubFlyerTemplateShowcase
          className="mt-16 border-t border-zinc-200/80 pt-14 dark:border-zinc-800/80"
          heading="Flyer preview (example)"
        />
      </Container>
    </div>
  );
}
