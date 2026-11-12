import type { ReactNode } from "react";
import { Link } from "waku";

import { Sky } from "@/components/sky";
import { ThemeToggle } from "@/components/theme-toggle";
import { portfolio } from "@/lib/portfolio";
import { label, link, page, stagger } from "@/lib/styles";
import { cn } from "@/lib/utils";

interface WritingLayoutProps {
  children: ReactNode;
}

const WritingLayout = ({ children }: WritingLayoutProps) => (
  <div className={page}>
    <Sky />
    <div className="relative mx-auto w-full max-w-2xl px-6 pt-16 pb-24">
      <header className={cn("flex items-center justify-between gap-6", stagger(0))}>
        <Link
          to="/"
          className={cn(label, "transition-colors hover:text-slate-900 dark:hover:text-slate-100")}
        >
          ← {portfolio.name.toLowerCase()}
        </Link>
        <ThemeToggle />
      </header>

      <main className="mt-16">{children}</main>

      <footer
        className={cn(
          label,
          "mt-20 flex flex-wrap items-baseline justify-between gap-4 border-t border-slate-900/10 pt-5 dark:border-white/10",
        )}
      >
        <span>
          {portfolio.handle} · {portfolio.location.toLowerCase()}
        </span>
        <span className="flex gap-4">
          {portfolio.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className={link}
            >
              {l.label.toLowerCase()}
            </a>
          ))}
        </span>
      </footer>
    </div>
  </div>
);

export default WritingLayout;

export const getConfig = () => ({
  render: "static",
});
