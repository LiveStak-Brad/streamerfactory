/** DB row shapes for battle_requests / battle_request_slots (see migration 20250420100000). */

export type BattleRequestStatus = "open" | "matched" | "closed" | "cancelled";

export type BattleRequestType = "need_opponent" | "need_teammate" | "open_match" | "themed_battle";

export type BattleRequestRow = {
  id: string;
  created_by: string;
  title: string | null;
  creator_display_handle: string;
  request_type: string;
  participant_count: number;
  preferred_format: string;
  preferred_at: string | null;
  timezone: string;
  notes: string | null;
  status: BattleRequestStatus;
  /** Set when this request was promoted to `battle_events`. */
  promoted_battle_event_id: string | null;
  promoted_at: string | null;
  created_at: string;
  updated_at: string;
};

export type BattleRequestSlotRow = {
  id: string;
  battle_request_id: string;
  slot_order: number;
  slot_type: string;
  joined_by: string | null;
  tiktok_username: string | null;
  created_at: string;
  updated_at: string;
};
