"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/Button";
import {
  acknowledgeCalendarStepAction,
  acknowledgeResourcesStepAction,
  completeOnboardingAction,
  type OnboardingSaveState,
  saveOnboardingProfileAction,
} from "@/lib/onboarding/actions";
import { ONBOARDING_TIMEZONES } from "@/lib/onboarding/timezones";
import type { Profile } from "@/lib/auth/server";

type Props = {
  profile: Profile;
  battleEventCount: number;
  /** Show a success banner when onboarding was already marked complete. */
  showCompletedBanner?: boolean;
};

function SubmitProfileButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="primary" disabled={pending} className="min-h-[44px]">
      {pending ? "Saving…" : "Save profile"}
    </Button>
  );
}

export function WelcomeContent({
  profile,
  battleEventCount,
  showCompletedBanner = false,
}: Props) {
  const [saveState, saveAction] = useActionState(saveOnboardingProfileAction, {} as OnboardingSaveState);
  const [resState, resAck] = useActionState(acknowledgeResourcesStepAction, {} as OnboardingSaveState);
  const [calState, calAck] = useActionState(acknowledgeCalendarStepAction, {} as OnboardingSaveState);
  const [doneState, doneAction] = useActionState(completeOnboardingAction, {} as OnboardingSaveState);

  const hasTiktok = Boolean(profile.tiktok_username?.trim());
  const hasTimezone = Boolean(profile.timezone?.trim());
  const resourcesDone = Boolean(profile.onboarding_resources_ack_at);
  const calendarDone = Boolean(profile.onboarding_calendar_ack_at);
  const hasBattle = battleEventCount > 0;

  const stepsComplete = [
    hasTiktok && hasTimezone,
    resourcesDone,
    hasBattle,
    calendarDone,
  ].filter(Boolean).length;

  return (
    <div className="space-y-12">
      {showCompletedBanner ? (
        <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/50 p-5 dark:border-emerald-900/40 dark:bg-emerald-950/20 sm:p-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-800 dark:text-emerald-300">
            Getting started complete
          </p>
          <p className="mt-2 text-sm leading-relaxed text-emerald-950/90 dark:text-emerald-100/90">
            You&apos;ve marked onboarding done. The checklist stays here so you can update your handle or work
            through steps anytime.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button href="/battle-hub" variant="primary">
              Open Battle Hub
            </Button>
            <Button href="/resources" variant="secondary">
              Resources
            </Button>
          </div>
        </div>
      ) : null}

      <div className="rounded-2xl border border-zinc-200/90 bg-gradient-to-b from-surface to-muted-bg/30 p-6 shadow-sm dark:border-zinc-800 dark:from-zinc-950/80 dark:to-zinc-950/40 sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent dark:text-accent-muted">
              Your progress
            </p>
            <p className="mt-2 text-2xl font-bold tabular-nums text-zinc-950 dark:text-zinc-50">
              {stepsComplete}{" "}
              <span className="text-lg font-semibold text-zinc-500 dark:text-zinc-400">/ 4</span>
            </p>
          </div>
          <div className="h-2 max-w-[200px] flex-1 rounded-full bg-zinc-200 dark:bg-zinc-800">
            <div
              className="h-2 rounded-full bg-accent transition-[width] duration-500 dark:bg-accent-muted"
              style={{ width: `${(stepsComplete / 4) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <ol className="space-y-6">
        <li className="rounded-2xl border border-zinc-200/90 bg-surface p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/50 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-950 text-sm font-bold text-white dark:bg-white dark:text-zinc-950">
                1
              </span>
              <h2 className="mt-4 text-xl font-bold text-zinc-950 dark:text-zinc-50">
                Confirm your TikTok username & timezone
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                We use this to coordinate battles and calendar times with the network. You can update it
                anytime.
              </p>
            </div>
            {hasTiktok && hasTimezone ? (
              <span className="shrink-0 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-900 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-200">
                Saved
              </span>
            ) : null}
          </div>
          <form action={saveAction} className="mt-6 grid gap-4 sm:max-w-lg">
            {saveState?.error ? (
              <p className="text-sm text-red-600 dark:text-red-400" role="alert">
                {saveState.error}
              </p>
            ) : null}
            <div>
              <label htmlFor="tiktok_username" className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                TikTok username
              </label>
              <div className="mt-1.5 flex rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
                <span className="flex items-center pl-3 text-zinc-500">@</span>
                <input
                  id="tiktok_username"
                  name="tiktok_username"
                  type="text"
                  defaultValue={profile.tiktok_username ?? ""}
                  placeholder="yourhandle"
                  autoComplete="username"
                  className="w-full rounded-xl border-0 bg-transparent py-2.5 pr-3 text-zinc-950 outline-none placeholder:text-zinc-400 dark:text-zinc-50"
                />
              </div>
            </div>
            <div>
              <label htmlFor="timezone" className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                Timezone
              </label>
              <select
                id="timezone"
                name="timezone"
                defaultValue={profile.timezone ?? ""}
                className="mt-1.5 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-zinc-950 shadow-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
              >
                {ONBOARDING_TIMEZONES.map((z) => (
                  <option key={z.value || "empty"} value={z.value}>
                    {z.label}
                  </option>
                ))}
              </select>
            </div>
            <SubmitProfileButton />
          </form>
        </li>

        <li className="rounded-2xl border border-zinc-200/90 bg-surface p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/50 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-950 text-sm font-bold text-white dark:bg-white dark:text-zinc-950">
                2
              </span>
              <h2 className="mt-4 text-xl font-bold text-zinc-950 dark:text-zinc-50">Follow the Start Here path</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                A curated sequence — LIVE basics, consistency, battles & calendar, then monetization. Read in
                order or skim; it&apos;s the same spine we recommend for every new network member.
              </p>
            </div>
            {resourcesDone ? (
              <span className="shrink-0 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-900 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-200">
                Done
              </span>
            ) : null}
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button href="/resources/start-here" variant="secondary">
              Open Start Here
            </Button>
            <form action={resAck}>
              <Button type="submit" variant="primary" className="min-h-[44px]">
                Mark as read
              </Button>
            </form>
            {resState?.error ? (
              <p className="w-full text-sm text-red-600 dark:text-red-400">{resState.error}</p>
            ) : null}
          </div>
        </li>

        <li className="rounded-2xl border border-zinc-200/90 bg-surface p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/50 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-950 text-sm font-bold text-white dark:bg-white dark:text-zinc-950">
                3
              </span>
              <h2 className="mt-4 text-xl font-bold text-zinc-950 dark:text-zinc-50">Schedule your first battle</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                Create a LIVE battle event with flexible formats, participants, and a shareable flyer.
              </p>
            </div>
            {hasBattle ? (
              <span className="shrink-0 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-900 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-200">
                Scheduled
              </span>
            ) : null}
          </div>
          <div className="mt-6">
            <Button href="/battle-hub/scheduler/new" variant="primary">
              New battle event
            </Button>
          </div>
        </li>

        <li className="rounded-2xl border border-zinc-200/90 bg-surface p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/50 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-950 text-sm font-bold text-white dark:bg-white dark:text-zinc-950">
                4
              </span>
              <h2 className="mt-4 text-xl font-bold text-zinc-950 dark:text-zinc-50">Review the battle calendar</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                See what&apos;s coming up across the network so you can plan around other battles.
              </p>
            </div>
            {calendarDone ? (
              <span className="shrink-0 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-900 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-200">
                Done
              </span>
            ) : null}
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button href="/battle-hub/calendar" variant="secondary">
              Open calendar
            </Button>
            <form action={calAck}>
              <Button type="submit" variant="primary" className="min-h-[44px]">
                I&apos;ve reviewed it
              </Button>
            </form>
            {calState?.error ? (
              <p className="w-full text-sm text-red-600 dark:text-red-400">{calState.error}</p>
            ) : null}
          </div>
        </li>
      </ol>

      <div className="rounded-2xl border border-accent/25 bg-accent/5 p-6 dark:border-accent/35 dark:bg-accent/10 sm:p-8">
        <h3 className="text-lg font-bold text-zinc-950 dark:text-zinc-50">Finish getting started</h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          When you&apos;re ready, mark onboarding complete. You can always return here from the nav under{" "}
          <strong className="text-zinc-800 dark:text-zinc-200">Getting started</strong>.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <form action={doneAction}>
            <Button type="submit" variant="primary" className="min-h-[48px]">
              Complete & go to Battle Hub
            </Button>
          </form>
          <Button href="/battle-hub" variant="secondary">
            Skip for now
          </Button>
        </div>
        {doneState?.error ? (
          <p className="mt-3 text-sm text-red-600 dark:text-red-400">{doneState.error}</p>
        ) : null}
        <p className="mt-4 text-xs text-zinc-500 dark:text-zinc-500">
          Prefer to explore first?{" "}
          <Link href="/" className="font-semibold text-accent hover:underline dark:text-accent-muted">
            Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}
