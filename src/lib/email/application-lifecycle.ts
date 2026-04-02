import {
  buildApplicationApprovedEmail,
  buildApplicationRejectedEmail,
  buildApplicationSubmittedEmail,
} from "@/lib/email/templates/application-emails";
import { sendTransactionalEmail } from "@/lib/email/send-email";

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
