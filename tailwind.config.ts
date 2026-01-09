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
        "background-body": "var(--background-body)",
        background: "var(--background)",
        foreground: "var(--foreground)",

        // Star Flicks DS colors - Direct hex values for Turbopack compatibility
        primary: {
          DEFAULT: "#452B9E",
          light: "#E3E0FF",
          hover: "rgb(var(--primary-hover) / <alpha-value>)",
          active: "rgb(var(--primary-active) / <alpha-value>)",
          contrast: "rgb(var(--primary-contrast) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "#362FB3",
          light: "#C9F1FF",
          hover: "rgb(var(--secondary-hover) / <alpha-value>)",
          active: "rgb(var(--secondary-active) / <alpha-value>)",
          contrast: "rgb(var(--secondary-contrast) / <alpha-value>)",
        },
        "contrast-primary": "rgb(var(--primary-contrast) / <alpha-value>)",
        "contrast-secondary": "rgb(var(--secondary-contrast) / <alpha-value>)",
        tertiary: "rgb(var(--tertiary) / <alpha-value>)",
        "tertiary-hover": "rgb(var(--tertiary-hover) / <alpha-value>)",
        "tertiary-active": "rgb(var(--tertiary-active) / <alpha-value>)",
        "tertiary-contrast": "rgb(var(--tertiary-contrast) / <alpha-value>)",
        "contrast-tertiary": "rgb(var(--tertiary-contrast) / <alpha-value>)",
        quaternary: "rgb(var(--quaternary) / <alpha-value>)",
        hover: "rgb(var(--hover) / <alpha-value>)",
        click: "rgb(var(--click) / <alpha-value>)",
        icon: "rgb(var(--icon) / <alpha-value>)",
        outline: "rgb(var(--outline) / <alpha-value>)",
        divider: "rgb(var(--divider) / <alpha-value>)",
        "bg-light": "rgb(var(--bg-light) / <alpha-value>)",
        "bg-dark": "rgb(var(--bg-dark) / <alpha-value>)",
        "bg-disabled": "rgb(var(--bg-disabled) / <alpha-value>)",
        disabled: "rgb(var(--bg-disabled) / <alpha-value>)",
        "text-primary": "rgb(var(--primary) / <alpha-value>)",
        "text-secondary": "rgb(var(--secondary) / <alpha-value>)",
        "text-disabled": "rgb(var(--text-disabled) / <alpha-value>)",
        success: "rgb(var(--success) / <alpha-value>)",
        error: "rgb(var(--error) / <alpha-value>)",
        gray: "rgb(var(--gray) / <alpha-value>)",
        "input-border": "rgb(var(--input-border) / <alpha-value>)",
        "input-bg": "rgb(var(--input-bg) / <alpha-value>)",
        "input-radius": "rgb(var(--input-radius) / <alpha-value>)",

        // landing Page colors
        rose: "#C0C2BA",
        "button-primary": "#262721",
      },
    },
  },
  plugins: [],
};
export default config;
