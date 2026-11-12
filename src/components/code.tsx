import type { BundledLanguage, Highlighter } from "shiki";
import { createHighlighter } from "shiki";

import { CopyButton } from "./code-copy-button";

interface CodeProps {
  code: string;
  className?: string;
  lang?: string;
}

let highlighter: Highlighter | undefined;

const getHighlighter = async () => {
  if (!highlighter) {
    highlighter = await createHighlighter({
      langs: [],
      themes: ["vitesse-dark", "vitesse-light"],
    });
  }

  return highlighter;
};

export const Code = async ({ code, className, ...rest }: CodeProps) => {
  const lang = className?.split("language-")[1];

  if (!lang) {
    throw new Error("No language detected");
  }

  const h = await getHighlighter();

  await h.loadLanguage(lang as BundledLanguage);

  // Both themes are emitted as --shiki-light / --shiki-dark on each token;
  // the wrapper picks one per colour scheme.
  const html = h.codeToHtml(code, {
    defaultColor: false,
    lang,
    themes: { dark: "vitesse-dark", light: "vitesse-light" },
    transformers: [
      {
        pre(node) {
          node.properties.class = `${String(node.properties.class ?? "")} overflow-x-auto p-4`;
        },
      },
    ],
  });

  return (
    <div
      className="not-prose group relative my-8 rounded-lg border border-slate-900/10 bg-white/70 font-mono text-sm leading-6 dark:border-white/10 dark:bg-slate-900/70"
      {...rest}
    >
      <CopyButton code={code} />
      <div
        className="**:text-(--shiki-light) dark:**:text-(--shiki-dark)"
        // oxlint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
};
