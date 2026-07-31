/**
 * Deterministic projection pipeline: progress_events → derived tables.
 * Child events use distinct idempotency keys and source_event_id to avoid loops.
 */

import type { ProgressEventRow } from "@/lib/growth/types";
import { projectStreamerUCompletion } from "@/lib/growth/streameru/completion-adapter";
import { projectOnboardingFromEvent } from "@/lib/growth/onboarding/checklist";
import { projectMissionsFromEvent } from "@/lib/growth/missions/engine";
import { projectStreaksFromEvent } from "@/lib/growth/streaks/engine";
import { projectAchievementsFromEvent } from "@/lib/growth/achievements/engine";
import { projectReputationFromEvent } from "@/lib/growth/reputation/engine";
import { projectCertificatesFromEvent } from "@/lib/growth/certificates/engine";
import { projectCareerFromEvent } from "@/lib/growth/career/engine";
import { projectCreatorRankFromEvent } from "@/lib/growth/xp/rank-up";
import { projectActivityFromEvent } from "@/lib/growth/activity/feed";
import { projectNotificationFromEvent } from "@/lib/growth/notifications/service";

export type PipelineOptions = {
  isNew?: boolean;
  /** Skip nested child-event projections that already ran for this source. */
  depth?: number;
};

const MAX_DEPTH = 4;

/**
 * Child / derived event types that should not re-trigger the full pipeline
 * (they were emitted BY the pipeline).
 */
const TERMINAL_TYPES = new Set([
  "reputation_earned",
  "title_unlocked",
  "streak_incremented",
  "streak_broken",
  "achievement_unlocked",
  "mission_completed",
  "mission_failed",
  "mission_assigned",
  "certificate_issued",
  "graduated",
  "creator_rank_up",
  "mentor_eligible",
  "manager_eligible",
  "streameru_xp_earned",
]);

export async function runProjectionPipeline(
  event: ProgressEventRow,
  opts: PipelineOptions = {},
): Promise<void> {
  const depth = opts.depth ?? 0;
  if (depth > MAX_DEPTH) return;

  const projectOpts = { depth };

  // Always project StreamerU completions for that event type
  if (event.event_type === "streameru_live_mission_completed") {
    await projectStreamerUCompletion(event);
  }

  await projectOnboardingFromEvent(event, projectOpts);
  await projectMissionsFromEvent(event, projectOpts);
  await projectStreaksFromEvent(event, projectOpts);

  // Derived unlocks / reputation / activity — skip deep re-entry for terminal types
  if (!TERMINAL_TYPES.has(event.event_type) || depth === 0) {
    await projectAchievementsFromEvent(event, projectOpts);
    await projectReputationFromEvent(event, projectOpts);
    await projectCertificatesFromEvent(event, projectOpts);
    await projectCareerFromEvent(event, projectOpts);
  }

  if (event.event_type === "reputation_earned") {
    await projectCreatorRankFromEvent(event, projectOpts);
  }

  await projectActivityFromEvent(event);
  await projectNotificationFromEvent(event);
}
