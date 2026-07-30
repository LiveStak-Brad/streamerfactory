import type { ReactNode } from "react";

type StatCardProps = {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  className?: string;
  /** Subtle accent bar on the left */
  accent?: boolean;
};

/** Compact metric tile for dashboards and rankings. */
export function StatCard({ label, value, hint, className = "", accent = false }: StatCardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-border/80 bg-surface/90 p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/50 ${
        accent ? "pl-5" : ""
      } ${className}`}
    >
      {accent ? (
        <span className="absolute inset-y-3 left-0 w-1 rounded-full bg-gradient-brand" aria-hidden />
      ) : null}
      <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-muted">{label}</p>
      <p className="mt-1.5 text-2xl font-bold tracking-tight text-foreground tabular-nums">{value}</p>
      {hint ? <p className="mt-1 text-xs leading-snug text-muted">{hint}</p> : null}
    </div>
  );
}
