import { NextRequest, NextResponse } from "next/server";

import { isTikTokCdnAvatarUrl } from "@/lib/tiktok-avatar";

export const runtime = "nodejs";

const BROWSER_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

function isAllowedAvatarUrl(url: string): boolean {
  try {
    const u = new URL(url.startsWith("//") ? `https:${url}` : url);
    const host = u.hostname.toLowerCase();
    if (host === "thestreamerfactory.com" || host.endsWith(".thestreamerfactory.com")) {
      return true;
    }
    return isTikTokCdnAvatarUrl(url.startsWith("//") ? `https:${url}` : url);
  } catch {
    return false;
  }
}

/** Proxy imported Backstage avatar URLs (TikTok CDN blocks browser hotlinking). */
export async function GET(request: NextRequest) {
  const raw = request.nextUrl.searchParams.get("url")?.trim() ?? "";
  if (!raw || !isAllowedAvatarUrl(raw)) {
    return new NextResponse(null, { status: 400 });
  }

  const fetchUrl = raw.startsWith("//") ? `https:${raw}` : raw;

  try {
    const res = await fetch(fetchUrl, {
      headers: {
        "User-Agent": BROWSER_UA,
        Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
        Referer: "https://live-backstage.tiktok.com/",
      },
      redirect: "follow",
      next: { revalidate: 86400 },
    });

    if (!res.ok) {
      return new NextResponse(null, { status: 502 });
    }

    const buf = await res.arrayBuffer();
    const ct = res.headers.get("content-type")?.split(";")[0]?.trim() ?? "image/jpeg";
    if (!ct.startsWith("image/") || buf.byteLength < 32) {
      return new NextResponse(null, { status: 502 });
    }

    return new NextResponse(buf, {
      status: 200,
      headers: {
        "Content-Type": ct,
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    });
  } catch {
    return new NextResponse(null, { status: 502 });
  }
}
