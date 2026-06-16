/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0f172a",
        panel: "#111827",
        primary: "#3b82f6",
        positive: "#22c55e",
        negative: "#ef4444",
        warning: "#f59e0b",
        text: "#f8fafc",
        muted: "#94a3b8",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      keyframes: {
        flash: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
      animation: {
        'flash-green': 'flash 0.5s ease-out',
        'flash-red': 'flash 0.5s ease-out',
      },
    },
  },
  plugins: [],
}
