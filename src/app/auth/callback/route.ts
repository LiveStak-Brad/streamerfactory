import { NextResponse, type NextRequest } from "next/server";
import { safeNextPath } from "@/lib/auth/access";
import { createClient } from "@/lib/supabase/server";

/**
 * Exchanges a PKCE `code` (e.g. OAuth or email confirmation) for a Supabase session.
 * Add this URL under Supabase → Authentication → URL Configuration → Redirect URLs:
 * e.g. http://localhost:3000/auth/callback and your production origin + /auth/callback
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = safeNextPath(searchParams.get("next") ?? undefined);

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocal = process.env.NODE_ENV === "development";
      if (isLocal) {
        return NextResponse.redirect(`${origin}${next}`);
      }
      if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      }
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=callback`);
}
