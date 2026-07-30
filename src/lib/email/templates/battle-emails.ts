import { absoluteUrl } from "@/lib/site-url";
import { escapeHtml } from "@/lib/email/escape-html";
import { site } from "@/lib/site";

const accent = "#5B3BFF";
const accentHot = "#FF2ED1";
const text = "#18181b";
const muted = "#52525b";
const logoUrl = absoluteUrl("/branding/emails/logo-240.png");

function wrapBody(inner: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width"/></head>
<body style="margin:0;padding:0;background-color:#0B0F1A;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#0B0F1A;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width:560px;background-color:#ffffff;border-radius:16px;border:1px solid #e4e4e7;overflow:hidden;">
          <tr>
            <td style="height:4px;background:linear-gradient(90deg,${accent},${accentHot},#00E5FF);"></td>
          </tr>
          <tr>
            <td style="padding:28px 28px 8px 28px;" align="left">
              <img src="${escapeHtml(logoUrl)}" width="72" height="72" alt="${escapeHtml(site.name)}" style="display:block;border:0;border-radius:16px;"/>
              <p style="margin:14px 0 0 0;font-size:13px;font-weight:700;letter-spacing:0.12em;color:${accent};text-transform:uppercase;">${escapeHtml(site.name)}</p>
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
  return `<a href="${u}" style="display:inline-block;margin-top:8px;margin-bottom:4px;padding:12px 20px;background:linear-gradient(135deg,${accent},${accentHot});color:#ffffff;text-decoration:none;border-radius:10px;font-weight:600;font-size:15px;">${l}</a>`;
}

/** Readable local time with timezone abbreviation, e.g. "Apr 5, 2026 at 8:00 PM (EDT)". */
export function formatBattleEmailDateTime(iso: string, timezone: string): string {
  try {
    const d = new Date(iso);
    const tz = timezone || "UTC";
    const withTz = new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZoneName: "short",
    }).formatToParts(d);
    const tzName = withTz.find((p) => p.type === "timeZoneName")?.value ?? tz;
    const main = new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(d);
    return `${main} (${tzName})`;
  } catch {
    return new Date(iso).toUTCString();
  }
}

export function buildBattleMatchedEmail(params: {
  title: string;
  participantHandles: string[];
  formatLabel: string;
  finderUrl: string;
  schedulerUrl: string;
}): { subject: string; html: string; text: string } {
  const title = escapeHtml(params.title || "Battle");
  const handles = params.participantHandles.map((h) => `@${escapeHtml(h.replace(/^@/, ""))}`).join(", ");
  const fmt = escapeHtml(params.formatLabel);
  const inner = `<p style="margin:0 0 16px 0;">Your battle request is <strong>full</strong> — everyone has joined.</p>
<p style="margin:0 0 8px 0;"><strong>${title}</strong></p>
<p style="margin:0 0 8px 0;color:${muted};font-size:14px;">Format: ${fmt}</p>
<p style="margin:0 0 16px 0;">Participants: ${handles}</p>
<p style="margin:0 0 16px 0;">Next step: schedule it on the calendar so the network can see it.</p>
${button(params.schedulerUrl, "Schedule battle")}
<p style="margin:12px 0 0 0;font-size:14px;color:${muted};">Or open the request in Battle Finder: <a href="${escapeHtml(params.finderUrl)}" style="color:${accent};font-weight:600;">${escapeHtml(params.finderUrl)}</a></p>`;

  const text = [
    "Your battle request is full — everyone has joined.",
    "",
    params.title || "Battle",
    `Format: ${params.formatLabel}`,
    `Participants: ${params.participantHandles.map((h) => `@${h.replace(/^@/, "")}`).join(", ")}`,
    "",
    "Schedule it on the calendar:",
    params.schedulerUrl,
    "",
    "Battle Finder:",
    params.finderUrl,
    "",
    `— ${site.name}`,
  ].join("\n");

  return {
    subject: "Your battle is ready to schedule",
    html: wrapBody(inner),
    text,
  };
}

export function buildBattlePromotedEmail(params: {
  title: string;
  participantHandles: string[];
  whenLabel: string;
  calendarUrl: string;
}): { subject: string; html: string; text: string } {
  const title = escapeHtml(params.title || "Battle");
  const handles = params.participantHandles.map((h) => `@${escapeHtml(h.replace(/^@/, ""))}`).join(", ");
  const inner = `<p style="margin:0 0 16px 0;">Your battle is now on the <strong>network calendar</strong>.</p>
<p style="margin:0 0 8px 0;"><strong>${title}</strong></p>
<p style="margin:0 0 8px 0;">Participants: ${handles}</p>
<p style="margin:0 0 16px 0;"><strong>When:</strong> ${escapeHtml(params.whenLabel)}</p>
${button(params.calendarUrl, "View calendar")}`;

  const text = [
    "Your battle is scheduled on the network calendar.",
    "",
    params.title || "Battle",
    `Participants: ${params.participantHandles.map((h) => `@${h.replace(/^@/, "")}`).join(", ")}`,
    `When: ${params.whenLabel}`,
    "",
    params.calendarUrl,
    "",
    `— ${site.name}`,
  ].join("\n");

  return {
    subject: "Your battle is scheduled",
    html: wrapBody(inner),
    text,
  };
}

export function buildBattleReminderEmail(params: {
  title: string;
  participantHandles: string[];
  whenLabel: string;
  calendarUrl: string;
}): { subject: string; html: string; text: string } {
  const title = escapeHtml(params.title || "Battle");
  const handles = params.participantHandles.map((h) => `@${escapeHtml(h.replace(/^@/, ""))}`).join(", ");
  const inner = `<p style="margin:0 0 16px 0;">Heads up — you have an upcoming battle on the network calendar.</p>
<p style="margin:0 0 8px 0;"><strong>${title}</strong></p>
<p style="margin:0 0 8px 0;">Participants: ${handles}</p>
<p style="margin:0 0 16px 0;"><strong>When:</strong> ${escapeHtml(params.whenLabel)}</p>
${button(params.calendarUrl, "Open calendar")}`;

  const text = [
    "Upcoming battle reminder",
    "",
    params.title || "Battle",
    `Participants: ${params.participantHandles.map((h) => `@${h.replace(/^@/, "")}`).join(", ")}`,
    `When: ${params.whenLabel}`,
    "",
    params.calendarUrl,
    "",
    `— ${site.name}`,
  ].join("\n");

  return {
    subject: "Upcoming battle reminder",
    html: wrapBody(inner),
    text,
  };
}
