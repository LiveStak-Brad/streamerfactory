import { createClient } from "@/lib/supabase/server";
import { cleanCreatorNetworkUsername } from "@/lib/creator-network/clean-username";
import {
  buildProfileMatchMaps,
  matchProfileId,
  normalizeActiveness,
} from "@/lib/creator-network/match-profiles";
import type { ImportPayload, ImportResult, LiveRowPayload } from "@/lib/creator-network/types";
import { resolveImportPeriodBounds, sanitizeLiveDaysForPeriod } from "@/lib/creator-network/stat-period";
import { isExcludedNetworkHandle } from "@/lib/members/network-exclusions";
import { normalizeHandle, resolveCanonicalHandle } from "@/lib/rankings/backstage-seed-data";

function sanitizeImportedHours(hours: number | undefined): number {
  return Math.round(Math.max(0, Number(hours ?? 0)) * 10) / 10;
}

function normalizeConfidence(raw: string | undefined): "high" | "medium" | "low" {
  if (raw === "high" || raw === "medium" || raw === "low") return raw;
  return "low";
}

export async function importCreatorNetworkPayload(
  payload: ImportPayload,
  importedByProfileId: string,
): Promise<ImportResult | { ok: false; error: string }> {
  const supabase = await createClient();
  const rawCount =
    payload.rows.length + (payload.liveRows?.length ?? 0);

  const { data: batchRow, error: batchErr } = await supabase
    .from("creator_network_import_batches")
    .insert({
      imported_by_profile_id: importedByProfileId,
      source: "chrome_extension",
      source_page_url: payload.sourcePageUrl,
      detected_page_type: payload.detectedPageType,
      relationship_tab: payload.relationshipTab ?? null,
      raw_rows_count: rawCount,
      status: "processing",
    })
    .select("id")
    .single();

  if (batchErr || !batchRow) {
    return { ok: false, error: batchErr?.message ?? "Failed to create import batch." };
  }

  const batchId = batchRow.id as string;
  const { maps, error: mapErr } = await buildProfileMatchMaps(supabase);
  if (mapErr) {
    await failBatch(supabase, batchId, mapErr);
    return { ok: false, error: mapErr };
  }

  let acceptedRows = 0;
  let rejectedRows = 0;
  let matchedProfiles = 0;
  let lowConfidenceMatches = 0;
  const unmatchedUsernames = new Set<string>();
  let liveRowsAccepted = 0;

  const importPeriod = resolveImportPeriodBounds({
    statPeriodLabel: payload.statPeriodLabel ?? null,
    statPeriodStart: payload.statPeriodStart ?? null,
    statPeriodEnd: payload.statPeriodEnd ?? null,
    statPeriodKind: payload.statPeriodKind ?? null,
    importedAt: new Date(),
  });

  try {
    if (payload.detectedPageType === "live_now") {
      const liveRows: LiveRowPayload[] =
        payload.liveRows ??
        payload.rows.map((r) => ({
          tiktokUsername: r.tiktokUsername,
          displayName: r.displayName,
          avatarUrl: r.avatarUrl,
          streamTitle: undefined,
          viewerCountText: undefined,
          liveStartedText: r.liveDurationText,
          usernameConfidence: r.usernameConfidence,
          usernameSource: r.usernameSource,
        }));

      for (const live of liveRows) {
        const username = live.tiktokUsername?.trim();
        if (!username) {
          rejectedRows += 1;
          continue;
        }
        const canonical = resolveCanonicalHandle(username);
        const profileId = matchProfileId(maps, username);
        if (profileId) matchedProfiles += 1;
        if (profileId && normalizeConfidence(live.usernameConfidence) === "low") lowConfidenceMatches += 1;
        else unmatchedUsernames.add(canonical);

        const { error } = await supabase.from("creator_network_live_snapshots").insert({
          batch_id: batchId,
          profile_id: profileId,
          tiktok_username: canonical,
          tiktok_display_name: live.displayName ?? null,
          username_confidence: normalizeConfidence(live.usernameConfidence),
          username_source: live.usernameSource ?? null,
          avatar_url: live.avatarUrl ?? null,
          stream_title: live.streamTitle ?? null,
          viewer_count_text: live.viewerCountText ?? null,
          live_started_text: live.liveStartedText ?? null,
          live_badge_detected: live.liveBadgeDetected === true,
          source_page_url: payload.sourcePageUrl,
          imported_by_profile_id: importedByProfileId,
        });

        if (error) {
          rejectedRows += 1;
        } else {
          acceptedRows += 1;
          liveRowsAccepted += 1;
        }
      }
    } else {
      for (const row of payload.rows) {
        const usernameRaw = row.tiktokUsernameRaw?.trim() || row.tiktokUsername?.trim();
        const cleaned =
          cleanCreatorNetworkUsername(row.tiktokUsername) ??
          cleanCreatorNetworkUsername(usernameRaw);
        if (!cleaned) {
          rejectedRows += 1;
          continue;
        }

        const canonical = resolveCanonicalHandle(cleaned);
        if (isExcludedNetworkHandle(canonical)) {
          rejectedRows += 1;
          continue;
        }
        const profileId = matchProfileId(maps, cleaned);
        if (profileId) matchedProfiles += 1;
        if (profileId && normalizeConfidence(row.usernameConfidence) === "low") lowConfidenceMatches += 1;
        else unmatchedUsernames.add(canonical);

        const statInsert = {
          batch_id: batchId,
          profile_id: profileId,
          tiktok_username: canonical,
          tiktok_username_raw: usernameRaw ?? null,
          tiktok_display_name: row.displayName ?? null,
          username_confidence: normalizeConfidence(row.usernameConfidence),
          username_source: row.usernameSource ?? null,
          avatar_url: row.avatarUrl ?? null,
          creator_network_status: row.creatorNetworkStatus ?? payload.relationshipTab ?? null,
          coins_earned: Math.max(0, Math.round(row.coinsEarned ?? row.diamondsEarned ?? 0)),
          diamonds_earned: Math.max(0, Math.round(row.diamondsEarned ?? row.coinsEarned ?? 0)),
          engagements: Math.max(0, Math.round(row.engagements ?? 0)),
          days_streamed: sanitizeLiveDaysForPeriod(row.daysStreamed, importPeriod.kind),
          hours_streamed: sanitizeImportedHours(row.hoursStreamed),
          activeness_level: normalizeActiveness(row.activenessLevel),
          live_duration_seconds: Math.max(0, Math.round(row.liveDurationSeconds ?? 0)),
          invite_status: row.inviteStatus ?? null,
          violation_status: row.violationStatus ?? null,
          risk_flag: row.riskFlag ?? null,
          relationship_reason: row.relationshipReason ?? null,
          relationship_request_date: row.relationshipRequestDate ?? null,
          stat_period_label: payload.statPeriodLabel ?? null,
          stat_period_start: importPeriod.periodStart,
          stat_period_end: importPeriod.periodEnd,
          source_page_url: payload.sourcePageUrl,
          imported_by_profile_id: importedByProfileId,
        };

        const { error } = await supabase.from("creator_network_member_stats").insert(statInsert);

        if (error) {
          if (error.code === "23505") {
            rejectedRows += 1;
          } else {
            rejectedRows += 1;
          }
        } else {
          acceptedRows += 1;
        }
      }
    }

    await supabase
      .from("creator_network_import_batches")
      .update({
        accepted_rows_count: acceptedRows,
        rejected_rows_count: rejectedRows,
        status: "completed",
        completed_at: new Date().toISOString(),
      })
      .eq("id", batchId);

    return {
      batchId,
      acceptedRows,
      rejectedRows,
      matchedProfiles,
      lowConfidenceMatches,
      unmatchedUsernames: [...unmatchedUsernames],
      liveRowsAccepted: payload.detectedPageType === "live_now" ? liveRowsAccepted : undefined,
    };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Import failed.";
    await failBatch(supabase, batchId, msg);
    return { ok: false, error: msg };
  }
}

async function failBatch(
  supabase: Awaited<ReturnType<typeof createClient>>,
  batchId: string,
  message: string,
) {
  await supabase
    .from("creator_network_import_batches")
    .update({
      status: "failed",
      error_message: message,
      completed_at: new Date().toISOString(),
    })
    .eq("id", batchId);
}

/** Normalize username for display/search (re-export for API consumers). */
export { normalizeHandle as normalizeTikTokUsername };
