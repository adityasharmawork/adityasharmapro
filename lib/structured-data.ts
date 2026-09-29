import portfolioData from "@/data/portfolio.json";
import type { PortfolioData } from "@/types/portfolio";
import {
  EMPLOYER,
  OG_IMAGE,
  PROFILES,
  SITE_DESCRIPTION,
  SITE_HOST,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
} from "@/lib/site";

const data = portfolioData as PortfolioData;

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

// Only describe what the page actually shows — no headshot, dates, or alumni we can't back up.
export function buildJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: SITE_NAME,
        alternateName: SITE_HOST,
        inLanguage: "en",
        publisher: { "@id": PERSON_ID },
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#profilepage`,
        url: SITE_URL,
        name: SITE_TITLE,
        description: SITE_DESCRIPTION,
        inLanguage: "en",
        isPartOf: { "@id": WEBSITE_ID },
        mainEntity: { "@id": PERSON_ID },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${SITE_URL}${OG_IMAGE.path}`,
          width: OG_IMAGE.width,
          height: OG_IMAGE.height,
        },
      },
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: data.personal.name,
        url: SITE_URL,
        jobTitle: data.personal.role,
        description: SITE_DESCRIPTION,
        worksFor: { "@type": "Organization", name: EMPLOYER.name },
        homeLocation: { "@type": "Country", name: data.personal.location },
        knowsAbout: Array.from(new Set([...data.about.skills, "Kubernetes"])),
        sameAs: Object.values(PROFILES),
      },
    ],
  };
}

// Escape "<" so a string in the data can never close the <script> tag early.
export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
