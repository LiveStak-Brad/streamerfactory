import { detectTikTokCreatorNetworkPage } from "./detectPage";
import { extractLiveRowsFromCreatorTable } from "./extractLiveNow";
import { getPageSpec } from "./pageSpecs/registry";
import { collectPageHeaders } from "./parsers/shared";
import type { PageSnapshot } from "./types";
import { validateCapture } from "./validateCapture";
import { EXTENSION_VERSION, PARSER_VERSION } from "./version";
import type { SyncPayload } from "./types";

export function buildPageSnapshot(url: string = location.href, doc: Document = document): PageSnapshot {
  const detection = detectTikTokCreatorNetworkPage(url, doc);
  const headersFound = detection.headersFound.length
    ? detection.headersFound
    : collectPageHeaders(doc);
  const spec = getPageSpec(detection.datasetType);

  const ctx = {
    url,
    doc,
    relationshipTab: detection.relationshipTab,
    headersFound,
  };

  let rows: PageSnapshot["rows"] = [];
  let liveRows: PageSnapshot["liveRows"] = [];
  let metricsAvailable: string[] = [];
  let liveParseDebug: PageSnapshot["liveParseDebug"];

  if (spec) {
    const parsed = spec.parse(ctx);
    rows = parsed.rows;
    liveRows = parsed.liveRows;
    metricsAvailable = parsed.metricsAvailable;
    if ("liveParseDebug" in parsed) {
      liveParseDebug = (parsed as { liveParseDebug?: PageSnapshot["liveParseDebug"] }).liveParseDebug;
    }
  }

  if (
    detection.datasetType === "activity_incentive" ||
    detection.datasetType === "creator_roster"
  ) {
    try {
      const fromTable = extractLiveRowsFromCreatorTable(doc);
      if (fromTable.length > 0) liveRows = fromTable;
    } catch {
      /* LIVE-ring helper is optional; never fail the whole capture */
    }
  }

  const snapshot: PageSnapshot = {
    sourcePageUrl: url,
    detectedPageType: detection.datasetType,
    datasetType: detection.datasetType,
    displayName: detection.displayName,
    confidence: detection.confidence,
    matchedSignals: detection.matchedSignals,
    missingSignals: detection.missingSignals,
    parserVersion: detection.parserVersion || PARSER_VERSION,
    syncEnabled: detection.syncEnabled,
    previewOnly: detection.previewOnly,
    relationshipTab: detection.relationshipTab,
    statPeriodLabel: detection.statPeriodLabel,
    statPeriodStart: detection.statPeriodStart,
    statPeriodEnd: detection.statPeriodEnd,
    headersFound,
    metricsAvailable,
    rows,
    liveRows,
    liveParseDebug,
  };

  snapshot.validation = validateCapture(detection, snapshot);
  return snapshot;
}

/**
 * Production (pre–Phase 1A deploy) only accepts legacy detectedPageType values.
 * Keep datasetType as the Phase 1A identity; alias detectedPageType on the wire
 * so Activeness syncs still update /rankings on the live site.
 */
const LEGACY_DETECTED_PAGE_TYPE: Partial<Record<string, string>> = {
  activity_incentive: "creator_stats",
  creator_roster: "manage_relationship",
};

export function snapshotToPayload(snapshot: PageSnapshot): SyncPayload {
  const validation = snapshot.validation;
  const syncBlocked = !validation?.syncSafe;
  const datasetType = snapshot.datasetType;
  const detectedPageType = LEGACY_DETECTED_PAGE_TYPE[datasetType] ?? datasetType;
  return {
    sourcePageUrl: snapshot.sourcePageUrl,
    datasetType,
    detectedPageType,
    relationshipTab: snapshot.relationshipTab,
    statPeriodLabel: snapshot.statPeriodLabel,
    statPeriodStart: snapshot.statPeriodStart,
    statPeriodEnd: snapshot.statPeriodEnd,
    rows: snapshot.rows.map(({ rawTextPreview: _r, ...rest }) => rest),
    liveRows: snapshot.liveRows.map(({ rawTextPreview: _r, ...rest }) => rest),
    parserVersion: snapshot.parserVersion || PARSER_VERSION,
    extensionVersion: EXTENSION_VERSION,
    confidence: snapshot.confidence,
    matchedSignals: snapshot.matchedSignals,
    missingSignals: snapshot.missingSignals,
    validationWarnings: validation?.warnings ?? [],
    validationFailures: validation?.blocking ?? [],
    capturedAt: new Date().toISOString(),
    syncBlocked: syncBlocked || undefined,
  };
}

export {
  detectTikTokCreatorNetworkPage,
  isTikTokCreatorNetworkHost,
  type PageDetection,
} from "./detectPage";
export * from "./extractRows";
export * from "./extractLiveNow";
export * from "./numbers";
export * from "./duration";
export * from "./username";
export * from "./types";
export * from "./validateCapture";
export * from "./version";
export * from "./pageSpecs/registry";
