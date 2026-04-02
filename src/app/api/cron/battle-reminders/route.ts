import { NextResponse } from "next/server";

import { sendUpcomingBattleReminders } from "@/lib/email/battle-lifecycle";

/**
 * Upcoming battle reminders (60–120 minute window). Called by Vercel Cron (see vercel.json).
 *
 * Requires CRON_SECRET in the environment. Vercel sends:
 *   Authorization: Bearer <CRON_SECRET>
 * when CRON_SECRET is set on the project.
 */
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const auth = request.headers.get("authorization");
  if (auth !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const result = await sendUpcomingBattleReminders();
  return NextResponse.json({ ok: true, ...result });
}
