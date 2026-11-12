// oxlint-disable typescript/no-explicit-any
import { Image } from "@unpic/react";
import { Link } from "waku";

import { getAnchor } from "@/lib/get-anchor";
import { link } from "@/lib/styles";
import { cn } from "@/lib/utils";

import { Code } from "./code";
import { Kbd } from "./ui/kbd";

const heading = "scroll-mt-20 font-normal tracking-tight text-slate-900 dark:text-slate-50";

export const components = {
  a: ({ href, children, ...rest }: any) => {
    if (href.startsWith("/")) {
      return (
        <Link to={href} className={cn(link, "font-normal")} {...rest}>
          {children}
        </Link>
      );
    }

    return (
      <a
        href={href}
        className={cn(link, "font-normal")}
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
      >
        {children}
      </a>
    );
  },

  blockquote: ({ children, ...rest }: any) => (
    <blockquote
      className="not-prose my-8 rounded-r-lg border-l-2 border-orange-300 bg-orange-50/70 px-5 py-4 dark:border-orange-400/60 dark:bg-orange-950/20"
      {...rest}
    >
      <p className="font-mono text-xs tracking-wide text-orange-700 lowercase dark:text-orange-300">
        note
      </p>
      <div className="mt-2 leading-7 text-slate-700 *:my-2 *:last:mb-0 dark:text-slate-300">
        {children}
      </div>
    </blockquote>
  ),

  code: ({ children, ...rest }: any) => (
    <code
      className="rounded-sm bg-slate-900/5 px-1 py-0.5 font-mono text-sm font-normal text-slate-800 before:content-none after:content-none dark:bg-white/10 dark:text-slate-200"
      {...rest}
    >
      {children}
    </code>
  ),

  h1: ({ children, ...rest }: any) => (
    <h1 id={getAnchor(children)} className={cn(heading, "mt-12 mb-4 text-3xl")} {...rest}>
      {children}
    </h1>
  ),

  h2: ({ children, ...rest }: any) => (
    <h2 id={getAnchor(children)} className={cn(heading, "mt-12 mb-4 text-2xl")} {...rest}>
      {children}
    </h2>
  ),

  h3: ({ children, ...rest }: any) => (
    <h3 id={getAnchor(children)} className={cn(heading, "mt-10 mb-3 text-xl")} {...rest}>
      {children}
    </h3>
  ),

  h4: ({ children, ...rest }: any) => (
    <h4 id={getAnchor(children)} className={cn(heading, "mt-8 mb-2 text-lg")} {...rest}>
      {children}
    </h4>
  ),

  h5: ({ children, ...rest }: any) => (
    <h5 id={getAnchor(children)} className={cn(heading, "mt-8 mb-2 text-base")} {...rest}>
      {children}
    </h5>
  ),

  h6: ({ children, ...rest }: any) => (
    <h6
      id={getAnchor(children)}
      className={cn(heading, "mt-8 mb-2 font-mono text-sm text-slate-600 lowercase")}
      {...rest}
    >
      {children}
    </h6>
  ),

  hr: () => <hr className="my-12 border-slate-900/10 dark:border-white/10" />,

  img: ({ src, alt, ...rest }: any) => (
    <Image
      src={src}
      alt={alt}
      className="my-8 rounded-lg border border-slate-900/10 dark:border-white/10"
      {...rest}
    />
  ),

  kbd: ({ children }: any) => <Kbd>{children}</Kbd>,

  mark: ({ children, ...rest }: any) => (
    <mark
      className="rounded-sm bg-orange-100 px-1 text-slate-900 dark:bg-orange-400/20 dark:text-orange-100"
      {...rest}
    >
      {children}
    </mark>
  ),

  pre: ({ children, ...rest }: any) => {
    const code = children?.props?.children || "";
    const className = children?.props?.className || "";

    return <Code code={code} className={className} {...rest} />;
  },

  table: ({ children, ...rest }: any) => (
    <div className="not-prose my-8 w-full overflow-x-auto">
      <table className="w-full border-collapse text-sm" {...rest}>
        {children}
      </table>
    </div>
  ),

  tbody: ({ children, ...rest }: any) => (
    <tbody className="*:last:border-0" {...rest}>
      {children}
    </tbody>
  ),

  td: ({ children, ...rest }: any) => (
    <td className="px-3 py-2.5 align-top text-slate-700 dark:text-slate-300" {...rest}>
      {children}
    </td>
  ),

  th: ({ children, ...rest }: any) => (
    <th
      className="px-3 py-2.5 text-left align-bottom font-mono text-xs font-normal tracking-wide text-slate-600 lowercase dark:text-slate-400"
      {...rest}
    >
      {children}
    </th>
  ),

  thead: ({ children, ...rest }: any) => (
    <thead className="border-b border-slate-900/10 dark:border-white/10" {...rest}>
      {children}
    </thead>
  ),

  tr: ({ children, ...rest }: any) => (
    <tr className="border-b border-slate-900/5 dark:border-white/5" {...rest}>
      {children}
    </tr>
  ),
};
