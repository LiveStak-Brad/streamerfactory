import { getPublicSiteUrl } from "@/lib/site-url";

type NotifyPayload = {
  fullName: string;
  email: string;
  tiktokUsername: string;
  country: string;
  goesLive: string;
};

/**
 * Optional owner notifications after a successful application insert (e.g. Discord).
 * Admin email uses sendApplicationAdminNotificationEmail in application-lifecycle (APPLICATION_NOTIFY_EMAIL).
 * Failures are logged, never shown to the applicant.
 */
export async function notifyNewApplication(payload: NotifyPayload): Promise<void> {
  await notifyDiscord(payload);
}

async function notifyDiscord(p: NotifyPayload): Promise<void> {
  const url = process.env.APPLICATION_NOTIFY_DISCORD_WEBHOOK_URL?.trim();
  if (!url) return;

  const adminUrl = `${getPublicSiteUrl()}/admin/applications`;
  const lines = [
    "**New website access request** (TikTok Creator Network → site)",
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
