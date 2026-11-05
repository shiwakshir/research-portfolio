import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { pageHead } from "@/config/site";
import { getArticles } from "@/lib/content";
import { ArticleCard, FeaturedArticle, Main } from "@/components/site/bits";

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
        <h1 className="font-serif text-3xl sm:text-4xl md:text-[2.6rem] font-normal text-fg leading-[1.15] tracking-tight">Research journal</h1>
        <p className="lede">
          Articles, critical literature reviews, and methodological inquiries. Each publication separates verified evidence from professional interpretation.
        </p>
      </header>
      <hr className="border-t border-rule-strong my-8" />

      {showFilters && (
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 font-sans text-xs">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCat(c)}
                className={`px-2.5 py-1 border transition-colors ${c === cat ? "border-rule-strong font-medium text-fg underline underline-offset-4" : "border-rule text-fg-muted hover:text-fg"}`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="text-fg-muted">Showing {visible.length} published {visible.length === 1 ? "entry" : "entries"}</div>
        </div>
      )}

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
