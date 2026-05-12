import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all paths except static assets and images.
     * Skip Supabase session middleware for TikTok webhooks — Edge middleware
     * must not touch the POST body stream; signature verification needs the raw bytes.
     */
    "/((?!_next/static|_next/image|favicon.ico|api/tiktok/webhook|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
