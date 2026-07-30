import { CreatorAvatar } from "@/components/members/CreatorAvatar";
import { AchievementBadge } from "@/components/ui/AchievementBadge";
import { RankBadge } from "@/components/ui/RankBadge";
import { placementLabel, placementMedal } from "@/lib/hall-of-fame/months";
import type { HallOfFamePlacement } from "@/lib/hall-of-fame/types";
import { memberProfileUrl } from "@/lib/members/network-members";

const PLACE_TONE: Record<number, string> = {
  2: "border-zinc-300/30 bg-gradient-to-b from-zinc-200/10 to-transparent",
  3: "border-orange-400/30 bg-gradient-to-b from-orange-500/10 to-transparent",
  4: "border-white/10 bg-white/[0.04]",
  5: "border-white/10 bg-white/[0.04]",
};

type RunnerUpCardProps = {
  placement: HallOfFamePlacement;
};

export function RunnerUpCard({ placement }: RunnerUpCardProps) {
  const handle = placement.tiktokUsername.replace(/^@/, "");
  const url = memberProfileUrl(handle);
  const tone = PLACE_TONE[placement.place] ?? PLACE_TONE[5];

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex h-full flex-col rounded-2xl border p-4 transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:transform-none sm:p-5 ${tone}`}
      aria-label={`Open @${handle} on TikTok`}
    >
      <div className="flex items-center gap-3">
        <span className="text-lg" aria-hidden>
          {placementMedal(placement.place)}
        </span>
        <RankBadge rank={placement.place} size="sm" />
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-zinc-400">
          {placementLabel(placement.place)}
        </p>
      </div>
      <div className="mt-4 flex items-center gap-3">
        <CreatorAvatar
          username={handle}
          preferredImageUrl={placement.avatarUrl}
          fallbackBackdropClass="bg-gradient-to-br from-zinc-400 to-zinc-600"
          fallbackInitial={(placement.displayName[0] || handle[0] || "?").toUpperCase()}
          className="h-12 w-12"
          priority
        />
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-white">{placement.displayName}</p>
          <p className="truncate text-sm text-zinc-400">@{handle}</p>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <AchievementBadge badge={placement.badge} size="sm" />
        {placement.networkLevel != null ? (
          <span className="rounded-lg border border-white/10 bg-white/5 px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.12em] text-zinc-300">
            Level {placement.networkLevel}
          </span>
        ) : null}
      </div>
    </a>
  );
}
