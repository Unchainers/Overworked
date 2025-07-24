/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import environment from "vite-plugin-environment";
import dotenv from "dotenv";
import { fileURLToPath, URL } from "url";

import path from "path";

dotenv.config({ path: "../../.env" });

export default defineConfig({
  root: __dirname,
  build: {
    outDir: "dist/",
    emptyOutDir: true,
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:4943",
        changeOrigin: true,
      },
    },
    allowedHosts: [],
  },
  plugins: [
    react(),
    environment("all", { prefix: "CANISTER_" }),
    environment("all", { prefix: "DFX_" }),
  ],
  resolve: {
    alias: [
      {
        find: "declarations",
        replacement: fileURLToPath(new URL("../declarations", import.meta.url)),
      },
      {
        find: "@",
        replacement: path.resolve(__dirname, "./src"),
      },
    ],
    dedupe: ["@dfinity/agent"],
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts", "frontend-test-setup.ts"],
    globals: true,
  },
});
