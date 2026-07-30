/**
 * StreamerU LIVE mission dual-write adapter.
 * Curriculum UI remains localStorage SoT; growth observes via progress_events + this table.
 */

import { createClient } from "@/lib/supabase/server";
import { appendProgressEvent } from "@/lib/growth/progress/events";
import type { ProgressEventRow } from "@/lib/growth/types";

function lessonSlugFromEvent(event: ProgressEventRow): string | null {
  const fromSubject = event.subject_key?.trim();
  if (fromSubject) return fromSubject;
  const meta = event.metadata ?? {};
  const slug = meta.lesson_slug ?? meta.slug;
  return typeof slug === "string" && slug.trim() ? slug.trim() : null;
}

function missionIdFromEvent(event: ProgressEventRow): string | null {
  const id = event.metadata?.mission_id;
  return typeof id === "string" && id.trim() ? id.trim() : null;
}

export async function projectStreamerUCompletion(
  event: ProgressEventRow,
): Promise<void> {
  if (event.event_type !== "streameru_live_mission_completed") return;

  const lessonSlug = lessonSlugFromEvent(event);
  const missionId = missionIdFromEvent(event);
  if (!lessonSlug || !missionId) return;

  const supabase = await createClient();
  await supabase.from("streameru_mission_completions").upsert(
    {
      member_id: event.member_id,
      lesson_slug: lessonSlug,
      mission_id: missionId,
      progress_event_id: event.id,
      completed_at: event.created_at,
    },
    { onConflict: "member_id,lesson_slug,mission_id" },
  );
}

export async function recordStreamerUMissionCompletion(
  memberId: string,
  lessonSlug: string,
  missionId: string,
): Promise<{ missionEvent: ProgressEventRow; lessonEvent: ProgressEventRow | null }> {
  const slug = lessonSlug.trim();
  const mid = missionId.trim();
  if (!slug || !mid) {
    throw new Error("lessonSlug and missionId are required");
  }

  const { event: missionEvent } = await appendProgressEvent({
    memberId,
    eventType: "streameru_live_mission_completed",
    subjectKey: slug,
    metadata: { lesson_slug: slug, mission_id: mid },
    idempotencyKey: `streameru_mission:${slug}:${mid}`,
  });

  const { event: lessonEvent } = await appendProgressEvent({
    memberId,
    eventType: "lesson_completed",
    subjectKey: slug,
    metadata: { lesson_slug: slug, source: "streameru_live_mission" },
    idempotencyKey: `lesson_completed:${slug}`,
  });

  return { missionEvent, lessonEvent };
}
