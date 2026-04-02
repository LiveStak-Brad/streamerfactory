import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { canAccessAdmin } from "@/lib/auth/access";
import { getSupabasePublicEnv } from "./env";

/**
 * Refreshes auth session cookies, forwards cache-control headers from Supabase,
 * and restricts `/admin` to users with an owner (or future editor) role in `profiles`.
 */
export async function updateSession(request: NextRequest) {
  const supabaseResponse = NextResponse.next({
    request,
  });

  const { url, key } = getSupabasePublicEnv();

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headers) {
        cookiesToSet.forEach(({ name, value, options }) => {
          supabaseResponse.cookies.set(name, value, options);
        });
        Object.entries(headers).forEach(([keyName, value]) => {
          supabaseResponse.headers.set(keyName, value);
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  if (pathname.startsWith("/admin")) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", `${pathname}${request.nextUrl.search}`);

    if (!user) {
      return NextResponse.redirect(loginUrl);
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();

    if (!profile || !canAccessAdmin(profile.role as string)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  /* New battle wizard requires auth; applicants are redirected from the page if not yet approved as members. */
  if (pathname.startsWith("/battle-hub/scheduler/new")) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", `${pathname}${request.nextUrl.search}`);
    if (!user) {
      return NextResponse.redirect(loginUrl);
    }
  }

  return supabaseResponse;
}
