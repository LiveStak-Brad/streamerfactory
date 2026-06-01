import { NextResponse } from "next/server";
import { canAccessAdmin } from "@/lib/auth/access";
import { getSessionProfile } from "@/lib/auth/server";
import { getRecentImportBatches } from "@/lib/creator-network/queries";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const session = await getSessionProfile();
  if (!session?.profile || !canAccessAdmin(session.profile.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const limitRaw = new URL(request.url).searchParams.get("limit");
  const limit = limitRaw ? Math.min(100, Math.max(1, Number(limitRaw) || 25)) : 25;

  try {
    const batches = await getRecentImportBatches(limit);
    return NextResponse.json({ batches });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Failed to load batches.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
