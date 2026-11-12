/** Dusk sky: pastel blue → lilac → peach, fading into the page. Night version in dark mode. */
export const Sky = () => (
  <div
    aria-hidden
    className="pointer-events-none absolute inset-x-0 top-0 h-160 animate-in mask-b-from-40% duration-700 ease-out fill-mode-both fade-in"
  >
    <div className="absolute inset-0 bg-linear-to-b from-sky-200 via-violet-100 to-orange-100 dark:from-slate-950 dark:via-indigo-950 dark:to-orange-950" />
    <div className="absolute -top-1/4 -left-1/4 size-3/4 rounded-full bg-radial from-sky-300/50 to-transparent to-70% dark:from-indigo-900/50" />
    <div className="absolute -top-1/4 -right-1/4 size-3/4 rounded-full bg-radial from-sky-100/80 to-transparent to-70% dark:from-blue-950/60" />
    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-radial from-orange-200/60 to-transparent to-70% dark:from-orange-900/40" />
  </div>
);
