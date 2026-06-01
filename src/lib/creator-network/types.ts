import type { ActivenessLevel } from "@/lib/rankings/types";

export const DETECTED_PAGE_TYPES = [
  "manage_relationship",
  "creator_stats",
  "live_now",
  "unknown",
] as const;

export type DetectedPageType = (typeof DETECTED_PAGE_TYPES)[number];

export type ImportRowPayload = {
  tiktokUsername?: string;
  usernameConfidence?: "high" | "medium" | "low";
  usernameSource?: "username_column" | "at_handle" | "handle_pattern" | "display_name_inferred";
  displayName?: string;
  avatarUrl?: string;
  coinsEarned?: number;
  diamondsEarned?: number;
  engagements?: number;
  daysStreamed?: number;
  hoursStreamed?: number;
  liveDurationText?: string;
  liveDurationSeconds?: number;
  activenessLevel?: string;
  inviteStatus?: string;
  creatorNetworkStatus?: string;
  violationStatus?: string;
  riskFlag?: string;
  relationshipReason?: string;
  relationshipRequestDate?: string;
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
  detectedPageType: string;
  relationshipTab?: string;
  statPeriodLabel?: string;
  statPeriodStart?: string;
  statPeriodEnd?: string;
  rows: ImportRowPayload[];
  liveRows?: LiveRowPayload[];
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
};

export type MemberStatRow = {
  id: string;
  batch_id: string | null;
  profile_id: string | null;
  tiktok_username: string | null;
  tiktok_display_name: string | null;
  username_confidence: "high" | "medium" | "low" | null;
  username_source: string | null;
  avatar_url: string | null;
  creator_network_status: string | null;
  coins_earned: number;
  diamonds_earned: number;
  engagements: number;
  days_streamed: number;
  hours_streamed: number;
  activeness_level: ActivenessLevel;
  live_duration_seconds: number;
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
  tiktok_display_name: string | null;
  avatar_url: string | null;
  activeness_level: ActivenessLevel;
  days_streamed: number;
  hours_streamed: number;
  creator_network_status: string | null;
  invite_status: string | null;
  imported_at: string;
  /** Only populated when viewing own stats. */
  coins_earned?: number;
  diamonds_earned?: number;
  engagements?: number;
};

export type ImportResult = {
  batchId: string;
  acceptedRows: number;
  rejectedRows: number;
  matchedProfiles: number;
  lowConfidenceMatches: number;
  unmatchedUsernames: string[];
  liveRowsAccepted?: number;
};
