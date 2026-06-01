import { NextResponse } from "next/server";
import { canScheduleBattles } from "@/lib/auth/access";
import { getSessionProfile } from "@/lib/auth/server";
import { LIVE_NOW_ON_SITE_ENABLED } from "@/lib/creator-network/live-now-enabled";
import { getLatestLiveNowSnapshots, toPublicLiveEntries } from "@/lib/creator-network/queries";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Member-safe LIVE now list (no earnings). Network members + staff. */
export async function GET() {
  if (!LIVE_NOW_ON_SITE_ENABLED) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const session = await getSessionProfile();
  if (!session?.profile || !canScheduleBattles(session.profile.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { batchId, importedAt, entries } = await getLatestLiveNowSnapshots();
    return NextResponse.json({
      batchId,
      importedAt,
      entries: toPublicLiveEntries(entries),
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Failed to load live now data.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
