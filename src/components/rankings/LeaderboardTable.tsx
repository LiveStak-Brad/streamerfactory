import { BackstageAvatar } from "@/components/members/BackstageAvatar";
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

function badgeClass(badge: ReturnType<typeof rankingBadge>): string {
  switch (badge) {
    case "Factory Champion":
      return "bg-amber-100 text-amber-950 ring-amber-300/60 dark:bg-amber-950/50 dark:text-amber-100 dark:ring-amber-700/50";
    case "Elite Creator":
      return "bg-violet-100 text-violet-950 ring-violet-300/60 dark:bg-violet-950/50 dark:text-violet-100 dark:ring-violet-700/50";
    case "Rising Star":
      return "bg-sky-100 text-sky-950 ring-sky-300/60 dark:bg-sky-950/50 dark:text-sky-100 dark:ring-sky-700/50";
    case "Active Member":
      return "bg-emerald-100 text-emerald-950 ring-emerald-300/60 dark:bg-emerald-950/50 dark:text-emerald-100 dark:ring-emerald-700/50";
    default:
      return "bg-zinc-100 text-zinc-700 ring-zinc-300/60 dark:bg-zinc-800 dark:text-zinc-300 dark:ring-zinc-600/50";
  }
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
};

export function LeaderboardTable({
  entries,
  highlightProfileId,
  highlightTiktokHandle,
}: LeaderboardTableProps) {
  if (entries.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-300/90 bg-muted-bg/40 px-6 py-16 text-center dark:border-zinc-700 dark:bg-zinc-950/40">
        <p className="font-semibold text-zinc-800 dark:text-zinc-200">No rankings yet</p>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Rankings will appear after the latest Creator Network snapshot is loaded.
        </p>
      </div>
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

        const cardClass = `block rounded-2xl border bg-surface/90 p-4 shadow-sm outline-none ring-accent/0 transition dark:bg-zinc-950/65 sm:p-5 ${
          isYou
            ? "border-accent/50 ring-2 ring-accent/20 dark:border-accent/40"
            : "border-zinc-200/90 dark:border-zinc-800"
        }${
          profileUrl
            ? " hover:-translate-y-0.5 hover:border-accent/35 hover:shadow-[0_12px_40px_-12px_var(--accent-glow)] focus-visible:ring-4 focus-visible:ring-accent/20 dark:hover:border-accent/30"
            : ""
        }`;

        const cardBody = (
          <>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex min-w-0 flex-1 items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-zinc-900 text-lg font-bold text-white dark:bg-zinc-100 dark:text-zinc-900">
                  {e.rank_position ?? "—"}
                </div>
                {handle ? (
                  <BackstageAvatar
                    backstageImageUrl={e.avatar_url}
                    fallbackBackdropClass={backdrop}
                    fallbackInitial={avatarInitial(handle, e.email)}
                    className="h-14 w-14"
                  />
                ) : (
                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-lg font-bold text-white ${backdrop}`}
                  >
                    {avatarInitial(handle, e.email)}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-zinc-950 dark:text-zinc-50">
                    {handle ? displayLabelForHandle(handle) : e.email ?? "Member"}
                    {handle ? (
                      <span className="ml-1 font-normal text-zinc-500 dark:text-zinc-400">@{handle}</span>
                    ) : null}
                    {isYou ? (
                      <span className="ml-2 text-xs font-bold uppercase tracking-wider text-accent dark:text-accent-muted">
                        You
                      </span>
                    ) : null}
                  </p>
                  <span
                    className={`mt-1 inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${badgeClass(badge)}`}
                  >
                    {badge === "Factory Champion" && e.rank_position === 1
                      ? "#1 Factory Champion"
                      : badge === "Elite Creator"
                        ? "Top 3 Elite Creator"
                        : badge === "Rising Star"
                          ? "Top 10 Rising Star"
                          : badge}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4 sm:gap-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">Score</p>
                  <p className="font-bold text-zinc-900 dark:text-zinc-100">{e.rank_score.toFixed(1)}</p>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">Diamonds</p>
                  <p className="font-semibold text-zinc-800 dark:text-zinc-200">
                    {formatDiamondsEarned(e.coins_earned)}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">Hours</p>
                  <p className="font-semibold text-zinc-800 dark:text-zinc-200">
                    {Number(e.hours_streamed).toFixed(1)}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">Days</p>
                  <p className="font-semibold text-zinc-800 dark:text-zinc-200">{e.days_streamed}</p>
                </div>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-500 dark:text-zinc-400">
              <span>
                Activeness: <span className="font-medium capitalize text-zinc-700 dark:text-zinc-300">{e.activeness_level}</span>
              </span>
              {e.follower_growth !== 0 ? (
                <span>
                  Follower growth:{" "}
                  <span className="font-medium text-zinc-700 dark:text-zinc-300">
                    {e.follower_growth > 0 ? "+" : ""}
                    {formatNum(e.follower_growth)}
                  </span>
                </span>
              ) : null}
              {e.battles_played > 0 ? (
                <span>
                  Battles:{" "}
                  <span className="font-medium text-zinc-700 dark:text-zinc-300">
                    {e.battles_won}/{e.battles_played} won
                  </span>
                </span>
              ) : null}
            </div>
          </>
        );

        return (
          <li key={e.profile_id}>
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
