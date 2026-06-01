import { NextResponse } from "next/server";
import { canAccessAdmin } from "@/lib/auth/access";
import { getSessionProfile } from "@/lib/auth/server";
import { getImportMatchReviewSummary } from "@/lib/creator-network/queries";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getSessionProfile();
  if (!session?.profile || !canAccessAdmin(session.profile.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const summary = await getImportMatchReviewSummary();
    return NextResponse.json(summary);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Failed to build matching report.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
