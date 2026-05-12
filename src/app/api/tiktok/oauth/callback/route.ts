import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { canScheduleBattles } from "@/lib/auth/access";
import { getSessionProfile } from "@/lib/auth/server";
import { findProfileIdByTikTokOpenId, upsertTikTokConnection } from "@/lib/tiktok/db";
import { exchangeAuthorizationCode } from "@/lib/tiktok/oauth";
import { syncTikTokProfileForProfileId } from "@/lib/tiktok/syncProfile";
import { absoluteUrl } from "@/lib/site-url";

export const dynamic = "force-dynamic";

const STATE_COOKIE = "sf_tt_oauth_state";

export async function GET(request: NextRequest) {
  const origin = request.nextUrl.origin;
  const searchParams = request.nextUrl.searchParams;
  const oauthError = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");

  if (oauthError) {
    const msg = errorDescription || oauthError;
    const res = NextResponse.redirect(
      `${origin}/member/dashboard?tiktok_error=${encodeURIComponent(msg)}`,
    );
    res.cookies.delete(STATE_COOKIE);
    return res;
  }

  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const cookieStore = await cookies();
  const expected = cookieStore.get(STATE_COOKIE)?.value;

  const redirectBase = (path: string) => {
    const res = NextResponse.redirect(`${origin}${path}`);
    res.cookies.delete(STATE_COOKIE);
    return res;
  };

  if (!code || !state || !expected || state !== expected) {
    return redirectBase("/member/dashboard?tiktok_error=invalid_state");
  }

  const session = await getSessionProfile();
  if (!session?.user) {
    return NextResponse.redirect(absoluteUrl("/login?next=%2Fmember%2Fdashboard"));
  }
  if (!session.profile || !canScheduleBattles(session.profile.role)) {
    return redirectBase("/application-status");
  }

  try {
    const exchanged = await exchangeAuthorizationCode(code);
    if (!exchanged.ok) {
      return redirectBase(`/member/dashboard?tiktok_error=${encodeURIComponent(exchanged.error)}`);
    }

    const existingOwner = await findProfileIdByTikTokOpenId(exchanged.open_id);
    if (existingOwner && existingOwner !== session.user.id) {
      return redirectBase("/member/dashboard?tiktok_error=already_linked");
    }

    const saved = await upsertTikTokConnection({
      profileId: session.user.id,
      openId: exchanged.open_id,
      tokens: exchanged.tokens,
    });
    if (!saved.ok) {
      return redirectBase(`/member/dashboard?tiktok_error=${encodeURIComponent(saved.error)}`);
    }

    const synced = await syncTikTokProfileForProfileId(session.user.id);
    if (!synced.ok) {
      return redirectBase(`/member/dashboard?tiktok_warn=${encodeURIComponent(synced.error)}`);
    }

    return redirectBase("/member/dashboard?tiktok=connected");
  } catch (e) {
    const msg = e instanceof Error ? e.message : "tiktok_callback_failed";
    return redirectBase(`/member/dashboard?tiktok_error=${encodeURIComponent(msg)}`);
  }
}
