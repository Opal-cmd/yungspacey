import { ImageResponse } from "next/og";

export const alt =
  "yungspacey (Yung Spacey) — music producer & sound engineer, Toronto";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "72px",
          background: "#000000",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 70% 20%, rgba(139,92,246,0.28), transparent 55%), radial-gradient(ellipse at 15% 90%, rgba(200,220,255,0.12), transparent 45%)",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <div
            style={{
              color: "#e8f0ff",
              fontSize: 92,
              fontWeight: 800,
              letterSpacing: "-0.05em",
              lineHeight: 0.95,
              fontFamily: "system-ui, sans-serif",
            }}
          >
            yungspacey
          </div>
          <div
            style={{
              width: 280,
              height: 1,
              background:
                "linear-gradient(90deg, rgba(167,139,250,0.9), transparent)",
            }}
          />
          <div
            style={{
              color: "#f5f5f5",
              fontSize: 34,
              fontWeight: 600,
              letterSpacing: "-0.02em",
              maxWidth: 820,
              lineHeight: 1.25,
              fontFamily: "system-ui, sans-serif",
            }}
          >
            Uncompromising sonics for the underground.
          </div>
          <div
            style={{
              marginTop: 8,
              color: "#8a8a8a",
              fontSize: 22,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            Music producer · Sound engineer · Toronto
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
