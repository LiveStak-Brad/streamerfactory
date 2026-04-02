import { readResendEnvFromProcess } from "@/lib/email/resend-env-read";

/** Single runtime read for API key + from line (used by send-email, notify, etc.). */
export function getResendEnvRuntime(): { apiKey: string; from: string } | null {
  return readResendEnvFromProcess();
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
