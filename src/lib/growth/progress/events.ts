/**
 * Append immutable progress events (canonical stream) and run projections.
 */

import {
  appendProgressEventRaw,
  mapEventRow,
} from "@/lib/growth/progress/append";
import { runProjectionPipeline } from "@/lib/growth/progress/pipeline";
import { createClient } from "@/lib/supabase/server";
import type { ProgressEventRow, ProgressEventType } from "@/lib/growth/types";

export type AppendProgressEventInput = {
  memberId: string;
  eventType: ProgressEventType | string;
  subjectKey?: string | null;
  metadata?: Record<string, unknown>;
  idempotencyKey: string;
  sourceEventId?: string | null;
  stampSeason?: boolean;
  runProjections?: boolean;
};

export type AppendProgressEventResult = {
  event: ProgressEventRow;
  inserted: boolean;
};

export async function appendProgressEvent(
  input: AppendProgressEventInput,
): Promise<AppendProgressEventResult> {
  const { event, inserted } = await appendProgressEventRaw(input);

  if (input.runProjections !== false && inserted) {
    await runProjectionPipeline(event, { isNew: true, depth: 0 });
  }

  return { event, inserted };
}

/** Emit a child event from a projection and continue the pipeline at depth+1. */
export async function emitChildEvent(
  input: AppendProgressEventInput & { depth: number },
): Promise<AppendProgressEventResult> {
  const { event, inserted } = await appendProgressEventRaw({
    memberId: input.memberId,
    eventType: input.eventType,
    subjectKey: input.subjectKey,
    metadata: input.metadata,
    idempotencyKey: input.idempotencyKey,
    sourceEventId: input.sourceEventId,
    stampSeason: input.stampSeason,
  });

  if (inserted) {
    await runProjectionPipeline(event, { isNew: true, depth: input.depth + 1 });
  }

  return { event, inserted };
}

export async function listMemberEvents(
  memberId: string,
  opts?: { limit?: number; eventTypes?: string[] },
): Promise<ProgressEventRow[]> {
  const supabase = await createClient();
  let q = supabase
    .from("progress_events")
    .select("*")
    .eq("member_id", memberId)
    .order("created_at", { ascending: false })
    .limit(opts?.limit ?? 200);

  if (opts?.eventTypes?.length) {
    q = q.in("event_type", opts.eventTypes);
  }

  const { data } = await q;
  return (data ?? []).map((r) => mapEventRow(r as Record<string, unknown>));
}

export function periodKeyForDate(date: Date, timezone?: string | null): string {
  try {
    const fmt = new Intl.DateTimeFormat("en-CA", {
      timeZone: timezone || "UTC",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    return fmt.format(date);
  } catch {
    return date.toISOString().slice(0, 10);
  }
}

export function weekPeriodKey(date: Date, timezone?: string | null): string {
  const day = periodKeyForDate(date, timezone);
  const d = new Date(`${day}T12:00:00Z`);
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
}

export type { ProgressEventType };
