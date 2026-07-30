"use client";

import { useActionState, useMemo, useState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/Button";
import { adminFieldClass, adminLabelClass } from "@/components/admin/ui/admin-field";
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
    <Button type="submit" variant="primary" className="min-h-[48px] px-8 text-sm" disabled={pending}>
      {pending ? "Saving…" : "Save changes"}
    </Button>
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

function resizeList<T>(prev: T[], count: number, fill: T): T[] {
  const next = [...prev];
  while (next.length < count) next.push(fill);
  return next.slice(0, count);
}

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

  const formats = useMemo(() => FORMAT_OPTIONS_BY_COUNT[participantCount] ?? [], [participantCount]);
  const showTeams = participantCount === 4 && formatLabel === "2v2";

  function applyParticipantCount(n: number) {
    setParticipantCount(n);
    setParticipants((prev) => resizeList(prev, n, ""));
    setTeams((prev) => resizeList(prev, n, "" as const).map((t) => t ?? ""));
    const nextFormats = FORMAT_OPTIONS_BY_COUNT[n] ?? [];
    if (nextFormats.length === 1 && nextFormats[0]) {
      setFormatLabel(nextFormats[0].value);
    } else {
      setFormatLabel("");
    }
  }

  const inputClass = adminFieldClass;
  const defaultScheduled = useMemo(() => isoToDatetimeLocalValue(event.scheduled_at), [event.scheduled_at]);

  return (
    <form action={formAction} className="space-y-8">
      <input type="hidden" name="eventId" value={event.id} />

      {state?.error ? (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-200">
          {state.error}
        </div>
      ) : null}
      {state?.success ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-200">
          Saved.
        </div>
      ) : null}

      <div>
        <label className={adminLabelClass}>Title</label>
        <input className={inputClass} name="title" required defaultValue={event.title} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className={adminLabelClass}>Event type</label>
          <select className={inputClass} name="eventType" defaultValue={event.event_type}>
            {EVENT_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={adminLabelClass}>Status</label>
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
        <span className={adminLabelClass}>Participants</span>
        <div className="mt-2 flex flex-wrap gap-2">
          {PARTICIPANT_COUNTS.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => applyParticipantCount(n)}
              className={`rounded-lg border px-3 py-1.5 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                participantCount === n
                  ? "border-accent bg-accent/15 text-accent dark:text-accent-muted"
                  : "border-border/90 dark:border-zinc-700"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
        <input type="hidden" name="participantCount" value={participantCount} />
      </div>

      <div>
        <label className={adminLabelClass}>Format</label>
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
        <span className={adminLabelClass}>Creator handles</span>
        {Array.from({ length: participantCount }, (_, i) => (
          <div key={i} className="flex flex-wrap items-end gap-3">
            <div className="min-w-[200px] flex-1">
              <label className="text-xs font-medium text-muted">Participant {i + 1}</label>
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
            {showTeams ? (
              <div className="w-28">
                <label className="text-xs font-medium text-muted">Team</label>
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
            ) : null}
          </div>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className={adminLabelClass}>Scheduled (local)</label>
          <input
            className={inputClass}
            type="datetime-local"
            name="scheduledAt"
            required
            defaultValue={defaultScheduled}
          />
        </div>
        <div>
          <label className={adminLabelClass}>Timezone</label>
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
        <label className={adminLabelClass}>Notes</label>
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
