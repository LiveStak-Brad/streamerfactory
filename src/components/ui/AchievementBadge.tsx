import type { RankingBadge } from "@/lib/rankings/types";

type AchievementBadgeProps = {
  badge: RankingBadge | string;
  className?: string;
  size?: "sm" | "md";
};

const badgeTone: Record<string, string> = {
  "Factory Champion":
    "border-amber-400/40 bg-amber-400/15 text-amber-900 dark:border-amber-300/30 dark:bg-amber-400/10 dark:text-amber-200",
  "Elite Creator":
    "border-violet-400/40 bg-violet-500/10 text-violet-800 dark:border-violet-400/30 dark:bg-violet-500/15 dark:text-violet-200",
  "Rising Star":
    "border-sky-400/40 bg-sky-500/10 text-sky-800 dark:border-sky-400/30 dark:bg-sky-500/15 dark:text-sky-200",
  "Active Member":
    "border-accent/30 bg-accent-soft text-accent dark:border-accent/35 dark:text-accent-muted",
  "New Member":
    "border-zinc-300/80 bg-muted-bg text-zinc-600 dark:border-zinc-600 dark:text-zinc-300",
  "Top Three":
    "border-violet-400/40 bg-violet-500/10 text-violet-800 dark:border-violet-400/30 dark:text-violet-200",
  "Top Ten":
    "border-sky-400/40 bg-sky-500/10 text-sky-800 dark:border-sky-400/30 dark:text-sky-200",
};

/**
 * Recognition chip for ranking tiers. Pass labels from `rankingBadge()` or other real criteria.
 */
export function AchievementBadge({ badge, className = "", size = "md" }: AchievementBadgeProps) {
  const tone = badgeTone[badge] ?? badgeTone["Active Member"];
  const sizeClass =
    size === "sm"
      ? "px-2 py-0.5 text-[0.65rem]"
      : "px-2.5 py-1 text-xs";

  return (
    <span
      className={`inline-flex items-center rounded-lg border font-bold uppercase tracking-[0.12em] ${sizeClass} ${tone} ${className}`}
    >
      {badge}
    </span>
  );
}
