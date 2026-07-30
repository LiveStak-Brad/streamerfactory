"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { AnalyticsEvents } from "@/lib/analytics/events";
import { trackClientEvent } from "@/lib/analytics/client";

type TrackedCtaProps = {
  children: ReactNode;
  href: string;
  external?: boolean;
  variant?: "primary" | "secondary" | "secondaryOnDark" | "inverse";
  className?: string;
  eventMetadata?: Record<string, unknown>;
};

/**
 * CTA that fires `cta_clicked` before navigation (fire-and-forget).
 */
export function TrackedCta({
  children,
  href,
  external = false,
  variant = "primary",
  className,
  eventMetadata,
}: TrackedCtaProps) {
  return (
    <Button
      href={href}
      external={external}
      variant={variant}
      className={className}
      onClick={() => {
        trackClientEvent({
          event: AnalyticsEvents.CTA_CLICKED,
          route: typeof window !== "undefined" ? window.location.pathname : undefined,
          metadata: {
            href,
            external,
            ...eventMetadata,
          },
        });
      }}
    >
      {children}
    </Button>
  );
}
