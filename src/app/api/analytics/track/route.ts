import { NextResponse } from "next/server";

import { CLIENT_ALLOWED_EVENTS } from "@/lib/analytics/events";
import { clientIpFromRequest, rateLimit } from "@/lib/security/rate-limit";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type Body = {
  event?: string;
  route?: string;
  resource_slug?: string;
  metadata?: Record<string, unknown>;
};

/**
 * Client-side analytics ingest (page views, etc.). Validates event allowlist.
 */
export async function POST(request: Request) {
  const ip = clientIpFromRequest(request);
  const limited = rateLimit({ key: `analytics:${ip}`, limit: 60, windowMs: 60_000 });
  if (!limited.ok) {
    return NextResponse.json(
      { ok: false, error: "Rate limited" },
      {
        status: 429,
        headers: { "Retry-After": String(limited.retryAfterSec) },
      },
    );
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const event = typeof body.event === "string" ? body.event.trim() : "";
  if (!event || event.length > 96 || !CLIENT_ALLOWED_EVENTS.has(event)) {
    console.warn("[analytics] client ingest rejected event:", event || "(empty)");
    return NextResponse.json({ ok: false, error: "Invalid event" }, { status: 400 });
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    let profileRole: string | null = null;
    if (user) {
      const { data: pr } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();
      profileRole = pr?.role ?? null;
    }

    const route = typeof body.route === "string" ? body.route.slice(0, 512) : null;
    const resourceSlug =
      typeof body.resource_slug === "string" ? body.resource_slug.slice(0, 256) : null;

    const { error } = await supabase.from("analytics_events").insert({
      event_name: event,
      user_id: user?.id ?? null,
      profile_role: profileRole,
      route,
      resource_slug: resourceSlug,
      metadata: body.metadata && typeof body.metadata === "object" ? body.metadata : null,
    });

    if (error) {
      console.warn("[analytics] client ingest failed:", event, error.message);
    }
  } catch (e) {
    console.warn("[analytics] client ingest:", e);
  }

  return NextResponse.json({ ok: true });
}
