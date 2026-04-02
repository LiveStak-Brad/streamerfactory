import type { BattleRequestWithSlots } from "./types";

/** Passed from server page into BattleSchedulerWizard and parsed from URL search params. */
export type SchedulerWizardPrefill = {
  title?: string;
  participantCount?: number;
  formatLabel?: string;
  /** ISO 8601 string; wizard converts to datetime-local in the browser. */
  scheduledAtIso?: string;
  timezone?: string;
  notes?: string;
  /** TikTok handles without @, aligned to participant slots. */
  participants?: string[];
};

export function battleRequestToSchedulerPrefill(req: BattleRequestWithSlots): SchedulerWizardPrefill {
  const slots = [...req.battle_request_slots].sort((a, b) => a.slot_order - b.slot_order);
  const participants = slots.map((s) => (s.tiktok_username ?? "").replace(/^@/, "").trim());
  return {
    title: (req.title ?? "").trim() || "Battle from Finder",
    participantCount: req.participant_count,
    formatLabel: req.preferred_format,
    scheduledAtIso: req.preferred_at ?? undefined,
    timezone: req.timezone,
    notes: req.notes ?? undefined,
    participants,
  };
}

export function schedulerPrefillToQueryString(pref: SchedulerWizardPrefill): string {
  const p = new URLSearchParams();
  if (pref.title) p.set("title", pref.title);
  if (pref.participantCount != null) p.set("participantCount", String(pref.participantCount));
  if (pref.formatLabel) p.set("formatLabel", pref.formatLabel);
  if (pref.scheduledAtIso) p.set("scheduledAtIso", pref.scheduledAtIso);
  if (pref.timezone) p.set("timezone", pref.timezone);
  if (pref.notes) p.set("notes", pref.notes);
  pref.participants?.forEach((h, i) => {
    if (h) p.set(`participant_${i}`, h);
  });
  return p.toString();
}

export function schedulerPrefillHref(req: BattleRequestWithSlots): string {
  return `/battle-hub/scheduler/new?${schedulerPrefillToQueryString(battleRequestToSchedulerPrefill(req))}`;
}

export function parseSchedulerPrefillFromSearchParams(
  sp: Record<string, string | string[] | undefined>,
): SchedulerWizardPrefill {
  const get = (k: string): string | undefined => {
    const v = sp[k];
    if (typeof v === "string") return v;
    if (Array.isArray(v) && typeof v[0] === "string") return v[0];
    return undefined;
  };
  const pc = get("participantCount");
  const count = pc ? Number(pc) : undefined;
  const participants: string[] = [];
  for (let i = 0; i < 8; i++) {
    participants.push(get(`participant_${i}`) ?? "");
  }
  while (participants.length > 0 && participants[participants.length - 1] === "") {
    participants.pop();
  }
  return {
    title: get("title"),
    participantCount: count && Number.isInteger(count) ? count : undefined,
    formatLabel: get("formatLabel"),
    scheduledAtIso: get("scheduledAtIso"),
    timezone: get("timezone"),
    notes: get("notes"),
    participants: participants.length ? participants : undefined,
  };
}
