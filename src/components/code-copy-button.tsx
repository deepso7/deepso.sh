"use client";

import { Tooltip, TooltipContent, TooltipTrigger } from "@ui-sdk/react/tooltip";
import { Check, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { CopyIcon } from "./ui/copy";

interface CopyButtonProps {
  code: string;
}

const pop =
  "animate-in fade-in zoom-in-50 blur-in-xs duration-200 ease-out motion-reduce:zoom-in-100 motion-reduce:blur-in-0";

type Status = "idle" | "copied" | "failed";

const labels: Record<Status, string> = {
  copied: "Copied",
  failed: "Couldn't copy",
  idle: "Copy code",
};

export const CopyButton = ({ code }: CopyButtonProps) => {
  const [status, setStatus] = useState<Status>("idle");
  const reset = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(reset.current), []);

  const copy = async () => {
    clearTimeout(reset.current);
    try {
      await navigator.clipboard.writeText(code);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
    reset.current = setTimeout(() => setStatus("idle"), 2000);
  };

  return (
    <>
      <Tooltip closeOnPress={false} type="label" delay={300}>
        <TooltipTrigger
          onClick={copy}
          className={cn(
            "absolute top-2 right-2 z-10 cursor-pointer rounded-md p-1.5 text-slate-500 transition duration-150 ease-out hover:bg-slate-900/5 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-sky-500 active:scale-95 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-slate-100",
            // Touch screens have no hover, so the button only hides behind it for fine pointers.
            "pointer-fine:opacity-0 pointer-fine:group-hover:opacity-100 pointer-fine:focus-visible:opacity-100",
            status !== "idle" && "pointer-fine:opacity-100",
          )}
        >
          {status === "copied" && <Check aria-hidden="true" className={cn("size-4", pop)} />}
          {status === "failed" && (
            <X aria-hidden="true" className={cn("size-4 text-red-600 dark:text-red-400", pop)} />
          )}
          {status === "idle" && <CopyIcon aria-hidden="true" className={pop} size={16} />}
        </TooltipTrigger>
        <TooltipContent
          side="left"
          sideOffset={6}
          className="origin-(--transform-origin) rounded-md bg-slate-900 px-2 py-1 font-mono text-xs tracking-wide text-stone-50 lowercase transition duration-150 ease-out data-ending-style:opacity-0 data-instant:transition-none data-starting-style:opacity-0 motion-safe:data-ending-style:scale-95 motion-safe:data-starting-style:scale-95 dark:bg-slate-100 dark:text-slate-900"
        >
          {labels[status]}
        </TooltipContent>
      </Tooltip>
      <output className="sr-only">{status === "idle" ? "" : labels[status]}</output>
    </>
  );
};
