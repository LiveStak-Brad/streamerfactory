export type ApiConfig = {
  apiBaseUrl: string;
};

/** Production canonical host (apex redirects here). */
const DEFAULT_PROD = "https://www.thestreamerfactory.com";
const DEFAULT_DEV = "http://localhost:3000";

/** Hostnames we treat as the same Streamer Factory site (www / typo variants). */
export const STREAMER_FACTORY_HOSTS = new Set([
  "thestreamerfactory.com",
  "www.thestreamerfactory.com",
  "streamerfactory.com",
  "www.streamerfactory.com",
]);

export function isStreamerFactoryHostname(hostname: string): boolean {
  return STREAMER_FACTORY_HOSTS.has(hostname.toLowerCase()) || hostname === "localhost";
}

/** Fix common Options typo (missing "the"). */
export function fixKnownBaseUrlTypo(base: string): string {
  return base
    .replace(/^https:\/\/streamerfactory\.com/i, "https://thestreamerfactory.com")
    .replace(/^http:\/\/streamerfactory\.com/i, "https://thestreamerfactory.com")
    .replace(/^https:\/\/www\.streamerfactory\.com/i, "https://www.thestreamerfactory.com");
}

export function normalizeBaseUrl(raw: string | undefined): string {
  const v = fixKnownBaseUrlTypo((raw ?? DEFAULT_PROD).trim().replace(/\/$/, ""));
  return v || DEFAULT_PROD;
}

/** Prefer www in production so API calls skip apex → www redirects. */
export function canonicalApiBaseUrl(base: string): string {
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

export async function loadApiConfig(): Promise<ApiConfig> {
  const stored = await chrome.storage.sync.get(["apiBaseUrl", "useDevMode"]);
  const useDev = stored.useDevMode === true;
  const raw =
    typeof stored.apiBaseUrl === "string" && stored.apiBaseUrl.length > 0
      ? stored.apiBaseUrl
      : useDev
        ? DEFAULT_DEV
        : DEFAULT_PROD;
  const base = normalizeBaseUrl(raw);
  if (typeof stored.apiBaseUrl === "string" && stored.apiBaseUrl !== base) {
    await chrome.storage.sync.set({ apiBaseUrl: base });
  }
  return { apiBaseUrl: base };
}

export async function saveApiConfig(config: { apiBaseUrl?: string; useDevMode?: boolean }): Promise<void> {
  await chrome.storage.sync.set(config);
}

export { DEFAULT_DEV, DEFAULT_PROD };
