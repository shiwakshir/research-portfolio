/**
 * Central website & author configuration.
 * Missing URLs/emails are labelled [TO CONFIRM] and hidden on the site until filled in.
 */
export const SITE = {
  name: "Shiwakshi Rashmi",
  title: "Shiwakshi Rashmi · Independent research",
  tagline: "Independent research on digital health, human behaviour, UX research and applied AI.",
  description:
    "The research journal and portfolio of Shiwakshi Rashmi, an Insights Manager in UX and market research, based in London.",
  url: "https://shiwakshi.com",
  author: {
    name: "Shiwakshi Rashmi",
    monogram: "SR",
    role: "Insights Manager, UX",
    fullTitle: "Insights Manager, UX",
    location: "London",
    experienceSummary: "Over five years of professional UX and market research.",
    award: "Hack for Good Award at Microsoft Agents League @ AI Skills Fest 2026 for BRIEF",
    email: "contact@[TO CONFIRM-domain].com",
    linkedIn: "https://www.linkedin.com/in/shiwakshi/",
    github: "https://github.com/shiwakshir",
    briefGithub: "https://github.com/shiwakshir/brief-agent",
    bioShort:
      "Insights Manager, UX, based in London. I publish independent research on digital health, human behaviour, UX research and applied AI.",
  },
  navLinks: [
    { href: "/", label: "Home" },
    { href: "/journal", label: "Journal" },
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ] as const,
};

export const isConfirmed = (v: string) => !v.includes("TO CONFIRM");

/** Builds per-page head metadata matching the original site's tags. */
export function pageHead(opts: { title?: string; description?: string; path: string; article?: { date: Date; author: string } }) {
  const title = opts.title ?? SITE.title;
  const description = opts.description ?? SITE.description;
  const pageTitle = opts.title ? `${opts.title} · ${SITE.author.name}` : `${SITE.author.name} · ${SITE.author.role}`;
  const url = `${SITE.url}${opts.path}`;
  const image = `${SITE.url}/og-image.png`;
  const meta: Array<Record<string, string>> = [
    { title: pageTitle },
    { name: "description", content: description },
    { property: "og:type", content: opts.article ? "article" : "website" },
    { property: "og:url", content: url },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: image },
    { property: "og:site_name", content: SITE.name },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
  ];
  if (opts.article) {
    meta.push({ property: "article:published_time", content: opts.article.date.toISOString() });
    meta.push({ property: "article:author", content: opts.article.author });
  }
  const schema = opts.article
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        author: { "@type": "Person", name: opts.article.author, jobTitle: SITE.author.fullTitle },
        datePublished: opts.article.date.toISOString(),
        mainEntityOfPage: url,
      }
    : {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE.name,
        url: SITE.url,
        description: SITE.description,
        author: { "@type": "Person", name: SITE.author.name, jobTitle: SITE.author.fullTitle },
      };
  return {
    meta,
    links: [{ rel: "canonical", href: url }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(schema) }],
  };
}
