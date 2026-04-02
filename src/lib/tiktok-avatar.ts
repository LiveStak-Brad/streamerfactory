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
};

/** First successful JSON response wins (tries short path then full profile URL). */
export async function fetchTikTokAvatarUrlFromUnavatarJson(
  handle: string,
  signal?: AbortSignal,
): Promise<string | null> {
  for (const url of getTikTokUnavatarJsonUrls(handle)) {
    try {
      const r = await fetch(url, { signal });
      if (!r.ok) continue;
      const data = (await r.json()) as UnavatarJsonResponse;
      if (typeof data?.url === "string" && data.url.startsWith("http")) {
        return data.url;
      }
    } catch {
      // try next
    }
  }
  return null;
}
