type ProgressRingProps = {
  /** 0–100 */
  value: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
  className?: string;
  /** Accent stroke color class (Tailwind text-* for currentColor) */
  toneClassName?: string;
};

/**
 * Circular progress indicator. Pass a real 0–100 value — do not invent completion.
 */
export function ProgressRing({
  value,
  size = 112,
  strokeWidth = 8,
  label,
  sublabel,
  className = "",
  toneClassName = "text-accent dark:text-accent-muted",
}: ProgressRingProps) {
  const clamped = Math.max(0, Math.min(100, Number.isFinite(value) ? value : 0));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-zinc-200 dark:text-zinc-800"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={`${toneClassName} transition-[stroke-dashoffset] duration-700 ease-out motion-reduce:transition-none`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center px-2 text-center">
        <span className="text-lg font-bold tracking-tight text-foreground tabular-nums">
          {Math.round(clamped)}%
        </span>
        {label ? <span className="mt-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-muted">{label}</span> : null}
        {sublabel ? <span className="text-[0.65rem] text-muted">{sublabel}</span> : null}
      </div>
      <span className="sr-only">
        {label ?? "Progress"}: {Math.round(clamped)} percent
        {sublabel ? `, ${sublabel}` : ""}
      </span>
    </div>
  );
}
