import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import {
  TIKTOK_PRIVACY_SITE_VERIFICATION_LINE,
  TIKTOK_SITE_VERIFICATION_LINE,
} from "@/lib/tiktok/site-verification";

const LEGAL_PATH_TIKTOK_LINE: readonly [string, string][] = [
  ["/terms", TIKTOK_SITE_VERIFICATION_LINE],
  ["/privacy", TIKTOK_PRIVACY_SITE_VERIFICATION_LINE],
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (request.method === "GET") {
    for (const [base, line] of LEGAL_PATH_TIKTOK_LINE) {
      if (pathname !== base && pathname !== `${base}/`) continue;

      const accept = request.headers.get("accept") ?? "";
      const secFetchDest = request.headers.get("sec-fetch-dest");
      const secFetchMode = request.headers.get("sec-fetch-mode");
      /**
       * TikTok URL verifiers often send Accept: text/html without a real document navigation
       * (no Sec-Fetch-*). Serve plain verification only for those; browsers get the HTML page.
       */
      const isLikelyBrowserDocumentNavigation =
        accept.includes("text/html") &&
        secFetchDest === "document" &&
        (secFetchMode === "navigate" || secFetchMode === "nested-navigate");

      if (!isLikelyBrowserDocumentNavigation) {
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
