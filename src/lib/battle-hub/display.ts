import type { BattleParticipantRow } from "./types";

/** Schedule line for hub cards (event timezone). */
export function formatBattleScheduleTime(iso: string, timeZone: string): string {
  const tz = timeZone || "UTC";
  try {
    return new Date(iso).toLocaleString("en-US", {
      timeZone: tz,
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short",
    });
  } catch {
    return new Date(iso).toLocaleString("en-US");
  }
}

export function formatParticipantHandles(participants: BattleParticipantRow[] | null | undefined): string {
  const list = participants ?? [];
  if (list.length === 0) return "Participants to be confirmed";
  return list
    .map((p) => {
      const h = p.tiktok_username.replace(/^@/, "");
      return `@${h}`;
    })
    .join(" · ");
}

export function battleTitleOrFallback(title: string | null | undefined): string {
  const t = (title ?? "").trim();
  return t.length > 0 ? t : "Scheduled battle";
}
