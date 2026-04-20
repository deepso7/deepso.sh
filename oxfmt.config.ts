import { defineConfig } from "oxfmt";
import ultracite from "ultracite/oxfmt";

export default defineConfig({
  extends: [ultracite],
  ignorePatterns: ["**/ui/**"],
  sortTailwindcss: {
    attributes: ["class", "className"],
    functions: ["clsx", "cn"],
    preserveDuplicates: false,
    preserveWhitespace: false,
    stylesheet: "./src/styles.css",
  },
});
