/**
 * Streak projection engine + pure update helper for tests.
 */

import { createClient } from "@/lib/supabase/server";
import {
  emitChildEvent,
  periodKeyForDate,
  weekPeriodKey,
} from "@/lib/growth/progress/events";
import type { ProgressEventRow } from "@/lib/growth/types";

export type ProjectOpts = { depth?: number };

export type StreakUpdateKind = "increment" | "grace" | "break";

export type StreakUpdateInput = {
  lastCompletedOn: string | null;
  today: string;
  graceDays: number;
  current: number;
  longest?: number;
  /** Calendar days per streak period (1 = daily, 7 = weekly). */
  periodDays?: number;
};

export type StreakUpdateResult = {
  nextCurrent: number;
  longest: number;
  kind: StreakUpdateKind;
  /** True when already completed in this period — callers should skip writes. */
  alreadyCompleted?: boolean;
};

function daysBetween(a: string, b: string): number {
  const aMs = Date.parse(`${a}T12:00:00Z`);
  const bMs = Date.parse(`${b}T12:00:00Z`);
  if (Number.isNaN(aMs) || Number.isNaN(bMs)) return Number.POSITIVE_INFINITY;
  return Math.round((bMs - aMs) / 86_400_000);
}

/**
 * Pure streak transition. Consecutive periods increment; gaps within grace
 * keep the count (kind=grace); larger gaps reset to 1 (kind=break).
 */
export function computeStreakUpdate(
  input: StreakUpdateInput,
): StreakUpdateResult {
  const {
    lastCompletedOn,
    today,
    graceDays,
    current,
    longest = 0,
    periodDays = 1,
  } = input;
  const unit = Math.max(1, periodDays);

  if (!lastCompletedOn) {
    const nextCurrent = 1;
    return {
      nextCurrent,
      longest: Math.max(longest, nextCurrent),
      kind: "increment",
    };
  }

  const gapDays = daysBetween(lastCompletedOn, today);
  if (!Number.isFinite(gapDays) || gapDays < 0) {
    const nextCurrent = 1;
    return {
      nextCurrent,
      longest: Math.max(longest, nextCurrent, current),
      kind: "break",
    };
  }

  const gapPeriods = Math.round(gapDays / unit);

  if (gapPeriods === 0) {
    return {
      nextCurrent: current,
      longest: Math.max(longest, current),
      kind: "increment",
      alreadyCompleted: true,
    };
  }

  if (gapPeriods === 1) {
    const nextCurrent = current + 1;
    return {
      nextCurrent,
      longest: Math.max(longest, nextCurrent),
      kind: "increment",
    };
  }

  const missedPeriods = gapPeriods - 1;
  if (missedPeriods <= Math.max(0, graceDays)) {
    return {
      nextCurrent: current,
      longest: Math.max(longest, current),
      kind: "grace",
    };
  }

  const nextCurrent = 1;
  return {
    nextCurrent,
    longest: Math.max(longest, current, nextCurrent),
    kind: "break",
  };
}

const EVENT_STREAK_KEYS: Record<string, string[]> = {
  daily_login: ["daily_login"],
  lesson_completed: ["weekly_learning"],
  lesson_started: ["weekly_learning"],
  streameru_live_mission_completed: ["weekly_learning", "weekly_live"],
  battle_joined: ["battle_participation"],
  battle_completed: ["battle_participation"],
};

const WEEKLY_STREAK_KEYS = new Set(["weekly_learning", "weekly_live"]);

function periodAnchorDate(
  date: Date,
  timezone: string | null,
  weekly: boolean,
): string {
  if (!weekly) return periodKeyForDate(date, timezone);
  // Store the ISO week Monday as last_completed_on for weekly streaks.
  const day = periodKeyForDate(date, timezone);
  const d = new Date(`${day}T12:00:00Z`);
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() - (dayNum - 1));
  return d.toISOString().slice(0, 10);
}

export async function projectStreaksFromEvent(
  event: ProgressEventRow,
  opts: ProjectOpts = {},
): Promise<void> {
  const depth = opts.depth ?? 0;
  const streakKeys = EVENT_STREAK_KEYS[event.event_type];
  if (!streakKeys?.length) return;

  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("timezone")
    .eq("id", event.member_id)
    .maybeSingle();
  const tz = profile?.timezone?.trim() || null;
  const eventDate = new Date(event.created_at);

  const { data: defs } = await supabase
    .from("streak_definitions")
    .select("key, grace_days, active")
    .in("key", streakKeys)
    .eq("active", true);

  if (!defs?.length) return;

  for (const def of defs) {
    const weekly = WEEKLY_STREAK_KEYS.has(def.key);
    const today = periodAnchorDate(eventDate, tz, weekly);

    const { data: row } = await supabase
      .from("member_streaks")
      .select(
        "id, current_count, longest_count, last_completed_on, grace_used_at",
      )
      .eq("member_id", event.member_id)
      .eq("streak_key", def.key)
      .maybeSingle();

    const update = computeStreakUpdate({
      lastCompletedOn: row?.last_completed_on ?? null,
      today,
      graceDays: def.grace_days ?? 0,
      current: row?.current_count ?? 0,
      longest: row?.longest_count ?? 0,
      periodDays: weekly ? 7 : 1,
    });

    if (update.alreadyCompleted) continue;

    const now = new Date().toISOString();
    const payload = {
      member_id: event.member_id,
      streak_key: def.key,
      current_count: update.nextCurrent,
      longest_count: update.longest,
      last_completed_on: today,
      grace_used_at: update.kind === "grace" ? now : row?.grace_used_at ?? null,
      updated_at: now,
    };

    await supabase.from("member_streaks").upsert(payload, {
      onConflict: "member_id,streak_key",
    });

    await supabase.from("streak_events").insert({
      member_id: event.member_id,
      streak_key: def.key,
      event_kind: update.kind,
      count_after: update.nextCurrent,
      progress_event_id: event.id,
    });

    if (update.kind === "increment") {
      await emitChildEvent({
        memberId: event.member_id,
        eventType: "streak_incremented",
        subjectKey: def.key,
        metadata: {
          streak_key: def.key,
          current: update.nextCurrent,
          longest: update.longest,
          week: weekly ? weekPeriodKey(eventDate, tz) : undefined,
        },
        idempotencyKey: `streak_incremented:${def.key}:${today}`,
        sourceEventId: event.id,
        depth,
      });
    } else if (update.kind === "break") {
      await emitChildEvent({
        memberId: event.member_id,
        eventType: "streak_broken",
        subjectKey: def.key,
        metadata: {
          streak_key: def.key,
          previous: row?.current_count ?? 0,
          current: update.nextCurrent,
        },
        idempotencyKey: `streak_broken:${def.key}:${today}`,
        sourceEventId: event.id,
        depth,
      });
    }
  }
}
