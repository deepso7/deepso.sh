"use client";

import { formatDistanceToNowStrict } from "date-fns";
import type { ReactNode } from "react";

import { Sky } from "@/components/sky";
import { ThemeToggle } from "@/components/theme-toggle";
import { useMounted } from "@/hooks/use-mounted";
import type { PortfolioData, Project } from "@/lib/portfolio";
import { label, link, meta, muted, page, stagger } from "@/lib/styles";
import { cn } from "@/lib/utils";

/** List rows: hovering one dims its siblings (pointer devices only). */
const row = cn(
  "group/row relative -mx-2 flex items-baseline gap-4 rounded-md px-2 py-1.5 transition duration-150 ease-out",
  "hover:bg-slate-900/5 dark:hover:bg-white/5",
  "hover:opacity-100! pointer-fine:group-hover/list:opacity-40",
  "outline-none focus-visible:outline-2 focus-visible:outline-sky-500",
);

const UNITS: Record<string, string> = { day: "d", hour: "h", minute: "m", month: "mo", year: "y" };

const shortAgo = (iso: string) => {
  const s = formatDistanceToNowStrict(new Date(iso), { roundingMethod: "floor" });
  const [n, unit = ""] = s.split(" ");
  const key = unit.replace(/s$/u, "");
  if (key === "second") {
    return "just now";
  }
  return `${n}${UNITS[key] ?? ` ${unit}`} ago`;
};

const utcDay = new Intl.DateTimeFormat("en", { day: "numeric", month: "short", timeZone: "UTC" });
const utcMonthYear = new Intl.DateTimeFormat("en", {
  month: "short",
  timeZone: "UTC",
  year: "numeric",
});

/** Absolute UTC date on the server and first paint; relative once mounted. */
const usePushed = () => {
  const mounted = useMounted();
  return (iso: string) => (mounted ? shortAgo(iso) : utcDay.format(new Date(iso)));
};

const External = ({
  href,
  className = link,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
    {children}
  </a>
);

const Arrow = ({ shown = false }: { shown?: boolean }) => (
  <span
    aria-hidden
    className={cn(
      "ml-1 inline-block text-slate-500 transition duration-150 ease-out dark:text-slate-400",
      shown
        ? "group-hover/row:translate-x-0.5 group-hover/row:-translate-y-0.5"
        : "-translate-x-1 translate-y-0.5 opacity-0 group-hover/row:translate-0 group-hover/row:opacity-100 group-focus-visible/row:translate-0 group-focus-visible/row:opacity-100",
      "motion-reduce:translate-0",
    )}
  >
    ↗
  </span>
);

const LangDot = ({ language }: { language: Project["language"] }) => (
  <span
    aria-hidden
    className={cn(
      "mr-2 inline-block size-1.5 -translate-y-px rounded-full",
      language === "Rust" ? "bg-orange-400" : "bg-sky-500",
    )}
  />
);

/** Bio with the product name linked to its site. */
const Bio = ({ data }: { data: PortfolioData }) => {
  const { product, url } = data.work;
  if (!data.bio.includes(product)) {
    return data.bio;
  }
  const [before, ...rest] = data.bio.split(product);
  return (
    <>
      {before}
      <External href={url}>{product}</External>
      {rest.join(product)}
    </>
  );
};

const Section = ({ title, i, children }: { title: string; i: number; children: ReactNode }) => (
  <section className={cn("mt-14", stagger(i))}>
    <h2 className={cn(label, "mb-3")}>{title}</h2>
    {children}
  </section>
);

const ProjectRow = ({ p, pushed }: { p: Project; pushed: string }) => (
  <li>
    <a href={p.url ?? p.repo} target="_blank" rel="noopener noreferrer" className={row}>
      <span className="min-w-0 flex-1">
        {p.name}
        <Arrow />
        <span className={cn("ml-2 text-pretty", muted)}>{p.tagline}</span>
      </span>
      <span className={cn(meta, "shrink-0 max-sm:hidden")}>
        <LangDot language={p.language} />
        {p.language} · {pushed}
      </span>
    </a>
  </li>
);

const host = (href: string) => href.replace(/^https?:\/\//u, "").replace(/\/$/u, "");

export const Portfolio = ({ data }: { data: PortfolioData }) => {
  const pushed = usePushed();
  const { work } = data;

  return (
    <div className={page}>
      <Sky />

      <main className="relative mx-auto w-full max-w-2xl px-6 pt-32 pb-24">
        <header className={cn("flex items-start justify-between gap-6", stagger(0))}>
          <div>
            <h1 className="text-3xl font-normal tracking-tight">{data.name}</h1>
            <p className={cn("mt-2 text-balance", muted)}>{data.role}</p>
          </div>
          <ThemeToggle />
        </header>

        <p className={cn("mt-10 max-w-prose leading-7 text-pretty", stagger(1))}>
          <Bio data={data} />
        </p>

        <p className={cn("mt-6 flex items-baseline gap-3", stagger(2))}>
          <span aria-hidden className="relative flex size-1.5 -translate-y-0.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-orange-400 opacity-60 motion-reduce:animate-none" />
            <span className="relative inline-flex size-1.5 rounded-full bg-orange-400" />
          </span>
          <span className="text-pretty">
            <span className={cn(label, "mr-2")}>now</span>
            {data.now}
          </span>
        </p>

        <Section title="work" i={3}>
          <div className="relative pl-4">
            <span
              aria-hidden
              className="absolute top-2 bottom-1.5 left-0 w-0.5 rounded-full bg-linear-to-b from-orange-300 via-violet-300 to-sky-300 dark:from-orange-400/70 dark:via-violet-400/60 dark:to-sky-400/60"
            />
            <ul className="group/list">
              <li>
                <External href={work.url} className={row}>
                  <span className="min-w-0 flex-1 text-lg">
                    <span className="tracking-tight">{work.product}</span>
                    <Arrow shown />
                    <span className={cn("ml-2 text-base text-pretty", muted)}>{work.tagline}</span>
                  </span>
                  <span className={cn(meta, "shrink-0 max-sm:hidden")}>{host(work.url)}</span>
                </External>
              </li>
            </ul>
            <p className={cn("mt-0.5 flex flex-wrap items-baseline gap-x-3 text-sm", muted)}>
              <span>
                {work.role} at {work.org}
                <span className={cn(meta, "ml-2")}>now</span>
              </span>
              <span aria-hidden className={meta}>
                ·
              </span>
              <External href={work.appUrl} className={cn(link, meta)}>
                app ↗
              </External>
            </p>
            <ul className={cn(meta, "mt-3 space-y-1 whitespace-normal")}>
              {work.highlights.map((h) => (
                <li key={h} className="flex gap-2">
                  <span aria-hidden>–</span>
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </Section>

        <Section title="projects" i={4}>
          <ul className="group/list">
            {data.featured.map((p) => (
              <ProjectRow key={p.slug} p={p} pushed={pushed(p.pushedAt)} />
            ))}
          </ul>
        </Section>

        <Section title="also" i={5}>
          <ul className="group/list text-sm">
            {data.other.map((p) => (
              <ProjectRow key={p.slug} p={p} pushed={pushed(p.pushedAt)} />
            ))}
          </ul>
        </Section>

        <Section title="writing" i={6}>
          <ul className="group/list">
            {data.writing.map((w) => (
              <li key={w.slug}>
                <a href={`/writing/${w.slug}`} className={row}>
                  <span className="min-w-0 flex-1 text-pretty">
                    {w.title}
                    <Arrow />
                  </span>
                  <time dateTime={w.date} className={cn(meta, "shrink-0")}>
                    {utcMonthYear.format(new Date(`${w.date}T00:00:00Z`))}
                  </time>
                </a>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="experience" i={7}>
          <ul className="group/list">
            {data.experience.map((e) => {
              const body = (
                <>
                  <span className="min-w-0 flex-1">
                    {e.org}
                    {e.href && <Arrow />}
                    <span className={cn("ml-2 text-pretty", muted)}>{e.role}</span>
                  </span>
                  <span className={cn(meta, "shrink-0")}>{e.years.replace(" — ", "–")}</span>
                </>
              );
              return (
                <li key={e.org}>
                  {e.href ? (
                    <External href={e.href} className={row}>
                      {body}
                    </External>
                  ) : (
                    <div className={row}>{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </Section>

        <Section title="elsewhere" i={8}>
          <p className="flex flex-wrap gap-x-5 gap-y-1">
            {data.links.map((l) => (
              <External key={l.href} href={l.href}>
                {l.label}
              </External>
            ))}
          </p>
        </Section>

        <footer
          className={cn(
            label,
            "mt-20 border-t border-slate-900/10 pt-5 dark:border-white/10",
            stagger(9),
          )}
        >
          {data.handle} · {data.location}
        </footer>
      </main>
    </div>
  );
};
