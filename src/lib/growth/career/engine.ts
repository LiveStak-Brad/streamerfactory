/**
 * Career path projection — persist stage + mentor/manager eligibility.
 */

import { createClient } from "@/lib/supabase/server";
import { emitChildEvent } from "@/lib/growth/progress/events";
import { getCreatorSnapshot } from "@/lib/growth/progress/snapshot";
import { listMemberEvents } from "@/lib/growth/progress/events";
import {
  completedSlugsFromEvents,
  isFullGraduate,
} from "@/lib/growth/semester/programs";
import { resolveCareerStage } from "@/lib/growth/career/path";
import type { ProgressEventRow } from "@/lib/growth/types";

export type ProjectOpts = { depth?: number };

async function completedLessonSlugs(memberId: string): Promise<string[]> {
  const supabase = await createClient();
  const [events, streameruRes] = await Promise.all([
    listMemberEvents(memberId, {
      limit: 500,
      eventTypes: ["lesson_completed", "streameru_live_mission_completed"],
    }),
    supabase
      .from("streameru_mission_completions")
      .select("lesson_slug")
      .eq("member_id", memberId),
  ]);
  return completedSlugsFromEvents(
    events.map((e) => e.subject_key).filter((s): s is string => Boolean(s)),
    (streameruRes.data ?? []).map((r) => r.lesson_slug as string),
  );
}

export async function projectCareerFromEvent(
  event: ProgressEventRow,
  opts: ProjectOpts = {},
): Promise<void> {
  try {
    await projectCareerFromEventInner(event, opts);
  } catch {
    // Career tables may not be migrated yet.
  }
}

async function projectCareerFromEventInner(
  event: ProgressEventRow,
  opts: ProjectOpts = {},
): Promise<void> {
  const depth = opts.depth ?? 0;
  const supabase = await createClient();
  const [snapshot, slugs, gradRes] = await Promise.all([
    getCreatorSnapshot(event.member_id),
    completedLessonSlugs(event.member_id),
    supabase
      .from("member_graduations")
      .select("status")
      .eq("member_id", event.member_id)
      .eq("ceremony_key", "streameru_graduate")
      .maybeSingle(),
  ]);

  const graduated = Boolean(gradRes.data) || isFullGraduate(slugs);
  const progress = resolveCareerStage(snapshot, slugs, graduated);
  const now = new Date().toISOString();

  const { data: prior } = await supabase
    .from("member_career_status")
    .select(
      "stage_key, mentor_eligible, manager_eligible, mentor_eligible_at, manager_eligible_at",
    )
    .eq("member_id", event.member_id)
    .maybeSingle();

  const mentorEligible = progress.eligibility.mentorEligible;
  const managerEligible = progress.eligibility.managerEligible;

  const { error } = await supabase.from("member_career_status").upsert(
    {
      member_id: event.member_id,
      stage_key: progress.stage.key,
      mentor_eligible: mentorEligible,
      mentor_eligible_at: mentorEligible
        ? (prior?.mentor_eligible_at ?? now)
        : null,
      manager_eligible: managerEligible,
      manager_eligible_at: managerEligible
        ? (prior?.manager_eligible_at ?? now)
        : null,
      next_stage_key: progress.nextStage?.key ?? null,
      progress: {
        percent: progress.percent,
        checklist: progress.checklist,
        mentor_missing: progress.eligibility.mentorMissing,
        manager_missing: progress.eligibility.managerMissing,
      },
      updated_at: now,
    },
    { onConflict: "member_id" },
  );
  if (error) return;

  if (mentorEligible && !prior?.mentor_eligible) {
    await emitChildEvent({
      memberId: event.member_id,
      eventType: "mentor_eligible",
      subjectKey: "mentor",
      metadata: { stage: progress.stage.key },
      idempotencyKey: "mentor_eligible",
      sourceEventId: event.id,
      depth,
    });
  }

  if (managerEligible && !prior?.manager_eligible) {
    await emitChildEvent({
      memberId: event.member_id,
      eventType: "manager_eligible",
      subjectKey: "manager",
      metadata: { stage: progress.stage.key },
      idempotencyKey: "manager_eligible",
      sourceEventId: event.id,
      depth,
    });
  }
}
