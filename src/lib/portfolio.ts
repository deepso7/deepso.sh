// Homepage content. Projects are curated by hand; `pushedAt` is refreshed from
// the GitHub API when the page is built (see `withLiveGithub`).

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  language: "Rust" | "TypeScript";
  repo: string;
  url?: string;
  /** Snapshot fallback; replaced with the repo's real `pushed_at` at build time. */
  pushedAt: string;
}

export interface Writing {
  slug: string;
  title: string;
  /** YYYY-MM-DD */
  date: string;
}

export interface PortfolioData {
  name: string;
  handle: string;
  role: string;
  location: string;
  bio: string;
  now: string;
  work: {
    org: string;
    role: string;
    product: string;
    /** Marketing site. The code is private, so link the product, not a repo. */
    url: string;
    /** The product app. */
    appUrl: string;
    tagline: string;
    highlights: string[];
  };
  featured: Project[];
  other: Project[];
  writing: Writing[];
  experience: { org: string; role: string; years: string; href?: string }[];
  links: { label: string; href: string }[];
}

export const portfolio: Omit<PortfolioData, "writing"> = {
  bio: "I'm Deepanshu. Right now I'm at Lucidly Labs working on Aspen. Before this I spent 4.5 years at Huddle01 as founding and lead engineer, building WebRTC infrastructure, SDKs, and web apps.",
  experience: [
    {
      href: "https://tryaspen.ai",
      org: "Lucidly Labs",
      role: "Engineer",
      years: "now",
    },
    {
      href: "https://huddle01.com",
      org: "Huddle01",
      role: "Founding & Lead Engineer",
      years: "2021 — 2025",
    },
  ],
  featured: [
    {
      language: "Rust",
      name: "minip2p",
      pushedAt: "2026-11-11T00:00:00Z",
      repo: "https://github.com/deepso7/minip2p",
      slug: "minip2p",
      tagline: "Minimal, sans-I/O libp2p implementation",
      url: "https://minip2p.com",
    },
    {
      language: "TypeScript",
      name: "qop",
      pushedAt: "2026-11-11T00:00:00Z",
      repo: "https://github.com/deepso7/qop",
      slug: "qop",
      tagline: "P2P messaging app with on-chain identity",
      url: "https://qop.sh",
    },
    {
      language: "Rust",
      name: "paw",
      pushedAt: "2026-11-08T00:00:00Z",
      repo: "https://github.com/deepso7/minipaw",
      slug: "minipaw",
      tagline: "Encrypted p2p netcat over NATs",
      url: "https://paw.minip2p.com",
    },
    {
      language: "Rust",
      name: "oto",
      pushedAt: "2026-11-11T00:00:00Z",
      repo: "https://github.com/deepso7/oto",
      slug: "oto",
      tagline: "Realtime noise-cancelling virtual mic",
    },
  ],
  handle: "deepso7",
  links: [
    { href: "https://github.com/deepso7", label: "GitHub" },
    { href: "https://twitter.com/deepso7", label: "X" },
    { href: "https://www.linkedin.com/in/deepso7", label: "LinkedIn" },
  ],
  location: "India",
  name: "Deepso",
  now: "Mostly working on Aspen, minip2p, and qop.",
  other: [
    {
      language: "TypeScript",
      name: "kanshi",
      pushedAt: "2026-10-04T00:00:00Z",
      repo: "https://github.com/deepso7/kanshi",
      slug: "kanshi",
      tagline: "Self-hosted uptime monitor on Cloudflare Workers",
    },
    {
      language: "TypeScript",
      name: "trashlytics",
      pushedAt: "2026-10-05T00:00:00Z",
      repo: "https://github.com/deepso7/trashlytics",
      slug: "trashlytics",
      tagline: "Type-safe event tracking with runtime validation",
    },
    {
      language: "TypeScript",
      name: "portup",
      pushedAt: "2026-08-24T00:00:00Z",
      repo: "https://github.com/deepso7/portup",
      slug: "portup",
      tagline: "Daemon and CLI for managing local services",
    },
    {
      language: "Rust",
      name: "pingo",
      pushedAt: "2026-01-20T00:00:00Z",
      repo: "https://github.com/deepso7/pingo",
      slug: "pingo",
      tagline: "P2P latency measurement over STUN and UDP",
    },
    {
      language: "Rust",
      name: "orange-bft",
      pushedAt: "2026-01-19T00:00:00Z",
      repo: "https://github.com/deepso7/orange-bft",
      slug: "orange-bft",
      tagline: "Naive implementation of Simplex consensus",
    },
  ],
  role: "Software engineer",
  work: {
    appUrl: "https://app.tryaspen.ai",
    highlights: [
      "Tracks signal history and performance per source",
      "Executes trades on Hyperliquid separately from the signal feed",
      "Exposes a public MCP server at api.tryaspen.ai/mcp",
    ],
    org: "Lucidly Labs",
    product: "Aspen",
    role: "Engineer",
    tagline: "Trading signal feed and execution app",
    url: "https://tryaspen.ai",
  },
};

/** Content-collection dates are `YYYY/M/D`; normalise to `YYYY-MM-DD`. */
export const toIsoDate = (date: string) => {
  const [y, m = "1", d = "1"] = date.split(/[/-]/u);
  return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
};

/**
 * Refresh each project's `pushedAt` from GitHub. Runs at build time (the page is
 * statically rendered); falls back to the snapshot on any failure. Set
 * GITHUB_TOKEN in the build environment to avoid the unauthenticated rate limit.
 */
export const withLiveGithub = async <T extends Pick<PortfolioData, "featured" | "other">>(
  data: T,
): Promise<T> => {
  try {
    const token = process.env.GITHUB_TOKEN;
    const res = await fetch("https://api.github.com/users/deepso7/repos?per_page=100&sort=pushed", {
      headers: {
        Accept: "application/vnd.github+json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      // Covers the body read too; on timeout the catch falls back to the snapshot.
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) {
      return data;
    }
    const repos = (await res.json()) as { name: string; pushed_at: string }[];
    const pushed = new Map(repos.map((r) => [r.name, r.pushed_at]));
    const patch = (p: Project): Project => ({ ...p, pushedAt: pushed.get(p.slug) ?? p.pushedAt });
    return { ...data, featured: data.featured.map(patch), other: data.other.map(patch) };
  } catch {
    return data;
  }
};
