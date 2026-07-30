/**
 * Growth foundation types — seasons, events, requirements, snapshots.
 * progress_events is the canonical immutable stream; everything else is a projection.
 */

export const PROGRESS_EVENT_TYPES = [
  "lesson_started",
  "lesson_completed",
  "streameru_live_mission_completed",
  "module_completed",
  "battle_joined",
  "battle_completed",
  "guide_read",
  "guide_completed",
  "profile_updated",
  "creator_joined",
  "tiktok_connected",
  "ranking_reached",
  "onboarding_task_completed",
  "onboarding_completed",
  "mission_assigned",
  "mission_completed",
  "mission_failed",
  "achievement_unlocked",
  "streak_incremented",
  "streak_broken",
  "daily_login",
  "rankings_viewed",
  "referral_accepted",
  "reputation_earned",
  "title_unlocked",
] as const;

export type ProgressEventType = (typeof PROGRESS_EVENT_TYPES)[number];

export const REQUIREMENT_TYPES = [
  "complete_lesson",
  "complete_module",
  "complete_streameru_live_mission",
  "complete_any_streameru_live_mission",
  "continue_training",
  "course_completion_threshold",
  "complete_onboarding_task",
  "complete_onboarding",
  "connect_tiktok",
  "update_profile",
  "upload_creator_photo",
  "join_battle",
  "view_rankings",
  "read_guide",
  "view_announcement",
  "daily_login",
  "complete_mission",
  "maintain_streak",
  "reach_rank",
  "referral_accepted",
] as const;

export type RequirementType = (typeof REQUIREMENT_TYPES)[number];

export type GrowthRequirement = {
  type: RequirementType;
  params?: Record<string, unknown>;
  /** When true, only count events stamped with the evaluation season. */
  seasonScoped?: boolean;
  /** AND composition (v1). */
  all?: GrowthRequirement[];
  /** OR composition (v1). */
  anyOf?: GrowthRequirement[];
};

export type MissionCategory =
  | "training"
  | "community"
  | "battles"
  | "profile"
  | "creator_growth"
  | "platform";

export type MissionCadence = "daily" | "weekly" | "once" | "seasonal";

export type MissionStatus = "active" | "completed" | "failed" | "expired";

export type SeasonStatus = "draft" | "active" | "ended" | "archived";

export type SeasonRow = {
  id: string;
  key: string;
  name: string;
  start_at: string;
  end_at: string | null;
  status: SeasonStatus;
  theme: Record<string, unknown>;
  banner_image: string | null;
  sort_order: number;
};

export type ProgressEventRow = {
  id: string;
  member_id: string;
  event_type: string;
  subject_key: string | null;
  season_id: string | null;
  metadata: Record<string, unknown>;
  idempotency_key: string;
  source_event_id: string | null;
  created_at: string;
};

/** Event-derived state for pure requirement evaluation (no DB). */
export type ProgressSnapshot = {
  events: ProgressEventRow[];
  seasonId: string | null;
  profile: {
    hasTiktokConnection: boolean;
    hasTiktokUsername: boolean;
    hasTimezone: boolean;
    hasAvatar: boolean;
    onboardingCompleted: boolean;
  };
  streaks: Record<string, { current: number; longest: number }>;
  completedOnboardingTaskKeys: string[];
  completedMissionTemplateKeys: string[];
  streameruMissionCompletions: Array<{ lesson_slug: string; mission_id: string }>;
  latestRank: number | null;
  referralsAccepted: number;
};

export type RequirementResult = {
  satisfied: boolean;
  progress: number;
  target: number;
  detail?: string;
};

export type CreatorSnapshot = {
  member_id: string;
  season: { id: string; key: string; name: string } | null;
  onboarding: {
    completed: boolean;
    percent: number;
    incomplete_task_keys: string[];
  };
  lessons_completed: string[];
  modules_completed: string[];
  missions_completed: number;
  missions_failed: number;
  streaks: Record<
    string,
    { current: number; longest: number; last_completed: string | null }
  >;
  battle_history: {
    joined: number;
    completed: number;
    recent_event_ids: string[];
  };
  ranking_history: { peaks: number[]; latest_rank: number | null };
  strongest_categories: string[];
  weakest_categories: string[];
  inactive_days: number;
  last_activity: string | null;
  profile_completion: number;
  referrals: { accepted: number; pending: number; code: string | null };
  reputation: { lifetime: number; season: number; titles: string[] };
  recent_events: Array<{ type: string; subject_key: string | null; at: string }>;
};

export type CreatorProgressSummary = {
  greetingName: string;
  season: SeasonRow | null;
  snapshot: CreatorSnapshot;
  todayMissions: Array<{
    id: string;
    key: string;
    title: string;
    description: string | null;
    category: MissionCategory;
    status: MissionStatus;
    href: string | null;
  }>;
  newestAchievement: {
    key: string;
    name: string;
    description: string | null;
    icon: string | null;
    unlocked_at: string;
  } | null;
  nextAction: { label: string; href: string; reason: string };
  unreadNotifications: number;
  recentActivity: Array<{
    id: string;
    summary: string;
    event_type: string;
    created_at: string;
  }>;
  referralCode: string | null;
};

export function isProgressEventType(value: string): value is ProgressEventType {
  return (PROGRESS_EVENT_TYPES as readonly string[]).includes(value);
}

export function isRequirementType(value: string): value is RequirementType {
  return (REQUIREMENT_TYPES as readonly string[]).includes(value);
}

export function parseRequirement(raw: unknown): GrowthRequirement | null {
  if (!raw || typeof raw !== "object") return null;
  const obj = raw as Record<string, unknown>;
  if (typeof obj.type === "string" && isRequirementType(obj.type)) {
    return {
      type: obj.type,
      params: (obj.params as Record<string, unknown> | undefined) ?? undefined,
      seasonScoped: Boolean(obj.seasonScoped),
      all: Array.isArray(obj.all)
        ? (obj.all.map(parseRequirement).filter(Boolean) as GrowthRequirement[])
        : undefined,
      anyOf: Array.isArray(obj.anyOf)
        ? (obj.anyOf.map(parseRequirement).filter(Boolean) as GrowthRequirement[])
        : undefined,
    };
  }
  if (Array.isArray(obj.all)) {
    return {
      type: "daily_login",
      all: obj.all.map(parseRequirement).filter(Boolean) as GrowthRequirement[],
    };
  }
  return null;
}
