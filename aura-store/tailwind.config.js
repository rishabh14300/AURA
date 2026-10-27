/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: "var(--color-obsidian)",
          hover: "var(--color-obsidian-hover)",
        },
        clay: {
          DEFAULT: "var(--color-clay)",
          hover: "var(--color-clay-hover)",
          50: "var(--color-clay-50)",
          100: "var(--color-clay-100)",
          200: "var(--color-clay-200)",
          300: "var(--color-clay-300)",
          400: "var(--color-clay-400)",
          500: "var(--color-clay-500)",
          600: "var(--color-clay-600)",
          700: "var(--color-clay-700)",
          800: "var(--color-clay-800)",
          900: "var(--color-clay-900)",
        },
        bronze: "var(--color-bronze)",
        ink: {
          DEFAULT: "var(--color-ink)",
          50: "var(--color-ink-50)",
          100: "var(--color-ink-100)",
          200: "var(--color-ink-200)",
          300: "var(--color-ink-300)",
          400: "var(--color-ink-400)",
          500: "var(--color-ink-500)",
          600: "var(--color-ink-600)",
          700: "var(--color-ink-700)",
          800: "var(--color-ink-800)",
          900: "var(--color-ink-900)",
        },
        neutral: "var(--color-neutral)",
        tertiary: "var(--color-tertiary)",
        surface: {
          DEFAULT: "var(--color-surface)",
          low: "var(--color-surface-low)",
        },
        border: "var(--color-border)",
        body: "var(--color-body)",
        muted: "var(--color-muted)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"],
      },
      letterSpacing: {
        eyebrow: "var(--tracking-eyebrow)",
        button: "var(--tracking-button)",
      },
      borderRadius: {
        atelier: "var(--radius-atelier)",
      },
      transitionTimingFunction: {
        atelier: "var(--transition-atelier)",
      },
    },
  },
  plugins: [],
};
