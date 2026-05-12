import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { TIKTOK_SITE_VERIFICATION_LINE } from "@/lib/tiktok/site-verification";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (
    request.method === "GET" &&
    (pathname === "/terms" || pathname === "/terms/")
  ) {
    const accept = request.headers.get("accept") ?? "";
    if (!accept.includes("text/html")) {
      return new NextResponse(`${TIKTOK_SITE_VERIFICATION_LINE}\n`, {
        status: 200,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-store",
        },
      });
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
