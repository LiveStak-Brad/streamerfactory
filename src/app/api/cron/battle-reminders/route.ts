import { NextResponse } from "next/server";

import { sendUpcomingBattleReminders } from "@/lib/email/battle-lifecycle";

/**
 * Upcoming battle reminders (60–120 minute window). Intended to be called on a schedule:
 * - Vercel Cron: add to vercel.json pointing at this route
 * - Or Supabase pg_cron + Edge Function / HTTP POST
 *
 * Set CRON_SECRET in the environment and send Authorization: Bearer <CRON_SECRET>.
 * If CRON_SECRET is unset, the route still runs (local dev); lock down in production.
 */
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET?.trim();
  if (secret) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }
  }

  const result = await sendUpcomingBattleReminders();
  return NextResponse.json({ ok: true, ...result });
}
