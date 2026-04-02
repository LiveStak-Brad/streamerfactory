"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { BattleFlyerShareModal } from "@/components/battle-hub/BattleFlyerShareModal";
import { displayHandle } from "@/components/battle-hub/BattleFlyerPreview";
import type { BattleEventWithParticipants } from "@/lib/battle-hub/types";

type Scope = "all" | "week" | "month";
type CalView = "list" | "month";

function formatWhen(iso: string, tz: string) {
  try {
    return new Date(iso).toLocaleString("en-US", {
      timeZone: tz,
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return new Date(iso).toLocaleString("en-US");
  }
}

function dayKeyLocal(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-CA", {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });
}

function dayHeadingLabel(iso: string): string {
  const d = new Date(iso);
  const startOf = (x: Date) =>
    new Date(x.getFullYear(), x.getMonth(), x.getDate()).getTime();
  const sd = startOf(d);
  const st = startOf(new Date());
  const diff = Math.round((sd - st) / 86400000);
  if (diff === 0) return "Today";
  if (diff === 1) return "Tomorrow";
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

function filterByScope(events: BattleEventWithParticipants[], scope: Scope): BattleEventWithParticipants[] {
  const now = Date.now();
  const sorted = [...events].sort(
    (a, b) => new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime(),
  );
  if (scope === "all") return sorted;
  const end =
    scope === "week"
      ? now + 7 * 86400000
      : now + 30 * 86400000;
  return sorted.filter((e) => {
    const t = new Date(e.scheduled_at).getTime();
    return t >= now && t <= end;
  });
}

function groupByDay(events: BattleEventWithParticipants[]): Map<string, BattleEventWithParticipants[]> {
  const map = new Map<string, BattleEventWithParticipants[]>();
  for (const ev of events) {
    const k = dayKeyLocal(ev.scheduled_at);
    const list = map.get(k) ?? [];
    list.push(ev);
    map.set(k, list);
  }
  return map;
}

function dayKeyFromParts(y: number, m0: number, day: number): string {
  return `${y}-${String(m0 + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function buildMonthCells(year: number, monthIndex: number): { day: number | null; key: string | null }[] {
  const first = new Date(year, monthIndex, 1);
  const startPad = first.getDay();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const cells: { day: number | null; key: string | null }[] = [];
  for (let i = 0; i < startPad; i++) cells.push({ day: null, key: null });
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, key: dayKeyFromParts(year, monthIndex, d) });
  }
  return cells;
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

type Props = {
  events: BattleEventWithParticipants[];
  /** Sample data banner on rows */
  isPreview?: boolean;
};

export function BattleNetworkCalendar({ events, isPreview }: Props) {
  const [scope, setScope] = useState<Scope>("all");
  const [calView, setCalView] = useState<CalView>("list");
  const [cursor, setCursor] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [selectedDayKey, setSelectedDayKey] = useState<string | null>(null);
  const [flyerShareEvent, setFlyerShareEvent] = useState<BattleEventWithParticipants | null>(null);

  const filtered = useMemo(() => filterByScope(events, scope), [events, scope]);

  const byDay = useMemo(() => groupByDay(filtered), [filtered]);
  const sortedDayKeys = useMemo(
    () =>
      [...byDay.keys()].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0)),
    [byDay],
  );

  const year = cursor.getFullYear();
  const monthIndex = cursor.getMonth();
  const monthCells = useMemo(() => buildMonthCells(year, monthIndex), [year, monthIndex]);

  const eventsByDayKey = useMemo(() => {
    const m = new Map<string, BattleEventWithParticipants[]>();
    for (const ev of filtered) {
      const k = dayKeyLocal(ev.scheduled_at);
      const [y, mo] = k.split("-").map(Number);
      if (y === year && mo === monthIndex + 1) {
        const list = m.get(k) ?? [];
        list.push(ev);
        m.set(k, list);
      }
    }
    for (const [, list] of m) {
      list.sort((a, b) => new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime());
    }
    return m;
  }, [filtered, year, monthIndex]);

  const nextUpId = filtered[0]?.id ?? null;

  const goPrevMonth = () => setCursor(new Date(year, monthIndex - 1, 1));
  const goNextMonth = () => setCursor(new Date(year, monthIndex + 1, 1));
  const goThisMonth = () => {
    const d = new Date();
    setCursor(new Date(d.getFullYear(), d.getMonth(), 1));
  };

  useEffect(() => {
    setSelectedDayKey(null);
  }, [year, monthIndex]);

  const monthLabel = cursor.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const todayKey = dayKeyFromParts(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate(),
  );

  const selectedEvents = selectedDayKey ? eventsByDayKey.get(selectedDayKey) ?? [] : [];

  return (
    <div className="mt-10 space-y-6">
      {events.length === 0 && !isPreview && (
        <div className="rounded-2xl border border-dashed border-zinc-300/90 bg-muted-bg/40 px-6 py-12 text-center dark:border-zinc-700 dark:bg-zinc-950/40">
          <p className="font-semibold text-zinc-800 dark:text-zinc-200">No upcoming events</p>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            When members schedule battles, they appear below. You can still use the month view to plan ahead.
          </p>
          <Link
            href="/battle-hub/scheduler/new"
            className="mt-6 inline-block text-sm font-semibold text-accent hover:underline dark:text-accent-muted"
          >
            Schedule a battle →
          </Link>
        </div>
      )}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            View
          </span>
          <div className="inline-flex rounded-xl border border-zinc-200/90 bg-muted-bg/50 p-1 dark:border-zinc-700">
            <button
              type="button"
              onClick={() => setCalView("list")}
              className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition ${
                calView === "list"
                  ? "bg-surface text-zinc-950 shadow-sm dark:bg-zinc-900 dark:text-zinc-50"
                  : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
              }`}
            >
              Upcoming list
            </button>
            <button
              type="button"
              onClick={() => setCalView("month")}
              className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition ${
                calView === "month"
                  ? "bg-surface text-zinc-950 shadow-sm dark:bg-zinc-900 dark:text-zinc-50"
                  : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
              }`}
            >
              Month calendar
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Show
          </span>
          <select
            value={scope}
            onChange={(e) => setScope(e.target.value as Scope)}
            className="rounded-xl border border-zinc-200/90 bg-surface px-3 py-2 text-sm font-medium text-zinc-800 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-200"
            aria-label="Filter events by time range"
          >
            <option value="all">All upcoming</option>
            <option value="week">Next 7 days</option>
            <option value="month">Next 30 days</option>
          </select>
        </div>
      </div>

      {calView === "list" && (
        <div className="space-y-10">
          {events.length === 0 && !isPreview ? null : filtered.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-zinc-300/90 bg-muted-bg/30 px-6 py-12 text-center text-sm text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
              No battles in this range. Try &quot;All upcoming&quot; or switch to the month calendar.
            </p>
          ) : (
            sortedDayKeys.map((dayKey) => {
              const dayEvents = byDay.get(dayKey) ?? [];
              const first = dayEvents[0];
              if (!first) return null;
              return (
                <section key={dayKey} aria-labelledby={`day-${dayKey}`}>
                  <h2
                    id={`day-${dayKey}`}
                    className="mb-3 border-b border-zinc-200/80 pb-2 text-sm font-bold uppercase tracking-wide text-accent dark:border-zinc-700 dark:text-accent-muted"
                  >
                    {dayHeadingLabel(first.scheduled_at)}
                  </h2>
                  <ul className="space-y-4">
                    {dayEvents.map((ev) => {
                      const parts = ev.battle_event_participants ?? [];
                      const sorted = [...parts].sort((a, b) => a.slot_order - b.slot_order);
                      const isNext = ev.id === nextUpId;
                      return (
                        <li
                          key={ev.id}
                          className="relative rounded-2xl border border-zinc-200/90 bg-surface/90 p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/50"
                        >
                          {isPreview && (
                            <span className="absolute right-4 top-4 rounded bg-zinc-200/90 px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                              Sample
                            </span>
                          )}
                          {isNext && (
                            <span className="absolute left-4 top-4 rounded bg-accent/15 px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-accent dark:text-accent-muted">
                              Next up
                            </span>
                          )}
                          <div
                            className={`flex flex-wrap items-start justify-between gap-3 ${isNext ? "pt-6" : ""} ${isPreview ? "pr-16" : ""}`}
                          >
                            <div>
                              <h3 className="text-lg font-bold text-zinc-950 dark:text-zinc-50">{ev.title}</h3>
                              <p className="mt-1 text-sm text-zinc-500">
                                {ev.event_type} · {ev.format_label} · {ev.participant_count} creators
                              </p>
                            </div>
                            <div className="flex flex-col items-end gap-2 sm:flex-row sm:items-center sm:gap-3">
                              <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                                {formatWhen(ev.scheduled_at, ev.timezone)}
                              </p>
                              <button
                                type="button"
                                onClick={() => setFlyerShareEvent(ev)}
                                className="shrink-0 rounded-lg border border-accent/35 bg-accent/10 px-3 py-1.5 text-xs font-semibold text-accent hover:bg-accent/15 dark:border-accent-muted/40 dark:bg-accent/15 dark:text-accent-muted dark:hover:bg-accent/20"
                              >
                                Share flyer
                              </button>
                            </div>
                          </div>
                          <ul className="mt-4 flex flex-wrap gap-2">
                            {sorted.map((p) => (
                              <li
                                key={p.id}
                                className="rounded-full border border-zinc-200/80 bg-muted-bg/50 px-3 py-1 text-sm font-medium text-zinc-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
                              >
                                {displayHandle(p.tiktok_username)}
                                {p.team_label && (
                                  <span className="ml-1 text-xs text-zinc-500">· Team {p.team_label}</span>
                                )}
                              </li>
                            ))}
                          </ul>
                          {ev.notes && (
                            <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                              {ev.notes}
                            </p>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </section>
              );
            })
          )}
        </div>
      )}

      {calView === "month" && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-zinc-950 dark:text-zinc-50">{monthLabel}</h2>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={goPrevMonth}
                className="rounded-lg border border-zinc-200/90 bg-surface px-3 py-1.5 text-sm font-semibold text-zinc-800 shadow-sm hover:bg-muted-bg/50 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-200"
              >
                ← Prev
              </button>
              <button
                type="button"
                onClick={goThisMonth}
                className="rounded-lg border border-zinc-200/90 bg-surface px-3 py-1.5 text-sm font-semibold text-zinc-800 shadow-sm hover:bg-muted-bg/50 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-200"
              >
                Today
              </button>
              <button
                type="button"
                onClick={goNextMonth}
                className="rounded-lg border border-zinc-200/90 bg-surface px-3 py-1.5 text-sm font-semibold text-zinc-800 shadow-sm hover:bg-muted-bg/50 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-200"
              >
                Next →
              </button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-zinc-200/90 bg-surface/90 p-3 dark:border-zinc-800 dark:bg-zinc-950/50">
            <div className="grid min-w-[280px] grid-cols-7 gap-1 text-center text-[0.7rem] font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              {WEEKDAYS.map((w) => (
                <div key={w} className="py-2">
                  {w}
                </div>
              ))}
            </div>
            <div className="grid min-w-[280px] grid-cols-7 gap-1">
              {monthCells.map((cell, i) => {
                if (cell.day == null || cell.key == null) {
                  return <div key={`pad-${i}`} className="min-h-[4.5rem] rounded-lg bg-transparent" />;
                }
                const dayEvents = eventsByDayKey.get(cell.key) ?? [];
                const count = dayEvents.length;
                const isSelected = selectedDayKey === cell.key;
                const isToday = cell.key === todayKey;
                return (
                  <button
                    key={cell.key}
                    type="button"
                    onClick={() => setSelectedDayKey(isSelected ? null : cell.key)}
                    className={`flex min-h-[4.5rem] flex-col items-center rounded-lg border p-1.5 text-left transition ${
                      isSelected
                        ? "border-accent bg-accent/10 dark:border-accent-muted dark:bg-accent/10"
                        : "border-zinc-200/70 bg-muted-bg/30 hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900/40 dark:hover:border-zinc-600"
                    } ${isToday ? "ring-1 ring-accent/40 dark:ring-accent-muted/40" : ""}`}
                  >
                    <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{cell.day}</span>
                    {count > 0 && (
                      <span className="mt-1 flex h-6 min-w-[1.25rem] items-center justify-center rounded-full bg-accent/20 px-1.5 text-[0.65rem] font-bold text-accent dark:bg-accent/25 dark:text-accent-muted">
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {selectedDayKey && (
            <div className="rounded-2xl border border-zinc-200/90 bg-muted-bg/30 p-4 dark:border-zinc-800 dark:bg-zinc-950/40">
              <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                {new Date(selectedDayKey + "T12:00:00").toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              {selectedEvents.length === 0 ? (
                <p className="mt-2 text-sm text-zinc-500">No battles on this day in the current filter.</p>
              ) : (
                <ul className="mt-3 space-y-3">
                  {selectedEvents.map((ev) => (
                    <li
                      key={ev.id}
                      className="rounded-xl border border-zinc-200/80 bg-surface/90 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-900/50"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <span className="font-semibold text-zinc-900 dark:text-zinc-100">{ev.title}</span>
                        <div className="flex flex-col items-end gap-2 sm:flex-row sm:items-center sm:gap-2">
                          <span className="text-sm text-zinc-500">
                            {formatWhen(ev.scheduled_at, ev.timezone)}
                          </span>
                          <button
                            type="button"
                            onClick={() => setFlyerShareEvent(ev)}
                            className="shrink-0 rounded-lg border border-accent/35 bg-accent/10 px-2.5 py-1 text-[0.7rem] font-semibold text-accent hover:bg-accent/15 dark:border-accent-muted/40 dark:text-accent-muted dark:hover:bg-accent/20"
                          >
                            Share flyer
                          </button>
                        </div>
                      </div>
                      <p className="mt-1 text-xs text-zinc-500">
                        {ev.event_type} · {ev.format_label}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {!selectedDayKey && (
            <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
              Tap a day with a count to see battles. Times use each event&apos;s timezone in the list above.
            </p>
          )}
        </div>
      )}

      <BattleFlyerShareModal event={flyerShareEvent} onClose={() => setFlyerShareEvent(null)} />
    </div>
  );
}
