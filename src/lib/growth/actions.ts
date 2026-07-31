"use server";

import { revalidatePath } from "next/cache";
import { canScheduleBattles } from "@/lib/auth/access";
import { getSessionProfile } from "@/lib/auth/server";
import { trackServerEvent } from "@/lib/analytics/server";
import type { AnalyticsEventName } from "@/lib/analytics/events";
import { GrowthAnalyticsEvents } from "@/lib/growth/analytics";
import {
  appendProgressEvent,
  periodKeyForDate,
} from "@/lib/growth/progress/events";
import { createClient } from "@/lib/supabase/server";
import { recordStreamerUMissionCompletion } from "@/lib/growth/streameru/completion-adapter";
import {
  completeOnboardingTask,
  syncOnboardingChecklist,
} from "@/lib/growth/onboarding/checklist";
import { ensureEngagementMissions } from "@/lib/growth/missions/engine";
import { markNotificationRead } from "@/lib/growth/notifications/service";
import { claimReferralCode } from "@/lib/growth/referrals/service";
import { celebrateGraduation } from "@/lib/growth/certificates/engine";

export type GrowthActionResult = { ok: true } | { error: string };

async function requireNetworkMemberSession() {
  const session = await getSessionProfile();
  if (!session?.user || !session.profile || !canScheduleBattles(session.profile.role)) {
    return null;
  }
  return session;
}

function revalidateMemberGrowthPaths() {
  revalidatePath("/member/dashboard");
  revalidatePath("/member/progress");
  revalidatePath("/member/onboarding");
  revalidatePath("/member/notifications");
}

function trackGrowth(event: string, route?: string, metadata?: Record<string, unknown>) {
  void trackServerEvent({
    event: event as AnalyticsEventName,
    route,
    metadata,
  });
}

export async function recordStreamerUMissionCompletionAction(input: {
  lessonSlug: string;
  missionId: string;
}): Promise<GrowthActionResult> {
  const session = await requireNetworkMemberSession();
  if (!session) return { error: "Unauthorized" };

  const lessonSlug = String(input.lessonSlug ?? "").trim();
  const missionId = String(input.missionId ?? "").trim();
  if (!lessonSlug || !missionId) return { error: "lessonSlug and missionId required" };

  try {
    await recordStreamerUMissionCompletion(session.user.id, lessonSlug, missionId);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Failed to record mission" };
  }

  trackGrowth(GrowthAnalyticsEvents.STREAMERU_LIVE_MISSION_COMPLETED, "/streameru", {
    lesson_slug: lessonSlug,
    mission_id: missionId,
  });
  revalidateMemberGrowthPaths();
  return { ok: true };
}

export async function recordDailyLoginAction(): Promise<GrowthActionResult> {
  const session = await requireNetworkMemberSession();
  if (!session) return { error: "Unauthorized" };

  const periodKey = periodKeyForDate(new Date(), session.profile!.timezone);
  try {
    await appendProgressEvent({
      memberId: session.user.id,
      eventType: "daily_login",
      subjectKey: periodKey,
      idempotencyKey: `daily_login:${periodKey}`,
      metadata: { period_key: periodKey },
    });
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Failed to record login" };
  }

  trackGrowth(GrowthAnalyticsEvents.DAILY_LOGIN, "/member/dashboard");
  revalidatePath("/member/dashboard");
  return { ok: true };
}

export async function recordRankingsViewedAction(): Promise<GrowthActionResult> {
  const session = await requireNetworkMemberSession();
  if (!session) return { error: "Unauthorized" };

  const periodKey = periodKeyForDate(new Date(), session.profile!.timezone);
  try {
    await appendProgressEvent({
      memberId: session.user.id,
      eventType: "rankings_viewed",
      subjectKey: periodKey,
      idempotencyKey: `rankings_viewed:${periodKey}`,
      metadata: { period_key: periodKey },
    });
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Failed to record rankings view" };
  }

  trackGrowth(GrowthAnalyticsEvents.RANKINGS_VIEWED, "/member/leaderboard");
  revalidatePath("/member/dashboard");
  return { ok: true };
}

export async function recordGuideReadAction(slug: string): Promise<GrowthActionResult> {
  const session = await requireNetworkMemberSession();
  if (!session) return { error: "Unauthorized" };

  const guideSlug = String(slug ?? "").trim();
  if (!guideSlug) return { error: "slug required" };

  try {
    await appendProgressEvent({
      memberId: session.user.id,
      eventType: "guide_read",
      subjectKey: guideSlug,
      idempotencyKey: `guide_read:${guideSlug}`,
      metadata: { slug: guideSlug },
    });
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Failed to record guide read" };
  }

  trackGrowth(GrowthAnalyticsEvents.GUIDE_READ, `/guides/${guideSlug}`, {
    slug: guideSlug,
  });
  revalidatePath("/member/dashboard");
  revalidatePath("/member/onboarding");
  return { ok: true };
}

export async function recordLessonStartedAction(slug: string): Promise<GrowthActionResult> {
  const session = await requireNetworkMemberSession();
  if (!session) return { error: "Unauthorized" };

  const lessonSlug = String(slug ?? "").trim();
  if (!lessonSlug) return { error: "slug required" };

  try {
    await appendProgressEvent({
      memberId: session.user.id,
      eventType: "lesson_started",
      subjectKey: lessonSlug,
      idempotencyKey: `lesson_started:${lessonSlug}`,
      metadata: { slug: lessonSlug },
    });
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Failed to record lesson start" };
  }

  trackGrowth(GrowthAnalyticsEvents.LESSON_STARTED, "/streameru", {
    slug: lessonSlug,
  });
  revalidatePath("/member/dashboard");
  return { ok: true };
}

export async function completeOnboardingTaskAction(
  taskKey: string,
): Promise<GrowthActionResult> {
  const session = await requireNetworkMemberSession();
  if (!session) return { error: "Unauthorized" };

  const key = String(taskKey ?? "").trim();
  if (!key) return { error: "taskKey required" };

  try {
    const result = await completeOnboardingTask(session.user.id, key);
    if (!result.ok) {
      return { error: result.error ?? "Failed to complete task" };
    }
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Failed to complete task" };
  }

  trackGrowth(GrowthAnalyticsEvents.ONBOARDING_TASK_COMPLETED, "/member/onboarding", {
    task_key: key,
  });
  revalidateMemberGrowthPaths();
  return { ok: true };
}

export async function ensureGrowthStateAction(): Promise<GrowthActionResult> {
  const session = await requireNetworkMemberSession();
  if (!session) return { error: "Unauthorized" };

  const memberId = session.user.id;
  const timezone = session.profile!.timezone;
  const periodKey = periodKeyForDate(new Date(), timezone);

  try {
    await appendProgressEvent({
      memberId,
      eventType: "daily_login",
      subjectKey: periodKey,
      idempotencyKey: `daily_login:${periodKey}`,
      metadata: { period_key: periodKey },
    });
  } catch {
    // Non-fatal: still try missions + onboarding sync
  }

  try {
    await ensureEngagementMissions(memberId, timezone ?? undefined);
  } catch {
    // Engine may still be wiring up
  }

  try {
    await syncOnboardingChecklist(memberId);
  } catch {
    // Engine may still be wiring up
  }

  trackGrowth(GrowthAnalyticsEvents.DAILY_LOGIN, "/member/dashboard");
  revalidateMemberGrowthPaths();
  return { ok: true };
}

export async function celebrateGraduationAction(): Promise<GrowthActionResult> {
  const session = await requireNetworkMemberSession();
  if (!session) return { error: "Unauthorized" };

  try {
    const result = await celebrateGraduation(session.user.id);
    if ("error" in result) return result;
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Failed to celebrate" };
  }

  trackGrowth(GrowthAnalyticsEvents.GRADUATION_CELEBRATED, "/member/progress");
  revalidateMemberGrowthPaths();
  revalidatePath("/hall-of-fame");
  return { ok: true };
}

export async function markNotificationReadAction(
  id: string,
): Promise<GrowthActionResult> {
  const session = await requireNetworkMemberSession();
  if (!session) return { error: "Unauthorized" };

  const notificationId = String(id ?? "").trim();
  if (!notificationId) return { error: "id required" };

  try {
    const updated = await markNotificationRead(session.user.id, notificationId);
    if (!updated) {
      // Already read or missing — still OK for idempotent UX
    }
  } catch (e) {
    const supabase = await createClient();
    const { error } = await supabase
      .from("notifications")
      .update({ read_at: new Date().toISOString() })
      .eq("id", notificationId)
      .eq("member_id", session.user.id)
      .is("read_at", null);
    if (error) {
      return { error: e instanceof Error ? e.message : error.message };
    }
  }

  trackGrowth(GrowthAnalyticsEvents.NOTIFICATION_READ, "/member/notifications", {
    notification_id: notificationId,
  });
  revalidatePath("/member/notifications");
  revalidatePath("/member/dashboard");
  return { ok: true };
}

export async function claimReferralAction(code: string): Promise<GrowthActionResult> {
  const session = await requireNetworkMemberSession();
  if (!session) return { error: "Unauthorized" };

  const result = await claimReferralCode(session.user.id, code);
  if ("error" in result) return result;

  trackGrowth(GrowthAnalyticsEvents.REFERRAL_ACCEPTED, "/member/dashboard", {
    code: code.trim().toUpperCase(),
  });
  revalidateMemberGrowthPaths();
  return { ok: true };
}
