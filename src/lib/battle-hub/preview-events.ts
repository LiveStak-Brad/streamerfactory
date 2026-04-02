import type { BattleEventWithParticipants } from "./types";

const ZERO = "00000000-0000-0000-0000-000000000000";

/** Sample battles for the public calendar preview (dates relative to request time). */
export function generatePreviewBattleEvents(): BattleEventWithParticipants[] {
  const now = new Date();
  const at = (daysFromNow: number, hour: number, minute = 0) => {
    const d = new Date(now);
    d.setDate(d.getDate() + daysFromNow);
    d.setHours(hour, minute, 0, 0);
    return d.toISOString();
  };

  const mk = (
    id: string,
    title: string,
    scheduled_at: string,
    timezone: string,
    format_label: string,
    participant_count: number,
    handles: string[],
    notes: string | null,
  ): BattleEventWithParticipants => ({
    id,
    created_by: ZERO,
    title,
    event_type: "battle",
    participant_count,
    format_label,
    scheduled_at,
    timezone,
    notes,
    status: "scheduled",
    created_at: now.toISOString(),
    updated_at: now.toISOString(),
    battle_event_participants: handles.map((tiktok_username, i) => ({
      id: `${id}-p${i}`,
      battle_event_id: id,
      profile_id: null,
      tiktok_username,
      team_label: participant_count > 2 ? (i < 2 ? "A" : "B") : null,
      slot_order: i,
      created_at: now.toISOString(),
      flyer_avatar_url: null,
    })),
  });

  return [
    mk(
      "preview-1",
      "After-dark duel (sample)",
      at(1, 18, 30),
      "America/Los_Angeles",
      "1v1",
      2,
      ["host_live", "guest_pk"],
      "Sample event — sign in to see live network battles.",
    ),
    mk(
      "preview-2",
      "Network showcase (sample)",
      at(3, 20, 0),
      "America/New_York",
      "2v2",
      4,
      ["creator_one", "creator_two", "creator_three", "creator_four"],
      null,
    ),
    mk(
      "preview-3",
      "Weekend FFA (sample)",
      at(5, 19, 0),
      "America/Chicago",
      "ffa",
      6,
      ["a1", "a2", "a3", "a4", "a5", "a6"],
      null,
    ),
    mk(
      "preview-4",
      "Promo block (sample)",
      at(10, 21, 0),
      "America/New_York",
      "1v1",
      2,
      ["promo_host", "brand_guest"],
      null,
    ),
    mk(
      "preview-5",
      "Late-night 2v2 (sample)",
      at(14, 22, 0),
      "America/Denver",
      "2v2",
      4,
      ["teamA1", "teamA2", "teamB1", "teamB2"],
      null,
    ),
  ];
}
