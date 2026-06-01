import { AUTO_SYNC_STORAGE_KEY } from "./autoSyncSettings";
import { DEFAULT_DEV, DEFAULT_PROD, fixKnownBaseUrlTypo, loadApiConfig, saveApiConfig } from "./config";

const useDevModeEl = document.getElementById("useDevMode") as HTMLInputElement;
const autoSyncEl = document.getElementById("autoSyncOnBackstage") as HTMLInputElement;
const apiBaseUrlEl = document.getElementById("apiBaseUrl") as HTMLInputElement;
const saveBtn = document.getElementById("save") as HTMLButtonElement;
const savedEl = document.getElementById("saved")!;

void loadApiConfig().then(async () => {
  const stored = await chrome.storage.sync.get(["apiBaseUrl", "useDevMode", AUTO_SYNC_STORAGE_KEY]);
  useDevModeEl.checked = stored.useDevMode === true;
  autoSyncEl.checked = stored[AUTO_SYNC_STORAGE_KEY] !== false;
  apiBaseUrlEl.value =
    typeof stored.apiBaseUrl === "string" ? stored.apiBaseUrl : stored.useDevMode ? DEFAULT_DEV : DEFAULT_PROD;
});

saveBtn.addEventListener("click", () => {
  void (async () => {
    const raw = apiBaseUrlEl.value.trim() || (useDevModeEl.checked ? DEFAULT_DEV : DEFAULT_PROD);
    const apiBaseUrl = fixKnownBaseUrlTypo(raw);
    apiBaseUrlEl.value = apiBaseUrl;
    await saveApiConfig({
      useDevMode: useDevModeEl.checked,
      apiBaseUrl,
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
