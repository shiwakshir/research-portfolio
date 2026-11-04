/**
 * Central Website & Author Configuration
 *
 * All personal details and publication metadata for Shiwakshi Rashmi.
 * Missing URLs/emails are clearly labeled as [TO CONFIRM].
 */

export interface SiteConfig {
  name: string;
  title: string;
  author: {
    name: string;
    monogram: string;
    role: string;
    company: string;
    fullTitle: string;
    location: string;
    experienceSummary: string;
    award: string;
    email: string;
    linkedIn: string;
    github: string;
    briefGithub: string;
    bioShort: string;
  };
  tagline: string;
  description: string;
  url: string;
  navLinks: Array<{
    href: string;
    label: string;
  }>;
}

export const SITE: SiteConfig = {
  name: "Shiwakshi Rashmi",
  title: "Shiwakshi Rashmi · UX Research & Publications",
  tagline: "Understanding people, questioning assumptions, exploring better ways forward.",
  description: "Personal research portfolio, UX case studies and publication platform of Shiwakshi Rashmi, Insights Manager, UX, at C Space.",
  url: "https://shiwakshirashmi.com", // [TO CONFIRM-domain]

  author: {
    name: "Shiwakshi Rashmi",
    monogram: "SR",
    role: "Insights Manager, UX",
    company: "C Space",
    fullTitle: "Insights Manager, UX, at C Space",
    location: "London, United Kingdom",
    experienceSummary: "Over five years of consultancy research across technology, generative AI, automotive, financial services and FMCG.",
    award: "Hack for Good Award at Microsoft Agents League @ AI Skills Fest 2026 for BRIEF",
    
    // [TO CONFIRM] Links
    email: "contact@[TO CONFIRM-domain].com",
    linkedIn: "https://www.linkedin.com/in/[TO CONFIRM-profile]",
    github: "https://github.com/shiwakshir",
    briefGithub: "https://github.com/shiwakshir/brief", // [TO CONFIRM if repository name is different]

    bioShort: "Insights Manager, UX, at C Space based in London. Over five years of consultancy research experience specialising in qualitative and quantitative UX research, research design, and applied artificial intelligence.",
  },

  // Main navigation (5 links per brief: Journal, Series, Projects, About, Contact)
  navLinks: [
    { href: "/journal", label: "Journal" },
    { href: "/series", label: "Series" },
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
};
