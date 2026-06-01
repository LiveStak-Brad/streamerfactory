import { startBackstageAutoSync, snapshotToPayload } from "./autoSyncContent";
import { buildPageSnapshot } from "./parser/index";
import type { PageSnapshot } from "./parser/types";

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

startBackstageAutoSync();

export {};
