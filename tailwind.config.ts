import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F4F6F4",
        card: "#FBFCFA",
        ink: "#1C2B27",
        inkfaint: "#5B6B65",
        moss: {
          DEFAULT: "#43604F",
          dark: "#2E4739",
          light: "#7C9884",
        },
        amber: {
          DEFAULT: "#C98A3C",
          light: "#E4B876",
        },
        stone: "#DAD9D0",
        stoneline: "#C7C6BC",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "68rem",
        prose: "38rem",
      },
    },
  },
  plugins: [],
};
export default config;
