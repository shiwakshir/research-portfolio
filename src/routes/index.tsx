import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/config/site";
import { getArticles, getProjects } from "@/lib/content";
import plate from "@/assets/specimen-plate.jpg";
import { FlareLine } from "@/components/site/FlareLine";
import { ResearchJourney } from "@/components/site/ResearchJourney";
import { SelectedWork } from "@/components/site/SelectedWork";
import { DeclaredInterestNote, FeaturedArticle, Main, SectionHead } from "@/components/site/bits";

export const Route = createFileRoute("/")({
  head: () => pageHead({ path: "/" }),
  component: Home,
});

const THEMES = [
  { title: "Digital health and wellbeing", category: "Digital Health", description: "Treatment burden, interface friction and app abandonment in self-management." },
  { title: "Chronic and fluctuating conditions", category: "Chronic Health", description: "Everyday life with conditions that change from day to day, including pacing and workarounds." },
  { title: "Applied AI in UX and market research", category: "Applied AI", description: "Synthetic respondents, AI-assisted synthesis and audit trails for research agents." },
  { title: "UX research methods", category: "UX Research Methods", description: "Mixed-methods design, small-sample testing and how to show research confidence." },
  { title: "Self-report and behaviour", category: "Human Behaviour", description: "The gap between self-report and behaviour, including recall bias and social desirability bias." },
];

function Home() {
  const articles = getArticles();
  const latest = articles[0];
  const projects = getProjects();

  return (
    <Main className="max-w-4xl home-editorial">
      <header className="home-lead grid grid-cols-1 md:grid-cols-12 items-center">
        <div className="min-w-0 md:col-span-7 space-y-6 rise">
          <p className="eyebrow">Independent research journal · London</p>
          <h1 className="home-title">
            Shiwakshi Rashmi
          </h1>
          <p className="home-intro">
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
        <figure className="home-plate md:col-span-5 rise [animation-delay:150ms]">
          <div className="plate float-slow rotate-[0.6deg]">
            <img src={plate} alt="Engraved botanical specimen plate with numbered annotations" width={896} height={1120} className="w-full h-auto block" />
          </div>
          <figcaption className="mt-3 font-sans text-[0.6875rem] text-fg-muted italic text-right">Pl. I — Observation before conclusion.</figcaption>
        </figure>
      </header>

      <p className="mt-14 font-sans text-xs text-fg-muted text-center tracking-wide">
        Insights Manager, UX <span className="mx-2 text-rule-strong">·</span> About five years of professional UX and market research
      </p>

      <section className="home-section home-research reveal" aria-labelledby="latest-journal-heading">
        <SectionHead id="latest-journal-heading" number="i." title="The research journal" to="/journal" linkLabel="All entries" />
        <div className="research-intro">
          <div className="space-y-3">
            <p className="eyebrow">Current inquiry · UX research</p>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-fg">Living with flare-ups</h3>
            <p className="summary">An independent study into what happens when symptoms flare, what helps, and where digital tools fall short.</p>
          </div>
          <div className="research-trace"><FlareLine /></div>
        </div>
        <DeclaredInterestNote className="my-6" />
        <ResearchJourney detailed />
        {latest && <div className="mt-10"><FeaturedArticle article={latest} withNote /></div>}
      </section>

      <section aria-labelledby="selected-work-heading" className="home-section space-y-8 reveal">
        <SectionHead id="selected-work-heading" number="ii." title="Selected work" to="/projects" linkLabel="All projects" />
        <SelectedWork projects={projects} />
      </section>

      <section aria-labelledby="themes-heading" className="home-section space-y-8 reveal">
        <SectionHead id="themes-heading" number="iii." title="Research themes" to="/interests" linkLabel="Themes overview →" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          {THEMES.map((t) => {
            const count = articles.filter((a) => a.data.category === t.category).length;
            return (
              <div key={t.title} className="space-y-1.5">
                <h3 className="font-serif text-lg text-fg font-normal">
                  {t.title}
                  {count > 0 && <span className="font-sans text-xs text-fg-muted font-normal ml-1">· {count}</span>}
                </h3>
                <p className="font-sans text-sm text-fg-muted leading-relaxed">{t.description}</p>
              </div>
            );
          })}
        </div>
      </section>
    </Main>
  );
}
