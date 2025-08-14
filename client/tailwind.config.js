/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        dark: "#121212",
        "panel-dark": "#1f1f1f",
        accent: "#d85500",
        "accent-dark": "#6c2b0a",
        muted: "#f2f2f2"
      },
      boxShadow: {
        "glow-orange": "0 8px 30px rgba(216,85,0,0.18)"
      },
      borderRadius: {
        xl2: "1rem"
      }
    }
  },
  plugins: []
}
