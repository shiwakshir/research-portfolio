import { Link } from "@tanstack/react-router";
import { ArrowUpRight, LockKeyhole } from "lucide-react";
import { ROADMAP_STAGES, stageLabel, stageState, type ResearchStageId } from "@/data/roadmap";
import { getStageArticles } from "@/lib/research";
import { ResearchGlyph } from "@/components/site/ResearchGlyph";

export function ResearchJourney({ activeStage, detailed = false }: { activeStage?: ResearchStageId; detailed?: boolean }) {
  return (
    <nav aria-label="Journal research journey" className={`journal-journey${detailed ? " journey-detailed" : ""}`}>
      {ROADMAP_STAGES.map((stage, index) => {
        const count = getStageArticles(stage.id).length;
        return (
          <Link key={stage.id} to="/journal/stages/$stage" params={{ stage: stage.id }} className="journey-chapter group" data-state={stageState(index)} data-selected={activeStage === stage.id || undefined} aria-current={activeStage === stage.id ? "page" : undefined}>
            <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2 font-sans text-xs text-fg-muted">
              <span>0{index + 1}</span>
              <span className="journey-status flex min-w-0 items-center gap-1.5">{stage.locked && <LockKeyhole className="size-3 shrink-0" />}{stageLabel(index)}</span>
            </div>
            <ResearchGlyph stage={stage.id} />
            <h3 className="font-serif text-lg font-normal leading-snug text-fg">{stage.title}</h3>
            {detailed && <p className="journey-description">{stage.text}</p>}
            <div className="chapter-foot font-sans text-xs text-fg-muted">
              <span>{count ? `${count} ${count === 1 ? "entry" : "entries"}` : stageState(index) === "current" ? "Notes in progress" : "To come"}</span>
              <ArrowUpRight className="size-4 text-link transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </Link>
        );
      })}
    </nav>
  );
}