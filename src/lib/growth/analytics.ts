/**
 * Growth / engagement analytics event names.
 * Wire these into `@/lib/analytics/events` (AnalyticsEvents) when product tracking is enabled.
 */

export const GrowthAnalyticsEvents = {
  MISSION_COMPLETED: "mission_completed",
  MISSION_FAILED: "mission_failed",
  MISSION_ASSIGNED: "mission_assigned",
  STREAK_INCREMENTED: "streak_incremented",
  STREAK_BROKEN: "streak_broken",
  ACHIEVEMENT_UNLOCKED: "achievement_unlocked",
  ONBOARDING_TASK_COMPLETED: "onboarding_task_completed",
  ONBOARDING_COMPLETED: "onboarding_completed",
  DAILY_LOGIN: "daily_login",
  RANKINGS_VIEWED: "rankings_viewed",
  GUIDE_READ: "guide_read",
  LESSON_STARTED: "lesson_started",
  LESSON_COMPLETED: "lesson_completed",
  STREAMERU_LIVE_MISSION_COMPLETED: "streameru_live_mission_completed",
  REFERRAL_ACCEPTED: "referral_accepted",
  REPUTATION_EARNED: "reputation_earned",
  TITLE_UNLOCKED: "title_unlocked",
  NOTIFICATION_READ: "notification_read",
} as const;

export type GrowthAnalyticsEventName =
  (typeof GrowthAnalyticsEvents)[keyof typeof GrowthAnalyticsEvents];
