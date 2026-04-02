import { Resend } from "resend";

import { getTransactionalFrom, isTransactionalEmailReady } from "@/lib/email/config";

let resendClient: Resend | null = null;

function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) return null;
  if (!resendClient) resendClient = new Resend(key);
  return resendClient;
}

export type SendTransactionalEmailParams = {
  to: string;
  subject: string;
  html: string;
  text: string;
};

/**
 * Sends a single transactional message. Returns success=false if env is missing or Resend errors.
 * Does not throw — callers can rely on this for non-blocking lifecycle hooks.
 */
export async function sendTransactionalEmail(params: SendTransactionalEmailParams): Promise<boolean> {
  if (!isTransactionalEmailReady()) {
    console.warn(
      "[email] Transactional send skipped: set RESEND_API_KEY and RESEND_TRANSACTIONAL_FROM (or RESEND_FROM_EMAIL).",
    );
    return false;
  }

  const from = getTransactionalFrom()!;
  const client = getResend();
  if (!client) {
    console.warn("[email] RESEND_API_KEY missing.");
    return false;
  }

  try {
    const { data, error } = await client.emails.send({
      from,
      to: params.to,
      subject: params.subject,
      html: params.html,
      text: params.text,
    });
    if (error) {
      console.error("[email] Resend API error:", error);
      return false;
    }
    if (data?.id) {
      console.info("[email] Sent:", params.subject, "→", params.to, "id=", data.id);
    }
    return true;
  } catch (e) {
    console.error("[email] Resend send exception:", e);
    return false;
  }
}
