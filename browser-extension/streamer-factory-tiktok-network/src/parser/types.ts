export type DetectedPageType = "manage_relationship" | "creator_stats" | "live_now" | "unknown";

export type ParsedCreatorRow = {
  tiktokUsername?: string;
  /** Visible Backstage text before badge cleanup (admin review). */
  tiktokUsernameRaw?: string;
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
  relationshipTab?: string;
  statPeriodLabel?: string;
  rows: ParsedCreatorRow[];
  liveRows: ParsedLiveRow[];
  /** Present when live_now returns 0 rows — helps diagnose DOM vs parser. */
  liveParseDebug?: LiveParseDebug;
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
