import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/config/site";
import { getPublicSeries } from "@/lib/content";
import { Main, PageHeader } from "@/components/site/bits";

export const Route = createFileRoute("/series/")({
  head: () =>
    pageHead({ path: "/series", title: "Research series", description: "Series of related articles by Shiwakshi Rashmi." }),
  component: SeriesIndex,
});

function SeriesIndex() {
  const series = getPublicSeries();
  return (
    <Main>
      <PageHeader
        eyebrow="Collections"
        title="Research series"
        lede="A series groups related articles on one subject. I publish the articles in a series in order."
      />
      {series.length > 0 ? (
        <div className="space-y-8">
          {series.map((s) => (
            <article key={s.slug} className="space-y-3 py-6 border-b border-rule">
              <span className="font-sans text-xs text-fg-muted block">Series {s.data.order} · {s.data.status}</span>
              <h2 className="font-serif text-2xl font-normal text-fg">
                <Link to="/series/$slug" params={{ slug: s.slug }} className="hover:text-link transition-colors">{s.data.title}</Link>
              </h2>
              <p className="summary">{s.data.description}</p>
              <Link to="/series/$slug" params={{ slug: s.slug }} className="font-sans text-xs text-link underline underline-offset-2">Explore series hub →</Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="py-12 space-y-4 border-b border-rule">
          <h2 className="font-serif text-2xl font-normal text-fg">First series in preparation</h2>
          <p className="summary">
            My first series, <em>Living with Fluctuating Health</em>, is in preparation. I am reviewing the literature for it now. I will publish each article when it is ready.
          </p>
          <div className="pt-2">
            <Link to="/journal" className="font-sans text-xs text-link underline underline-offset-2">Read the published articles in the journal →</Link>
          </div>
        </div>
      )}
    </Main>
  );
}
