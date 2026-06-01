import { handleAutoSyncRequest } from "./autoSyncBackground";
import { fetchMe, postImport } from "./api";
import type { SyncPayload } from "./parser/types";

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type === "AUTO_SYNC_REQUEST") {
    handleAutoSyncRequest(message.payload as SyncPayload, String(message.reason ?? "auto"))
      .then((out) => sendResponse(out))
      .catch((e) =>
        sendResponse({ ok: false, error: e instanceof Error ? e.message : "Auto-sync failed." }),
      );
    return true;
  }

  if (message?.type === "FETCH_ME") {
    fetchMe()
      .then((me) => sendResponse({ ok: true, me }))
      .catch((e) => sendResponse({ ok: false, error: e instanceof Error ? e.message : "Auth check failed." }));
    return true;
  }

  if (message?.type === "SYNC_IMPORT") {
    const payload = message.payload as SyncPayload;
    postImport(payload)
      .then((result) => sendResponse({ ok: true, result }))
      .catch((e) => sendResponse({ ok: false, error: e instanceof Error ? e.message : "Sync failed." }));
    return true;
  }

  return false;
});

export {};
