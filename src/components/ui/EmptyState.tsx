import type { ReactNode } from "react";

type EmptyStateProps = {
  title: string;
  description: string;
  action?: ReactNode;
  icon?: ReactNode;
  className?: string;
};

/** Helpful empty state with an optional next-step action — never leave blank widgets. */
export function EmptyState({ title, description, action, icon, className = "" }: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-start rounded-2xl border border-dashed border-border/90 bg-muted-bg/40 px-5 py-6 dark:border-zinc-700 dark:bg-zinc-950/30 ${className}`}
    >
      {icon ? <div className="mb-3 text-accent dark:text-accent-muted">{icon}</div> : null}
      <p className="text-base font-semibold text-foreground">{title}</p>
      <p className="mt-1.5 max-w-md text-sm leading-relaxed text-muted">{description}</p>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
