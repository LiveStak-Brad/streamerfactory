import type { ReactNode } from "react";

type AdminAlertTone = "info" | "warning" | "danger" | "success";

const tones: Record<AdminAlertTone, string> = {
  info: "border-sky-200 bg-sky-50 text-sky-950 dark:border-sky-900/60 dark:bg-sky-950/40 dark:text-sky-100",
  warning:
    "border-amber-200 bg-amber-50 text-amber-950 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-100",
  danger:
    "border-rose-200 bg-rose-50 text-rose-950 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-100",
  success:
    "border-emerald-200 bg-emerald-50 text-emerald-950 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-100",
};

type AdminAlertProps = {
  title: string;
  children?: ReactNode;
  tone?: AdminAlertTone;
  className?: string;
};

/** Inline alert for missing tables, load failures, and operational notices. */
export function AdminAlert({
  title,
  children,
  tone = "warning",
  className = "",
}: AdminAlertProps) {
  return (
    <div className={`rounded-xl border px-4 py-3 text-sm ${tones[tone]} ${className}`} role="alert">
      <p className="font-semibold">{title}</p>
      {children ? <div className="mt-1 text-xs leading-relaxed opacity-90 sm:text-sm">{children}</div> : null}
    </div>
  );
}
