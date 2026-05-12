import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Verifies `Tiktok-Signature` / `TikTok-Signature` per TikTok webhook docs.
 * @see https://developers.tiktok.com/doc/webhooks-verification
 */
export function verifyTikTokWebhookSignature(params: {
  rawBody: string;
  signatureHeader: string | null;
  clientSecret: string;
  /** Max age of `t` in seconds (default 10 minutes). */
  maxClockSkewSec?: number;
}): boolean {
  const { rawBody, signatureHeader, clientSecret, maxClockSkewSec = 600 } = params;
  if (!signatureHeader || !clientSecret) return false;

  let t: string | null = null;
  let s: string | null = null;
  for (const part of signatureHeader.split(",")) {
    const trimmed = part.trim();
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (key === "t") t = value;
    if (key === "s") s = value;
  }
  if (!t || !s) return false;

  const ts = Number(t);
  if (!Number.isFinite(ts)) return false;
  const skew = Math.abs(Date.now() / 1000 - ts);
  if (skew > maxClockSkewSec) return false;

  const signedPayload = `${t}.${rawBody}`;
  const expectedHex = createHmac("sha256", clientSecret).update(signedPayload, "utf8").digest("hex");

  try {
    const a = Buffer.from(expectedHex, "hex");
    const b = Buffer.from(s, "hex");
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export function getTikTokSignatureFromRequest(headers: Headers): string | null {
  return headers.get("tiktok-signature") ?? headers.get("Tiktok-Signature") ?? headers.get("TikTok-Signature");
}
