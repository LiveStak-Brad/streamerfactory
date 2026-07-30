import Link from "next/link";

import {
  BattleHubMemberActivity,
  type BattleHubMemberActivityProps,
} from "@/components/battle-hub/BattleHubMemberActivity";
import { BattleHubFlyerTemplateShowcase } from "@/components/battle-hub/BattleHubFlyerTemplateShowcase";
import { BattleHubTrainingGuidance } from "@/components/guidance/BattleHubTrainingGuidance";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

type Props = {
  /** First-run members who have not finished / dismissed onboarding. */
  showOnboardingNudge?: boolean;
  activity: BattleHubMemberActivityProps;
};

export function BattleHubMemberHome({ showOnboardingNudge = false, activity }: Props) {
  return (
    <div className="relative border-b border-border/70 bg-muted-bg/30 pb-20 pt-8 dark:border-zinc-800 dark:bg-zinc-950/40 sm:pt-10">
      <Container className="relative max-w-6xl">
        {showOnboardingNudge ? (
          <div className="mb-8 rounded-2xl border border-accent/30 bg-accent/5 px-4 py-4 dark:border-accent/40 dark:bg-accent/10 sm:px-6 sm:py-5">
            <p className="text-sm font-semibold text-foreground">Finish your Factory onboarding</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              A few checklist steps unlock the full member experience — training, battles, and rankings that
              know who you are.
            </p>
            <Link
              href="/member/onboarding"
              className="mt-3 inline-flex min-h-[44px] items-center text-sm font-semibold text-accent hover:underline dark:text-accent-muted"
            >
              Open checklist →
            </Link>
          </div>
        ) : null}

        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0b0a12] px-5 py-8 text-zinc-50 sm:px-8 sm:py-10">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_90%_0%,rgba(255, 46, 209,0.28),transparent_55%),radial-gradient(ellipse_50%_50%_at_0%_40%,rgba(91, 59, 255,0.3),transparent_50%)]"
            aria-hidden
          />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-fuchsia-300/90">
                Creator events
              </p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">Battle Hub</h1>
              <p className="mt-4 text-lg leading-relaxed text-zinc-400">
                Matchups, schedules, and flyers for the network — feel the scene, not a spreadsheet.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button href="/battle-hub/scheduler/new" variant="primary" className="min-h-[48px] px-6">
                  Schedule a battle
                </Button>
                <Button href="/battle-hub/finder" variant="secondaryOnDark" className="min-h-[48px] px-6">
                  Battle Finder
                </Button>
                <Button href="/battle-hub/calendar" variant="secondaryOnDark" className="min-h-[48px] px-6">
                  Calendar
                </Button>
              </div>
            </div>
            <p className="text-sm text-zinc-500 lg:max-w-xs lg:text-right">
              <Link href="/member/dashboard" className="font-semibold text-zinc-300 hover:text-white">
                Dashboard
              </Link>
              {" · "}
              <Link href="/streameru" className="font-semibold text-zinc-300 hover:text-white">
                StreamerU
              </Link>
            </p>
          </div>
        </section>

        <div className="mt-8">
          <BattleHubTrainingGuidance />
        </div>

        <BattleHubMemberActivity {...activity} />

        <BattleHubFlyerTemplateShowcase
          className="mt-16 border-t border-border/80 pt-14 dark:border-zinc-800/80"
          heading="Flyer preview (example)"
        />
      </Container>
    </div>
  );
}
