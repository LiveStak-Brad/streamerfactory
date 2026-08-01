import { NextResponse } from "next/server";

import { ensurePreviousMonthArchived } from "@/lib/hall-of-fame/archive";
import { completedYearMonthToArchive, formatYearMonthLabel } from "@/lib/hall-of-fame/months";

/**
 * Archive the previous UTC month into Hall of Fame once the new month starts.
 * Called by Vercel Cron (see vercel.json). Also safe as a daily catch-up.
 *
 * Requires CRON_SECRET. Vercel sends: Authorization: Bearer <CRON_SECRET>
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

  const target = completedYearMonthToArchive();
  const result = await ensurePreviousMonthArchived();

  if (!result.ok) {
    return NextResponse.json({
      ok: false,
      target,
      label: formatYearMonthLabel(target),
      error: result.error,
    });
  }

  return NextResponse.json({
    ok: true,
    target: result.yearMonth,
    label: formatYearMonthLabel(result.yearMonth),
    placed: result.placed,
    alreadyLocked: Boolean(result.alreadyLocked),
  });
}
