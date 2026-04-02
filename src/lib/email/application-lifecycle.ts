import {
  buildApplicationAdminNotificationEmail,
  buildApplicationApprovedEmail,
  buildApplicationRejectedEmail,
  buildApplicationSubmittedEmail,
} from "@/lib/email/templates/application-emails";
import { sendTransactionalEmail } from "@/lib/email/send-email";
import { absoluteUrl } from "@/lib/site-url";

export function firstNameFromFullName(fullName: string): string {
  const t = fullName.trim();
  if (!t) return "there";
  const parts = t.split(/\s+/);
  return parts[0] ?? "there";
}

export async function sendApplicationSubmittedEmail(params: {
  to: string;
  fullName: string;
  isResubmit: boolean;
}): Promise<void> {
  const { subject, html, text } = buildApplicationSubmittedEmail({
    firstName: firstNameFromFullName(params.fullName),
    isResubmit: params.isResubmit,
  });
  await sendTransactionalEmail({ to: params.to, subject, html, text });
}

/** Staff inbox for new/updated applications. Skips if APPLICATION_NOTIFY_EMAIL is unset. */
export async function sendApplicationAdminNotificationEmail(params: {
  fullName: string;
  email: string;
  tiktokUsername: string;
  timezone: string | null;
  isResubmit: boolean;
}): Promise<void> {
  const to = process.env.APPLICATION_NOTIFY_EMAIL?.trim();
  if (!to) {
    console.warn("[email] APPLICATION_NOTIFY_EMAIL unset; skipping admin application notification");
    return;
  }

  const { subject, html, text } = buildApplicationAdminNotificationEmail({
    fullName: params.fullName,
    email: params.email,
    tiktokUsername: params.tiktokUsername,
    timezone: params.timezone,
    isResubmit: params.isResubmit,
    adminUrl: absoluteUrl("/admin/applications"),
  });

  await sendTransactionalEmail({ to, subject, html, text });
}

export async function sendApplicationApprovedEmail(params: { to: string; fullName: string | null }): Promise<boolean> {
  const { subject, html, text } = buildApplicationApprovedEmail({
    firstName: firstNameFromFullName(params.fullName ?? ""),
  });
  return sendTransactionalEmail({ to: params.to, subject, html, text });
}

export async function sendApplicationRejectedEmail(params: { to: string; fullName: string | null }): Promise<void> {
  const { subject, html, text } = buildApplicationRejectedEmail({
    firstName: firstNameFromFullName(params.fullName ?? ""),
  });
  await sendTransactionalEmail({ to: params.to, subject, html, text });
}
