"use client";

import { useActionState, useEffect, useMemo, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import type { CreateBattleState } from "@/lib/battle-hub/actions";
import { createBattleEvent } from "@/lib/battle-hub/actions";
import {
  COMMON_TIMEZONES,
  FORMAT_OPTIONS_BY_COUNT,
  PARTICIPANT_COUNTS,
} from "@/lib/battle-hub/formats";
import { uploadBattleFlyerAvatar } from "@/lib/battle-hub/upload-battle-avatar";
import type { SchedulerWizardPrefill } from "@/lib/battle-finder/scheduler-prefill";

import { BattleFlyerPreview } from "./BattleFlyerPreview";

function SubmitBattleButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-zinc-950 px-8 py-3 text-sm font-semibold text-white shadow-lg transition-opacity disabled:opacity-60 dark:bg-white dark:text-zinc-950"
    >
      {pending ? "Saving…" : "Save event to calendar"}
    </button>
  );
}

const EVENT_TYPES = [
  { value: "battle", label: "Battle" },
  { value: "promo", label: "Promo" },
  { value: "themed", label: "Themed event" },
] as const;

function teamForFlyerLayout(
  layout: string,
  index: number,
  participantCount: number,
  teams: ("A" | "B" | "")[],
): string | null {
  if (participantCount !== 4) return null;
  if (layout === "free-for-all") return null;
  if (layout === "2v2" || layout === "team-battle") {
    const t = teams[index];
    if (t) return t;
    return index < 2 ? "A" : "B";
  }
  return null;
}

type BattleSchedulerWizardProps = {
  /** Hydrate from Battle Finder or shared links (`/battle-hub/scheduler/new?...`). */
  initialPrefill?: SchedulerWizardPrefill;
};

export function BattleSchedulerWizard({ initialPrefill }: BattleSchedulerWizardProps) {
  const prefillApplied = useRef(false);
  const [step, setStep] = useState(1);
  const [participantCount, setParticipantCount] = useState<number>(2);
  const [formatLabel, setFormatLabel] = useState("");
  const [participants, setParticipants] = useState<string[]>(["", ""]);
  const [teams, setTeams] = useState<("A" | "B" | "")[]>(["", "", "", ""]);
  const [title, setTitle] = useState("");
  const [eventType, setEventType] = useState("battle");
  const [scheduledAt, setScheduledAt] = useState("");
  const [timezone, setTimezone] = useState("America/New_York");
  const [notes, setNotes] = useState("");
  /** Flyer step: preview layout (2v2 vs FFA, etc.) without changing saved format. */
  const [layoutPreviewFormat, setLayoutPreviewFormat] = useState(formatLabel);

  /** Public URLs in `battleavatars` bucket (saved on `flyer_avatar_*` form fields). */
  const [flyerAvatarUrls, setFlyerAvatarUrls] = useState<Record<number, string>>({});
  const [flyerAvatarUploading, setFlyerAvatarUploading] = useState<number | null>(null);

  const [state, formAction] = useActionState(createBattleEvent, {} as CreateBattleState);

  const formats = FORMAT_OPTIONS_BY_COUNT[participantCount] ?? [];
  const showTeams = participantCount === 4 && formatLabel === "2v2";

  function syncParticipantSlots(count: number) {
    setParticipants((prev) => {
      const next = [...prev];
      while (next.length < count) next.push("");
      return next.slice(0, count);
    });
  }

  function setCount(n: number) {
    setParticipantCount(n);
    syncParticipantSlots(n);
    setFormatLabel("");
  }

  function next() {
    if (step === 1 && participantCount >= 2) setStep(2);
    else if (step === 2 && formatLabel) setStep(3);
    else if (step === 3) {
      const ok = participants.slice(0, participantCount).every((p) => p.trim().length > 0);
      if (ok) setStep(4);
    } else if (step === 4 && scheduledAt) setStep(5);
    else if (step === 5) setStep(6);
  }

  function back() {
    setStep((s) => Math.max(1, s - 1));
  }

  useEffect(() => {
    setLayoutPreviewFormat(formatLabel);
  }, [formatLabel]);

  useEffect(() => {
    const opts = FORMAT_OPTIONS_BY_COUNT[participantCount];
    if (opts?.length === 1 && opts[0] && !formatLabel) {
      setFormatLabel(opts[0].value);
    }
  }, [participantCount, formatLabel]);

  useEffect(() => {
    if (!initialPrefill || prefillApplied.current) return;
    const p = initialPrefill;
    const hasAny =
      Boolean(p.title) ||
      p.participantCount != null ||
      Boolean(p.formatLabel) ||
      Boolean(p.scheduledAtIso) ||
      Boolean(p.timezone) ||
      Boolean(p.notes) ||
      (p.participants != null && p.participants.length > 0);
    if (!hasAny) return;
    prefillApplied.current = true;
    if (p.title) setTitle(p.title);
    if (p.participantCount != null && p.participantCount >= 2 && p.participantCount <= 4) {
      setParticipantCount(p.participantCount);
      const handles = p.participants?.slice(0, p.participantCount) ?? [];
      const next = [...handles];
      while (next.length < p.participantCount) next.push("");
      setParticipants(next.slice(0, p.participantCount));
    }
    if (p.formatLabel) {
      setFormatLabel(p.formatLabel);
      setLayoutPreviewFormat(p.formatLabel);
    }
    if (p.timezone) setTimezone(p.timezone);
    if (p.notes) setNotes(p.notes);
    if (p.scheduledAtIso) {
      const d = new Date(p.scheduledAtIso);
      if (!Number.isNaN(d.getTime())) {
        const pad = (n: number) => String(n).padStart(2, "0");
        setScheduledAt(
          `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`,
        );
      }
    }
  }, [initialPrefill]);

  const flyerParticipants = useMemo(() => {
    return participants.slice(0, participantCount).map((u, i) => ({
      username: u,
      team: teamForFlyerLayout(layoutPreviewFormat, i, participantCount, teams),
    }));
  }, [participants, participantCount, layoutPreviewFormat, teams]);

  async function handleFlyerAvatarUpload(index: number, file: File) {
    setFlyerAvatarUploading(index);
    try {
      const url = await uploadBattleFlyerAvatar(file);
      setFlyerAvatarUrls((prev) => ({ ...prev, [index]: url }));
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Upload failed.";
      window.alert(msg);
    } finally {
      setFlyerAvatarUploading(null);
    }
  }

  function clearFlyerAvatar(index: number) {
    setFlyerAvatarUrls((prev) => {
      const next = { ...prev };
      delete next[index];
      return next;
    });
  }

  const inputClass =
    "mt-2 w-full rounded-xl border border-zinc-200/90 bg-surface px-4 py-3 text-base text-foreground shadow-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25 dark:border-zinc-700 dark:bg-zinc-950/50";

  return (
    <div className="space-y-10">
      {state?.error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200">
          {state.error}
        </div>
      )}

      <ol className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <li
            key={n}
            className={`rounded-full px-3 py-1 ${
              step === n
                ? "bg-accent/15 text-accent dark:text-accent-muted"
                : step > n
                  ? "text-zinc-400"
                  : "text-zinc-500"
            }`}
          >
            {n}. {["Size", "Battle type", "Creators", "When", "Flyer", "Save"][n - 1]}
          </li>
        ))}
      </ol>

      <form action={formAction} className="space-y-8">
        <input type="hidden" name="participantCount" value={participantCount} />
        <input type="hidden" name="formatLabel" value={formatLabel} />
        <input type="hidden" name="title" value={title} />
        <input type="hidden" name="eventType" value={eventType} />
        <input type="hidden" name="scheduledAt" value={scheduledAt} />
        <input type="hidden" name="timezone" value={timezone} />
        <input type="hidden" name="notes" value={notes} />
        {participants.slice(0, participantCount).map((val, i) => (
          <input key={i} type="hidden" name={`participant_${i}`} value={val} />
        ))}
        {participants.slice(0, participantCount).map((_, i) => (
          <input key={`t-${i}`} type="hidden" name={`team_${i}`} value={teams[i] ?? ""} />
        ))}
        {participants.slice(0, participantCount).map((_, i) => (
          <input key={`fa-${i}`} type="hidden" name={`flyer_avatar_${i}`} value={flyerAvatarUrls[i] ?? ""} />
        ))}

        {step === 1 && (
          <div>
            <h2 className="text-lg font-bold text-zinc-950 dark:text-zinc-50">How many creators?</h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Pick headcount first—formats adapt (Battle Finder will use this later too).
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {PARTICIPANT_COUNTS.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setCount(n)}
                  className={`rounded-2xl border px-4 py-6 text-center text-lg font-bold transition-colors ${
                    participantCount === n
                      ? "border-accent/50 bg-accent/10 text-accent dark:text-accent-muted"
                      : "border-zinc-200 bg-surface hover:border-accent/30 dark:border-zinc-800"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={next}
                className="rounded-xl bg-zinc-950 px-6 py-2.5 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-lg font-bold text-zinc-950 dark:text-zinc-50">Battle type</h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              1v1 for duels, free-for-all when everyone is solo, 2v2 when you are splitting into two teams.
              For a themed night or custom headline, use the title field when you schedule and set event type to
              Themed event if you like.
            </p>
            <div className="mt-6 space-y-2">
              {formats.map((f) => (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => setFormatLabel(f.value)}
                  className={`flex w-full rounded-xl border px-4 py-3 text-left text-sm font-semibold transition-colors ${
                    formatLabel === f.value
                      ? "border-accent/50 bg-accent/10 text-accent dark:text-accent-muted"
                      : "border-zinc-200 bg-surface dark:border-zinc-800"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div className="mt-8 flex justify-between">
              <button type="button" onClick={back} className="text-sm font-semibold text-zinc-500">
                Back
              </button>
              <button
                type="button"
                onClick={next}
                disabled={!formatLabel}
                className="rounded-xl bg-zinc-950 px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-50 dark:bg-white dark:text-zinc-950"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-lg font-bold text-zinc-950 dark:text-zinc-50">Creator handles</h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              TikTok usernames (with or without @). Add teams when it is a squad format.
            </p>
            <div className="mt-6 space-y-4">
              {participants.slice(0, participantCount).map((val, i) => (
                <div key={i}>
                  <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Creator {i + 1}
                  </label>
                  <input
                    className={inputClass}
                    value={val}
                    onChange={(e) => {
                      const next = [...participants];
                      next[i] = e.target.value;
                      setParticipants(next);
                    }}
                    placeholder="@handle"
                    autoComplete="off"
                  />
                  {showTeams && (
                    <select
                      className={`${inputClass} mt-2`}
                      value={teams[i] ?? ""}
                      onChange={(e) => {
                        const next = [...teams] as ("A" | "B" | "")[];
                        next[i] = e.target.value as "A" | "B" | "";
                        setTeams(next);
                      }}
                    >
                      <option value="">Team (optional)</option>
                      <option value="A">Team A</option>
                      <option value="B">Team B</option>
                    </select>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-8 flex justify-between">
              <button type="button" onClick={back} className="text-sm font-semibold text-zinc-500">
                Back
              </button>
              <button type="button" onClick={next} className="rounded-xl bg-zinc-950 px-6 py-2.5 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950">
                Next
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="text-lg font-bold text-zinc-950 dark:text-zinc-50">Schedule</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Title / theme</label>
                <input
                  className={inputClass}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Optional — e.g. Friday Night Throwdown"
                />
                <p className="mt-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                  This is the headline on the flyer—use it for themed nights, promos, or anything you want viewers
                  to see first.
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Event type</label>
                <select
                  className={inputClass}
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                >
                  {EVENT_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Timezone</label>
                <select
                  className={inputClass}
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                >
                  {COMMON_TIMEZONES.map((tz) => (
                    <option key={tz} value={tz}>
                      {tz}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Date & time <span className="text-accent">*</span>
                </label>
                <input
                  type="datetime-local"
                  required
                  className={inputClass}
                  value={scheduledAt}
                  onChange={(e) => setScheduledAt(e.target.value)}
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Notes</label>
                <textarea
                  className={`${inputClass} min-h-[100px] resize-y`}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Rules, theme, or what viewers should expect."
                />
              </div>
            </div>
            <div className="mt-8 flex justify-between">
              <button type="button" onClick={back} className="text-sm font-semibold text-zinc-500">
                Back
              </button>
              <button
                type="button"
                onClick={next}
                disabled={!scheduledAt}
                className="rounded-xl bg-zinc-950 px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-50 dark:bg-white dark:text-zinc-950"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div>
            <h2 className="text-lg font-bold text-zinc-950 dark:text-zinc-50">Flyer preview</h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Share-ready layout—export as image or PDF can plug in later.
            </p>
            <div className="mt-6">
              <BattleFlyerPreview
                title={title || "TikTok LIVE battle"}
                eventType={eventType}
                formatLabel={formatLabel}
                layoutFormat={layoutPreviewFormat}
                notes={notes}
                onLayoutFormatChange={setLayoutPreviewFormat}
                participantCount={participantCount}
                scheduledAt={scheduledAt ? new Date(scheduledAt).toISOString() : null}
                timezone={timezone}
                participants={flyerParticipants}
                variant="story"
                editableAvatarPhotos
                avatarUploadMode="supabase"
                remoteAvatarUrls={flyerAvatarUrls}
                onAvatarFileUpload={handleFlyerAvatarUpload}
                onAvatarUrlClear={clearFlyerAvatar}
                avatarUploadingIndex={flyerAvatarUploading}
                downloadable
              />
            </div>
            <div className="mt-8 flex justify-between">
              <button type="button" onClick={back} className="text-sm font-semibold text-zinc-500">
                Back
              </button>
              <button
                type="button"
                onClick={next}
                className="rounded-xl bg-zinc-950 px-6 py-2.5 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 6 && (
          <div>
            <h2 className="text-lg font-bold text-zinc-950 dark:text-zinc-50">Save to network calendar</h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              This publishes to the shared Battle Hub calendar for your network.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <button type="button" onClick={back} className="text-sm font-semibold text-zinc-500">
                Back
              </button>
              <SubmitBattleButton />
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
