import type { MetricField } from "./metricField";
import type { DatasetType } from "./pageSpecs/types";
import type { CaptureValidation } from "./pageSpecs/types";

/** Canonical page / dataset types (Phase 1A). */
export type DetectedPageType = DatasetType;

export type ParsedCreatorRow = {
  tiktokUsername?: string;
  /** Visible Backstage text before badge cleanup (admin review). */
  tiktokUsernameRaw?: string;
  usernameConfidence?: "high" | "medium" | "low";
  usernameSource?: "username_column" | "at_handle" | "handle_pattern" | "display_name_inferred";
  displayName?: string;
  avatarUrl?: string;
  tiktokCreatorId?: string;
  coinsEarned?: number;
  diamondsEarned?: number;
  engagements?: number;
  daysStreamed?: number;
  hoursStreamed?: number;
  coinsEarnedField?: MetricField<number>;
  diamondsEarnedField?: MetricField<number>;
  engagementsField?: MetricField<number>;
  daysStreamedField?: MetricField<number>;
  hoursStreamedField?: MetricField<number>;
  liveDurationText?: string;
  liveDurationSeconds?: number;
  activenessLevel?: string;
  inviteStatus?: string;
  creatorNetworkStatus?: string;
  violationStatus?: string;
  riskFlag?: string;
  relationshipReason?: string;
  relationshipRequestDate?: string;
  tierCurrent?: string;
  tierPrevious?: string;
  rankUpStatus?: string;
  maintainTierStatus?: string;
  estimatedContribution?: string;
  rawTextPreview?: string;
};

export type ParsedLiveRow = {
  tiktokUsername?: string;
  usernameConfidence?: "high" | "medium" | "low";
  usernameSource?: "username_column" | "at_handle" | "handle_pattern" | "display_name_inferred";
  displayName?: string;
  avatarUrl?: string;
  streamTitle?: string;
  viewerCountText?: string;
  liveStartedText?: string;
  liveBadgeDetected?: boolean;
  rawTextPreview?: string;
};

export type LiveParseDebug = {
  documentsScanned: number;
  bodyChars: number;
  atTruncatedInBody: number;
  creatorIdMentions: number;
  titleWithHandle: number;
  bodySnippet: string;
};

export type PageSnapshot = {
  sourcePageUrl: string;
  detectedPageType: DetectedPageType;
  datasetType: DetectedPageType;
  displayName: string;
  confidence: number;
  matchedSignals: string[];
  missingSignals: string[];
  parserVersion: string;
  syncEnabled: boolean;
  previewOnly: boolean;
  relationshipTab?: string;
  statPeriodLabel?: string;
  statPeriodStart?: string;
  statPeriodEnd?: string;
  headersFound: string[];
  metricsAvailable: string[];
  rows: ParsedCreatorRow[];
  liveRows: ParsedLiveRow[];
  /** Present when live_now returns 0 rows — helps diagnose DOM vs parser. */
  liveParseDebug?: LiveParseDebug;
  validation?: CaptureValidation;
};

export type SyncPayload = {
  sourcePageUrl: string;
  datasetType: string;
  detectedPageType: string;
  relationshipTab?: string;
  statPeriodLabel?: string;
  statPeriodStart?: string;
  statPeriodEnd?: string;
  rows: Omit<ParsedCreatorRow, "rawTextPreview">[];
  liveRows?: Omit<ParsedLiveRow, "rawTextPreview">[];
  parserVersion: string;
  extensionVersion: string;
  confidence: number;
  matchedSignals: string[];
  missingSignals: string[];
  validationWarnings: string[];
  validationFailures: string[];
  capturedAt: string;
  syncBlocked?: boolean;
};
