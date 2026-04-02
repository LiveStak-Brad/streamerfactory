import type { BattleRequestWithSlots } from "./types";

export function slotFillSummary(req: BattleRequestWithSlots): { filled: number; total: number; open: number } {
  const slots = req.battle_request_slots ?? [];
  const total = req.participant_count;
  const filled = slots.filter((s) => s.joined_by != null).length;
  const open = slots.filter((s) => s.joined_by == null && s.slot_order > 0).length;
  return { filled, total, open };
}
