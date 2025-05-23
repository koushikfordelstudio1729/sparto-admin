import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

/**
 * Tailwind CSS Configuration for Project Setup React
 * --------------------------------------------------
 * - Uses custom spacing, border radius, shadows, typography, and color tokens
 * - Token naming aligned with design system (e.g., Figma tokens)
 * - Typography utilities defined via `addUtilities` for consistent use
 */

const config: Config = {
  // File paths to scan for Tailwind utility classes
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  // Extend the default theme with design system tokens
  theme: {
    extend: {
      // Spacing tokens (used in margin, padding, gap, etc.)
      spacing: {
        "spacing-xs": "4px",
        "spacing-sm": "8px",
        "spacing-md": "16px",
        "spacing-lg": "24px",
        "spacing-xl": "32px",
        "spacing-2xl": "48px",
      },

      // Border radius tokens
      borderRadius: {
        "radius-xs": "2px",
        "radius-sm": "4px",
        "radius-md": "8px",
        "radius-lg": "16px",
        "radius-full": "9999px",
      },

      // Box shadows (elevation system)
      boxShadow: {
        "elevation-xs": "0px 1px 2px rgba(0, 0, 0, 0.04)",
        "elevation-sm": "0px 2px 4px rgba(0, 0, 0, 0.06)",
        "elevation-md": "0px 4px 8px rgba(0, 0, 0, 0.08)",
        "elevation-lg": "0px 8px 16px rgba(0, 0, 0, 0.10)",
      },

      // Z-index layers
      zIndex: {
        "z-1": "10",
        "z-2": "20",
        "z-3": "30",
        "z-4": "40",
        "z-5": "50",
      },

      // Font size scale with semantic naming
      fontSize: {
        "text-xs": "8px",
        "text-sm": "10px",
        "text-base": "12px",
        "text-md": "14px",
        "text-lg": "16px",
        "text-xl": "18px",
        "text-2xl": "20px",
        "text-3xl": "24px",
        "text-4xl": "28px",
        "text-5xl": "32px",
      },

      // Custom color palette with roles: primary, secondary, neutral, etc.
      colors: {
        primary: {
          50: "#f5faff",
          100: "#e0f2ff",
          200: "#b9e0ff",
          300: "#7cc4fa",
          400: "#38a1f3",
          500: "#1e87e5",
          600: "#106fc4",
          700: "#0a5aa0",
          800: "#084a82",
          900: "#073b69",
        },
        secondary: {
          50: "#fef6f9",
          100: "#fde4ec",
          200: "#fabdd4",
          300: "#f487b1",
          400: "#e95090",
          500: "#cf2670",
          600: "#aa1a59",
          700: "#841146",
          800: "#5d0b32",
          900: "#3b0620",
        },
        neutral: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
        },
        success: {
          50: "#f5faff",
          100: "#e0f2ff",
          200: "#b9e0ff",
          300: "#7cc4fa",
          400: "#38a1f3",
          500: "#1e87e5",
          600: "#106fc4",
          700: "#0a5aa0",
          800: "#084a82",
          900: "#073b69",
        },
        warning: {
          50: "#fef6f9",
          100: "#fde4ec",
          200: "#fabdd4",
          300: "#f487b1",
          400: "#e95090",
          500: "#cf2670",
          600: "#aa1a59",
          700: "#841146",
          800: "#5d0b32",
          900: "#3b0620",
        },
        error: {
          50: "#fef6f9",
          100: "#fde4ec",
          200: "#fabdd4",
          300: "#f487b1",
          400: "#e95090",
          500: "#cf2670",
          600: "#aa1a59",
          700: "#841146",
          800: "#5d0b32",
          900: "#3b0620",
        },
        white: "#ffffff",
        black: "#000000",
      },

      // Max width breakpoints for containers
      maxWidth: {
        "container-sm": "640px",
        "container-md": "768px",
        "container-lg": "1024px",
        "container-xl": "1280px",
      },

      // Font family tokens
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        serif: ["Georgia", "serif"],
        mono: ["Courier New", "monospace"],
      },
    },
  },

  // Custom plugins for design system classes (typography, z-index, shadows, etc.)
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        // Elevation utilities
        ".elevation-xs": { boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.04)" },
        ".elevation-sm": { boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.06)" },
        ".elevation-md": { boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.08)" },
        ".elevation-lg": { boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.10)" },

        // Radius utilities
        ".radius-xs": { borderRadius: "2px" },
        ".radius-sm": { borderRadius: "4px" },
        ".radius-md": { borderRadius: "8px" },
        ".radius-lg": { borderRadius: "16px" },
        ".radius-full": { borderRadius: "9999px" },

        // Z-index layering
        ".z-layer-1": { zIndex: "10" },
        ".z-layer-2": { zIndex: "20" },
        ".z-layer-3": { zIndex: "30" },
        ".z-layer-4": { zIndex: "40" },
        ".z-layer-5": { zIndex: "50" },

        // Typography classes (partial shown here; extend as needed)
        ".title-01-regular": {
          fontSize: "48px",
          fontWeight: "400",
          lineHeight: "60px",
          fontFamily: "Poppins, sans-serif",
        },
        ".title-01-medium": {
          fontSize: "48px",
          fontWeight: "500",
          lineHeight: "60px",
          fontFamily: "Poppins, sans-serif",
        },
        ".title-01-bold": {
          fontSize: "48px",
          fontWeight: "700",
          lineHeight: "60px",
          fontFamily: "Poppins, sans-serif",
        },
        ".heading-01-medium": {
          fontSize: "28px",
          fontWeight: "500",
          lineHeight: "36px",
          fontFamily: "Poppins, sans-serif",
        },
        ".paragraph-01-regular": {
          fontSize: "16px",
          fontWeight: "400",
          lineHeight: "24px",
          fontFamily: "Poppins, sans-serif",
        },
        ".caption-medium": {
          fontSize: "12px",
          fontWeight: "500",
          lineHeight: "16px",
          fontFamily: "Poppins, sans-serif",
        },
      };

      addUtilities(newUtilities);
    }),
  ],
};

export default config;
