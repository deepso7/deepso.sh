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
  bio: "Hey, I'm Deepanshu. I work on Aspen at Lucidly Labs. Spent 4.5 years before that at Huddle01, starting as an intern and ending up as founding and lead engineer working on WebRTC infra and SDKs. Outside work I like rebuilding protocols and tools to actually understand how they work.",
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
      tagline: "A small sans-I/O libp2p to learn the stack",
      url: "https://minip2p.com",
    },
    {
      language: "TypeScript",
      name: "qop",
      pushedAt: "2026-11-11T00:00:00Z",
      repo: "https://github.com/deepso7/qop",
      slug: "qop",
      tagline: "P2P chat with on-chain handles, on minip2p",
      url: "https://qop.sh",
    },
    {
      language: "Rust",
      name: "paw",
      pushedAt: "2026-11-08T00:00:00Z",
      repo: "https://github.com/deepso7/minipaw",
      slug: "minipaw",
      tagline: "netcat that gets through NATs, encrypted",
      url: "https://paw.minip2p.com",
    },
    {
      language: "Rust",
      name: "oto",
      pushedAt: "2026-11-11T00:00:00Z",
      repo: "https://github.com/deepso7/oto",
      slug: "oto",
      tagline: "Virtual mic that strips background noise locally",
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
  now: "Shipping Aspen, building minip2p, and hacking on qop on top of it.",
  other: [
    {
      language: "TypeScript",
      name: "kanshi",
      pushedAt: "2026-10-04T00:00:00Z",
      repo: "https://github.com/deepso7/kanshi",
      slug: "kanshi",
      tagline: "Uptime monitor crammed into one Cloudflare Worker",
    },
    {
      language: "TypeScript",
      name: "trashlytics",
      pushedAt: "2026-10-05T00:00:00Z",
      repo: "https://github.com/deepso7/trashlytics",
      slug: "trashlytics",
      tagline: "Typed analytics so I stop shipping broken events",
    },
    {
      language: "TypeScript",
      name: "portup",
      pushedAt: "2026-08-24T00:00:00Z",
      repo: "https://github.com/deepso7/portup",
      slug: "portup",
      tagline: "Local daemon to keep track of dev services",
    },
    {
      language: "Rust",
      name: "pingo",
      pushedAt: "2026-01-20T00:00:00Z",
      repo: "https://github.com/deepso7/pingo",
      slug: "pingo",
      tagline: "P2P latency through NATs with custom STUN + UDP",
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
  role: "Developer & tinkerer",
  work: {
    appUrl: "https://app.tryaspen.ai",
    highlights: [
      "Feed of trading calls with each source's real history",
      "Hyperliquid execution kept separate from the signal feed",
      "Public MCP server at api.tryaspen.ai/mcp",
    ],
    org: "Lucidly Labs",
    product: "Aspen",
    role: "Engineer",
    tagline: "Trading signals with actual track records",
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
