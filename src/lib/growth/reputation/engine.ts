/**
 * Factory Reputation projection — ledger + title unlocks.
 */

import { createClient } from "@/lib/supabase/server";
import {
  emitChildEvent,
  periodKeyForDate,
} from "@/lib/growth/progress/events";
import { buildProgressSnapshot } from "@/lib/growth/progress/snapshot-build";
import { evaluateRequirement } from "@/lib/growth/requirements/evaluate";
import { getActiveSeason } from "@/lib/growth/seasons/service";
import { STAFF_APPOINTMENT_TITLE_KEYS } from "@/lib/growth/career/path";
import { parseRequirement, type ProgressEventRow } from "@/lib/growth/types";

export type ProjectOpts = { depth?: number };

const STAFF_ONLY_TITLES = new Set<string>(STAFF_APPOINTMENT_TITLE_KEYS);

async function lifetimeReputation(memberId: string): Promise<number> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("reputation_ledger")
    .select("points")
    .eq("member_id", memberId);

  return (data ?? []).reduce((sum, r) => sum + (r.points ?? 0), 0);
}

async function countRuleToday(
  memberId: string,
  ruleKey: string,
  dayKey: string,
  timezone: string | null,
): Promise<number> {
  const supabase = await createClient();
  // Approximate day bounds in member TZ via created_at filter on UTC day window ±1d,
  // then filter in JS with periodKeyForDate for accuracy.
  const start = new Date(`${dayKey}T00:00:00Z`);
  start.setUTCDate(start.getUTCDate() - 1);
  const end = new Date(`${dayKey}T23:59:59Z`);
  end.setUTCDate(end.getUTCDate() + 1);

  const { data } = await supabase
    .from("reputation_ledger")
    .select("created_at")
    .eq("member_id", memberId)
    .eq("rule_key", ruleKey)
    .gte("created_at", start.toISOString())
    .lte("created_at", end.toISOString());

  return (data ?? []).filter(
    (r) => periodKeyForDate(new Date(r.created_at), timezone) === dayKey,
  ).length;
}

export async function projectReputationFromEvent(
  event: ProgressEventRow,
  opts: ProjectOpts = {},
): Promise<void> {
  const depth = opts.depth ?? 0;
  const supabase = await createClient();
  const season = await getActiveSeason();

  const { data: rules } = await supabase
    .from("reputation_rules")
    .select(
      "id, key, name, event_type, points, max_per_day, season_scoped, active",
    )
    .eq("active", true)
    .eq("event_type", event.event_type);

  if (!rules?.length) return;

  const { data: profile } = await supabase
    .from("profiles")
    .select("timezone")
    .eq("id", event.member_id)
    .maybeSingle();
  const tz = profile?.timezone?.trim() || null;
  const dayKey = periodKeyForDate(new Date(event.created_at), tz);

  for (const rule of rules) {
    if (rule.season_scoped && season && event.season_id && event.season_id !== season.id) {
      continue;
    }

    // Skip if this event already ledgered for this rule.
    const { data: existing } = await supabase
      .from("reputation_ledger")
      .select("id")
      .eq("progress_event_id", event.id)
      .eq("rule_key", rule.key)
      .maybeSingle();
    if (existing) continue;

    if (rule.max_per_day != null) {
      const used = await countRuleToday(
        event.member_id,
        rule.key,
        dayKey,
        tz,
      );
      if (used >= rule.max_per_day) continue;
    }

    const seasonId = rule.season_scoped
      ? (event.season_id ?? season?.id ?? null)
      : event.season_id ?? season?.id ?? null;

    const { error } = await supabase.from("reputation_ledger").insert({
      member_id: event.member_id,
      points: rule.points,
      reason: rule.name,
      rule_key: rule.key,
      season_id: seasonId,
      progress_event_id: event.id,
    });

    if (error) {
      // Unique (progress_event_id, rule_key) race — ignore.
      continue;
    }

    await emitChildEvent({
      memberId: event.member_id,
      eventType: "reputation_earned",
      subjectKey: rule.key,
      metadata: {
        rule_key: rule.key,
        points: rule.points,
        reason: rule.name,
      },
      idempotencyKey: `reputation_earned:${event.id}:${rule.key}`,
      sourceEventId: event.id,
      depth,
    });
  }

  const total = await lifetimeReputation(event.member_id);
  const snapshot = await buildProgressSnapshot(event.member_id);

  const { data: titles } = await supabase
    .from("reputation_titles")
    .select("key, name, description, icon, min_reputation, requirement, active")
    .eq("active", true)
    .order("min_reputation", { ascending: true });

  if (!titles?.length) return;

  const { data: owned } = await supabase
    .from("member_reputation_titles")
    .select("title_key")
    .eq("member_id", event.member_id);

  const ownedKeys = new Set((owned ?? []).map((r) => r.title_key));

  for (const title of titles) {
    // Mentor / Manager are appointments — eligibility is tracked separately.
    if (STAFF_ONLY_TITLES.has(title.key)) continue;
    if (ownedKeys.has(title.key)) continue;
    if (total < (title.min_reputation ?? 0)) continue;

    const requirement = parseRequirement(title.requirement);
    if (requirement) {
      const result = evaluateRequirement(requirement, snapshot);
      if (!result.satisfied) continue;
    } else if (
      title.requirement &&
      typeof title.requirement === "object" &&
      Object.keys(title.requirement as object).length > 0
    ) {
      // Non-empty but unparseable — skip rather than invent unlocks.
      continue;
    }

    const { error } = await supabase.from("member_reputation_titles").insert({
      member_id: event.member_id,
      title_key: title.key,
      unlocked_at: new Date().toISOString(),
      progress_event_id: event.id,
    });
    if (error) continue;

    ownedKeys.add(title.key);

    await emitChildEvent({
      memberId: event.member_id,
      eventType: "title_unlocked",
      subjectKey: title.key,
      metadata: {
        title_key: title.key,
        name: title.name,
        description: title.description,
        icon: title.icon,
        reputation: total,
      },
      idempotencyKey: `title_unlocked:${title.key}`,
      sourceEventId: event.id,
      depth,
    });
  }
}
