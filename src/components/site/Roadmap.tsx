import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Lock } from "lucide-react";
import { ROADMAP_STAGES, stageLabel, stageState } from "@/data/roadmap";
import { ResearchGlyph } from "@/components/site/ResearchGlyph";

export function Roadmap() {
  return (
    <ol className="roadmap" aria-label="Research roadmap">
      {ROADMAP_STAGES.map((s, i) => {
        const state = stageState(i);
        return (
          <li
            key={s.id}
            className="roadmap-stage"
            data-state={state}
            data-locked={s.locked ? "true" : undefined}
            aria-current={state === "current" ? "step" : undefined}
          >
            <Link to="/journal/stages/$stage" params={{ stage: s.id }} className="roadmap-link group">
              <span className="roadmap-node" aria-hidden="true"><ResearchGlyph stage={s.id} /></span>
              <div className="roadmap-body">
                <span className="roadmap-status">{s.locked && <Lock className="size-3" />}{stageLabel(i)}</span>
                <h3 className="font-serif text-base text-fg font-normal leading-snug">{s.title}</h3>
                <p className="font-sans text-xs leading-relaxed text-fg-muted">{s.text}</p>
                <span className="roadmap-read font-sans text-[0.6875rem] text-link">{state === "current" ? "Research notes" : "View chapter"}<ArrowUpRight className="size-3.5" aria-hidden="true" /></span>
              </div>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
