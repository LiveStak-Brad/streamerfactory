import type { ReactNode } from "react";
import Link from "next/link";

type DashboardWidgetProps = {
  title: string;
  eyebrow?: string;
  children: ReactNode;
  actionHref?: string;
  actionLabel?: string;
  className?: string;
  /** Visual weight — featured uses richer surface treatment */
  featured?: boolean;
};

/**
 * Modular dashboard panel. Prefer this over ad-hoc bordered sections
 * so member surfaces stay consistent.
 */
export function DashboardWidget({
  title,
  eyebrow,
  children,
  actionHref,
  actionLabel,
  className = "",
  featured = false,
}: DashboardWidgetProps) {
  return (
    <section
      className={`flex h-full flex-col rounded-2xl border p-5 sm:p-6 ${
        featured
          ? "border-accent/25 bg-gradient-to-b from-accent-soft/80 to-surface shadow-[var(--shadow-card)] dark:border-accent/30 dark:from-accent/10 dark:to-zinc-950/60"
          : "border-border/80 bg-surface/90 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/45"
      } ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          {eyebrow ? (
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-accent dark:text-accent-muted">
              {eyebrow}
            </p>
          ) : null}
          <h2 className={`font-bold tracking-tight text-foreground ${eyebrow ? "mt-1 text-lg" : "text-lg"}`}>
            {title}
          </h2>
        </div>
        {actionHref && actionLabel ? (
          <Link
            href={actionHref}
            className="shrink-0 text-sm font-semibold text-accent transition-colors hover:text-accent-hover dark:text-accent-muted"
          >
            {actionLabel}
          </Link>
        ) : null}
      </div>
      <div className="mt-4 min-h-0 flex-1">{children}</div>
    </section>
  );
}
