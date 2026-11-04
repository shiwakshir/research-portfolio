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
  title: "Shiwakshi Rashmi · Independent research",
  tagline: "Independent research on digital health, human behaviour, UX research and applied AI.",
  description: "The research journal and portfolio of Shiwakshi Rashmi, an Insights Manager in UX and market research, based in London.",
  url: "https://shiwakshirashmi.com", // [TO CONFIRM-domain]

  author: {
    name: "Shiwakshi Rashmi",
    monogram: "SR",
    role: "Insights Manager, UX",
    fullTitle: "Insights Manager, UX",
    location: "London",
    experienceSummary: "Over five years of professional UX and market research.",
    award: "Hack for Good Award at Microsoft Agents League @ AI Skills Fest 2026 for BRIEF",
    
    // [TO CONFIRM] Links
    email: "contact@[TO CONFIRM-domain].com",
    linkedIn: "https://www.linkedin.com/in/[TO CONFIRM-profile]",
    github: "https://github.com/shiwakshir",
    briefGithub: "https://github.com/shiwakshir/brief-agent",

    bioShort: "Insights Manager, UX, based in London. I publish independent research on digital health, human behaviour, UX research and applied AI.",
  },

  // Main navigation (Journal, Projects, About, Contact - Series added once first series is public)
  navLinks: [
    { href: "/journal", label: "Journal" },
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
};
