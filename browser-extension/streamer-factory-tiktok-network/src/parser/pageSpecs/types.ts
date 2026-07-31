import type { MetricField } from "../metricField";
import type { ParsedCreatorRow, ParsedLiveRow } from "../types";

export const DATASET_TYPES = [
  "activity_incentive",
  "rank_up_incentive",
  "incremental_incentive",
  "creator_roster",
  "live_now",
  "workspace_metrics",
  "unknown",
] as const;

export type DatasetType = (typeof DATASET_TYPES)[number];

export type SyncMode = "stats" | "roster" | "live" | "preview_only";

export type CreatorCountBehavior = "expect_network_size" | "expect_live_subset" | "any" | "none";

export type PageParseContext = {
  url: string;
  doc: Document;
  relationshipTab?: string;
  headersFound: string[];
};

export type PageParseResult = {
  rows: ParsedCreatorRow[];
  liveRows: ParsedLiveRow[];
  headersFound: string[];
  metricsAvailable: string[];
};

export type PageSpec = {
  id: DatasetType;
  displayName: string;
  /** Path substrings / regexes (pathname lowercased). */
  pathPatterns: RegExp[];
  titlePatterns: RegExp[];
  bodyPatterns: RegExp[];
  requiredHeadings: RegExp[];
  optionalHeadings: RegExp[];
  uniqueBodyText: RegExp[];
  syncEnabled: boolean;
  previewOnly: boolean;
  syncMode: SyncMode;
  minConfidence: number;
  expectedMinColumns: number;
  creatorCountBehavior: CreatorCountBehavior;
  supportedMetrics: string[];
  parserVersion: string;
  parse: (ctx: PageParseContext) => PageParseResult;
};

export type PageDetectionResult = {
  datasetType: DatasetType;
  /** Legacy alias for older popup code. */
  detectedPageType: DatasetType;
  displayName: string;
  confidence: number;
  matchedSignals: string[];
  missingSignals: string[];
  parserVersion: string;
  syncEnabled: boolean;
  previewOnly: boolean;
  relationshipTab?: string;
  statPeriodLabel?: string;
  statPeriodKind?: "monthly";
  statPeriodStart?: string;
  statPeriodEnd?: string;
  headersFound: string[];
};

export type ValidationIssue = {
  severity: "blocking" | "warning";
  code: string;
  message: string;
};

export type CaptureValidation = {
  ok: boolean;
  syncSafe: boolean;
  issues: ValidationIssue[];
  blocking: string[];
  warnings: string[];
};

/** Re-export metric helper type for rows. */
export type { MetricField };
