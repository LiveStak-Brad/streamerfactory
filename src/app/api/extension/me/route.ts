import { NextResponse } from "next/server";
import { canAccessAdmin } from "@/lib/auth/access";
import { getSessionProfile } from "@/lib/auth/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Extension auth probe — confirms Streamer Factory session and import permission. */
export async function GET() {
  const session = await getSessionProfile();
  if (!session?.profile) {
    return NextResponse.json({
      authenticated: false,
      canImportTikTokNetworkStats: false,
    });
  }

  const canImport = canAccessAdmin(session.profile.role);

  return NextResponse.json({
    authenticated: true,
    profileId: session.profile.id,
    role: session.profile.role,
    canImportTikTokNetworkStats: canImport,
  });
}
