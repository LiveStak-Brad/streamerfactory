import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { isHtmlCrawlerUserAgent, isTikTokVerifierUserAgent } from "@/lib/seo/crawlers";
import {
  TIKTOK_PRIVACY_SITE_VERIFICATION_LINE,
  TIKTOK_ROOT_SITE_VERIFICATION_LINE,
  TIKTOK_SITE_VERIFICATION_LINE,
} from "@/lib/tiktok/site-verification";

function pathnameMatchesTikTokBase(pathname: string, base: string): boolean {
  if (base === "/") {
    return pathname === "/" || pathname === "";
  }
  return pathname === base || pathname === `${base}/`;
}

const LEGAL_PATH_TIKTOK_LINE: readonly [string, string][] = [
  ["/", TIKTOK_ROOT_SITE_VERIFICATION_LINE],
  ["/terms", TIKTOK_SITE_VERIFICATION_LINE],
  ["/privacy", TIKTOK_PRIVACY_SITE_VERIFICATION_LINE],
];

/**
 * TikTok URL verifiers often send Accept: text/html without Sec-Fetch-* document
 * navigation headers. Serve plain verification for those probes only.
 * Browsers and HTML crawlers (Googlebot, etc.) always get the real page — otherwise
 * Google cannot read homepage favicon / link tags and falls back to a generic icon.
 */
function shouldServeTikTokPlainVerification(request: NextRequest): boolean {
  const ua = request.headers.get("user-agent") ?? "";

  if (isHtmlCrawlerUserAgent(ua)) return false;
  if (isTikTokVerifierUserAgent(ua)) return true;

  const accept = request.headers.get("accept") ?? "";
  const secFetchDest = request.headers.get("sec-fetch-dest");
  const secFetchMode = request.headers.get("sec-fetch-mode");

  const isLikelyBrowserDocumentNavigation =
    accept.includes("text/html") &&
    secFetchDest === "document" &&
    (secFetchMode === "navigate" || secFetchMode === "nested-navigate");

  return !isLikelyBrowserDocumentNavigation;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (request.method === "GET") {
    for (const [base, line] of LEGAL_PATH_TIKTOK_LINE) {
      if (!pathnameMatchesTikTokBase(pathname, base)) continue;

      if (shouldServeTikTokPlainVerification(request)) {
        return new NextResponse(`${line}\n`, {
          status: 200,
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "no-store",
          },
        });
      }

      return await updateSession(request);
    }
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all paths except static assets and images.
     * Skip Supabase session middleware for TikTok webhook + OAuth callback —
     * webhooks need an untouched POST body; probes hit the callback without session.
     */
    "/((?!_next/static|_next/image|favicon.ico|api/tiktok/webhook|api/tiktok/oauth/callback|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
