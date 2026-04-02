import { NextResponse } from "next/server";

import { buildApplicationApprovedEmail } from "@/lib/email/templates/application-emails";
import { canAccessAdmin } from "@/lib/auth/access";
import { getSessionProfile } from "@/lib/auth/server";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RESENDABLE_MEMBER_ROLES = new Set(["member", "admin", "editor"]);

function firstNameFromFullName(fullName: string): string {
  const t = fullName.trim();
  if (!t) return "there";
  const parts = t.split(/\s+/);
  return parts[0] ?? "there";
}

/** Inline env read (no shared module import) so this route never bundles a stale `undefined` for secrets. */
function stripQuotes(s: string): string {
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

function pickResendEnv(): { apiKey: string; from: string } | null {
  const apiKey = envStr(process.env.RESEND_API_KEY);
  const a = stripQuotes(envStr(process.env.RESEND_TRANSACTIONAL_FROM));
  const b = stripQuotes(envStr(process.env.RESEND_FROM_EMAIL));
  const from = a || b;
  if (!apiKey || !from) return null;
  return { apiKey, from };
}

/**
 * Resend the membership-approved email (same template as first-time approval).
 * Uses Resend’s HTTP API directly here (no Resend SDK / sendTransactionalEmail chain) so
 * Vercel always reads env at request time and we can surface Resend error bodies when sends fail.
 */
export async function POST(request: Request) {
  const session = await getSessionProfile();
  if (!session?.profile || !canAccessAdmin(session.profile.role)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  let env = pickResendEnv();
  if (!env) {
    const apiKey = envStr(process.env.RESEND_API_KEY);
    const fromEmailOnly = envStr(process.env.RESEND_FROM_EMAIL);
    if (apiKey && fromEmailOnly) {
      env = { apiKey, from: fromEmailOnly };
    }
  }
  if (!env) {
    const checks = {
      apiKeyPresent: envStr(process.env.RESEND_API_KEY).length > 0,
      transactionalFromPresent: envStr(process.env.RESEND_TRANSACTIONAL_FROM).length > 0,
      fromEmailPresent: envStr(process.env.RESEND_FROM_EMAIL).length > 0,
    };
    return NextResponse.json(
      {
        ok: false,
        error:
          "Resend is not configured in this environment (missing API key or from address). Add them in your host’s env and redeploy.",
        checks,
      },
      { status: 503 },
    );
  }

  let body: { userId?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const userId = typeof body.userId === "string" ? body.userId.trim() : "";
  if (!userId) {
    return NextResponse.json({ ok: false, error: "userId is required." }, { status: 400 });
  }

  const supabase = await createClient();

  const { data: profileRow } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .maybeSingle();

  const role = (profileRow?.role ?? "").trim().toLowerCase();
  if (!RESENDABLE_MEMBER_ROLES.has(role)) {
    return NextResponse.json(
      { ok: false, error: "Resend is only available for member, editor, or admin accounts." },
      { status: 400 },
    );
  }

  const [{ data: application }, { data: profileEmail }] = await Promise.all([
    supabase.from("applications").select("email, full_name").eq("user_id", userId).maybeSingle(),
    supabase.from("profiles").select("email").eq("id", userId).maybeSingle(),
  ]);

  const to =
    application?.email?.trim() ||
    profileEmail?.email?.trim() ||
    "";

  if (!to) {
    return NextResponse.json(
      { ok: false, error: "No email on file for this account." },
      { status: 400 },
    );
  }

  const { subject, html, text } = buildApplicationApprovedEmail({
    firstName: firstNameFromFullName(application?.full_name ?? ""),
  });

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.from,
      to: [to],
      subject,
      html,
      text,
    }),
  });

  const payload = (await res.json().catch(() => null)) as
    | { message?: string; name?: string; statusCode?: number }
    | null;

  if (!res.ok) {
    const detail =
      typeof payload?.message === "string"
        ? payload.message
        : payload != null
          ? JSON.stringify(payload)
          : await res.text().catch(() => "");
    console.error("[resend-approval-email] Resend HTTP", res.status, detail);
    const short =
      detail.length > 220 ? `${detail.slice(0, 217)}…` : detail || `HTTP ${res.status}`;
    return NextResponse.json(
      {
        ok: false,
        error: `Resend rejected the send (${res.status}). ${short}`,
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
