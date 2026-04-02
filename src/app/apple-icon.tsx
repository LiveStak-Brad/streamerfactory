import { ImageResponse } from "next/og";

/** Home-screen icon — same SF badge, larger canvas. */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
          borderRadius: 49,
          border: "4px solid rgba(129, 140, 248, 0.45)",
          boxShadow:
            "0 0 0 2px rgba(99, 102, 241, 0.25), inset 0 2px 0 rgba(255,255,255,0.06)",
          color: "#fafafa",
          fontSize: 84,
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
            borderRadius: 49,
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
