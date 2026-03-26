/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Design System v4 palette
        background: "#0d1020",
        surface:    "#141830",
        surface2:   "#1a2040",
        primary:    "#e86a20",  // orange
        secondary:  "#5888c8",  // blue
        tertiary:   "#c83488",  // pink
        accent: {
          DEFAULT: "#8e1a58",
          dark:    "#6e1248",
        },
        muted:    "#7080a8",
        "ds-text": "#e8e8f5",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        mono:    ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "ds-grad": "linear-gradient(90deg, #e86a20, #c83488, #5888c8)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":  "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        mobile: "394px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
