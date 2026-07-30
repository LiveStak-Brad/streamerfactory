import Image from "next/image";

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
    "border-[rgba(160,32,240,0.4)] bg-[rgba(160,32,240,0.1)] text-[#5B3BFF] dark:border-[rgba(196,75,255,0.35)] dark:bg-[rgba(160,32,240,0.15)] dark:text-[#C44BFF]",
  "Rising Star":
    "border-[rgba(0,229,255,0.4)] bg-[rgba(0,229,255,0.1)] text-[#0891b2] dark:border-[rgba(0,229,255,0.3)] dark:bg-[rgba(0,229,255,0.12)] dark:text-[#00E5FF]",
  "Active Member":
    "border-accent/30 bg-accent-soft text-accent dark:border-accent/35 dark:text-accent-muted",
  "New Member":
    "border-zinc-300/80 bg-muted-bg text-zinc-600 dark:border-zinc-600 dark:text-zinc-300",
  "Top Three":
    "border-[rgba(160,32,240,0.4)] bg-[rgba(160,32,240,0.1)] text-[#5B3BFF] dark:border-[rgba(196,75,255,0.35)] dark:text-[#C44BFF]",
  "Top Ten":
    "border-[rgba(0,229,255,0.4)] bg-[rgba(0,229,255,0.1)] text-[#0891b2] dark:border-[rgba(0,229,255,0.3)] dark:text-[#00E5FF]",
};

const badgeIcon: Record<string, string> = {
  "Factory Champion": "/branding/badges/factory-champion.png",
  "Elite Creator": "/branding/badges/elite.png",
  "Rising Star": "/branding/badges/top-creator.png",
  "Active Member": "/branding/badges/verified-creator.png",
  "New Member": "/branding/badges/founding-member.png",
  "Top Three": "/branding/medals/3rd.png",
  "Top Ten": "/branding/medals/top-10.png",
};

/**
 * Recognition chip for ranking tiers. Pass labels from `rankingBadge()` or other real criteria.
 */
export function AchievementBadge({ badge, className = "", size = "md" }: AchievementBadgeProps) {
  const tone = badgeTone[badge] ?? badgeTone["Active Member"];
  const icon = badgeIcon[badge];
  const sizeClass =
    size === "sm"
      ? "gap-1 px-2 py-0.5 text-[0.65rem]"
      : "gap-1.5 px-2.5 py-1 text-xs";
  const iconPx = size === "sm" ? 14 : 16;

  return (
    <span
      className={`inline-flex items-center rounded-lg border font-bold uppercase tracking-[0.12em] ${sizeClass} ${tone} ${className}`}
    >
      {icon ? (
        <Image src={icon} alt="" width={iconPx} height={iconPx} className="shrink-0" />
      ) : null}
      {badge}
    </span>
  );
}
