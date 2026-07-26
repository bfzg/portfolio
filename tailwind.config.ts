import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0A",
        accent: "#D97706",
        "accent-light": "#FEF3C7",
        "accent-dark": "#92400E",
        muted: "#737373",
        border: "#E5E5E5",
        surface: "#F5F5F5",
      },
      fontFamily: {
        sans: ["Noto Sans SC", "sans-serif"],
        mono: ["Outfit", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
