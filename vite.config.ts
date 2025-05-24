/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setupTest.ts",
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: ["src/test/**"],
    },
  },
});
