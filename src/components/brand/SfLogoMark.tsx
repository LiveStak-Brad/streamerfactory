import Image from "next/image";

import { brandAssets } from "@/lib/brand/assets";

export type SfLogoMarkProps = {
  /** Header (44px), footer (40px), cards (36px). */
  size?: "sm" | "md" | "lg";
  className?: string;
  /** Use full circular logo (SF + wordmark). Default is the SF mark for navbar density. */
  variant?: "mark" | "full";
};

const sizePx: Record<NonNullable<SfLogoMarkProps["size"]>, number> = {
  sm: 36,
  md: 40,
  lg: 44,
};

const sizeClass: Record<NonNullable<SfLogoMarkProps["size"]>, string> = {
  sm: "h-9 w-9 min-h-9 min-w-9",
  md: "h-10 w-10 min-h-10 min-w-10",
  lg: "h-11 w-11 min-h-11 min-w-11",
};

/**
 * Streamer Factory logo mark — approved SF identity (mark or full logo).
 */
export function SfLogoMark({
  size = "lg",
  className = "",
  variant = "mark",
}: SfLogoMarkProps) {
  const px = sizePx[size];
  const src =
    variant === "full"
      ? brandAssets.logo.png128
      : brandAssets.logo.markPng(px <= 36 ? 64 : 128);

  return (
    <span
      className={`relative inline-flex shrink-0 overflow-hidden rounded-xl shadow-[0_0_0_1px_rgba(160,32,240,0.35),0_4px_14px_-2px_rgba(0,229,255,0.25)] ${sizeClass[size]} ${className}`}
      aria-hidden
    >
      <Image
        src={src}
        alt=""
        width={px}
        height={px}
        className="h-full w-full object-cover"
        priority={size === "lg"}
      />
    </span>
  );
}
