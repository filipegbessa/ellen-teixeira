import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/star-flicks-ds/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        fraunces: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-fraunces)", "serif"],
      },
      colors: {
        // Legacy variables (kept for compatibility)
        "background-body": "var(--background-body)",
        background: "var(--background)",
        foreground: "var(--foreground)",

        // Brand Colors
        primary: {
          DEFAULT: "rgb(var(--color-primary) / <alpha-value>)",
          light: "rgb(var(--color-primary-light) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "rgb(var(--color-secondary) / <alpha-value>)",
          light: "rgb(var(--color-secondary-light) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "rgb(var(--color-accent) / <alpha-value>)",
          light: "rgb(var(--color-accent-light) / <alpha-value>)",
        },

        // Surface Colors
        surface: {
          DEFAULT: "rgb(var(--color-surface) / <alpha-value>)",
          dark: "rgb(var(--color-surface-dark) / <alpha-value>)",
          elevated: "rgb(var(--color-surface-elevated) / <alpha-value>)",
          muted: "rgb(var(--color-surface-muted) / <alpha-value>)",
          section: "rgb(var(--color-surface-section) / <alpha-value>)",
        },

        // Border Colors
        border: {
          DEFAULT: "var(--color-border)",
          light: "rgb(var(--color-border-light) / <alpha-value>)",
        },

        // Text Colors (nested text classes don't work in Tailwind, creating top-level)
        "on-dark": "rgb(var(--color-text-on-dark) / <alpha-value>)",

        // Interactive States
        card: {
          hover: "rgb(var(--color-card-hover) / <alpha-value>)",
        },

        // Social/Brand Colors
        whatsapp: {
          DEFAULT: "rgb(var(--color-whatsapp) / <alpha-value>)",
          hover: "rgb(var(--color-whatsapp-hover) / <alpha-value>)",
        },
        instagram: {
          from: "rgb(var(--color-instagram-from) / <alpha-value>)",
          via: "rgb(var(--color-instagram-via) / <alpha-value>)",
          to: "rgb(var(--color-instagram-to) / <alpha-value>)",
        },
        location: {
          DEFAULT: "rgb(var(--color-location) / <alpha-value>)",
          hover: "rgb(var(--color-location-hover) / <alpha-value>)",
        },

        // Component-specific
        placeholder: "rgb(var(--color-placeholder) / <alpha-value>)",
        rating: {
          star: "rgb(var(--color-rating-star) / <alpha-value>)",
        },
        review: {
          card: "rgb(var(--color-review-card) / <alpha-value>)",
        },
        mockup: {
          border: "rgb(var(--color-mockup-border) / <alpha-value>)",
        },
        avatar: {
          blue: "rgb(var(--color-avatar-blue) / <alpha-value>)",
          orange: "rgb(var(--color-avatar-orange) / <alpha-value>)",
          green: "rgb(var(--color-avatar-green) / <alpha-value>)",
        },
      },
      boxShadow: {
        header: "var(--shadow-header)",
        card: "var(--shadow-card)",
        map: "var(--shadow-map)",
      },
    },
  },
  plugins: [],
};
export default config;
