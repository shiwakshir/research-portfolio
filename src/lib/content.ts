import { marked } from "marked";
import { parse as parseYaml } from "yaml";

export type ResearchStatus = "Literature exploration" | "Research in progress" | "Critical review";

export interface Reference {
  number: number;
  citation: string;
  shortCitation?: string;
  url?: string;
  doi?: string;
}

export interface JournalEntry {
  slug: string;
  html: string;
  data: {
    title: string;
    subtitle?: string;
    publishDate: Date;
    author: string;
    readingTime: string;
    category: string;
    tags: string[];
    abstract: string;
    draft: boolean;
    articleNumber: number;
    researchStatus: ResearchStatus;
    series?: { id: string; title: string; order: number };
    researchQuestion?: string;
    methodsSummary?: string;
    limitations?: string;
    references: Reference[];
  };
}

export interface ProjectEntry {
  slug: string;
  html: string;
  data: {
    title: string;
    summary: string;
    role: string;
    sector: string;
    methods: string[];
    order: number;
    isLead: boolean;
    award?: string;
    techStack?: string[];
    githubUrl?: string;
    draft: boolean;
  };
}

export interface SeriesEntry {
  slug: string;
  html: string;
  data: {
    title: string;
    subtitle?: string;
    order: number;
    status: string;
    description: string;
    isPublic: boolean;
  };
}

const EVIDENCE_LABELS: Record<string, string> = {
  "what-the-evidence-says": "What the evidence says",
  "my-interpretation": "My interpretation",
  "where-the-evidence-disagrees": "Where the evidence disagrees",
  "open-question": "Open question",
};

function split(raw: string) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { fm: {} as Record<string, unknown>, body: raw };
  return { fm: (parseYaml(m[1] ?? "") ?? {}) as Record<string, unknown>, body: m[2] ?? "" };
}

/** Renders markdown, plus the MDX EvidenceBlock component used in journal entries. */
export function renderBody(body: string): string {
  const withoutImports = body.replace(/^import .*$/gm, "");
  const re = /<EvidenceBlock\s+type="([a-z-]+)"(?:\s+title="([^"]*)")?\s*>([\s\S]*?)<\/EvidenceBlock>/g;
  const parts: string[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(withoutImports))) {
    parts.push(marked.parse(withoutImports.slice(last, m.index), { async: false }) as string);
    const type = m[1] ?? ""; const title = m[2]; const inner = m[3] ?? "";
    const label = title ?? EVIDENCE_LABELS[type] ?? type;
    const voice = type === "my-interpretation" || type === "open-question" ? " italic" : "";
    const sig =
      type === "my-interpretation" ? `<p class="evidence-sig">— SR</p>` : "";
    parts.push(
      `<aside class="evidence" aria-label="${label}"><p class="evidence-label">${label}</p><div class="evidence-body${voice}">${marked.parse(inner.trim(), { async: false })}</div>${sig}</aside>`,
    );
    last = m.index + m[0].length;
  }
  parts.push(marked.parse(withoutImports.slice(last), { async: false }) as string);
  return parts.join("");
}

function slugOf(path: string) {
  return path.split("/").pop()!.replace(/\.mdx?$/, "");
}

const journalRaw = import.meta.glob("/src/content/journal/*.{md,mdx}", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;
const projectRaw = import.meta.glob("/src/content/projects/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;
const seriesRaw = import.meta.glob("/src/content/series/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const allJournal: JournalEntry[] = Object.entries(journalRaw).map(([path, raw]) => {
  const { fm, body } = split(raw);
  const d: any = fm;
  return {
    slug: slugOf(path as string),
    html: renderBody(body),
    data: {
      ...d,
      title: d.title,
      publishDate: new Date(d.publishDate),
      author: d.author ?? "Shiwakshi Rashmi",
      readingTime: d.readingTime ?? "8 min read",
      tags: d.tags ?? [],
      draft: d.draft ?? false,
      articleNumber: d.articleNumber ?? 1,
      researchStatus: d.researchStatus ?? "Literature exploration",
      references: d.references ?? [],
    } as JournalEntry["data"],
  };
});

const allProjects: ProjectEntry[] = Object.entries(projectRaw).map(([path, raw]) => {
  const { fm, body } = split(raw);
  const d: any = fm;
  return {
    slug: slugOf(path as string),
    html: renderBody(body),
    data: { ...d, order: d.order ?? 1, isLead: d.isLead ?? false, draft: d.draft ?? false, methods: d.methods ?? [] } as ProjectEntry["data"],
  };
});

const allSeries: SeriesEntry[] = Object.entries(seriesRaw).map(([path, raw]) => {
  const { fm, body } = split(raw);
  const d: any = fm;
  return {
    slug: slugOf(path as string),
    html: renderBody(body),
    data: { ...d, order: d.order ?? 1, status: d.status ?? "Planned / In Development", isPublic: d.isPublic ?? false } as SeriesEntry["data"],
  };
});

/** Published journal entries, newest first. Drafts are never exposed. */
export function getArticles(): JournalEntry[] {
  return allJournal
    .filter((a) => !a.data.draft)
    .sort((a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime());
}

export function getProjects(): ProjectEntry[] {
  return allProjects.filter((p) => !p.data.draft).sort((a, b) => a.data.order - b.data.order);
}

export function getPublicSeries(): SeriesEntry[] {
  return allSeries.filter((s) => s.data.isPublic);
}

export function formatDate(d: Date) {
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

export const pad = (n: number | undefined) => String(n ?? 1).padStart(2, "0");
