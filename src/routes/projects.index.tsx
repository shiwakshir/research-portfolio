import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/config/site";
import { getProjects, type ProjectEntry } from "@/lib/content";
import { Main, PageHeader } from "@/components/site/bits";
import { PROJECT_ART } from "@/lib/project-art";

export const Route = createFileRoute("/projects/")({
  head: () =>
    pageHead({ path: "/projects", title: "Projects", description: "Independent research tools and experiments by Shiwakshi Rashmi." }),
  component: ProjectsIndex,
});

function ProjectCard({ p, n }: { p: ProjectEntry; n: number }) {
  const d = p.data;
  const titleLink = (
    <Link to="/projects/$slug" params={{ slug: p.slug }} className="hover:text-link transition-colors">{d.title}</Link>
  );
  return (
    <article className="reveal grid gap-6 py-8 border-b border-rule first:pt-0 md:grid-cols-[14rem_minmax(0,1fr)] md:gap-8">
      {PROJECT_ART[p.slug] && (
        <Link to="/projects/$slug" params={{ slug: p.slug }} className="project-art aspect-[4/3] self-start" aria-hidden="true" tabIndex={-1}>
          <img src={PROJECT_ART[p.slug]} alt={p.slug === "treatment-timeline" ? "Engraving-style illustration for Treatment Timeline" : ""} loading="lazy" width={1024} height={640} />
          <span className="art-num">{String(n).padStart(2, "0")}</span>
        </Link>
      )}
      <div className="min-w-0">
      {d.isLead ? (
        <div className="space-y-4">
          <div className="font-sans text-xs text-fg-muted">{d.sector}</div>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-fg">{titleLink}</h2>
          <p className="summary">{d.summary}</p>
          {d.award && <p className="font-sans text-xs text-fg-muted">{d.award}</p>}
          <div className="flex items-center gap-4 pt-1 font-sans text-sm">
            <Link to="/projects/$slug" params={{ slug: p.slug }} className="text-link underline underline-offset-2">Case study</Link>
            {d.githubUrl && <a href={d.githubUrl} target="_blank" rel="noopener noreferrer" className="text-link underline underline-offset-2">Source ↗</a>}
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <h2 className="font-serif text-xl sm:text-2xl font-normal text-fg">{titleLink}</h2>
          <p className="font-sans text-xs text-fg-muted">{d.sector} · {d.methods.join(" · ")}</p>
          <p className="summary">{d.summary}</p>
          {d.award && <p className="font-sans text-xs text-fg-muted">{d.award}</p>}
          <div className="pt-1 flex flex-wrap gap-4 font-sans text-xs">
            {d.githubUrl && <a href={d.githubUrl} target="_blank" rel="noopener noreferrer" className="text-link underline underline-offset-2">Source ↗</a>}
            <Link to="/projects/$slug" params={{ slug: p.slug }} className="text-link underline underline-offset-2">Read project case study →</Link>
          </div>
        </div>
      )}
      </div>
    </article>
  );
}

function ProjectsIndex() {
  return (
    <Main>
      <PageHeader
        eyebrow="Independent work"
        title="Projects"
        lede="Research and AI tools that I build independently. Each entry states what exists today. I own the intellectual property in these projects, except for third-party components under their own licences."
      />
      <div className="space-y-4">{getProjects().map((p, i) => <ProjectCard key={p.slug} p={p} n={i + 1} />)}</div>
    </Main>
  );
}
