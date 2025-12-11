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
      colors: {
        "background-body": "var(--background-body)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Star Flicks DS colors
        primary: "rgb(var(--primary))",
        "primary-hover": "rgb(var(--primary-hover))",
        "primary-active": "rgb(var(--primary-active))",
        "primary-contrast": "rgb(var(--primary-contrast))",
        "contrast-primary": "rgb(var(--primary-contrast))",
        secondary: "rgb(var(--secondary))",
        "secondary-hover": "rgb(var(--secondary-hover))",
        "secondary-active": "rgb(var(--secondary-active))",
        "secondary-contrast": "rgb(var(--secondary-contrast))",
        "contrast-secondary": "rgb(var(--secondary-contrast))",
        tertiary: "rgb(var(--tertiary))",
        "tertiary-hover": "rgb(var(--tertiary-hover))",
        "tertiary-active": "rgb(var(--tertiary-active))",
        "tertiary-contrast": "rgb(var(--tertiary-contrast))",
        "contrast-tertiary": "rgb(var(--tertiary-contrast))",
        quaternary: "rgb(var(--quaternary))",
        hover: "rgb(var(--hover))",
        click: "rgb(var(--click))",
        icon: "rgb(var(--icon))",
        outline: "rgb(var(--outline))",
        divider: "rgb(var(--divider))",
        "bg-light": "rgb(var(--bg-light))",
        "bg-dark": "rgb(var(--bg-dark))",
        "bg-disabled": "rgb(var(--bg-disabled))",
        disabled: "rgb(var(--bg-disabled))",
        "text-primary": "rgb(var(--text-primary))",
        "text-disabled": "rgb(var(--text-disabled))",
        success: "rgb(var(--success))",
        error: "rgb(var(--error))",
        gray: "rgb(var(--gray))",
        "input-border": "rgb(var(--input-border))",
        "input-bg": "rgb(var(--input-bg))",
        "input-radius": "rgb(var(--input-radius))",

        // landing Page colors
        rose: "#C0C2BA",
        "button-primary": "#262721",
      },
    },
  },
  plugins: [],
};
export default config;
