import type { ReactNode } from "react";
import Link from "next/link";
import { FOUNDER } from "@/lib/founder/content";

export type FounderInsightVariant = "insight" | "tip" | "experience";

const LABELS: Record<FounderInsightVariant, string> = {
  insight: "Founder insight",
  tip: "From Brad's experience",
  experience: "Tested across multiple livestreaming platforms",
};

type Props = {
  children: ReactNode;
  /** Visual / label variant — never invent quotes; pass only verified copy. */
  variant?: FounderInsightVariant;
  /** Optional override when the approved source uses a different label. */
  label?: string;
  className?: string;
  showFounderLink?: boolean;
};

/**
 * Restrained founder-authority surface for StreamerU.
 * Place only with verified founder content — do not fabricate stats or stories.
 */
export function FounderInsight({
  children,
  variant = "insight",
  label,
  className = "",
  showFounderLink = false,
}: Props) {
  const eyebrow = label ?? LABELS[variant];

  return (
    <aside
      className={`rounded-2xl border border-border/80 bg-surface/90 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-950/55 ${className}`}
      aria-label={eyebrow}
    >
      <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-accent dark:text-accent-muted">
        {eyebrow}
      </p>
      <div className="mt-2 text-sm leading-relaxed text-muted">{children}</div>
      {showFounderLink ? (
        <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-500">
          <Link
            href="/founder"
            className="font-semibold text-accent hover:underline dark:text-accent-muted"
          >
            Meet {FOUNDER.name}
          </Link>
        </p>
      ) : null}
    </aside>
  );
}

/** Tip-styled founder callout — same component, tip label. */
export function BradTip(props: Omit<Props, "variant">) {
  return <FounderInsight {...props} variant="tip" />;
}

/** Multi-platform experience framing — same component, experience label. */
export function FromExperience(props: Omit<Props, "variant">) {
  return <FounderInsight {...props} variant="experience" />;
}
