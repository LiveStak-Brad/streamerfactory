import Image from "next/image";
import type { ReactNode } from "react";

import { brandAssets, type EmptyStateKind } from "@/lib/brand/assets";

type EmptyStateProps = {
  title: string;
  description: string;
  action?: ReactNode;
  icon?: ReactNode;
  /** Branded illustration when no custom icon is provided. */
  illustration?: EmptyStateKind;
  className?: string;
};

/** Helpful empty state with optional branded SF illustration — never leave blank widgets. */
export function EmptyState({
  title,
  description,
  action,
  icon,
  illustration,
  className = "",
}: EmptyStateProps) {
  const illustrationSrc = illustration ? brandAssets.emptyStates[illustration] : null;

  return (
    <div
      className={`flex flex-col items-start rounded-2xl border border-dashed border-border/90 bg-muted-bg/40 px-5 py-6 dark:border-zinc-700 dark:bg-zinc-950/30 ${className}`}
    >
      {icon ? (
        <div className="mb-3 text-accent dark:text-accent-muted">{icon}</div>
      ) : illustrationSrc ? (
        <div className="mb-4 overflow-hidden rounded-2xl">
          <Image
            src={illustrationSrc}
            alt=""
            width={160}
            height={160}
            className="h-28 w-28 object-cover sm:h-32 sm:w-32"
          />
        </div>
      ) : null}
      <p className="text-base font-semibold text-foreground">{title}</p>
      <p className="mt-1.5 max-w-md text-sm leading-relaxed text-muted">{description}</p>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
