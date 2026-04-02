/**
 * Read Resend credentials from the live `process.env` object.
 * Use `const e = process.env` then `e.RESEND_*` so the bundler cannot replace individual
 * `process.env.RESEND_API_KEY` expressions with build-time `undefined` (a known Turbopack/Next issue on Vercel).
 */

/** Vercel UI sometimes stores values with wrapping quotes — strip one layer. */
function stripSurroundingQuotes(s: string): string {
  const t = s.trim();
  if (t.length >= 2 && ((t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'")))) {
    return t.slice(1, -1).trim();
  }
  return t;
}

/** Normalize a value from `process.env` (Vercel should set strings; coerce defensively). */
function envStr(v: string | undefined): string {
  if (v === undefined || v === null) return "";
  return String(v).trim();
}

/** Single runtime read for API key + from line (used by send + admin resend route). */
export function getResendEnvRuntime(): { apiKey: string; from: string } | null {
  const apiKey = envStr(process.env.RESEND_API_KEY);
  const a = stripSurroundingQuotes(envStr(process.env.RESEND_TRANSACTIONAL_FROM));
  const b = stripSurroundingQuotes(envStr(process.env.RESEND_FROM_EMAIL));
  const from = a || b;
  if (!apiKey || !from) return null;
  return { apiKey, from };
}

/**
 * Transactional email sender identity.
 * Prefer RESEND_TRANSACTIONAL_FROM; falls back to RESEND_FROM_EMAIL (e.g. same domain as internal alerts).
 * Example: "Streamer Factory <team@thestreamerfactory.com>"
 */
export function getTransactionalFrom(): string | null {
  return getResendEnvRuntime()?.from ?? null;
}

export function getResendApiKey(): string | undefined {
  return getResendEnvRuntime()?.apiKey;
}

export function hasResendApiKey(): boolean {
  return Boolean(getResendApiKey());
}

/** True when we can attempt a Resend send (API key + from address). */
export function isTransactionalEmailReady(): boolean {
  return hasResendApiKey() && getTransactionalFrom() !== null;
}
