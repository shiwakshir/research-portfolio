import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SITE, pageHead } from "@/config/site";
import { formatDate, getArticles, pad } from "@/lib/content";
import { ReferencesList, StatusBadge } from "@/components/site/bits";
import { getResearchStage } from "@/data/roadmap";

export const Route = createFileRoute("/journal/$slug")({
  loader: ({ params }) => {
    const all = getArticles();
    const i = all.findIndex((a) => a.slug === params.slug);
    if (i < 0) throw notFound();
    return { slug: params.slug, index: i };
  },
  head: ({ loaderData }) => {
    const a = loaderData ? getArticles()[loaderData.index] : undefined;
    if (!a) return pageHead({ path: "/journal", title: "Article not found" });
    return pageHead({
      path: `/journal/${a.slug}`,
      title: a.data.title,
      description: a.data.abstract,
      article: { date: a.data.publishDate, author: a.data.author },
    });
  },
  component: ArticlePage,
});

function ArticlePage() {
  const { index } = Route.useLoaderData();
  const all = getArticles();
  const entry = all[index];
  if (!entry) return null;
  const nextPost = index > 0 ? all[index - 1] : undefined;
  const prevPost = index < all.length - 1 ? all[index + 1] : undefined;
  const d = entry.data;
  const stage = d.researchStage ? getResearchStage(d.researchStage) : undefined;

  return (
    <main>
      <article className="max-w-[56rem] mx-auto px-4 sm:px-6 py-12 md:py-16">
        <header className="space-y-4 max-w-[38rem] mb-10">
          {stage && <Link to="/journal/stages/$stage" params={{ stage: stage.id }} className="inline-block font-sans text-xs text-link underline underline-offset-4">← Living with flare-ups · {stage.title}</Link>}
          <div className="eyebrow flex flex-wrap items-center gap-3">
            <span className="numeral text-2xl normal-case tracking-normal">No. {pad(d.articleNumber)}</span><span className="h-px w-8 bg-rule-strong" /><span>{d.category}</span>
            {d.series && (<><span>·</span><span>{d.series.title || d.series.id}</span></>)}
          </div>
          <h1 className="page-title rise">{d.title}</h1>
          {d.subtitle && <p className="font-serif italic text-lg sm:text-xl text-fg-body leading-relaxed">{d.subtitle}</p>}
          <p className="font-sans text-xs text-fg-muted pt-1">
            <span>{d.author || SITE.author.name}</span><span> · </span>
            <time dateTime={d.publishDate.toISOString()}>{formatDate(d.publishDate)}</time><span> · </span>
            <span>{d.readingTime}</span>
          </p>
          <dl className="study-note my-10 p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 font-sans text-sm">
            {d.researchQuestion && (
              <div className="sm:col-span-2">
                <dt className="text-fg-muted font-semibold uppercase tracking-wider text-xs mb-1">Question</dt>
                <dd className="font-serif italic text-fg text-base leading-relaxed m-0">{d.researchQuestion}</dd>
              </div>
            )}
            <div>
              <dt className="text-fg-muted font-semibold uppercase tracking-wider text-xs mb-1">Status</dt>
              <dd className="m-0 pt-0.5"><StatusBadge status={d.researchStatus} /></dd>
            </div>
            {d.methodsSummary && (
              <div>
                <dt className="text-fg-muted font-semibold uppercase tracking-wider text-xs mb-1">Method</dt>
                <dd className="text-fg-body text-sm leading-relaxed m-0">{d.methodsSummary}</dd>
              </div>
            )}
            {d.limitations && (
              <div>
                <dt className="text-fg-muted font-semibold uppercase tracking-wider text-xs mb-1">Limits</dt>
                <dd className="text-fg-body text-sm leading-relaxed m-0">{d.limitations}</dd>
              </div>
            )}
            <div>
              <dt className="text-fg-muted font-semibold uppercase tracking-wider text-xs mb-1">Scope</dt>
              <dd className="text-fg-body text-sm leading-relaxed m-0">
                UX inquiry, not clinical advice. Independent, not peer-reviewed.
                <Link to="/evidence-checks" className="text-link underline underline-offset-2 ml-1">How I check evidence →</Link>
              </dd>
            </div>
          </dl>
        </header>

        <div className="prose article-body max-w-[38rem]" dangerouslySetInnerHTML={{ __html: entry.html }} />

        <div className="max-w-[38rem] mt-12 pt-8 border-t border-rule">
          <ReferencesList references={d.references} />
        </div>

        {(prevPost || nextPost) && (
          <nav aria-label="Adjacent articles" className="max-w-[38rem] grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12 pt-8 border-t border-rule font-sans">
            {prevPost ? (
              <Link to="/journal/$slug" params={{ slug: prevPost.slug }} className="group text-left">
                <span className="text-xs uppercase tracking-wider text-fg-muted block mb-1">← Previous Inquiry</span>
                <span className="font-serif text-sm text-fg group-hover:text-link transition-colors line-clamp-2">{prevPost.data.title}</span>
              </Link>
            ) : <div />}
            {nextPost && (
              <Link to="/journal/$slug" params={{ slug: nextPost.slug }} className="group text-right">
                <span className="text-xs uppercase tracking-wider text-fg-muted block mb-1">Next Inquiry →</span>
                <span className="font-serif text-sm text-fg group-hover:text-link transition-colors line-clamp-2">{nextPost.data.title}</span>
              </Link>
            )}
          </nav>
        )}
      </article>
    </main>
  );
}
