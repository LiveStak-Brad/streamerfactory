import { createClient } from "@/lib/supabase/server";

import type { BattleRequestWithSlots } from "./types";

function mapRequest(r: unknown): BattleRequestWithSlots {
  const row = r as BattleRequestWithSlots & {
    promoted_battle_event_id?: string | null;
    promoted_at?: string | null;
  };
  const slots = [...(row.battle_request_slots ?? [])].sort((a, b) => a.slot_order - b.slot_order);
  return {
    ...row,
    promoted_battle_event_id: row.promoted_battle_event_id ?? null,
    promoted_at: row.promoted_at ?? null,
    battle_request_slots: slots,
  };
}

export async function listOpenBattleRequests(limit = 40): Promise<BattleRequestWithSlots[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("battle_requests")
    .select("*, battle_request_slots(*)")
    .eq("status", "open")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);
  return (data ?? []).map(mapRequest);
}

export async function getBattleRequestById(id: string): Promise<BattleRequestWithSlots | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("battle_requests")
    .select("*, battle_request_slots(*)")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) return null;
  return mapRequest(data);
}
