import { getPageSpec, SAFE_CONFIDENCE_THRESHOLD } from "./pageSpecs/registry";
import type { CaptureValidation, PageDetectionResult, ValidationIssue } from "./pageSpecs/types";
import type { PageSnapshot } from "./types";
import { normalizeTikTokUsername } from "./username";

const LAST_SYNC_KEY = "sf_last_successful_sync_by_page";

export async function getLastSuccessfulSync(datasetType: string): Promise<string | null> {
  try {
    const stored = await chrome.storage.local.get(LAST_SYNC_KEY);
    const map = (stored[LAST_SYNC_KEY] ?? {}) as Record<string, string>;
    return map[datasetType] ?? null;
  } catch {
    return null;
  }
}

export async function recordSuccessfulSync(datasetType: string): Promise<void> {
  try {
    const stored = await chrome.storage.local.get(LAST_SYNC_KEY);
    const map = { ...((stored[LAST_SYNC_KEY] ?? {}) as Record<string, string>) };
    map[datasetType] = new Date().toISOString();
    await chrome.storage.local.set({ [LAST_SYNC_KEY]: map });
  } catch {
    /* ignore */
  }
}

/**
 * Pre-upload validation. Blocking issues disable Sync; warnings are informational.
 */
export function validateCapture(
  detection: PageDetectionResult,
  snapshot: PageSnapshot,
  opts?: { previousCreatorCount?: number | null },
): CaptureValidation {
  const issues: ValidationIssue[] = [];
  const spec = getPageSpec(detection.datasetType);
  const rowCount =
    detection.datasetType === "live_now" ? snapshot.liveRows.length : snapshot.rows.length;

  if (detection.datasetType === "unknown") {
    issues.push({
      severity: "blocking",
      code: "unknown_page",
      message: "Page identity unknown. Open a supported Backstage page.",
    });
  }

  if (detection.previewOnly || (spec && !spec.syncEnabled)) {
    issues.push({
      severity: "blocking",
      code: "preview_only",
      message: `${detection.displayName} is preview-only and cannot sync.`,
    });
  }

  if (detection.confidence < SAFE_CONFIDENCE_THRESHOLD) {
    issues.push({
      severity: "blocking",
      code: "low_confidence",
      message: `Page identity confidence ${(detection.confidence * 100).toFixed(0)}% is below the safe threshold. Sync blocked.`,
    });
  }

  if (detection.missingSignals.some((s) => s.startsWith("required_header:"))) {
    issues.push({
      severity: "blocking",
      code: "required_headers_missing",
      message: `Required columns missing: ${detection.missingSignals
        .filter((s) => s.startsWith("required_header:"))
        .join(", ")}`,
    });
  }

  if (detection.missingSignals.includes("looks_like_rank_up")) {
    issues.push({
      severity: "blocking",
      code: "ambiguous_activity_vs_rank",
      message: "Page looks like Rank-up Incentive, not Activeness. Sync blocked to protect rankings.",
    });
  }

  if (
    spec &&
    (spec.creatorCountBehavior === "expect_network_size" ||
      spec.creatorCountBehavior === "expect_live_subset") &&
    rowCount === 0
  ) {
    issues.push({
      severity: "blocking",
      code: "zero_rows",
      message: "Zero creator rows on a page expected to contain creators. Sync blocked.",
    });
  }

  const usernames = (
    detection.datasetType === "live_now" ? snapshot.liveRows : snapshot.rows
  ).map((r) => normalizeTikTokUsername(r.tiktokUsername));
  const seen = new Set<string>();
  const dupes = new Set<string>();
  for (const u of usernames) {
    if (!u) continue;
    if (seen.has(u)) dupes.add(u);
    seen.add(u);
  }
  if (dupes.size > 0) {
    issues.push({
      severity: "blocking",
      code: "duplicate_usernames",
      message: `Duplicate usernames: ${[...dupes].slice(0, 5).join(", ")}`,
    });
  }

  const malformed = usernames.filter((u) => !u || u.length < 2).length;
  if (malformed > 0 && malformed === usernames.length && rowCount > 0) {
    issues.push({
      severity: "blocking",
      code: "malformed_usernames",
      message: "All usernames failed to parse.",
    });
  } else if (malformed > 0) {
    issues.push({
      severity: "warning",
      code: "some_malformed_usernames",
      message: `${malformed} row(s) have malformed usernames and will be skipped.`,
    });
  }

  if (detection.datasetType === "activity_incentive" && rowCount > 0) {
    const withHours = snapshot.rows.filter((r) => r.hoursStreamed !== undefined).length;
    const missingRate = 1 - withHours / rowCount;
    if (missingRate > 0.25) {
      issues.push({
        severity: "blocking",
        code: "required_metrics_missing",
        message: `More than 25% of rows are missing LIVE duration (${(missingRate * 100).toFixed(0)}%). Sync blocked.`,
      });
    }

    const impossible = snapshot.rows.filter(
      (r) =>
        (r.daysStreamed !== undefined && (r.daysStreamed < 0 || r.daysStreamed > 31)) ||
        (r.hoursStreamed !== undefined && (r.hoursStreamed < 0 || r.hoursStreamed > 744)),
    );
    if (impossible.length > 0) {
      issues.push({
        severity: "blocking",
        code: "impossible_values",
        message: `${impossible.length} row(s) have impossible day/hour values.`,
      });
    }
  }

  if (
    opts?.previousCreatorCount &&
    opts.previousCreatorCount > 0 &&
    rowCount > 0 &&
    spec?.creatorCountBehavior === "expect_network_size"
  ) {
    const delta = Math.abs(rowCount - opts.previousCreatorCount) / opts.previousCreatorCount;
    if (delta > 0.1) {
      issues.push({
        severity: "warning",
        code: "creator_count_delta",
        message: `Creator count changed by more than 10% (${opts.previousCreatorCount} → ${rowCount}).`,
      });
    }
  }

  if (spec) {
    for (const heading of spec.optionalHeadings) {
      const found = detection.headersFound.some((h) => heading.test(h));
      if (!found) {
        issues.push({
          severity: "warning",
          code: "optional_column_missing",
          message: `Optional column not found: ${heading.source}`,
        });
      }
    }
  }

  const blocking = issues.filter((i) => i.severity === "blocking").map((i) => i.message);
  const warnings = issues.filter((i) => i.severity === "warning").map((i) => i.message);

  return {
    ok: blocking.length === 0,
    syncSafe: blocking.length === 0 && detection.syncEnabled,
    issues,
    blocking,
    warnings,
  };
}
