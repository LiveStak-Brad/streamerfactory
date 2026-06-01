import { detectTikTokCreatorNetworkPage } from "./detectPage";
import { extractLiveNowRowsFromPage, extractLiveRowsFromCreatorTable } from "./extractLiveNow";
import { extractCreatorRowsFromPage } from "./extractRows";
import type { PageSnapshot } from "./types";

export function buildPageSnapshot(url: string = location.href, doc: Document = document): PageSnapshot {
  const detection = detectTikTokCreatorNetworkPage(url, doc);

  if (detection.detectedPageType === "live_now") {
    return {
      sourcePageUrl: url,
      detectedPageType: "live_now",
      relationshipTab: detection.relationshipTab,
      statPeriodLabel: detection.statPeriodLabel,
      statPeriodStart: detection.statPeriodStart,
      statPeriodEnd: detection.statPeriodEnd,
      rows: [],
      liveRows: extractLiveNowRowsFromPage(doc),
    };
  }

  const liveFromTable =
    detection.detectedPageType === "creator_stats" ||
    detection.detectedPageType === "manage_relationship"
      ? extractLiveRowsFromCreatorTable(doc)
      : [];

  return {
    sourcePageUrl: url,
    detectedPageType: detection.detectedPageType,
    relationshipTab: detection.relationshipTab,
    statPeriodLabel: detection.statPeriodLabel,
    statPeriodStart: detection.statPeriodStart,
    statPeriodEnd: detection.statPeriodEnd,
    rows: extractCreatorRowsFromPage(doc, detection.detectedPageType, detection.relationshipTab),
    liveRows: liveFromTable,
  };
}

export * from "./detectPage";
export * from "./extractRows";
export * from "./extractLiveNow";
export * from "./numbers";
export * from "./duration";
export * from "./username";
export * from "./types";
