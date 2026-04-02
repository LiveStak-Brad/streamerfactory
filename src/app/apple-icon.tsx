import { ImageResponse } from "next/og";

import { loadSfBadgeFont, SF_BADGE_FONT, SfBadgeMark } from "@/lib/og/sf-badge-icon";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const data = await loadSfBadgeFont();

  return new ImageResponse(
    (
      <SfBadgeMark
        borderRadius={44}
        borderWidth={4}
        fontSize={96}
        glow="0 0 0 2px rgba(76, 29, 149, 0.4), 0 12px 40px -8px rgba(91, 33, 182, 0.55)"
      />
    ),
    {
      ...size,
      fonts: [{ ...SF_BADGE_FONT, data }],
    },
  );
}
