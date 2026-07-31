/**
 * Detect Creator Rank ups when reputation (XP) is earned.
 */

import { createClient } from "@/lib/supabase/server";
import { emitChildEvent } from "@/lib/growth/progress/events";
import { didRankUp, getCreatorRank } from "@/lib/growth/xp/creator-rank";
import type { ProgressEventRow } from "@/lib/growth/types";

export type ProjectOpts = { depth?: number };

export async function projectCreatorRankFromEvent(
  event: ProgressEventRow,
  opts: ProjectOpts = {},
): Promise<void> {
  if (event.event_type !== "reputation_earned") return;

  const depth = opts.depth ?? 0;
  const points = Number(event.metadata?.points ?? 0);
  if (!Number.isFinite(points) || points <= 0) return;

  const supabase = await createClient();
  const { data } = await supabase
    .from("reputation_ledger")
    .select("points")
    .eq("member_id", event.member_id);

  const total = (data ?? []).reduce((sum, r) => sum + (Number(r.points) || 0), 0);
  const prev = total - points;
  if (!didRankUp(prev, total)) return;

  const rank = getCreatorRank(total);
  await emitChildEvent({
    memberId: event.member_id,
    eventType: "creator_rank_up",
    subjectKey: rank.tier.key,
    metadata: {
      level: rank.level,
      tier_key: rank.tier.key,
      tier_name: rank.tier.name,
      xp: rank.xp,
    },
    idempotencyKey: `creator_rank_up:${rank.tier.key}`,
    sourceEventId: event.id,
    depth,
  });
}
