/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        background: "#1e293b",
        primary: "#e3712e",
        secondary: "#56B7CB",
        tertiary: "#DF4894",
        dark: "#434A42",
        accent: {
          DEFAULT: "#A53860",
          dark: "#82284A",
        },
      },
      screens: {
        mobile: "394px",
      },
    },
  },
  plugins: [],
};
