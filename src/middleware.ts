import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
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
