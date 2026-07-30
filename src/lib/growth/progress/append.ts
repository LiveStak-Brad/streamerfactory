/**
 * Low-level idempotent insert into progress_events (no projections).
 * Used by the public append API and by projection engines emitting child events.
 */

import { createClient } from "@/lib/supabase/server";
import { getActiveSeason } from "@/lib/growth/seasons/service";
import type { ProgressEventRow, ProgressEventType } from "@/lib/growth/types";

export type RawAppendInput = {
  memberId: string;
  eventType: ProgressEventType | string;
  subjectKey?: string | null;
  metadata?: Record<string, unknown>;
  idempotencyKey: string;
  sourceEventId?: string | null;
  stampSeason?: boolean;
};

export function mapEventRow(raw: Record<string, unknown>): ProgressEventRow {
  return {
    id: String(raw.id),
    member_id: String(raw.member_id),
    event_type: String(raw.event_type),
    subject_key: (raw.subject_key as string | null) ?? null,
    season_id: (raw.season_id as string | null) ?? null,
    metadata: (raw.metadata as Record<string, unknown>) ?? {},
    idempotency_key: String(raw.idempotency_key),
    source_event_id: (raw.source_event_id as string | null) ?? null,
    created_at: String(raw.created_at),
  };
}

export async function appendProgressEventRaw(
  input: RawAppendInput,
): Promise<{ event: ProgressEventRow; inserted: boolean }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let seasonId: string | null = null;
  if (input.stampSeason !== false) {
    const season = await getActiveSeason();
    seasonId = season?.id ?? null;
  }

  if (user?.id && user.id === input.memberId) {
    const { data, error } = await supabase.rpc("append_progress_event", {
      p_event_type: input.eventType,
      p_subject_key: input.subjectKey ?? null,
      p_metadata: input.metadata ?? {},
      p_idempotency_key: input.idempotencyKey,
      p_source_event_id: input.sourceEventId ?? null,
      p_stamp_season: input.stampSeason !== false,
    });
    if (error) throw new Error(error.message);
    const event = mapEventRow(data as Record<string, unknown>);
    const inserted = Date.now() - new Date(event.created_at).getTime() < 3000;
    return { event, inserted };
  }

  const { data: existing } = await supabase
    .from("progress_events")
    .select("*")
    .eq("member_id", input.memberId)
    .eq("idempotency_key", input.idempotencyKey)
    .maybeSingle();

  if (existing) {
    return { event: mapEventRow(existing as Record<string, unknown>), inserted: false };
  }

  const { data: inserted, error } = await supabase
    .from("progress_events")
    .insert({
      member_id: input.memberId,
      event_type: input.eventType,
      subject_key: input.subjectKey ?? null,
      season_id: seasonId,
      metadata: input.metadata ?? {},
      idempotency_key: input.idempotencyKey,
      source_event_id: input.sourceEventId ?? null,
    })
    .select("*")
    .single();

  if (error) {
    const { data: raced } = await supabase
      .from("progress_events")
      .select("*")
      .eq("member_id", input.memberId)
      .eq("idempotency_key", input.idempotencyKey)
      .maybeSingle();
    if (raced) {
      return { event: mapEventRow(raced as Record<string, unknown>), inserted: false };
    }
    throw new Error(error.message);
  }

  return { event: mapEventRow(inserted as Record<string, unknown>), inserted: true };
}
