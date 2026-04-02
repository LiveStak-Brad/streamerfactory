import Link from "next/link";

import {
  BattleHubMemberActivity,
  type BattleHubMemberActivityProps,
} from "@/components/battle-hub/BattleHubMemberActivity";
import { BattleHubFlyerTemplateShowcase } from "@/components/battle-hub/BattleHubFlyerTemplateShowcase";
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
            <p className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">Finish getting started</p>
            <p className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Complete the short member checklist — profile, resources, battles, and calendar — so you get the
              most from the network.
            </p>
            <Link
              href="/welcome"
              className="mt-3 inline-flex text-sm font-semibold text-accent hover:underline dark:text-accent-muted"
            >
              Open welcome checklist →
            </Link>
          </div>
        ) : null}
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

        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          <span className="font-semibold text-zinc-500 dark:text-zinc-400">Guides:</span>
          <Link
            href="/resources#battles"
            className="font-semibold text-accent hover:underline dark:text-accent-muted"
          >
            Battle strategy
          </Link>
          <Link
            href="/resources/structure-your-first-battle-week"
            className="font-semibold text-zinc-700 hover:text-accent dark:text-zinc-300 dark:hover:text-accent-muted"
          >
            First battle week
          </Link>
          <Link
            href="/resources/promote-your-battles-without-spamming"
            className="font-semibold text-zinc-700 hover:text-accent dark:text-zinc-300 dark:hover:text-accent-muted"
          >
            Promoting battles
          </Link>
        </div>

        <BattleHubMemberActivity {...activity} />

        <BattleHubFlyerTemplateShowcase
          className="mt-16 border-t border-zinc-200/80 pt-14 dark:border-zinc-800/80"
          heading="Flyer preview (example)"
        />
      </Container>
    </div>
  );
}
