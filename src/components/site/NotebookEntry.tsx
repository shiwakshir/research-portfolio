import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { SITE } from "@/config/site";
import { ROADMAP_STAGES } from "@/data/roadmap";
import { pad } from "@/lib/content";
import type { EntryPreview } from "@/lib/entry-previews";

export function NotebookEntry({ entry }: { entry: EntryPreview }) {
  const stage = ROADMAP_STAGES.find((item) => item.id === entry.researchStage);
  const stageNumber = ROADMAP_STAGES.findIndex((item) => item.id === entry.researchStage) + 1;
  return (
    <main className="notebook-page">
      <article>
        <header className="notebook-header rise">
          {stage && <Button asChild variant="link" className="justify-self-start h-auto p-0 text-xs font-normal"><Link to="/journal/stages/$stage" params={{ stage: stage.id }}>Stage {stageNumber} · {stage.title}</Link></Button>}
          <p className="notebook-entry-details">{entry.entryType} · Entry {pad(entry.articleNumber)} · {entry.topic}<br className="sm:hidden" /><span className="hidden sm:inline"> · </span>Publication pending · Reading time pending</p>
          <div className="space-y-4">
            <h1 className="notebook-title">{entry.title}</h1>
            <p className="notebook-subtitle">{entry.subtitle}</p>
          </div>
          <p className="notebook-preparation">Entry placeholder · In preparation<br /><span>No findings or sources are presented in this preview.</span></p>
        </header>

        <section className="notebook-glance" aria-labelledby="at-a-glance-heading">
          <h2 id="at-a-glance-heading" className="font-sans text-xs font-semibold text-link">At a glance</h2>
          <dl>
            <div><dt>Research question</dt><dd>{entry.researchQuestion}</dd></div>
            <div><dt>Method</dt><dd>{entry.method}</dd></div>
            <div><dt>Number of sources</dt><dd>Not yet recorded</dd></div>
            <div><dt>Search dates</dt><dd>Not yet recorded</dd></div>
          </dl>
        </section>

        <div className="prose notebook-body" dangerouslySetInnerHTML={{ __html: entry.html }} />

        <section className="notebook-references" aria-labelledby="entry-references-heading">
          <h2 id="entry-references-heading" className="font-serif text-2xl font-normal text-fg">References</h2>
          <p className="font-sans text-sm leading-relaxed text-fg-muted">No sources have been added yet. Verified references and return links to their citations will appear with the completed entry.</p>
        </section>

        <footer className="notebook-footer">
          <p>UX inquiry, not clinical advice.</p>
          <Button asChild variant="link" className="h-auto p-0 text-xs font-normal"><a href={SITE.author.linkedIn} target="_blank" rel="noopener noreferrer">Follow the research on LinkedIn</a></Button>
        </footer>
      </article>
    </main>
  );
}