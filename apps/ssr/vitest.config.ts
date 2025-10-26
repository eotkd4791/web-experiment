import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["app/**/*.{test,spec}.{ts,tsx"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
