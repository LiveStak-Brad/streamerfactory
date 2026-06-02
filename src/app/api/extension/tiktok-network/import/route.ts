import { NextResponse } from "next/server";
import { canAccessAdmin } from "@/lib/auth/access";
import { getSessionProfile } from "@/lib/auth/server";
import { importCreatorNetworkPayload } from "@/lib/creator-network/import";
import {
  revalidateCreatorNetworkLivePages,
  revalidateCreatorNetworkSitePages,
} from "@/lib/creator-network/revalidate-after-import";
import type { ImportResult } from "@/lib/creator-network/types";
import { validateImportPayload } from "@/lib/creator-network/validate";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Receive parsed visible creator stats from the Chrome extension.
 * Staff only. Does not touch TikTok cookies or tokens.
 */
export async function POST(request: Request) {
  const session = await getSessionProfile();
  if (!session?.profile || !canAccessAdmin(session.profile.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = validateImportPayload(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const imported = await importCreatorNetworkPayload(parsed.data, session.profile.id);
  if ("ok" in imported && imported.ok === false) {
    return NextResponse.json({ error: imported.error }, { status: 500 });
  }
  const result = imported as ImportResult;

  const updatesRankings = parsed.data.detectedPageType === "creator_stats";
  if (updatesRankings && result.acceptedRows > 0) {
    revalidateCreatorNetworkSitePages();
  }
  if ((result.liveRowsAccepted ?? 0) > 0) {
    revalidateCreatorNetworkLivePages();
  }

  return NextResponse.json({
    ...result,
    siteUpdated: updatesRankings && result.acceptedRows > 0,
    rankingsPath: "/rankings",
  });
}
