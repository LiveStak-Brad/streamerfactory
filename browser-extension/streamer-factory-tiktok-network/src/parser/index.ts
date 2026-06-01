import { detectTikTokCreatorNetworkPage } from "./detectPage";
import { extractLiveNowRowsFromPage } from "./extractLiveNow";
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
      rows: [],
      liveRows: extractLiveNowRowsFromPage(doc),
    };
  }

  return {
    sourcePageUrl: url,
    detectedPageType: detection.detectedPageType,
    relationshipTab: detection.relationshipTab,
    statPeriodLabel: detection.statPeriodLabel,
    rows: extractCreatorRowsFromPage(doc, detection.detectedPageType, detection.relationshipTab),
    liveRows: [],
  };
}

export * from "./detectPage";
export * from "./extractRows";
export * from "./extractLiveNow";
export * from "./numbers";
export * from "./duration";
export * from "./username";
export * from "./types";
