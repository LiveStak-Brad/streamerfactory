import { NextRequest, NextResponse } from "next/server";

import {
  fetchTikTokCdnAvatarUrlFromUnavatarJson,
  isTikTokCdnAvatarUrl,
  isValidPublicTikTokHandle,
  normalizeTikTokHandle,
} from "@/lib/tiktok-avatar";

export const runtime = "nodejs";

const BROWSER_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

/** In-memory CDN URL cache so repeat requests for the same handle skip unavatar JSON (helps dev reloads). */
type CdnUrlEntry = { url: string; expires: number };
const cdnUrlCache = new Map<string, CdnUrlEntry>();
const CDN_URL_TTL_MS = 86_400_000;

function getCachedCdnUrl(handle: string): string | null {
  const row = cdnUrlCache.get(handle);
  if (!row) return null;
  if (Date.now() > row.expires) {
    cdnUrlCache.delete(handle);
    return null;
  }
  return row.url;
}

function setCachedCdnUrl(handle: string, url: string) {
  cdnUrlCache.set(handle, { url, expires: Date.now() + CDN_URL_TTL_MS });
}

function unavatarAuthHeaders(): HeadersInit | undefined {
  const key = process.env.UNAVATAR_API_KEY?.trim();
  return key ? { "x-api-key": key } : undefined;
}

function looksLikeImageBytes(buf: ArrayBuffer): boolean {
  const u8 = new Uint8Array(buf.slice(0, 16));
  if (u8.length < 3) return false;
  if (u8[0] === 0xff && u8[1] === 0xd8 && u8[2] === 0xff) return true;
  if (u8[0] === 0x89 && u8[1] === 0x50 && u8[2] === 0x4e && u8[3] === 0x47) return true;
  if (u8[0] === 0x47 && u8[1] === 0x49 && u8[2] === 0x46) return true;
  if (u8[0] === 0x52 && u8[1] === 0x49 && u8[2] === 0x46 && u8[3] === 0x46) return true;
  return false;
}

/**
 * Same-origin avatar bytes for `/members`: resolves the TikTok CDN URL via unavatar on the server,
 * then fetches the image on the server (browser-referer / hotlink quirks avoided).
 *
 * Returns **502** (not 404) when unavatar cannot return a TikTok CDN URL — e.g. anonymous daily
 * rate limit (ERATE) or scrape failure. A 404 here would look like “route missing” in server logs.
 */
export async function GET(request: NextRequest) {
  const raw = request.nextUrl.searchParams.get("handle") ?? "";
  const handle = normalizeTikTokHandle(raw);
  if (!isValidPublicTikTokHandle(handle)) {
    return new NextResponse(null, { status: 400 });
  }

  let cdnUrl = getCachedCdnUrl(handle);
  if (!cdnUrl) {
    cdnUrl = await fetchTikTokCdnAvatarUrlFromUnavatarJson(handle, undefined, unavatarAuthHeaders());
    if (cdnUrl && isTikTokCdnAvatarUrl(cdnUrl)) {
      setCachedCdnUrl(handle, cdnUrl);
    }
  }

  if (!cdnUrl || !isTikTokCdnAvatarUrl(cdnUrl)) {
    return new NextResponse(null, {
      status: 502,
      headers: {
        "Cache-Control": "no-store",
        "X-Avatar-Resolve": "failed",
      },
    });
  }

  try {
    const imgRes = await fetch(cdnUrl, {
      headers: {
        "User-Agent": BROWSER_UA,
        Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
        Referer: "https://www.tiktok.com/",
      },
      redirect: "follow",
    });

    if (!imgRes.ok) {
      return new NextResponse(null, {
        status: 502,
        headers: { "Cache-Control": "no-store", "X-Avatar-Resolve": "image-fetch-failed" },
      });
    }

    const buf = await imgRes.arrayBuffer();
    const rawCt = imgRes.headers.get("content-type")?.split(";")[0]?.trim();
    const ctOk = Boolean(rawCt?.startsWith("image/"));
    const okBytes =
      looksLikeImageBytes(buf) || (ctOk && buf.byteLength >= 32);
    if (!okBytes) {
      return new NextResponse(null, {
        status: 502,
        headers: { "Cache-Control": "no-store", "X-Avatar-Resolve": "invalid-image-body" },
      });
    }

    const contentType = rawCt && rawCt.startsWith("image/") ? rawCt : "image/jpeg";

    return new NextResponse(buf, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    });
  } catch {
    return new NextResponse(null, {
      status: 502,
      headers: { "Cache-Control": "no-store", "X-Avatar-Resolve": "exception" },
    });
  }
}
