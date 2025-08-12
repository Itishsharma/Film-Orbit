/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark': '#0d0d0d',
        'muted': '#888888',
        'accent': '#ff6600',
        'accent-dark': '#cc5200'
      },
      boxShadow: {
        'glow-orange': '0 0 10px #ff6600'
      },
      borderRadius: {
        'DEFAULT': '0.25rem',
        'none': '0',
        'sm': '0.125rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        'full': '9999px',
      }
    }
  },
  plugins: []
}
