/**
 * Central Website & Author Configuration
 *
 * All personal details, social links, and domain settings can be easily customized here.
 * Placeholders are marked with [YOUR ...] to make personalization simple before public launch.
 */

export interface SiteConfig {
  name: string;
  title: string;
  role: string;
  tagline: string;
  description: string;
  url: string;
  author: {
    name: string;
    email: string;
    linkedIn: string;
    github?: string;
    location: string;
    bioShort: string;
  };
  researchThemes: Array<{
    id: string;
    title: string;
    description: string;
    focusAreas: string[];
  }>;
  navLinks: Array<{
    href: string;
    label: string;
  }>;
}

export const SITE: SiteConfig = {
  // Update with your name or publication title
  name: "Research & UX Journal",
  title: "Independent UX & Health Research Journal",
  role: "Insights Manager · UX & Market Research",
  tagline: "Understanding people, questioning assumptions, exploring better ways forward.",
  description: "A professional UX and market research portfolio, independent research journal, and inquiry space exploring the intersection of human experience, chronic health conditions, and technology.",
  
  // Custom Domain Placeholder (e.g., https://yourname.com or https://yourdomain.pages.dev)
  url: "https://yourdomain.com",

  author: {
    // [CONFIGURATION PLACEHOLDER]: Replace with your preferred display name
    name: "[Your Name]",
    // [CONFIGURATION PLACEHOLDER]: Replace with your direct professional email
    email: "contact@yourdomain.com",
    // [CONFIGURATION PLACEHOLDER]: Replace with your LinkedIn URL
    linkedIn: "https://www.linkedin.com/in/your-profile",
    github: "https://github.com/your-username",
    location: "[Your City / Region]",
    bioShort: "Insights Manager specialising in UX and market research with six years of professional experience across qualitative and quantitative methodologies, user experience, and consumer understanding. Conducting independent research into digital health, chronic and fluctuating conditions, and applied AI in research methods.",
  },

  // The 6 core research themes specified in Section 2
  researchThemes: [
    {
      id: "digital-health",
      title: "Digital Health & Wellbeing",
      description: "Investigating how digital tools support, complicate, or fail everyday health management, with particular attention to human agency and cognitive load.",
      focusAreas: [
        "Patient-facing tools",
        "Health management burden",
        "Adherence vs. lived reality"
      ]
    },
    {
      id: "human-behaviour",
      title: "Human Behaviour & Lived Experiences",
      description: "Examining the gap between clinical models or designer assumptions and the messy, adaptive ways people navigate their daily routines.",
      focusAreas: [
        "Everyday routines & trade-offs",
        "Contextual decision-making",
        "Qualitative lived-experience inquiry"
      ]
    },
    {
      id: "fluctuating-conditions",
      title: "Chronic & Fluctuating Health Conditions",
      description: "Exploring the non-linear realities of living with symptoms that wax and wane, where predictability is rare and conventional tracking tools often fall short.",
      focusAreas: [
        "Energy management & pacing",
        "Invisible labor of chronic illness",
        "Symptom fluctuation vs. static metrics"
      ]
    },
    {
      id: "service-design",
      title: "Human-Centred Technology & Service Design",
      description: "Translating nuanced human insights into compassionate, usable interfaces and end-to-end service touchpoints that respect real human constraints.",
      focusAreas: [
        "Information architecture",
        "Reducing cognitive friction",
        "Ethical, accessible interaction design"
      ]
    },
    {
      id: "ai-ux-research",
      title: "Artificial Intelligence in UX & Market Research",
      description: "Critically evaluating where autonomous models and LLMs enhance research workflows, where they introduce bias or hallucinated consensus, and how to maintain methodological rigor.",
      focusAreas: [
        "AI-augmented qualitative synthesis",
        "Synthetic respondents vs. human truth",
        "Research workflow augmentation"
      ]
    },
    {
      id: "research-methods",
      title: "Research Methods & Evidence-Based Development",
      description: "Bridging rigorous qualitative discovery and quantitative validation to help product teams ground roadmap decisions in verified evidence rather than intuition.",
      focusAreas: [
        "Mixed-methods research design",
        "Questioning untested assumptions",
        "Evidence hierarchies for product teams"
      ]
    }
  ],

  navLinks: [
    { href: "/journal", label: "Research Journal" },
    { href: "/series", label: "Series" },
    { href: "/projects", label: "Projects" },
    { href: "/interests", label: "Research Interests" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ]
};
