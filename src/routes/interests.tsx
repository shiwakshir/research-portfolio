import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/config/site";
import { Main, PageHeader } from "@/components/site/bits";

export const Route = createFileRoute("/interests")({
  head: () =>
    pageHead({
      path: "/interests",
      title: "Research themes",
      description:
        "The questions Shiwakshi Rashmi explores in digital health, chronic and fluctuating conditions, applied AI, UX research methods and self-report and behaviour.",
    }),
  component: Interests,
});

const THEMES = [
  {
    number: "01",
    title: "Digital health and wellbeing",
    summary: "How people manage long-term, episodic and fluctuating conditions with digital tools, and where those tools do not fit a capacity that changes from day to day.",
    questions: [
      "Do streaks and frequent notifications contribute to app abandonment during symptom flares? If so, how?",
      "Can an app reduce what it asks of a person on days when that person has less capacity?",
      "How do clinical ideas of treatment adherence differ from the way people pace themselves day to day?",
    ],
    anchor: "Informed by Burden of Treatment Theory (May et al., 2014) and research on lapses in personal tracking (Epstein et al., 2015).",
  },
  {
    number: "02",
    title: "Chronic and fluctuating conditions",
    summary: "How people organise everyday life at home and at work around a condition, and where this differs from the assumptions of designers and clinical protocols.",
    questions: [
      "How do people balance the work of managing a condition with their working, social and personal lives?",
      "Which everyday workarounds do people use that standard surveys do not capture?",
      "How do researchers and people with long-term pain define a flare, and what does each definition leave out?",
    ],
    anchor: "Informed by Corbin and Strauss (1985) on the work of managing chronic illness at home, and Bury (1982) on biographical disruption.",
  },
  {
    number: "03",
    title: "Applied AI in UX and market research",
    summary: "Where large language models and agent workflows help research synthesis, and where they can make evidence look more consistent than it is.",
    questions: [
      "How closely do synthetic respondents match the answers of real people, and for which groups and topics do they fail?",
      "How can researchers use AI for thematic clustering and still keep minority views and contradicting accounts?",
      "Which audit trails does a multi-agent evaluation system, such as BRIEF, need for research integrity?",
    ],
    anchor: "Informed by research on language models as simulated survey samples (Argyle et al., 2023) and guidelines for human–AI interaction (Amershi et al., 2019).",
  },
  {
    number: "04",
    title: "UX research methods",
    summary: "How to combine qualitative depth with quantitative measurement, and how to show how confident a finding is.",
    questions: [
      "How can generative discovery research improve later survey design?",
      "What are the limits of small-sample usability testing when the state of a user changes from day to day?",
      "How can teams show different levels of research confidence clearly to cross-functional stakeholders?",
    ],
    anchor: "Informed by mixed-methods research design (Creswell and Plano Clark, 2018) and survey methodology.",
  },
  {
    number: "05",
    title: "Self-report and behaviour",
    summary: "How what people report about their health and routines differs from what they do, including recall bias and social desirability bias.",
    questions: [
      "How does recall bias change what people report about their health and daily routines?",
      "When do observation or in-the-moment methods give a more accurate account than retrospective self-report?",
      "How does social desirability affect answers about health behaviour?",
    ],
    anchor: "Informed by research on ecological momentary assessment (Shiffman, Stone and Hufford, 2008) and social desirability bias (Krumpal, 2013).",
  },
];

function Interests() {
  return (
    <Main>
      <PageHeader
        eyebrow="Research agenda"
        title="Research themes"
        lede="These are the questions I read about and want to explore. They are directions of inquiry, not findings. I do not claim academic authority on them."
      />
      <div className="space-y-12">
        {THEMES.map((t) => (
          <section key={t.number} className="reveal space-y-4 py-8 border-b border-rule first:pt-0">
            <div className="font-sans text-xs text-fg-muted">Theme {t.number}</div>
            <h2 className="font-serif text-2xl font-normal text-fg">{t.title}</h2>
            <p className="summary">{t.summary}</p>
            <div className="pt-2">
              <span className="font-sans text-xs font-semibold uppercase tracking-wider text-fg-muted block mb-2">Questions I want to explore:</span>
              <ul className="space-y-2 font-serif italic text-base text-fg-body max-w-2xl list-disc pl-5">
                {t.questions.map((q) => <li key={q} className="leading-relaxed">{q}</li>)}
              </ul>
            </div>
            <div className="pt-2 font-sans text-xs text-fg-muted">
              <span>Theoretical anchor: </span><span className="text-fg-body">{t.anchor}</span>
            </div>
          </section>
        ))}
      </div>
      <div className="page-footer-links pt-8 font-sans text-sm text-fg-muted">
        <span>Do you work on similar questions, or can you recommend reading?</span>
        <Link to="/contact" className="text-link underline underline-offset-2">Contact me →</Link>
      </div>
    </Main>
  );
}
