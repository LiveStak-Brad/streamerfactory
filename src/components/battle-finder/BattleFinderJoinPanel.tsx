"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import {
  joinBattleRequestSlotAction,
  leaveBattleRequestSlotAction,
  promoteBattleRequestAction,
  setBattleRequestStatusAction,
} from "@/lib/battle-finder/actions";
import { schedulerPrefillHref } from "@/lib/battle-finder/scheduler-prefill";
import type { BattleRequestWithSlots } from "@/lib/battle-finder/types";

const inputClass =
  "mt-2 w-full rounded-xl border border-zinc-200/90 bg-surface px-4 py-3 text-base text-foreground shadow-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25 dark:border-zinc-700 dark:bg-zinc-950/50";

const btnPrimary =
  "inline-flex min-h-[44px] items-center justify-center rounded-xl bg-zinc-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:opacity-60 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200";

const btnGhost =
  "inline-flex min-h-[44px] items-center justify-center rounded-xl border border-zinc-200 px-4 py-2.5 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-50 disabled:opacity-60 dark:border-zinc-600 dark:text-zinc-100 dark:hover:bg-zinc-900";

export function BattleFinderJoinPanel({
  request,
  currentUserId,
  defaultHandle,
  showAdminEventLink,
}: {
  request: BattleRequestWithSlots;
  currentUserId: string;
  defaultHandle: string;
  /** Staff can open admin edit for the promoted event. */
  showAdminEventLink?: boolean;
}) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [handle, setHandle] = useState(defaultHandle.replace(/^@/, ""));
  const [err, setErr] = useState<string | null>(null);
  const [localPromotedId, setLocalPromotedId] = useState<string | null>(request.promoted_battle_event_id ?? null);

  const slots = [...request.battle_request_slots].sort((a, b) => a.slot_order - b.slot_order);
  const isCreator = request.created_by === currentUserId;
  const promotedId = localPromotedId ?? request.promoted_battle_event_id ?? null;

  function join(slotId: string) {
    setErr(null);
    start(async () => {
      const res = await joinBattleRequestSlotAction(slotId, handle);
      if (!res.ok) setErr(res.error ?? "Could not join");
      else router.refresh();
    });
  }

  function leave(slotId: string) {
    setErr(null);
    start(async () => {
      const res = await leaveBattleRequestSlotAction(slotId);
      if (!res.ok) setErr(res.error ?? "Could not leave");
      else router.refresh();
    });
  }

  function close(status: "closed" | "cancelled") {
    setErr(null);
    start(async () => {
      const res = await setBattleRequestStatusAction(request.id, status);
      if (!res.ok) setErr(res.error ?? "Could not update");
      else router.refresh();
    });
  }

  function promote() {
    setErr(null);
    start(async () => {
      const res = await promoteBattleRequestAction(request.id);
      if (!res.ok) {
        setErr(res.error);
        return;
      }
      setLocalPromotedId(res.eventId);
      router.refresh();
    });
  }

  if (request.status === "cancelled" || request.status === "closed") {
    return (
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        This request is {request.status === "cancelled" ? "cancelled" : "closed"}.
      </p>
    );
  }

  if (promotedId) {
    return (
      <div className="space-y-4 rounded-2xl border border-emerald-200/90 bg-emerald-50/50 p-6 dark:border-emerald-900/40 dark:bg-emerald-950/25">
        <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">On the network calendar</p>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          This lineup was promoted to a scheduled battle. It appears on the shared calendar like any other event.
          Adjust time or flyer anytime in the scheduler flow.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link href="/battle-hub/calendar" className={btnPrimary}>
            Open Battle Calendar
          </Link>
          <Link href={schedulerPrefillHref(request)} className={btnGhost}>
            Open scheduler (prefilled)
          </Link>
          {showAdminEventLink ? (
            <Link
              href={`/admin/calendar/${promotedId}/edit`}
              className="inline-flex min-h-[44px] items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold text-accent underline-offset-2 hover:underline dark:text-accent-muted"
            >
              Edit in admin
            </Link>
          ) : null}
        </div>
      </div>
    );
  }

  if (request.status === "matched") {
    return (
      <div className="space-y-5 rounded-2xl border border-emerald-200/90 bg-emerald-50/50 p-6 dark:border-emerald-900/40 dark:bg-emerald-950/25">
        <div>
          <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">Everyone&apos;s in</p>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Add this battle to the network calendar in one step — or open the scheduler if you prefer to tweak
            details first.
          </p>
        </div>
        {err ? (
          <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200">
            {err}
          </p>
        ) : null}
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <button type="button" disabled={pending} onClick={promote} className={btnPrimary}>
            {pending ? "Creating…" : "Add to network calendar"}
          </button>
          <Link href={schedulerPrefillHref(request)} className={btnGhost}>
            Prefill scheduler instead
          </Link>
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          If no preferred time was set on the request, we schedule at 8:00 PM UTC three days out — edit anytime in
          the calendar or admin.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {err ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200">
          {err}
        </p>
      ) : null}

      <div>
        <label htmlFor="join-handle" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Your TikTok handle (for joining open slots)
        </label>
        <input
          id="join-handle"
          value={handle}
          onChange={(e) => setHandle(e.target.value.replace(/^@/, ""))}
          className={inputClass}
          placeholder="handle"
          autoComplete="username"
        />
      </div>

      <ul className="space-y-3">
        {slots.map((slot) => {
          const label =
            slot.slot_order === 0 ? "Creator" : slot.joined_by ? "Filled" : "Open";
          const showJoin = !slot.joined_by && slot.slot_order > 0 && request.status === "open";
          const showLeave = slot.joined_by === currentUserId && slot.slot_order > 0;

          return (
            <li
              key={slot.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-zinc-200/90 p-4 dark:border-zinc-800"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  {label} · slot {slot.slot_order + 1}
                </p>
                <p className="mt-1 font-medium text-zinc-950 dark:text-zinc-50">
                  {slot.tiktok_username ? `@${slot.tiktok_username}` : "—"}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {showJoin ? (
                  <button type="button" disabled={pending} onClick={() => join(slot.id)} className={btnPrimary}>
                    Join
                  </button>
                ) : null}
                {showLeave ? (
                  <button type="button" disabled={pending} onClick={() => leave(slot.id)} className={btnGhost}>
                    Leave
                  </button>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>

      {isCreator ? (
        <div className="flex flex-wrap gap-3 border-t border-zinc-200/80 pt-6 dark:border-zinc-800/80">
          <button type="button" disabled={pending} onClick={() => close("closed")} className={btnGhost}>
            Close request
          </button>
          <button
            type="button"
            disabled={pending}
            onClick={() => close("cancelled")}
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold text-rose-700 underline-offset-2 hover:underline dark:text-rose-400"
          >
            Cancel request
          </button>
        </div>
      ) : null}
    </div>
  );
}
