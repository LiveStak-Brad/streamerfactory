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
  function canonicalApiBaseUrl(base) {
    const normalized = normalizeBaseUrl(base);
    try {
      const u = new URL(normalized);
      if (u.hostname === "thestreamerfactory.com") {
        u.hostname = "www.thestreamerfactory.com";
        return u.origin;
      }
      return normalized;
    } catch {
      return normalized;
    }
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
  function resolveFetchBase(tab, apiBaseUrl) {
    const base = normalizeBaseUrl(apiBaseUrl);
    if (!tab.url) return base;
    try {
      const tabOrigin = new URL(tab.url).origin;
      if (tabOrigin === new URL(base).origin) return base;
      if (isStreamerFactoryTabUrl(tab.url, base)) return tabOrigin;
    } catch {
    }
    return base;
  }
  async function findStreamerFactoryTab(apiBaseUrl) {
    const base = normalizeBaseUrl(apiBaseUrl);
    const configuredOrigin = new URL(base).origin;
    const tabs = await chrome.tabs.query({});
    const matches = tabs.filter((t) => t.url && isStreamerFactoryTabUrl(t.url, base));
    const [active] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (active?.id && active.url && isStreamerFactoryTabUrl(active.url, base)) {
      return active;
    }
    return matches.find((t) => {
      try {
        return new URL(t.url).origin === configuredOrigin;
      } catch {
        return false;
      }
    }) ?? matches[0];
  }

  // src/sfFetch.ts
  function buildApiUrl(fetchBase, path) {
    const p = path.startsWith("/") ? path : `/${path}`;
    return `${fetchBase.replace(/\/$/, "")}${p}`;
  }
  function interpretApiResponse(url, result) {
    if (result.error) {
      throw new Error(result.error);
    }
    if (result.status === 301 || result.status === 302 || result.status === 307 || result.status === 308) {
      throw new Error("Session redirect \u2014 reload thestreamerfactory.com while logged in, then try again.");
    }
    const trimmed = result.text.trim();
    if (trimmed.startsWith("<") || trimmed.startsWith("<!")) {
      if (result.status === 404) {
        throw new Error(
          "Extension API not found (404). Deploy the latest Streamer Factory build, or set Options \u2192 API URL to http://localhost:3000 for local dev."
        );
      }
      throw new Error(
        "Not signed in on Streamer Factory. Open the site tab, reload it, then click Refresh preview."
      );
    }
    let json;
    try {
      json = JSON.parse(trimmed);
    } catch {
      throw new Error(`Invalid JSON (${result.status}) from ${url}. Check Options \u2192 API URL.`);
    }
    if (result.status >= 400) {
      throw new Error(json.error ?? `Request failed (${result.status})`);
    }
    return json;
  }
  async function cookieHeaderFor(baseUrl) {
    const origins = /* @__PURE__ */ new Set();
    try {
      const base = new URL(normalizeBaseUrl(baseUrl));
      origins.add(base.origin);
      if (isStreamerFactoryHostname(base.hostname)) {
        origins.add("https://thestreamerfactory.com");
        origins.add("https://www.thestreamerfactory.com");
      }
    } catch {
      return void 0;
    }
    const seen = /* @__PURE__ */ new Set();
    const parts = [];
    for (const origin of origins) {
      const cookies = await chrome.cookies.getAll({ url: `${origin}/` });
      for (const c of cookies) {
        if (seen.has(c.name)) continue;
        seen.add(c.name);
        parts.push(`${c.name}=${c.value}`);
      }
    }
    return parts.length > 0 ? parts.join("; ") : void 0;
  }
  async function mainWorldTabFetch(tabId, url, init) {
    const [injection] = await chrome.scripting.executeScript({
      target: { tabId },
      world: "MAIN",
      func: async (requestUrl, method, body) => {
        try {
          const res = await fetch(requestUrl, {
            method: method || "GET",
            credentials: "include",
            redirect: "manual",
            headers: {
              Accept: "application/json",
              ...body ? { "Content-Type": "application/json" } : {}
            },
            body: body || void 0
          });
          const text = await res.text();
          return { status: res.status, text: text.slice(0, 2e5) };
        } catch (e) {
          return { status: 0, text: "", error: e instanceof Error ? e.message : "fetch failed" };
        }
      },
      args: [url, init?.method ?? "GET", init?.body ?? null]
    });
    return injection?.result ?? { status: 0, text: "", error: "No result from page" };
  }
  async function extensionOriginFetch(url, init) {
    const cookie = await cookieHeaderFor(url);
    const headers = {
      Accept: "application/json",
      ...init?.headers
    };
    if (cookie) headers.Cookie = cookie;
    try {
      const res = await fetch(url, {
        method: init?.method ?? "GET",
        credentials: "include",
        redirect: "manual",
        headers,
        body: init?.body
      });
      const text = await res.text();
      return { status: res.status, text };
    } catch (e) {
      return { status: 0, text: "", error: e instanceof Error ? e.message : "Cannot reach API" };
    }
  }
  async function bridgeTabFetch(tabId, url, init) {
    try {
      const ping = await chrome.tabs.sendMessage(tabId, { type: "SF_PING" });
      if (!ping?.ok) throw new Error("no bridge");
    } catch {
      await chrome.scripting.executeScript({
        target: { tabId },
        files: ["dist/sf-bridge.js"]
      });
    }
    const res = await chrome.tabs.sendMessage(tabId, {
      type: "SF_FETCH",
      url,
      method: init?.method ?? "GET",
      body: init?.body
    });
    if (res?.ok && res.data !== void 0) {
      return { status: 200, text: JSON.stringify(res.data) };
    }
    if (typeof res?.status === "number" && typeof res?.text === "string") {
      return { status: res.status, text: res.text };
    }
    return { status: 0, text: "", error: res?.error ?? "Site fetch failed." };
  }
  async function requestStreamerFactoryApi(path, init) {
    const { apiBaseUrl: configured } = await loadApiConfig();
    const apiBaseUrl = canonicalApiBaseUrl(configured);
    const tab = await findStreamerFactoryTab(apiBaseUrl);
    if (!tab?.id) {
      throw new Error(
        `Keep ${apiBaseUrl} open in a tab while logged in as staff (owner/editor/admin), then click Refresh preview.`
      );
    }
    const fetchBase = resolveFetchBase(tab, apiBaseUrl);
    const url = buildApiUrl(fetchBase, path);
    const errors = [];
    const attempts = [
      () => mainWorldTabFetch(tab.id, url, init),
      () => extensionOriginFetch(url, init),
      () => bridgeTabFetch(tab.id, url, init)
    ];
    for (const attempt of attempts) {
      try {
        const result = await attempt();
        return interpretApiResponse(url, result);
      } catch (e) {
        errors.push(e instanceof Error ? e.message : "request failed");
      }
    }
    const unique = [...new Set(errors)];
    throw new Error(unique[0] ?? "Could not reach Streamer Factory API.");
  }

  // src/api.ts
  async function fetchMe() {
    return requestStreamerFactoryApi("/api/extension/me");
  }
  async function postImport(payload) {
    return requestStreamerFactoryApi("/api/extension/tiktok-network/import", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  }
  async function postClearLiveSnapshots() {
    return requestStreamerFactoryApi(
      "/api/extension/tiktok-network/clear-live",
      { method: "POST", body: "{}" }
    );
  }

  // src/autoSyncSettings.ts
  var AUTO_SYNC_STORAGE_KEY = "autoSyncOnBackstage";
  var AUTO_SYNC_MIN_INTERVAL_MS = 5 * 60 * 1e3;
  async function isAutoSyncEnabled() {
    const stored = await chrome.storage.sync.get([AUTO_SYNC_STORAGE_KEY]);
    return stored[AUTO_SYNC_STORAGE_KEY] === true;
  }

  // src/autoSyncBackground.ts
  function syncFingerprint(payload) {
    const rows = payload.rows?.length ?? 0;
    const live = payload.liveRows?.length ?? 0;
    const first = payload.rows?.[0]?.tiktokUsername ?? payload.liveRows?.[0]?.tiktokUsername ?? "";
    return `${payload.detectedPageType}|${payload.sourcePageUrl ?? ""}|${rows}|${live}|${first}`;
  }
  async function handleAutoSyncRequest(payload, reason) {
    if (!await isAutoSyncEnabled()) {
      return { ok: true, skipped: "disabled" };
    }
    const me = await fetchMe();
    if (!me.authenticated || !me.canImportTikTokNetworkStats) {
      return { ok: true, skipped: "not_staff" };
    }
    const fp = syncFingerprint(payload);
    const stored = await chrome.storage.local.get(["lastAutoSyncAt", "lastAutoSyncFingerprint"]);
    const lastAt = typeof stored.lastAutoSyncAt === "number" ? stored.lastAutoSyncAt : 0;
    const lastFp = typeof stored.lastAutoSyncFingerprint === "string" ? stored.lastAutoSyncFingerprint : "";
    if (lastFp === fp && Date.now() - lastAt < AUTO_SYNC_MIN_INTERVAL_MS) {
      return { ok: true, skipped: "throttled" };
    }
    const result = await postImport(payload);
    await chrome.storage.local.set({
      lastAutoSyncAt: Date.now(),
      lastAutoSyncFingerprint: fp,
      lastAutoSyncResult: {
        at: (/* @__PURE__ */ new Date()).toISOString(),
        reason,
        acceptedRows: result.acceptedRows ?? result.liveRowsAccepted ?? 0,
        siteUpdated: result.siteUpdated === true
      }
    });
    try {
      await chrome.action.setBadgeBackgroundColor({ color: "#059669" });
      await chrome.action.setBadgeText({ text: "\u2713" });
      setTimeout(() => {
        void chrome.action.setBadgeText({ text: "" });
      }, 8e3);
    } catch {
    }
    return { ok: true, result };
  }

  // src/background.ts
  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message?.type === "AUTO_SYNC_REQUEST") {
      handleAutoSyncRequest(message.payload, String(message.reason ?? "auto")).then((out) => sendResponse(out)).catch(
        (e) => sendResponse({ ok: false, error: e instanceof Error ? e.message : "Auto-sync failed." })
      );
      return true;
    }
    if (message?.type === "FETCH_ME") {
      fetchMe().then((me) => sendResponse({ ok: true, me })).catch((e) => sendResponse({ ok: false, error: e instanceof Error ? e.message : "Auth check failed." }));
      return true;
    }
    if (message?.type === "SYNC_IMPORT") {
      const payload = message.payload;
      postImport(payload).then((result) => sendResponse({ ok: true, result })).catch((e) => sendResponse({ ok: false, error: e instanceof Error ? e.message : "Sync failed." }));
      return true;
    }
    if (message?.type === "CLEAR_LIVE_SNAPSHOTS") {
      postClearLiveSnapshots().then((result) => sendResponse({ ok: true, result })).catch(
        (e) => sendResponse({ ok: false, error: e instanceof Error ? e.message : "Clear failed." })
      );
      return true;
    }
    return false;
  });
})();
