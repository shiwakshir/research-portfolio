import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import type { JournalEntry, Reference } from "@/lib/content";
import { formatDate, pad } from "@/lib/content";

export function StatusBadge({ status }: { status: string }) {
  return (
    <Link
      to="/evidence-checks"
      title="How I check evidence"
      className="font-sans text-xs text-fg-muted hover:text-link border-b border-dotted border-rule-strong pb-0.5 transition-colors"
    >
      {status}
    </Link>
  );
}

export function DeclaredInterestNote({ className = "" }: { className?: string }) {
  return (
    <aside
      className={`border-l-2 border-link bg-[var(--research-wash)] px-4 py-3 font-sans text-xs leading-relaxed text-fg-secondary ${className}`}
      aria-label="Declared interest"
    >
      <strong className="font-semibold text-fg">Declared interest:</strong> I am developing a digital product for people with fluctuating health conditions. This research can inform that product.
    </aside>
  );
}

export function Main({ children, className = "max-w-4xl" }: { children: ReactNode; className?: string }) {
  return <main className={`${className} mx-auto px-4 sm:px-6 py-12 md:py-16`}>{children}</main>;
}

export function PageHeader({ eyebrow, title, lede }: { eyebrow?: ReactNode; title: ReactNode; lede?: ReactNode }) {
  return (
    <>
      <header className="space-y-4 mb-8">
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h1 className="display-title rise">{title}</h1>
        {lede && <p className="lede">{lede}</p>}
      </header>
      <hr className="border-t border-rule-strong my-8" />
    </>
  );
}

export function SectionHead({ id, title, to, linkLabel, number }: { id: string; title: string; to: string; linkLabel: string; number?: string }) {
  return (
    <div className="section-head">
      <h2 id={id} className="m-0">
        {number && <span className="numeral text-2xl">{number}</span>}
        <span className="font-serif text-2xl font-normal text-fg">{title}</span>
      </h2>
      <Link to={to} className="font-sans text-xs text-link underline underline-offset-4 hover:opacity-80 shrink-0">{linkLabel}</Link>
    </div>
  );
}

/** Large feature block for the newest journal entry (home + journal index). */
export function FeaturedArticle({ article, withNote }: { article: JournalEntry; withNote?: boolean }) {
  const d = article.data;
  return (
    <article className="space-y-4">
      <div className="font-sans text-xs text-fg-muted flex flex-wrap items-center gap-2">
        <span>No. {pad(d.articleNumber)}</span><span>·</span><span>{d.category}</span><span>·</span>
        <StatusBadge status={d.researchStatus} />
      </div>
      <h3 className="font-serif text-2xl sm:text-3xl font-normal text-fg leading-tight">
        <Link to="/journal/$slug" params={{ slug: article.slug }} className="hover:text-link transition-colors">{d.title}</Link>
      </h3>
      {d.subtitle && <p className="font-serif italic text-base sm:text-lg text-fg-body">{d.subtitle}</p>}
      <p className="summary">{d.abstract}</p>
      <p className="font-sans text-xs text-fg-muted pt-1">
        <time dateTime={d.publishDate.toISOString()}>{formatDate(d.publishDate)}</time>
        <span> · </span><span>{d.readingTime}</span>
      </p>
      {withNote && (d.researchQuestion || d.methodsSummary || d.limitations) && (
        <dl className="mt-6 border-t border-rule pt-4 grid grid-cols-1 md:grid-cols-3 gap-6 font-sans text-sm">
          {d.researchQuestion && (
            <div>
              <dt className="text-fg-muted font-semibold uppercase tracking-wider text-xs mb-1">Question</dt>
              <dd className="font-serif italic text-fg text-sm leading-relaxed m-0">{d.researchQuestion}</dd>
            </div>
          )}
          {d.methodsSummary && (
            <div>
              <dt className="text-fg-muted font-semibold uppercase tracking-wider text-xs mb-1">Method</dt>
              <dd className="text-fg-body text-xs leading-relaxed m-0">{d.methodsSummary}</dd>
            </div>
          )}
          {d.limitations && (
            <div>
              <dt className="text-fg-muted font-semibold uppercase tracking-wider text-xs mb-1">Limits</dt>
              <dd className="text-fg-body text-xs leading-relaxed m-0">{d.limitations}</dd>
            </div>
          )}
        </dl>
      )}
      <div className={withNote ? "pt-4" : "pt-2"}>
        <Link to="/journal/$slug" params={{ slug: article.slug }} className="font-sans text-sm text-link underline underline-offset-2">Read →</Link>
      </div>
    </article>
  );
}

export function ArticleCard({ article, number }: { article: JournalEntry; number: number }) {
  const d = article.data;
  return (
    <article className="space-y-3 py-6 border-b border-rule reveal">
      <div className="font-sans text-xs text-fg-muted flex flex-wrap items-center gap-2">
        <span>No. {pad(number)}</span><span>·</span><span>{d.category}</span><span>·</span>
        <time dateTime={d.publishDate.toISOString()}>{formatDate(d.publishDate)}</time><span>·</span>
        <span>{d.readingTime}</span><span>·</span>
        <StatusBadge status={d.researchStatus} />
      </div>
      <h3 className="font-serif text-xl sm:text-2xl font-normal text-fg leading-snug">
        <Link to="/journal/$slug" params={{ slug: article.slug }} className="hover:text-link transition-colors">{d.title}</Link>
      </h3>
      {d.subtitle && <p className="font-serif italic text-sm sm:text-base text-fg-body">{d.subtitle}</p>}
      {d.researchQuestion && (
        <p className="font-serif italic text-sm text-fg-body border-l border-rule-strong pl-3 my-2">"{d.researchQuestion}"</p>
      )}
      <p className="summary">{d.abstract}</p>
      <div className="pt-2 grid grid-cols-[minmax(0,1fr)_auto] gap-3 font-sans text-xs">
        <div className="min-w-0 flex flex-wrap gap-2 text-fg-muted">{d.tags.slice(0, 2).map((t) => <span key={t}>{t}</span>)}</div>
        <Link to="/journal/$slug" params={{ slug: article.slug }} className="text-link underline underline-offset-2">Read →</Link>
      </div>
    </article>
  );
}

export function ReferencesList({ references }: { references: Reference[] }) {
  if (!references.length) return null;
  return (
    <section id="references" className="space-y-4">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 items-baseline mb-2">
        <h2 className="font-serif text-lg font-normal text-fg">References</h2>
        <Link to="/evidence-checks" className="font-sans text-xs text-link underline underline-offset-2">How I check evidence</Link>
      </div>
      <ol className="space-y-3 font-sans text-sm text-fg-body list-none pl-0">
        {[...references].sort((a, b) => a.number - b.number).map((r) => (
          <li key={r.number} id={`ref-${r.number}`} className="flex items-baseline gap-2.5">
            <span className="text-fg-muted shrink-0 font-medium">{r.number}.</span>
            <div className="min-w-0 flex-1 space-y-1 break-words">
              <span className="leading-relaxed">{r.citation}</span>
              <span className="ml-1.5 inline-flex max-w-full flex-wrap items-center gap-2">
                {r.doi && (
                  <a href={`https://doi.org/${r.doi}`} target="_blank" rel="noopener noreferrer" className="text-link underline underline-offset-2">doi:{r.doi}</a>
                )}
                {r.url && !r.doi && (
                  <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-link underline underline-offset-2">Source ↗</a>
                )}
                <a href={`#ref-back-${r.number}`} aria-label={`Back to citation ${r.number} in the text`} className="inline-block min-w-6 min-h-6 text-center text-fg-muted hover:text-fg font-sans">↩</a>
              </span>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

const BRIEF_STEPS = ["Parse the brief", "Generate query variants", "Query the model in many voices", "Cluster the assumptions", "Gap analysis against the audience", "Temporal drift check", "Score hypothesis contamination", "Competitor and brand priming", "Trace assumption origins", "Recommend methodology", "Confidence synthesis"];

export function BriefPipeline() {
  return (
    <figure className="m-0 my-8 max-w-[38rem] border-y border-rule py-4 font-sans text-sm">
      <figcaption className="mb-3 text-xs font-semibold uppercase tracking-[.08em] text-fg-muted">The eleven steps in BRIEF</figcaption>
      <ol className="m-0 list-decimal pl-6 sm:columns-2 sm:gap-8 text-fg-body">
        {BRIEF_STEPS.map((s) => <li key={s} className="mb-1 break-inside-avoid">{s}</li>)}
      </ol>
    </figure>
  );
}
