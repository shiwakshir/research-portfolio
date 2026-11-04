import { createFileRoute, Link } from "@tanstack/react-router";
import { SITE, pageHead } from "@/config/site";
import { getArticles, getProjects } from "@/lib/content";
import plate from "@/assets/specimen-plate.jpg";
import { FeaturedArticle, Main, Ornament, SectionHead } from "@/components/site/bits";

export const Route = createFileRoute("/")({
  head: () => pageHead({ path: "/" }),
  component: Home,
});

const THEMES = [
  { title: "Digital health and wellbeing", category: "Digital Health", description: "Treatment burden, interface friction and app abandonment in self-management." },
  { title: "Chronic and fluctuating conditions", category: "Chronic Health", description: "Everyday life with conditions that change from day to day, including pacing and workarounds." },
  { title: "Applied AI in UX and market research", category: "Applied AI", description: "Synthetic respondents, AI-assisted synthesis and audit trails for research agents." },
  { title: "UX research methods", category: "UX Research Methods", description: "Mixed-methods design, small-sample testing and how to show research confidence." },
  { title: "Human behaviour and lived experience", category: "Human Behaviour", description: "The gap between self-report and behaviour, including recall bias and social desirability bias." },
];

function Home() {
  const articles = getArticles();
  const latest = articles[0];
  const projects = getProjects();
  const lead = projects.find((p) => p.data.isLead) ?? projects[0];
  const others = projects.filter((p) => !p.data.isLead);

  return (
    <Main>
      <header className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-center">
        <div className="md:col-span-7 space-y-7 rise">
          <p className="eyebrow">Independent research journal · London</p>
          <h1 className="font-serif font-normal text-4xl sm:text-5xl lg:text-6xl leading-[1.08] text-fg">
            Shiwakshi Rashmi
          </h1>
          <p className="font-serif text-xl sm:text-2xl leading-snug text-fg-secondary">
            Independent inquiry into <em className="text-link">digital health</em>, human behaviour, UX research and applied AI.
          </p>
          <p className="summary">
            I’m an Insights Manager in UX and market research. Here, I share evidence-led writing and open research questions.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-1 font-sans text-sm">
            <Link to="/journal" className="text-link underline underline-offset-4">Read the journal →</Link>
            <Link to="/evidence-checks" className="text-fg-muted hover:text-fg transition-colors">How I check evidence</Link>
          </div>
        </div>
        <figure className="md:col-span-5 m-0 rise [animation-delay:150ms]">
          <div className="plate float-slow rotate-[0.6deg]">
            <img src={plate} alt="Engraved botanical specimen plate with numbered annotations" width={896} height={1120} className="w-full h-auto block" />
          </div>
          <figcaption className="mt-3 font-sans text-[0.6875rem] text-fg-muted italic text-right">Pl. I — Observation before conclusion.</figcaption>
        </figure>
      </header>

      <p className="mt-14 font-sans text-xs text-fg-muted text-center tracking-wide">
        Insights Manager, UX <span className="mx-2 text-rule-strong">·</span> Over five years of professional UX and market research
      </p>

      <Ornament />

      {latest && (
        <section className="reveal" aria-labelledby="latest-journal-heading">
          <SectionHead id="latest-journal-heading" number="i." title="Latest in the journal" to="/journal" linkLabel="All entries" />
          <FeaturedArticle article={latest} withNote />
        </section>
      )}

      <Ornament />

      <section aria-labelledby="selected-work-heading" className="space-y-8 reveal">
        <SectionHead id="selected-work-heading" number="ii." title="Selected work" to="/projects" linkLabel="All projects" />
        {lead && (
          <article className="space-y-4">
            <h3 className="font-serif text-2xl font-normal text-fg">{lead.data.title}</h3>
            <p className="summary">{lead.data.summary}</p>
            {lead.data.award && <p className="font-sans text-xs text-fg-muted">{lead.data.award}</p>}
            <div className="flex items-center gap-4 pt-1 font-sans text-sm">
              <Link to="/projects/$slug" params={{ slug: lead.slug }} className="text-link underline underline-offset-2">Case study</Link>
              <a href={SITE.author.briefGithub} target="_blank" rel="noopener noreferrer" className="text-link underline underline-offset-2">Source ↗</a>
            </div>
          </article>
        )}
        <div className="pt-6 space-y-4 border-t border-rule">
          {others.map((p) => (
            <div key={p.slug} className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 items-baseline py-3 border-b border-rule last:border-b-0">
              <div className="md:col-span-7">
                <h3 className="font-serif text-base text-fg font-normal">
                  <Link to="/projects/$slug" params={{ slug: p.slug }} className="hover:text-link transition-colors">{p.data.title}</Link>
                </h3>
              </div>
              <div className="md:col-span-5 md:text-right">
                <p className="font-sans text-xs text-fg-muted">{p.data.sector} · {p.data.methods.slice(0, 2).join(", ")}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Ornament />

      <section aria-labelledby="themes-heading" className="space-y-8 reveal">
        <SectionHead id="themes-heading" number="iii." title="Research themes" to="/interests" linkLabel="Themes overview →" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          {THEMES.map((t) => {
            const count = articles.filter((a) => a.data.category === t.category).length;
            return (
              <div key={t.title} className="space-y-1.5">
                <h3 className="font-serif text-base text-fg font-normal">
                  {t.title}
                  {count > 0 && <span className="font-sans text-xs text-fg-muted font-normal ml-1">· {count}</span>}
                </h3>
                <p className="font-sans text-xs text-fg-muted leading-relaxed">{t.description}</p>
              </div>
            );
          })}
        </div>
      </section>
    </Main>
  );
}
