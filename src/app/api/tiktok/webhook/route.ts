import { type NextRequest, NextResponse } from "next/server";
import { getTikTokClientSecret } from "@/lib/tiktok/config";
import {
  type TikTokWebhookPayload,
  handleVerifiedTikTokWebhookPayload,
} from "@/lib/tiktok/handle-verified-webhook";
import { getTikTokSignatureFromRequest, verifyTikTokWebhookSignature } from "@/lib/tiktok/verify-webhook-signature";

export const dynamic = "force-dynamic";

const okBody = { ok: true as const, received: true as const };

function safeWebhookHeaders(request: NextRequest): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [name, value] of request.headers.entries()) {
    const low = name.toLowerCase();
    if (low === "authorization" || low === "cookie" || low === "set-cookie") {
      out[name] = `<redacted len=${value.length}>`;
    } else if (low === "tiktok-signature") {
      out[name] = `<present len=${value.length}>`;
    } else if (value.length > 160) {
      out[name] = `<len=${value.length}>`;
    } else {
      out[name] = value;
    }
  }
  return out;
}

function logTikTokWebhook(request: NextRequest, rawBody: string | null): void {
  const bodyPreview =
    rawBody == null
      ? null
      : rawBody.length <= 400
        ? rawBody
        : `${rawBody.slice(0, 400)}…(+${rawBody.length - 400} more)`;
  console.info("[tiktok webhook]", {
    method: request.method,
    path: request.nextUrl.pathname,
    headers: safeWebhookHeaders(request),
    bodyLength: rawBody?.length ?? 0,
    bodyPreview,
  });
}

/**
 * TikTok Products → Webhooks → Callback URL.
 * Always responds 200 + `{ ok: true, received: true }` so Developer Portal tests pass.
 * Verified events only run `handleVerifiedTikTokWebhookPayload` (HMAC in verify-webhook-signature.ts).
 * @see https://developers.tiktok.com/doc/webhooks-overview
 */
export async function GET(request: NextRequest) {
  logTikTokWebhook(request, null);
  return NextResponse.json(okBody, {
    status: 200,
    headers: { "Cache-Control": "no-store" },
  });
}

export async function OPTIONS(request: NextRequest) {
  logTikTokWebhook(request, null);
  return NextResponse.json(okBody, {
    status: 200,
    headers: {
      "Cache-Control": "no-store",
      Allow: "GET, POST, OPTIONS",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Tiktok-Signature, TikTok-Signature",
    },
  });
}

export async function POST(request: NextRequest) {
  const rawBody = new TextDecoder("utf-8").decode(new Uint8Array(await request.arrayBuffer()));
  logTikTokWebhook(request, rawBody);

  const devSkipVerify =
    process.env.NODE_ENV === "development" && process.env.TIKTOK_WEBHOOK_SKIP_SIGNATURE_VERIFY === "true";
  const sig = getTikTokSignatureFromRequest(request.headers);

  let verified = false;
  if (devSkipVerify) {
    verified = true;
  } else {
    try {
      const clientSecret = getTikTokClientSecret();
      verified = verifyTikTokWebhookSignature({
        rawBody,
        signatureHeader: sig,
        clientSecret,
      });
    } catch {
      console.warn("[tiktok webhook] TIKTOK_CLIENT_SECRET missing — not running verified handlers");
    }
    if (!verified) {
      console.warn("[tiktok webhook] signature missing or invalid — replying 200 for portal compatibility", {
        hasSignatureHeader: Boolean(sig),
        bodyLength: rawBody.length,
      });
    }
  }

  if (verified) {
    try {
      const payload = JSON.parse(rawBody) as TikTokWebhookPayload;
      await handleVerifiedTikTokWebhookPayload(payload);
    } catch {
      console.warn("[tiktok webhook] verified path skipped: body is not JSON");
    }
  }

  return NextResponse.json(okBody, {
    status: 200,
    headers: { "Cache-Control": "no-store" },
  });
}
