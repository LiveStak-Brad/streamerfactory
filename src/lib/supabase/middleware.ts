import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { canAccessAdmin } from "@/lib/auth/access";
import { getSupabasePublicEnv } from "./env";

/**
 * Refreshes auth session cookies, forwards cache-control headers from Supabase,
 * and restricts `/admin` to staff (`owner`, `editor`, or `admin`) in `profiles`.
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

  if (pathname.startsWith("/api/admin")) {
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { data: apiProfile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();

    if (!apiProfile || !canAccessAdmin(apiProfile.role as string)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  /* Extension import: staff only (session cookie from Streamer Factory login). */
  if (pathname.startsWith("/api/extension/tiktok-network/import")) {
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { data: extProfile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();

    if (!extProfile || !canAccessAdmin(extProfile.role as string)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }

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

  /* Battle wizard: must be signed in; applicants cannot create events (server actions also enforce). */
  if (pathname.startsWith("/battle-hub/scheduler/new")) {
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
    const role = String(profile?.role ?? "").toLowerCase();
    if (role === "applicant") {
      return NextResponse.redirect(new URL("/application-status", request.url));
    }
  }

  return supabaseResponse;
}
