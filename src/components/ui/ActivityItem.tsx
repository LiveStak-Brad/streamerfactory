import type { ReactNode } from "react";

type ActivityItemProps = {
  title: string;
  meta?: string;
  trailing?: ReactNode;
  leading?: ReactNode;
  href?: string;
  className?: string;
};

/** Compact activity / list row for dashboards and feeds. */
export function ActivityItem({
  title,
  meta,
  trailing,
  leading,
  href,
  className = "",
}: ActivityItemProps) {
  const inner = (
    <>
      {leading ? <div className="shrink-0">{leading}</div> : null}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-foreground">{title}</p>
        {meta ? <p className="mt-0.5 truncate text-xs text-muted">{meta}</p> : null}
      </div>
      {trailing ? <div className="shrink-0 text-xs font-semibold text-muted">{trailing}</div> : null}
    </>
  );

  const base =
    `flex items-center gap-3 rounded-xl border border-border/70 bg-surface/80 px-3 py-2.5 dark:border-zinc-800 dark:bg-zinc-950/40 ${className}`;

  if (href) {
    return (
      <a href={href} className={`${base} transition-colors hover:border-accent/35 hover:bg-accent-soft/40`}>
        {inner}
      </a>
    );
  }

  return <div className={base}>{inner}</div>;
}
