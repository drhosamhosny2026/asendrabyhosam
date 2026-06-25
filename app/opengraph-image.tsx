import { ImageResponse } from "next/og";

export const alt = "ASCENDRA — Business Systems & Growth Builder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0B1D33",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 100px",
          position: "relative",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        {/* Gold top bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 5,
            background: "#D4AF37",
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0,
          }}
        >
          {/* Wordmark */}
          <div
            style={{
              fontSize: 100,
              fontWeight: 600,
              color: "#FFFFFF",
              letterSpacing: "0.22em",
              lineHeight: 1,
              marginBottom: 48,
            }}
          >
            ASCENDRA
          </div>

          {/* Gold divider */}
          <div
            style={{
              width: 56,
              height: 1,
              background: "#D4AF37",
              opacity: 0.45,
              marginBottom: 40,
            }}
          />

          {/* Tagline */}
          <div
            style={{
              fontSize: 22,
              color: "#F0F2F4",
              opacity: 0.65,
              letterSpacing: "0.06em",
              textAlign: "center",
              fontFamily: "Arial, Helvetica, sans-serif",
              fontWeight: 400,
              lineHeight: 1.5,
            }}
          >
            Build Systems.&nbsp;&nbsp;Enable Growth.&nbsp;&nbsp;Drive Transformation.
          </div>
        </div>

        {/* Bottom domain */}
        <div
          style={{
            position: "absolute",
            bottom: 44,
            fontSize: 18,
            color: "#D4AF37",
            opacity: 0.55,
            letterSpacing: "0.12em",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          ascendrabyhosam.com
        </div>

        {/* Gold bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 5,
            background: "#D4AF37",
          }}
        />
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
