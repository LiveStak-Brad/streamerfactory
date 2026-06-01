import { isStreamerFactoryHostname, normalizeBaseUrl } from "./config";

/** Tab URL matches configured API or any Streamer Factory host (www / typo). */
export function isStreamerFactoryTabUrl(tabUrl: string, apiBaseUrl: string): boolean {
  try {
    const tab = new URL(tabUrl);
    const configured = new URL(normalizeBaseUrl(apiBaseUrl));

    if (tab.origin === configured.origin) return true;

    if (tab.hostname === "localhost" && configured.hostname === "localhost") {
      return tab.port === configured.port;
    }

    return (
      isStreamerFactoryHostname(tab.hostname) && isStreamerFactoryHostname(configured.hostname)
    );
  } catch {
    return false;
  }
}

/** Use the open tab's origin for fetch when Options URL typo differs from where you're logged in. */
export function resolveFetchBase(tab: chrome.tabs.Tab, apiBaseUrl: string): string {
  const base = normalizeBaseUrl(apiBaseUrl);
  if (!tab.url) return base;
  try {
    const tabOrigin = new URL(tab.url).origin;
    if (tabOrigin === new URL(base).origin) return base;
    if (isStreamerFactoryTabUrl(tab.url, base)) return tabOrigin;
  } catch {
    /* keep configured base */
  }
  return base;
}

export async function findStreamerFactoryTab(apiBaseUrl: string): Promise<chrome.tabs.Tab | undefined> {
  const base = normalizeBaseUrl(apiBaseUrl);
  const configuredOrigin = new URL(base).origin;
  const tabs = await chrome.tabs.query({});
  const matches = tabs.filter((t) => t.url && isStreamerFactoryTabUrl(t.url, base));

  const [active] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (active?.id && active.url && isStreamerFactoryTabUrl(active.url, base)) {
    return active;
  }

  return (
    matches.find((t) => {
      try {
        return new URL(t.url!).origin === configuredOrigin;
      } catch {
        return false;
      }
    }) ?? matches[0]
  );
}
