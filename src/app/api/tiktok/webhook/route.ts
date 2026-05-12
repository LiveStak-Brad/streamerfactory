import { type NextRequest, NextResponse } from "next/server";
import { deleteTikTokConnectionByOpenId } from "@/lib/tiktok/db";
import { getTikTokOAuthEnv } from "@/lib/tiktok/config";
import { TIKTOK_SITE_VERIFICATION_LINE } from "@/lib/tiktok/site-verification";
import { getTikTokSignatureFromRequest, verifyTikTokWebhookSignature } from "@/lib/tiktok/verify-webhook-signature";

export const dynamic = "force-dynamic";

type TikTokWebhookPayload = {
  client_key?: string;
  event?: string;
  create_time?: number;
  user_openid?: string;
  content?: string;
};

/**
 * TikTok Products → Webhooks → Callback URL.
 * - GET (no query): URL-prefix verification + portal "Test URL" health check.
 * - POST: signed JSON events (e.g. authorization.removed, video.*).
 * @see https://developers.tiktok.com/doc/webhooks-overview
 */
export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;
  if (!sp.get("code") && !sp.get("state") && !sp.get("error") && sp.size === 0) {
    return new NextResponse(TIKTOK_SITE_VERIFICATION_LINE, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  }
  return new NextResponse("OK", { status: 200, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: NextRequest) {
  const rawBody = await request.text();

  let clientSecret: string;
  try {
    clientSecret = getTikTokOAuthEnv().clientSecret;
  } catch {
    return NextResponse.json({ error: "TikTok OAuth not configured" }, { status: 503 });
  }

  const sig = getTikTokSignatureFromRequest(request.headers);
  const skipVerify =
    process.env.NODE_ENV === "development" && process.env.TIKTOK_WEBHOOK_SKIP_SIGNATURE_VERIFY === "true";

  if (!skipVerify) {
    const ok = verifyTikTokWebhookSignature({
      rawBody,
      signatureHeader: sig,
      clientSecret,
    });
    if (!ok) {
      console.warn("[tiktok webhook] invalid or missing signature");
      return NextResponse.json({ error: "invalid signature" }, { status: 403 });
    }
  }

  let payload: TikTokWebhookPayload;
  try {
    payload = JSON.parse(rawBody) as TikTokWebhookPayload;
  } catch {
    console.warn("[tiktok webhook] non-json body");
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const event = payload.event;
  const openId = typeof payload.user_openid === "string" ? payload.user_openid.trim() : "";

  console.info("[tiktok webhook]", { event, openId: openId ? `${openId.slice(0, 8)}…` : "" });

  if (event === "authorization.removed" && openId) {
    try {
      const del = await deleteTikTokConnectionByOpenId(openId);
      if (!del.ok) {
        console.error("[tiktok webhook] delete connection failed", del.error);
      }
    } catch (e) {
      console.error("[tiktok webhook] delete connection threw", e);
    }
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
