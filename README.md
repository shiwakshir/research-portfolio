# Personal Research Portfolio & Publication Platform

A production-ready personal research website and publication platform built with **Astro**, **TypeScript**, **Tailwind CSS**, and **Markdown/MDX Content Collections**. Designed specifically for UX and market research professionals publishing substantive literature reviews, multi-part research series, and portfolio case studies.

Optimized for deployment on **Cloudflare Pages**.

---

## Table of Contents
1. [Visual Direction & Design Principles](#1-visual-direction--design-principles)
2. [Quick Start: Running Locally](#2-quick-start-running-locally)
3. [Pre-Launch Personalization Checklist](#3-pre-launch-personalization-checklist)
4. [How to Publish Your First Article](#4-how-to-publish-your-first-article)
5. [Article Formatting Guide (Citations, Tables, Callouts)](#5-article-formatting-guide)
6. [Managing Research Series](#6-managing-research-series)
7. [Adding Portfolio Projects](#7-adding-portfolio-projects)
8. [Deploying to Cloudflare Pages via GitHub](#8-deploying-to-cloudflare-pages-via-github)
9. [Setting Up Your Custom Domain on Cloudflare](#9-setting-up-your-custom-domain-on-cloudflare)
10. [Site Architecture & File Structure](#10-site-architecture--file-structure)

---

## 1. Visual Direction & Design Principles

* **Editorial Tone:** Soft ivory / parchment backgrounds (`#FAF7F0`), deep ink/charcoal typography (`#171A1D`), and muted forest green (`#2A4C3A`) and slate accents.
* **Readable Typography:** Editorial serif headings (Newsreader / Georgia) paired with clean, accessible sans-serif body text (Inter). Max reading width capped at comfortable reading length (68ch).
* **Research Credibility:** Built-in distinction between empirical findings, literature reviews, and exploratory commentary. Includes research status tags, DOI links, and numbered references.
* **Privacy-First:** Statically generated. Zero trackers, no advertising cookies, no external medical data forms, and zero client-side bloat.
* **Accessibility:** WCAG 2.2 AA compliant contrast, skip-to-content link, keyboard navigable search modal (`Cmd+K`), and print stylesheets for reading.

---

## 2. Quick Start: Running Locally

### Prerequisites
* Node.js v18 or higher (v20+ recommended)
* npm (bundled with Node.js)

### Commands
In your terminal, navigate to the project directory:

```bash
# Install dependencies (already completed if cloned)
npm install

# Start local development server
npm run dev

# Build production static bundle (generates to /dist)
npm run build

# Preview the production build locally
npm run preview
```

When you run `npm run dev`, open `http://localhost:4321` in your browser. Any edits you make to Markdown articles or components will update automatically via hot reload.

---

## 3. Pre-Launch Personalization Checklist

Before deploying publicly, open `src/config/site.ts` and customize these clearly labeled placeholders:

- [ ] **Author Name:** Update `SITE.author.name` from `[Your Name]` to your actual name.
- [ ] **Email:** Update `SITE.author.email` to your professional email address.
- [ ] **LinkedIn:** Update `SITE.author.linkedIn` with your profile URL.
- [ ] **Location:** Update `SITE.author.location`.
- [ ] **Domain:** When you register your domain on Cloudflare, update `SITE.url` (e.g., `https://yourdomain.com`).
- [ ] **Profile Photograph:** Save a clean portrait photo to `public/avatar.jpg` and update the reference in `src/pages/about.astro`.
- [ ] **Privacy Notice:** Review `src/pages/privacy.astro` to ensure the dates and contact email match your details.

---

## 4. How to Publish Your First Article

You do **not** need to touch any code or HTML components to publish an article. The entire publishing system runs on standard Markdown files inside `src/content/journal/`.

### Step 1: Copy the Template
Copy `templates/article-template.md` and save it to `src/content/journal/` with a URL-friendly name, for example:
`src/content/journal/my-first-inquiry.md`

### Step 2: Fill in the Frontmatter
At the top of the file, update the metadata:

```yaml
---
title: "The Friction of Manual Health Tracking"
subtitle: "An inquiry into why habit apps fail users with fluctuating capacity"
publishDate: 2026-11-04
author: "Your Name"
readingTime: "7 min read"
category: "Digital Health"
tags: ["Chronic Health", "Pacing", "Interaction Design"]
abstract: "A synthesis of why streak-based habit tracking induces guilt and abandonment during chronic symptom flares."
draft: false # <-- Set to false when ready to publish!
researchStatus: "Literature Exploration"
researchQuestion: "Why do standard habit trackers fail when user capacity is non-linear?"
whyItMatters: "Most health apps experience >80% churn within 30 days due to cognitive tracking fatigue."
methodsNote: "Secondary review of health HCI literature and burden-of-treatment theory."
limitationsNote: "Preliminary exploratory inquiry; empirical user studies pending."
references:
  - number: 1
    citation: "Corbin, J. M., & Strauss, A. (1985). Managing chronic illness at home: Three lines of work. Qualitative Sociology, 8(3), 224-247."
    doi: "10.1007/BF00989485"
---
```

### Step 3: Write Your Article Body in Markdown
Below the `---` frontmatter separator, write your article using standard Markdown headings (`##`, `###`), paragraphs, lists, and quotes.

### Step 4: Preview Locally
Run `npm run dev` and navigate to `http://localhost:4321/journal`.
* If `draft: true`: The article will **not** appear in public lists, search, RSS, or sitemaps.
* If `draft: false`: The article will appear immediately with automatic table of contents, reading time, and share buttons.

---

## 5. Article Formatting Guide

### A. Numbered Citations
Cite your sources in the text using bracketed numbers that match your frontmatter `references` list:
```markdown
As Strauss and Corbin established in their foundational work on chronic illness [1], 
patients must manage three distinct lines of labor...
```
The website will automatically render a formatted **References & Cited Sources** section with source links and DOI links at the bottom of the article.

### B. Tables
Standard GitHub Flavored Markdown tables are supported and styled cleanly:
```markdown
| Interaction Pattern | User Expectation | Observed Failure Mode |
| :--- | :--- | :--- |
| Daily Streak Tracking | Steady motivation | Guilt during flares |
| Manual Log Forms | Complete data | Cognitive fatigue |
```

### C. Callout Blocks
You can embed styled editorial callouts directly in MDX or use blockquotes:
```markdown
> "When capacity fluctuates, consistency cannot be defined as doing the same task every single day."
```

### D. Code Blocks & Syntax Highlighting
Syntax highlighting for Python, TypeScript, or data analysis snippets is built in:
```python
def calculate_pacing_reserve(capacity_score, task_demands):
    return max(0, capacity_score - task_demands)
```

---

## 6. Managing Research Series

Research series are multi-part collections that group articles together.

* Series definition lives in: `src/content/series/living-with-fluctuating-health.md`
* To link an article to a series, add this to the article frontmatter:
```yaml
series:
  id: "living-with-fluctuating-health"
  title: "Living with Fluctuating Health"
  order: 1
```
* The series hub page (`/series/living-with-fluctuating-health`) automatically displays the full trajectory of planned vs. published articles.

---

## 7. Adding Portfolio Projects

Case studies and frameworks live in `src/content/projects/`.
* Copy `templates/project-template.md` to `src/content/projects/your-project.md`.
* Each project includes structured fields for:
  - **Research Problem**
  - **Your Role**
  - **Research Approach & Scope**
  - **Methods Applied**
  - **Synthesized Evidence**
  - **Reflections & Methodological Boundaries**

---

## 8. Deploying to Cloudflare Pages via GitHub

Cloudflare Pages provides global static hosting with automatic HTTPS, zero server maintenance, and automated deployments whenever you push to GitHub.

### Step 1: Create a GitHub Repository
1. Log into your GitHub account at [github.com](https://github.com).
2. Click **New Repository**.
3. Name it (e.g. `research-portfolio`). Set it to **Private** or **Public**. Do not initialize with a README (this project already has one).
4. Click **Create repository**.

### Step 2: Push Your Local Code to GitHub
Open your terminal in this project folder and run:

```bash
git init
git add .
git commit -m "Initial release of personal research website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/research-portfolio.git
git push -u origin main
```

### Step 3: Connect Cloudflare Pages
1. Log into your [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. In the left navigation, go to **Workers & Pages** → **Overview**.
3. Click **Create Application** → Select the **Pages** tab → Click **Connect to Git**.
4. Select your GitHub account and choose the `research-portfolio` repository.
5. In the **Set up builds and deployments** screen, enter the following settings:
   * **Project name:** `research-portfolio` (or your choice)
   * **Production branch:** `main`
   * **Framework preset:** `Astro`
   * **Build command:** `npm run build`
   * **Build output directory:** `dist`
   * **Environment variables:** (None required for static build)
6. Click **Save and Deploy**.

Within 1–2 minutes, Cloudflare Pages will build the site and provide a free live URL ending in `.pages.dev` (e.g., `https://research-portfolio.pages.dev`).

---

## 9. Setting Up Your Custom Domain on Cloudflare

Once your site is live on `.pages.dev`:

1. In the Cloudflare Pages project dashboard, click the **Custom domains** tab.
2. Click **Set up a custom domain**.
3. Enter your apex domain (e.g., `yourdomain.com`).
4. Cloudflare will automatically configure the DNS `CNAME` records pointing to your Pages site.
5. Repeat to add `www.yourdomain.com`.
6. To configure **www to non-www redirection**:
   * In Cloudflare dashboard, go to your domain → **Rules** → **Redirect Rules**.
   * Click **Create Rule**.
   * When incoming request matches: `Hostname eq "www.yourdomain.com"`
   * Then redirect to: `https://yourdomain.com` (Status: 301 Permanent Redirect).
7. Cloudflare automatically issues and manages a free SSL/TLS certificate with HTTP-to-HTTPS enforcement enabled.

---

## 10. Site Architecture & File Structure

```
research-portfolio/
├── astro.config.mjs             # Astro integrations (Tailwind, MDX, Sitemap)
├── tailwind.config.mjs          # Editorial theme colors, typography, prose
├── package.json                 # Scripts and dependencies
├── templates/
│   ├── article-template.md      # Ready-to-copy article template
│   └── project-template.md      # Ready-to-copy project case study template
├── public/
│   ├── favicon.svg              # Understated typographic monogram
│   ├── avatar-placeholder.svg   # Placeholder for author photograph
│   └── robots.txt               # Search engine crawl directives
└── src/
    ├── config/
    │   └── site.ts              # Central author info, themes, and navigation
    ├── content/
    │   ├── config.ts            # Type-safe schemas for journal, series, projects
    │   ├── journal/             # Articles & literature reviews
    │   ├── series/              # Research series collections
    │   └── projects/            # Portfolio case studies and frameworks
    ├── components/
    │   ├── Header.astro         # Sticky header with brand & search trigger
    │   ├── Footer.astro         # Understated accessible footer & disclaimer
    │   ├── ThemeToggle.astro    # Light/Dark mode toggle (zero flicker)
    │   ├── SearchModal.astro    # Fast client-side search dialog (Cmd+K)
    │   ├── ReadingProgress.astro# Subtle reading progress bar
    │   ├── TableOfContents.astro# Collapsible/sticky TOC for articles
    │   ├── ShareButtons.astro   # LinkedIn & copy-link buttons
    │   ├── ReferencesList.astro # Numbered citations & DOI links
    │   ├── ResearchCallout.astro# Methods, limitations & evidence notes
    │   ├── ArticleCard.astro    # Journal article preview card
    │   ├── SeriesCard.astro     # Series overview card
    │   └── ProjectCard.astro    # Project case study card
    ├── layouts/
    │   ├── BaseLayout.astro     # Core HTML, SEO, Open Graph & JSON-LD
    │   ├── ArticleLayout.astro  # Full research article layout
    │   └── PageLayout.astro     # Standard editorial page container
    ├── styles/
    │   └── global.css           # Global typography, color vars & print styles
    └── pages/
        ├── index.astro          # Publication homepage
        ├── about.astro          # Professional background & photo
        ├── journal/             # Journal index & dynamic [...slug] reader
        ├── series/              # Series index & dynamic [slug] hub
        ├── projects/            # Projects index & dynamic [slug] case study
        ├── interests.astro      # 5 core research directions
        ├── contact.astro        # Direct contact & invited dialogue
        ├── privacy.astro        # Transparent static privacy notice
        ├── 404.astro            # Custom 404 page
        ├── rss.xml.ts           # Automatic RSS feed generator
        └── search.json.ts       # Published article search index
```
