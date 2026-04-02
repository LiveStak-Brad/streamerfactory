import { ImageResponse } from "next/og";

import { site } from "@/lib/site";
import { loadSfBadgeFont, SF_BADGE_FONT, SfBadgeMark } from "@/lib/og/sf-badge-icon";

/** Shared 1200×630 preview for Open Graph and Twitter/X. */
export async function renderShareImage() {
  const data = await loadSfBadgeFont();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: 72,
          paddingRight: 80,
          background:
            "linear-gradient(145deg, #050508 0%, #0f0f14 42%, #12121a 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 220,
            height: 220,
            flexShrink: 0,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <SfBadgeMark
            borderRadius={52}
            borderWidth={4}
            fontSize={118}
            glow="0 0 0 2px rgba(76, 29, 149, 0.45), 0 16px 48px -10px rgba(91, 33, 182, 0.55)"
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginLeft: 56,
            flex: 1,
            gap: 0,
          }}
        >
          <div
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontSize: 58,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              color: "#fafafa",
              lineHeight: 1.05,
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              marginTop: 20,
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontSize: 28,
              fontWeight: 700,
              lineHeight: 1.35,
              color: "#a1a1aa",
            }}
          >
            {site.tagline}
          </div>
          <div
            style={{
              marginTop: 36,
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: "0.02em",
              color: "#a78bfa",
            }}
          >
            {site.domain}
          </div>
          <div
            style={{
              marginTop: 18,
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontSize: 20,
              fontWeight: 700,
              color: "#71717a",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            TikTok LIVE creator agency
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [{ ...SF_BADGE_FONT, data }],
    },
  );
}
