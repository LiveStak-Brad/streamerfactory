/**
 * Daily + weekly mission assignment and event-driven completion projection.
 */

import { createClient } from "@/lib/supabase/server";
import {
  emitChildEvent,
  periodKeyForDate,
  weekPeriodKey,
} from "@/lib/growth/progress/events";
import { buildProgressSnapshot } from "@/lib/growth/progress/snapshot-build";
import { evaluateRequirement } from "@/lib/growth/requirements/evaluate";
import { getActiveSeason } from "@/lib/growth/seasons/service";
import {
  parseRequirement,
  type MissionCadence,
  type MissionCategory,
  type MissionStatus,
  type ProgressEventRow,
} from "@/lib/growth/types";

export type ProjectOpts = { depth?: number };

export type TodayMission = {
  id: string;
  template_id: string;
  key: string;
  title: string;
  description: string | null;
  category: MissionCategory;
  status: MissionStatus;
  href: string | null;
  period_key: string;
  completed_at: string | null;
  cadence?: MissionCadence;
  xpReward?: number;
};

export type WeekChallenge = TodayMission;

async function memberTimezone(
  memberId: string,
  fallback?: string | null,
): Promise<string | null> {
  if (fallback) return fallback;
  const supabase = await createClient();
  const { data } = await supabase
    .from("profiles")
    .select("timezone")
    .eq("id", memberId)
    .maybeSingle();
  return data?.timezone?.trim() || null;
}

async function ensureMissionsForCadence(
  memberId: string,
  cadence: Extract<MissionCadence, "daily" | "weekly">,
  periodKey: string,
  timezone?: string | null,
): Promise<void> {
  const supabase = await createClient();
  const season = await getActiveSeason();

  const { data: templates } = await supabase
    .from("mission_templates")
    .select(
      "id, key, title, description, category, cadence, season_id, requirement, active, sort_order, reputation_points",
    )
    .eq("active", true)
    .eq("cadence", cadence)
    .order("sort_order", { ascending: true });

  const eligible = (templates ?? []).filter(
    (t) => t.season_id == null || (season && t.season_id === season.id),
  );

  if (!eligible.length) return;

  const rows = eligible.map((t) => ({
    member_id: memberId,
    template_id: t.id,
    season_id: t.season_id ?? season?.id ?? null,
    period_key: periodKey,
    status: "active" as const,
  }));

  await supabase.from("member_missions").upsert(rows, {
    onConflict: "member_id,template_id,period_key",
    ignoreDuplicates: true,
  });

  void timezone;
}

export async function ensureDailyMissions(
  memberId: string,
  timezone?: string | null,
): Promise<TodayMission[]> {
  const tz = await memberTimezone(memberId, timezone);
  const periodKey = periodKeyForDate(new Date(), tz);
  await ensureMissionsForCadence(memberId, "daily", periodKey, tz);
  return listTodayMissions(memberId, tz);
}

export async function ensureWeeklyMissions(
  memberId: string,
  timezone?: string | null,
): Promise<WeekChallenge[]> {
  const tz = await memberTimezone(memberId, timezone);
  const periodKey = weekPeriodKey(new Date(), tz);
  await ensureMissionsForCadence(memberId, "weekly", periodKey, tz);
  return listWeekChallenges(memberId, tz);
}

/** Assign daily + weekly missions for the member's current periods. */
export async function ensureEngagementMissions(
  memberId: string,
  timezone?: string | null,
): Promise<{ daily: TodayMission[]; weekly: WeekChallenge[] }> {
  const tz = await memberTimezone(memberId, timezone);
  const [daily, weekly] = await Promise.all([
    ensureDailyMissions(memberId, tz),
    ensureWeeklyMissions(memberId, tz),
  ]);
  return { daily, weekly };
}

function periodKindFromKey(periodKey: string): "day" | "week" | null {
  if (/^\d{4}-W\d{2}$/.test(periodKey)) return "week";
  if (/^\d{4}-\d{2}-\d{2}$/.test(periodKey)) return "day";
  return null;
}

export async function projectMissionsFromEvent(
  event: ProgressEventRow,
  opts: ProjectOpts = {},
): Promise<void> {
  const depth = opts.depth ?? 0;
  const supabase = await createClient();

  const { data: active } = await supabase
    .from("member_missions")
    .select(
      "id, template_id, period_key, status, mission_templates!inner(id, key, title, requirement, active, cadence, reputation_points)",
    )
    .eq("member_id", event.member_id)
    .eq("status", "active");

  if (!active?.length) return;

  const snapshot = await buildProgressSnapshot(event.member_id);
  const tz = await memberTimezone(event.member_id);

  for (const mission of active) {
    const template = mission.mission_templates as unknown as
      | {
          id: string;
          key: string;
          title: string;
          requirement: unknown;
          active: boolean;
          cadence?: string;
          reputation_points?: number;
        }
      | {
          id: string;
          key: string;
          title: string;
          requirement: unknown;
          active: boolean;
          cadence?: string;
          reputation_points?: number;
        }[];

    const tmpl = Array.isArray(template) ? template[0] : template;
    if (!tmpl?.active) continue;

    const requirement = parseRequirement(tmpl.requirement);
    if (!requirement) continue;

    const kind =
      (tmpl.cadence === "weekly" ? "week" : tmpl.cadence === "daily" ? "day" : null) ??
      periodKindFromKey(mission.period_key);

    const result = evaluateRequirement(requirement, snapshot, {
      periodKey: mission.period_key,
      periodKind: kind ?? undefined,
      timezone: tz,
    });
    if (!result.satisfied) {
      await supabase
        .from("member_missions")
        .update({
          progress: {
            progress: result.progress,
            target: result.target,
            detail: result.detail ?? null,
          },
          updated_at: new Date().toISOString(),
        })
        .eq("id", mission.id);
      continue;
    }

    const now = new Date().toISOString();
    const { data: updated } = await supabase
      .from("member_missions")
      .update({
        status: "completed",
        completed_at: now,
        progress: {
          progress: result.progress,
          target: result.target,
          detail: result.detail ?? null,
        },
        updated_at: now,
      })
      .eq("id", mission.id)
      .eq("status", "active")
      .select("id")
      .maybeSingle();

    if (!updated) continue;

    await emitChildEvent({
      memberId: event.member_id,
      eventType: "mission_completed",
      subjectKey: tmpl.key,
      metadata: {
        template_id: tmpl.id,
        member_mission_id: mission.id,
        period_key: mission.period_key,
        title: tmpl.title,
        cadence: tmpl.cadence ?? "daily",
        xp: tmpl.reputation_points ?? 0,
      },
      idempotencyKey: `mission_completed:${tmpl.key}:${mission.period_key}`,
      sourceEventId: event.id,
      depth,
    });
  }
}

async function listMissionsForPeriod(
  memberId: string,
  periodKey: string,
): Promise<TodayMission[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("member_missions")
    .select(
      "id, template_id, period_key, status, completed_at, mission_templates!inner(key, title, description, category, cadence, reputation_points, active)",
    )
    .eq("member_id", memberId)
    .eq("period_key", periodKey)
    .order("created_at", { ascending: true });

  return (data ?? [])
    .map((row) => {
      const t = row.mission_templates as unknown as
        | {
            key: string;
            title: string;
            description: string | null;
            category: MissionCategory;
            cadence?: MissionCadence;
            reputation_points?: number;
            active: boolean;
          }
        | {
            key: string;
            title: string;
            description: string | null;
            category: MissionCategory;
            cadence?: MissionCadence;
            reputation_points?: number;
            active: boolean;
          }[];
      const tmpl = Array.isArray(t) ? t[0] : t;
      if (!tmpl) return null;
      return {
        id: row.id,
        template_id: row.template_id,
        key: tmpl.key,
        title: tmpl.title,
        description: tmpl.description ?? null,
        category: tmpl.category,
        status: row.status as MissionStatus,
        href: null,
        period_key: row.period_key,
        completed_at: row.completed_at ?? null,
        cadence: tmpl.cadence,
        xpReward: tmpl.reputation_points ?? 0,
      } satisfies TodayMission;
    })
    .filter(Boolean) as TodayMission[];
}

export async function listTodayMissions(
  memberId: string,
  timezone?: string | null,
): Promise<TodayMission[]> {
  const tz = await memberTimezone(memberId, timezone);
  return listMissionsForPeriod(memberId, periodKeyForDate(new Date(), tz));
}

export async function listWeekChallenges(
  memberId: string,
  timezone?: string | null,
): Promise<WeekChallenge[]> {
  const tz = await memberTimezone(memberId, timezone);
  return listMissionsForPeriod(memberId, weekPeriodKey(new Date(), tz));
}
