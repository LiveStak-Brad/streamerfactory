import Link from "next/link";
import type { ReactNode } from "react";

export type AdminBreadcrumb = {
  label: string;
  href?: string;
};

type AdminPageHeaderProps = {
  /** Small uppercase eyebrow (defaults to Admin). */
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  actions?: ReactNode;
  breadcrumbs?: AdminBreadcrumb[];
  className?: string;
};

/**
 * Consistent console page title: eyebrow, optional breadcrumbs, H1, description, actions.
 */
export function AdminPageHeader({
  eyebrow = "Admin",
  title,
  description,
  actions,
  breadcrumbs,
  className = "",
}: AdminPageHeaderProps) {
  return (
    <div
      className={`flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between ${className}`}
    >
      <div className="min-w-0">
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <nav aria-label="Breadcrumb" className="mb-3">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-muted">
              {breadcrumbs.map((crumb, i) => (
                <li key={`${crumb.label}-${i}`} className="flex items-center gap-1.5">
                  {i > 0 ? (
                    <span className="text-border dark:text-zinc-600" aria-hidden>
                      /
                    </span>
                  ) : null}
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="text-accent transition-colors hover:text-accent-hover dark:text-accent-muted"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-foreground/80" aria-current="page">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : (
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-accent dark:text-accent-muted">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-1 text-3xl font-bold tracking-[-0.03em] text-foreground sm:text-[2rem]">
          {title}
        </h1>
        {description ? (
          <div className="mt-2 max-w-2xl text-sm leading-relaxed text-muted sm:text-[0.95rem]">
            {description}
          </div>
        ) : null}
      </div>
      {actions ? <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  );
}
