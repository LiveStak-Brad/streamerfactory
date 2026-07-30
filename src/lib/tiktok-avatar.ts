/**
 * Profile photo URLs from TikTok usernames (no TikTok API key).
 * Uses unavatar.io, which scrapes https://www.tiktok.com/@handle for avatarLarger.
 *
 * Some handles resolve more reliably when unavatar is given the full profile URL
 * instead of the short /tiktok/:username path — both are tried.
 */

/** Strip @ and trim for URLs and matching. */
export function normalizeTikTokHandle(raw: string): string {
  return raw.trim().replace(/^@+/, "");
}

/** Public member / API param: TikTok handle segment (letters, digits, `_`, `.`). */
export const TIKTOK_HANDLE_PARAM_RE = /^[a-zA-Z0-9._]{1,64}$/;

export function isValidPublicTikTokHandle(handle: string): boolean {
  return Boolean(handle && TIKTOK_HANDLE_PARAM_RE.test(handle));
}

/** Public profile URL for a handle (no @ in path segment). */
export function getTikTokProfileUrl(handle: string): string | null {
  const h = normalizeTikTokHandle(handle);
  if (!h) return null;
  return `https://www.tiktok.com/@${h}`;
}

/** Ordered image URLs to try if one fails (full-profile variants first — often better for odd handles). */
export function getTikTokAvatarUrlCandidates(handle: string): string[] {
  const h = normalizeTikTokHandle(handle);
  if (!h) return [];
  const e = encodeURIComponent(h);
  const profileUrl = `https://www.tiktok.com/@${h}`;
  const encodedProfile = encodeURIComponent(profileUrl);
  return [
    `https://unavatar.io/${encodedProfile}?size=320`,
    `https://unavatar.io/${encodedProfile}?size=128`,
    `https://unavatar.io/${encodedProfile}`,
    `https://unavatar.io/tiktok/${e}?size=320`,
    `https://unavatar.io/tiktok/${e}?size=128`,
    `https://unavatar.io/tiktok/${e}`,
  ];
}

/** JSON endpoints to try in order (resolved URL is usually a direct TikTok CDN link). */
export function getTikTokUnavatarJsonUrls(handle: string): string[] {
  const h = normalizeTikTokHandle(handle);
  if (!h) return [];
  const e = encodeURIComponent(h);
  const profileUrl = `https://www.tiktok.com/@${h}`;
  const encodedProfile = encodeURIComponent(profileUrl);
  return [`https://unavatar.io/tiktok/${e}?json`, `https://unavatar.io/${encodedProfile}?json`];
}

/** @deprecated use getTikTokUnavatarJsonUrls */
export function getTikTokUnavatarJsonUrl(handle: string): string | null {
  const urls = getTikTokUnavatarJsonUrls(handle);
  return urls[0] ?? null;
}

export type UnavatarJsonResponse = {
  url?: string;
  status?: string;
  code?: string;
};

/**
 * True when `url` points at TikTok's image CDNs (not unavatar.io itself).
 * Unavatar's <img> URLs often return HTTP 200 with a generic “silhouette” placeholder when
 * scraping fails — those responses are still `unavatar.io` or non-CDN hosts, so we reject them.
 */
export function isTikTokCdnAvatarUrl(url: string | null | undefined): boolean {
  if (!url || typeof url !== "string") return false;
  let host: string;
  try {
    host = new URL(url.startsWith("//") ? `https:${url}` : url).hostname.toLowerCase();
  } catch {
    return false;
  }
  if (host === "unavatar.io" || host.endsWith(".unavatar.io")) return false;
  return (
    host.includes("tiktokcdn") ||
    host.includes("ibyteimg") ||
    host.includes("byteimg") ||
    host.includes("ibytedapm") ||
    host.includes("byteoversea") ||
    host.includes("tiktokv.com") ||
    host.includes("muscdn.com") ||
    host.endsWith(".tiktok.com") ||
    host === "tiktok.com"
  );
}

/**
 * Same-origin proxy URL for Backstage / TikTok CDN avatars (browser hotlinking is blocked).
 * Returns null when the URL should not be shown (empty, data:, or unknown host).
 * First-party site URLs are returned as-is.
 */
export function toProxiedAvatarSrc(url: string | null | undefined): string | null {
  const trimmed = url?.trim();
  if (!trimmed || trimmed.startsWith("data:") || trimmed.startsWith("blob:")) return null;
  try {
    const absolute = trimmed.startsWith("//") ? `https:${trimmed}` : trimmed;
    const host = new URL(absolute).hostname.toLowerCase();
    if (host === "thestreamerfactory.com" || host.endsWith(".thestreamerfactory.com")) {
      return absolute;
    }
    if (isTikTokCdnAvatarUrl(absolute)) {
      return `/api/creator-network/avatar-image?${new URLSearchParams({ url: trimmed })}`;
    }
  } catch {
    return null;
  }
  return null;
}

/** First successful JSON response wins (tries short path then full profile URL). */
export async function fetchTikTokAvatarUrlFromUnavatarJson(
  handle: string,
  signal?: AbortSignal,
  /** Server-only: pass `{ "x-api-key": process.env.UNAVATAR_API_KEY }` to avoid anonymous daily limits. */
  extraHeaders?: HeadersInit,
): Promise<string | null> {
  const headers = new Headers({ Accept: "application/json" });
  if (extraHeaders) {
    new Headers(extraHeaders).forEach((value, key) => {
      headers.set(key, value);
    });
  }

  for (const url of getTikTokUnavatarJsonUrls(handle)) {
    try {
      const r = await fetch(url, { signal, headers });
      if (!r.ok) continue;
      const data = (await r.json()) as UnavatarJsonResponse;
      if (data && typeof data === "object" && data.status === "fail") {
        continue;
      }
      if (typeof data?.url === "string" && data.url.startsWith("http")) {
        return data.url;
      }
    } catch {
      // try next
    }
  }
  return null;
}

/** Like {@link fetchTikTokAvatarUrlFromUnavatarJson} but drops unavatar fallbacks / non-TikTok hosts. */
export async function fetchTikTokCdnAvatarUrlFromUnavatarJson(
  handle: string,
  signal?: AbortSignal,
  extraHeaders?: HeadersInit,
): Promise<string | null> {
  const raw = await fetchTikTokAvatarUrlFromUnavatarJson(handle, signal, extraHeaders);
  return raw && isTikTokCdnAvatarUrl(raw) ? raw : null;
}
