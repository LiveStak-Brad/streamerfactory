import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FREE_NETWORK } from "@/lib/positioning/free-network";
import { tiktokCreatorNetworkApplyUrl } from "@/lib/site";

/**
 * Free academy + free network conversion — no paid-upgrade framing.
 */
export function AcademyConversionStrip() {
  return (
    <section
      className="rounded-2xl border border-border/80 bg-gradient-to-br from-accent-soft/50 via-surface to-surface p-6 dark:border-zinc-800 dark:from-accent/10 dark:via-zinc-950 dark:to-zinc-950 sm:p-8"
      aria-labelledby="su-conversion-heading"
    >
      <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-accent dark:text-accent-muted">
        {FREE_NETWORK.strip}
      </p>
      <h2
        id="su-conversion-heading"
        className="mt-1 text-xl font-bold tracking-tight text-foreground sm:text-2xl"
      >
        Membership is free. StreamerU is included.
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
        {FREE_NETWORK.shortValue} Creators never pay membership fees —{" "}
        {FREE_NETWORK.howFunded} Graduating unlocks recognition and may help prepare you for future
        Mentor or Manager opportunities — an invitation path, never a guarantee.
      </p>
      <ul className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-muted">
        {FREE_NETWORK.included.map((item) => (
          <li
            key={item}
            className="rounded-md border border-border/70 bg-muted-bg/40 px-2 py-1 capitalize dark:border-zinc-700 dark:bg-zinc-900/40"
          >
            {item}
          </li>
        ))}
      </ul>
      <div className="mt-5 flex flex-wrap gap-3">
        <Button
          href={tiktokCreatorNetworkApplyUrl}
          external
          variant="primary"
          className="min-h-[44px] px-5"
        >
          {FREE_NETWORK.joinAndLearnCta}
        </Button>
        <Link
          href="/apply"
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-border px-5 text-sm font-semibold text-foreground dark:border-zinc-700"
        >
          {FREE_NETWORK.applyCta}
        </Link>
        <Link
          href="/streameru"
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl px-4 text-sm font-semibold text-accent hover:underline dark:text-accent-muted"
        >
          Start StreamerU Today →
        </Link>
      </div>
    </section>
  );
}
