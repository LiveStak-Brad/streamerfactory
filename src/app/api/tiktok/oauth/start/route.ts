import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { canScheduleBattles } from "@/lib/auth/access";
import { getSessionProfile } from "@/lib/auth/server";
import {
  getTikTokOAuthEnv,
  TIKTOK_AUTH_AUTHORIZE_URL,
  TIKTOK_OAUTH_SCOPES,
} from "@/lib/tiktok/config";
import { absoluteUrl } from "@/lib/site-url";

export const dynamic = "force-dynamic";

const STATE_COOKIE = "sf_tt_oauth_state";

export async function GET() {
  const session = await getSessionProfile();
  if (!session?.user) {
    return NextResponse.redirect(absoluteUrl("/login?next=%2Fapi%2Ftiktok%2Foauth%2Fstart"));
  }
  if (!session.profile || !canScheduleBattles(session.profile.role)) {
    return NextResponse.redirect(absoluteUrl("/application-status"));
  }

  let env: ReturnType<typeof getTikTokOAuthEnv>;
  try {
    env = getTikTokOAuthEnv();
  } catch {
    return NextResponse.redirect(absoluteUrl("/member/dashboard?tiktok_error=config"));
  }

  const state = randomBytes(24).toString("hex");
  const authorize = new URLSearchParams({
    client_key: env.clientKey,
    scope: TIKTOK_OAUTH_SCOPES,
    response_type: "code",
    redirect_uri: env.redirectUri,
    state,
    disable_auto_auth: "1",
  });

  const redirectUrl = `${TIKTOK_AUTH_AUTHORIZE_URL}?${authorize.toString()}`;
  const res = NextResponse.redirect(redirectUrl);
  res.cookies.set(STATE_COOKIE, state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 600,
    path: "/",
  });
  return res;
}
