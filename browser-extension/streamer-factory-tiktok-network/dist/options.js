"use strict";
(() => {
  // src/autoSyncSettings.ts
  var AUTO_SYNC_STORAGE_KEY = "autoSyncOnBackstage";
  var AUTO_SYNC_MIN_INTERVAL_MS = 5 * 60 * 1e3;

  // src/config.ts
  var DEFAULT_PROD = "https://www.thestreamerfactory.com";
  var DEFAULT_DEV = "http://localhost:3000";
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
  async function saveApiConfig(config) {
    await chrome.storage.sync.set(config);
  }

  // src/options.ts
  var useDevModeEl = document.getElementById("useDevMode");
  var autoSyncEl = document.getElementById("autoSyncOnBackstage");
  var apiBaseUrlEl = document.getElementById("apiBaseUrl");
  var saveBtn = document.getElementById("save");
  var savedEl = document.getElementById("saved");
  void loadApiConfig().then(async () => {
    const stored = await chrome.storage.sync.get(["apiBaseUrl", "useDevMode", AUTO_SYNC_STORAGE_KEY]);
    useDevModeEl.checked = stored.useDevMode === true;
    autoSyncEl.checked = stored[AUTO_SYNC_STORAGE_KEY] !== false;
    apiBaseUrlEl.value = typeof stored.apiBaseUrl === "string" ? stored.apiBaseUrl : stored.useDevMode ? DEFAULT_DEV : DEFAULT_PROD;
  });
  saveBtn.addEventListener("click", () => {
    void (async () => {
      const raw = apiBaseUrlEl.value.trim() || (useDevModeEl.checked ? DEFAULT_DEV : DEFAULT_PROD);
      const apiBaseUrl = fixKnownBaseUrlTypo(raw);
      apiBaseUrlEl.value = apiBaseUrl;
      await saveApiConfig({
        useDevMode: useDevModeEl.checked,
        apiBaseUrl
      });
      await chrome.storage.sync.set({ [AUTO_SYNC_STORAGE_KEY]: autoSyncEl.checked });
      savedEl.textContent = "Saved.";
    })();
  });
  useDevModeEl.addEventListener("change", () => {
    if (useDevModeEl.checked && !apiBaseUrlEl.value.includes("localhost")) {
      apiBaseUrlEl.value = DEFAULT_DEV;
    } else if (!useDevModeEl.checked && apiBaseUrlEl.value.includes("localhost")) {
      apiBaseUrlEl.value = DEFAULT_PROD;
    }
  });
})();
