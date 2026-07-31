import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { FOUNDER } from "@/lib/founder/content";

export type FounderInsightVariant = "insight" | "tip" | "experience";

const LABELS: Record<FounderInsightVariant, string> = {
  insight: "Founder insight",
  tip: "From Brad's experience",
  experience: "Tested across multiple livestreaming platforms",
};

const CREDENTIALS = [
  "Founder of Streamer Factory",
  "TikTok LIVE Pro",
  "#1 Kik Creator",
] as const;

type Props = {
  children: ReactNode;
  /** Visual / label variant — never invent quotes; pass only verified copy. */
  variant?: FounderInsightVariant;
  /** Optional override when the approved source uses a different label. */
  label?: string;
  className?: string;
  showFounderLink?: boolean;
  /** Show circular founder photo + credential chips */
  showPhoto?: boolean;
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
  showPhoto = false,
}: Props) {
  const eyebrow = label ?? LABELS[variant];

  return (
    <aside
      className={`rounded-2xl border border-border/80 bg-surface/90 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-950/55 ${className}`}
      aria-label={eyebrow}
    >
      <div className={showPhoto ? "flex gap-4" : undefined}>
        {showPhoto ? (
          <div className="shrink-0">
            <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-accent/30 ring-2 ring-accent/10 sm:h-[72px] sm:w-[72px]">
              <Image
                src={FOUNDER.photo}
                alt={FOUNDER.name}
                width={72}
                height={72}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        ) : null}
        <div className="min-w-0 flex-1">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-accent dark:text-accent-muted">
            {eyebrow}
          </p>
          {showPhoto ? (
            <p className="mt-1 text-sm font-bold text-foreground">{FOUNDER.name}</p>
          ) : null}
          {showPhoto ? (
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {CREDENTIALS.map((c) => (
                <li
                  key={c}
                  className="rounded-md border border-border/70 bg-muted-bg/50 px-2 py-0.5 text-[10px] font-semibold text-muted dark:border-zinc-700 dark:bg-zinc-900/50"
                >
                  {c}
                </li>
              ))}
            </ul>
          ) : null}
          <div className={`text-sm leading-relaxed text-muted ${showPhoto ? "mt-3" : "mt-2"}`}>
            {children}
          </div>
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
        </div>
      </div>
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
