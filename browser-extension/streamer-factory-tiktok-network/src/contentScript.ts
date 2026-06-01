import { buildPageSnapshot } from "./parser/index";
import type { PageSnapshot, SyncPayload } from "./parser/types";

function stripPreview<T extends { rawTextPreview?: string }>(row: T): Omit<T, "rawTextPreview"> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { rawTextPreview, ...rest } = row;
  return rest;
}

function snapshotToPayload(snapshot: PageSnapshot): SyncPayload {
  return {
    sourcePageUrl: snapshot.sourcePageUrl,
    detectedPageType: snapshot.detectedPageType,
    relationshipTab: snapshot.relationshipTab,
    statPeriodLabel: snapshot.statPeriodLabel,
    rows: snapshot.rows.map(stripPreview),
    liveRows:
      snapshot.liveRows.length > 0 ? snapshot.liveRows.map(stripPreview) : undefined,
  };
}

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type === "PING") {
    sendResponse({ ok: true });
    return true;
  }

  if (message?.type === "GET_PAGE_SNAPSHOT") {
    try {
      const snapshot = buildPageSnapshot(location.href, document);
      sendResponse({ ok: true, snapshot });
    } catch (e) {
      sendResponse({
        ok: false,
        error: e instanceof Error ? e.message : "Failed to parse page.",
      });
    }
    return true;
  }

  if (message?.type === "BUILD_SYNC_PAYLOAD") {
    try {
      const snapshot = buildPageSnapshot(location.href, document);
      sendResponse({ ok: true, payload: snapshotToPayload(snapshot), snapshot });
    } catch (e) {
      sendResponse({
        ok: false,
        error: e instanceof Error ? e.message : "Failed to build payload.",
      });
    }
    return true;
  }

  return false;
});

export {};
