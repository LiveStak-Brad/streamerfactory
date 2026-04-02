import { readFile } from "node:fs/promises";
import { join } from "node:path";

const FONT_PATH = join(process.cwd(), "assets/fonts/plus-jakarta-sans-700.woff");

let fontData: ArrayBuffer | null = null;

/** Plus Jakarta Sans 700 — readable at favicon sizes. */
export async function loadSfBadgeFont(): Promise<ArrayBuffer> {
  if (fontData) return fontData;
  const buf = await readFile(FONT_PATH);
  fontData = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
  return fontData;
}

export const SF_BADGE_FONT = {
  name: "Plus Jakarta Sans",
  style: "normal" as const,
  weight: 700 as const,
};

type SfBadgeProps = {
  borderRadius: number;
  borderWidth: number;
  fontSize: number;
  /** Outer glow (violet). */
  glow: string;
};

/**
 * “SF” wordmark: dark tile, violet rim, gradient wash, bold display type.
 */
export function SfBadgeMark({ borderRadius, borderWidth, fontSize, glow }: SfBadgeProps) {
  const letterSpacing = `${Math.round(fontSize * -0.065)}px`;
  const innerRadius = Math.max(2, borderRadius - borderWidth);
  const showInnerHairline = borderRadius >= 20;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        backgroundColor: "#0a0a0c",
        borderRadius,
        border: `${borderWidth}px solid rgba(139, 92, 246, 0.5)`,
        boxShadow: `${glow}, inset 0 1px 0 rgba(255,255,255,0.08)`,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius,
          background:
            "linear-gradient(152deg, rgba(192, 181, 255, 0.4) 0%, rgba(99, 102, 241, 0.12) 38%, transparent 62%)",
        }}
      />
      {showInnerHairline ? (
        <div
          style={{
            position: "absolute",
            inset: borderWidth,
            borderRadius: innerRadius,
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        />
      ) : null}
      <span
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Plus Jakarta Sans, sans-serif",
          fontSize,
          fontWeight: 700,
          letterSpacing,
          color: "#fafafa",
          textShadow:
            "0 1px 0 rgba(255,255,255,0.14), 0 2px 3px rgba(0,0,0,0.5), 0 0 16px rgba(167, 139, 250, 0.5)",
        }}
      >
        SF
      </span>
    </div>
  );
}
