import Link from "next/link";
import type { ReactNode } from "react";

type MemberPageHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  actions?: ReactNode;
};

/** Consistent chrome for member-only pages (onboarding, inbox, activity). */
export function MemberPageHeader({
  eyebrow,
  title,
  description,
  actions,
}: MemberPageHeaderProps) {
  return (
    <header className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-accent dark:text-accent-muted">
          {eyebrow}
        </p>
        <Link
          href="/member/dashboard"
          className="text-sm font-semibold text-muted transition-colors hover:text-accent dark:hover:text-accent-muted"
        >
          ← Dashboard
        </Link>
      </div>
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{title}</h1>
      {description ? (
        <p className="max-w-xl text-sm leading-relaxed text-muted sm:text-base">{description}</p>
      ) : null}
      {actions ? <div className="pt-1">{actions}</div> : null}
    </header>
  );
}
