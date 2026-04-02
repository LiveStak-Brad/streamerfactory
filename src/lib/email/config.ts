/**
 * Use explicit `process.env.RESEND_*` reads (not `process.env[name]`).
 * Turbopack can omit dynamic lookups at runtime so secrets never appear on `process.env`.
 */

/** Vercel UI sometimes stores values with wrapping quotes — strip one layer. */
function stripSurroundingQuotes(s: string): string {
  const t = s.trim();
  if (t.length >= 2 && ((t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'")))) {
    return t.slice(1, -1).trim();
  }
  return t;
}

/**
 * Transactional email sender identity.
 * Prefer RESEND_TRANSACTIONAL_FROM; falls back to RESEND_FROM_EMAIL (e.g. same domain as internal alerts).
 * Example: "Streamer Factory <team@thestreamerfactory.com>"
 */
export function getTransactionalFrom(): string | null {
  const a =
    typeof process.env.RESEND_TRANSACTIONAL_FROM === "string" ? process.env.RESEND_TRANSACTIONAL_FROM.trim() : "";
  const b = typeof process.env.RESEND_FROM_EMAIL === "string" ? process.env.RESEND_FROM_EMAIL.trim() : "";
  const raw = a || b;
  const v = stripSurroundingQuotes(raw);
  return v.length > 0 ? v : null;
}

export function getResendApiKey(): string | undefined {
  const v = process.env.RESEND_API_KEY;
  return typeof v === "string" ? v.trim() : undefined;
}

export function hasResendApiKey(): boolean {
  return Boolean(getResendApiKey());
}

/** True when we can attempt a Resend send (API key + from address). */
export function isTransactionalEmailReady(): boolean {
  return hasResendApiKey() && getTransactionalFrom() !== null;
}
