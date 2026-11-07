import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { pageHead } from "@/config/site";
import { getProjects } from "@/lib/content";
import { BriefPipeline, Main } from "@/components/site/bits";

const find = (slug: string) => getProjects().find((p) => p.slug === slug);

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    if (!find(params.slug)) throw notFound();
    return { slug: params.slug };
  },
  head: ({ loaderData }) => {
    const p = loaderData ? find(loaderData.slug) : undefined;
    if (!p) return pageHead({ path: "/projects", title: "Project not found" });
    return pageHead({ path: `/projects/${p.slug}`, title: p.data.title, description: p.data.summary });
  },
  component: ProjectPage,
});

function ProjectPage() {
  const { slug } = Route.useLoaderData();
  const p = find(slug);
  if (!p) return null;
  const d = p.data;
  return (
    <Main>
      <nav aria-label="Breadcrumb" className="mb-8 font-sans text-xs text-fg-muted flex items-center gap-2">
        <Link to="/projects" className="hover:text-link underline underline-offset-2">Projects</Link>
        <span>/</span><span>{d.sector}</span>
      </nav>
      <header className="space-y-4 mb-8 pb-8 border-b border-rule">
        <p className="font-sans text-xs text-fg-muted uppercase tracking-wider">{d.sector}</p>
        <h1 className="page-title">{d.title}</h1>
        <p className="lede">{d.summary}</p>
        {d.award && <p className="font-sans text-xs text-fg-muted pt-1">{d.award}</p>}
        <dl className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 font-sans text-xs border-t border-rule">
          <div>
            <dt className="text-fg-muted font-semibold uppercase tracking-wider text-xs mb-1">Role</dt>
            <dd className="text-fg leading-relaxed m-0">{d.role}</dd>
          </div>
          <div>
            <dt className="text-fg-muted font-semibold uppercase tracking-wider text-xs mb-1">Approach</dt>
            <dd className="text-fg leading-relaxed m-0">{d.methods.join(" · ")}</dd>
          </div>
        </dl>
      </header>
      {d.isLead && <BriefPipeline />}
      <div className="prose max-w-[38rem]" dangerouslySetInnerHTML={{ __html: p.html }} />
      <div className="page-footer-links mt-14 pt-8 border-t border-rule font-sans text-xs">
        <Link to="/projects" className="text-link underline underline-offset-2">← Back to all projects</Link>
        {d.githubUrl && (
          <a href={d.githubUrl} target="_blank" rel="noopener noreferrer" className="text-link underline underline-offset-2">View repository on GitHub ↗</a>
        )}
      </div>
    </Main>
  );
}
