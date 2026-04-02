import { NextResponse } from "next/server";

import { readResendEnvFromProcess } from "@/lib/email/resend-env-read";
import { canAccessAdmin } from "@/lib/auth/access";
import { getSessionProfile } from "@/lib/auth/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Admin-only: whether Resend-related env is visible to this deployment (no secret values).
 * Open in the browser while signed in as staff: GET /api/admin/email-env
 */
export async function GET() {
  const session = await getSessionProfile();
  if (!session?.profile || !canAccessAdmin(session.profile.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const hasApiKey = envStr(process.env.RESEND_API_KEY).length > 0;
  const hasTransactionalFrom = envStr(process.env.RESEND_TRANSACTIONAL_FROM).length > 0;
  const hasFromEmail = envStr(process.env.RESEND_FROM_EMAIL).length > 0;
  const bundle = readResendEnvFromProcess();

  return NextResponse.json({
    ready: bundle !== null,
    hasApiKey,
    hasTransactionalFrom,
    hasFromEmail,
    hint:
      !bundle && !hasApiKey
        ? "Add RESEND_API_KEY in Vercel → Project → Settings → Environment Variables (Production), then redeploy."
        : !bundle && hasApiKey
          ? "API key is set; add RESEND_TRANSACTIONAL_FROM or RESEND_FROM_EMAIL (verified domain in Resend), then redeploy."
          : bundle
            ? "Resend env looks OK for this deployment."
            : "Check variables above.",
  });
}

function envStr(v: string | undefined): string {
  if (v === undefined || v === null) return "";
  return String(v).trim();
}
