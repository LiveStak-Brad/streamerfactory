/**
 * Canonical analytics event names + payload hints.
 * Keep metadata small — no raw messages, passwords, or full form dumps.
 */

export const AnalyticsEvents = {
  // Acquisition / top-of-funnel (often client page_view)
  HOMEPAGE_VIEWED: "homepage_viewed",
  APPLY_PAGE_VIEWED: "apply_page_viewed",
  RESOURCES_PAGE_VIEWED: "resources_page_viewed",
  START_HERE_VIEWED: "start_here_viewed",
  GUIDES_HUB_VIEWED: "guides_hub_viewed",
  GUIDE_VIEWED: "guide_viewed",
  ABOUT_VIEWED: "about_viewed",
  CONTACT_VIEWED: "contact_viewed",
  RANKINGS_VIEWED: "rankings_viewed",
  MEMBERS_VIEWED: "members_viewed",

  // Conversion funnel
  CTA_CLICKED: "cta_clicked",
  SIGNUP_STARTED: "signup_started",
  SIGNUP_COMPLETED: "signup_completed",
  APPLICATION_SUBMITTED: "application_submitted",
  APPLICATION_RESUBMITTED: "application_resubmitted",
  APPLICATION_STATUS_VIEWED: "application_status_viewed",
  APPLICATION_APPROVED: "application_approved",
  APPLICATION_REJECTED: "application_rejected",

  // Member activation
  WELCOME_VIEWED: "welcome_viewed",
  ONBOARDING_COMPLETED: "onboarding_completed",
  PROFILE_COMPLETED: "profile_completed",
  TIKTOK_USERNAME_SET: "tiktok_username_set",
  TIMEZONE_SET: "timezone_set",
  START_HERE_OPENED: "start_here_opened",
  TRAINING_COMPLETED: "training_completed",
  DASHBOARD_VIEWED: "dashboard_viewed",

  // Resources
  RESOURCE_VIEWED: "resource_viewed",
  RESOURCE_CTA_CLICKED: "resource_cta_clicked",

  // Battle Hub / Finder / Scheduler
  BATTLE_HUB_VIEWED: "battle_hub_viewed",
  BATTLE_FINDER_VIEWED: "battle_finder_viewed",
  BATTLE_REQUEST_CREATED: "battle_request_created",
  BATTLE_REQUEST_JOINED: "battle_request_joined",
  BATTLE_REQUEST_MATCHED: "battle_request_matched",
  BATTLE_REQUEST_PROMOTED: "battle_request_promoted",
  BATTLE_SCHEDULER_OPENED: "battle_scheduler_opened",
  BATTLE_EVENT_CREATED: "battle_event_created",
  BATTLE_CALENDAR_VIEWED: "battle_calendar_viewed",
} as const;

export type AnalyticsEventName = (typeof AnalyticsEvents)[keyof typeof AnalyticsEvents];

/** Events allowed from the public client API (allowlist reduces abuse). */
export const CLIENT_ALLOWED_EVENTS = new Set<string>([
  AnalyticsEvents.HOMEPAGE_VIEWED,
  AnalyticsEvents.APPLY_PAGE_VIEWED,
  AnalyticsEvents.APPLICATION_STATUS_VIEWED,
  AnalyticsEvents.RESOURCES_PAGE_VIEWED,
  AnalyticsEvents.START_HERE_VIEWED,
  AnalyticsEvents.GUIDES_HUB_VIEWED,
  AnalyticsEvents.GUIDE_VIEWED,
  AnalyticsEvents.ABOUT_VIEWED,
  AnalyticsEvents.CONTACT_VIEWED,
  AnalyticsEvents.RANKINGS_VIEWED,
  AnalyticsEvents.MEMBERS_VIEWED,
  AnalyticsEvents.CTA_CLICKED,
  AnalyticsEvents.SIGNUP_STARTED,
  AnalyticsEvents.SIGNUP_COMPLETED,
  AnalyticsEvents.WELCOME_VIEWED,
  AnalyticsEvents.START_HERE_OPENED,
  AnalyticsEvents.RESOURCE_VIEWED,
  AnalyticsEvents.RESOURCE_CTA_CLICKED,
  AnalyticsEvents.DASHBOARD_VIEWED,
  AnalyticsEvents.BATTLE_HUB_VIEWED,
  AnalyticsEvents.BATTLE_FINDER_VIEWED,
  AnalyticsEvents.BATTLE_SCHEDULER_OPENED,
  AnalyticsEvents.BATTLE_CALENDAR_VIEWED,
]);

export type AnalyticsEventInsert = {
  event_name: AnalyticsEventName | string;
  user_id?: string | null;
  profile_role?: string | null;
  route?: string | null;
  resource_slug?: string | null;
  battle_request_id?: string | null;
  battle_event_id?: string | null;
  metadata?: Record<string, unknown> | null;
};
