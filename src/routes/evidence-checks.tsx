import { createFileRoute } from "@tanstack/react-router";
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
      <PageHeader
        eyebrow="Evidence policy"
        title="How I check evidence"
        lede="I publish independent inquiries in UX and market research. Before I publish an article, I apply the checks on this page."
      />
      <section className="space-y-6 mb-12">
        <h2 className="font-serif text-2xl font-normal text-fg">Article status</h2>
        <p className="summary">Each article has one status. The status tells you what kind of evidence the article uses.</p>
        <dl className="space-y-6 pt-2 font-sans text-base max-w-[38rem]">
          {STATUSES.map(([t, d]) => (
            <div key={t} className="space-y-1 py-3 border-b border-rule">
              <dt className="font-serif text-lg font-normal text-fg">{t}</dt>
              <dd className="text-fg-body text-base leading-relaxed m-0 pt-1">{d}</dd>
            </div>
          ))}
        </dl>
      </section>
      <section className="prose max-w-[38rem] pt-6 border-t border-rule space-y-6">
        <h2 className="font-serif text-2xl font-normal text-fg">Checks before publication</h2>
        <p>I apply four checks to my writing:</p>
        <ol>
          <li><strong>Primary sources:</strong> I trace each citation to the original publication, a working DOI or an archived copy. I do not cite a summary of a source unless I have read the source.</li>
          <li><strong>Evidence and interpretation:</strong> I keep what the research shows separate from my own interpretation as a UX practitioner. When the evidence is not conclusive, I say so.</li>
          <li><strong>Limits:</strong> I state the limits of each observation, sample and framework. I do not apply findings from a small qualitative sample to a whole population.</li>
          <li><strong>No clinical claims:</strong> When I write about chronic and fluctuating conditions, I write about user experience, interface burden and behaviour in everyday life. I do not make medical, diagnostic or clinical claims.</li>
        </ol>
        <div className="mt-8 pt-6 border-t border-rule font-sans text-xs text-fg-muted space-y-2 not-prose">
          <strong className="text-fg block uppercase tracking-wider">Correction policy</strong>
          <p className="m-0 leading-relaxed">When I find an error in a citation, claim or data point, I correct the text. I add a dated correction note at the end of the article.</p>
          <p className="m-0 text-fg-muted">Last updated: 4 November 2026.</p>
        </div>
        <div className="mt-6 pt-4 border-t border-rule font-sans text-xs text-fg-muted not-prose">
          <strong className="text-fg block mb-1">Independent publication note</strong>
          <span>I write and edit the articles on this website myself. They come from my professional practice, my reading and my design work. They are not peer-reviewed papers or clinical trial reports.</span>
        </div>
      </section>
    </Main>
  );
}
