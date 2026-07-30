/**
 * Pure requirement evaluation over an event-derived ProgressSnapshot.
 * No database access — fully unit-testable.
 */

import type {
  GrowthRequirement,
  ProgressEventRow,
  ProgressSnapshot,
  RequirementResult,
} from "@/lib/growth/types";

function ok(progress = 1, target = 1, detail?: string): RequirementResult {
  return { satisfied: progress >= target, progress, target, detail };
}

function fail(progress = 0, target = 1, detail?: string): RequirementResult {
  return { satisfied: false, progress, target, detail };
}

function filterSeason(
  events: ProgressEventRow[],
  seasonId: string | null,
  seasonScoped?: boolean,
): ProgressEventRow[] {
  if (!seasonScoped || !seasonId) return events;
  return events.filter((e) => e.season_id === seasonId);
}

function countType(
  events: ProgressEventRow[],
  type: string,
  subjectKey?: string | null,
): number {
  return events.filter(
    (e) =>
      e.event_type === type &&
      (subjectKey == null || subjectKey === "" || e.subject_key === subjectKey),
  ).length;
}

function hasType(
  events: ProgressEventRow[],
  type: string,
  subjectKey?: string | null,
): boolean {
  return countType(events, type, subjectKey) > 0;
}

export function evaluateRequirement(
  requirement: GrowthRequirement,
  snapshot: ProgressSnapshot,
): RequirementResult {
  if (requirement.all?.length) {
    const results = requirement.all.map((r) => evaluateRequirement(r, snapshot));
    const satisfied = results.every((r) => r.satisfied);
    const progress = results.filter((r) => r.satisfied).length;
    return { satisfied, progress, target: results.length };
  }

  if (requirement.anyOf?.length) {
    const results = requirement.anyOf.map((r) => evaluateRequirement(r, snapshot));
    const hit = results.find((r) => r.satisfied);
    return hit ?? fail(0, 1, "none matched");
  }

  const events = filterSeason(
    snapshot.events,
    snapshot.seasonId,
    requirement.seasonScoped,
  );
  const params = requirement.params ?? {};

  switch (requirement.type) {
    case "complete_lesson": {
      const slug = String(params.slug ?? params.lesson_slug ?? "");
      if (slug) {
        return hasType(events, "lesson_completed", slug) ||
          snapshot.streameruMissionCompletions.some((c) => c.lesson_slug === slug)
          ? ok(1, 1, slug)
          : fail(0, 1, slug);
      }
      const n = countType(events, "lesson_completed");
      const target = Number(params.count ?? 1);
      return ok(Math.min(n, target), target);
    }
    case "complete_module": {
      const key = String(params.module ?? params.slug ?? "");
      return hasType(events, "module_completed", key || null)
        ? ok()
        : fail(0, 1, key || "any module");
    }
    case "complete_streameru_live_mission": {
      const slug = String(params.lesson_slug ?? params.slug ?? "");
      const missionId = String(params.mission_id ?? "");
      const hit = snapshot.streameruMissionCompletions.some(
        (c) =>
          (!slug || c.lesson_slug === slug) &&
          (!missionId || c.mission_id === missionId),
      );
      const eventHit = hasType(events, "streameru_live_mission_completed", slug || null);
      return hit || eventHit ? ok() : fail();
    }
    case "complete_any_streameru_live_mission": {
      const n =
        snapshot.streameruMissionCompletions.length ||
        countType(events, "streameru_live_mission_completed");
      const target = Number(params.count ?? 1);
      return ok(Math.min(n, target), target);
    }
    case "continue_training": {
      const n =
        countType(events, "lesson_started") +
        countType(events, "lesson_completed") +
        countType(events, "streameru_live_mission_completed");
      return n > 0 ? ok() : fail();
    }
    case "course_completion_threshold": {
      const threshold = Number(params.threshold ?? params.percent ?? 1);
      const completed = snapshot.streameruMissionCompletions.length;
      const total = Number(params.total ?? Math.max(completed, threshold));
      const percent = total > 0 ? (completed / total) * 100 : 0;
      const targetPct = threshold <= 1 ? threshold * 100 : threshold;
      return ok(Math.min(percent, targetPct), targetPct);
    }
    case "complete_onboarding_task": {
      const key = String(params.task_key ?? params.key ?? "");
      if (key) {
        return snapshot.completedOnboardingTaskKeys.includes(key) ? ok() : fail();
      }
      return snapshot.completedOnboardingTaskKeys.length > 0 ? ok() : fail();
    }
    case "complete_onboarding": {
      return snapshot.profile.onboardingCompleted ||
        hasType(events, "onboarding_completed")
        ? ok()
        : fail();
    }
    case "connect_tiktok": {
      return snapshot.profile.hasTiktokConnection || hasType(events, "tiktok_connected")
        ? ok()
        : fail();
    }
    case "update_profile": {
      const ready =
        snapshot.profile.hasTiktokUsername && snapshot.profile.hasTimezone;
      return ready || hasType(events, "profile_updated") ? ok() : fail();
    }
    case "upload_creator_photo": {
      return snapshot.profile.hasAvatar ? ok() : fail();
    }
    case "join_battle": {
      const n = countType(events, "battle_joined");
      const target = Number(params.count ?? 1);
      return ok(Math.min(n, target), target);
    }
    case "view_rankings": {
      return hasType(events, "rankings_viewed") ? ok() : fail();
    }
    case "read_guide": {
      const slug = String(params.slug ?? "");
      if (params.any || !slug) {
        return countType(events, "guide_read") + countType(events, "guide_completed") > 0
          ? ok()
          : fail();
      }
      return hasType(events, "guide_read", slug) || hasType(events, "guide_completed", slug)
        ? ok()
        : fail();
    }
    case "view_announcement": {
      return hasType(events, "guide_read", String(params.slug ?? "") || null)
        ? ok()
        : fail();
    }
    case "daily_login": {
      return hasType(events, "daily_login") ? ok() : fail();
    }
    case "complete_mission": {
      if (params.any) {
        return snapshot.completedMissionTemplateKeys.length > 0 ||
          countType(events, "mission_completed") > 0
          ? ok()
          : fail();
      }
      const key = String(params.template_key ?? params.key ?? "");
      return key && snapshot.completedMissionTemplateKeys.includes(key)
        ? ok()
        : countType(events, "mission_completed", key || null) > 0
          ? ok()
          : fail();
    }
    case "maintain_streak": {
      const streakKey = String(params.streak_key ?? "daily_login");
      const days = Number(params.days ?? 7);
      const current = snapshot.streaks[streakKey]?.current ?? 0;
      return ok(Math.min(current, days), days, streakKey);
    }
    case "reach_rank": {
      const maxRank = Number(params.max_rank ?? 10);
      if (snapshot.latestRank != null && snapshot.latestRank <= maxRank) {
        return ok();
      }
      const reached = events.some((e) => {
        if (e.event_type !== "ranking_reached") return false;
        const rank = Number(e.metadata?.rank ?? e.subject_key ?? Infinity);
        return rank <= maxRank;
      });
      return reached ? ok() : fail();
    }
    case "referral_accepted": {
      const target = Number(params.count ?? 1);
      const n =
        snapshot.referralsAccepted || countType(events, "referral_accepted");
      return ok(Math.min(n, target), target);
    }
    default:
      return fail(0, 1, "unknown requirement");
  }
}
