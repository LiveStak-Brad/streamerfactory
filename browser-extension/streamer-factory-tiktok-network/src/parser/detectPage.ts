import { resolveStatPeriodForSync } from "./statPeriod";
import type { DetectedPageType } from "./types";

const BACKSTAGE_HOSTS = ["live-backstage.tiktok.com", "seller-us.tiktok.com", "seller.tiktok.com"];

export type PageDetection = {
  detectedPageType: DetectedPageType;
  relationshipTab?: string;
  statPeriodLabel?: string;
  statPeriodKind?: "monthly";
  statPeriodStart?: string;
  statPeriodEnd?: string;
};

export function isTikTokCreatorNetworkHost(url: string): boolean {
  try {
    const u = new URL(url);
    return BACKSTAGE_HOSTS.some((h) => u.hostname === h || u.hostname.endsWith(`.${h}`));
  } catch {
    return false;
  }
}

function readActiveRelationshipTab(doc: Document): string | undefined {
  if (typeof doc.querySelector !== "function") return undefined;
  const tabSelectors = [
    '[role="tab"][aria-selected="true"]',
    ".semi-tabs-tab-active",
    '[class*="tab"][class*="active"]',
    '[class*="Tab"][class*="active"]',
  ];
  for (const sel of tabSelectors) {
    const el = doc.querySelector(sel);
    const text = el?.textContent?.trim();
    if (text && text.length < 40) return text.replace(/\d+/g, "").trim();
  }
  return undefined;
}

function readPeriodLabel(doc: Document): string | undefined {
  if (typeof doc.querySelectorAll !== "function") return undefined;
  const headings = Array.from(doc.querySelectorAll("h1, h2, h3, [class*='title'], [class*='Title']"));
  for (const h of headings) {
    const t = h.textContent?.trim() ?? "";
    if (/contribution|performance|creator|week|month|period/i.test(t) && t.length < 120) {
      return t;
    }
  }
  return undefined;
}

function withStatPeriod(doc: Document, base: PageDetection): PageDetection {
  if (base.detectedPageType !== "creator_stats" && base.detectedPageType !== "manage_relationship") {
    return base;
  }
  const period = resolveStatPeriodForSync(doc, base.statPeriodLabel);
  return {
    ...base,
    statPeriodLabel: period.statPeriodLabel ?? base.statPeriodLabel,
    statPeriodKind: period.statPeriodKind,
    statPeriodStart: period.statPeriodStart,
    statPeriodEnd: period.statPeriodEnd,
  };
}

/** Detect TikTok Creator Network backstage page type from URL + visible DOM. */
export function detectTikTokCreatorNetworkPage(url: string, doc: Document = document): PageDetection {
  if (!isTikTokCreatorNetworkHost(url)) {
    return { detectedPageType: "unknown" };
  }

  let path = "";
  try {
    path = new URL(url).pathname.toLowerCase();
  } catch {
    path = "";
  }

  const title = doc.title.toLowerCase();
  const bodyText = (doc.body?.innerText ?? "").slice(0, 4000).toLowerCase();

  /* Revenue / incentives / stats — before manage_relationship (sidebar often mentions "Manage relationship"). */
  if (
    path.includes("/revenue") ||
    path.includes("/incentive") ||
    path.includes("/performance") ||
    path.includes("/contribution") ||
    path.includes("/data/") ||
    path.includes("/analytics") ||
    title.includes("incentive") ||
    title.includes("performance") ||
    title.includes("contribution") ||
    bodyText.includes("contribution details") ||
    bodyText.includes("estimated bonus") ||
    bodyText.includes("valid go live") ||
    bodyText.includes("activeness incentive")
  ) {
    return withStatPeriod(doc, {
      detectedPageType: "creator_stats",
      statPeriodLabel: readPeriodLabel(doc),
      relationshipTab: readActiveRelationshipTab(doc),
    });
  }

  if (
    path.includes("/relation") ||
    path.includes("/relationship") ||
    title.includes("manage relationship")
  ) {
    return {
      detectedPageType: "manage_relationship",
      relationshipTab: readActiveRelationshipTab(doc),
    };
  }

  if (
    path.includes("/anchor/live") ||
    path.includes("/live-now") ||
    path.includes("livenow") ||
    (path.includes("/live") && !path.includes("/relation")) ||
    title.includes("live now") ||
    bodyText.includes("creators who are live now")
  ) {
    return { detectedPageType: "live_now" };
  }

  if (
    path.includes("/creator") ||
    bodyText.includes("coins earned") ||
    bodyText.includes("diamonds")
  ) {
    return withStatPeriod(doc, {
      detectedPageType: "creator_stats",
      statPeriodLabel: readPeriodLabel(doc),
      relationshipTab: readActiveRelationshipTab(doc),
    });
  }

  return { detectedPageType: "unknown" };
}
