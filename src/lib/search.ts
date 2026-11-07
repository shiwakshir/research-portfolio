import { getArticles, getProjects } from "@/lib/content";
import { getEntryPreviews } from "@/lib/entry-previews";
import { ROADMAP_STAGES } from "@/data/roadmap";
import { THEMES } from "@/routes/interests";

export type SearchResultItem = {
  id: string;
  title: string;
  type: string;
  summary: string;
  url: string;
  searchText: string;
};

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export function getSearchIndex(): SearchResultItem[] {
  const items: SearchResultItem[] = [];

  // 1. Projects
  for (const p of getProjects()) {
    items.push({
      id: `project-${p.slug}`,
      title: p.data.title,
      type: "Project",
      summary: p.data.summary,
      url: `/projects/${p.slug}`,
      searchText: `${p.data.title} ${p.data.summary} ${p.data.role} ${p.data.sector} ${p.data.methods.join(" ")} ${p.data.award || ""} ${stripHtml(p.html)}`,
    });
  }

  // 2. Research Themes
  for (const t of THEMES) {
    items.push({
      id: `theme-${t.number}`,
      title: t.title,
      type: "Research theme",
      summary: t.summary,
      url: "/interests",
      searchText: `${t.title} ${t.summary} ${t.questions.join(" ")} ${t.anchor}`,
    });
  }

  // 3. Entry Previews
  for (const ep of getEntryPreviews()) {
    items.push({
      id: `preview-${ep.slug}`,
      title: ep.title,
      type: "Entry preview",
      summary: ep.subtitle || ep.researchQuestion,
      url: `/journal/previews/${ep.slug}`,
      searchText: `${ep.title} ${ep.subtitle} ${ep.researchQuestion} ${ep.method} ${ep.entryType} ${ep.topic} ${stripHtml(ep.html)} flare flares`,
    });
  }

  // 4. Inquiry Stage Pages
  for (const s of ROADMAP_STAGES) {
    items.push({
      id: `stage-${s.id}`,
      title: s.title,
      type: "Inquiry stage",
      summary: s.text,
      url: `/journal/stages/${s.id}`,
      searchText: `${s.title} ${s.text} Living with flare-ups flare flares research stage chapter`,
    });
  }

  // 5. Published Journal Entries
  for (const a of getArticles()) {
    items.push({
      id: `journal-${a.slug}`,
      title: a.data.title,
      type: "Journal entry",
      summary: a.data.abstract || a.data.subtitle || "",
      url: `/journal/${a.slug}`,
      searchText: `${a.data.title} ${a.data.subtitle || ""} ${a.data.abstract} ${a.data.category} ${a.data.tags.join(" ")} ${stripHtml(a.html)}`,
    });
  }

  // 6. Evidence Checks Page
  items.push({
    id: "page-evidence-checks",
    title: "How I check evidence",
    type: "Page",
    summary: "Before I publish an article, I apply five checks: primary sources, evidence and interpretation, limits, no clinical claims, and declared interests.",
    url: "/evidence-checks",
    searchText: "How I check evidence evidence policy primary sources citation DOI working DOI literature exploration research in progress critical review limits clinical claims declared interests digital product fluctuating health conditions correction policy independent publication AI proofread peer-reviewed",
  });

  // 7. About Page
  items.push({
    id: "page-about",
    title: "About",
    type: "Page",
    summary: "Biography and independent research agenda of Shiwakshi Rashmi, Insights Manager in UX and market research based in London.",
    url: "/about",
    searchText: "About Shiwakshi Rashmi Insights Manager UX London 2021 philosophy sociology qualitative quantitative survey design multi-market independent research methodological commitments primary evidence separation of voice transparent limits everyday knowledge Separate from my employment",
  });

  return items;
}

export function searchSite(query: string, items = getSearchIndex()): SearchResultItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const words = q.split(/\s+/).filter(Boolean);

  const matched = items.filter((item) => {
    const text = item.searchText.toLowerCase();
    const title = item.title.toLowerCase();
    const type = item.type.toLowerCase();
    if (text.includes(q) || title.includes(q) || type.includes(q)) return true;
    if (words.length > 1 && words.every((w) => text.includes(w) || title.includes(w))) return true;
    return false;
  });

  // Prioritise title match, then type match, then general content
  return matched.sort((a, b) => {
    const aTitle = a.title.toLowerCase().includes(q) ? 1 : 0;
    const bTitle = b.title.toLowerCase().includes(q) ? 1 : 0;
    if (aTitle !== bTitle) return bTitle - aTitle;
    return 0;
  });
}
