import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

export type SfLogoMarkProps = {
  /** Header (44px), footer (40px), cards (36px). */
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeClass: Record<NonNullable<SfLogoMarkProps["size"]>, string> = {
  sm: "h-9 w-9 min-h-9 min-w-9 rounded-lg text-[0.98rem] border-[1.5px]",
  md: "h-10 w-10 min-h-10 min-w-10 rounded-xl text-lg border-2",
  lg: "h-11 w-11 min-h-11 min-w-11 rounded-xl text-xl border-[1.5px]",
};

/**
 * SF wordmark tile — matches generated favicon / apple-touch (Plus Jakarta Sans, violet rim, glow).
 */
export function SfLogoMark({ size = "lg", className = "" }: SfLogoMarkProps) {
  return (
    <span
      className={`${plusJakarta.className} relative inline-flex shrink-0 items-center justify-center overflow-hidden border-[rgba(139,92,246,0.5)] bg-[#0a0a0c] font-bold text-white shadow-[0_0_0_1px_rgba(76,29,149,0.35),0_4px_14px_-2px_rgba(91,33,182,0.45)] ${sizeClass[size]} ${className}`}
      aria-hidden
    >
      <span
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-400/35 via-violet-500/12 to-transparent"
        aria-hidden
      />
      <span className="relative tracking-[-0.065em] [text-shadow:0_1px_0_rgba(255,255,255,0.14),0_2px_3px_rgba(0,0,0,0.5),0_0_16px_rgba(167,139,250,0.45)]">
        SF
      </span>
    </span>
  );
}
