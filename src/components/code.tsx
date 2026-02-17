import type { Highlighter, BundledLanguage } from "shiki";
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

  const html = h.codeToHtml(code, {
    lang,
    theme: "vitesse-dark",
  });

  return (
    <div
      className="not-prose group relative my-6 overflow-x-auto rounded-lg border border-border font-mono text-sm [&_pre]:p-4"
      {...rest}
    >
      <CopyButton code={code} />
      {/* oxlint-disable-next-line react/no-danger */}
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
};
