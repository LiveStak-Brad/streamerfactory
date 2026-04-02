/**
 * Transactional email sender identity.
 * Prefer RESEND_TRANSACTIONAL_FROM; falls back to RESEND_FROM_EMAIL (e.g. same domain as internal alerts).
 * Example: "Streamer Factory <team@thestreamerfactory.com>"
 */
export function getTransactionalFrom(): string | null {
  const v =
    process.env.RESEND_TRANSACTIONAL_FROM?.trim() ?? process.env.RESEND_FROM_EMAIL?.trim() ?? "";
  return v.length > 0 ? v : null;
}

export function hasResendApiKey(): boolean {
  return Boolean(process.env.RESEND_API_KEY?.trim());
}

/** True when we can attempt a Resend send (API key + from address). */
export function isTransactionalEmailReady(): boolean {
  return hasResendApiKey() && getTransactionalFrom() !== null;
}
