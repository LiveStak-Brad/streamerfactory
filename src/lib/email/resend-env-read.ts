/**
 * Server-only Resend env parsing. Kept in a tiny module so Route Handlers import this
 * directly instead of `@/lib/email/config` (avoids Turbopack chunk differences where env
 * reads in one route work and another returns null).
 */

function stripSurroundingQuotes(s: string): string {
  const t = s.trim();
  if (t.length >= 2 && ((t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'")))) {
    return t.slice(1, -1).trim();
  }
  return t;
}

function envStr(v: string | undefined): string {
  if (v === undefined || v === null) return "";
  return String(v).trim();
}

/** API key + From line for Resend (same semantics as previous getResendEnvRuntime). */
export function readResendEnvFromProcess(): { apiKey: string; from: string } | null {
  const apiKey = envStr(process.env.RESEND_API_KEY);
  const a = stripSurroundingQuotes(envStr(process.env.RESEND_TRANSACTIONAL_FROM));
  const b = stripSurroundingQuotes(envStr(process.env.RESEND_FROM_EMAIL));
  const from = a || b;
  if (!apiKey || !from) return null;
  return { apiKey, from };
}
