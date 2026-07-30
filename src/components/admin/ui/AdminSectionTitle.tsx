import type { ReactNode } from "react";
import Link from "next/link";

type AdminSectionTitleProps = {
  title: string;
  description?: ReactNode;
  actionHref?: string;
  actionLabel?: string;
  className?: string;
};

/** In-page section heading for dashboard widgets and list groups. */
export function AdminSectionTitle({
  title,
  description,
  actionHref,
  actionLabel,
  className = "",
}: AdminSectionTitleProps) {
  return (
    <div className={`flex flex-wrap items-end justify-between gap-3 ${className}`}>
      <div className="min-w-0">
        <h2 className="text-lg font-bold tracking-tight text-foreground">{title}</h2>
        {description ? <p className="mt-1 text-sm text-muted">{description}</p> : null}
      </div>
      {actionHref && actionLabel ? (
        <Link
          href={actionHref}
          className="text-sm font-semibold text-accent transition-colors hover:text-accent-hover dark:text-accent-muted"
        >
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}
