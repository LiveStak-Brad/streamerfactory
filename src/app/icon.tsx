import { ImageResponse } from "next/og";

/** Tab favicon — matches SiteHeader SF badge (dark tile + accent border). */
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          backgroundColor: "#18181b",
          borderRadius: 9,
          border: "1px solid rgba(129, 140, 248, 0.45)",
          boxShadow:
            "0 0 0 1px rgba(99, 102, 241, 0.25), inset 0 1px 0 rgba(255,255,255,0.06)",
          color: "#fafafa",
          fontSize: 15,
          fontWeight: 700,
          letterSpacing: "-0.04em",
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 9,
            background:
              "linear-gradient(135deg, rgba(129, 140, 248, 0.22) 0%, transparent 55%)",
          }}
        />
        <span style={{ position: "relative" }}>SF</span>
      </div>
    ),
    { ...size },
  );
}
