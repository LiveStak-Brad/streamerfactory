import Image from "next/image";

import { brandAssets } from "@/lib/brand/assets";

export type BrandIconName = keyof typeof brandAssets.icons;

type BrandIconProps = {
  name: BrandIconName;
  size?: number;
  className?: string;
  alt?: string;
};

/** Consistent Streamer Factory feature icon from the brand icon family. */
export function BrandIcon({ name, size = 24, className = "", alt = "" }: BrandIconProps) {
  return (
    <Image
      src={brandAssets.icons[name]}
      alt={alt}
      width={size}
      height={size}
      className={`inline-block ${className}`}
    />
  );
}
