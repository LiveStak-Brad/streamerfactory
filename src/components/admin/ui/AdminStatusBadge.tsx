import type { ReactNode } from "react";

export type AdminBadgeTone =
  | "neutral"
  | "info"
  | "success"
  | "warning"
  | "danger"
  | "accent";

const tones: Record<AdminBadgeTone, string> = {
  neutral:
    "border-border/90 bg-muted-bg/80 text-foreground/80 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-200",
  info: "border-sky-200 bg-sky-50 text-sky-950 dark:border-sky-900/50 dark:bg-sky-950/40 dark:text-sky-100",
  success:
    "border-emerald-200 bg-emerald-50 text-emerald-950 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-100",
  warning:
    "border-amber-200 bg-amber-50 text-amber-950 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-100",
  danger:
    "border-rose-200 bg-rose-50 text-rose-950 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-100",
  accent:
    "border-accent/30 bg-accent-soft text-accent dark:border-accent/40 dark:text-accent-muted",
};

type AdminStatusBadgeProps = {
  children: ReactNode;
  tone?: AdminBadgeTone;
  className?: string;
};

/** Compact status pill for admin lists and tables. */
export function AdminStatusBadge({
  children,
  tone = "neutral",
  className = "",
}: AdminStatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
