import { DETECTED_PAGE_TYPES, type ImportPayload, type ImportRowPayload, type LiveRowPayload } from "./types";

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

function parseRow(raw: unknown): ImportRowPayload | null {
  if (!isRecord(raw)) return null;
  return {
    tiktokUsername: optionalString(raw.tiktokUsername),
    usernameConfidence: optionalUsernameConfidence(raw.usernameConfidence),
    usernameSource: optionalUsernameSource(raw.usernameSource),
    displayName: optionalString(raw.displayName),
    avatarUrl: optionalString(raw.avatarUrl),
    coinsEarned: optionalNumber(raw.coinsEarned),
    diamondsEarned: optionalNumber(raw.diamondsEarned),
    engagements: optionalNumber(raw.engagements),
    daysStreamed: optionalNumber(raw.daysStreamed),
    hoursStreamed: optionalNumber(raw.hoursStreamed),
    liveDurationText: optionalString(raw.liveDurationText),
    liveDurationSeconds: optionalNumber(raw.liveDurationSeconds),
    activenessLevel: optionalString(raw.activenessLevel),
    inviteStatus: optionalString(raw.inviteStatus),
    creatorNetworkStatus: optionalString(raw.creatorNetworkStatus),
    violationStatus: optionalString(raw.violationStatus),
    riskFlag: optionalString(raw.riskFlag),
    relationshipReason: optionalString(raw.relationshipReason),
    relationshipRequestDate: optionalString(raw.relationshipRequestDate),
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

/** Lightweight payload validation (zod-free to match repo deps). */
export function validateImportPayload(body: unknown): ValidationResult {
  if (!isRecord(body)) {
    return { ok: false, error: "Body must be a JSON object." };
  }

  const sourcePageUrl = optionalString(body.sourcePageUrl);
  if (!sourcePageUrl) {
    return { ok: false, error: "sourcePageUrl is required." };
  }

  const detectedPageType = optionalString(body.detectedPageType) ?? "unknown";
  if (!DETECTED_PAGE_TYPES.includes(detectedPageType as (typeof DETECTED_PAGE_TYPES)[number])) {
    return { ok: false, error: `detectedPageType must be one of: ${DETECTED_PAGE_TYPES.join(", ")}.` };
  }

  if (!Array.isArray(body.rows)) {
    return { ok: false, error: "rows must be an array." };
  }

  const rows: ImportRowPayload[] = [];
  for (const raw of body.rows) {
    const row = parseRow(raw);
    if (row) rows.push(row);
  }

  let liveRows: LiveRowPayload[] | undefined;
  if (body.liveRows !== undefined) {
    if (!Array.isArray(body.liveRows)) {
      return { ok: false, error: "liveRows must be an array when provided." };
    }
    liveRows = [];
    for (const raw of body.liveRows) {
      const row = parseLiveRow(raw);
      if (row) liveRows.push(row);
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

  if (detectedPageType === "live_now" && rows.length === 0 && (!liveRows || liveRows.length === 0)) {
    return { ok: false, error: "live_now imports require liveRows or rows." };
  }

  if (detectedPageType !== "live_now" && rows.length === 0) {
    return { ok: false, error: "At least one row is required." };
  }

  return {
    ok: true,
    data: {
      sourcePageUrl,
      detectedPageType,
      relationshipTab: optionalString(body.relationshipTab),
      statPeriodLabel: optionalString(body.statPeriodLabel),
      statPeriodStart,
      statPeriodEnd,
      rows,
      liveRows,
    },
  };
}
