import { startBackstageAutoSync } from "./autoSyncContent";
import { buildPageSnapshot, snapshotToPayload } from "./parser/index";
import { EXTENSION_VERSION, PARSER_VERSION } from "./parser/version";

type CaptureResult = {
  ok: true;
  snapshot: ReturnType<typeof buildPageSnapshot>;
  payload: ReturnType<typeof snapshotToPayload>;
  extensionVersion: string;
  parserVersion: string;
};

declare global {
  // eslint-disable-next-line no-var
  var __SF_NETWORK_SYNC__:
    | {
        extensionVersion: string;
        parserVersion: string;
        build: () => CaptureResult;
      }
    | undefined;
}

function buildCapture(): CaptureResult {
  const snapshot = buildPageSnapshot(location.href, document);
  return {
    ok: true,
    snapshot,
    payload: snapshotToPayload(snapshot),
    extensionVersion: EXTENSION_VERSION,
    parserVersion: PARSER_VERSION,
  };
}

/** Latest inject always overwrites — popup calls this via executeScript to avoid stale listeners. */
globalThis.__SF_NETWORK_SYNC__ = {
  extensionVersion: EXTENSION_VERSION,
  parserVersion: PARSER_VERSION,
  build: buildCapture,
};

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type === "PING") {
    sendResponse({
      ok: true,
      extensionVersion: EXTENSION_VERSION,
      parserVersion: PARSER_VERSION,
    });
    return true;
  }

  if (message?.type === "GET_PAGE_SNAPSHOT" || message?.type === "BUILD_SYNC_PAYLOAD") {
    try {
      const capture = buildCapture();
      sendResponse({
        ok: true,
        snapshot: capture.snapshot,
        payload: capture.payload,
        extensionVersion: capture.extensionVersion,
        parserVersion: capture.parserVersion,
      });
    } catch (e) {
      sendResponse({
        ok: false,
        error: e instanceof Error ? e.message : "Failed to parse page.",
        extensionVersion: EXTENSION_VERSION,
        parserVersion: PARSER_VERSION,
      });
    }
    return true;
  }

  return false;
});

startBackstageAutoSync();

export {};
