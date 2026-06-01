"use strict";
(() => {
  // src/config.ts
  var DEFAULT_PROD = "https://www.thestreamerfactory.com";
  var DEFAULT_DEV = "http://localhost:3000";
  var STREAMER_FACTORY_HOSTS = /* @__PURE__ */ new Set([
    "thestreamerfactory.com",
    "www.thestreamerfactory.com",
    "streamerfactory.com",
    "www.streamerfactory.com"
  ]);
  function isStreamerFactoryHostname(hostname) {
    return STREAMER_FACTORY_HOSTS.has(hostname.toLowerCase()) || hostname === "localhost";
  }
  function fixKnownBaseUrlTypo(base) {
    return base.replace(/^https:\/\/streamerfactory\.com/i, "https://thestreamerfactory.com").replace(/^http:\/\/streamerfactory\.com/i, "https://thestreamerfactory.com").replace(/^https:\/\/www\.streamerfactory\.com/i, "https://www.thestreamerfactory.com");
  }
  function normalizeBaseUrl(raw) {
    const v = fixKnownBaseUrlTypo((raw ?? DEFAULT_PROD).trim().replace(/\/$/, ""));
    return v || DEFAULT_PROD;
  }
  async function loadApiConfig() {
    const stored = await chrome.storage.sync.get(["apiBaseUrl", "useDevMode"]);
    const useDev = stored.useDevMode === true;
    const raw = typeof stored.apiBaseUrl === "string" && stored.apiBaseUrl.length > 0 ? stored.apiBaseUrl : useDev ? DEFAULT_DEV : DEFAULT_PROD;
    const base = normalizeBaseUrl(raw);
    if (typeof stored.apiBaseUrl === "string" && stored.apiBaseUrl !== base) {
      await chrome.storage.sync.set({ apiBaseUrl: base });
    }
    return { apiBaseUrl: base };
  }

  // src/siteTab.ts
  function isStreamerFactoryTabUrl(tabUrl, apiBaseUrl) {
    try {
      const tab = new URL(tabUrl);
      const configured = new URL(normalizeBaseUrl(apiBaseUrl));
      if (tab.origin === configured.origin) return true;
      if (tab.hostname === "localhost" && configured.hostname === "localhost") {
        return tab.port === configured.port;
      }
      return isStreamerFactoryHostname(tab.hostname) && isStreamerFactoryHostname(configured.hostname);
    } catch {
      return false;
    }
  }

  // src/popup.ts
  var connectionEl = document.getElementById("connection");
  var pageTypeEl = document.getElementById("pageType");
  var rowCountEl = document.getElementById("rowCount");
  var previewEl = document.getElementById("preview");
  var syncBtn = document.getElementById("syncBtn");
  var refreshBtn = document.getElementById("refreshPreview");
  var copyCaptureBtn = document.getElementById("copyCapture");
  var syncResultEl = document.getElementById("syncResult");
  var captureMetaEl = document.getElementById("captureMeta");
  var latestPayload = null;
  var latestSnapshot = null;
  var canImport = false;
  var BACKSTAGE_HOST_RE = /live-backstage\.tiktok\.com|seller(-us)?\.tiktok\.com/i;
  function isBackstageUrl(url) {
    if (!url) return false;
    try {
      return BACKSTAGE_HOST_RE.test(new URL(url).hostname);
    } catch {
      return BACKSTAGE_HOST_RE.test(url);
    }
  }
  function setConnection(text, kind) {
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
        const hint = onSfSite ? `${res?.error ?? "Auth failed."} Reload this tab (F5), then click Refresh preview.` : res?.error ?? "Not connected. Keep thestreamerfactory.com open in another tab while using Backstage.";
        setConnection(hint, "error");
        canImport = false;
        return;
      }
      const me = res.me;
      if (!me.authenticated) {
        setConnection("Sign in at thestreamerfactory.com (staff account).", "error");
        canImport = false;
        return;
      }
      if (!me.canImportTikTokNetworkStats) {
        setConnection(`Signed in (${me.role ?? "user"}) \u2014 staff role required to import.`, "error");
        canImport = false;
        return;
      }
      setConnection("Connected \xB7 staff import enabled", "ok");
      canImport = true;
    } catch {
      setConnection("Could not reach Streamer Factory API. Check options URL.", "error");
      canImport = false;
    }
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
      rowCountEl.textContent = "Rows: \u2014";
      previewEl.textContent = "This tab is your Streamer Factory website \u2014 used only to verify staff login.\n\nTo preview creators:\n1. Open live-backstage.tiktok.com\n2. Reload that tab\n3. Click Refresh preview again";
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
            files: ["dist/contentScript.js"]
          });
          res = await chrome.tabs.sendMessage(tabId, { type: "BUILD_SYNC_PAYLOAD" });
        } catch {
          res = null;
        }
      }
      if (!res?.ok) {
        previewEl.textContent = res?.error ?? "Reload this Backstage tab, then click Refresh preview again.";
        pageTypeEl.textContent = "Page: \u2014";
        rowCountEl.textContent = "Rows: 0";
        latestPayload = null;
        latestSnapshot = null;
        syncBtn.disabled = true;
        return;
      }
      const snapshot = res.snapshot;
      const payload = res.payload;
      latestPayload = payload;
      latestSnapshot = snapshot;
      const statRows = snapshot.rows?.length ? snapshot.rows : payload.rows ?? [];
      const liveRows = snapshot.liveRows?.length ? snapshot.liveRows : payload.liveRows ?? [];
      pageTypeEl.textContent = `Page: ${snapshot.detectedPageType}${snapshot.relationshipTab ? ` \xB7 ${snapshot.relationshipTab}` : ""}`;
      const count = snapshot.detectedPageType === "live_now" ? liveRows.length : statRows.length;
      rowCountEl.textContent = `Rows: ${count}`;
      const previewLines = snapshot.detectedPageType === "live_now" ? liveRows.slice(0, 5).map(
        (r) => `@${r.tiktokUsername} [${(r.usernameConfidence ?? "low").toUpperCase()}] \xB7 ${r.displayName ?? ""}`
      ) : statRows.slice(0, 5).map((r) => {
        const diamonds = r.diamondsEarned != null ? `${r.diamondsEarned.toLocaleString()} diamonds` : "diamonds: \u2014";
        return `@${r.tiktokUsername} \xB7 ${diamonds} \xB7 ${(r.usernameConfidence ?? "low").toUpperCase()} confidence`;
      });
      if (previewLines.length > 0) {
        previewEl.textContent = previewLines.join("\n");
      } else if (snapshot.detectedPageType === "live_now") {
        previewEl.textContent = "Page detected: LIVE now \xB7 0 creators on screen.\n(Empty state is OK \u2014 sync when someone is live, or try Manage Relationship / stats pages.)";
      } else {
        previewEl.textContent = "No rows detected on this page yet. Scroll the table into view or try another Backstage tab.";
      }
      const lowConfidence = snapshot.detectedPageType === "live_now" ? liveRows.filter((r) => r.usernameConfidence === "low").length : statRows.filter((r) => r.usernameConfidence === "low").length;
      captureMetaEl.textContent = `Capture: ${snapshot.detectedPageType} \xB7 low-confidence usernames: ${lowConfidence}`;
      syncBtn.disabled = !canImport || count === 0;
    } catch {
      previewEl.textContent = "Backstage tab not ready. Reload live-backstage.tiktok.com, then click Refresh preview again.";
      pageTypeEl.textContent = "Page: \u2014";
      rowCountEl.textContent = "Rows: 0";
      syncBtn.disabled = true;
      latestSnapshot = null;
    }
  }
  async function syncNow() {
    if (!latestPayload || !canImport) return;
    syncBtn.disabled = true;
    syncResultEl.textContent = "Syncing\u2026";
    try {
      const res = await chrome.runtime.sendMessage({ type: "SYNC_IMPORT", payload: latestPayload });
      if (!res?.ok) {
        syncResultEl.textContent = res?.error ?? "Sync failed.";
        syncBtn.disabled = false;
        return;
      }
      const result = res.result;
      syncResultEl.textContent = `Done \xB7 batch ${result.batchId?.slice(0, 8)}\u2026 \xB7 accepted ${result.acceptedRows ?? result.liveRowsAccepted ?? 0} \xB7 rejected ${result.rejectedRows ?? 0}${result.unmatchedUsernames?.length ? ` \xB7 unmatched: ${result.unmatchedUsernames.slice(0, 3).join(", ")}` : ""}`;
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
      capturedAt: (/* @__PURE__ */ new Date()).toISOString(),
      pageType: latestSnapshot.detectedPageType,
      relationshipTab: latestSnapshot.relationshipTab,
      rowCount: latestSnapshot.detectedPageType === "live_now" ? latestSnapshot.liveRows.length : latestSnapshot.rows.length,
      payload: latestPayload,
      snapshot: latestSnapshot
    };
    const text = JSON.stringify(capture, null, 2);
    await navigator.clipboard.writeText(text);
    syncResultEl.textContent = "Capture JSON copied.";
  });
  void (async () => {
    await checkConnection();
    await refreshPreview();
  })();
})();
