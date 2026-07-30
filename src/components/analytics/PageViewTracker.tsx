"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

import { AnalyticsEvents, type AnalyticsEventName } from "@/lib/analytics/events";
import { trackClientEvent } from "@/lib/analytics/client";

const STORAGE_PREFIX = "sf_analytics_pv_";

function streameruSlugFromPath(pathname: string): string | null {
  const m = pathname.match(/^\/streameru\/([^/]+)/);
  if (!m || m[1] === "start-here") return null;
  return m[1];
}

function guideSlugFromPath(pathname: string): string | null {
  const m = pathname.match(/^\/guides\/([^/]+)/);
  return m?.[1] ?? null;
}

function resolvePageView(
  pathname: string,
): { event: string; resourceSlug?: string; metadata?: Record<string, unknown> } | null {
  if (pathname.startsWith("/admin")) return null;

  if (pathname.startsWith("/battle-hub/finder")) {
    return { event: AnalyticsEvents.BATTLE_FINDER_VIEWED };
  }

  const exact: Record<string, string> = {
    "/": AnalyticsEvents.HOMEPAGE_VIEWED,
    "/apply": AnalyticsEvents.APPLY_PAGE_VIEWED,
    "/application-status": AnalyticsEvents.APPLICATION_STATUS_VIEWED,
    "/streameru": AnalyticsEvents.RESOURCES_PAGE_VIEWED,
    "/streameru/start-here": AnalyticsEvents.START_HERE_VIEWED,
    "/guides": AnalyticsEvents.GUIDES_HUB_VIEWED,
    "/about": AnalyticsEvents.ABOUT_VIEWED,
    "/contact": AnalyticsEvents.CONTACT_VIEWED,
    "/rankings": AnalyticsEvents.RANKINGS_VIEWED,
    "/members": AnalyticsEvents.MEMBERS_VIEWED,
    "/battle-hub": AnalyticsEvents.BATTLE_HUB_VIEWED,
    "/battle-hub/calendar": AnalyticsEvents.BATTLE_CALENDAR_VIEWED,
    "/battle-hub/scheduler": AnalyticsEvents.BATTLE_SCHEDULER_OPENED,
    "/battle-hub/scheduler/new": AnalyticsEvents.BATTLE_SCHEDULER_OPENED,
    "/member/dashboard": AnalyticsEvents.DASHBOARD_VIEWED,
    "/login": AnalyticsEvents.SIGNUP_STARTED,
  };

  if (exact[pathname]) {
    return { event: exact[pathname] };
  }

  const guideSlug = guideSlugFromPath(pathname);
  if (guideSlug) {
    return {
      event: AnalyticsEvents.GUIDE_VIEWED,
      metadata: { guide_slug: guideSlug },
    };
  }

  const slug = streameruSlugFromPath(pathname);
  if (slug) {
    return { event: AnalyticsEvents.RESOURCE_VIEWED, resourceSlug: slug };
  }

  return null;
}

/**
 * Tracks key page views once per tab session per path (sessionStorage dedupe).
 */
export function PageViewTracker() {
  const pathname = usePathname();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname) return;
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;

    const resolved = resolvePageView(pathname);
    if (!resolved) return;

    const key = `${STORAGE_PREFIX}${pathname}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      // storage blocked — still track once per mount
    }

    trackClientEvent({
      event: resolved.event as AnalyticsEventName,
      route: pathname,
      resourceSlug: resolved.resourceSlug,
      metadata: resolved.metadata,
    });
  }, [pathname]);

  return null;
}
