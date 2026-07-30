import { CreatorAvatar } from "@/components/members/CreatorAvatar";
import { AchievementBadge } from "@/components/ui/AchievementBadge";
import { RankBadge } from "@/components/ui/RankBadge";
import { memberProfileUrl } from "@/lib/members/network-members";
import { formatDiamondsEarned } from "@/lib/rankings/diamonds";
import { displayLabelForHandle } from "@/lib/rankings/leaderboard-from-seed";
import { rankingBadge } from "@/lib/rankings/scoring";
import type { LeaderboardEntry } from "@/lib/rankings/types";

type RankingsPodiumProps = {
  entries: LeaderboardEntry[];
  highlightProfileId?: string | null;
  highlightTiktokHandle?: string | null;
};

function normalizeHandle(raw: string | null | undefined): string {
  return (raw ?? "").replace(/^@+/, "").trim().toLowerCase();
}

function avatarTone(rank: number): string {
  if (rank === 1) return "bg-gradient-to-br from-amber-400 to-orange-500";
  if (rank === 2) return "bg-gradient-to-br from-zinc-300 to-zinc-500";
  return "bg-gradient-to-br from-orange-400 to-amber-700";
}

/** Desktop podium column order: 2nd · 1st · 3rd */
function podiumOrderClass(rank: number): string {
  if (rank === 1) return "sm:order-2 sm:-translate-y-3";
  if (rank === 2) return "sm:order-1";
  if (rank === 3) return "sm:order-3";
  return "";
}

/**
 * Top-three celebration layout. Requires at least one real entry; does not invent ranks.
 */
export function RankingsPodium({
  entries,
  highlightProfileId,
  highlightTiktokHandle,
}: RankingsPodiumProps) {
  const top = entries.slice(0, 3);
  if (top.length === 0) return null;

  return (
    <ol className="mx-auto grid max-w-4xl grid-cols-1 items-end gap-4 sm:grid-cols-3 sm:gap-5">
      {top.map((entry) => {
        const rank = entry.rank_position ?? 0;
        const handle = entry.tiktok_username?.replace(/^@/, "") || null;
        const badge = rankingBadge(entry.rank_position, true);
        const isFirst = rank === 1;
        const isYou =
          (highlightProfileId != null && highlightProfileId === entry.profile_id) ||
          (highlightTiktokHandle != null &&
            normalizeHandle(entry.tiktok_username) === normalizeHandle(highlightTiktokHandle));
        const profileUrl = handle ? memberProfileUrl(handle) : null;
        const display = handle ? displayLabelForHandle(handle) : entry.email ?? "Creator";

        const card = (
          <div
            className={`relative flex h-full flex-col items-center rounded-3xl border px-4 py-6 text-center sm:px-5 ${
              isFirst
                ? "border-amber-300/40 bg-gradient-to-b from-amber-400/20 via-white/[0.04] to-transparent sm:py-8"
                : "border-white/10 bg-white/[0.04]"
            } ${isYou ? "ring-2 ring-accent/40" : ""}`}
          >
            {isFirst ? (
              <span className="mb-3 rounded-full border border-amber-300/40 bg-amber-400/15 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-amber-100">
                Factory Champion
              </span>
            ) : null}
            <RankBadge rank={rank || 1} size={isFirst ? "lg" : "md"} />
            <div className="mt-4">
              <CreatorAvatar
                username={handle ?? "creator"}
                preferredImageUrl={entry.avatar_url}
                fallbackBackdropClass={avatarTone(rank)}
                fallbackInitial={(handle?.[0] || "?").toUpperCase()}
                className={isFirst ? "h-20 w-20" : "h-16 w-16"}
              />
            </div>
            <p className="mt-4 w-full truncate text-base font-bold text-white sm:text-lg">{display}</p>
            {handle ? <p className="mt-0.5 w-full truncate text-sm text-zinc-400">@{handle}</p> : null}
            {isYou ? (
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-accent-muted">You</p>
            ) : null}
            <div className="mt-3">
              <AchievementBadge badge={badge} size="sm" />
            </div>
            <dl className="mt-5 grid w-full grid-cols-3 gap-2 border-t border-white/10 pt-4 text-center">
              <div>
                <dt className="text-[0.6rem] font-bold uppercase tracking-wider text-zinc-500">Score</dt>
                <dd className="mt-0.5 text-sm font-bold text-white tabular-nums">
                  {entry.rank_score.toFixed(1)}
                </dd>
              </div>
              <div>
                <dt className="text-[0.6rem] font-bold uppercase tracking-wider text-zinc-500">Diamonds</dt>
                <dd className="mt-0.5 text-sm font-bold text-white tabular-nums">
                  {formatDiamondsEarned(entry.coins_earned)}
                </dd>
              </div>
              <div>
                <dt className="text-[0.6rem] font-bold uppercase tracking-wider text-zinc-500">Hours</dt>
                <dd className="mt-0.5 text-sm font-bold text-white tabular-nums">
                  {Number(entry.hours_streamed).toFixed(0)}
                </dd>
              </div>
            </dl>
            <p className="mt-2 text-xs text-zinc-500">{entry.days_streamed} active days</p>
          </div>
        );

        return (
          <li key={entry.profile_id} className={podiumOrderClass(rank)}>
            {profileUrl ? (
              <a
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full transition-transform hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:transform-none"
                aria-label={`Open @${handle} on TikTok`}
              >
                {card}
              </a>
            ) : (
              card
            )}
          </li>
        );
      })}
    </ol>
  );
}
