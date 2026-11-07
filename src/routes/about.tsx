import { createFileRoute, Link } from "@tanstack/react-router";
import { SITE, pageHead } from "@/config/site";
import { Main } from "@/components/site/bits";

export const Route = createFileRoute("/about")({
  head: () =>
    pageHead({
      path: "/about",
      title: "About Shiwakshi Rashmi",
      description:
        "Shiwakshi Rashmi is an Insights Manager in UX and market research, and publishes independent research on digital health, human behaviour, UX research and applied AI.",
    }),
  component: About,
});

function About() {
  return (
    <Main>
      <header className="space-y-4 mb-8">
        <p className="eyebrow">Professional background</p>
        <h1 className="display-title rise">{SITE.author.name}</h1>
        <p className="font-sans text-xs text-fg-muted">{SITE.author.fullTitle} · {SITE.author.location}</p>
        <p className="lede">My work begins with curiosity about people and careful attention to evidence.</p>
      </header>
      <hr className="border-t border-rule-strong my-8" />
      <div className="prose max-w-[38rem]">
        <p>I’m an Insights Manager with about five years of professional experience in UX and market research. My academic background in philosophy and sociology informs the questions I bring to my work, which spans qualitative and quantitative methods, survey design and multi-market research.</p>
        <p>This is a home for my independent work—a place to share research, consider open questions and exchange ideas. It does not represent my employer and contains no employer or client work.</p>
        <h2>What I research</h2>
        <p>I study what happens when people live with conditions that change from day to day, and how digital tools help or add to the work. I also study how research teams use AI, and where AI weakens the evidence. Two further themes are UX research methods and the gap between what people say they do and what they do.</p>
        <p>I publish literature reviews, critical analyses and open questions here, one piece at a time. Each piece states its method and its limits. I am not a clinician, and nothing here is medical advice. I have no institutional affiliation at present.</p>
        <p>I am also exploring early-stage ideas in digital support for fluctuating health conditions. I state this interest in articles where it is relevant.</p>
        <h2>What I build</h2>
        <p>
          I also build research tools. <Link to="/projects/$slug" params={{ slug: "brief-agentic-evaluation" }}>BRIEF</Link> audits what AI already assumes about a research topic before fieldwork begins. It won the Hack for Good Award at Microsoft Agents League @ AI Skills Fest 2026. I also built{" "}
          <Link to="/projects/$slug" params={{ slug: "choicegap" }}>ChoiceGap</Link>,{" "}
          <Link to="/projects/$slug" params={{ slug: "handover-studio" }}>Handover Studio</Link>,{" "}
          <Link to="/projects/$slug" params={{ slug: "workplace-compliance-ai" }}>Enterprise People and Compliance AI</Link> and{" "}
          <Link to="/projects/$slug" params={{ slug: "unfumble" }}>Unfumble</Link>. These projects are my independent work and my intellectual property, except for third-party components under their own licences.
        </p>
        <h2>Work with me</h2>
        <p>
          I would like to hear from researchers, patient advocates, healthcare professionals and people with lived experience. <Link to="/contact">Contact me</Link>, or read <Link to="/evidence-checks">how I check evidence</Link>.
        </p>
      </div>
    </Main>
  );
}
