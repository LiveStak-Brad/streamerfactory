import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Verifies `Tiktok-Signature` / `TikTok-Signature` per TikTok webhook docs.
 * @see https://developers.tiktok.com/doc/webhooks-verification
 */
export function verifyTikTokWebhookSignature(params: {
  rawBody: string;
  signatureHeader: string | null;
  clientSecret: string;
  /**
   * Optional replay window for `t` (seconds). Omit to skip — TikTok portal
   * "Test event" payloads often use a stale `t` while the HMAC is still valid.
   */
  maxClockSkewSec?: number;
}): boolean {
  const { rawBody, signatureHeader, clientSecret, maxClockSkewSec } = params;
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

  const signedPayload = `${t}.${rawBody}`;
  const expectedHex = createHmac("sha256", clientSecret).update(signedPayload, "utf8").digest("hex");

  const sigHex = s.trim().toLowerCase();
  const expHex = expectedHex.toLowerCase();

  const expectedBuf = Buffer.from(expHex, "hex");
  const sigBuf = Buffer.from(sigHex, "hex");
  if (expectedBuf.length !== 32 || sigBuf.length !== 32) {
    return false;
  }
  if (!timingSafeEqual(expectedBuf, sigBuf)) return false;

  if (maxClockSkewSec !== undefined && maxClockSkewSec > 0) {
    const ts = Number(t);
    if (!Number.isFinite(ts)) return false;
    const skew = Math.abs(Date.now() / 1000 - ts);
    if (skew > maxClockSkewSec) return false;
  }

  return true;
}

export function getTikTokSignatureFromRequest(headers: Headers): string | null {
  return headers.get("tiktok-signature") ?? headers.get("Tiktok-Signature") ?? headers.get("TikTok-Signature");
}
