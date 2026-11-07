import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { pageHead } from "@/config/site";
import { getArticles, getPublicSeries } from "@/lib/content";
import { Main } from "@/components/site/bits";

const find = (slug: string) => getPublicSeries().find((s) => s.slug === slug);

export const Route = createFileRoute("/series/$slug")({
  loader: ({ params }) => {
    if (!find(params.slug)) throw notFound();
    return { slug: params.slug };
  },
  head: ({ loaderData }) => {
    const s = loaderData ? find(loaderData.slug) : undefined;
    if (!s) return pageHead({ path: "/series", title: "Series not found" });
    return pageHead({ path: `/series/${s.slug}`, title: s.data.title, description: s.data.description });
  },
  component: SeriesPage,
});

function SeriesPage() {
  const { slug } = Route.useLoaderData();
  const s = find(slug);
  if (!s) return null;
  const articles = getArticles().filter((a) => a.data.series?.id === slug);
  return (
    <Main>
      <nav aria-label="Breadcrumb" className="mb-8 font-sans text-xs text-fg-muted flex items-center gap-2">
        <Link to="/series" className="hover:text-link underline underline-offset-2">Series Index</Link>
        <span>/</span><span>{s.data.status}</span>
      </nav>
      <header className="space-y-4 mb-8">
        <p className="font-sans text-xs text-fg-muted uppercase tracking-wider">Series {s.data.order} · {s.data.status}</p>
        <h1 className="page-title">{s.data.title}</h1>
        {s.data.subtitle && <p className="font-serif italic text-lg sm:text-xl text-fg-body">{s.data.subtitle}</p>}
        <p className="text-base sm:text-lg text-fg-body leading-relaxed max-w-3xl">{s.data.description}</p>
      </header>
      <hr className="border-t border-rule-strong my-8" />
      <div className="prose max-w-[38rem] space-y-6">
        <div dangerouslySetInnerHTML={{ __html: s.html }} />
        {articles.length > 0 ? (
          <section className="mt-8 pt-8 border-t border-rule">
            <h2 className="font-serif text-2xl font-normal text-fg mb-4">Published Inquiries in This Series</h2>
            <div className="space-y-4 not-prose">
              {articles.map((a) => (
                <div key={a.slug} className="py-3 border-b border-rule space-y-1">
                  <Link to="/journal/$slug" params={{ slug: a.slug }} className="font-serif text-base text-fg hover:text-link transition-colors block">{a.data.title}</Link>
                  <p className="font-sans text-xs text-fg-muted">Part {a.data.series?.order} · {a.data.readingTime}</p>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <div className="mt-8 pt-6 border-t border-rule font-sans text-xs text-fg-muted"><em>Articles in this series are currently in preparation.</em></div>
        )}
      </div>
    </Main>
  );
}
