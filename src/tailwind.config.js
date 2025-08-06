/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#000000",
        background: "#2d2d2d",
        accent: "#d85500",
        hoverAccent: "#6c2b0a",
        light: "#f2f2f2",
      },
    },
  },
  plugins: [],
}
