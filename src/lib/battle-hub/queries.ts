import { createClient } from "@/lib/supabase/server";
import type { BattleParticipantRow, BattleEventWithParticipants } from "./types";

function sortParticipants(ev: BattleEventWithParticipants): BattleEventWithParticipants {
  const parts = ev.battle_event_participants ?? [];
  return {
    ...ev,
    battle_event_participants: [...parts].sort((a, b) => a.slot_order - b.slot_order),
  };
}

type ServerClient = Awaited<ReturnType<typeof createClient>>;

/** PostgREST may return `{ id }[]` for `returns table`; tolerate alternate shapes. */
function normalizeRpcIdRows(rows: unknown): string[] {
  if (!Array.isArray(rows)) return [];
  return rows
    .map((r) => {
      if (typeof r === "string") return r;
      if (r && typeof r === "object" && "id" in r) return String((r as { id: string }).id);
      return "";
    })
    .filter((s) => s.length > 0);
}

/** Load events + participants in two queries (avoids nested embed + RLS quirks). Preserves `ids` order. */
async function fetchEventsWithParticipantsByIds(
  supabase: ServerClient,
  ids: string[],
): Promise<BattleEventWithParticipants[]> {
  if (ids.length === 0) return [];
  const { data: events, error: e1 } = await supabase.from("battle_events").select("*").in("id", ids);
  if (e1) throw new Error(e1.message);
  const { data: parts, error: e2 } = await supabase
    .from("battle_event_participants")
    .select("*")
    .in("battle_event_id", ids);
  if (e2) throw new Error(e2.message);

  const byId = new Map<string, BattleEventWithParticipants>();
  for (const row of events ?? []) {
    const ev = row as BattleEventWithParticipants;
    byId.set(ev.id, { ...ev, battle_event_participants: [] });
  }
  for (const p of parts ?? []) {
    const pr = p as BattleParticipantRow;
    const ev = byId.get(pr.battle_event_id);
    if (ev) {
      ev.battle_event_participants = ev.battle_event_participants ?? [];
      ev.battle_event_participants.push(pr);
    }
  }

  return ids
    .map((id) => {
      const ev = byId.get(id);
      return ev ? sortParticipants(ev) : null;
    })
    .filter((x): x is BattleEventWithParticipants => x != null);
}

/** Upcoming scheduled battles on the shared network calendar (soonest first). */
export async function getUpcomingBattleEvents(limit = 50): Promise<BattleEventWithParticipants[]> {
  const supabase = await createClient();
  const { data: idRows, error: rpcErr } = await supabase.rpc("list_upcoming_battle_event_ids", {
    p_limit: limit,
  });

  let ids: string[];
  if (!rpcErr && Array.isArray(idRows)) {
    ids = normalizeRpcIdRows(idRows);
  } else {
    const now = new Date().toISOString();
    const { data: rows, error } = await supabase
      .from("battle_events")
      .select("id")
      .eq("status", "scheduled")
      .gte("scheduled_at", now)
      .order("scheduled_at", { ascending: true })
      .limit(limit);
    if (error) throw new Error(error.message);
    ids = (rows ?? []).map((r) => r.id);
  }

  return fetchEventsWithParticipantsByIds(supabase, ids);
}

/** Nearest upcoming network battle, if any. */
export async function getNextUpcomingNetworkBattle(): Promise<BattleEventWithParticipants | null> {
  const rows = await getUpcomingBattleEvents(1);
  return rows[0] ?? null;
}

/** Your upcoming scheduled battles (as creator), soonest first. */
export async function getMyUpcomingBattleEvents(
  userId: string,
  limit = 5,
): Promise<BattleEventWithParticipants[]> {
  const supabase = await createClient();
  const { data: idRows, error: rpcErr } = await supabase.rpc("list_my_upcoming_battle_event_ids", {
    p_user_id: userId,
    p_limit: limit,
  });

  let ids: string[];
  if (!rpcErr && Array.isArray(idRows)) {
    ids = normalizeRpcIdRows(idRows);
  } else {
    const now = new Date().toISOString();
    const { data: rows, error } = await supabase
      .from("battle_events")
      .select("id")
      .eq("created_by", userId)
      .eq("status", "scheduled")
      .gte("scheduled_at", now)
      .order("scheduled_at", { ascending: true })
      .limit(limit);
    if (error) throw new Error(error.message);
    ids = (rows ?? []).map((r) => r.id);
  }

  return fetchEventsWithParticipantsByIds(supabase, ids);
}

/** Total battles ever created by this user (for lightweight context). */
export async function countBattlesCreatedBy(userId: string): Promise<number> {
  const supabase = await createClient();
  const { count, error } = await supabase
    .from("battle_events")
    .select("*", { count: "exact", head: true })
    .eq("created_by", userId);

  if (error) return 0;
  return count ?? 0;
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
  return (data ?? []).map((r) => sortParticipants(r as BattleEventWithParticipants));
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
