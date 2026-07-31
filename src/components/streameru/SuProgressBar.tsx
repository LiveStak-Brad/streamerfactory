type Props = {
  value: number;
  className?: string;
  trackClassName?: string;
  /** Accessible label for the progressbar role */
  label?: string;
};

export function SuProgressBar({ value, className = "", trackClassName = "", label }: Props) {
  const pct = Math.min(100, Math.max(0, value));
  return (
    <div
      className={`su-progress-track h-2 bg-[color-mix(in_oklab,var(--muted-bg)_88%,var(--border))] ${trackClassName} ${className}`}
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
    >
      <div className="su-progress-fill" style={{ width: `${pct}%` }} />
    </div>
  );
}
