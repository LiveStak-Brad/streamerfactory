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

  // src/parser/version.ts
  var PARSER_VERSION = "1a.5";
  var EXTENSION_VERSION = "0.2.7";

  // src/parser/parsers/shared.ts
  var ROW_SELECTORS = [
    '[role="row"]',
    "table tbody tr",
    ".semi-table-tbody .semi-table-row",
    '[class*="semi-table-row"]:not([class*="row-head"]):not([class*="header"])',
    '[class*="TableBody"] [class*="Row"]',
    '[class*="table-body"] [class*="row"]',
    '[class*="TableRow"]'
  ].join(", ");

  // src/parser/validateCapture.ts
  var LAST_SYNC_KEY = "sf_last_successful_sync_by_page";
  async function getLastSuccessfulSync(datasetType) {
    try {
      const stored = await chrome.storage.local.get(LAST_SYNC_KEY);
      const map = stored[LAST_SYNC_KEY] ?? {};
      return map[datasetType] ?? null;
    } catch {
      return null;
    }
  }
  async function recordSuccessfulSync(datasetType) {
    try {
      const stored = await chrome.storage.local.get(LAST_SYNC_KEY);
      const map = { ...stored[LAST_SYNC_KEY] ?? {} };
      map[datasetType] = (/* @__PURE__ */ new Date()).toISOString();
      await chrome.storage.local.set({ [LAST_SYNC_KEY]: map });
    } catch {
    }
  }

  // src/popup.ts
  var connectionEl = document.getElementById("connection");
  var pageTypeEl = document.getElementById("pageType");
  var rowCountEl = document.getElementById("rowCount");
  var previewEl = document.getElementById("preview");
  var syncBtn = document.getElementById("syncBtn");
  var clearLiveBtn = document.getElementById("clearLiveBtn");
  var refreshBtn = document.getElementById("refreshPreview");
  var copyCaptureBtn = document.getElementById("copyCapture");
  var syncResultEl = document.getElementById("syncResult");
  var captureMetaEl = document.getElementById("captureMeta");
  var viewRankingsBtn = document.getElementById("viewRankingsBtn");
  var pageTitleEl = document.getElementById("pageTitle");
  var confidenceLineEl = document.getElementById("confidenceLine");
  var rowsLineEl = document.getElementById("rowsLine");
  var metricsLineEl = document.getElementById("metricsLine");
  var lastSyncLineEl = document.getElementById("lastSyncLine");
  var validationLineEl = document.getElementById("validationLine");
  var syncSafePillEl = document.getElementById("syncSafePill");
  var safetyPanelEl = document.getElementById("safetyPanel");
  var latestPayload = null;
  var latestSnapshot = null;
  var canImport = false;
  var BACKSTAGE_HOST_RE = /live-backstage\.tiktok\.com|seller(-us)?\.tiktok\.com/i;
  var SYNCABLE = /* @__PURE__ */ new Set([
    "activity_incentive",
    "rank_up_incentive",
    "incremental_incentive",
    "creator_roster",
    "live_now"
  ]);
  function isBackstageUrl(url) {
    if (!url) return false;
    try {
      return BACKSTAGE_HOST_RE.test(new URL(url).hostname);
    } catch {
      return BACKSTAGE_HOST_RE.test(url);
    }
  }
  async function findBackstageTabs() {
    const tabs = await chrome.tabs.query({
      url: [
        "https://live-backstage.tiktok.com/*",
        "https://seller-us.tiktok.com/*",
        "https://seller.tiktok.com/*"
      ]
    });
    return tabs.filter((t) => typeof t.id === "number" && isBackstageUrl(t.url));
  }
  async function resolveCaptureTab() {
    const [active] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (active?.id != null && isBackstageUrl(active.url)) {
      return { tab: active, fromOtherTab: false };
    }
    const backstage = await findBackstageTabs();
    if (backstage.length === 0) return null;
    const windowId = active?.windowId;
    const sameWindow = windowId != null ? backstage.filter((t) => t.windowId === windowId) : [];
    const pool = sameWindow.length > 0 ? sameWindow : backstage;
    pool.sort((a, b) => (b.lastAccessed ?? 0) - (a.lastAccessed ?? 0));
    return { tab: pool[0], fromOtherTab: true };
  }
  function setConnection(text, kind) {
    connectionEl.textContent = text;
    connectionEl.className = `status ${kind}`;
  }
  function confidenceLabel(c) {
    if (!Number.isFinite(c)) return "Unknown";
    if (c >= 0.75) return "High";
    if (c >= 0.55) return "Medium";
    return "Low";
  }
  function isPhase1aSnapshot(snapshot) {
    if (!snapshot || typeof snapshot !== "object") return false;
    const s = snapshot;
    return typeof s.datasetType === "string" && typeof s.displayName === "string" && typeof s.confidence === "number" && Array.isArray(s.rows) && Array.isArray(s.liveRows) && Array.isArray(s.metricsAvailable);
  }
  async function injectContentScript(tabId) {
    await chrome.scripting.executeScript({
      target: { tabId },
      files: ["dist/contentScript.js"]
    });
  }
  async function captureViaInjectedBuilder(tabId) {
    const [{ result } = { result: void 0 }] = await chrome.scripting.executeScript({
      target: { tabId },
      func: () => {
        const api = globalThis.__SF_NETWORK_SYNC__;
        if (!api?.build) {
          return {
            ok: false,
            error: "Capture API missing after inject."
          };
        }
        try {
          return api.build();
        } catch (e) {
          return {
            ok: false,
            error: e instanceof Error ? e.message : "Capture failed."
          };
        }
      }
    });
    if (!result) {
      return { ok: false, error: "No result from Backstage capture inject." };
    }
    if (!("ok" in result) || result.ok !== true) {
      return {
        ok: false,
        error: "error" in result && typeof result.error === "string" ? result.error : "Capture failed on Backstage page."
      };
    }
    if (!isPhase1aSnapshot(result.snapshot)) {
      return {
        ok: false,
        error: `Capture returned an incomplete snapshot (parser ${"parserVersion" in result ? result.parserVersion : "?"}). Reload the extension and Backstage tab.`
      };
    }
    return {
      ok: true,
      snapshot: result.snapshot,
      payload: result.payload,
      extensionVersion: result.extensionVersion,
      parserVersion: result.parserVersion
    };
  }
  async function buildPayloadFromTab(tabId) {
    try {
      await injectContentScript(tabId);
    } catch (e) {
      return {
        ok: false,
        error: e instanceof Error ? e.message : "Could not inject into this tab. Reload the Backstage page, then try again."
      };
    }
    try {
      let captured = await captureViaInjectedBuilder(tabId);
      if (!captured.ok) {
        await new Promise((r) => setTimeout(r, 400));
        await injectContentScript(tabId);
        captured = await captureViaInjectedBuilder(tabId);
      }
      if (!captured.ok) {
        return {
          ok: false,
          error: captured.error ?? "Could not read Backstage. Reload chrome://extensions for this extension, reload the Backstage tab, then Refresh preview."
        };
      }
      return {
        ok: true,
        payload: captured.payload,
        snapshot: captured.snapshot
      };
    } catch (e) {
      return {
        ok: false,
        error: e instanceof Error ? e.message : "Backstage capture inject failed. Reload the Backstage tab and try again."
      };
    }
  }
  async function resetSafetyPanel(message) {
    pageTitleEl.textContent = "Detected page: \u2014";
    confidenceLineEl.textContent = "Confidence: \u2014";
    rowsLineEl.textContent = "Rows: \u2014";
    metricsLineEl.textContent = "Metrics: \u2014";
    lastSyncLineEl.textContent = "Last successful sync: \u2014";
    validationLineEl.textContent = message ?? "Validation: \u2014";
    syncSafePillEl.textContent = "Sync blocked";
    syncSafePillEl.className = "pill blocked";
    safetyPanelEl.className = "panel";
  }
  async function renderSafetyPanel(snapshot, options) {
    if (options?.noBackstageTab) {
      pageTitleEl.textContent = "Staff login OK \u2014 no Backstage tab found";
      confidenceLineEl.textContent = "Confidence: \u2014";
      rowsLineEl.textContent = "Rows: \u2014";
      metricsLineEl.textContent = "Metrics: \u2014";
      lastSyncLineEl.textContent = "Last successful sync: \u2014";
      validationLineEl.textContent = "You're already signed in. Open live-backstage.tiktok.com (Activeness / Rank-up / Manage / LIVE), leave that tab open, then click Refresh preview \u2014 you can stay on Streamer Factory.";
      syncSafePillEl.textContent = "Waiting for Backstage tab";
      syncSafePillEl.className = "pill blocked";
      safetyPanelEl.className = "panel";
      return;
    }
    if (!snapshot) {
      await resetSafetyPanel();
      return;
    }
    const confidence = Number.isFinite(snapshot.confidence) ? snapshot.confidence : 0;
    const displayName = snapshot.displayName || snapshot.datasetType || "Unknown page";
    const parserVersion = snapshot.parserVersion || PARSER_VERSION;
    const metrics = Array.isArray(snapshot.metricsAvailable) ? snapshot.metricsAvailable : [];
    const rows = Array.isArray(snapshot.rows) ? snapshot.rows : [];
    const liveRows = Array.isArray(snapshot.liveRows) ? snapshot.liveRows : [];
    const datasetType = snapshot.datasetType || "unknown";
    const confPct = Math.round(confidence * 100);
    const confWord = confidenceLabel(confidence);
    pageTitleEl.textContent = `${displayName} detected \u2014 ${confWord} confidence`;
    confidenceLineEl.textContent = `Confidence: ${confPct}% \xB7 parser ${parserVersion}`;
    const count = datasetType === "live_now" ? liveRows.length : rows.length;
    rowsLineEl.textContent = `${count} creator${count === 1 ? "" : "s"} found`;
    metricsLineEl.textContent = metrics.length > 0 ? `Metrics available: ${metrics.join(", ")}` : "Metrics available: none detected";
    const last = await getLastSuccessfulSync(datasetType);
    lastSyncLineEl.textContent = last ? `Last successful sync for this page type: ${new Date(last).toLocaleString()}` : "Last successful sync for this page type: never";
    const validation = snapshot.validation;
    if (validation?.blocking?.length) {
      validationLineEl.textContent = `Validation: blocked \u2014 ${validation.blocking[0]}`;
    } else if (validation?.warnings?.length) {
      validationLineEl.textContent = `Validation: ok with warnings \u2014 ${validation.warnings[0]}`;
    } else if (validation?.syncSafe) {
      validationLineEl.textContent = "Validation: passed";
    } else {
      validationLineEl.textContent = "Validation: incomplete \u2014 refresh preview again";
    }
    const safe = Boolean(validation?.syncSafe && SYNCABLE.has(datasetType));
    syncSafePillEl.textContent = safe ? "Safe to sync" : "Sync blocked";
    syncSafePillEl.className = safe ? "pill safe" : "pill blocked";
  }
  async function checkConnection() {
    const { apiBaseUrl } = await loadApiConfig();
    const [active] = await chrome.tabs.query({ active: true, currentWindow: true });
    const onSfSite = active?.url ? isStreamerFactoryTabUrl(active.url, apiBaseUrl) : false;
    const onBackstage = isBackstageUrl(active?.url);
    try {
      const res = await chrome.runtime.sendMessage({ type: "FETCH_ME" });
      if (!res?.ok) {
        const hint = onSfSite ? `${res?.error ?? "Auth failed."} Reload this Streamer Factory tab (F5), then open Backstage.` : res?.error ?? "Not connected. Keep a Streamer Factory tab open (signed in as staff) while you use Backstage.";
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
      if (onBackstage) {
        setConnection("Signed in as staff \xB7 reading this Backstage page\u2026", "ok");
      } else if (onSfSite) {
        const backstageTabs = await findBackstageTabs();
        setConnection(
          backstageTabs.length > 0 ? `Signed in as staff \xB7 ${backstageTabs.length} Backstage tab open \u2014 Refresh preview to read it` : "Signed in as staff \xB7 open a Backstage tab, then Refresh preview",
          "ok"
        );
      } else {
        setConnection("Signed in as staff \xB7 import enabled", "ok");
      }
      canImport = true;
    } catch {
      setConnection("Could not reach Streamer Factory API. Check options URL.", "error");
      canImport = false;
    }
  }
  async function refreshPreview() {
    syncResultEl.textContent = "";
    hideRankingsLink();
    const resolved = await resolveCaptureTab();
    if (!resolved?.tab.id) {
      pageTypeEl.textContent = "Page: Streamer Factory website";
      rowCountEl.textContent = "Rows: \u2014";
      previewEl.textContent = "You're already signed in as staff \u2014 no extra login needed.\n\nNo TikTok Backstage tab is open in Chrome right now.\n\nNext step:\n1. Open live-backstage.tiktok.com\n2. Go to Activeness, Rank-up, Manage creators, or LIVE Now\n3. Leave that tab open, come back here (or stay on Streamer Factory),\n   and click Refresh preview \u2014 Sync works without switching tabs";
      latestPayload = null;
      latestSnapshot = null;
      syncBtn.disabled = true;
      captureMetaEl.textContent = `Extension ${EXTENSION_VERSION} \xB7 staff auth OK \xB7 need Backstage tab`;
      await renderSafetyPanel(null, { noBackstageTab: true });
      return;
    }
    const tabId = resolved.tab.id;
    const tabUrl = resolved.tab.url ?? "";
    try {
      if (resolved.fromOtherTab) {
        previewEl.textContent = "Found open Backstage tab \u2014 reading creator data\u2026";
        captureMetaEl.textContent = `Extension ${EXTENSION_VERSION} \xB7 reading other tab \xB7 ${tabUrl.slice(0, 80)}`;
      }
      const res = await buildPayloadFromTab(tabId);
      if (!res.ok || !res.snapshot || !res.payload) {
        previewEl.textContent = res.error ?? "Reload this Backstage tab, then Refresh preview.";
        pageTypeEl.textContent = "Page: \u2014";
        rowCountEl.textContent = "Rows: 0";
        latestPayload = null;
        latestSnapshot = null;
        syncBtn.disabled = true;
        await resetSafetyPanel(res.error ?? "Could not read page");
        captureMetaEl.textContent = `Extension ${EXTENSION_VERSION} \xB7 capture failed`;
        return;
      }
      const snapshot = res.snapshot;
      const payload = res.payload;
      latestPayload = payload;
      latestSnapshot = snapshot;
      const statRows = snapshot.rows ?? [];
      const liveRows = snapshot.liveRows ?? [];
      const count = snapshot.datasetType === "live_now" ? liveRows.length : statRows.length;
      pageTypeEl.textContent = `Page: ${snapshot.datasetType}${snapshot.relationshipTab ? ` \xB7 ${snapshot.relationshipTab}` : ""}${resolved.fromOtherTab ? " \xB7 via open Backstage tab" : ""}`;
      rowCountEl.textContent = `Rows: ${count}`;
      await renderSafetyPanel(snapshot);
      if (resolved.fromOtherTab) {
        validationLineEl.textContent = (validationLineEl.textContent ?? "") + " \xB7 Captured from your open Backstage tab (you can stay on Streamer Factory).";
      }
      const previewLines = snapshot.datasetType === "live_now" ? liveRows.slice(0, 5).map(
        (r) => `@${r.tiktokUsername} [${(r.usernameConfidence ?? "low").toUpperCase()}] \xB7 ${r.displayName ?? ""}`
      ) : snapshot.datasetType === "creator_roster" ? statRows.slice(0, 5).map(
        (r) => `@${r.tiktokUsername} \xB7 ${r.creatorNetworkStatus ?? r.inviteStatus ?? "roster"} \xB7 ${(r.usernameConfidence ?? "low").toUpperCase()}`
      ) : statRows.slice(0, 5).map((r) => {
        const diamonds = r.diamondsEarned != null ? `${r.diamondsEarned.toLocaleString()} diamonds` : "diamonds: not available";
        const hours = r.hoursStreamed != null ? `${r.hoursStreamed}h` : "hours: not available";
        const days = r.daysStreamed != null ? `${r.daysStreamed}d` : "days: not available";
        return `@${r.tiktokUsername} \xB7 ${diamonds} \xB7 ${days} \xB7 ${hours}`;
      });
      const onLiveNow = snapshot.datasetType === "live_now";
      clearLiveBtn.style.display = onLiveNow && canImport ? "block" : "none";
      if (previewLines.length > 0) {
        previewEl.textContent = previewLines.join("\n");
      } else if (onLiveNow) {
        previewEl.textContent = "LIVE now \xB7 0 creators found. Scroll cards into view, hover truncated names, then Refresh.";
      } else if (snapshot.headersFound?.length) {
        previewEl.textContent = `Page detected, but 0 creator rows are in the DOM yet.

1. Scroll the creator table so rows are visible
2. Wait 1\u20132 seconds for Backstage to finish loading
3. Click Refresh preview again

Headers seen: ${snapshot.headersFound.slice(0, 6).join(" \xB7 ")}`;
      } else {
        previewEl.textContent = "No rows detected. Scroll the table into view, or confirm you are on the expected page.";
      }
      if (snapshot.validation?.blocking?.length) {
        previewEl.textContent += "\n\nSync blocked:\n- " + snapshot.validation.blocking.slice(0, 3).join("\n- ");
      } else if (snapshot.validation?.warnings?.length) {
        previewEl.textContent += "\n\nWarnings:\n- " + snapshot.validation.warnings.slice(0, 3).join("\n- ");
      }
      const matched = Array.isArray(snapshot.matchedSignals) ? snapshot.matchedSignals : [];
      const missing = Array.isArray(snapshot.missingSignals) ? snapshot.missingSignals : [];
      captureMetaEl.textContent = `Signals: ${matched.slice(0, 4).join(" \xB7 ") || "none"} \xB7 missing: ${missing.slice(0, 3).join(" \xB7 ") || "none"}`;
      const syncSafe = Boolean(snapshot.validation?.syncSafe && SYNCABLE.has(snapshot.datasetType));
      syncBtn.disabled = !canImport || !syncSafe;
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Unexpected error reading Backstage.";
      previewEl.textContent = `${msg}

1. chrome://extensions \u2192 Reload this extension
2. Reload the Backstage tab
3. Click Refresh preview again`;
      pageTypeEl.textContent = "Page: \u2014";
      rowCountEl.textContent = "Rows: 0";
      syncBtn.disabled = true;
      latestSnapshot = null;
      latestPayload = null;
      await resetSafetyPanel(msg);
    }
  }
  function hideRankingsLink() {
    viewRankingsBtn.style.display = "none";
    viewRankingsBtn.disabled = true;
  }
  function showRankingsLink(apiBaseUrl, path = "/rankings") {
    const url = `${apiBaseUrl.replace(/\/$/, "")}${path}`;
    viewRankingsBtn.style.display = "block";
    viewRankingsBtn.disabled = false;
    viewRankingsBtn.onclick = () => {
      void chrome.tabs.create({ url });
    };
  }
  async function syncNow() {
    if (!latestPayload || !canImport || !latestSnapshot) return;
    if (!latestSnapshot.validation?.syncSafe || !SYNCABLE.has(latestSnapshot.datasetType)) {
      syncResultEl.textContent = latestSnapshot.validation?.blocking?.[0] ?? "Sync blocked \u2014 page identity or validation failed. Fix the page and Refresh preview.";
      return;
    }
    if (latestPayload.syncBlocked) {
      syncResultEl.textContent = "Payload marked syncBlocked. Refresh preview on a safe page.";
      return;
    }
    syncBtn.disabled = true;
    hideRankingsLink();
    syncResultEl.textContent = "Syncing\u2026";
    const { apiBaseUrl } = await loadApiConfig();
    try {
      const res = await chrome.runtime.sendMessage({ type: "SYNC_IMPORT", payload: latestPayload });
      if (!res?.ok) {
        syncResultEl.textContent = res?.error ?? "Sync failed.";
        syncBtn.disabled = false;
        return;
      }
      const result = res.result;
      if (result.syncBlocked) {
        syncResultEl.textContent = "Server rejected sync as blocked \u2014 previous data preserved.";
        syncBtn.disabled = false;
        return;
      }
      const accepted = result.acceptedRows ?? result.liveRowsAccepted ?? 0;
      const rankingNote = result.siteUpdated ? " \xB7 rankings updated" : latestSnapshot.datasetType === "activity_incentive" ? " \xB7 rankings NOT updated (accepted 0 or server ignored Activeness)" : " \xB7 rankings unchanged (this page type does not write diamonds)";
      syncResultEl.textContent = `Done \xB7 ${result.datasetType ?? latestSnapshot.datasetType} \xB7 batch ${result.batchId?.slice(0, 8) ?? "?"}\u2026 \xB7 accepted ${accepted} \xB7 rejected ${result.rejectedRows ?? 0}${result.unmatchedUsernames?.length ? ` \xB7 unmatched: ${result.unmatchedUsernames.slice(0, 3).join(", ")}` : ""}${rankingNote}`;
      if (result.rosterDiff) {
        const missing = result.rosterDiff.missingFromBackstage?.length ?? 0;
        const candidates = result.rosterDiff.newCreatorCandidates?.length ?? 0;
        const staticOnly = result.rosterDiff.websiteOnlyStaticEntries?.length ?? 0;
        syncResultEl.textContent += `
Roster diff preview: ${missing} missing from Backstage \xB7 ${candidates} new candidates \xB7 ${staticOnly} website-only static`;
      }
      if (result.performanceStatsWarning) {
        syncResultEl.textContent += `

\u26A0 ${result.performanceStatsWarning}`;
      }
      if (accepted > 0) {
        await recordSuccessfulSync(latestSnapshot.datasetType);
        await renderSafetyPanel(latestSnapshot);
      }
      const membersPath = latestSnapshot.datasetType === "live_now" ? "/members" : latestSnapshot.datasetType === "creator_roster" ? "/admin/creator-network" : result.rankingsPath ?? "/rankings";
      if (result.siteUpdated && accepted > 0 || (latestSnapshot.datasetType === "live_now" || latestSnapshot.datasetType === "creator_roster") && accepted > 0) {
        showRankingsLink(apiBaseUrl, membersPath);
      }
    } catch (e) {
      syncResultEl.textContent = e instanceof Error ? e.message : "Sync failed.";
    }
    syncBtn.disabled = false;
  }
  refreshBtn.addEventListener("click", () => void refreshPreview());
  syncBtn.addEventListener("click", () => void syncNow());
  clearLiveBtn.addEventListener("click", () => void clearLiveOnSite());
  async function clearLiveOnSite() {
    if (!canImport) return;
    clearLiveBtn.disabled = true;
    syncResultEl.textContent = "Clearing LIVE snapshots\u2026";
    try {
      const res = await chrome.runtime.sendMessage({ type: "CLEAR_LIVE_SNAPSHOTS" });
      if (!res?.ok) {
        syncResultEl.textContent = res?.error ?? "Clear failed.";
        clearLiveBtn.disabled = false;
        return;
      }
      const deleted = res.result?.deleted ?? 0;
      syncResultEl.textContent = `Cleared ${deleted} LIVE row(s) on the site. Refresh preview, then Sync.`;
      const { apiBaseUrl } = await loadApiConfig();
      showRankingsLink(apiBaseUrl, "/members");
    } catch (e) {
      syncResultEl.textContent = e instanceof Error ? e.message : "Clear failed.";
    }
    clearLiveBtn.disabled = false;
  }
  copyCaptureBtn.addEventListener("click", async () => {
    if (!latestSnapshot || !latestPayload) {
      syncResultEl.textContent = "Refresh preview first.";
      return;
    }
    const capture = {
      capturedAt: (/* @__PURE__ */ new Date()).toISOString(),
      pageType: latestSnapshot.datasetType,
      confidence: latestSnapshot.confidence,
      validation: latestSnapshot.validation,
      relationshipTab: latestSnapshot.relationshipTab,
      rowCount: latestSnapshot.datasetType === "live_now" ? latestSnapshot.liveRows.length : latestSnapshot.rows.length,
      payload: latestPayload,
      snapshot: latestSnapshot
    };
    await navigator.clipboard.writeText(JSON.stringify(capture, null, 2));
    syncResultEl.textContent = "Capture JSON copied.";
  });
  void (async () => {
    await checkConnection();
    await refreshPreview();
  })();
})();
