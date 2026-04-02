import { createClient } from "@/lib/supabase/server";
import type { BattleEventWithParticipants } from "./types";

function mapEvent(row: BattleEventWithParticipants | null): BattleEventWithParticipants | null {
  if (!row) return null;
  return row;
}

/** Upcoming + recent scheduled battles for the shared calendar (public). */
export async function getUpcomingBattleEvents(limit = 50): Promise<BattleEventWithParticipants[]> {
  const supabase = await createClient();
  const now = new Date().toISOString();
  const { data, error } = await supabase
    .from("battle_events")
    .select("*, battle_event_participants (*)")
    .eq("status", "scheduled")
    .gte("scheduled_at", now)
    .order("scheduled_at", { ascending: true })
    .limit(limit);

  if (error) throw new Error(error.message);
  return (data ?? []).map((r) => mapEvent(r as BattleEventWithParticipants)!);
}

export async function getMyBattleEvents(userId: string): Promise<BattleEventWithParticipants[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("battle_events")
    .select("*, battle_event_participants (*)")
    .eq("created_by", userId)
    .order("scheduled_at", { ascending: false })
    .limit(40);

  if (error) throw new Error(error.message);
  return (data ?? []).map((r) => mapEvent(r as BattleEventWithParticipants)!);
}

/** Owner/admin: all events including cancelled (for dashboard). */
export async function getAllBattleEventsForAdmin(limit = 200): Promise<BattleEventWithParticipants[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("battle_events")
    .select("*, battle_event_participants (*)")
    .order("scheduled_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);
  const rows = (data ?? []) as BattleEventWithParticipants[];
  for (const ev of rows) {
    const parts = ev.battle_event_participants ?? [];
    ev.battle_event_participants = [...parts].sort((a, b) => a.slot_order - b.slot_order);
  }
  return rows;
}

export async function getBattleEventByIdForAdmin(id: string): Promise<BattleEventWithParticipants | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("battle_events")
    .select("*, battle_event_participants (*)")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) return null;
  const ev = data as BattleEventWithParticipants;
  const parts = ev.battle_event_participants ?? [];
  ev.battle_event_participants = [...parts].sort((a, b) => a.slot_order - b.slot_order);
  return ev;
}
