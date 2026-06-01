const DEFAULT_PROD = "https://thestreamerfactory.com";
const DEFAULT_DEV = "http://localhost:3000";
export function normalizeBaseUrl(raw) {
    const v = (raw ?? DEFAULT_PROD).trim().replace(/\/$/, "");
    return v || DEFAULT_PROD;
}
export async function loadApiConfig() {
    const stored = await chrome.storage.sync.get(["apiBaseUrl", "useDevMode"]);
    const useDev = stored.useDevMode === true;
    const base = normalizeBaseUrl(typeof stored.apiBaseUrl === "string" && stored.apiBaseUrl.length > 0
        ? stored.apiBaseUrl
        : useDev
            ? DEFAULT_DEV
            : DEFAULT_PROD);
    return { apiBaseUrl: base };
}
export async function saveApiConfig(config) {
    await chrome.storage.sync.set(config);
}
export { DEFAULT_DEV, DEFAULT_PROD };
