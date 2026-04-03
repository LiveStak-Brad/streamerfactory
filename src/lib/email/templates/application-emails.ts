import { absoluteUrl } from "@/lib/site-url";
import { escapeHtml } from "@/lib/email/escape-html";
import { site } from "@/lib/site";

const accent = "#6366f1";
const text = "#18181b";
const muted = "#52525b";

function wrapBody(inner: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width"/></head>
<body style="margin:0;padding:0;background-color:#fafafa;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#fafafa;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width:560px;background-color:#ffffff;border-radius:16px;border:1px solid #e4e4e7;overflow:hidden;">
          <tr>
            <td style="height:4px;background:${accent};"></td>
          </tr>
          <tr>
            <td style="padding:28px 28px 8px 28px;">
              <p style="margin:0;font-size:13px;font-weight:700;letter-spacing:0.12em;color:${accent};text-transform:uppercase;">${escapeHtml(site.name)}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 28px 28px 28px;color:${text};font-size:16px;line-height:1.6;">
              ${inner}
            </td>
          </tr>
          <tr>
            <td style="padding:0 28px 28px 28px;color:${muted};font-size:13px;line-height:1.5;">
              <p style="margin:0;">${escapeHtml(site.domain)}</p>
              <p style="margin:8px 0 0 0;"><a href="mailto:${escapeHtml(site.contactEmail)}" style="color:${muted};font-weight:600;">${escapeHtml(site.contactEmail)}</a></p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function button(href: string, label: string): string {
  const u = escapeHtml(href);
  const l = escapeHtml(label);
  return `<a href="${u}" style="display:inline-block;margin-top:8px;margin-bottom:4px;padding:12px 20px;background:${accent};color:#ffffff;text-decoration:none;border-radius:10px;font-weight:600;font-size:15px;">${l}</a>`;
}

function linkLine(href: string, label: string): string {
  return `<p style="margin:16px 0 0 0;"><a href="${escapeHtml(href)}" style="color:${accent};font-weight:600;">${escapeHtml(label)}</a></p>`;
}

export function buildApplicationSubmittedEmail(params: {
  firstName: string;
  isResubmit: boolean;
}): { subject: string; html: string; text: string } {
  const name = escapeHtml(params.firstName);
  const statusUrl = absoluteUrl("/application-status");
  const startHereUrl = absoluteUrl("/streameru/start-here");
  const resourcesUrl = absoluteUrl("/streameru");

  const intro = params.isResubmit
    ? `<p style="margin:0 0 16px 0;">Hi ${name},</p><p style="margin:0 0 16px 0;">Thanks — we received your <strong>updated</strong> application. Our team will review it using the same process as a first-time submission.</p>`
    : `<p style="margin:0 0 16px 0;">Hi ${name},</p><p style="margin:0 0 16px 0;">Thanks for applying to <strong>${escapeHtml(site.name)}</strong>. We have your submission and will review it like a real partnership fit — not a generic form queue.</p>`;

  const inner = `${intro}
<p style="margin:0 0 16px 0;"><strong>What happens next</strong><br/>
We review every application. You can always see where things stand in the app — no guessing.</p>
${button(statusUrl, "View application status")}
${linkLine(startHereUrl, "Start your training — StreamerU")}
<p style="margin:8px 0 0 0;font-size:14px;color:${muted};">Browse StreamerU (lessons &amp; tracks): <a href="${escapeHtml(resourcesUrl)}" style="color:${accent};">${escapeHtml(resourcesUrl)}</a></p>
<p style="margin:24px 0 0 0;font-size:14px;color:${muted};">Questions? Email us at <a href="mailto:${escapeHtml(site.contactEmail)}" style="color:${accent};font-weight:600;">${escapeHtml(site.contactEmail)}</a> or visit our <a href="${escapeHtml(absoluteUrl("/contact"))}" style="color:${accent};font-weight:600;">contact page</a>.</p>`;

  const text = [
    `Hi ${params.firstName},`,
    "",
    params.isResubmit
      ? "Thanks — we received your updated application. Our team will review it."
      : `Thanks for applying to ${site.name}. We have your submission and will review it.`,
    "",
    "What happens next:",
    "We review every application. Track status here:",
    statusUrl,
    "",
    "While you wait — training:",
    startHereUrl,
    resourcesUrl,
    "",
    `Questions: ${site.contactEmail}`,
    "",
    `— ${site.name}`,
  ].join("\n");

  return {
    subject: params.isResubmit
      ? `We received your updated application — ${site.name}`
      : `We received your application — ${site.name}`,
    html: wrapBody(inner),
    text,
  };
}

/** Internal staff alert — minimal styling, not the applicant-facing branded layout. */
export function buildApplicationAdminNotificationEmail(params: {
  fullName: string;
  email: string;
  tiktokUsername: string;
  timezone: string | null;
  adminUrl: string;
  isResubmit: boolean;
}): { subject: string; html: string; text: string } {
  const subject = "New Streamer Factory application";
  const tzLine =
    params.timezone && params.timezone.trim() ? `Timezone: ${params.timezone.trim()}` : "Timezone: (not set)";
  const kind = params.isResubmit ? "Resubmission (previously rejected)" : "New submission";

  const inner = `<div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.5;color:#18181b;max-width:560px;">
<p style="margin:0 0 12px 0;font-size:13px;color:#52525b;">${escapeHtml(kind)}</p>
<p style="margin:0 0 8px 0;"><strong>Name:</strong> ${escapeHtml(params.fullName)}</p>
<p style="margin:0 0 8px 0;"><strong>Email:</strong> <a href="mailto:${escapeHtml(params.email)}" style="color:#2563eb;">${escapeHtml(params.email)}</a></p>
<p style="margin:0 0 8px 0;"><strong>TikTok:</strong> @${escapeHtml(params.tiktokUsername.replace(/^@/, ""))}</p>
<p style="margin:0 0 16px 0;"><strong>${escapeHtml(tzLine)}</strong></p>
<p style="margin:0;"><a href="${escapeHtml(params.adminUrl)}" style="color:#2563eb;font-weight:600;">Open admin — applications</a></p>
<p style="margin:12px 0 0 0;font-size:13px;color:#52525b;">${escapeHtml(params.adminUrl)}</p>
</div>`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width"/></head>
<body style="margin:0;padding:24px;background:#f4f4f5;">
${inner}
</body>
</html>`;

  const text = [
    subject,
    "",
    kind,
    `Name: ${params.fullName}`,
    `Email: ${params.email}`,
    `TikTok: @${params.tiktokUsername.replace(/^@/, "")}`,
    tzLine,
    "",
    "Admin:",
    params.adminUrl,
  ].join("\n");

  return { subject, html, text };
}

export function buildApplicationApprovedEmail(params: { firstName: string }): {
  subject: string;
  html: string;
  text: string;
} {
  const name = escapeHtml(params.firstName);
  const streamerUUrl = absoluteUrl("/streameru");
  const hubUrl = absoluteUrl("/battle-hub");
  const startHereUrl = absoluteUrl("/streameru/start-here");

  const inner = `<p style="margin:0 0 16px 0;">Hi ${name},</p>
<p style="margin:0 0 16px 0;">Good news — your account is <strong>approved</strong> for ${escapeHtml(site.name)} membership. You can sign in anytime and use the same tools we run battles and coordination on: Battle Hub, scheduler, network calendar, and StreamerU.</p>
${button(streamerUUrl, "Open StreamerU")}
${linkLine(hubUrl, "Battle Hub")}
<p style="margin:8px 0 0 0;font-size:14px;color:${muted};">Guided intro (lessons 1–4): <a href="${escapeHtml(startHereUrl)}" style="color:${accent};">${escapeHtml(startHereUrl)}</a></p>
<p style="margin:24px 0 0 0;font-size:14px;color:${muted};">Welcome to the network — we are glad you are here.</p>`;

  const text = [
    `Hi ${params.firstName},`,
    "",
    `Your Streamer Factory membership is approved. Sign in to open member tools.`,
    "",
    "StreamerU:",
    streamerUUrl,
    "",
    "Battle Hub:",
    hubUrl,
    "",
    "Start your training:",
    startHereUrl,
    "",
    `— ${site.name}`,
  ].join("\n");

  return {
    subject: `You're in — ${site.name} membership approved`,
    html: wrapBody(inner),
    text,
  };
}

export function buildApplicationRejectedEmail(params: { firstName: string }): {
  subject: string;
  html: string;
  text: string;
} {
  const name = escapeHtml(params.firstName);
  const statusUrl = absoluteUrl("/application-status");
  const applyUrl = absoluteUrl("/apply");

  const inner = `<p style="margin:0 0 16px 0;">Hi ${name},</p>
<p style="margin:0 0 16px 0;">Thank you for taking the time to apply to <strong>${escapeHtml(site.name)}</strong>. After review, we are <strong>not moving forward</strong> with your application at this time.</p>
<p style="margin:0 0 16px 0;">That is often about timing, capacity, or fit — not a verdict on you as a creator. We only take on a limited number of partners so we can support them well.</p>
<p style="margin:0 0 16px 0;">If your channel or goals change down the road, you are welcome to submit a fresh application when you are ready.</p>
${button(statusUrl, "View application status")}
${linkLine(applyUrl, "Apply again later")}
<p style="margin:24px 0 0 0;font-size:14px;color:${muted};">We appreciate your interest and wish you the best on TikTok LIVE.</p>`;

  const text = [
    `Hi ${params.firstName},`,
    "",
    `Thank you for applying to ${site.name}. We are not able to move forward with your application at this time.`,
    "",
    "If your situation changes, you may apply again later:",
    applyUrl,
    "",
    "Status:",
    statusUrl,
    "",
    `— ${site.name}`,
  ].join("\n");

  return {
    subject: `Update on your ${site.name} application`,
    html: wrapBody(inner),
    text,
  };
}
