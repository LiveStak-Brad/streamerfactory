import { NextResponse } from "next/server";
import { canAccessAdmin } from "@/lib/auth/access";
import { getSessionProfile } from "@/lib/auth/server";
import { getImportedStatsForAdmin } from "@/lib/creator-network/queries";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const session = await getSessionProfile();
  if (!session?.profile || !canAccessAdmin(session.profile.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sp = new URL(request.url).searchParams;

  try {
    const stats = await getImportedStatsForAdmin({
      username: sp.get("username") ?? undefined,
      activenessLevel: sp.get("activeness") ?? undefined,
      inviteStatus: sp.get("inviteStatus") ?? undefined,
      matched: (sp.get("matched") as "matched" | "unmatched" | null) ?? undefined,
      batchId: sp.get("batchId") ?? undefined,
      limit: sp.get("limit") ? Number(sp.get("limit")) : 100,
    });
    return NextResponse.json({ stats });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Failed to load stats.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
