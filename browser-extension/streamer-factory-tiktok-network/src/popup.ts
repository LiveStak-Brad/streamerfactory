import { loadApiConfig } from "./config";
import { isStreamerFactoryTabUrl } from "./siteTab";
import { getLastSuccessfulSync, recordSuccessfulSync } from "./parser/validateCapture";
import { EXTENSION_VERSION, PARSER_VERSION } from "./parser/version";
import type { PageSnapshot, SyncPayload } from "./parser/types";

const connectionEl = document.getElementById("connection")!;
const pageTypeEl = document.getElementById("pageType")!;
const rowCountEl = document.getElementById("rowCount")!;
const previewEl = document.getElementById("preview")!;
const syncBtn = document.getElementById("syncBtn") as HTMLButtonElement;
const clearLiveBtn = document.getElementById("clearLiveBtn") as HTMLButtonElement;
const refreshBtn = document.getElementById("refreshPreview") as HTMLButtonElement;
const copyCaptureBtn = document.getElementById("copyCapture") as HTMLButtonElement;
const syncResultEl = document.getElementById("syncResult")!;
const captureMetaEl = document.getElementById("captureMeta")!;
const viewRankingsBtn = document.getElementById("viewRankingsBtn") as HTMLButtonElement;

const pageTitleEl = document.getElementById("pageTitle")!;
const confidenceLineEl = document.getElementById("confidenceLine")!;
const rowsLineEl = document.getElementById("rowsLine")!;
const metricsLineEl = document.getElementById("metricsLine")!;
const lastSyncLineEl = document.getElementById("lastSyncLine")!;
const validationLineEl = document.getElementById("validationLine")!;
const syncSafePillEl = document.getElementById("syncSafePill")!;
const safetyPanelEl = document.getElementById("safetyPanel")!;

let latestPayload: SyncPayload | null = null;
let latestSnapshot: PageSnapshot | null = null;
let canImport = false;

const BACKSTAGE_HOST_RE = /live-backstage\.tiktok\.com|seller(-us)?\.tiktok\.com/i;

const SYNCABLE = new Set([
  "activity_incentive",
  "rank_up_incentive",
  "incremental_incentive",
  "creator_roster",
  "live_now",
]);

function isBackstageUrl(url: string | undefined): boolean {
  if (!url) return false;
  try {
    return BACKSTAGE_HOST_RE.test(new URL(url).hostname);
  } catch {
    return BACKSTAGE_HOST_RE.test(url);
  }
}

/** Open Backstage tabs (works even when popup is opened from Streamer Factory). */
async function findBackstageTabs(): Promise<chrome.tabs.Tab[]> {
  const tabs = await chrome.tabs.query({
    url: [
      "https://live-backstage.tiktok.com/*",
      "https://seller-us.tiktok.com/*",
      "https://seller.tiktok.com/*",
    ],
  });
  return tabs.filter((t) => typeof t.id === "number" && isBackstageUrl(t.url));
}

/**
 * Prefer the active Backstage tab; otherwise use any open Backstage tab.
 * Opening the popup on Streamer Factory must still reach Backstage data.
 */
async function resolveCaptureTab(): Promise<{
  tab: chrome.tabs.Tab;
  fromOtherTab: boolean;
} | null> {
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
  return { tab: pool[0]!, fromOtherTab: true };
}

function setConnection(text: string, kind: "ok" | "error" | "") {
  connectionEl.textContent = text;
  connectionEl.className = `status ${kind}`;
}

function confidenceLabel(c: number): string {
  if (!Number.isFinite(c)) return "Unknown";
  if (c >= 0.75) return "High";
  if (c >= 0.55) return "Medium";
  return "Low";
}

function isPhase1aSnapshot(snapshot: unknown): snapshot is PageSnapshot {
  if (!snapshot || typeof snapshot !== "object") return false;
  const s = snapshot as Record<string, unknown>;
  return (
    typeof s.datasetType === "string" &&
    typeof s.displayName === "string" &&
    typeof s.confidence === "number" &&
    Array.isArray(s.rows) &&
    Array.isArray(s.liveRows) &&
    Array.isArray(s.metricsAvailable)
  );
}

async function injectContentScript(tabId: number): Promise<void> {
  await chrome.scripting.executeScript({
    target: { tabId },
    files: ["dist/contentScript.js"],
  });
}

/**
 * Call the freshly injected builder directly.
 * Avoids chrome.tabs.sendMessage, which can be answered by older stacked content-script listeners.
 */
async function captureViaInjectedBuilder(tabId: number): Promise<{
  ok: boolean;
  payload?: SyncPayload;
  snapshot?: PageSnapshot;
  error?: string;
  extensionVersion?: string;
  parserVersion?: string;
}> {
  const [{ result } = { result: undefined }] = await chrome.scripting.executeScript({
    target: { tabId },
    func: () => {
      const api = (
        globalThis as unknown as {
          __SF_NETWORK_SYNC__?: {
            extensionVersion: string;
            parserVersion: string;
            build: () => {
              ok: true;
              snapshot: unknown;
              payload: unknown;
              extensionVersion: string;
              parserVersion: string;
            };
          };
        }
      ).__SF_NETWORK_SYNC__;

      if (!api?.build) {
        return {
          ok: false as const,
          error: "Capture API missing after inject.",
        };
      }
      try {
        return api.build();
      } catch (e) {
        return {
          ok: false as const,
          error: e instanceof Error ? e.message : "Capture failed.",
        };
      }
    },
  });

  if (!result) {
    return { ok: false, error: "No result from Backstage capture inject." };
  }

  if (!("ok" in result) || result.ok !== true) {
    return {
      ok: false,
      error:
        "error" in result && typeof result.error === "string"
          ? result.error
          : "Capture failed on Backstage page.",
    };
  }

  if (!isPhase1aSnapshot(result.snapshot)) {
    return {
      ok: false,
      error: `Capture returned an incomplete snapshot (parser ${"parserVersion" in result ? result.parserVersion : "?"}). Reload the extension and Backstage tab.`,
    };
  }

  return {
    ok: true,
    snapshot: result.snapshot,
    payload: result.payload as SyncPayload,
    extensionVersion: result.extensionVersion,
    parserVersion: result.parserVersion,
  };
}

async function buildPayloadFromTab(tabId: number): Promise<{
  ok: boolean;
  payload?: SyncPayload;
  snapshot?: PageSnapshot;
  error?: string;
}> {
  try {
    await injectContentScript(tabId);
  } catch (e) {
    return {
      ok: false,
      error:
        e instanceof Error
          ? e.message
          : "Could not inject into this tab. Reload the Backstage page, then try again.",
    };
  }

  try {
    let captured = await captureViaInjectedBuilder(tabId);
    if (!captured.ok) {
      // Retry once after a short delay (Backstage SPA may still be painting)
      await new Promise((r) => setTimeout(r, 400));
      await injectContentScript(tabId);
      captured = await captureViaInjectedBuilder(tabId);
    }
    if (!captured.ok) {
      return {
        ok: false,
        error:
          captured.error ??
          "Could not read Backstage. Reload chrome://extensions for this extension, reload the Backstage tab, then Refresh preview.",
      };
    }
    return {
      ok: true,
      payload: captured.payload,
      snapshot: captured.snapshot,
    };
  } catch (e) {
    return {
      ok: false,
      error:
        e instanceof Error
          ? e.message
          : "Backstage capture inject failed. Reload the Backstage tab and try again.",
    };
  }
}

async function resetSafetyPanel(message?: string) {
  pageTitleEl.textContent = "Detected page: —";
  confidenceLineEl.textContent = "Confidence: —";
  rowsLineEl.textContent = "Rows: —";
  metricsLineEl.textContent = "Metrics: —";
  lastSyncLineEl.textContent = "Last successful sync: —";
  validationLineEl.textContent = message ?? "Validation: —";
  syncSafePillEl.textContent = "Sync blocked";
  syncSafePillEl.className = "pill blocked";
  safetyPanelEl.className = "panel";
}

async function renderSafetyPanel(
  snapshot: PageSnapshot | null,
  options?: { noBackstageTab?: boolean },
) {
  if (options?.noBackstageTab) {
    pageTitleEl.textContent = "Staff login OK — no Backstage tab found";
    confidenceLineEl.textContent = "Confidence: —";
    rowsLineEl.textContent = "Rows: —";
    metricsLineEl.textContent = "Metrics: —";
    lastSyncLineEl.textContent = "Last successful sync: —";
    validationLineEl.textContent =
      "You're already signed in. Open live-backstage.tiktok.com (Activeness / Rank-up / Manage / LIVE), leave that tab open, then click Refresh preview — you can stay on Streamer Factory.";
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
  pageTitleEl.textContent = `${displayName} detected — ${confWord} confidence`;
  confidenceLineEl.textContent = `Confidence: ${confPct}% · parser ${parserVersion}`;

  const count = datasetType === "live_now" ? liveRows.length : rows.length;
  rowsLineEl.textContent = `${count} creator${count === 1 ? "" : "s"} found`;
  metricsLineEl.textContent =
    metrics.length > 0
      ? `Metrics available: ${metrics.join(", ")}`
      : "Metrics available: none detected";

  const last = await getLastSuccessfulSync(datasetType);
  lastSyncLineEl.textContent = last
    ? `Last successful sync for this page type: ${new Date(last).toLocaleString()}`
    : "Last successful sync for this page type: never";

  const validation = snapshot.validation;
  if (validation?.blocking?.length) {
    validationLineEl.textContent = `Validation: blocked — ${validation.blocking[0]}`;
  } else if (validation?.warnings?.length) {
    validationLineEl.textContent = `Validation: ok with warnings — ${validation.warnings[0]}`;
  } else if (validation?.syncSafe) {
    validationLineEl.textContent = "Validation: passed";
  } else {
    validationLineEl.textContent = "Validation: incomplete — refresh preview again";
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
      const hint = onSfSite
        ? `${res?.error ?? "Auth failed."} Reload this Streamer Factory tab (F5), then open Backstage.`
        : (res?.error ??
          "Not connected. Keep a Streamer Factory tab open (signed in as staff) while you use Backstage.");
      setConnection(hint, "error");
      canImport = false;
      return;
    }
    const me = res.me as {
      authenticated?: boolean;
      canImportTikTokNetworkStats?: boolean;
      role?: string;
    };
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
    if (onBackstage) {
      setConnection("Signed in as staff · reading this Backstage page…", "ok");
    } else if (onSfSite) {
      const backstageTabs = await findBackstageTabs();
      setConnection(
        backstageTabs.length > 0
          ? `Signed in as staff · ${backstageTabs.length} Backstage tab open — Refresh preview to read it`
          : "Signed in as staff · open a Backstage tab, then Refresh preview",
        "ok",
      );
    } else {
      setConnection("Signed in as staff · import enabled", "ok");
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
    rowCountEl.textContent = "Rows: —";
    previewEl.textContent =
      "You're already signed in as staff — no extra login needed.\n\n" +
      "No TikTok Backstage tab is open in Chrome right now.\n\n" +
      "Next step:\n" +
      "1. Open live-backstage.tiktok.com\n" +
      "2. Go to Activeness, Rank-up, Manage creators, or LIVE Now\n" +
      "3. Leave that tab open, come back here (or stay on Streamer Factory),\n" +
      "   and click Refresh preview — Sync works without switching tabs";
    latestPayload = null;
    latestSnapshot = null;
    syncBtn.disabled = true;
    captureMetaEl.textContent = `Extension ${EXTENSION_VERSION} · staff auth OK · need Backstage tab`;
    await renderSafetyPanel(null, { noBackstageTab: true });
    return;
  }

  const tabId = resolved.tab.id;
  const tabUrl = resolved.tab.url ?? "";

  try {
    if (resolved.fromOtherTab) {
      previewEl.textContent = "Found open Backstage tab — reading creator data…";
      captureMetaEl.textContent = `Extension ${EXTENSION_VERSION} · reading other tab · ${tabUrl.slice(0, 80)}`;
    }
    const res = await buildPayloadFromTab(tabId);
    if (!res.ok || !res.snapshot || !res.payload) {
      previewEl.textContent = res.error ?? "Reload this Backstage tab, then Refresh preview.";
      pageTypeEl.textContent = "Page: —";
      rowCountEl.textContent = "Rows: 0";
      latestPayload = null;
      latestSnapshot = null;
      syncBtn.disabled = true;
      await resetSafetyPanel(res.error ?? "Could not read page");
      captureMetaEl.textContent = `Extension ${EXTENSION_VERSION} · capture failed`;
      return;
    }

    const snapshot = res.snapshot;
    const payload = res.payload;
    latestPayload = payload;
    latestSnapshot = snapshot;

    const statRows = snapshot.rows ?? [];
    const liveRows = snapshot.liveRows ?? [];
    const count = snapshot.datasetType === "live_now" ? liveRows.length : statRows.length;

    pageTypeEl.textContent = `Page: ${snapshot.datasetType}${
      snapshot.relationshipTab ? ` · ${snapshot.relationshipTab}` : ""
    }${resolved.fromOtherTab ? " · via open Backstage tab" : ""}`;
    rowCountEl.textContent = `Rows: ${count}`;

    await renderSafetyPanel(snapshot);
    if (resolved.fromOtherTab) {
      validationLineEl.textContent =
        (validationLineEl.textContent ?? "") +
        " · Captured from your open Backstage tab (you can stay on Streamer Factory).";
    }

    const previewLines =
      snapshot.datasetType === "live_now"
        ? liveRows
            .slice(0, 5)
            .map(
              (r) =>
                `@${r.tiktokUsername} [${(r.usernameConfidence ?? "low").toUpperCase()}] · ${r.displayName ?? ""}`,
            )
        : snapshot.datasetType === "creator_roster"
          ? statRows
              .slice(0, 5)
              .map(
                (r) =>
                  `@${r.tiktokUsername} · ${r.creatorNetworkStatus ?? r.inviteStatus ?? "roster"} · ${(r.usernameConfidence ?? "low").toUpperCase()}`,
              )
          : statRows.slice(0, 5).map((r) => {
              const diamonds =
                r.diamondsEarned != null
                  ? `${r.diamondsEarned.toLocaleString()} diamonds`
                  : "diamonds: not available";
              const hours =
                r.hoursStreamed != null ? `${r.hoursStreamed}h` : "hours: not available";
              const days = r.daysStreamed != null ? `${r.daysStreamed}d` : "days: not available";
              return `@${r.tiktokUsername} · ${diamonds} · ${days} · ${hours}`;
            });

    const onLiveNow = snapshot.datasetType === "live_now";
    clearLiveBtn.style.display = onLiveNow && canImport ? "block" : "none";

    if (previewLines.length > 0) {
      previewEl.textContent = previewLines.join("\n");
    } else if (onLiveNow) {
      previewEl.textContent =
        "LIVE now · 0 creators found. Scroll cards into view, hover truncated names, then Refresh.";
    } else if (snapshot.headersFound?.length) {
      previewEl.textContent =
        "Page detected, but 0 creator rows are in the DOM yet.\n\n" +
        "1. Scroll the creator table so rows are visible\n" +
        "2. Wait 1–2 seconds for Backstage to finish loading\n" +
        "3. Click Refresh preview again\n\n" +
        `Headers seen: ${snapshot.headersFound.slice(0, 6).join(" · ")}`;
    } else {
      previewEl.textContent =
        "No rows detected. Scroll the table into view, or confirm you are on the expected page.";
    }

    if (snapshot.validation?.blocking?.length) {
      previewEl.textContent +=
        "\n\nSync blocked:\n- " + snapshot.validation.blocking.slice(0, 3).join("\n- ");
    } else if (snapshot.validation?.warnings?.length) {
      previewEl.textContent +=
        "\n\nWarnings:\n- " + snapshot.validation.warnings.slice(0, 3).join("\n- ");
    }

    const matched = Array.isArray(snapshot.matchedSignals) ? snapshot.matchedSignals : [];
    const missing = Array.isArray(snapshot.missingSignals) ? snapshot.missingSignals : [];
    captureMetaEl.textContent = `Signals: ${matched.slice(0, 4).join(" · ") || "none"} · missing: ${
      missing.slice(0, 3).join(" · ") || "none"
    }`;

    const syncSafe = Boolean(snapshot.validation?.syncSafe && SYNCABLE.has(snapshot.datasetType));
    syncBtn.disabled = !canImport || !syncSafe;
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unexpected error reading Backstage.";
    previewEl.textContent =
      `${msg}\n\n` +
      "1. chrome://extensions → Reload this extension\n" +
      "2. Reload the Backstage tab\n" +
      "3. Click Refresh preview again";
    pageTypeEl.textContent = "Page: —";
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

function showRankingsLink(apiBaseUrl: string, path = "/rankings") {
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
    syncResultEl.textContent =
      latestSnapshot.validation?.blocking?.[0] ??
      "Sync blocked — page identity or validation failed. Fix the page and Refresh preview.";
    return;
  }

  if (latestPayload.syncBlocked) {
    syncResultEl.textContent = "Payload marked syncBlocked. Refresh preview on a safe page.";
    return;
  }

  syncBtn.disabled = true;
  hideRankingsLink();
  syncResultEl.textContent = "Syncing…";

  const { apiBaseUrl } = await loadApiConfig();

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
      performanceStatsWarning?: string;
      siteUpdated?: boolean;
      rankingsPath?: string;
      datasetType?: string;
      rosterDiff?: {
        missingFromBackstage?: string[];
        newCreatorCandidates?: string[];
        websiteOnlyStaticEntries?: string[];
      };
      syncBlocked?: boolean;
    };

    if (result.syncBlocked) {
      syncResultEl.textContent = "Server rejected sync as blocked — previous data preserved.";
      syncBtn.disabled = false;
      return;
    }

    const accepted = result.acceptedRows ?? result.liveRowsAccepted ?? 0;
    const rankingNote = result.siteUpdated
      ? " · rankings updated"
      : latestSnapshot.datasetType === "activity_incentive"
        ? " · rankings NOT updated (accepted 0 or server ignored Activeness)"
        : " · rankings unchanged (this page type does not write diamonds)";
    syncResultEl.textContent = `Done · ${result.datasetType ?? latestSnapshot.datasetType} · batch ${result.batchId?.slice(0, 8) ?? "?"}… · accepted ${accepted} · rejected ${
      result.rejectedRows ?? 0
    }${
      result.unmatchedUsernames?.length
        ? ` · unmatched: ${result.unmatchedUsernames.slice(0, 3).join(", ")}`
        : ""
    }${rankingNote}`;

    if (result.rosterDiff) {
      const missing = result.rosterDiff.missingFromBackstage?.length ?? 0;
      const candidates = result.rosterDiff.newCreatorCandidates?.length ?? 0;
      const staticOnly = result.rosterDiff.websiteOnlyStaticEntries?.length ?? 0;
      syncResultEl.textContent += `\nRoster diff preview: ${missing} missing from Backstage · ${candidates} new candidates · ${staticOnly} website-only static`;
    }

    if (result.performanceStatsWarning) {
      syncResultEl.textContent += `\n\n⚠ ${result.performanceStatsWarning}`;
    }

    if (accepted > 0) {
      await recordSuccessfulSync(latestSnapshot.datasetType);
      await renderSafetyPanel(latestSnapshot);
    }

    const membersPath =
      latestSnapshot.datasetType === "live_now"
        ? "/members"
        : latestSnapshot.datasetType === "creator_roster"
          ? "/admin/creator-network"
          : (result.rankingsPath ?? "/rankings");
    if (
      (result.siteUpdated && accepted > 0) ||
      ((latestSnapshot.datasetType === "live_now" ||
        latestSnapshot.datasetType === "creator_roster") &&
        accepted > 0)
    ) {
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
  syncResultEl.textContent = "Clearing LIVE snapshots…";
  try {
    const res = await chrome.runtime.sendMessage({ type: "CLEAR_LIVE_SNAPSHOTS" });
    if (!res?.ok) {
      syncResultEl.textContent = res?.error ?? "Clear failed.";
      clearLiveBtn.disabled = false;
      return;
    }
    const deleted = (res.result as { deleted?: number })?.deleted ?? 0;
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
    capturedAt: new Date().toISOString(),
    pageType: latestSnapshot.datasetType,
    confidence: latestSnapshot.confidence,
    validation: latestSnapshot.validation,
    relationshipTab: latestSnapshot.relationshipTab,
    rowCount:
      latestSnapshot.datasetType === "live_now"
        ? latestSnapshot.liveRows.length
        : latestSnapshot.rows.length,
    payload: latestPayload,
    snapshot: latestSnapshot,
  };
  await navigator.clipboard.writeText(JSON.stringify(capture, null, 2));
  syncResultEl.textContent = "Capture JSON copied.";
});

void (async () => {
  await checkConnection();
  await refreshPreview();
})();
