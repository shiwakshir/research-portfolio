import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/config/site";
import { Main, PageHeader } from "@/components/site/bits";

export const Route = createFileRoute("/evidence-checks")({
  head: () =>
    pageHead({
      path: "/evidence-checks",
      title: "How I check evidence",
      description: "How Shiwakshi Rashmi checks sources, separates evidence from interpretation and labels the status of each article.",
    }),
  component: EvidenceChecks,
});

const STATUSES = [
  ["Literature exploration", "Reviews published research and theory to find what is already known about a question."],
  ["Research in progress", "Reports work that is not finished, such as a study design, a framework or a concept. The conclusions can change."],
  ["Critical review", "Compares existing tools or research methods with the published evidence, and shows where they fall short."],
];

function EvidenceChecks() {
  return (
    <Main>
      <div className="max-w-[38rem]">
        <PageHeader
          eyebrow="Evidence policy"
          title="How I check evidence"
          lede="I publish independent inquiries in UX research, market research, digital health and applied AI. Before I publish an article, I apply the checks on this page."
        />

        <section className="space-y-6 mb-12">
          <h2 className="font-serif text-2xl font-normal text-fg">Article status</h2>
          <p className="summary">Each article has one status. The status tells you what kind of evidence the article uses.</p>
          <dl className="space-y-6 pt-2 font-serif">
            {STATUSES.map(([t, d]) => (
              <div key={t} className="space-y-1 py-3 border-b border-rule">
                <dt className="font-serif text-lg font-normal text-fg">{t}</dt>
                <dd className="prose m-0 pt-1">{d}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="space-y-6 mb-12 pt-8 border-t border-rule">
          <h2 className="font-serif text-2xl font-normal text-fg">Checks before publication</h2>
          <p className="summary">I apply five checks to my writing:</p>
          <ol className="prose space-y-3 pl-5 list-decimal m-0">
            <li><strong>Primary sources:</strong> I trace each citation to the original publication, a working DOI or an archived copy. I cite a source only after I read the source itself, not a summary of it.</li>
            <li><strong>Evidence and interpretation:</strong> I keep what the research shows separate from my own interpretation as a UX practitioner. When the evidence is not conclusive, I say so.</li>
            <li><strong>Limits:</strong> I state the limits of each observation, sample and framework. I do not apply findings from a small qualitative sample to a whole population.</li>
            <li><strong>No clinical claims:</strong> When I write about chronic and fluctuating conditions, I write about user experience, interface burden and behaviour in everyday life. I do not make medical, diagnostic or clinical claims.</li>
            <li><strong>Declared interests:</strong> I state any interest that can affect how a reader judges an article. I am developing a digital product for people with fluctuating health conditions. My research on these conditions can inform that work.</li>
          </ol>
        </section>

        <section className="space-y-4 mb-12 pt-8 border-t border-rule">
          <h2 className="font-serif text-2xl font-normal text-fg">Correction policy</h2>
          <p className="prose m-0">When I find an error in a citation, claim or data point, I correct the text. I add a dated correction note at the end of the article. To report an error, use the <Link to="/contact" className="text-link underline underline-offset-2">Contact page</Link>.</p>
        </section>

        <section className="space-y-4 mb-12 pt-8 border-t border-rule">
          <h2 className="font-serif text-2xl font-normal text-fg">Independent publication note</h2>
          <p className="prose m-0">I write the articles on this website. I use AI tools only to proofread my drafts. I do not use AI tools to research, write or cite sources. I check every proofreading change myself, and I take responsibility for all content. The articles come from my professional practice, my reading and my design work. They are not peer-reviewed papers or clinical trial reports.</p>
        </section>

        <p className="font-sans text-xs text-fg-muted pt-6 border-t border-rule m-0">
          Last updated: <time dateTime="2026-11-07">7 November 2026</time>.
        </p>
      </div>
    </Main>
  );
}
