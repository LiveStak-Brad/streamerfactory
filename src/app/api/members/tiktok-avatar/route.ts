import { NextRequest, NextResponse } from "next/server";

import {
  fetchTikTokCdnAvatarUrlFromUnavatarJson,
  isValidPublicTikTokHandle,
  normalizeTikTokHandle,
} from "@/lib/tiktok-avatar";

export const runtime = "nodejs";

function unavatarAuthHeaders(): HeadersInit | undefined {
  const key = process.env.UNAVATAR_API_KEY?.trim();
  return key ? { "x-api-key": key } : undefined;
}

/**
 * JSON: `{ url }` for a TikTok CDN avatar URL (for debugging / non-image clients).
 * Prefer `/api/members/tiktok-avatar-image` from the browser so the photo is same-origin.
 */
export async function GET(request: NextRequest) {
  const raw = request.nextUrl.searchParams.get("handle") ?? "";
  const handle = normalizeTikTokHandle(raw);
  if (!isValidPublicTikTokHandle(handle)) {
    return NextResponse.json({ url: null as string | null }, { status: 400 });
  }

  try {
    const url = await fetchTikTokCdnAvatarUrlFromUnavatarJson(handle, undefined, unavatarAuthHeaders());
    return NextResponse.json(
      { url },
      {
        status: 200,
        headers: {
          "Cache-Control": url
            ? "public, s-maxage=3600, stale-while-revalidate=86400"
            : "public, s-maxage=120",
        },
      },
    );
  } catch {
    return NextResponse.json(
      { url: null as string | null },
      { status: 200, headers: { "Cache-Control": "public, s-maxage=60" } },
    );
  }
}
