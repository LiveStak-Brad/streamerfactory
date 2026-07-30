import type { ReactNode } from "react";

type AdminPanelProps = {
  children: ReactNode;
  className?: string;
  /** Remove default padding (e.g. flush tables). */
  flush?: boolean;
  /** Slightly stronger surface for primary content. */
  raised?: boolean;
};

/** Standard console surface — prefer over ad-hoc bordered cards. */
export function AdminPanel({
  children,
  className = "",
  flush = false,
  raised = false,
}: AdminPanelProps) {
  return (
    <div
      className={`rounded-2xl border border-border/80 dark:border-zinc-800 ${
        raised
          ? "bg-surface shadow-[var(--shadow-card)] dark:bg-zinc-950/55"
          : "bg-surface/90 shadow-sm dark:bg-zinc-950/45"
      } ${flush ? "overflow-hidden" : "p-5 sm:p-6"} ${className}`}
    >
      {children}
    </div>
  );
}
