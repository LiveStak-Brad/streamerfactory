import type { ReactNode } from "react";

import { BattleFlyerPreview } from "@/components/battle-hub/BattleFlyerPreview";

const sharedWhen = new Date().toISOString();

/** Same four handles so FFA vs 2v2 differ only by layout. */
const demoFourHandles = ["nova_live", "echo_pk", "blaze_tt", "skyline_tv"];

const ffaParticipants = demoFourHandles.map((username) => ({ username, team: null as string | null }));

const twov2Participants = demoFourHandles.map((username, i) => ({
  username,
  team: i < 2 ? "A" : "B",
}));

const oneVoneParticipants = demoFourHandles.slice(0, 2).map((username) => ({
  username,
  team: null as string | null,
}));

const demoBase = {
  title: "Friday Night LIVE",
  eventType: "battle" as const,
  scheduledAt: sharedWhen,
  timezone: "UTC",
};

type Props = {
  /** Shorter heading for the locked / marketing page */
  heading?: string;
  intro?: ReactNode;
  className?: string;
};

export function BattleHubFlyerTemplateShowcase({
  heading = "Battle advertisement templates",
  intro,
  className = "",
}: Props) {
  return (
    <section className={className}>
      <h2 className="text-lg font-bold text-zinc-950 dark:text-zinc-50">{heading}</h2>
      {intro ?? (
        <p className="mt-2 max-w-3xl text-sm text-zinc-600 dark:text-zinc-400">
          Each layout uses a 9:16 story-style frame (same outer size). Two creators get a 1v1 duel; four
          creators can be free-for-all or 2v2—the four-person examples use the same handles so only the layout
          changes.
        </p>
      )}

      <div className="mt-10 grid grid-cols-1 items-start gap-10 md:grid-cols-2 xl:grid-cols-3 xl:gap-8">
        <article className="flex min-w-0 flex-col">
          <h3 className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
            1v1
          </h3>
          <p className="mb-4 text-xs text-zinc-500 dark:text-zinc-500">Head-to-head with a VS between two creators.</p>
          <div className="min-w-0">
            <BattleFlyerPreview
              {...demoBase}
              formatLabel="1v1"
              participantCount={2}
              participants={oneVoneParticipants}
              hideLayoutSwitcher
              variant="story"
            />
          </div>
        </article>

        <article className="flex min-w-0 flex-col">
          <h3 className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
            Free-for-all
          </h3>
          <p className="mb-4 text-xs text-zinc-500 dark:text-zinc-500">Four avatars in a grid—no teams.</p>
          <div className="min-w-0">
            <BattleFlyerPreview
              {...demoBase}
              formatLabel="free-for-all"
              participantCount={4}
              participants={ffaParticipants}
              hideLayoutSwitcher
              variant="story"
            />
          </div>
        </article>

        <article className="flex min-w-0 flex-col">
          <h3 className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
            2v2
          </h3>
          <p className="mb-4 text-xs text-zinc-500 dark:text-zinc-500">Two teams of two with Team A / Team B columns.</p>
          <div className="min-w-0">
            <BattleFlyerPreview
              {...demoBase}
              formatLabel="2v2"
              participantCount={4}
              participants={twov2Participants}
              hideLayoutSwitcher
              variant="story"
            />
          </div>
        </article>
      </div>
    </section>
  );
}
