import { canonicalApiBaseUrl, isStreamerFactoryHostname, loadApiConfig, normalizeBaseUrl } from "./config";
import { findStreamerFactoryTab, resolveFetchBase } from "./siteTab";

type RawFetchResult = {
  status: number;
  text: string;
  error?: string;
};

function buildApiUrl(fetchBase: string, path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${fetchBase.replace(/\/$/, "")}${p}`;
}

export function interpretApiResponse<T>(url: string, result: RawFetchResult): T {
  if (result.error) {
    throw new Error(result.error);
  }

  if (result.status === 301 || result.status === 302 || result.status === 307 || result.status === 308) {
    throw new Error("Session redirect — reload thestreamerfactory.com while logged in, then try again.");
  }

  const trimmed = result.text.trim();
  if (trimmed.startsWith("<") || trimmed.startsWith("<!")) {
    if (result.status === 404) {
      throw new Error(
        "Extension API not found (404). Deploy the latest Streamer Factory build, or set Options → API URL to http://localhost:3000 for local dev.",
      );
    }
    throw new Error(
      "Not signed in on Streamer Factory. Open the site tab, reload it, then click Refresh preview.",
    );
  }

  let json: T & { error?: string };
  try {
    json = JSON.parse(trimmed) as T & { error?: string };
  } catch {
    throw new Error(`Invalid JSON (${result.status}) from ${url}. Check Options → API URL.`);
  }

  if (result.status >= 400) {
    throw new Error(json.error ?? `Request failed (${result.status})`);
  }

  return json;
}

/** Read Supabase session cookies for production (www + apex). */
export async function cookieHeaderFor(baseUrl: string): Promise<string | undefined> {
  const origins = new Set<string>();
  try {
    const base = new URL(normalizeBaseUrl(baseUrl));
    origins.add(base.origin);
    if (isStreamerFactoryHostname(base.hostname)) {
      origins.add("https://thestreamerfactory.com");
      origins.add("https://www.thestreamerfactory.com");
    }
  } catch {
    return undefined;
  }

  const seen = new Set<string>();
  const parts: string[] = [];
  for (const origin of origins) {
    const cookies = await chrome.cookies.getAll({ url: `${origin}/` });
    for (const c of cookies) {
      if (seen.has(c.name)) continue;
      seen.add(c.name);
      parts.push(`${c.name}=${c.value}`);
    }
  }
  return parts.length > 0 ? parts.join("; ") : undefined;
}

/** Runs fetch in the page's main world so session cookies match the logged-in tab. */
export async function mainWorldTabFetch(
  tabId: number,
  url: string,
  init?: { method?: string; body?: string },
): Promise<RawFetchResult> {
  const [injection] = await chrome.scripting.executeScript({
    target: { tabId },
    world: "MAIN",
    func: async (requestUrl: string, method: string, body: string | null) => {
      try {
        const res = await fetch(requestUrl, {
          method: method || "GET",
          credentials: "include",
          redirect: "manual",
          headers: {
            Accept: "application/json",
            ...(body ? { "Content-Type": "application/json" } : {}),
          },
          body: body || undefined,
        });
        const text = await res.text();
        return { status: res.status, text: text.slice(0, 200000) };
      } catch (e) {
        return { status: 0, text: "", error: e instanceof Error ? e.message : "fetch failed" };
      }
    },
    args: [url, init?.method ?? "GET", init?.body ?? null],
  });

  return (injection?.result ?? { status: 0, text: "", error: "No result from page" }) as RawFetchResult;
}

export async function extensionOriginFetch(
  url: string,
  init?: { method?: string; body?: string; headers?: Record<string, string> },
): Promise<RawFetchResult> {
  const cookie = await cookieHeaderFor(url);
  const headers: Record<string, string> = {
    Accept: "application/json",
    ...init?.headers,
  };
  if (cookie) headers.Cookie = cookie;

  try {
    const res = await fetch(url, {
      method: init?.method ?? "GET",
      credentials: "include",
      redirect: "manual",
      headers,
      body: init?.body,
    });
    const text = await res.text();
    return { status: res.status, text };
  } catch (e) {
    return { status: 0, text: "", error: e instanceof Error ? e.message : "Cannot reach API" };
  }
}

async function bridgeTabFetch(
  tabId: number,
  url: string,
  init?: { method?: string; body?: string },
): Promise<RawFetchResult> {
  try {
    const ping = await chrome.tabs.sendMessage(tabId, { type: "SF_PING" });
    if (!ping?.ok) throw new Error("no bridge");
  } catch {
    await chrome.scripting.executeScript({
      target: { tabId },
      files: ["dist/sf-bridge.js"],
    });
  }

  const res = (await chrome.tabs.sendMessage(tabId, {
    type: "SF_FETCH",
    url,
    method: init?.method ?? "GET",
    body: init?.body,
  })) as { ok: boolean; data?: unknown; error?: string; status?: number; text?: string };

  if (res?.ok && res.data !== undefined) {
    return { status: 200, text: JSON.stringify(res.data) };
  }

  if (typeof res?.status === "number" && typeof res?.text === "string") {
    return { status: res.status, text: res.text };
  }

  return { status: 0, text: "", error: res?.error ?? "Site fetch failed." };
}

/**
 * Call Streamer Factory API using every available auth path (cookies in page, extension, bridge).
 */
export async function requestStreamerFactoryApi<T>(
  path: string,
  init?: { method?: string; body?: string },
): Promise<T> {
  const { apiBaseUrl: configured } = await loadApiConfig();
  const apiBaseUrl = canonicalApiBaseUrl(configured);
  const tab = await findStreamerFactoryTab(apiBaseUrl);
  if (!tab?.id) {
    throw new Error(
      `Keep ${apiBaseUrl} open in a tab while logged in as staff (owner/editor/admin), then click Refresh preview.`,
    );
  }

  const fetchBase = resolveFetchBase(tab, apiBaseUrl);
  const url = buildApiUrl(fetchBase, path);
  const errors: string[] = [];

  const attempts: Array<() => Promise<RawFetchResult>> = [
    () => mainWorldTabFetch(tab.id!, url, init),
    () => extensionOriginFetch(url, init),
    () => bridgeTabFetch(tab.id!, url, init),
  ];

  for (const attempt of attempts) {
    try {
      const result = await attempt();
      return interpretApiResponse<T>(url, result);
    } catch (e) {
      errors.push(e instanceof Error ? e.message : "request failed");
    }
  }

  const unique = [...new Set(errors)];
  throw new Error(unique[0] ?? "Could not reach Streamer Factory API.");
}
