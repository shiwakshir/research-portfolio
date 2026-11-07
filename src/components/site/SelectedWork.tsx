import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ProjectEntry } from "@/lib/content";

export function SelectedWork({ projects }: { projects: ProjectEntry[] }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="selected-projects">
      {projects.map((project, index) => {
        const { data, slug } = project;
        const open = expanded === slug;
        return (
          <article
            key={slug}
            className="selected-project"
            data-expanded={open}
            onPointerLeave={(event) => {
              if (event.pointerType === "mouse" && !event.currentTarget.querySelector(":focus-visible")) setExpanded((value) => value === slug ? null : value);
            }}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget) && !event.currentTarget.matches(":hover")) setExpanded((value) => value === slug ? null : value);
            }}
          >
            <h3 className="m-0">
              <Button
                variant="ghost"
                className="project-trigger"
                id={`project-title-${slug}`}
                aria-expanded={open}
                aria-controls={`project-details-${slug}`}
                onPointerMove={(event) => {
                  if (event.pointerType === "mouse" && window.matchMedia("(hover: hover) and (pointer: fine)").matches) setExpanded(slug);
                }}
                onFocus={(event) => {
                  if (event.currentTarget.matches(":focus-visible")) setExpanded(slug);
                }}
                onClick={() => setExpanded(open ? null : slug)}
              >
                <span className="project-number" aria-hidden="true">0{index + 1}</span>
                <span className="project-name">{data.title}</span>
                <span className="project-sector">{data.sector}</span>
                <Plus className="project-toggle" aria-hidden="true" />
              </Button>
            </h3>
            <div className="project-reveal" data-expanded={open} inert={!open}>
              <div className="project-reveal-inner">
                <div id={`project-details-${slug}`} role="region" aria-labelledby={`project-title-${slug}`} className="project-details">
                  <p className="summary">{data.summary}</p>
                  <dl className="project-facts">
                    <div><dt>My role</dt><dd>{data.role}</dd></div>
                    <div><dt>Approach</dt><dd>{data.methods.join(" · ")}</dd></div>
                  </dl>
                  {data.award && <p className="font-sans text-xs leading-relaxed text-fg-muted">{data.award}</p>}
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                    <Button asChild variant="link" className="h-auto p-0 text-xs font-normal">
                      <Link to="/projects/$slug" params={{ slug }}>Case study <ArrowUpRight aria-hidden="true" /></Link>
                    </Button>
                    {data.githubUrl && (
                      <Button asChild variant="link" className="h-auto p-0 text-xs font-normal">
                        <a href={data.githubUrl} target="_blank" rel="noopener noreferrer">Source <ArrowUpRight aria-hidden="true" /></a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}