"use client";

import { useTheme } from "next-themes";

import { useMounted } from "@/hooks/use-mounted";
import { focusRing, label } from "@/lib/styles";
import { cn } from "@/lib/utils";

export const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const next = mounted && resolvedTheme === "dark" ? "light" : "dark";
  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      className={cn(
        label,
        focusRing,
        "min-w-10 cursor-pointer text-right transition-colors duration-150 ease-out hover:text-slate-900 dark:hover:text-slate-100",
      )}
      aria-label={`Switch to ${next} theme`}
    >
      {mounted ? next : "theme"}
    </button>
  );
};
