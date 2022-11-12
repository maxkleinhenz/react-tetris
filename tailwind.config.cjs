/** @type {import('tailwindcss').Config} */
module.exports = {
  jit: true,
  darkMode: "class",
  content: ["./index.html", "src/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
