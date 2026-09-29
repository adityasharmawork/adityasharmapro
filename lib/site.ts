// Canonical site identity. next.config.ts repeats SITE_URL on purpose (see the comment there).
export const SITE_URL = "https://adityasharma.pro";
export const SITE_HOST = "adityasharma.pro";
export const SITE_NAME = "Aditya Sharma";

// TODO(aditya): write the homepage <title> — ~50–60 chars, name first, then what sets you apart.
export const SITE_TITLE = "Aditya Sharma";

export const SITE_DESCRIPTION =
  "Software Engineer building scalable systems with TypeScript and GoLang. Open source contributor to Kubernetes. Based in India.";

export const TWITTER_HANDLE = "@adityaisapro";

// Canonical profile URLs for structured data only; visible links stay on dub.sh for click analytics.
export const PROFILES = {
  github: "https://github.com/adityasharmawork",
  linkedin: "https://www.linkedin.com/in/adityasharma123/",
  x: "https://x.com/adityaisapro",
} as const;

export const EMPLOYER = { name: "Enrich Labs" } as const;

export const OG_IMAGE = {
  path: "/opengraph-image.png",
  width: 1200,
  height: 630,
} as const;
