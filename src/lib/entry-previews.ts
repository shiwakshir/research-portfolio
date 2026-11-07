import { parse as parseYaml } from "yaml";
import { getArticles, renderBody } from "@/lib/content";
import { getResearchStage, type ResearchStageId } from "@/data/roadmap";

export type EntryPreview = {
  slug: string;
  title: string;
  subtitle: string;
  entryType: string;
  articleNumber: number;
  topic: string;
  researchStage: ResearchStageId;
  researchQuestion: string;
  method: string;
  html: string;
};

const files = import.meta.glob("/src/content/previews/*.md", { query: "?raw", import: "default", eager: true }) as Record<string, string>;
const previews: EntryPreview[] = Object.entries(files).flatMap(([path, raw]) => {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return [];
  const fields = parseYaml(match[1] ?? "") as Record<string, unknown>;
  const stage = typeof fields["researchStage"] === "string" ? getResearchStage(fields["researchStage"]) : undefined;
  if (!stage || typeof fields["title"] !== "string") return [];
  return [{
    slug: (path.split("/").pop() ?? "").replace(/\.md$/, ""),
    title: fields["title"],
    subtitle: String(fields["subtitle"] ?? ""),
    entryType: String(fields["entryType"] ?? "Research note"),
    articleNumber: Number(fields["articleNumber"] ?? 1),
    topic: String(fields["topic"] ?? ""),
    researchStage: stage.id,
    researchQuestion: String(fields["researchQuestion"] ?? ""),
    method: String(fields["method"] ?? ""),
    html: renderBody(match[2] ?? ""),
  }];
});

/** Preview outlines are separate from publication; hide one when its real article is published. */
export function getEntryPreviews(stage?: ResearchStageId) {
  const published = new Set(getArticles().map((entry) => entry.slug));
  return previews.filter((entry) => !published.has(entry.slug) && (!stage || entry.researchStage === stage)).sort((a, b) => a.articleNumber - b.articleNumber);
}

export function getEntryPreview(slug: string) {
  return getEntryPreviews().find((entry) => entry.slug === slug);
}