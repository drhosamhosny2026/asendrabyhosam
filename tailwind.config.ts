import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0B1D33",
        emerald: "#0F5B46",
        gold: "#D4AF37",
        "light-gray": "#F0F2F4",
        "gray-text": "#5A6678",
      },
      fontFamily: {
        // Space Grotesk = display/headings/wordmark ; Inter = body/UI ; IBM Plex Sans Arabic = all Arabic
        serif: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        arabic: ["var(--font-plex-arabic)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        wordmark: "0.12em",
        sub: "0.02em",
        heading: "0.01em",
        label: "0.16em",
      },
      lineHeight: {
        h1: "1.1",
        h2: "1.15",
        h3: "1.2",
      },
      maxWidth: { content: "1200px" },
    },
  },
  plugins: [],
};
export default config;
