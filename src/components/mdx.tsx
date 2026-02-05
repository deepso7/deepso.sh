// oxlint-disable typescript/no-explicit-any
import { Image } from "@unpic/react";
import { Link } from "waku";

import { getAnchor } from "@/lib/get-anchor";

import { Code } from "./code";
import { Kbd } from "./ui/kbd";
import { Separator } from "./ui/separator";

export const components = {
  a: ({ href, children, ...rest }: any) => {
    const classNames =
      "text-primary hover:text-primary/80 underline underline-offset-4 transition-colors";

    if (href.startsWith("/")) {
      return (
        <Link to={href} className={classNames} {...rest}>
          {children}
        </Link>
      );
    }

    return (
      <a
        href={href}
        className={classNames}
        target="_blank"
        rel="noreferrer"
        {...rest}
      >
        {children}
      </a>
    );
  },

  blockquote: ({ children, ...rest }: any) => (
    <div className="my-4">
      <blockquote
        className="rounded-r-lg border-l-4 border-primary bg-muted/50 px-6 py-4"
        {...rest}
      >
        <div className="mb-2 flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 128 128"
            width="64px"
            height="64px"
            className="size-4 fill-current text-primary"
          >
            <path d="M 64 6 C 32 6 6 32 6 64 C 6 96 32 122 64 122 C 96 122 122 96 122 64 C 122 32 96 6 64 6 z M 64 12 C 92.7 12 116 35.3 116 64 C 116 92.7 92.7 116 64 116 C 35.3 116 12 92.7 12 64 C 12 35.3 35.3 12 64 12 z M 64 30 A 9 9 0 0 0 64 48 A 9 9 0 0 0 64 30 z M 64 59 C 59 59 55 63 55 68 L 55 92 C 55 97 59 101 64 101 C 69 101 73 97 73 92 L 73 68 C 73 63 69 59 64 59 z" />
          </svg>
          <div className="font-semibold text-foreground">Note</div>
        </div>
        <div className="text-muted-foreground *:my-2 [&>*:last-child]:mb-0">
          {children}
        </div>
      </blockquote>
    </div>
  ),

  code: ({ children, ...rest }: any) => (
    <code
      className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-medium text-foreground"
      {...rest}
    >
      {children}
    </code>
  ),

  h1: ({ children, ...rest }: any) => {
    const id = getAnchor(children);

    return (
      <h1
        id={id}
        className="mt-8 mb-4 scroll-mt-20 text-4xl font-bold text-foreground"
        {...rest}
      >
        {children}
      </h1>
    );
  },

  h2: ({ children, ...rest }: any) => {
    const id = getAnchor(children);

    return (
      <h2
        id={id}
        className="mt-8 mb-4 scroll-mt-20 text-3xl font-bold text-foreground"
        {...rest}
      >
        {children}
      </h2>
    );
  },

  h3: ({ children, ...rest }: any) => {
    const id = getAnchor(children);

    return (
      <h3
        id={id}
        className="mt-6 mb-3 scroll-mt-20 text-2xl font-semibold text-foreground"
        {...rest}
      >
        {children}
      </h3>
    );
  },

  h4: ({ children, ...rest }: any) => {
    const id = getAnchor(children);

    return (
      <h4
        id={id}
        className="mt-4 mb-2 scroll-mt-20 text-xl font-semibold text-foreground"
        {...rest}
      >
        {children}
      </h4>
    );
  },

  h5: ({ children, ...rest }: any) => {
    const id = getAnchor(children);

    return (
      <h5
        id={id}
        className="mt-4 mb-2 scroll-mt-20 text-lg font-semibold text-foreground"
        {...rest}
      >
        {children}
      </h5>
    );
  },

  h6: ({ children, ...rest }: any) => {
    const id = getAnchor(children);

    return (
      <h6
        id={id}
        className="mt-4 mb-2 scroll-mt-20 text-base font-semibold text-foreground"
        {...rest}
      >
        {children}
      </h6>
    );
  },

  hr: () => <Separator />,

  img: ({ src, alt, ...rest }: any) => (
    <Image
      src={src}
      alt={alt}
      className="my-6 rounded-lg border border-border"
      {...rest}
    />
  ),

  kbd: ({ children }: any) => <Kbd>{children}</Kbd>,

  mark: ({ children, ...rest }: any) => (
    <mark className="rounded bg-accent px-1 text-accent-foreground" {...rest}>
      {children}
    </mark>
  ),

  pre: ({ children, ...rest }: any) => {
    const code = children?.props?.children || "";
    const className = children?.props?.className || "";

    return <Code code={code} className={className} {...rest} />;
  },

  table: ({ children, ...rest }: any) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className="w-full border-collapse" {...rest}>
        {children}
      </table>
    </div>
  ),

  tbody: ({ children, ...rest }: any) => (
    <tbody className="[&>tr:last-child]:border-0" {...rest}>
      {children}
    </tbody>
  ),

  td: ({ children, ...rest }: any) => (
    <td
      className="p-4 align-middle text-foreground [&:has([role=checkbox])]:pr-0"
      {...rest}
    >
      {children}
    </td>
  ),

  th: ({ children, ...rest }: any) => (
    <th
      className="h-12 px-4 text-left align-middle font-semibold text-foreground [&:has([role=checkbox])]:pr-0"
      {...rest}
    >
      {children}
    </th>
  ),

  thead: ({ children, ...rest }: any) => (
    <thead className="border-b border-border" {...rest}>
      {children}
    </thead>
  ),

  tr: ({ children, ...rest }: any) => (
    <tr
      className="border-b border-border transition-colors hover:bg-muted/50"
      {...rest}
    >
      {children}
    </tr>
  ),
};
