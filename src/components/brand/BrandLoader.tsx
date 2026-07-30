import Image from "next/image";

import { brandAssets } from "@/lib/brand/assets";

type BrandLoaderProps = {
  label?: string;
  className?: string;
};

/**
 * Branded loading state — SF mark, soft glow, subtle ring motion. No generic spinners.
 */
export function BrandLoader({ label = "Loading…", className = "" }: BrandLoaderProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-5 py-16 ${className}`}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <div className="relative flex h-28 w-28 items-center justify-center">
        <span
          className="sf-loader-glow absolute inset-[-12%] rounded-full bg-[radial-gradient(circle,rgba(160,32,240,0.4)_0%,rgba(0,229,255,0.12)_50%,transparent_70%)]"
          aria-hidden
        />
        <span
          className="sf-loader-ring absolute inset-0 rounded-full border-2 border-transparent border-t-[#FF2ED1] border-r-[#A020F0] border-b-[#00E5FF]"
          aria-hidden
        />
        <Image
          src={brandAssets.loading.mark}
          alt=""
          width={88}
          height={88}
          className="relative z-10 h-[88px] w-[88px] object-contain drop-shadow-[0_0_24px_rgba(0,229,255,0.35)]"
          priority
        />
      </div>
      <p className="text-sm font-semibold tracking-[0.18em] text-muted uppercase">{label}</p>
    </div>
  );
}
