/** StreamerU lesson media — readiness is explicit, never inferred from labels. */

export const ASSET_STATUSES = [
  "requested",
  "draft",
  "ready",
  "published",
  "archived",
] as const;

export type AssetStatus = (typeof ASSET_STATUSES)[number];

export const ASSET_TYPES = [
  "screenshot",
  "photo",
  "diagram",
  "video",
  "screen_recording",
  "worksheet",
  "checklist",
  "downloadable",
  "founder_story",
  "supporting_example",
] as const;

export type AssetType = (typeof ASSET_TYPES)[number];

export const ASSET_PRIORITIES = ["essential", "helpful", "optional"] as const;
export type AssetPriority = (typeof ASSET_PRIORITIES)[number];

export const OWNERSHIP_KINDS = [
  "needs_brad",
  "cursor_can_create",
  "brad_must_approve",
  "optional_enhancement",
] as const;
export type OwnershipKind = (typeof OWNERSHIP_KINDS)[number];

/** Only these statuses render on the public academy. */
export function isPublicRenderableStatus(status: AssetStatus): boolean {
  return status === "published";
}

export type LessonMediaAsset = {
  id: string;
  lesson_slug: string;
  asset_type: AssetType;
  title: string;
  /** Matches `[Screenshot: …]` / `[Diagram: …]` description text when present */
  placeholder_key: string | null;
  requested_description: string;
  section_key: string | null;
  instructional_purpose: string;
  required: boolean;
  priority: AssetPriority;
  ownership: OwnershipKind;
  capture_instructions: string;
  dimensions_hint: string | null;
  privacy_warning: string | null;
  admin_notes: string | null;
  suggested_caption: string | null;
  suggested_alt: string | null;
  storage_path: string | null;
  public_url: string | null;
  alt_text: string | null;
  caption: string | null;
  status: AssetStatus;
  display_order: number;
  reusable_key: string | null;
  created_at: string;
  updated_at: string;
  published_at: string | null;
};

export type LessonProductionScore = {
  publishReadyPercent: number;
  enhancementPercent: number;
  coreTeaching: "complete" | "partial" | "missing";
  assessment: "complete" | "partial" | "missing";
  practice: "complete" | "partial" | "missing";
  resources: "complete" | "partial" | "missing" | "optional";
  mediaEnhanced: boolean;
  fullyPolished: boolean;
  category:
    | "core_teaching_complete"
    | "assessment_complete"
    | "practice_complete"
    | "resource_complete"
    | "media_enhanced"
    | "fully_polished"
    | "publish_ready";
};

export type LessonChecklistItem = {
  key: string;
  label: string;
  status:
    | "complete"
    | "needs_brad"
    | "agent_can_complete"
    | "optional"
    | "ready_for_review"
    | "published"
    | "missing";
  detail?: string;
};
