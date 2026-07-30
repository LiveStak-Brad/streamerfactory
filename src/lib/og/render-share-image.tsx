import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

import { brandColors } from "@/lib/brand/assets";
import { site } from "@/lib/site";
import { loadSfBadgeFont, SF_BADGE_FONT, SfBadgeMark } from "@/lib/og/sf-badge-icon";

type ShareImageOptions = {
  title?: string;
  subtitle?: string;
};

async function loadLogoPng(): Promise<ArrayBuffer | null> {
  try {
    const buf = await readFile(join(process.cwd(), "public/branding/logo/sflogo-256.png"));
    return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
  } catch {
    return null;
  }
}

/** Shared 1200×630 preview for Open Graph and Twitter/X. */
export async function renderShareImage(options: ShareImageOptions = {}) {
  const data = await loadSfBadgeFont();
  const logoData = await loadLogoPng();
  const title = options.title ?? site.name;
  const subtitle = options.subtitle ?? site.tagline;

  const logoNode = logoData ? (
    // eslint-disable-next-line @next/next/no-img-element -- OG ImageResponse
    <img
      src={`data:image/png;base64,${Buffer.from(logoData).toString("base64")}`}
      width={220}
      height={220}
      alt=""
      style={{ width: 220, height: 220, objectFit: "contain" }}
    />
  ) : (
    <SfBadgeMark
      borderRadius={52}
      borderWidth={4}
      fontSize={118}
      glow="0 0 0 2px rgba(160, 32, 240, 0.45), 0 16px 48px -10px rgba(0, 229, 255, 0.35)"
    />
  );

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
          background: `linear-gradient(145deg, #05080F 0%, ${brandColors.navy} 42%, ${brandColors.charcoal} 100%)`,
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
          {logoNode}
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
              fontSize: 54,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              color: "#fafafa",
              lineHeight: 1.05,
            }}
          >
            {title}
          </div>
          <div
            style={{
              marginTop: 20,
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontSize: 26,
              fontWeight: 700,
              lineHeight: 1.35,
              color: "#a1a1aa",
            }}
          >
            {subtitle}
          </div>
          <div
            style={{
              marginTop: 36,
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: "0.02em",
              color: brandColors.cyan,
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
