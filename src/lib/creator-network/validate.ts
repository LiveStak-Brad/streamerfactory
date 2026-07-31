import { DATASET_TYPES, normalizeDatasetType, PARSER_VERSION } from "@/lib/creator-network/dataset-types";
import { coerceMetricField } from "@/lib/creator-network/metric-field";
import {
  DETECTED_PAGE_TYPES,
  type ImportPayload,
  type ImportRowPayload,
  type LiveRowPayload,
} from "./types";

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function optionalString(v: unknown): string | undefined {
  if (v === undefined || v === null) return undefined;
  if (typeof v !== "string") return undefined;
  const t = v.trim();
  return t.length > 0 ? t : undefined;
}

function optionalNumber(v: unknown): number | undefined {
  if (v === undefined || v === null) return undefined;
  if (typeof v === "number" && Number.isFinite(v)) return v;
  return undefined;
}

function optionalUsernameConfidence(v: unknown): "high" | "medium" | "low" | undefined {
  const s = optionalString(v);
  if (s === "high" || s === "medium" || s === "low") return s;
  return undefined;
}

function optionalUsernameSource(
  v: unknown,
): "username_column" | "at_handle" | "handle_pattern" | "display_name_inferred" | undefined {
  const s = optionalString(v);
  if (s === "username_column" || s === "at_handle" || s === "handle_pattern" || s === "display_name_inferred") {
    return s;
  }
  return undefined;
}

function optionalStringArray(v: unknown): string[] | undefined {
  if (!Array.isArray(v)) return undefined;
  return v.filter((x): x is string => typeof x === "string");
}

function parseRow(raw: unknown): ImportRowPayload | null {
  if (!isRecord(raw)) return null;
  return {
    tiktokUsername: optionalString(raw.tiktokUsername),
    tiktokUsernameRaw: optionalString(raw.tiktokUsernameRaw),
    usernameConfidence: optionalUsernameConfidence(raw.usernameConfidence),
    usernameSource: optionalUsernameSource(raw.usernameSource),
    displayName: optionalString(raw.displayName),
    avatarUrl: optionalString(raw.avatarUrl),
    tiktokCreatorId: optionalString(raw.tiktokCreatorId),
    coinsEarned: optionalNumber(raw.coinsEarned),
    diamondsEarned: optionalNumber(raw.diamondsEarned),
    engagements: optionalNumber(raw.engagements),
    daysStreamed: optionalNumber(raw.daysStreamed),
    hoursStreamed: optionalNumber(raw.hoursStreamed),
    coinsEarnedField: raw.coinsEarnedField !== undefined ? coerceMetricField(raw.coinsEarnedField) : undefined,
    diamondsEarnedField:
      raw.diamondsEarnedField !== undefined ? coerceMetricField(raw.diamondsEarnedField) : undefined,
    engagementsField:
      raw.engagementsField !== undefined ? coerceMetricField(raw.engagementsField) : undefined,
    daysStreamedField:
      raw.daysStreamedField !== undefined ? coerceMetricField(raw.daysStreamedField) : undefined,
    hoursStreamedField:
      raw.hoursStreamedField !== undefined ? coerceMetricField(raw.hoursStreamedField) : undefined,
    liveDurationText: optionalString(raw.liveDurationText),
    liveDurationSeconds: optionalNumber(raw.liveDurationSeconds),
    activenessLevel: optionalString(raw.activenessLevel),
    inviteStatus: optionalString(raw.inviteStatus),
    creatorNetworkStatus: optionalString(raw.creatorNetworkStatus),
    violationStatus: optionalString(raw.violationStatus),
    riskFlag: optionalString(raw.riskFlag),
    relationshipReason: optionalString(raw.relationshipReason),
    relationshipRequestDate: optionalString(raw.relationshipRequestDate),
    tierCurrent: optionalString(raw.tierCurrent),
    tierPrevious: optionalString(raw.tierPrevious),
    rankUpStatus: optionalString(raw.rankUpStatus),
    maintainTierStatus: optionalString(raw.maintainTierStatus),
    estimatedContribution: optionalString(raw.estimatedContribution),
  };
}

function parseLiveRow(raw: unknown): LiveRowPayload | null {
  if (!isRecord(raw)) return null;
  return {
    tiktokUsername: optionalString(raw.tiktokUsername),
    usernameConfidence: optionalUsernameConfidence(raw.usernameConfidence),
    usernameSource: optionalUsernameSource(raw.usernameSource),
    displayName: optionalString(raw.displayName),
    avatarUrl: optionalString(raw.avatarUrl),
    streamTitle: optionalString(raw.streamTitle),
    viewerCountText: optionalString(raw.viewerCountText),
    liveStartedText: optionalString(raw.liveStartedText),
    liveBadgeDetected: raw.liveBadgeDetected === true ? true : undefined,
  };
}

function isIsoDate(v: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(v);
}

export type ValidationResult =
  | { ok: true; data: ImportPayload }
  | { ok: false; error: string };

/**
 * Validate extension import payload shape + dataset coherence.
 * Semantic pre-upload gates run in the extension; server rejects mismatched types.
 */
export function validateImportPayload(body: unknown): ValidationResult {
  if (!isRecord(body)) return { ok: false, error: "Body must be an object." };

  const sourcePageUrl = optionalString(body.sourcePageUrl);
  if (!sourcePageUrl) return { ok: false, error: "sourcePageUrl is required." };

  const rawPageType =
    optionalString(body.datasetType) ?? optionalString(body.detectedPageType) ?? "unknown";
  const datasetType = normalizeDatasetType(rawPageType);

  const allowedLegacy = new Set<string>([...DETECTED_PAGE_TYPES, ...DATASET_TYPES]);
  if (!allowedLegacy.has(rawPageType) && datasetType === "unknown" && rawPageType !== "unknown") {
    return { ok: false, error: `Unsupported dataset type: ${rawPageType}` };
  }

  const rowsRaw = body.rows;
  if (!Array.isArray(rowsRaw)) return { ok: false, error: "rows must be an array." };

  const rows: ImportRowPayload[] = [];
  for (const r of rowsRaw) {
    const parsed = parseRow(r);
    if (parsed) rows.push(parsed);
  }

  let liveRows: LiveRowPayload[] | undefined;
  if (body.liveRows !== undefined) {
    if (!Array.isArray(body.liveRows)) return { ok: false, error: "liveRows must be an array." };
    liveRows = [];
    for (const r of body.liveRows) {
      const parsed = parseLiveRow(r);
      if (parsed) liveRows.push(parsed);
    }
  }

  const statPeriodStart = optionalString(body.statPeriodStart);
  const statPeriodEnd = optionalString(body.statPeriodEnd);
  if (statPeriodStart && !isIsoDate(statPeriodStart)) {
    return { ok: false, error: "statPeriodStart must be YYYY-MM-DD." };
  }
  if (statPeriodEnd && !isIsoDate(statPeriodEnd)) {
    return { ok: false, error: "statPeriodEnd must be YYYY-MM-DD." };
  }

  const kindRaw = optionalString(body.statPeriodKind);
  const statPeriodKind =
    kindRaw === "weekly" || kindRaw === "monthly" ? ("monthly" as const) : undefined;

  const syncBlocked = body.syncBlocked === true;

  if (!syncBlocked) {
    if (datasetType === "live_now") {
      const liveCount = (liveRows?.length ?? 0) + rows.length;
      if (liveCount === 0) {
        return { ok: false, error: "live_now dataset requires liveRows or rows." };
      }
    } else if (
      datasetType === "activity_incentive" ||
      datasetType === "rank_up_incentive" ||
      datasetType === "incremental_incentive" ||
      datasetType === "creator_roster"
    ) {
      if (rows.length === 0) {
        return { ok: false, error: `${datasetType} requires at least one creator row.` };
      }
    } else if (datasetType === "workspace_metrics" || datasetType === "unknown") {
      return {
        ok: false,
        error: `Dataset type "${datasetType}" is preview-only and cannot be imported.`,
      };
    }

    // Reject wrong field shapes for dataset types
    if (datasetType === "creator_roster") {
      const looksLikeStats = rows.some(
        (r) =>
          r.hoursStreamed !== undefined ||
          r.diamondsEarned !== undefined ||
          r.daysStreamed !== undefined,
      );
      // Soft: roster may include incidental numbers; do not hard-fail — stats are ignored on write.
      void looksLikeStats;
    }

    if (datasetType === "activity_incentive") {
      const rankOnly = rows.every(
        (r) =>
          (r.tierCurrent || r.rankUpStatus || r.maintainTierStatus) &&
          r.hoursStreamed === undefined &&
          r.diamondsEarned === undefined,
      );
      if (rankOnly && rows.length > 0) {
        return {
          ok: false,
          error:
            "Payload looks like rank_up_incentive but datasetType is activity_incentive. Refusing to overwrite Activeness fields.",
        };
      }
    }
  }

  const confidence = optionalNumber(body.confidence);

  return {
    ok: true,
    data: {
      sourcePageUrl,
      datasetType,
      detectedPageType: datasetType,
      relationshipTab: optionalString(body.relationshipTab),
      statPeriodLabel: optionalString(body.statPeriodLabel),
      statPeriodStart,
      statPeriodEnd,
      statPeriodKind,
      rows,
      liveRows,
      parserVersion: optionalString(body.parserVersion) ?? PARSER_VERSION,
      extensionVersion: optionalString(body.extensionVersion),
      confidence,
      matchedSignals: optionalStringArray(body.matchedSignals),
      missingSignals: optionalStringArray(body.missingSignals),
      validationWarnings: optionalStringArray(body.validationWarnings),
      validationFailures: optionalStringArray(body.validationFailures),
      capturedAt: optionalString(body.capturedAt),
      syncBlocked,
    },
  };
}
