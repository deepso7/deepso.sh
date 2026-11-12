"use client";

import { Check } from "lucide-react";
import { useCallback, useState } from "react";

import { CopyIcon } from "./ui/copy";

interface CopyButtonProps {
  code: string;
}

export const CopyButton = ({ code }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="absolute top-2 right-2 z-10 cursor-pointer rounded-md p-1.5 text-slate-500 opacity-0 transition duration-150 ease-out group-hover:opacity-100 hover:bg-slate-900/5 hover:text-slate-900 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-sky-500 active:scale-95 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-slate-100"
      aria-label={copied ? "Copied" : "Copy code"}
    >
      {copied ? <Check className="size-4" /> : <CopyIcon size={16} />}
    </button>
  );
};
