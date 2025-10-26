/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: { primary: { DEFAULT: "#39FF14" } },
      boxShadow: { glow: "0 0 30px rgba(57,255,20,0.3)" },
    },
  },
  plugins: [],
};
