import { ImageResponse } from "next/og";

import { loadSfBadgeFont, SF_BADGE_FONT, SfBadgeMark } from "@/lib/og/sf-badge-icon";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  const data = await loadSfBadgeFont();

  return new ImageResponse(
    (
      <SfBadgeMark
        borderRadius={8}
        borderWidth={1}
        fontSize={19}
        glow="0 0 0 1px rgba(76, 29, 149, 0.35), 0 4px 14px -2px rgba(91, 33, 182, 0.45)"
      />
    ),
    {
      ...size,
      fonts: [{ ...SF_BADGE_FONT, data }],
    },
  );
}
