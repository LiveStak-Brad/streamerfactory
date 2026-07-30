import { CreatorAvatar } from "@/components/members/CreatorAvatar";
import { AchievementBadge } from "@/components/ui/AchievementBadge";
import { RankBadge } from "@/components/ui/RankBadge";
import { memberProfileUrl } from "@/lib/members/network-members";
import type { RankingBadge } from "@/lib/rankings/types";

const AVATAR_BACKDROPS = [
  "bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500",
  "bg-gradient-to-br from-sky-500 to-blue-600",
  "bg-gradient-to-br from-emerald-500 to-teal-600",
  "bg-gradient-to-br from-amber-500 to-orange-600",
  "bg-gradient-to-br from-rose-500 to-pink-600",
  "bg-gradient-to-br from-cyan-500 to-indigo-600",
] as const;

export type CreatorCardProps = {
  username: string;
  displayName: string;
  avatarUrl?: string | null;
  rankPosition?: number | null;
  badge?: RankingBadge | null;
  /** Stable index for avatar gradient */
  toneIndex?: number;
  className?: string;
  featured?: boolean;
};

function avatarInitial(username: string): string {
  const raw = username.replace(/^@+/, "").trim();
  if (!raw) return "?";
  const ch = raw[0];
  return /[a-z]/i.test(ch) ? ch.toUpperCase() : ch;
}

/**
 * Network member card — TikTok identity + optional rank badge from real leaderboard data.
 * Opens TikTok profile (no private account fields).
 */
export function CreatorCard({
  username,
  displayName,
  avatarUrl,
  rankPosition,
  badge,
  toneIndex = 0,
  className = "",
  featured = false,
}: CreatorCardProps) {
  const handle = username.replace(/^@/, "");
  const url = memberProfileUrl(handle);
  const backdrop = AVATAR_BACKDROPS[Math.abs(toneIndex) % AVATAR_BACKDROPS.length];

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex h-full flex-col rounded-2xl border outline-none transition-[border-color,box-shadow,transform] hover:-translate-y-0.5 focus-visible:ring-4 focus-visible:ring-accent/20 motion-reduce:transform-none ${
        featured
          ? "border-accent/30 bg-gradient-to-b from-accent-soft/60 to-surface p-5 shadow-[var(--shadow-card)] dark:border-accent/35 dark:from-accent/10 dark:to-zinc-950/70 sm:p-6"
          : "border-border/80 bg-surface/95 p-5 shadow-sm hover:border-accent/35 hover:shadow-[0_12px_40px_-12px_var(--accent-glow)] dark:border-zinc-800 dark:bg-zinc-950/65 dark:hover:border-accent/30"
      } ${className}`}
      aria-label={`Open @${handle} on TikTok`}
    >
      <div className="flex gap-3 sm:gap-4">
        <CreatorAvatar
          username={handle}
          preferredImageUrl={avatarUrl}
          fallbackBackdropClass={backdrop}
          fallbackInitial={avatarInitial(handle)}
          className={featured ? "h-16 w-16" : "h-14 w-14"}
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-start gap-2">
            <p className="min-w-0 flex-1 truncate font-semibold tracking-tight text-foreground">
              {displayName}
            </p>
            {rankPosition != null && rankPosition > 0 ? (
              <RankBadge rank={rankPosition} size="sm" />
            ) : null}
          </div>
          <p className="mt-0.5 truncate text-sm text-muted">@{handle}</p>
          {badge ? (
            <div className="mt-2">
              <AchievementBadge badge={badge} size="sm" />
            </div>
          ) : (
            <p className="mt-2 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-zinc-400">
              SF network
            </p>
          )}
        </div>
      </div>
      <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent dark:text-accent-muted">
        <span>Open in TikTok</span>
        <span className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden>
          →
        </span>
      </span>
    </a>
  );
}
