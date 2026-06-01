export type DetectedPageType = "manage_relationship" | "creator_stats" | "live_now" | "unknown";

export type ParsedCreatorRow = {
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

export type PageSnapshot = {
  sourcePageUrl: string;
  detectedPageType: DetectedPageType;
  relationshipTab?: string;
  statPeriodLabel?: string;
  rows: ParsedCreatorRow[];
  liveRows: ParsedLiveRow[];
};

export type SyncPayload = {
  sourcePageUrl: string;
  detectedPageType: string;
  relationshipTab?: string;
  statPeriodLabel?: string;
  statPeriodStart?: string;
  statPeriodEnd?: string;
  rows: Omit<ParsedCreatorRow, "rawTextPreview">[];
  liveRows?: Omit<ParsedLiveRow, "rawTextPreview">[];
};
