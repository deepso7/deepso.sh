"use client";

import { Button } from "@ui-sdk/react/button";
import { useTheme } from "next-themes";
import { flushSync } from "react-dom";

import { useMounted } from "@/hooks/use-mounted";
import { focusRing, label } from "@/lib/styles";
import { cn } from "@/lib/utils";

const reveal = (from: HTMLElement, apply: () => void) => {
  if (!document.startViewTransition || matchMedia("(prefers-reduced-motion: reduce)").matches) {
    apply();
    return;
  }
  const rect = from.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  const transition = document.startViewTransition(() => flushSync(apply));
  transition.ready
    .then(() =>
      document.documentElement.animate(
        { clipPath: [`circle(0 at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        {
          duration: 550,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      ),
    )
    .catch(() => {
      // Skipped transitions reject `ready`; the theme has still changed.
    });
};

export const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const next = mounted && resolvedTheme === "dark" ? "light" : "dark";
  return (
    <Button
      onClick={(e) => reveal(e.currentTarget, () => setTheme(next))}
      className={cn(
        label,
        focusRing,
        "min-w-10 cursor-pointer text-right transition-colors duration-150 ease-out hover:text-slate-900 dark:hover:text-slate-100",
      )}
      aria-label={`Switch to ${next} theme`}
    >
      {mounted ? next : "theme"}
    </Button>
  );
};
