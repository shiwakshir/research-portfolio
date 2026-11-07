import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, PencilLine } from "lucide-react";
import { pageHead } from "@/config/site";
import { getResearchStage, ROADMAP_STAGES, stageLabel, stageState } from "@/data/roadmap";
import { getStageArticles } from "@/lib/research";
import { ArticleCard, DeclaredInterestNote, Main } from "@/components/site/bits";
import { ResearchJourney } from "@/components/site/ResearchJourney";
import { ResearchGlyph } from "@/components/site/ResearchGlyph";
import { Button } from "@/components/ui/button";
import { getEntryPreviews } from "@/lib/entry-previews";
import { EntryPreviewCard } from "@/components/site/EntryPreviewCard";

export const Route = createFileRoute("/journal/stages/$stage")({
  head: ({ params }) => {
    const stage = getResearchStage(params.stage);
    return pageHead({
      path: stage ? `/journal/stages/${stage.id}` : "/journal",
      title: stage ? `${stage.title} · Living with flare-ups` : "Research chapter unavailable",
      description: stage ? `${stage.text} Research notes and journal entries by Shiwakshi Rashmi.` : "Explore the research journal of Shiwakshi Rashmi.",
    });
  },
  component: StagePage,
});

function StagePage() {
  const { stage: id } = Route.useParams();
  const stage = getResearchStage(id);
  if (!stage) return (
    <Main><h1 className="font-serif text-3xl text-fg">Research chapter unavailable</h1><Button variant="link" asChild className="mt-5 p-0"><Link to="/journal">Return to the journal <ArrowLeft /></Link></Button></Main>
  );
  const index = ROADMAP_STAGES.findIndex((item) => item.id === stage.id);
  const entries = getStageArticles(stage.id);
  const previews = getEntryPreviews(stage.id);
  const next = ROADMAP_STAGES[index + 1];
  const current = stageState(index) === "current";

  return (
    <Main>
      <Button variant="link" asChild className="p-0 mb-8 font-sans text-xs"><Link to="/journal"><ArrowLeft />Research journal</Link></Button>
      <header className="chapter-heading rise">
        <div className="space-y-4">
          <div className="eyebrow flex items-center gap-3"><span>Living with flare-ups</span><span className="chapter-label">{stageLabel(index)}</span></div>
          <h1 className="page-title">{stage.title}</h1>
          <p className="lede">{stage.text}</p>
        </div>
        <ResearchGlyph stage={stage.id} className="chapter-cover" />
      </header>
      <DeclaredInterestNote className="mt-8 mb-4" />
      <section className="mt-10" aria-labelledby="chapter-entries-heading">
        <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_auto] items-baseline gap-3 mb-5">
          <h2 id="chapter-entries-heading" className="font-serif text-2xl font-normal text-fg">{current ? "The first inquiries" : "Research notes"}</h2>
          <span className="font-sans text-xs text-fg-muted">{entries.length} published {entries.length === 1 ? "entry" : "entries"}</span>
        </div>
        {entries.map((entry) => <ArticleCard key={entry.slug} article={entry} number={entry.data.articleNumber} />)}
        {previews.map((entry) => <EntryPreviewCard key={entry.slug} entry={entry} />)}
        {!entries.length && !previews.length && (
          <div className="chapter-empty">
            <PencilLine className="size-5 text-link shrink-0" aria-hidden="true" />
            <div className="space-y-2">
              <h3 className="font-serif text-xl font-normal text-fg">{current ? "A chapter in the making" : stage.locked ? "Something new, in time" : "The next questions are still ahead"}</h3>
              <p className="font-sans text-sm text-fg-secondary leading-relaxed max-w-lg">{current ? "The first desk-research notes will appear here when they’re ready to publish." : "No entries published yet. This chapter will grow as the research reaches this stage."}</p>
            </div>
          </div>
        )}
      </section>
      <section className="mt-16" aria-labelledby="whole-journey-heading">
        <h2 id="whole-journey-heading" className="eyebrow mb-5">The whole inquiry</h2>
        <ResearchJourney activeStage={stage.id} />
      </section>
      {next && <div className="mt-10 flex justify-end"><Button variant="link" asChild className="h-auto min-h-11 p-0 whitespace-normal text-right"><Link to="/journal/stages/$stage" params={{ stage: next.id }}><span className="min-w-0">Next chapter: {next.title}</span><ArrowRight className="shrink-0" /></Link></Button></div>}
    </Main>
  );
}
