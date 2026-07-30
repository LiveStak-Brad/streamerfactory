import Link from "next/link";
import { CreatorAvatar } from "@/components/members/CreatorAvatar";
import { Button } from "@/components/ui/Button";
import { RankBadge } from "@/components/ui/RankBadge";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { LeaderboardEntry } from "@/lib/rankings/types";

type HomeRankingPreviewProps = {
  entries: LeaderboardEntry[];
  totalCount: number;
};

function fallbackInitial(name: string): string {
  const cleaned = name.replace(/[^\p{L}\p{N}]/gu, "").trim();
  return (cleaned[0] || "?").toUpperCase();
}

function avatarTone(index: number): string {
  const tones = [
    "bg-gradient-to-br from-amber-400 to-orange-500",
    "bg-gradient-to-br from-zinc-300 to-zinc-500",
    "bg-gradient-to-br from-orange-400 to-amber-700",
    "bg-gradient-to-br from-indigo-500 to-violet-600",
    "bg-gradient-to-br from-fuchsia-500 to-pink-600",
  ];
  return tones[index % tones.length];
}

export function HomeRankingPreview({ entries, totalCount }: HomeRankingPreviewProps) {
  const top = entries.slice(0, 5);
  const podium = top.slice(0, 3);
  const rest = top.slice(3);

  if (top.length === 0) {
    return null;
  }

  const orderedPodium = [podium[1], podium[0], podium[2]].filter(Boolean) as LeaderboardEntry[];

  return (
    <Section id="rankings-preview" variant="inverse" className="!py-16 sm:!py-20">
      <SectionHeader
        tone="inverse"
        eyebrow="Competition"
        title="Climb the factory rankings"
        description="Monthly diamonds, stream hours, and activeness from TikTok Creator Network — the same board members see inside the platform."
        action={
          <Button href="/rankings" variant="inverse" className="min-h-[48px] px-7">
            Open full leaderboard
          </Button>
        }
      />

      {podium.length >= 3 ? (
        <ol className="mx-auto mt-14 grid max-w-3xl grid-cols-3 items-end gap-3 sm:gap-5">
          {orderedPodium.map((entry) => {
            const rank = entry.rank_position ?? 0;
            const handle = entry.tiktok_username?.replace(/^@/, "") || "creator";
            const isFirst = rank === 1;
            return (
              <li
                key={entry.profile_id || handle}
                className={`relative rounded-2xl border px-3 py-5 text-center sm:px-4 sm:py-6 ${
                  isFirst
                    ? "border-amber-300/35 bg-gradient-to-b from-amber-400/20 to-white/[0.03] pb-8 sm:pb-10"
                    : "border-white/10 bg-white/[0.04]"
                }`}
              >
                <div className="mx-auto mb-3 flex justify-center">
                  <RankBadge rank={rank} size={isFirst ? "lg" : "md"} />
                </div>
                <div className="mx-auto mb-3 flex justify-center">
                  <CreatorAvatar
                    username={handle}
                    preferredImageUrl={entry.avatar_url}
                    fallbackBackdropClass={avatarTone(rank - 1)}
                    fallbackInitial={fallbackInitial(handle)}
                    className={isFirst ? "h-16 w-16" : "h-12 w-12"}
                  />
                </div>
                <p className="truncate text-sm font-bold text-white sm:text-base">@{handle}</p>
                <p className="mt-1 text-xs text-zinc-400 sm:text-sm">
                  {entry.coins_earned.toLocaleString()} ◆
                </p>
              </li>
            );
          })}
        </ol>
      ) : null}

      {rest.length > 0 ? (
        <ul className="mx-auto mt-8 max-w-2xl space-y-2">
          {rest.map((entry, index) => {
            const rank = entry.rank_position ?? index + 4;
            const handle = entry.tiktok_username?.replace(/^@/, "") || "creator";
            return (
              <li
                key={entry.profile_id || handle}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5"
              >
                <RankBadge rank={rank} size="sm" />
                <CreatorAvatar
                  username={handle}
                  preferredImageUrl={entry.avatar_url}
                  fallbackBackdropClass={avatarTone(rank)}
                  fallbackInitial={fallbackInitial(handle)}
                  className="h-9 w-9"
                />
                <p className="min-w-0 flex-1 truncate text-sm font-semibold text-white">@{handle}</p>
                <p className="shrink-0 text-xs font-medium text-zinc-400">
                  {entry.coins_earned.toLocaleString()}
                </p>
              </li>
            );
          })}
        </ul>
      ) : null}

      <p className="mt-8 text-center text-sm text-zinc-500">
        Showing top {top.length} of {totalCount}.{" "}
        <Link href="/rankings" className="font-semibold text-zinc-300 underline-offset-2 hover:text-white hover:underline">
          See all creators →
        </Link>
      </p>
    </Section>
  );
}
