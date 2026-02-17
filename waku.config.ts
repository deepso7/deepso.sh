// oxlint-disable-next-line import/no-nodejs-modules
import path from "node:path";
// oxlint-disable-next-line import/no-nodejs-modules
import { fileURLToPath } from "node:url";

import contentCollections from "@content-collections/vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "waku/config";

export default defineConfig({
  vite: {
    environments: {
      rsc: {
        resolve: {
          external: ["shiki"],
        },
      },
    },
    plugins: [
      tailwindcss(),
      react({
        babel: {
          plugins: ["babel-plugin-react-compiler"],
        },
      }),
      contentCollections(),
    ],
    resolve: {
      alias: {
        "@": path.resolve(
          path.dirname(fileURLToPath(import.meta.url)),
          "./src"
        ),
      },
    },
  },
});
