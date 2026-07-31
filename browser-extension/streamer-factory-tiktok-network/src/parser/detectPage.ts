import { resolveStatPeriodForSync } from "./statPeriod";
import { collectPageHeaders } from "./parsers/shared";
import { PAGE_SPECS, SAFE_CONFIDENCE_THRESHOLD } from "./pageSpecs/registry";
import type { DatasetType, PageDetectionResult, PageSpec } from "./pageSpecs/types";
import { PARSER_VERSION } from "./version";

const BACKSTAGE_HOSTS = ["live-backstage.tiktok.com", "seller-us.tiktok.com", "seller.tiktok.com"];

export type PageDetection = PageDetectionResult;

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
    if (/contribution|performance|creator|week|month|period|incentive|rank/i.test(t) && t.length < 120) {
      return t;
    }
  }
  return undefined;
}

function scoreSpec(
  spec: PageSpec,
  path: string,
  title: string,
  bodyText: string,
  headers: string[],
): { score: number; matched: string[]; missing: string[] } {
  const matched: string[] = [];
  const missing: string[] = [];
  let score = 0;

  for (const re of spec.pathPatterns) {
    if (re.test(path)) {
      score += 0.35;
      matched.push(`path:${re.source}`);
      break;
    }
  }
  for (const re of spec.titlePatterns) {
    if (re.test(title)) {
      score += 0.2;
      matched.push(`title:${re.source}`);
      break;
    }
  }
  for (const re of spec.uniqueBodyText) {
    if (re.test(bodyText)) {
      score += 0.25;
      matched.push(`body:${re.source}`);
      break;
    }
  }
  if (matched.filter((m) => m.startsWith("body:")).length === 0) {
    for (const re of spec.bodyPatterns) {
      if (re.test(bodyText)) {
        score += 0.1;
        matched.push(`body-soft:${re.source}`);
        break;
      }
    }
  }

  const headerBlob = headers.join(" | ");
  let requiredHits = 0;
  for (const re of spec.requiredHeadings) {
    if (headers.some((h) => re.test(h)) || re.test(headerBlob)) {
      requiredHits += 1;
      matched.push(`header:${re.source}`);
    } else {
      missing.push(`required_header:${re.source}`);
    }
  }
  if (spec.requiredHeadings.length > 0) {
    score += 0.25 * (requiredHits / spec.requiredHeadings.length);
  }

  for (const re of spec.optionalHeadings) {
    if (headers.some((h) => re.test(h))) {
      score += 0.05;
      matched.push(`opt_header:${re.source}`);
    }
  }

  // Penalize Activity vs Rank confusion: rank-up unique signals on activity candidate
  if (spec.id === "activity_incentive") {
    if (/rank[\s-]?up/i.test(title) || /tier\s*last\s*month/i.test(headerBlob)) {
      score -= 0.4;
      missing.push("looks_like_rank_up");
    }
  }
  if (spec.id === "rank_up_incentive") {
    if (/activeness\s*incentive/i.test(bodyText) && !/rank[\s-]?up/i.test(title + bodyText)) {
      score -= 0.3;
      missing.push("looks_like_activeness");
    }
  }

  return { score: Math.max(0, Math.min(1, score)), matched, missing };
}

/**
 * Identify the exact Backstage page before parsing.
 * Returns dataset type, confidence, matched/missing signals, parser version.
 */
export function detectTikTokCreatorNetworkPage(
  url: string,
  doc: Document = document,
): PageDetectionResult {
  if (!isTikTokCreatorNetworkHost(url)) {
    return {
      datasetType: "unknown",
      detectedPageType: "unknown",
      displayName: "Unsupported host",
      confidence: 0,
      matchedSignals: [],
      missingSignals: ["backstage_host"],
      parserVersion: PARSER_VERSION,
      syncEnabled: false,
      previewOnly: true,
      headersFound: [],
    };
  }

  let path = "";
  try {
    path = new URL(url).pathname.toLowerCase();
  } catch {
    path = "";
  }

  const title = (doc.title ?? "").toLowerCase();
  const bodyText = (doc.body?.innerText ?? doc.body?.textContent ?? "").slice(0, 6000);
  const headers = collectPageHeaders(doc);

  let best: { spec: PageSpec; score: number; matched: string[]; missing: string[] } | null = null;

  for (const spec of PAGE_SPECS) {
    const { score, matched, missing } = scoreSpec(spec, path, title, bodyText, headers);
    if (!best || score > best.score) {
      best = { spec, score, matched, missing };
    }
  }

  if (!best || best.score < 0.25) {
    // Legacy soft fallback: generic /creator with coins/diamonds → activity (low confidence)
    if (path.includes("/creator") || /coins earned|diamonds/i.test(bodyText)) {
      const activity = PAGE_SPECS.find((s) => s.id === "activity_incentive")!;
      const period = resolveStatPeriodForSync(doc, readPeriodLabel(doc));
      return {
        datasetType: "activity_incentive",
        detectedPageType: "activity_incentive",
        displayName: activity.displayName,
        confidence: 0.35,
        matchedSignals: ["fallback:creator_or_diamonds"],
        missingSignals: ["weak_page_identity"],
        parserVersion: PARSER_VERSION,
        syncEnabled: false,
        previewOnly: false,
        relationshipTab: readActiveRelationshipTab(doc),
        statPeriodLabel: period.statPeriodLabel ?? readPeriodLabel(doc),
        statPeriodKind: period.statPeriodKind,
        statPeriodStart: period.statPeriodStart,
        statPeriodEnd: period.statPeriodEnd,
        headersFound: headers,
      };
    }

    return {
      datasetType: "unknown",
      detectedPageType: "unknown",
      displayName: "Unknown Backstage page",
      confidence: best?.score ?? 0,
      matchedSignals: best?.matched ?? [],
      missingSignals: best?.missing ?? ["no_page_match"],
      parserVersion: PARSER_VERSION,
      syncEnabled: false,
      previewOnly: true,
      headersFound: headers,
    };
  }

  const { spec, score, matched, missing } = best;
  const relationshipTab = readActiveRelationshipTab(doc);
  const needsPeriod =
    spec.id === "activity_incentive" ||
    spec.id === "rank_up_incentive" ||
    spec.id === "incremental_incentive" ||
    spec.id === "creator_roster";

  const period = needsPeriod
    ? resolveStatPeriodForSync(doc, readPeriodLabel(doc))
    : { statPeriodLabel: undefined, statPeriodKind: undefined, statPeriodStart: undefined, statPeriodEnd: undefined };

  const confidence = score;
  const syncEnabled =
    spec.syncEnabled &&
    !spec.previewOnly &&
    confidence >= Math.max(spec.minConfidence, SAFE_CONFIDENCE_THRESHOLD);

  return {
    datasetType: spec.id,
    detectedPageType: spec.id,
    displayName: spec.displayName,
    confidence,
    matchedSignals: matched,
    missingSignals: missing,
    parserVersion: PARSER_VERSION,
    syncEnabled,
    previewOnly: spec.previewOnly,
    relationshipTab,
    statPeriodLabel: period.statPeriodLabel ?? readPeriodLabel(doc),
    statPeriodKind: period.statPeriodKind,
    statPeriodStart: period.statPeriodStart,
    statPeriodEnd: period.statPeriodEnd,
    headersFound: headers,
  };
}

/** @deprecated Use datasetType — alias for older call sites. */
export type DetectedPageType = DatasetType;
