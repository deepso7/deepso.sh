import { MDXContent } from "@content-collections/mdx/react";
import { allWritings } from "content-collections";
import { Link } from "waku";
import type { PageProps } from "waku/router";

import { Head } from "@/components/head";
import { components } from "@/components/mdx";
import { toIsoDate } from "@/lib/portfolio";
import { link, meta, muted, stagger } from "@/lib/styles";
import { cn } from "@/lib/utils";

const longDate = new Intl.DateTimeFormat("en", {
  day: "numeric",
  month: "long",
  timeZone: "UTC",
  year: "numeric",
});

const WritingPage = ({ slug }: PageProps<"/writing/[slug]">) => {
  const writing = allWritings.find((data) => data.slug === slug);

  if (!writing) {
    return (
      <p className={muted}>
        Nothing here.{" "}
        <Link to="/" className={link}>
          Back home
        </Link>
      </p>
    );
  }

  const date = writing.date ? toIsoDate(writing.date) : undefined;

  return (
    <>
      <Head title={writing.title} description={writing.description} />
      <article>
        <header className={stagger(1)}>
          {date && (
            <time dateTime={date} className={meta}>
              {longDate.format(new Date(`${date}T00:00:00Z`))}
            </time>
          )}
          <h1 className="mt-3 text-3xl font-normal tracking-tight text-balance">{writing.title}</h1>
          {writing.description && (
            <p className={cn("mt-3 text-lg text-pretty", muted)}>{writing.description}</p>
          )}
        </header>
        <div
          className={cn(
            "prose mt-12 max-w-none prose-slate dark:prose-invert",
            "prose-p:leading-7 prose-p:text-pretty prose-li:leading-7",
            stagger(2),
          )}
        >
          <MDXContent code={writing.mdx} components={components} />
        </div>
      </article>
    </>
  );
};

export default WritingPage;

export const getConfig = () => {
  const paths = allWritings.map((data) => data.slug);

  return {
    render: "static",
    staticPaths: paths,
  } as const;
};
