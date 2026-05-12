import { NextResponse } from "next/server";
import { getTikTokOAuthEnv } from "@/lib/tiktok/config";

export const dynamic = "force-dynamic";

/**
 * Opt-in OAuth env sanity check (no secrets returned). Set TIKTOK_OAUTH_DEBUG=true on Vercel,
 * redeploy, GET this route, then remove the flag. Helps debug TikTok "client_key" errors.
 */
export async function GET() {
  if (process.env.TIKTOK_OAUTH_DEBUG !== "true") {
    return NextResponse.json({ error: "not enabled" }, { status: 404 });
  }

  try {
    const env = getTikTokOAuthEnv();
    return NextResponse.json(
      {
        ok: true,
        clientKeyLength: env.clientKey.length,
        clientSecretLength: env.clientSecret.length,
        redirectUri: env.redirectUri,
        hint: "Compare redirectUri to Login Kit (same mode: Sandbox vs Production). Client key must match Credentials for that same mode.",
      },
      { status: 200, headers: { "Cache-Control": "no-store" } },
    );
  } catch (e) {
    const msg = e instanceof Error ? e.message : "config_error";
    return NextResponse.json({ ok: false, error: msg }, { status: 503 });
  }
}
