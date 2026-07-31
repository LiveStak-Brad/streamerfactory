import { createClient } from "@/lib/supabase/server";
import { cleanCreatorNetworkUsername } from "@/lib/creator-network/clean-username";
import { normalizeDatasetType, PARSER_VERSION } from "@/lib/creator-network/dataset-types";
import {
  accountUsernameMatch,
  normalizeMatchConfidence,
} from "@/lib/creator-network/match-accounting";
import {
  buildProfileMatchMaps,
  matchProfileId,
  normalizeActiveness,
} from "@/lib/creator-network/match-profiles";
import { coerceMetricField, metricToNullable } from "@/lib/creator-network/metric-field";
import type { ImportPayload, ImportResult, ImportRowPayload, LiveRowPayload } from "@/lib/creator-network/types";
import {
  resolveImportPeriodBounds,
  sanitizeLiveDaysForPeriodNullable,
} from "@/lib/creator-network/stat-period";
import { parsePlausibleImportedDiamonds } from "@/lib/creator-network/stat-sanity";
import {
  monthlyPerformanceUpsertFromImportRow,
  upsertMonthlyPerformanceStatsFromImport,
} from "@/lib/creator-network/sync-performance-from-import";
import {
  isInvalidLiveStreamHandle,
  isSuspiciousLiveHandle,
} from "@/lib/creator-network/live-handle-validation";
import { isExcludedNetworkHandle } from "@/lib/members/network-exclusions";
import { resolveCanonicalHandle } from "@/lib/rankings/backstage-seed-data";
import { insertRosterEntries } from "@/lib/creator-network/roster-diff";

function sanitizeImportedHoursNullable(hours: number | undefined | null): number | null {
  if (hours === undefined || hours === null || !Number.isFinite(hours)) return null;
  return Math.round(Math.max(0, hours) * 10) / 10;
}

function resolveOptionalMetric(field: unknown, legacy: number | undefined): number | null {
  if (field !== undefined && field !== null) {
    return metricToNullable(coerceMetricField(field));
  }
  if (legacy === undefined || legacy === null) return null;
  if (!Number.isFinite(legacy)) return null;
  return legacy;
}

function rowHours(row: ImportRowPayload): number | null {
  return sanitizeImportedHoursNullable(
    resolveOptionalMetric(row.hoursStreamedField, row.hoursStreamed),
  );
}

function rowDays(row: ImportRowPayload): number | null {
  return sanitizeLiveDaysForPeriodNullable(
    resolveOptionalMetric(row.daysStreamedField, row.daysStreamed),
  );
}

function rowDiamonds(row: ImportRowPayload): number | null {
  const fromField = resolveOptionalMetric(row.diamondsEarnedField, row.diamondsEarned);
  const fromCoins = resolveOptionalMetric(row.coinsEarnedField, row.coinsEarned);
  return parsePlausibleImportedDiamonds(
    fromField ?? undefined,
    fromCoins ?? undefined,
    rowHours(row) ?? undefined,
    rowDays(row) ?? undefined,
  );
}

/** True when PostgREST/Postgres complains about a missing column (migration not applied yet). */
function isMissingColumnError(message: string | undefined): boolean {
  if (!message) return false;
  return /column|schema cache|could not find/i.test(message);
}

type BatchInsertClient = Awaited<ReturnType<typeof createClient>>;

/** Insert batch row; retry without Phase 1A metadata columns if migration is pending. */
async function insertImportBatch(
  supabase: BatchInsertClient,
  base: Record<string, unknown>,
  meta: Record<string, unknown>,
): Promise<{ id: string } | { error: string }> {
  const full = await supabase
    .from("creator_network_import_batches")
    .insert({ ...base, ...meta })
    .select("id")
    .single();
  if (!full.error && full.data?.id) return { id: full.data.id as string };

  if (full.error && isMissingColumnError(full.error.message)) {
    const legacy = await supabase
      .from("creator_network_import_batches")
      .insert(base)
      .select("id")
      .single();
    if (!legacy.error && legacy.data?.id) return { id: legacy.data.id as string };
    return { error: legacy.error?.message ?? full.error.message };
  }

  return { error: full.error?.message ?? "Failed to create import batch." };
}

export async function importCreatorNetworkPayload(
  payload: ImportPayload,
  importedByProfileId: string,
): Promise<ImportResult | { ok: false; error: string }> {
  const supabase = await createClient();
  const datasetType = normalizeDatasetType(payload.datasetType ?? payload.detectedPageType);
  const rawCount = payload.rows.length + (payload.liveRows?.length ?? 0);

  const batchMeta = {
    dataset_type: datasetType,
    parser_version: payload.parserVersion ?? PARSER_VERSION,
    extension_version: payload.extensionVersion ?? null,
    confidence: payload.confidence ?? null,
    validation_warnings: payload.validationWarnings ?? [],
    validation_failures: payload.validationFailures ?? [],
    matched_signals: payload.matchedSignals ?? [],
    captured_at: payload.capturedAt ?? null,
  };

  if (payload.syncBlocked) {
    const blocked = await insertImportBatch(
      supabase,
      {
        imported_by_profile_id: importedByProfileId,
        source: "chrome_extension",
        source_page_url: payload.sourcePageUrl,
        detected_page_type: datasetType,
        relationship_tab: payload.relationshipTab ?? null,
        raw_rows_count: rawCount,
        accepted_rows_count: 0,
        rejected_rows_count: rawCount,
        status: "failed",
        error_message: "Sync blocked by client validation — previous data preserved.",
        completed_at: new Date().toISOString(),
      },
      { ...batchMeta, validation_failures: payload.validationFailures ?? ["sync_blocked"] },
    );

    if ("error" in blocked) {
      return { ok: false, error: blocked.error };
    }

    return {
      batchId: blocked.id,
      acceptedRows: 0,
      rejectedRows: rawCount,
      matchedProfiles: 0,
      lowConfidenceMatches: 0,
      unmatchedUsernames: [],
      syncBlocked: true,
      datasetType,
      fieldsPreserved: ["all_previous_snapshots"],
    };
  }

  const created = await insertImportBatch(
    supabase,
    {
      imported_by_profile_id: importedByProfileId,
      source: "chrome_extension",
      source_page_url: payload.sourcePageUrl,
      detected_page_type: datasetType,
      relationship_tab: payload.relationshipTab ?? null,
      raw_rows_count: rawCount,
      status: "processing",
    },
    batchMeta,
  );

  if ("error" in created) {
    return { ok: false, error: created.error };
  }
  const batchRow = { id: created.id };

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
  const fieldsUpdated: string[] = [];
  const fieldsPreserved: string[] = [];
  let rosterDiff: ImportResult["rosterDiff"];
  const performanceUpserts: ReturnType<typeof monthlyPerformanceUpsertFromImportRow>[] = [];

  const importPeriod = resolveImportPeriodBounds({
    statPeriodLabel: payload.statPeriodLabel ?? null,
    statPeriodStart: payload.statPeriodStart ?? null,
    statPeriodEnd: payload.statPeriodEnd ?? null,
    statPeriodKind:
      payload.statPeriodKind === "weekly" || payload.statPeriodKind === "monthly"
        ? "monthly"
        : null,
    importedAt: new Date(),
  });

  const liveRowsForImport: LiveRowPayload[] =
    datasetType === "live_now"
      ? (payload.liveRows ??
        payload.rows.map((r) => ({
          tiktokUsername: r.tiktokUsername,
          displayName: r.displayName,
          avatarUrl: r.avatarUrl,
          streamTitle: undefined,
          viewerCountText: undefined,
          liveStartedText: r.liveDurationText,
          usernameConfidence: r.usernameConfidence,
          usernameSource: r.usernameSource,
        })))
      : (payload.liveRows ?? []);

  try {
    if (datasetType === "live_now") {
      fieldsUpdated.push("live_snapshots");
      for (const live of liveRowsForImport) {
        const inserted = await insertLiveSnapshotRow({
          supabase,
          batchId,
          payload,
          live,
          maps,
          importedByProfileId,
        });
        if (inserted.ok) {
          acceptedRows += 1;
          liveRowsAccepted += 1;
          const account = accountUsernameMatch(
            unmatchedUsernames,
            inserted.canonical ?? "",
            inserted.profileId,
            inserted.lowConfidence ? "low" : "high",
          );
          if (account.matched) matchedProfiles += 1;
          if (account.lowConfidence) lowConfidenceMatches += 1;
        } else {
          rejectedRows += 1;
        }
      }
      fieldsPreserved.push("member_stats", "performance_stats", "roster_entries");
    } else if (datasetType === "creator_roster") {
      const roster = await insertRosterEntries({
        supabase,
        batchId,
        rows: payload.rows
          .map((r) => {
            const cleaned =
              cleanCreatorNetworkUsername(r.tiktokUsername) ??
              cleanCreatorNetworkUsername(r.tiktokUsernameRaw);
            if (!cleaned) return null;
            return {
              tiktokUsername: cleaned,
              tiktokUsernameRaw: r.tiktokUsernameRaw,
              displayName: r.displayName,
              avatarUrl: r.avatarUrl,
              tiktokCreatorId: r.tiktokCreatorId,
              usernameConfidence: r.usernameConfidence,
              usernameSource: r.usernameSource,
              inviteStatus: r.inviteStatus,
              creatorNetworkStatus: r.creatorNetworkStatus ?? payload.relationshipTab,
            };
          })
          .filter((r): r is NonNullable<typeof r> => Boolean(r)),
        maps,
        importedByProfileId,
        sourcePageUrl: payload.sourcePageUrl,
      });
      acceptedRows = roster.accepted;
      rejectedRows = roster.rejected + (payload.rows.length - roster.accepted - roster.rejected);
      matchedProfiles = roster.matchedProfiles;
      lowConfidenceMatches = roster.lowConfidenceMatches;
      for (const u of roster.unmatchedUsernames) unmatchedUsernames.add(u);
      rosterDiff = roster.diff;
      fieldsUpdated.push("roster_entries");
      fieldsPreserved.push(
        "member_stats_hours",
        "member_stats_days",
        "member_stats_diamonds",
        "performance_stats",
      );
    } else if (datasetType === "activity_incentive") {
      fieldsUpdated.push("member_stats", "performance_stats");
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

        const diamonds = rowDiamonds(row);
        if (diamonds === null && row.diamondsEarned === undefined && row.coinsEarned === undefined) {
          // Allow rows with missing diamonds only when explicitly marked missing — still reject
          // chart-misread null from parsePlausible when values were provided but invalid.
          const hasAnyMetric =
            rowHours(row) !== null || rowDays(row) !== null || row.activenessLevel;
          if (!hasAnyMetric) {
            rejectedRows += 1;
            continue;
          }
        } else if (diamonds === null && (row.diamondsEarned !== undefined || row.coinsEarned !== undefined)) {
          rejectedRows += 1;
          continue;
        }

        const profileId = matchProfileId(maps, cleaned);
        const account = accountUsernameMatch(
          unmatchedUsernames,
          canonical,
          profileId,
          row.usernameConfidence,
        );
        if (account.matched) matchedProfiles += 1;
        if (account.lowConfidence) lowConfidenceMatches += 1;

        const hours = rowHours(row);
        const days = rowDays(row);
        const engagements = resolveOptionalMetric(row.engagementsField, row.engagements);
        const liveDurationSeconds =
          row.liveDurationSeconds === undefined || row.liveDurationSeconds === null
            ? null
            : Math.max(0, Math.round(row.liveDurationSeconds));

        const statInsert = {
          batch_id: batchId,
          profile_id: profileId,
          tiktok_username: canonical,
          tiktok_username_raw: usernameRaw ?? null,
          tiktok_display_name: row.displayName ?? null,
          username_confidence: normalizeMatchConfidence(row.usernameConfidence),
          username_source: row.usernameSource ?? null,
          avatar_url: row.avatarUrl ?? null,
          creator_network_status: row.creatorNetworkStatus ?? payload.relationshipTab ?? null,
          coins_earned: diamonds,
          diamonds_earned: diamonds,
          engagements,
          days_streamed: days,
          hours_streamed: hours,
          activeness_level: normalizeActiveness(row.activenessLevel),
          live_duration_seconds: liveDurationSeconds,
          invite_status: row.inviteStatus ?? null,
          violation_status: row.violationStatus ?? null,
          risk_flag: row.riskFlag ?? null,
          relationship_reason: row.relationshipReason ?? null,
          relationship_request_date: row.relationshipRequestDate ?? null,
          dataset_type: datasetType,
          stat_period_label: payload.statPeriodLabel ?? null,
          stat_period_start: importPeriod.periodStart,
          stat_period_end: importPeriod.periodEnd,
          source_page_url: payload.sourcePageUrl,
          imported_by_profile_id: importedByProfileId,
        };

        let { error } = await supabase.from("creator_network_member_stats").insert(statInsert);
        // Pre-migration DBs reject null metrics / unknown dataset_type — retry with legacy shape.
        if (error && (isMissingColumnError(error.message) || /null value|not-null/i.test(error.message))) {
          const { dataset_type: _dt, ...withoutDatasetType } = statInsert;
          const legacyInsert = {
            ...withoutDatasetType,
            coins_earned: diamonds ?? 0,
            diamonds_earned: diamonds ?? 0,
            engagements: engagements ?? 0,
            days_streamed: days ?? 0,
            hours_streamed: hours ?? 0,
            live_duration_seconds: liveDurationSeconds ?? 0,
          };
          ({ error } = await supabase.from("creator_network_member_stats").insert(legacyInsert));
        }

        if (error) {
          rejectedRows += 1;
        } else {
          acceptedRows += 1;
          if (profileId && importPeriod.periodStart && importPeriod.periodEnd) {
            performanceUpserts.push(
              monthlyPerformanceUpsertFromImportRow(
                profileId,
                {
                  ...row,
                  diamondsEarned: diamonds ?? undefined,
                  coinsEarned: diamonds ?? undefined,
                  hoursStreamed: hours ?? undefined,
                  daysStreamed: days ?? undefined,
                },
                importPeriod.periodStart,
                importPeriod.periodEnd,
              ),
            );
          }
        }
      }

      for (const live of liveRowsForImport) {
        const inserted = await insertLiveSnapshotRow({
          supabase,
          batchId,
          payload,
          live,
          maps,
          importedByProfileId,
        });
        if (inserted.ok) {
          acceptedRows += 1;
          liveRowsAccepted += 1;
          const account = accountUsernameMatch(
            unmatchedUsernames,
            inserted.canonical ?? "",
            inserted.profileId,
            inserted.lowConfidence ? "low" : "high",
          );
          if (account.matched) matchedProfiles += 1;
          if (account.lowConfidence) lowConfidenceMatches += 1;
        } else {
          rejectedRows += 1;
        }
      }
      fieldsPreserved.push("rank_up_stats", "roster_entries");
    } else if (datasetType === "rank_up_incentive") {
      fieldsUpdated.push("rank_up_stats");
      fieldsPreserved.push(
        "member_stats_hours",
        "member_stats_days",
        "member_stats_diamonds",
        "performance_stats",
      );
      for (const row of payload.rows) {
        const cleaned =
          cleanCreatorNetworkUsername(row.tiktokUsername) ??
          cleanCreatorNetworkUsername(row.tiktokUsernameRaw);
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
        const account = accountUsernameMatch(
          unmatchedUsernames,
          canonical,
          profileId,
          row.usernameConfidence,
        );
        if (account.matched) matchedProfiles += 1;
        if (account.lowConfidence) lowConfidenceMatches += 1;

        const { error } = await supabase.from("creator_network_rank_up_stats").insert({
          batch_id: batchId,
          profile_id: profileId,
          tiktok_username: canonical,
          tiktok_username_raw: row.tiktokUsernameRaw ?? null,
          tiktok_display_name: row.displayName ?? null,
          avatar_url: row.avatarUrl ?? null,
          tier_current: row.tierCurrent ?? null,
          tier_previous: row.tierPrevious ?? null,
          rank_up_status: row.rankUpStatus ?? null,
          maintain_tier_status: row.maintainTierStatus ?? null,
          diamonds_earned: rowDiamonds(row),
          days_streamed: rowDays(row),
          hours_streamed: rowHours(row),
          estimated_contribution: row.estimatedContribution ?? null,
          username_confidence: normalizeMatchConfidence(row.usernameConfidence),
          source_page_url: payload.sourcePageUrl,
          imported_by_profile_id: importedByProfileId,
          stat_period_start: importPeriod.periodStart,
          stat_period_end: importPeriod.periodEnd,
        });
        if (error) rejectedRows += 1;
        else acceptedRows += 1;
      }
    } else if (datasetType === "incremental_incentive") {
      fieldsUpdated.push("incremental_stats");
      fieldsPreserved.push("member_stats", "performance_stats", "rank_up_stats");
      for (const row of payload.rows) {
        const cleaned =
          cleanCreatorNetworkUsername(row.tiktokUsername) ??
          cleanCreatorNetworkUsername(row.tiktokUsernameRaw);
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
        const account = accountUsernameMatch(
          unmatchedUsernames,
          canonical,
          profileId,
          row.usernameConfidence,
        );
        if (account.matched) matchedProfiles += 1;
        if (account.lowConfidence) lowConfidenceMatches += 1;

        const { error } = await supabase.from("creator_network_incremental_stats").insert({
          batch_id: batchId,
          profile_id: profileId,
          tiktok_username: canonical,
          tiktok_display_name: row.displayName ?? null,
          avatar_url: row.avatarUrl ?? null,
          diamonds_earned: rowDiamonds(row),
          estimated_contribution: row.estimatedContribution ?? null,
          username_confidence: normalizeMatchConfidence(row.usernameConfidence),
          source_page_url: payload.sourcePageUrl,
          imported_by_profile_id: importedByProfileId,
          stat_period_start: importPeriod.periodStart,
          stat_period_end: importPeriod.periodEnd,
        });
        if (error) rejectedRows += 1;
        else acceptedRows += 1;
      }
    } else {
      // workspace_metrics / unknown — never overwrite stats
      rejectedRows += payload.rows.length;
      fieldsPreserved.push("all_previous_snapshots");
      await failBatch(
        supabase,
        batchId,
        `Dataset type "${datasetType}" is preview-only and cannot sync.`,
      );
      return {
        batchId,
        acceptedRows: 0,
        rejectedRows,
        matchedProfiles: 0,
        lowConfidenceMatches: 0,
        unmatchedUsernames: [],
        syncBlocked: true,
        datasetType,
        fieldsPreserved,
      };
    }

    let performanceStatsWarning: string | undefined;

    if (datasetType === "activity_incentive" && performanceUpserts.length > 0) {
      const { error: perfErr } = await upsertMonthlyPerformanceStatsFromImport(
        supabase,
        performanceUpserts,
      );
      if (perfErr) {
        performanceStatsWarning =
          perfErr.includes("creator_performance_stats")
            ? "Import saved, but rankings table is missing. Run supabase/apply-creator-performance-stats-now.sql in Supabase SQL Editor, then sync again."
            : `Import saved, but rankings update failed: ${perfErr}`;
      }
    }

    const completeUpdate = {
      accepted_rows_count: acceptedRows,
      rejected_rows_count: rejectedRows,
      status: "completed" as const,
      completed_at: new Date().toISOString(),
      roster_diff_preview: rosterDiff ?? null,
      fields_updated: fieldsUpdated,
      fields_preserved: fieldsPreserved,
    };
    const { error: completeErr } = await supabase
      .from("creator_network_import_batches")
      .update(completeUpdate)
      .eq("id", batchId);
    if (completeErr && isMissingColumnError(completeErr.message)) {
      await supabase
        .from("creator_network_import_batches")
        .update({
          accepted_rows_count: acceptedRows,
          rejected_rows_count: rejectedRows,
          status: "completed",
          completed_at: new Date().toISOString(),
        })
        .eq("id", batchId);
    }

    return {
      batchId,
      acceptedRows,
      rejectedRows,
      matchedProfiles,
      lowConfidenceMatches,
      unmatchedUsernames: [...unmatchedUsernames].filter(Boolean),
      liveRowsAccepted: liveRowsAccepted > 0 ? liveRowsAccepted : undefined,
      performanceStatsWarning,
      datasetType,
      rosterDiff,
      fieldsUpdated,
      fieldsPreserved,
    };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Import failed.";
    await failBatch(supabase, batchId, msg);
    return { ok: false, error: msg };
  }
}

async function insertLiveSnapshotRow(args: {
  supabase: Awaited<ReturnType<typeof createClient>>;
  batchId: string;
  payload: ImportPayload;
  live: LiveRowPayload;
  maps: Awaited<ReturnType<typeof buildProfileMatchMaps>>["maps"];
  importedByProfileId: string;
}): Promise<{
  ok: boolean;
  profileId?: string | null;
  canonical?: string;
  lowConfidence?: boolean;
}> {
  const { supabase, batchId, payload, live, maps, importedByProfileId } = args;
  const username = live.tiktokUsername?.trim();
  if (!username) return { ok: false };

  const canonical = resolveCanonicalHandle(username);
  if (
    isExcludedNetworkHandle(canonical) ||
    isInvalidLiveStreamHandle(canonical) ||
    isSuspiciousLiveHandle(canonical)
  ) {
    return { ok: false };
  }

  const profileId = matchProfileId(maps, username);
  if (!profileId) return { ok: false, canonical };

  const lowConfidence = normalizeMatchConfidence(live.usernameConfidence) === "low";

  const { error } = await supabase.from("creator_network_live_snapshots").insert({
    batch_id: batchId,
    profile_id: profileId,
    tiktok_username: canonical,
    tiktok_display_name: live.displayName ?? null,
    username_confidence: normalizeMatchConfidence(live.usernameConfidence),
    username_source: live.usernameSource ?? null,
    avatar_url: live.avatarUrl ?? null,
    stream_title: live.streamTitle ?? null,
    viewer_count_text: live.viewerCountText ?? null,
    live_started_text: live.liveStartedText ?? null,
    live_badge_detected: live.liveBadgeDetected === true,
    source_page_url: payload.sourcePageUrl,
    imported_by_profile_id: importedByProfileId,
  });

  if (error) return { ok: false, canonical };
  return { ok: true, profileId, canonical, lowConfidence };
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

export { resolveCanonicalHandle as normalizeTikTokUsername };
