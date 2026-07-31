import Link from "next/link";

type Props = {
  /** Path after login, e.g. `/battle-hub/scheduler` */
  loginNext: string;
  headline?: string;
};

export function BattleHubPreviewBanner({
  loginNext,
  headline = "You are viewing a preview",
}: Props) {
  const next = encodeURIComponent(loginNext.startsWith("/") ? loginNext : `/${loginNext}`);

  return (
    <div className="mb-8 rounded-2xl border border-amber-200/80 bg-amber-50/95 px-4 py-4 shadow-sm dark:border-amber-900/50 dark:bg-amber-950/35">
      <p className="text-sm font-semibold text-amber-950 dark:text-amber-100">{headline}</p>
      <p className="mt-1.5 text-sm leading-relaxed text-amber-900/95 dark:text-amber-100/90">
        This screen is read-only sample UI. Approved members sign in to schedule real battles, publish to the
        shared calendar, and use the full flyer builder — the same path whether you start from the scheduler
        or the calendar.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Link
          href={`/login?next=${next}`}
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-zinc-950 px-5 py-2.5 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950"
        >
          Sign in as a member
        </Link>
        <Link
          href="/apply"
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-zinc-200 px-5 py-2.5 text-sm font-semibold text-zinc-900 dark:border-zinc-600 dark:text-zinc-100"
        >
          Join FREE
        </Link>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-amber-900/90 dark:text-amber-200/85">
        Already submitted an application?{" "}
        <Link
          href="/login?next=%2Fapplication-status"
          className="font-semibold text-amber-950 underline-offset-2 hover:underline dark:text-amber-50"
        >
          Sign in
        </Link>{" "}
        — then open{" "}
        <Link
          href="/application-status"
          className="font-semibold text-amber-950 underline-offset-2 hover:underline dark:text-amber-50"
        >
          Application status
        </Link>{" "}
        from the menu (applicants).
      </p>
    </div>
  );
}
