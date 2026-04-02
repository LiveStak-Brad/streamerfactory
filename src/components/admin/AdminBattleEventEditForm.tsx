"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import { useFormStatus } from "react-dom";
import type { AdminBattleActionState } from "@/lib/battle-hub/admin-actions";
import { updateBattleEventAdminAction } from "@/lib/battle-hub/admin-actions";
import {
  COMMON_TIMEZONES,
  FORMAT_OPTIONS_BY_COUNT,
  PARTICIPANT_COUNTS,
} from "@/lib/battle-hub/formats";
import type { BattleEventWithParticipants } from "@/lib/battle-hub/types";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-zinc-950 px-8 py-3 text-sm font-semibold text-white disabled:opacity-60 dark:bg-white dark:text-zinc-950"
    >
      {pending ? "Saving…" : "Save changes"}
    </button>
  );
}

const EVENT_TYPES = [
  { value: "battle", label: "Battle" },
  { value: "promo", label: "Promo" },
  { value: "themed", label: "Themed event" },
] as const;

const STATUSES = [
  { value: "scheduled", label: "Scheduled" },
  { value: "cancelled", label: "Cancelled" },
  { value: "completed", label: "Completed" },
] as const;

function isoToDatetimeLocalValue(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

type Props = {
  event: BattleEventWithParticipants;
};

export function AdminBattleEventEditForm({ event }: Props) {
  const parts = event.battle_event_participants ?? [];
  const sorted = [...parts].sort((a, b) => a.slot_order - b.slot_order);

  const [participantCount, setParticipantCount] = useState(event.participant_count);
  const [formatLabel, setFormatLabel] = useState(event.format_label);
  const [participants, setParticipants] = useState<string[]>(() =>
    sorted.map((p) => p.tiktok_username),
  );
  const [teams, setTeams] = useState<("A" | "B" | "")[]>(() =>
    sorted.map((p) => (p.team_label === "A" || p.team_label === "B" ? p.team_label : "")),
  );

  const [state, formAction] = useActionState(updateBattleEventAdminAction, {} as AdminBattleActionState);

  useEffect(() => {
    setParticipants((prev) => {
      const next = [...prev];
      while (next.length < participantCount) next.push("");
      return next.slice(0, participantCount);
    });
    setTeams((prev) => {
      const next = [...prev];
      while (next.length < participantCount) next.push("");
      return next.slice(0, participantCount).map((t) => t ?? "");
    });
  }, [participantCount]);

  const formats = useMemo(() => FORMAT_OPTIONS_BY_COUNT[participantCount] ?? [], [participantCount]);
  const showTeams = participantCount === 4 && formatLabel === "2v2";

  useEffect(() => {
    if (formats.length === 1 && formats[0] && !formats.some((o) => o.value === formatLabel)) {
      setFormatLabel(formats[0].value);
    }
  }, [participantCount, formatLabel, formats]);

  const inputClass =
    "mt-2 w-full rounded-xl border border-zinc-200/90 bg-surface px-4 py-3 text-base text-foreground shadow-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25 dark:border-zinc-700 dark:bg-zinc-950/50";

  const defaultScheduled = useMemo(() => isoToDatetimeLocalValue(event.scheduled_at), [event.scheduled_at]);

  return (
    <form action={formAction} className="space-y-8">
      <input type="hidden" name="eventId" value={event.id} />

      {state?.error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200">
          {state.error}
        </div>
      )}
      {state?.success && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-200">
          Saved.
        </div>
      )}

      <div>
        <label className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Title</label>
        <input className={inputClass} name="title" required defaultValue={event.title} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Event type</label>
          <select className={inputClass} name="eventType" defaultValue={event.event_type}>
            {EVENT_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Status</label>
          <select className={inputClass} name="status" defaultValue={event.status}>
            {STATUSES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Participants</span>
        <div className="mt-2 flex flex-wrap gap-2">
          {PARTICIPANT_COUNTS.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => {
                setParticipantCount(n);
                setFormatLabel("");
              }}
              className={`rounded-lg border px-3 py-1.5 text-sm font-semibold ${
                participantCount === n
                  ? "border-accent bg-accent/15 text-accent dark:text-accent-muted"
                  : "border-zinc-200 dark:border-zinc-700"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
        <input type="hidden" name="participantCount" value={participantCount} />
      </div>

      <div>
        <label className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Format</label>
        <select
          className={inputClass}
          name="formatLabel"
          value={formatLabel}
          onChange={(e) => setFormatLabel(e.target.value)}
        >
          <option value="">Select format</option>
          {formats.map((f) => (
            <option key={f.value} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Creator handles</span>
        {Array.from({ length: participantCount }, (_, i) => (
          <div key={i} className="flex flex-wrap items-end gap-3">
            <div className="min-w-[200px] flex-1">
              <label className="text-xs font-medium text-zinc-500">Participant {i + 1}</label>
              <input
                className={inputClass}
                name={`participant_${i}`}
                required
                value={participants[i] ?? ""}
                onChange={(e) =>
                  setParticipants((prev) => {
                    const next = [...prev];
                    next[i] = e.target.value;
                    return next;
                  })
                }
              />
            </div>
            {showTeams && (
              <div className="w-28">
                <label className="text-xs font-medium text-zinc-500">Team</label>
                <select
                  className={inputClass}
                  name={`team_${i}`}
                  value={teams[i] ?? ""}
                  onChange={(e) =>
                    setTeams((prev) => {
                      const next = [...prev];
                      next[i] = (e.target.value as "A" | "B") || "";
                      return next;
                    })
                  }
                >
                  <option value="">—</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                </select>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Scheduled (local)</label>
          <input
            className={inputClass}
            type="datetime-local"
            name="scheduledAt"
            required
            defaultValue={defaultScheduled}
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Timezone</label>
          <select className={inputClass} name="timezone" defaultValue={event.timezone}>
            {COMMON_TIMEZONES.map((tz) => (
              <option key={tz} value={tz}>
                {tz}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Notes</label>
        <textarea
          className={`${inputClass} min-h-[100px]`}
          name="notes"
          defaultValue={event.notes ?? ""}
        />
      </div>

      <SubmitButton />
    </form>
  );
}
