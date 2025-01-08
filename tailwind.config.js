/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./content/**/*.{html,md,njk,ejs,pug}",
    "./_includes/**/*.{html,md,njk,ejs,pug}",
    "./eleventy.config.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "PowerGrotesk",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
      colors: {
        brand: {
          50: "#fcecff",
          100: "#f0d6fa",
          200: "#ddabf0",
          300: "#c97ce7",
          400: "#b955df",
          500: "#af3dda",
          600: "#aa30d9",
          700: "#9522c0",
          800: "#851cac",
          900: "#741398",
        },
      },
      animation: {
        "spin-slow": "spin 60s linear infinite",
      },
    },
  },
  plugins: [],
};
