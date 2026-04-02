import type { BattleRequestType } from "./db";

export const REQUEST_TYPE_OPTIONS: { value: BattleRequestType; label: string; hint: string }[] = [
  {
    value: "need_opponent",
    label: "Need an opponent",
    hint: "You have a spot — looking for one other creator (e.g. 1v1).",
  },
  {
    value: "need_teammate",
    label: "Need a teammate",
    hint: "Recruiting for team formats (e.g. 2v2).",
  },
  {
    value: "open_match",
    label: "Open match",
    hint: "Flexible — multiple people can join until full.",
  },
  {
    value: "themed_battle",
    label: "Themed / special",
    hint: "Promo night, theme battle, or structured event.",
  },
];

export function requestTypeLabel(value: string): string {
  return REQUEST_TYPE_OPTIONS.find((o) => o.value === value)?.label ?? value.replace(/-/g, " ");
}
