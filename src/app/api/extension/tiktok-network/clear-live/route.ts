import { NextResponse } from "next/server";
import { canAccessAdmin } from "@/lib/auth/access";
import { getSessionProfile } from "@/lib/auth/server";
import { clearRecentLiveSnapshots } from "@/lib/creator-network/clear-live-snapshots";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Staff: delete recent LIVE snapshot rows so /members can be refreshed cleanly. */
export async function POST() {
  const session = await getSessionProfile();
  if (!session?.profile || !canAccessAdmin(session.profile.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const cleared = await clearRecentLiveSnapshots(12);
  if ("error" in cleared) {
    return NextResponse.json({ error: cleared.error }, { status: 500 });
  }

  return NextResponse.json({
    deleted: cleared.deleted,
    membersPath: "/members",
  });
}
