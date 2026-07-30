import { CreatorAvatar } from "@/components/members/CreatorAvatar";
import { AchievementBadge } from "@/components/ui/AchievementBadge";
import { EmptyState } from "@/components/ui/EmptyState";
import { RankBadge } from "@/components/ui/RankBadge";
import { memberProfileUrl } from "@/lib/members/network-members";
import { formatDiamondsEarned } from "@/lib/rankings/diamonds";
import { displayLabelForHandle } from "@/lib/rankings/leaderboard-from-seed";
import { rankingBadge } from "@/lib/rankings/scoring";
import type { LeaderboardEntry } from "@/lib/rankings/types";

const AVATAR_BACKDROPS = [
  "bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500",
  "bg-gradient-to-br from-sky-500 to-blue-600",
  "bg-gradient-to-br from-emerald-500 to-teal-600",
  "bg-gradient-to-br from-amber-500 to-orange-600",
  "bg-gradient-to-br from-rose-500 to-pink-600",
] as const;

function avatarInitial(handle: string | null, email: string | null): string {
  const raw = (handle ?? email ?? "?").replace(/^@+/, "").trim();
  const ch = raw[0];
  if (!ch) return "?";
  return /[a-z]/i.test(ch) ? ch.toUpperCase() : ch;
}

function formatNum(n: number): string {
  return new Intl.NumberFormat("en-US").format(n);
}

function normalizeHandle(raw: string | null | undefined): string {
  return (raw ?? "").replace(/^@+/, "").trim().toLowerCase();
}

type LeaderboardTableProps = {
  entries: LeaderboardEntry[];
  highlightProfileId?: string | null;
  /** When the board uses TikTok handles as ids, match the signed-in member by @handle. */
  highlightTiktokHandle?: string | null;
  /** Add id anchors for jump-to-rank links */
  showRankAnchor?: boolean;
};

export function LeaderboardTable({
  entries,
  highlightProfileId,
  highlightTiktokHandle,
  showRankAnchor = false,
}: LeaderboardTableProps) {
  if (entries.length === 0) {
    return (
      <EmptyState
        title="No rankings yet"
        description="Rankings will appear after the latest Creator Network snapshot is loaded."
        className="py-12 text-center items-center"
      />
    );
  }

  return (
    <ul className="space-y-3">
      {entries.map((e, index) => {
        const handle = e.tiktok_username?.replace(/^@/, "") ?? null;
        const badge = rankingBadge(e.rank_position, true);
        const backdrop = AVATAR_BACKDROPS[index % AVATAR_BACKDROPS.length];
        const entryHandle = normalizeHandle(e.tiktok_username);
        const isYou =
          (highlightProfileId != null && highlightProfileId === e.profile_id) ||
          (highlightTiktokHandle != null && entryHandle === normalizeHandle(highlightTiktokHandle));
        const profileUrl = handle ? memberProfileUrl(handle) : null;
        const anchorId = showRankAnchor
          ? `rank-${e.profile_id || entryHandle || index}`
          : undefined;
        const rank = e.rank_position ?? index + 1;

        const cardClass = `block rounded-2xl border bg-surface/95 p-4 shadow-sm outline-none transition dark:bg-zinc-950/70 sm:p-5 ${
          isYou
            ? "border-accent/50 ring-2 ring-accent/20 dark:border-accent/40"
            : "border-border/80 dark:border-zinc-800"
        }${
          profileUrl
            ? " hover:-translate-y-0.5 hover:border-accent/35 hover:shadow-[0_12px_40px_-12px_var(--accent-glow)] focus-visible:ring-4 focus-visible:ring-accent/20 motion-reduce:transform-none dark:hover:border-accent/30"
            : ""
        }`;

        const cardBody = (
          <>
            <div className="flex flex-col gap-4">
              <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                <RankBadge rank={rank} size="md" />
                <CreatorAvatar
                  username={handle ?? "creator"}
                  preferredImageUrl={e.avatar_url}
                  fallbackBackdropClass={backdrop}
                  fallbackInitial={avatarInitial(handle, e.email)}
                  className="h-12 w-12 sm:h-14 sm:w-14"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-base font-semibold text-foreground">
                    {handle ? displayLabelForHandle(handle) : e.email ?? "Member"}
                    {isYou ? (
                      <span className="ml-2 text-xs font-bold uppercase tracking-wider text-accent dark:text-accent-muted">
                        You
                      </span>
                    ) : null}
                  </p>
                  {handle ? (
                    <p className="truncate text-sm text-muted">@{handle}</p>
                  ) : null}
                  <div className="mt-1.5">
                    <AchievementBadge badge={badge} size="sm" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
                <div className="rounded-xl bg-muted-bg/70 px-3 py-2 dark:bg-zinc-900/70">
                  <p className="text-[0.65rem] font-bold uppercase tracking-wider text-muted">Score</p>
                  <p className="mt-0.5 text-base font-bold tabular-nums text-foreground">
                    {e.rank_score.toFixed(1)}
                  </p>
                </div>
                <div className="rounded-xl bg-muted-bg/70 px-3 py-2 dark:bg-zinc-900/70">
                  <p className="text-[0.65rem] font-bold uppercase tracking-wider text-muted">Diamonds</p>
                  <p className="mt-0.5 text-base font-bold tabular-nums text-foreground">
                    {formatDiamondsEarned(e.coins_earned)}
                  </p>
                </div>
                <div className="rounded-xl bg-muted-bg/70 px-3 py-2 dark:bg-zinc-900/70">
                  <p className="text-[0.65rem] font-bold uppercase tracking-wider text-muted">Hours</p>
                  <p className="mt-0.5 text-base font-bold tabular-nums text-foreground">
                    {Number(e.hours_streamed).toFixed(1)}
                  </p>
                </div>
                <div className="rounded-xl bg-muted-bg/70 px-3 py-2 dark:bg-zinc-900/70">
                  <p className="text-[0.65rem] font-bold uppercase tracking-wider text-muted">Days</p>
                  <p className="mt-0.5 text-base font-bold tabular-nums text-foreground">{e.days_streamed}</p>
                </div>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
              <span>
                Activeness:{" "}
                <span className="font-medium capitalize text-foreground/80">{e.activeness_level}</span>
              </span>
              {e.follower_growth !== 0 ? (
                <span>
                  Follower growth:{" "}
                  <span className="font-medium text-foreground/80">
                    {e.follower_growth > 0 ? "+" : ""}
                    {formatNum(e.follower_growth)}
                  </span>
                </span>
              ) : null}
              {e.battles_played > 0 ? (
                <span>
                  Battles:{" "}
                  <span className="font-medium text-foreground/80">
                    {e.battles_won}/{e.battles_played} won
                  </span>
                </span>
              ) : null}
            </div>
          </>
        );

        return (
          <li key={e.profile_id} id={anchorId}>
            {profileUrl ? (
              <a
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`group ${cardClass}`}
                aria-label={`Open @${handle} on TikTok`}
              >
                {cardBody}
                <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-accent dark:text-accent-muted">
                  <span>Open in TikTok</span>
                  <span
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                    aria-hidden
                  >
                    →
                  </span>
                </span>
              </a>
            ) : (
              <div className={cardClass}>{cardBody}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
