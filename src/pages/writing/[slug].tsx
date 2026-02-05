import type { PageProps } from "waku/router";

import { MDXContent } from "@content-collections/mdx/react";
import { allWritings } from "content-collections";
import { Link } from "waku";

import { Head } from "@/components/head";
import { components } from "@/components/mdx";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { HomeIcon } from "@/components/ui/home";

export default function WritingPage({ slug }: PageProps<"/writing/[slug]">) {
  const writing = allWritings.find((data) => data.slug === slug);

  if (!writing) {
    return <div>Not Found</div>;
  }

  return (
    <>
      <Head title={writing.title} description={writing.description} />
      <Breadcrumb className="py-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              render={
                <Link to="/">
                  <HomeIcon size={16} />
                </Link>
              }
            />
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{writing.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <article className="w-full max-w-none">
        <header className="mb-8">
          <h1 className="mb-2 text-4xl font-bold text-foreground">
            {writing.title}
          </h1>
          {writing.description && (
            <p className="text-lg text-muted-foreground">
              {writing.description}
            </p>
          )}
          {writing.date && (
            <time className="text-sm text-muted-foreground">
              {new Date(writing.date).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
          )}
        </header>
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <MDXContent code={writing.mdx} components={components} />
        </div>
      </article>
    </>
  );
}

export const getConfig = () => {
  const paths = allWritings.map((data) => data.slug);

  return {
    render: "static",
    staticPaths: paths,
  } as const;
};
