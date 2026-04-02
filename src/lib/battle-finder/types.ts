import type { BattleRequestRow, BattleRequestSlotRow } from "./db";

export type { BattleRequestRow, BattleRequestSlotRow };
export type { BattleRequestStatus, BattleRequestType } from "./db";

export type BattleRequestWithSlots = BattleRequestRow & {
  battle_request_slots: BattleRequestSlotRow[];
};
