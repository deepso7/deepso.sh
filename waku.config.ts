import path from "node:path";

import contentCollections from "@content-collections/vite";
import tailwindcss from "@tailwindcss/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig } from "waku/config";
import babel from "@rolldown/plugin-babel";

export default defineConfig({
  vite: {
    plugins: [
      tailwindcss(),
      react(),
      babel({ presets: [reactCompilerPreset()] }),
      contentCollections(),
    ],
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "./src"),
      },
    },
  },
});
