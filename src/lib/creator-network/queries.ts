import { isInvalidLiveStreamHandle } from "@/lib/creator-network/live-now-display";
import { getLeaderboardSupabase } from "@/lib/creator-network/leaderboard-db";
import { isExcludedNetworkHandle } from "@/lib/members/network-exclusions";
import { createClient } from "@/lib/supabase/server";
import type {
  AdminMemberStatView,
  ImportBatchRow,
  LiveSnapshotRow,
  MatchReviewSummary,
  MemberSafeStatView,
  MemberStatRow,
} from "@/lib/creator-network/types";

export async function getRecentImportBatches(limit = 25): Promise<ImportBatchRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("creator_network_import_batches")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);
  return (data ?? []) as ImportBatchRow[];
}

export type StatsQueryFilters = {
  username?: string;
  activenessLevel?: string;
  inviteStatus?: string;
  matched?: "matched" | "unmatched";
  batchId?: string;
  limit?: number;
};

export async function getImportedStatsForAdmin(
  filters: StatsQueryFilters = {},
): Promise<AdminMemberStatView[]> {
  const supabase = await createClient();
  let query = supabase
    .from("creator_network_member_stats")
    .select("*")
    .order("imported_at", { ascending: false })
    .limit(filters.limit ?? 100);

  if (filters.username?.trim()) {
    query = query.ilike("tiktok_username", `%${filters.username.trim().replace(/^@+/, "")}%`);
  }
  if (filters.activenessLevel?.trim()) {
    query = query.eq("activeness_level", filters.activenessLevel.trim());
  }
  if (filters.inviteStatus?.trim()) {
    query = query.eq("invite_status", filters.inviteStatus.trim());
  }
  if (filters.batchId?.trim()) {
    query = query.eq("batch_id", filters.batchId.trim());
  }
  if (filters.matched === "matched") {
    query = query.not("profile_id", "is", null);
  } else if (filters.matched === "unmatched") {
    query = query.is("profile_id", null);
  }

  const { data: stats, error } = await query;
  if (error) throw new Error(error.message);

  const rows = (stats ?? []) as MemberStatRow[];
  const profileIds = [...new Set(rows.map((r) => r.profile_id).filter(Boolean))] as string[];

  const profileMap = new Map<string, { email: string | null; tiktok_username: string | null }>();
  if (profileIds.length > 0) {
    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, email, tiktok_username")
      .in("id", profileIds);
    for (const p of profiles ?? []) {
      profileMap.set(p.id as string, {
        email: (p.email as string | null) ?? null,
        tiktok_username: (p.tiktok_username as string | null) ?? null,
      });
    }
  }

  return rows.map((row) => {
    const prof = row.profile_id ? profileMap.get(row.profile_id) : undefined;
    return {
      ...row,
      matched_email: prof?.email ?? null,
      matched_profile_username: prof?.tiktok_username ?? null,
    };
  });
}

export async function getImportMatchReviewSummary(): Promise<MatchReviewSummary> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("creator_network_member_stats")
    .select("profile_id, username_confidence");

  if (error) throw new Error(error.message);

  let matchedProfiles = 0;
  let unmatchedProfiles = 0;
  let lowConfidenceMatches = 0;
  for (const row of data ?? []) {
    const profileId = row.profile_id as string | null;
    const confidence = (row.username_confidence as string | null) ?? "low";
    if (profileId) {
      matchedProfiles += 1;
      if (confidence === "low") lowConfidenceMatches += 1;
    } else {
      unmatchedProfiles += 1;
    }
  }
  return { matchedProfiles, unmatchedProfiles, lowConfidenceMatches };
}

const LIVE_NOW_MAX_AGE_MS = 6 * 60 * 60 * 1000;

function dedupeLiveSnapshots(rows: LiveSnapshotRow[]): LiveSnapshotRow[] {
  const byHandle = new Map<string, LiveSnapshotRow>();
  for (const row of rows) {
    const handle = row.tiktok_username?.trim().toLowerCase();
    if (!handle || isExcludedNetworkHandle(handle) || isInvalidLiveStreamHandle(handle)) continue;
    if (!byHandle.has(handle)) byHandle.set(handle, row);
  }
  return [...byHandle.values()].sort((a, b) =>
    (a.tiktok_display_name ?? a.tiktok_username ?? "").localeCompare(
      b.tiktok_display_name ?? b.tiktok_username ?? "",
      undefined,
      { sensitivity: "base" },
    ),
  );
}

async function loadLatestLiveNowSnapshots(
  supabase: Awaited<ReturnType<typeof createClient>>,
): Promise<{
  batchId: string | null;
  importedAt: string | null;
  entries: LiveSnapshotRow[];
}> {
  const sixHoursAgo = new Date(Date.now() - LIVE_NOW_MAX_AGE_MS).toISOString();

  const { data: batches, error: batchErr } = await supabase
    .from("creator_network_import_batches")
    .select("id, created_at")
    .eq("detected_page_type", "live_now")
    .eq("status", "completed")
    .gte("created_at", sixHoursAgo)
    .order("created_at", { ascending: false })
    .limit(1);

  if (batchErr) throw new Error(batchErr.message);
  const batch = batches?.[0] as { id: string; created_at: string } | undefined;
  if (!batch) {
    return { batchId: null, importedAt: null, entries: [] };
  }

  const { data: entries, error } = await supabase
    .from("creator_network_live_snapshots")
    .select("*")
    .eq("batch_id", batch.id)
    .order("tiktok_display_name", { ascending: true });

  if (error) throw new Error(error.message);

  return {
    batchId: batch.id,
    importedAt: batch.created_at,
    entries: dedupeLiveSnapshots((entries ?? []) as LiveSnapshotRow[]),
  };
}

/** Latest LIVE now snapshot (authenticated members / staff). */
export async function getLatestLiveNowSnapshots(): Promise<{
  batchId: string | null;
  importedAt: string | null;
  entries: LiveSnapshotRow[];
}> {
  return loadLatestLiveNowSnapshots(await createClient());
}

/** Public /members page — uses service role when available (same as rankings). */
export async function getPublicLiveNowSnapshots(): Promise<{
  batchId: string | null;
  importedAt: string | null;
  entries: LiveSnapshotRow[];
}> {
  try {
    return await loadLatestLiveNowSnapshots(await getLeaderboardSupabase());
  } catch {
    return { batchId: null, importedAt: null, entries: [] };
  }
}

/** Member's latest imported stat row (includes own financial fields via RLS). */
export async function getMyLatestImportedStats(profileId: string): Promise<MemberSafeStatView | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("creator_network_member_stats")
    .select(
      "id, tiktok_username, tiktok_display_name, avatar_url, activeness_level, days_streamed, hours_streamed, creator_network_status, invite_status, imported_at, coins_earned, diamonds_earned, engagements",
    )
    .eq("profile_id", profileId)
    .order("imported_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) return null;

  return data as MemberSafeStatView;
}

/** Safe live-now entries for member UI (no earnings). */
export type LiveNowPublicEntry = {
  tiktok_username: string | null;
  tiktok_display_name: string | null;
  avatar_url: string | null;
  stream_title: string | null;
  viewer_count_text: string | null;
  live_started_text: string | null;
};

export function toPublicLiveEntries(entries: LiveSnapshotRow[]): LiveNowPublicEntry[] {
  return entries.map((e) => ({
    tiktok_username: e.tiktok_username,
    tiktok_display_name: e.tiktok_display_name,
    avatar_url: e.avatar_url,
    stream_title: e.stream_title,
    viewer_count_text: e.viewer_count_text,
    live_started_text: e.live_started_text,
  }));
}
