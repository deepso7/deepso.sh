import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import { z } from "zod";

const writing = defineCollection({
  directory: "src/writing",
  include: "**/*.mdx",
  name: "writing",
  schema: z.object({
    content: z.string(),
    date: z.string(),
    description: z.string(),
    slug: z.string(),
    title: z.string(),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document, {
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm],
    });

    return {
      ...document,
      mdx,
    };
  },
});

export default defineConfig({
  content: [writing],
});
