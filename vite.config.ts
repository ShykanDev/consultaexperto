/// <reference types="vitest" />

import legacy from "@vitejs/plugin-legacy";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import VueDevTools from "vite-plugin-vue-devtools";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Force the editor to our script
process.env.LAUNCH_EDITOR = path.resolve(
  __dirname,
  process.platform === "win32"
    ? "./scripts/agy.cmd"
    : "./scripts/agy-wrapper.sh",
);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    legacy(),
    VueDevTools({
      launchEditor: path.resolve(
        __dirname,
        process.platform === "win32"
          ? "./scripts/agy.cmd"
          : "./scripts/agy-wrapper.sh",
      ),
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: "/consultaexperto/",
  test: {
    globals: true,
    environment: "jsdom",
  },
});
