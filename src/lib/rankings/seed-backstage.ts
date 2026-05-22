import { createServiceRoleClient } from "@/lib/supabase/service-role";
import {
  BACKSTAGE_STAT_SEEDS,
  normalizeHandle,
  resolveCanonicalHandle,
} from "@/lib/rankings/backstage-seed-data";
import { periodBounds } from "@/lib/rankings/periods";
import { assignRanks, computeRankings } from "@/lib/rankings/scoring";

const NETWORK_ROLES = ["member", "editor", "admin", "owner"] as const;

export type SeedBackstageResult = {
  ok: true;
  periodStart: string;
  periodEnd: string;
  inserted: string[];
  missing: string[];
  rankedCount: number;
  topFive: Array<{ handle: string; rank_position: number; rank_score: number }>;
} | { ok: false; error: string };

export async function seedBackstageStatsFromSnapshots(): Promise<SeedBackstageResult> {
  const supabase = createServiceRoleClient();
  if (!supabase) {
    return {
      ok: false,
      error: "SUPABASE_SERVICE_ROLE_KEY is not set on the server. Add it in Vercel / .env.local.",
    };
  }

  const { periodStart, periodEnd } = periodBounds("weekly");

  const { data: profiles, error: profErr } = await supabase
    .from("profiles")
    .select("id, role, tiktok_username")
    .in("role", [...NETWORK_ROLES]);

  if (profErr) return { ok: false, error: profErr.message };

  const { data: apps } = await supabase.from("applications").select("user_id, tiktok_username");

  const handleToProfileId = new Map<string, string>();

  for (const p of profiles ?? []) {
    const raw = (p.tiktok_username as string | null)?.trim();
    if (raw) handleToProfileId.set(normalizeHandle(raw), p.id as string);
  }

  for (const a of apps ?? []) {
    if (!a.user_id || !a.tiktok_username) continue;
    const n = normalizeHandle(a.tiktok_username as string);
    if (!handleToProfileId.has(n)) {
      handleToProfileId.set(n, a.user_id as string);
      await supabase.from("profiles").update({ tiktok_username: a.tiktok_username }).eq("id", a.user_id);
    }
  }

  const inserted: string[] = [];
  const missing: string[] = [];

  for (const seed of BACKSTAGE_STAT_SEEDS) {
    const canonical = resolveCanonicalHandle(seed.handle);
    const pid =
      handleToProfileId.get(normalizeHandle(canonical)) ??
      handleToProfileId.get(normalizeHandle(seed.handle));

    if (!pid) {
      missing.push(seed.handle);
      continue;
    }

    const { error } = await supabase.from("creator_performance_stats").upsert(
      {
        profile_id: pid,
        period_start: periodStart,
        period_end: periodEnd,
        coins_earned: seed.coinsCents,
        days_streamed: seed.validLiveDays,
        hours_streamed: seed.hoursStreamed,
        activeness_level: seed.activeness,
        follower_count: 0,
        follower_growth: seed.followerGrowth,
        battles_played: seed.battlesPlayed,
        battles_won: seed.battlesWon,
      },
      { onConflict: "profile_id,period_start,period_end" },
    );

    if (error) missing.push(`${seed.handle}: ${error.message}`);
    else inserted.push(seed.handle);
  }

  const { data: statRows, error: statErr } = await supabase
    .from("creator_performance_stats")
    .select("profile_id, coins_earned, days_streamed, hours_streamed, activeness_level, battles_played, battles_won")
    .eq("period_start", periodStart)
    .eq("period_end", periodEnd);

  if (statErr) return { ok: false, error: statErr.message };

  const statsForScoring = (statRows ?? []).map((r) => ({
    profile_id: r.profile_id as string,
    coins_earned: r.coins_earned as number,
    days_streamed: r.days_streamed as number,
    hours_streamed: Number(r.hours_streamed),
    activeness_level: r.activeness_level as "none" | "low" | "medium" | "high" | "elite",
    battles_played: r.battles_played as number,
    battles_won: r.battles_won as number,
  }));

  const ranked = assignRanks(computeRankings(statsForScoring));

  await supabase.from("creator_rankings").delete().eq("ranking_period", "weekly").eq("period_start", periodStart);

  if (ranked.length > 0) {
    const { error: rankInsertErr } = await supabase.from("creator_rankings").insert(
      ranked.map((r) => ({
        profile_id: r.profile_id,
        ranking_period: "weekly",
        period_start: periodStart,
        period_end: periodEnd,
        rank_score: r.rank_score,
        rank_position: r.rank_position,
        coins_rank: r.coins_rank,
        hours_rank: r.hours_rank,
        activity_rank: r.activity_rank,
        battle_rank: r.battle_rank,
        calculated_at: new Date().toISOString(),
      })),
    );
    if (rankInsertErr) return { ok: false, error: rankInsertErr.message };
  }

  const profileIdToHandle = new Map<string, string>();
  for (const [h, id] of handleToProfileId) profileIdToHandle.set(id, h);

  const topFive = ranked
    .sort((a, b) => a.rank_position - b.rank_position)
    .slice(0, 5)
    .map((r) => ({
      handle: profileIdToHandle.get(r.profile_id) ?? r.profile_id.slice(0, 8),
      rank_position: r.rank_position,
      rank_score: r.rank_score,
    }));

  return {
    ok: true,
    periodStart,
    periodEnd,
    inserted,
    missing,
    rankedCount: ranked.length,
    topFive,
  };
}
