type RankBadgeProps = {
  rank: number;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeClass = {
  sm: "h-8 w-8 text-xs",
  md: "h-11 w-11 text-sm",
  lg: "h-14 w-14 text-lg",
} as const;

function podiumTone(rank: number): string {
  if (rank === 1) {
    return "bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-500 text-amber-950 shadow-[0_0_24px_-4px_rgba(251,191,36,0.55)] ring-1 ring-amber-200/80";
  }
  if (rank === 2) {
    return "bg-gradient-to-br from-zinc-200 via-zinc-300 to-zinc-400 text-zinc-900 shadow-[0_0_20px_-6px_rgba(212,212,216,0.5)] ring-1 ring-white/70";
  }
  if (rank === 3) {
    return "bg-gradient-to-br from-orange-300 via-amber-600 to-orange-700 text-orange-50 shadow-[0_0_20px_-6px_rgba(234,88,12,0.45)] ring-1 ring-orange-200/50";
  }
  return "bg-accent-soft text-accent ring-1 ring-accent/25 dark:text-accent-muted";
}

export function RankBadge({ rank, size = "md", className = "" }: RankBadgeProps) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-xl font-bold tracking-tight ${sizeClass[size]} ${podiumTone(rank)} ${className}`}
      aria-label={`Rank ${rank}`}
    >
      {rank}
    </span>
  );
}
