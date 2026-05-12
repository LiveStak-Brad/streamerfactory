import { createHmac, timingSafeEqual } from "node:crypto";

function decodeSignatureBytes(s: string): Buffer | null {
  const t = s.trim();
  const hex = t.toLowerCase();
  if (/^[0-9a-f]{64}$/.test(hex)) {
    const b = Buffer.from(hex, "hex");
    return b.length === 32 ? b : null;
  }
  try {
    const b = Buffer.from(t, "base64");
    return b.length === 32 ? b : null;
  } catch {
    return null;
  }
}

function parseSignatureHeader(signatureHeader: string): { t: string; s: string } | null {
  let t: string | null = null;
  let s: string | null = null;
  for (const part of signatureHeader.split(/[,;]/)) {
    const trimmed = part.trim();
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim().toLowerCase();
    let value = trimmed.slice(eq + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1).trim();
    }
    if (key === "t") t = value;
    if (key === "s") s = value;
  }
  if (!t || !s) return null;
  return { t, s };
}

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

  const parsed = parseSignatureHeader(signatureHeader);
  if (!parsed) return false;
  const { t, s } = parsed;

  const sigBuf = decodeSignatureBytes(s);
  if (!sigBuf) return false;

  const signedPayloadVariants = [
    `${t}.${rawBody}`,
    `${t}.${rawBody.replace(/\r\n/g, "\n")}`,
    `${t}.${rawBody.trimEnd()}`,
  ];

  let matched = false;
  for (const signedPayload of signedPayloadVariants) {
    const expectedBuf = createHmac("sha256", clientSecret).update(signedPayload, "utf8").digest();
    if (expectedBuf.length === sigBuf.length && timingSafeEqual(expectedBuf, sigBuf)) {
      matched = true;
      break;
    }
  }
  if (!matched) return false;

  if (maxClockSkewSec !== undefined && maxClockSkewSec > 0) {
    const ts = Number(t);
    if (!Number.isFinite(ts)) return false;
    const skew = Math.abs(Date.now() / 1000 - ts);
    if (skew > maxClockSkewSec) return false;
  }

  return true;
}

export function getTikTokSignatureFromRequest(headers: Headers): string | null {
  const v = headers.get("tiktok-signature") ?? headers.get("TikTok-Signature");
  if (v) return v;
  for (const [name, value] of headers.entries()) {
    if (name.toLowerCase() === "tiktok-signature" && value) return value;
  }
  return null;
}
