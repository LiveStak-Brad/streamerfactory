/**
 * Achievement unlock projection — evaluate once, unlock once.
 */

import { createClient } from "@/lib/supabase/server";
import { emitChildEvent } from "@/lib/growth/progress/events";
import { buildProgressSnapshot } from "@/lib/growth/progress/snapshot-build";
import { evaluateRequirement } from "@/lib/growth/requirements/evaluate";
import { getActiveSeason } from "@/lib/growth/seasons/service";
import { parseRequirement, type ProgressEventRow } from "@/lib/growth/types";

export type ProjectOpts = { depth?: number };

export async function projectAchievementsFromEvent(
  event: ProgressEventRow,
  opts: ProjectOpts = {},
): Promise<void> {
  const depth = opts.depth ?? 0;
  const supabase = await createClient();
  const season = await getActiveSeason();

  const { data: defs } = await supabase
    .from("achievement_definitions")
    .select(
      "id, key, name, description, icon, season_id, requirement, active",
    )
    .eq("active", true);

  if (!defs?.length) return;

  const eligible = defs.filter(
    (d) => d.season_id == null || (season && d.season_id === season.id),
  );
  if (!eligible.length) return;

  const snapshot = await buildProgressSnapshot(event.member_id);

  const { data: existing } = await supabase
    .from("member_achievements")
    .select("id, achievement_key, season_id, unlocked_at")
    .eq("member_id", event.member_id);

  const findRow = (key: string, seasonId: string | null) =>
    (existing ?? []).find(
      (r) =>
        r.achievement_key === key &&
        (r.season_id ?? null) === (seasonId ?? null),
    );

  for (const def of eligible) {
    const seasonScope = def.season_id ?? null;
    const prior = findRow(def.key, seasonScope);
    if (prior?.unlocked_at) continue;

    const requirement = parseRequirement(def.requirement);
    if (!requirement) continue;

    const result = evaluateRequirement(requirement, {
      ...snapshot,
      seasonId: seasonScope ?? snapshot.seasonId,
    });

    const progressBlob = {
      progress: result.progress,
      target: result.target,
      detail: result.detail ?? null,
    };

    if (!result.satisfied) {
      if (prior) {
        await supabase
          .from("member_achievements")
          .update({
            progress: progressBlob,
            updated_at: new Date().toISOString(),
          })
          .eq("id", prior.id)
          .is("unlocked_at", null);
      } else {
        await supabase.from("member_achievements").insert({
          member_id: event.member_id,
          achievement_id: def.id,
          achievement_key: def.key,
          season_id: seasonScope,
          progress: progressBlob,
          unlocked_at: null,
        });
      }
      continue;
    }

    const now = new Date().toISOString();

    if (prior) {
      const { data: updated } = await supabase
        .from("member_achievements")
        .update({
          progress: progressBlob,
          unlocked_at: now,
          updated_at: now,
        })
        .eq("id", prior.id)
        .is("unlocked_at", null)
        .select("id")
        .maybeSingle();
      if (!updated) continue;
    } else {
      const { error } = await supabase.from("member_achievements").insert({
        member_id: event.member_id,
        achievement_id: def.id,
        achievement_key: def.key,
        season_id: seasonScope,
        progress: progressBlob,
        unlocked_at: now,
        updated_at: now,
      });
      if (error) continue;
    }

    await emitChildEvent({
      memberId: event.member_id,
      eventType: "achievement_unlocked",
      subjectKey: def.key,
      metadata: {
        achievement_key: def.key,
        name: def.name,
        description: def.description,
        icon: def.icon,
        season_id: seasonScope,
      },
      idempotencyKey: `achievement_unlocked:${def.key}:${seasonScope ?? "lifetime"}`,
      sourceEventId: event.id,
      depth,
    });
  }
}
