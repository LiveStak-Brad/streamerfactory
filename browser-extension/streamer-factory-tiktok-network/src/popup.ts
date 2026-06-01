import { loadApiConfig } from "./config";
import { isStreamerFactoryTabUrl } from "./siteTab";
import type { PageSnapshot, SyncPayload } from "./parser/types";

const connectionEl = document.getElementById("connection")!;
const pageTypeEl = document.getElementById("pageType")!;
const rowCountEl = document.getElementById("rowCount")!;
const previewEl = document.getElementById("preview")!;
const syncBtn = document.getElementById("syncBtn") as HTMLButtonElement;
const refreshBtn = document.getElementById("refreshPreview") as HTMLButtonElement;
const copyCaptureBtn = document.getElementById("copyCapture") as HTMLButtonElement;
const syncResultEl = document.getElementById("syncResult")!;
const captureMetaEl = document.getElementById("captureMeta")!;

let latestPayload: SyncPayload | null = null;
let latestSnapshot: PageSnapshot | null = null;
let canImport = false;

const BACKSTAGE_HOST_RE = /live-backstage\.tiktok\.com|seller(-us)?\.tiktok\.com/i;

function isBackstageUrl(url: string | undefined): boolean {
  if (!url) return false;
  try {
    return BACKSTAGE_HOST_RE.test(new URL(url).hostname);
  } catch {
    return BACKSTAGE_HOST_RE.test(url);
  }
}

function setConnection(text: string, kind: "ok" | "error" | "") {
  connectionEl.textContent = text;
  connectionEl.className = `status ${kind}`;
}

async function checkConnection() {
  const { apiBaseUrl } = await loadApiConfig();
  const [active] = await chrome.tabs.query({ active: true, currentWindow: true });
  const onSfSite = active?.url ? isStreamerFactoryTabUrl(active.url, apiBaseUrl) : false;

  try {
    const res = await chrome.runtime.sendMessage({ type: "FETCH_ME" });
    if (!res?.ok) {
      const hint = onSfSite
        ? `${res?.error ?? "Auth failed."} Reload this tab (F5), then click Refresh preview.`
        : (res?.error ?? "Not connected. Keep thestreamerfactory.com open in another tab while using Backstage.");
      setConnection(hint, "error");
      canImport = false;
      return;
    }
    const me = res.me as { authenticated?: boolean; canImportTikTokNetworkStats?: boolean; role?: string };
    if (!me.authenticated) {
      setConnection("Sign in at thestreamerfactory.com (staff account).", "error");
      canImport = false;
      return;
    }
    if (!me.canImportTikTokNetworkStats) {
      setConnection(`Signed in (${me.role ?? "user"}) — staff role required to import.`, "error");
      canImport = false;
      return;
    }
    setConnection("Connected · staff import enabled", "ok");
    canImport = true;
  } catch {
    setConnection("Could not reach Streamer Factory API. Check options URL.", "error");
    canImport = false;
  }
}

async function getActiveTabId(): Promise<number | undefined> {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab?.id;
}

async function refreshPreview() {
  syncResultEl.textContent = "";
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const tabId = tab?.id;
  const tabUrl = tab?.url;

  if (!tabId) {
    previewEl.textContent = "No active tab.";
    return;
  }

  if (!isBackstageUrl(tabUrl)) {
    pageTypeEl.textContent = "Page: Streamer Factory (no TikTok data here)";
    rowCountEl.textContent = "Rows: —";
    previewEl.textContent =
      "This tab is your Streamer Factory website — used only to verify staff login.\n\n" +
      "To preview creators:\n" +
      "1. Open live-backstage.tiktok.com\n" +
      "2. Reload that tab\n" +
      "3. Click Refresh preview again";
    latestPayload = null;
    latestSnapshot = null;
    syncBtn.disabled = true;
    captureMetaEl.textContent = "Capture mode: switch to TikTok Backstage first.";
    return;
  }

  try {
    let res = await chrome.tabs.sendMessage(tabId, { type: "BUILD_SYNC_PAYLOAD" }).catch(() => null);
    if (!res?.ok) {
      try {
        await chrome.scripting.executeScript({
          target: { tabId },
          files: ["dist/contentScript.js"],
        });
        res = await chrome.tabs.sendMessage(tabId, { type: "BUILD_SYNC_PAYLOAD" });
      } catch {
        res = null;
      }
    }
    if (!res?.ok) {
      previewEl.textContent = res?.error ?? "Reload this Backstage tab, then click Refresh preview again.";
      pageTypeEl.textContent = "Page: —";
      rowCountEl.textContent = "Rows: 0";
      latestPayload = null;
      latestSnapshot = null;
      syncBtn.disabled = true;
      return;
    }

    const snapshot = res.snapshot as PageSnapshot;
    latestPayload = res.payload as SyncPayload;
    latestSnapshot = snapshot;

    pageTypeEl.textContent = `Page: ${snapshot.detectedPageType}${
      snapshot.relationshipTab ? ` · ${snapshot.relationshipTab}` : ""
    }`;
    const count =
      snapshot.detectedPageType === "live_now" ? snapshot.liveRows.length : snapshot.rows.length;
    rowCountEl.textContent = `Rows: ${count}`;

    const previewLines =
      snapshot.detectedPageType === "live_now"
        ? snapshot.liveRows
            .slice(0, 5)
            .map((r) => `@${r.tiktokUsername} [${(r.usernameConfidence ?? "low").toUpperCase()}] · ${r.displayName ?? ""}`)
        : snapshot.rows
            .slice(0, 5)
            .map((r) => `@${r.tiktokUsername} [${(r.usernameConfidence ?? "low").toUpperCase()}] · ${r.displayName ?? ""}`);

    if (previewLines.length > 0) {
      previewEl.textContent = previewLines.join("\n");
    } else if (snapshot.detectedPageType === "live_now") {
      previewEl.textContent =
        "Page detected: LIVE now · 0 creators on screen.\n(Empty state is OK — sync when someone is live, or try Manage Relationship / stats pages.)";
    } else {
      previewEl.textContent = "No rows detected on this page yet. Scroll the table into view or try another Backstage tab.";
    }

    const lowConfidence =
      snapshot.detectedPageType === "live_now"
        ? snapshot.liveRows.filter((r) => r.usernameConfidence === "low").length
        : snapshot.rows.filter((r) => r.usernameConfidence === "low").length;
    captureMetaEl.textContent = `Capture: ${snapshot.detectedPageType} · low-confidence usernames: ${lowConfidence}`;

    syncBtn.disabled = !canImport || count === 0;
  } catch {
    previewEl.textContent =
      "Backstage tab not ready. Reload live-backstage.tiktok.com, then click Refresh preview again.";
    pageTypeEl.textContent = "Page: —";
    rowCountEl.textContent = "Rows: 0";
    syncBtn.disabled = true;
    latestSnapshot = null;
  }
}

async function syncNow() {
  if (!latestPayload || !canImport) return;
  syncBtn.disabled = true;
  syncResultEl.textContent = "Syncing…";

  try {
    const res = await chrome.runtime.sendMessage({ type: "SYNC_IMPORT", payload: latestPayload });
    if (!res?.ok) {
      syncResultEl.textContent = res?.error ?? "Sync failed.";
      syncBtn.disabled = false;
      return;
    }
    const result = res.result as {
      batchId?: string;
      acceptedRows?: number;
      rejectedRows?: number;
      unmatchedUsernames?: string[];
      liveRowsAccepted?: number;
    };
    syncResultEl.textContent = `Done · batch ${result.batchId?.slice(0, 8)}… · accepted ${
      result.acceptedRows ?? result.liveRowsAccepted ?? 0
    } · rejected ${result.rejectedRows ?? 0}${
      result.unmatchedUsernames?.length ? ` · unmatched: ${result.unmatchedUsernames.slice(0, 3).join(", ")}` : ""
    }`;
  } catch (e) {
    syncResultEl.textContent = e instanceof Error ? e.message : "Sync failed.";
  }

  syncBtn.disabled = false;
}

refreshBtn.addEventListener("click", () => void refreshPreview());
syncBtn.addEventListener("click", () => void syncNow());
copyCaptureBtn.addEventListener("click", async () => {
  if (!latestSnapshot || !latestPayload) {
    syncResultEl.textContent = "Refresh preview first.";
    return;
  }
  const capture = {
    capturedAt: new Date().toISOString(),
    pageType: latestSnapshot.detectedPageType,
    relationshipTab: latestSnapshot.relationshipTab,
    rowCount: latestSnapshot.detectedPageType === "live_now" ? latestSnapshot.liveRows.length : latestSnapshot.rows.length,
    payload: latestPayload,
    snapshot: latestSnapshot,
  };
  const text = JSON.stringify(capture, null, 2);
  await navigator.clipboard.writeText(text);
  syncResultEl.textContent = "Capture JSON copied.";
});

void (async () => {
  await checkConnection();
  await refreshPreview();
})();
