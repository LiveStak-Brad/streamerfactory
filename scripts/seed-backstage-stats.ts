/**
 * Seed Creator Network backstage stats and recalculate monthly rankings.
 *
 * Requires in .env.local:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *   (optional) SUPABASE_DB_URL — not required; uses service role API
 *
 * Run: npx tsx scripts/seed-backstage-stats.ts
 */

import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { createClient } from "@supabase/supabase-js";
import {
  BACKSTAGE_STAT_SEEDS,
  normalizeHandle,
  resolveCanonicalHandle,
} from "../src/lib/rankings/backstage-seed-data";
import { periodBounds } from "../src/lib/rankings/periods";
import { assignRanks, computeRankings } from "../src/lib/rankings/scoring";

function loadEnvLocal() {
  const p = join(process.cwd(), ".env.local");
  if (!existsSync(p)) return;
  for (const line of readFileSync(p, "utf8").split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i < 0) continue;
    const key = t.slice(0, i).trim();
    let val = t.slice(i + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = val;
  }
}

loadEnvLocal();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey?.trim()) {
  console.error("Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const NETWORK_ROLES = ["member", "editor", "admin", "owner"] as const;

async function main() {
  const { periodStart, periodEnd } = periodBounds("monthly");

  const { data: profiles, error: profErr } = await supabase
    .from("profiles")
    .select("id, role, email, tiktok_username")
    .in("role", [...NETWORK_ROLES]);

  if (profErr) throw new Error(profErr.message);

  const { data: apps } = await supabase.from("applications").select("user_id, tiktok_username");

  const handleToProfileId = new Map<string, string>();

  for (const p of profiles ?? []) {
    const raw = (p.tiktok_username as string | null)?.trim();
    if (raw) {
      handleToProfileId.set(normalizeHandle(raw), p.id as string);
    }
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

    const row = {
      profile_id: pid,
      period_start: periodStart,
      period_end: periodEnd,
      coins_earned: seed.diamondsEarned,
      days_streamed: seed.validLiveDays,
      hours_streamed: seed.hoursStreamed,
      activeness_level: seed.activeness,
      follower_count: 0,
      follower_growth: seed.followerGrowth,
      battles_played: seed.battlesPlayed,
      battles_won: seed.battlesWon,
    };

    const { error } = await supabase.from("creator_performance_stats").upsert(row, {
      onConflict: "profile_id,period_start,period_end",
    });

    if (error) {
      console.error(`Failed ${seed.handle}:`, error.message);
      missing.push(`${seed.handle} (${error.message})`);
    } else {
      inserted.push(seed.handle);
    }
  }

  const { data: statRows, error: statErr } = await supabase
    .from("creator_performance_stats")
    .select("profile_id, coins_earned, days_streamed, hours_streamed, activeness_level, battles_played, battles_won")
    .eq("period_start", periodStart)
    .eq("period_end", periodEnd);

  if (statErr) throw new Error(statErr.message);

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

  await supabase.from("creator_rankings").delete().eq("ranking_period", "monthly").eq("period_start", periodStart);

  if (ranked.length > 0) {
    const { error: rankInsertErr } = await supabase.from("creator_rankings").insert(
      ranked.map((r) => ({
        profile_id: r.profile_id,
        ranking_period: "monthly",
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
    if (rankInsertErr) throw new Error(rankInsertErr.message);
  }

  console.log("\n=== Backstage seed complete ===");
  console.log(`Period: ${periodStart} → ${periodEnd}`);
  console.log(`Stats saved: ${inserted.length}`);
  inserted.forEach((h) => console.log(`  ✓ ${h}`));
  if (missing.length) {
    console.log(`\nNo matching profile (set tiktok_username on their account): ${missing.length}`);
    missing.forEach((h) => console.log(`  ✗ ${h}`));
  }
  console.log(`\nRankings recalculated: ${ranked.length} creators`);
  ranked
    .sort((a, b) => a.rank_position - b.rank_position)
    .slice(0, 10)
    .forEach((r) => {
      const h = [...handleToProfileId.entries()].find(([, id]) => id === r.profile_id)?.[0] ?? r.profile_id;
      console.log(`  #${r.rank_position} ${h} — score ${r.rank_score}`);
    });
  console.log("\nOpen /rankings to view the leaderboard.\n");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
