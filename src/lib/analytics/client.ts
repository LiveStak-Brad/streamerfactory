"use client";

import type { AnalyticsEventName } from "./events";

/**
 * Fire-and-forget client tracking (page views, safe UI signals). Uses POST /api/analytics/track.
 */
export function trackClientEvent(params: {
  event: AnalyticsEventName;
  route?: string;
  resourceSlug?: string;
  metadata?: Record<string, unknown>;
}): void {
  if (typeof window === "undefined") return;

  const body = {
    event: params.event,
    route: params.route ?? window.location.pathname,
    resource_slug: params.resourceSlug,
    metadata: params.metadata,
  };

  void fetch("/api/analytics/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    keepalive: true,
  }).catch(() => {});
}
