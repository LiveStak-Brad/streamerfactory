"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import type { ApplicationSubmitState } from "@/lib/applications/actions";
import { submitApplication } from "@/lib/applications/actions";
import { Button } from "@/components/ui/Button";

const followerOptions = [
  { value: "", label: "Select range" },
  { value: "under-1k", label: "Under 1,000" },
  { value: "1k-10k", label: "1,000 – 10,000" },
  { value: "10k-50k", label: "10,000 – 50,000" },
  { value: "50k-100k", label: "50,000 – 100,000" },
  { value: "100k-plus", label: "100,000+" },
] as const;

const inputClass =
  "mt-2 w-full rounded-xl border border-zinc-200/90 bg-surface px-4 py-3.5 text-base text-foreground shadow-[0_1px_0_0_rgba(255,255,255,0.6)_inset] transition-[border-color,box-shadow] duration-200 placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25 dark:border-zinc-700 dark:bg-zinc-950/50 dark:shadow-none";

const labelClass = "text-base font-medium text-foreground";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="primary" disabled={pending} className="min-h-[48px] w-full sm:w-auto sm:min-w-[200px]">
      {pending ? "Submitting…" : "Submit application"}
    </Button>
  );
}

export function ApplyForm() {
  const [state, formAction] = useActionState(submitApplication, {} as ApplicationSubmitState);

  return (
    <form action={formAction} className="space-y-8">
      {state?.error && (
        <div
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200"
          role="alert"
        >
          {state.error}
        </div>
      )}

      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor="fullName" className={labelClass}>
            Full name <span className="text-accent">*</span>
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            autoComplete="name"
            className={inputClass}
            placeholder="Your legal name"
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email <span className="text-accent">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClass}
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor="tiktokUsername" className={labelClass}>
            TikTok username <span className="text-accent">*</span>
          </label>
          <p className="mt-1 text-sm text-muted">
            For your application review. After approval, you&apos;ll use member tools and StreamerU with the same
            account.
          </p>
          <input
            id="tiktokUsername"
            name="tiktokUsername"
            type="text"
            required
            className={inputClass}
            placeholder="@handle"
          />
        </div>
        <div>
          <label htmlFor="country" className={labelClass}>
            Country <span className="text-accent">*</span>
          </label>
          <input
            id="country"
            name="country"
            type="text"
            required
            autoComplete="country-name"
            className={inputClass}
            placeholder="Where you primarily create"
          />
        </div>
      </div>

      <div>
        <label htmlFor="followerCount" className={labelClass}>
          Current follower count <span className="text-accent">*</span>
        </label>
        <select id="followerCount" name="followerCount" required className={inputClass} defaultValue="">
          {followerOptions.map((opt) => (
            <option key={opt.value || "empty"} value={opt.value} disabled={opt.value === ""}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <fieldset>
        <legend className={labelClass}>
          Do you currently go live on TikTok? <span className="text-accent">*</span>
        </legend>
        <div className="mt-3 flex flex-wrap gap-6">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
            <input type="radio" name="goesLive" value="yes" required className="h-4 w-4 accent-accent" />
            Yes
          </label>
          <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
            <input type="radio" name="goesLive" value="no" required className="h-4 w-4 accent-accent" />
            No
          </label>
        </div>
      </fieldset>

      <div>
        <label htmlFor="whyJoin" className={labelClass}>
          Why do you want to join Streamer Factory? <span className="text-accent">*</span>
        </label>
        <textarea
          id="whyJoin"
          name="whyJoin"
          required
          rows={5}
          className={`${inputClass} resize-y min-h-[120px]`}
          placeholder="Share your goals, schedule, and what you want to improve on LIVE."
        />
      </div>

      <div className="rounded-2xl border border-zinc-200/90 bg-muted-bg/50 px-4 py-4 dark:border-zinc-800 dark:bg-zinc-950/40">
        <label className="flex cursor-pointer gap-3 text-sm leading-relaxed text-foreground">
          <input
            type="checkbox"
            name="contactConsent"
            required
            className="mt-1 h-4 w-4 shrink-0 rounded border-zinc-300 accent-accent dark:border-zinc-600"
          />
          <span>
            I agree that Streamer Factory may contact me about my application using the email I provided
            (and related follow-up), including information about next steps or fit.{" "}
            <span className="text-accent">*</span>
          </span>
        </label>
      </div>

      <div className="flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          We only use your details to evaluate and respond to this application—not for unrelated marketing
          unless you hear from us and opt in separately.
        </p>
        <SubmitButton />
      </div>
    </form>
  );
}
