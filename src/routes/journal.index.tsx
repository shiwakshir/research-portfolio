import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { pageHead } from "@/config/site";
import { getArticles } from "@/lib/content";
import { ArticleCard, FeaturedArticle, Main } from "@/components/site/bits";
import { ResearchJourney } from "@/components/site/ResearchJourney";
import { Button } from "@/components/ui/button";
import { getEntryPreviews } from "@/lib/entry-previews";
import { EntryPreviewCard } from "@/components/site/EntryPreviewCard";

export const Route = createFileRoute("/journal/")({
  head: () =>
    pageHead({
      path: "/journal",
      title: "Research Journal",
      description: "Independent research articles, literature reviews, and methodological inquiries by Shiwakshi Rashmi.",
    }),
  component: JournalIndex,
});

function JournalIndex() {
  const articles = getArticles();
  const previews = getEntryPreviews();
  const categories = ["All", ...new Set(articles.map((a) => a.data.category))];
  // Filters only appear once at least 5 articles are published.
  const showFilters = articles.length >= 5;
  const [cat, setCat] = useState("All");
  const visible = cat === "All" ? articles : articles.filter((a) => a.data.category === cat);
  const latest = visible[0];
  const rest = visible.slice(1);

  return (
    <Main>
      <header className="space-y-4 mb-8">
        <div className="font-sans text-xs text-fg-muted flex items-center gap-2">
          <span>Independent inquiries</span><span>·</span>
          <Link to="/evidence-checks" className="text-link underline underline-offset-2">How I check evidence</Link>
        </div>
        <h1 className="page-title">Research journal</h1>
        <p className="lede">
          Articles, critical literature reviews, and methodological inquiries. Each publication separates verified evidence from professional interpretation.
        </p>
      </header>
      <section className="journal-study mb-14" aria-labelledby="journal-study-heading">
        <div className="flex flex-wrap items-baseline justify-between gap-3 mb-6">
          <div>
            <p className="eyebrow mb-2">Living with flare-ups</p>
            <h2 id="journal-study-heading" className="font-serif text-2xl font-normal text-fg">From evidence to possibility</h2>
          </div>
          <span className="font-serif italic text-sm text-fg-muted">An open research notebook</span>
        </div>
        <ResearchJourney />
      </section>

      {showFilters && (
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 font-sans text-xs">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((c) => (
              <Button
                key={c}
                type="button"
                variant="ghost"
                size="sm"
                aria-pressed={c === cat}
                onClick={() => setCat(c)}
                className={`px-2.5 py-1 border transition-colors ${c === cat ? "border-rule-strong font-medium text-fg underline underline-offset-4" : "border-rule text-fg-muted hover:text-fg"}`}
              >
                {c}
              </Button>
            ))}
          </div>
          <div className="text-fg-muted">Showing {visible.length} published {visible.length === 1 ? "entry" : "entries"}</div>
        </div>
      )}

      {previews.length > 0 && <section className="mb-10" aria-label="Entries in preparation">{previews.map((entry) => <EntryPreviewCard key={entry.slug} entry={entry} />)}</section>}
      {articles.length === 0 && previews.length === 0 && <p className="font-serif italic text-fg-secondary py-6">The first entries are taking shape in Desk research.</p>}

      {latest && (
        <section aria-labelledby="featured-inquiry-heading" className="space-y-4 pb-8">
          <h2 id="featured-inquiry-heading" className="font-sans text-xs uppercase tracking-wider text-fg-muted font-semibold m-0">Featured inquiry</h2>
          <FeaturedArticle article={latest} />
        </section>
      )}

      {rest.length > 0 && (
        <section className="mt-8 pt-8 border-t border-rule space-y-6">
          <h2 className="font-sans text-xs uppercase tracking-wider text-fg-muted font-semibold m-0">All inquiries</h2>
          <div>{rest.map((a) => <ArticleCard key={a.slug} article={a} number={a.data.articleNumber} />)}</div>
        </section>
      )}

      <div className="mt-16 pt-8 border-t border-rule font-sans text-xs text-fg-muted flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <span>All citations are verified against original primary sources before publication.</span>
        <Link to="/evidence-checks" className="text-link underline underline-offset-2 shrink-0">How I check evidence →</Link>
      </div>
    </Main>
  );
}
