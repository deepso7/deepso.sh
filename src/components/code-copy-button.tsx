"use client";

import { Check } from "lucide-react";
import { useState, useCallback } from "react";

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
      className="absolute top-2 right-2 rounded-md p-1.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:bg-muted hover:text-foreground"
      aria-label="Copy code"
    >
      {copied ? <Check className="size-4" /> : <CopyIcon size={16} />}
    </button>
  );
};
