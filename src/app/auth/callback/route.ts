import { NextResponse, type NextRequest } from "next/server";
import { safeNextPath } from "@/lib/auth/access";
import { resolvePostLoginRedirect } from "@/lib/auth/post-login";
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
      const {
        data: { user },
      } = await supabase.auth.getUser();
      let destination = next;
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role, onboarding_completed_at")
          .eq("id", user.id)
          .maybeSingle();
        destination = resolvePostLoginRedirect(next, profile);
      }

      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocal = process.env.NODE_ENV === "development";
      if (isLocal) {
        return NextResponse.redirect(`${origin}${destination}`);
      }
      if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${destination}`);
      }
      return NextResponse.redirect(`${origin}${destination}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=callback`);
}
