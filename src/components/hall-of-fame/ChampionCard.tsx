import { CreatorAvatar } from "@/components/members/CreatorAvatar";
import { AchievementBadge } from "@/components/ui/AchievementBadge";
import { RankBadge } from "@/components/ui/RankBadge";
import {
  formatYearMonthLabel,
  placementLabel,
  placementMedal,
} from "@/lib/hall-of-fame/months";
import type { HallOfFamePlacement } from "@/lib/hall-of-fame/types";
import { memberProfileUrl } from "@/lib/members/network-members";

type ChampionCardProps = {
  placement: HallOfFamePlacement;
  yearMonth: string;
  featured?: boolean;
  provisional?: boolean;
};

export function ChampionCard({
  placement,
  yearMonth,
  featured = true,
  provisional = false,
}: ChampionCardProps) {
  const handle = placement.tiktokUsername.replace(/^@/, "");
  const url = memberProfileUrl(handle);
  const monthLabel = formatYearMonthLabel(yearMonth);

  const card = (
    <article
      className={`relative overflow-hidden rounded-3xl border text-center ${
        featured
          ? "border-amber-300/40 bg-gradient-to-b from-amber-400/20 via-white/[0.05] to-transparent px-6 py-8 shadow-[0_0_48px_-12px_rgba(251,191,36,0.35)] sm:px-8 sm:py-10"
          : "border-white/10 bg-white/[0.04] px-5 py-6"
      }`}
    >
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-amber-400/10 blur-3xl"
        aria-hidden
      />
      <p className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-amber-200/90">
        {provisional ? "Live standings" : "Hall of Fame"} · {monthLabel}
      </p>
      <div className="mt-4 flex items-center justify-center gap-2">
        <span className="text-2xl" aria-hidden>
          {placementMedal(placement.place)}
        </span>
        <RankBadge rank={placement.place} size={featured ? "lg" : "md"} />
      </div>
      <p className="mt-3 text-sm font-bold uppercase tracking-[0.16em] text-amber-100">
        {placementLabel(placement.place)}
      </p>
      <div className="mt-5 flex justify-center">
        <CreatorAvatar
          username={handle}
          preferredImageUrl={placement.avatarUrl}
          fallbackBackdropClass="bg-gradient-to-br from-amber-400 to-orange-500"
          fallbackInitial={(placement.displayName[0] || handle[0] || "?").toUpperCase()}
          className={featured ? "h-24 w-24 ring-2 ring-amber-300/40" : "h-16 w-16"}
          priority={featured}
        />
      </div>
      <h3 className="mt-5 truncate text-2xl font-bold tracking-tight text-white sm:text-3xl">
        {placement.displayName}
      </h3>
      <p className="mt-1 truncate text-base text-zinc-400">@{handle}</p>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        <AchievementBadge badge={placement.badge} size="sm" />
        {placement.networkLevel != null ? (
          <span className="rounded-lg border border-white/15 bg-white/5 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-zinc-200">
            Level {placement.networkLevel}
          </span>
        ) : null}
      </div>
      {provisional ? (
        <p className="mt-4 text-xs text-zinc-500">Provisional — locks at month end</p>
      ) : null}
    </article>
  );

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block transition-transform hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 motion-reduce:transform-none"
      aria-label={`Open @${handle} on TikTok`}
    >
      {card}
    </a>
  );
}
