import { getResendApiKey, getTransactionalFrom } from "@/lib/email/config";
import { getPublicSiteUrl } from "@/lib/site-url";
import { site } from "@/lib/site";

type NotifyPayload = {
  fullName: string;
  email: string;
  tiktokUsername: string;
  country: string;
  goesLive: string;
};

/**
 * Optional owner notifications after a successful application insert.
 * Configure via env — if unset, this no-ops. Failures are logged, never shown to the applicant.
 */
export async function notifyNewApplication(payload: NotifyPayload): Promise<void> {
  await Promise.allSettled([notifyDiscord(payload), notifyResend(payload)]);
}

async function notifyDiscord(p: NotifyPayload): Promise<void> {
  const url = process.env.APPLICATION_NOTIFY_DISCORD_WEBHOOK_URL?.trim();
  if (!url) return;

  const adminUrl = `${getPublicSiteUrl()}/admin/applications`;
  const lines = [
    "**New Streamer Factory application**",
    `**Name:** ${p.fullName}`,
    `**Email:** ${p.email}`,
    `**TikTok:** ${p.tiktokUsername}`,
    `**Country:** ${p.country}`,
    `**Goes live on TikTok:** ${p.goesLive === "yes" ? "Yes" : "No"}`,
    "",
    `Open admin: ${adminUrl}`,
  ];

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: lines.join("\n") }),
    });
    if (!res.ok) {
      console.error("[applications] Discord webhook failed:", res.status, await res.text());
    }
  } catch (e) {
    console.error("[applications] Discord webhook error:", e);
  }
}

async function notifyResend(p: NotifyPayload): Promise<void> {
  const apiKey = getResendApiKey();
  const to =
    typeof process.env.APPLICATION_NOTIFY_EMAIL === "string"
      ? process.env.APPLICATION_NOTIFY_EMAIL.trim()
      : undefined;
  const from = getTransactionalFrom();
  if (!apiKey || !to || !from) return;

  const adminUrl = `${getPublicSiteUrl()}/admin/applications`;
  const subject = `New application: ${p.fullName}`;
  const text = [
    `New application to Streamer Factory`,
    ``,
    `Name: ${p.fullName}`,
    `Email: ${p.email}`,
    `TikTok: ${p.tiktokUsername}`,
    `Country: ${p.country}`,
    `Goes live on TikTok: ${p.goesLive === "yes" ? "Yes" : "No"}`,
    ``,
    `Full details: ${adminUrl}`,
    ``,
    `— ${site.name}`,
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        text,
      }),
    });
    if (!res.ok) {
      console.error("[applications] Resend failed:", res.status, await res.text());
    }
  } catch (e) {
    console.error("[applications] Resend error:", e);
  }
}
