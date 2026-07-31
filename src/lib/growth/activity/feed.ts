/**
 * Activity feed projection — real events only, never invented.
 */

import { createClient } from "@/lib/supabase/server";
import type { ProgressEventRow } from "@/lib/growth/types";

/** Public-safe event types eligible for the members activity feed. */
const ACTIVITY_ALLOWLIST = new Set([
  "achievement_unlocked",
  "onboarding_completed",
  "battle_joined",
  "battle_completed",
  "mission_completed",
  "ranking_reached",
  "title_unlocked",
  "referral_accepted",
  "streameru_live_mission_completed",
  "certificate_issued",
  "graduated",
  "creator_rank_up",
  "mentor_eligible",
  "manager_eligible",
]);

function summaryForEvent(event: ProgressEventRow): string | null {
  const meta = event.metadata ?? {};
  const subject = event.subject_key;

  switch (event.event_type) {
    case "achievement_unlocked": {
      const name =
        typeof meta.name === "string" && meta.name.trim()
          ? meta.name.trim()
          : subject;
      return name ? `Unlocked achievement: ${name}` : null;
    }
    case "onboarding_completed":
      return "Completed member onboarding";
    case "battle_joined":
      return subject
        ? `Joined a battle (${subject})`
        : "Joined a network battle";
    case "battle_completed":
      return subject
        ? `Completed a battle (${subject})`
        : "Completed a network battle";
    case "mission_completed": {
      const title =
        typeof meta.title === "string" && meta.title.trim()
          ? meta.title.trim()
          : subject;
      return title ? `Completed mission: ${title}` : "Completed a daily mission";
    }
    case "ranking_reached": {
      const rank = meta.rank ?? subject;
      return rank != null ? `Reached rank #${rank}` : null;
    }
    case "title_unlocked": {
      const name =
        typeof meta.name === "string" && meta.name.trim()
          ? meta.name.trim()
          : subject;
      return name ? `Earned title: ${name}` : null;
    }
    case "referral_accepted":
      return "Welcomed a referred creator";
    case "streameru_live_mission_completed":
      return subject
        ? `Completed StreamerU LIVE mission (${subject})`
        : "Completed a StreamerU LIVE mission";
    case "certificate_issued": {
      const name =
        typeof meta.name === "string" && meta.name.trim()
          ? meta.name.trim()
          : subject;
      return name ? `Earned certificate: ${name}` : "Earned a certificate";
    }
    case "graduated":
      return "Became StreamerU graduation eligible";
    case "creator_rank_up": {
      const name =
        typeof meta.tier_name === "string" && meta.tier_name.trim()
          ? meta.tier_name.trim()
          : subject;
      return name ? `Ranked up to ${name}` : "Creator Rank up";
    }
    case "mentor_eligible":
      return "Unlocked mentor eligibility";
    case "manager_eligible":
      return "Unlocked manager eligibility";
    default:
      return null;
  }
}

export async function projectActivityFromEvent(
  event: ProgressEventRow,
): Promise<void> {
  if (!ACTIVITY_ALLOWLIST.has(event.event_type)) return;

  const summary = summaryForEvent(event);
  if (!summary) return;

  const supabase = await createClient();

  const { data: existing } = await supabase
    .from("activity_feed")
    .select("id")
    .eq("progress_event_id", event.id)
    .maybeSingle();
  if (existing) return;

  await supabase.from("activity_feed").insert({
    actor_id: event.member_id,
    event_type: event.event_type,
    subject_key: event.subject_key,
    season_id: event.season_id,
    visibility: "members",
    summary,
    metadata: event.metadata ?? {},
    progress_event_id: event.id,
    created_at: event.created_at,
  });
}
