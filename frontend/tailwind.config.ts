import type { Config } from "tailwindcss";

/**
 * Crimson Sentinel design tokens from frontend/design-reference.
 * Tailwind v4 still consumes this via @config in globals.css.
 */
const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#121414",
        "on-background": "#e3e2e2",
        surface: "#121414",
        "surface-dim": "#121414",
        "surface-bright": "#38393a",
        "surface-container-lowest": "#0d0e0f",
        "surface-container-low": "#1a1c1c",
        "surface-container": "#1e2020",
        "surface-container-high": "#292a2a",
        "surface-container-highest": "#343535",
        "on-surface": "#e3e2e2",
        /* Brightened from #e1bfbb for WCAG AA body text on dark surfaces */
        "on-surface-variant": "#f0d4d0",
        "inverse-surface": "#e3e2e2",
        "inverse-on-surface": "#2f3131",
        outline: "#c4a29e",
        "outline-variant": "#59413e",
        "surface-tint": "#ffb4ac",
        primary: "#ffb4ac",
        brand: "#ffb4ac",
        "on-primary": "#690007",
        "primary-container": "#991b1b",
        "on-primary-container": "#ffaaa1",
        "inverse-primary": "#b02d29",
        secondary: "#c8c6c5",
        "on-secondary": "#313030",
        "secondary-container": "#474746",
        "on-secondary-container": "#b7b5b4",
        tertiary: "#c8c6c6",
        "on-tertiary": "#303030",
        "tertiary-container": "#4e4e4e",
        "on-tertiary-container": "#c1bfbf",
        error: "#ffb4ab",
        "on-error": "#690005",
        "error-container": "#93000a",
        "on-error-container": "#ffdad6",
        /* Functional neutrals from DESIGN.md */
        "level-0": "#0a0a0a",
        "level-1": "#1a1a1a",
        "level-2": "#262626",
        "border-low": "#262626",
        "border-high": "#404040",
        muted: "#a3a3a3",
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        sm: "0.125rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },
      spacing: {
        unit: "4px",
        gutter: "24px",
        "margin-desktop": "64px",
        "margin-mobile": "20px",
        "container-max": "1440px",
      },
      maxWidth: {
        "container-max": "1440px",
      },
      fontFamily: {
        display: ["var(--font-ibm-plex-serif)", "serif"],
        headline: ["var(--font-ibm-plex-serif)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
        code: ["var(--font-jetbrains-mono)", "monospace"],
        label: ["var(--font-jetbrains-mono)", "monospace"],
      },
      fontSize: {
        "display-lg": [
          "48px",
          { lineHeight: "56px", letterSpacing: "-0.02em", fontWeight: "600" },
        ],
        "headline-lg": ["32px", { lineHeight: "40px", fontWeight: "500" }],
        "headline-sm": ["20px", { lineHeight: "28px", fontWeight: "500" }],
        "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
        "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "code-md": ["14px", { lineHeight: "22px", fontWeight: "400" }],
        "label-caps": [
          "12px",
          { lineHeight: "16px", letterSpacing: "0.05em", fontWeight: "600" },
        ],
      },
      boxShadow: {
        crimson: "0 0 8px rgba(153, 27, 27, 0.2)",
      },
    },
  },
  plugins: [],
};

export default config;
