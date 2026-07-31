import type { ActivenessLevel } from "@/lib/rankings/types";
import type { DatasetType } from "@/lib/creator-network/dataset-types";
import type { MetricField } from "@/lib/creator-network/metric-field";
import type { RosterDiffPreview } from "@/lib/creator-network/roster-diff";

/** @deprecated Prefer DatasetType — kept for wire compatibility. */
export const DETECTED_PAGE_TYPES = [
  "manage_relationship",
  "creator_stats",
  "live_now",
  "unknown",
  "activity_incentive",
  "rank_up_incentive",
  "incremental_incentive",
  "creator_roster",
  "workspace_metrics",
] as const;

export type DetectedPageType = (typeof DETECTED_PAGE_TYPES)[number];

export type ImportRowPayload = {
  tiktokUsername?: string;
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
  /** Explicit metric fields (preferred over bare numbers). */
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
  /** Rank-up incentive fields */
  tierCurrent?: string;
  tierPrevious?: string;
  rankUpStatus?: string;
  maintainTierStatus?: string;
  estimatedContribution?: string;
};

export type LiveRowPayload = {
  tiktokUsername?: string;
  usernameConfidence?: "high" | "medium" | "low";
  usernameSource?: "username_column" | "at_handle" | "handle_pattern" | "display_name_inferred";
  displayName?: string;
  avatarUrl?: string;
  streamTitle?: string;
  viewerCountText?: string;
  liveStartedText?: string;
  liveBadgeDetected?: boolean;
};

export type ImportPayload = {
  sourcePageUrl: string;
  /** Canonical dataset type (preferred). */
  datasetType?: string;
  /** Legacy / display page type. */
  detectedPageType: string;
  relationshipTab?: string;
  statPeriodLabel?: string;
  statPeriodStart?: string;
  statPeriodEnd?: string;
  /** Extension always sends monthly; legacy payloads may still say weekly. */
  statPeriodKind?: "monthly" | "weekly";
  rows: ImportRowPayload[];
  liveRows?: LiveRowPayload[];
  parserVersion?: string;
  extensionVersion?: string;
  confidence?: number;
  matchedSignals?: string[];
  missingSignals?: string[];
  validationWarnings?: string[];
  validationFailures?: string[];
  capturedAt?: string;
  /** Client aborted — record batch, write nothing. */
  syncBlocked?: boolean;
};

export type ImportBatchRow = {
  id: string;
  imported_by_profile_id: string | null;
  source: string;
  source_page_url: string | null;
  detected_page_type: string | null;
  relationship_tab: string | null;
  raw_rows_count: number;
  accepted_rows_count: number;
  rejected_rows_count: number;
  status: string;
  error_message: string | null;
  created_at: string;
  completed_at: string | null;
  dataset_type?: string | null;
  parser_version?: string | null;
  extension_version?: string | null;
  confidence?: number | null;
  validation_warnings?: string[] | null;
  validation_failures?: string[] | null;
  matched_signals?: string[] | null;
  captured_at?: string | null;
  fields_updated?: string[] | null;
  fields_preserved?: string[] | null;
  roster_diff_preview?: RosterDiffPreview | null;
};

export type MemberStatRow = {
  id: string;
  batch_id: string | null;
  profile_id: string | null;
  tiktok_username: string | null;
  tiktok_username_raw: string | null;
  tiktok_display_name: string | null;
  username_confidence: "high" | "medium" | "low" | null;
  username_source: string | null;
  avatar_url: string | null;
  creator_network_status: string | null;
  coins_earned: number | null;
  diamonds_earned: number | null;
  engagements: number | null;
  days_streamed: number | null;
  hours_streamed: number | null;
  activeness_level: ActivenessLevel;
  live_duration_seconds: number | null;
  invite_status: string | null;
  violation_status: string | null;
  risk_flag: string | null;
  relationship_reason: string | null;
  relationship_request_date: string | null;
  stat_period_label: string | null;
  stat_period_start: string | null;
  stat_period_end: string | null;
  source_page_url: string | null;
  imported_by_profile_id: string | null;
  imported_at: string;
  created_at: string;
  updated_at: string;
  dataset_type?: string | null;
};

export type LiveSnapshotRow = {
  id: string;
  batch_id: string | null;
  profile_id: string | null;
  tiktok_username: string | null;
  tiktok_display_name: string | null;
  username_confidence: "high" | "medium" | "low" | null;
  username_source: string | null;
  avatar_url: string | null;
  stream_title: string | null;
  viewer_count_text: string | null;
  live_started_text: string | null;
  source_page_url: string | null;
  imported_at: string;
};

/** Admin-facing stat with matched profile display name. */
export type AdminMemberStatView = MemberStatRow & {
  matched_email: string | null;
  matched_profile_username: string | null;
};

export type MatchReviewSummary = {
  matchedProfiles: number;
  unmatchedProfiles: number;
  lowConfidenceMatches: number;
};

/** Member-safe stat (own profile or leaderboard-safe subset). */
export type MemberSafeStatView = {
  id: string;
  tiktok_username: string | null;
  tiktok_username_raw: string | null;
  tiktok_display_name: string | null;
  avatar_url: string | null;
  activeness_level: ActivenessLevel;
  days_streamed: number | null;
  hours_streamed: number | null;
  creator_network_status: string | null;
  invite_status: string | null;
  imported_at: string;
  /** Only populated when viewing own stats. */
  coins_earned?: number | null;
  diamonds_earned?: number | null;
  engagements?: number | null;
};

export type ImportResult = {
  batchId: string;
  acceptedRows: number;
  rejectedRows: number;
  matchedProfiles: number;
  lowConfidenceMatches: number;
  unmatchedUsernames: string[];
  liveRowsAccepted?: number;
  /** Rankings mirror failed (table missing) but import rows may have saved. */
  performanceStatsWarning?: string;
  datasetType?: DatasetType | string;
  syncBlocked?: boolean;
  rosterDiff?: RosterDiffPreview;
  fieldsUpdated?: string[];
  fieldsPreserved?: string[];
};
