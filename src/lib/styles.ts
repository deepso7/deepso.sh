// Shared class names for the site. Tailwind built-ins only: the default palette (oklch),
// the default spacing/type scale, and tw-animate-css for entrances.
import { cn } from "@/lib/utils";

/** Full-bleed page surface. */
export const page =
  "relative min-h-dvh overflow-hidden bg-stone-50 font-sans text-slate-800 antialiased dark:bg-slate-950 dark:text-slate-100";

export const muted = "text-slate-600 dark:text-slate-400";
export const label = "font-mono text-xs lowercase tracking-wide text-slate-600 dark:text-slate-400";
export const meta =
  "whitespace-nowrap font-mono text-xs tabular-nums text-slate-500 dark:text-slate-400";
export const focusRing =
  "rounded-xs outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500";
export const link = cn(
  "text-slate-800 underline decoration-orange-300 underline-offset-4 transition-colors duration-150 ease-out hover:decoration-current dark:text-slate-100 dark:decoration-orange-400/70",
  focusRing,
);

/** Staggered blur-up entrance; pass the element's position in the page. */
const enter =
  "animate-in fade-in slide-in-from-bottom-2 blur-in-xs duration-300 ease-out fill-mode-both motion-reduce:slide-in-from-bottom-0 motion-reduce:blur-in-0";
const delays = [
  "delay-0",
  "delay-75",
  "delay-100",
  "delay-150",
  "delay-200",
  "delay-300",
  "delay-300",
  "delay-500",
  "delay-500",
  "delay-700",
] as const;
export const stagger = (i: number) => cn(enter, delays[Math.min(i, delays.length - 1)]);
