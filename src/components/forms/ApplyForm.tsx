"use client";

import { useState, type FormEvent } from "react";
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

export function ApplyForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Placeholder: wire to API / server action later
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        className="rounded-2xl border border-zinc-200/90 bg-muted-bg p-8 sm:p-10 dark:border-zinc-800"
        role="status"
      >
        <h2 className="text-2xl font-semibold text-foreground">Application received</h2>
        <p className="mt-3 text-base leading-relaxed text-muted">
          Thanks for applying to Streamer Factory. We review every submission and
          will follow up by email if we’d like to move forward.
        </p>
        <p className="mt-4 text-base text-muted">
          No data was sent to a server in this preview—hook up your backend when
          you’re ready.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
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
        <select id="followerCount" name="followerCount" required className={inputClass}>
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

      <div className="flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          By submitting, you agree we may contact you about your application.
        </p>
        <Button type="submit" variant="primary" className="min-h-[48px] w-full sm:w-auto sm:min-w-[200px]">
          Submit application
        </Button>
      </div>
    </form>
  );
}
