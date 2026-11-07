import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/config/site";
import { Main } from "@/components/site/bits";

export const Route = createFileRoute("/about")({
  head: () =>
    pageHead({
      path: "/about",
      title: "About",
      description: "About Shiwakshi Rashmi, an Insights Manager in UX and market research based in London.",
    }),
  component: About,
});

function About() {
  return (
    <Main>
      <header className="space-y-4 mb-8">
        <div className="eyebrow">Biography</div>
        <h1 className="page-title">Shiwakshi Rashmi</h1>
        <p className="font-sans text-xs text-fg-muted">
          Insights Manager, UX · London
        </p>
      </header>
      <hr className="border-t border-rule-strong my-8" />
      <div className="prose max-w-[38rem]">
        <p>I'm an Insights Manager. I have worked in UX and market research since 2021. My academic background in philosophy and sociology informs the questions I bring to my work, which spans qualitative and quantitative methods, survey design and multi-market research.</p>
        <p>This is a home for my independent work—a place to share research, consider open questions and exchange ideas. It does not represent my employer and contains no employer or client work.</p>
        <h2>What I research</h2>
        <p>I study what happens when people live with conditions that change from day to day, and how digital tools help or add to the work. I also study how research teams use AI, and where AI weakens the evidence. Two further themes are UX research methods and the gap between what people say they do and what they do.</p>
        <p>I publish literature reviews, critical analyses and open questions here, one piece at a time. Each piece states its method and its limits. I am not a clinician, and nothing here is medical advice. I have no institutional affiliation at present.</p>
        <h2>Methodological commitments</h2>
        <p>I follow five principles in my independent work:</p>
        <ol>
          <li><strong>Primary evidence:</strong> Claims cite peer-reviewed papers, primary studies or named public datasets.</li>
          <li><strong>Separation of voice:</strong> What the research shows is kept distinct from my professional interpretation.</li>
          <li><strong>Transparent limits:</strong> Every piece notes what the method cannot answer.</li>
          <li><strong>Respect for everyday knowledge:</strong> People who live with a condition know things that clinical protocols do not capture.</li>
          <li><strong>No client overlap:</strong> My independent research addresses different questions and domains from my employer's work.</li>
        </ol>
      </div>
    </Main>
  );
}
