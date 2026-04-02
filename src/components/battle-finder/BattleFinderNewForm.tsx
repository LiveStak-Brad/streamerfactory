"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/Button";
import type { CreateBattleRequestState } from "@/lib/battle-finder/actions";
import { createBattleRequestAction } from "@/lib/battle-finder/actions";
import { REQUEST_TYPE_OPTIONS } from "@/lib/battle-finder/labels";
import { COMMON_TIMEZONES, FORMAT_OPTIONS_BY_COUNT, PARTICIPANT_COUNTS } from "@/lib/battle-hub/formats";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="primary" disabled={pending} className="min-h-[48px]">
      {pending ? "Posting…" : "Post request"}
    </Button>
  );
}

const inputClass =
  "mt-2 w-full rounded-xl border border-zinc-200/90 bg-surface px-4 py-3 text-base text-foreground shadow-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25 dark:border-zinc-700 dark:bg-zinc-950/50";

export function BattleFinderNewForm() {
  const router = useRouter();
  const [state, formAction] = useActionState(createBattleRequestAction, {} as CreateBattleRequestState);
  const [participantCount, setParticipantCount] = useState(2);
  const formats = FORMAT_OPTIONS_BY_COUNT[participantCount] ?? FORMAT_OPTIONS_BY_COUNT[2]!;

  useEffect(() => {
    if (state?.success && state.id) {
      router.push(`/battle-hub/finder/${state.id}`);
    }
  }, [state, router]);

  return (
    <form action={formAction} className="space-y-8">
      {state?.error ? (
        <div
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200"
          role="alert"
        >
          {state.error}
        </div>
      ) : null}

      <div>
        <label htmlFor="title" className="text-base font-medium text-foreground">
          Title / theme <span className="text-zinc-400">(optional)</span>
        </label>
        <input id="title" name="title" type="text" className={inputClass} placeholder="e.g. Friday night 1v1" />
      </div>

      <div>
        <span className="text-base font-medium text-foreground">What are you looking for?</span>
        <div className="mt-3 space-y-3">
          {REQUEST_TYPE_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className="flex cursor-pointer gap-3 rounded-xl border border-zinc-200/90 p-4 dark:border-zinc-800"
            >
              <input type="radio" name="requestType" value={opt.value} required className="mt-1 accent-accent" />
              <span>
                <span className="font-medium text-foreground">{opt.label}</span>
                <span className="mt-1 block text-sm text-muted">{opt.hint}</span>
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="participantCount" className="text-base font-medium text-foreground">
          Total creators in this battle
        </label>
        <select
          id="participantCount"
          name="participantCount"
          required
          className={inputClass}
          value={participantCount}
          onChange={(e) => setParticipantCount(Number(e.target.value))}
        >
          {PARTICIPANT_COUNTS.map((n) => (
            <option key={n} value={n}>
              {n} creators
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="formatLabel" className="text-base font-medium text-foreground">
          Preferred format
        </label>
        <p className="mt-1 text-sm text-muted">Same options as the Battle Scheduler — keeps Finder and calendar aligned.</p>
        <select
          id="formatLabel"
          name="formatLabel"
          key={participantCount}
          required
          className={inputClass}
          defaultValue={formats[0]?.value ?? ""}
        >
          {formats.map((f) => (
            <option key={f.value} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="preferredAt" className="text-base font-medium text-foreground">
          Preferred date & time <span className="text-zinc-400">(optional)</span>
        </label>
        <input id="preferredAt" name="preferredAt" type="datetime-local" className={inputClass} />
        <p className="mt-2 text-xs text-muted">Leave blank if you&apos;re flexible.</p>
      </div>

      <div>
        <label htmlFor="timezone" className="text-base font-medium text-foreground">
          Timezone
        </label>
        <select id="timezone" name="timezone" className={inputClass} defaultValue="America/New_York">
          {COMMON_TIMEZONES.map((tz) => (
            <option key={tz} value={tz}>
              {tz}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="notes" className="text-base font-medium text-foreground">
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          className={`${inputClass} resize-y`}
          placeholder="Availability, rules, or how you want to run the set."
        />
      </div>

      <div className="flex justify-end border-t border-border pt-8">
        <SubmitButton />
      </div>
    </form>
  );
}
