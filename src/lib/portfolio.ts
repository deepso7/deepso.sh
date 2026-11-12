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
  bio: "Engineer at Lucidly Labs, building Aspen. Before that, founding & lead engineer at Huddle01, where I scaled WebRTC infrastructure for millions of minutes of calls. On the side I build peer-to-peer systems.",
  experience: [
    {
      href: "https://tryaspen.ai",
      org: "Lucidly Labs",
      role: "Engineer, building Aspen",
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
      tagline: "libp2p, small enough to read in an afternoon",
      url: "https://minip2p.com",
    },
    {
      language: "TypeScript",
      name: "qop",
      pushedAt: "2026-11-11T00:00:00Z",
      repo: "https://github.com/deepso7/qop",
      slug: "qop",
      tagline: "Peer-to-peer messaging with on-chain identity",
      url: "https://qop.sh",
    },
    {
      language: "Rust",
      name: "paw",
      pushedAt: "2026-11-08T00:00:00Z",
      repo: "https://github.com/deepso7/minipaw",
      slug: "minipaw",
      tagline: "netcat that punches through NATs",
      url: "https://paw.minip2p.com",
    },
    {
      language: "Rust",
      name: "oto",
      pushedAt: "2026-11-11T00:00:00Z",
      repo: "https://github.com/deepso7/oto",
      slug: "oto",
      tagline: "A noise-cancelling mic, in Rust",
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
  now: "Building Aspen at Lucidly Labs. Evenings: making libp2p small.",
  other: [
    {
      language: "TypeScript",
      name: "kanshi",
      pushedAt: "2026-10-04T00:00:00Z",
      repo: "https://github.com/deepso7/kanshi",
      slug: "kanshi",
      tagline: "Uptime monitoring in one Worker",
    },
    {
      language: "TypeScript",
      name: "trashlytics",
      pushedAt: "2026-10-05T00:00:00Z",
      repo: "https://github.com/deepso7/trashlytics",
      slug: "trashlytics",
      tagline: "Analytics events that can't be wrong",
    },
    {
      language: "TypeScript",
      name: "portup",
      pushedAt: "2026-08-24T00:00:00Z",
      repo: "https://github.com/deepso7/portup",
      slug: "portup",
      tagline: "A tiny daemon for local services",
    },
    {
      language: "Rust",
      name: "pingo",
      pushedAt: "2026-01-20T00:00:00Z",
      repo: "https://github.com/deepso7/pingo",
      slug: "pingo",
      tagline: "RTT between NAT'd peers",
    },
    {
      language: "Rust",
      name: "orange-bft",
      pushedAt: "2026-01-19T00:00:00Z",
      repo: "https://github.com/deepso7/orange-bft",
      slug: "orange-bft",
      tagline: "Simplex consensus, from scratch",
    },
  ],
  role: "Engineer — WebRTC & distributed systems",
  work: {
    appUrl: "https://app.tryaspen.ai",
    highlights: [
      "Signal feed with per-source track records",
      "Execution on Hyperliquid, isolated from the feed",
      "Public MCP server at api.tryaspen.ai/mcp",
    ],
    org: "Lucidly Labs",
    product: "Aspen",
    role: "Engineer",
    tagline: "Trading signals from the people you already follow",
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
