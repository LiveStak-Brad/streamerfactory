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
        glow="0 0 0 1px rgba(160, 32, 240, 0.4), 0 4px 14px -2px rgba(0, 229, 255, 0.35)"
      />
    ),
    {
      ...size,
      fonts: [{ ...SF_BADGE_FONT, data }],
    },
  );
}
