import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import plate from "@/assets/botanical-plate.jpg";
import img1 from "@/assets/project-1.jpg";
import imgTT from "@/assets/project-treatment-timeline.jpg";
import img2 from "@/assets/project-2.jpg";
import img3 from "@/assets/project-3.jpg";
import img4 from "@/assets/project-4.jpg";
import img5 from "@/assets/project-5.jpg";

const projectImages = [img1, imgTT, img2, img3, img4, img5];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shiwakshi Rashmi — Independent research journal" },
      { name: "description", content: "Evidence-led writing on digital health, human behaviour, UX research and applied AI." },
      { property: "og:title", content: "Shiwakshi Rashmi — Independent research journal" },
      { property: "og:description", content: "Evidence-led writing on digital health, human behaviour, UX research and applied AI." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const stages = [
  { id: "desk" as const, n: "01", s: "Now", t: "Desk research", d: "Reviewing published evidence on flare-ups, self-management and digital support.", f: "Notes in progress" },
  { id: "survey" as const, n: "02", s: "Next", t: "Exploratory survey", d: "Asking people with lived experience what happens during a flare and what helps.", f: "To come" },
  { id: "interviews" as const, n: "03", s: "Later", t: "Deeper inquiry", d: "Exploring the survey findings in more depth.", f: "To come" },
  { id: "design" as const, n: "04", s: "Later", t: "Design and testing", d: "Turning the evidence into design decisions and testing them.", f: "To come" },
  { id: "product" as const, n: "05", s: "Coming later", t: "Something new", d: "Built from this research.", f: "To come" },
];
const projects = [
  { name: "BRIEF", slug: "brief-agentic-evaluation", cat: "Applied AI", desc: "BRIEF audits what AI already assumes about a research topic, before any fieldwork begins. Eleven specialised agents run on Microsoft Foundry, with Foundry IQ grounding through Azure AI Search.", role: "I designed and built BRIEF alone.", approach: "Multi-agent system · Assumption audit", award: "Hack for Good Award, Microsoft Agents League @ AI Skills Fest 2026", src: "https://github.com/shiwakshir/brief-agent", tone: "bg-sage-soft" },
  { name: "Treatment Timeline", slug: "treatment-timeline", cat: "Digital health", desc: "Treatment Timeline is a prototype that helps a patient record a mental health medication history in Hindi, English or Hinglish. It turns the answers into a timeline for a clinician and keeps the patient's own words beside each interpretation.", role: "I designed and built Treatment Timeline alone.", approach: "Multilingual extraction · Safety checks · Patient confirmation", src: "https://github.com/shiwakshir/treatment-timeline", tone: "bg-terracotta-soft" },
  { name: "ChoiceGap", slug: "choicegap", cat: "Research methods", desc: "ChoiceGap turns a research brief and hypotheses into a survey and an AI-moderated interview. The researcher approves the study before participants take part. Participants can correct the AI's summary, and each finding links to the exact responses.", role: "I designed and built ChoiceGap alone.", approach: "Adaptive surveys · AI-moderated interviews · Participant corrections", award: "Built for the Meta Global AI Developer Hackathon 2026", src: "https://github.com/shiwakshir/choicegap", tone: "bg-terracotta-soft" },
  { name: "Handover Studio", slug: "handover-studio", cat: "Workplace tools", desc: "Handover Studio is a prototype that turns the markers and transcript of a work task into handover materials, including a written procedure, slides and a flowchart.", role: "I designed and built Handover Studio alone.", approach: "Rule-based workflow pipeline · Workflow capture", src: "https://github.com/shiwakshir/handover-studio", tone: "bg-secondary" },
  { name: "Unfumble", slug: "unfumble", cat: "Applied AI", desc: "Unfumble is a privacy-first file tool. It builds custom file workflows from plain English, and it diagnoses and repairs files that an upload portal rejects.", role: "I designed and built Unfumble alone.", approach: "Natural-language workflow building · Portal rule checks · Local file processing", src: "https://github.com/shiwakshir/unfumble", tone: "bg-sage-soft" },
  { name: "Enterprise People and Compliance AI", slug: "workplace-compliance-ai", cat: "Applied AI", desc: "A prototype of an AI gateway that answers workplace policy questions with access controls, citations and guardrail tests.", role: "I designed and built this prototype alone.", approach: "Guardrail testing · Access control", tone: "bg-terracotta-soft" },
];
const themes = [
  ["Digital health and wellbeing", "Treatment burden, interface friction and app abandonment in self-management."],
  ["Chronic and fluctuating conditions", "Everyday life with conditions that change from day to day, including pacing and workarounds."],
  ["Applied AI in UX and market research", "Synthetic respondents, AI-assisted synthesis and audit trails for research agents."],
  ["UX research methods", "Mixed-methods design, small-sample testing and how to show research confidence."],
  ["Self-report and behaviour", "The gap between self-report and behaviour, including recall bias and social desirability bias."],
];

function Sprig({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 120" className={className} fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
      <path d="M30 118 C30 80 28 50 30 4" />
      {[20, 38, 56, 74, 92].map((y, i) => (
        <g key={y}>
          <path d={`M30 ${y + 8} C${18 - i} ${y} ${10} ${y - 2} 6 ${y - 8} C14 ${y - 6} 24 ${y - 2} 30 ${y + 8}`} />
          <path d={`M30 ${y + 14} C${42 + i} ${y + 6} 50 ${y + 4} 54 ${y - 2} C46 ${y} 36 ${y + 4} 30 ${y + 14}`} />
        </g>
      ))}
    </svg>
  );
}

function SectionHead({ num, title, link, to }: { num: string; title: string; link: string; to: "/journal" | "/projects" | "/interests" }) {
  return (
    <div className="flex items-end justify-between border-b border-border pb-4">
      <h2 className="font-serif text-3xl md:text-4xl">
        <span className="mr-3 italic text-accent">{num}</span>{title}
      </h2>
      <Link to={to} className="group text-sm font-medium text-primary">
        {link} <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
      </Link>
    </div>
  );
}

function Index() {
  const [openWork, setOpenWork] = useState<number | null>(null);
  return (
    <div className="grain relative min-h-screen overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[900px] bg-wash" />

      <main className="relative mx-auto max-w-6xl px-6">
        {/* Hero */}
        <section className="grid items-center gap-14 py-20 md:grid-cols-[1.15fr_1fr] md:py-28">
          <div className="animate-rise">
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground sm:text-xs sm:tracking-[0.18em]">
              <span className="relative flex h-2 w-2"><span className="animate-pulse-ring absolute inset-0 rounded-full bg-accent" /><span className="relative h-2 w-2 rounded-full bg-accent" /></span> Independent research journal · London
            </p>
            <h1 className="font-serif text-6xl font-light leading-[0.95] tracking-tight md:text-8xl">
              Shiwakshi<br /><span className="italic text-primary">Rashmi</span>
            </h1>
            <p className="mt-8 max-w-xl font-serif text-2xl leading-snug text-foreground/85">
              Independent inquiry into <em className="text-accent">digital health</em>, human behaviour, UX research and applied AI.
            </p>
            <p className="mt-5 max-w-lg text-muted-foreground">
              I’m an Insights Manager in UX and market research. Here, I share evidence-led writing and open research questions.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <Link to="/journal" className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-plate transition-transform hover:-translate-y-0.5">Read the journal →</Link>
              <Link to="/evidence-checks" className="text-sm font-medium text-foreground underline decoration-border underline-offset-4 hover:decoration-accent">How I check evidence</Link>
            </div>
          </div>

          <figure className="relative mx-auto w-full max-w-sm animate-rise [animation-delay:200ms]">
            <Sprig className="animate-sway absolute -left-14 -top-10 h-40 w-20 text-sage" />
            <div className="absolute -right-5 -top-5 h-full w-full rounded-sm border border-accent/40" />
            <div className="relative rotate-[1.5deg] rounded-sm bg-card p-3 shadow-plate transition-transform duration-500 hover:rotate-0">
              <img src={plate} width={896} height={1120} alt="Engraved botanical specimen plate with numbered annotations" className="plate-img w-full rounded-[2px]" />
            </div>
            <figcaption className="mt-5 text-right font-serif text-sm italic text-muted-foreground">Pl. I — Observation before conclusion.</figcaption>
          </figure>
        </section>

        <p className="-mt-6 mb-4 text-center text-xs tracking-wide text-muted-foreground">
          Insights Manager, UX <span className="mx-2 text-border">·</span> Working in UX and market research since 2021
        </p>

        {/* Journal */}
        <section className="relative py-16">
          <svg className="pointer-events-none absolute inset-x-0 -top-3 h-20 w-full opacity-40 md:-top-5 md:h-24" viewBox="0 0 1400 160" preserveAspectRatio="none" aria-hidden>
            <path className="animate-ecg" d="M0 100 H380 l20 -10 l15 10 H520 l18 -70 l22 120 l18 -60 l14 10 H760 c40 0 60 -40 100 -40 s60 40 120 40 H1400" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
          </svg>
          <SectionHead num="i." title="The research journal" link="All entries" to="/journal" />
          <div className="mt-10 overflow-hidden rounded-lg border border-border bg-card/80 p-8 md:p-12">
            <div className="grid items-center gap-10 md:grid-cols-[1fr_1fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Current inquiry · UX research</p>
                <h3 className="mt-3 font-serif text-4xl">Living with flare-ups</h3>
                <p className="mt-4 text-lg text-muted-foreground">An independent study into what happens when symptoms flare, what helps, and where digital tools fall short.</p>
              </div>
              <div>
                <svg viewBox="0 0 400 120" className="w-full" aria-hidden>
                  <defs>
                    <linearGradient id="fill" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M0 95 C60 95 90 92 120 90 C140 88 145 20 160 20 C175 20 180 98 200 98 C240 98 260 70 290 72 C320 74 340 92 400 92 L400 120 L0 120Z" fill="url(#fill)" />
                  <path className="animate-draw" d="M0 95 C60 95 90 92 120 90 C140 88 145 20 160 20 C175 20 180 98 200 98 C240 98 260 70 290 72 C320 74 340 92 400 92" fill="none" stroke="var(--accent)" strokeWidth="2.5" />
                  <circle cx="160" cy="20" r="5" fill="var(--accent)" />
                </svg>
                <div className="mt-2 flex justify-between font-serif text-sm italic text-foreground/70">
                  <span>steady</span><span>flare</span><span>recovery</span><span>steady?</span>
                </div>
              </div>
            </div>

            <p className="mt-10 border-l-2 border-sage pl-4 font-serif text-base italic text-muted-foreground">
              <span className="not-italic font-semibold text-foreground">Declared interest:</span>{" "}
              I am developing a digital product for people with fluctuating health conditions. This research can inform that product.
            </p>

            <ol className="relative mt-12 grid gap-6 md:grid-cols-5">
              <div className="absolute left-0 right-0 top-[7px] hidden h-px bg-border md:block" />
              {stages.map((st, i) => (
                <li key={st.n} className="relative flex flex-col">
                  <Link to="/journal/stages/$stage" params={{ stage: st.id }} className="group flex flex-1 flex-col rounded-md transition-colors hover:text-primary">
                    <span className={`relative block h-3.5 w-3.5 rounded-full border-2 ${i === 0 ? "border-accent bg-accent ring-4 ring-accent/20" : "border-border bg-card"}`} />
                    <p className="mt-4 text-xs uppercase tracking-wider text-muted-foreground">{st.n} · {st.s}</p>
                    <p className={`mt-1 font-serif text-xl md:min-h-[3.5rem] ${i === 0 ? "text-foreground" : "text-foreground/60"}`}>{st.t}</p>
                    <p className="mt-1 flex-1 text-sm text-muted-foreground">{st.d}</p>
                    <p className={`mt-auto pt-4 text-xs ${i === 0 ? "text-accent" : "text-muted-foreground"}`}>{i === 0 && "● "}{st.f} <span className="inline-block transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span></p>
                  </Link>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-xs text-muted-foreground">The later stages can change as the research develops.</p>
          </div>
        </section>

        {/* Work */}
        <section className="py-16">
          <SectionHead num="ii." title="Selected work" link="All projects" to="/projects" />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {projects.map((p, i) => (
              <article key={p.name} className={`group relative flex flex-col rounded-lg border border-border bg-card p-5 md:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-plate ${i === 0 ? "md:col-span-2 md:flex-row md:gap-10" : ""}`}>
                <div className={`relative mb-6 overflow-hidden rounded-md ${p.tone} ${openWork === i ? "" : "hidden md:block"} ${i === 0 ? "aspect-[16/10] md:mb-0 md:aspect-auto md:w-1/2" : "aspect-[16/10]"}`}>
                  <img src={projectImages[i]} alt={p.name === "Treatment Timeline" ? "Engraving-style illustration for Treatment Timeline" : `Illustration for ${p.name}`} loading="lazy" width={1024} height={640} className="plate-img h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute left-4 top-4 grid h-14 w-14 place-items-center rounded-full bg-background/90 font-serif text-2xl italic text-accent shadow-plate backdrop-blur">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-center gap-3 text-xs uppercase tracking-wider">
                    <span className="text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                    <span className="h-px w-6 bg-border" />
                    <span className="text-accent">{p.cat}</span>
                  </div>

                  <div className={i !== 0 ? "md:min-h-[10.5rem] flex flex-col justify-start" : ""}>
                    <h3 className="mt-3 font-serif text-3xl">{p.name}</h3>
                    <button type="button" aria-expanded={openWork === i} onClick={() => setOpenWork(openWork === i ? null : i)} className="mt-3 w-fit text-sm font-medium text-primary md:hidden">{openWork === i ? "Show less −" : "Show more +"}</button>
                    <div className={openWork === i ? "block" : "hidden md:block"}>
                      <p className="mt-3 text-muted-foreground leading-relaxed">{p.desc}</p>
                    </div>
                  </div>

                  <div className={openWork === i ? "flex flex-1 flex-col" : "hidden md:flex md:flex-1 md:flex-col"}>
                    <dl className={`mt-5 space-y-2 text-sm ${i !== 0 ? "md:min-h-[6.5rem]" : ""}`}>
                      <div><dt className="text-xs uppercase tracking-wider text-muted-foreground">My role</dt><dd className="text-foreground/80">{p.role}</dd></div>
                      <div><dt className="text-xs uppercase tracking-wider text-muted-foreground">Approach</dt><dd className="text-foreground/80">{p.approach}</dd></div>
                    </dl>
                    <div className={i !== 0 ? "md:min-h-[2.25rem] flex items-center mt-4" : "mt-4"}>
                      {p.award ? (
                        <p className="inline-flex w-fit items-center gap-2 rounded-full bg-terracotta-soft px-3 py-1 text-xs font-medium text-foreground">✦ {p.award}</p>
                      ) : null}
                    </div>
                    <div className="mt-auto flex gap-5 pt-6 text-sm font-medium">
                      <Link to="/projects/$slug" params={{ slug: p.slug }} className="text-primary">Case study →</Link>
                      {p.src && <a href={p.src} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">Source ↗</a>}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Themes */}
        <section className="py-16">
          <SectionHead num="iii." title="Research themes" link="Themes overview" to="/interests" />
          <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {themes.map(([t, d], i) => (
              <div key={t} className="group bg-card p-7 transition-colors hover:bg-sage-soft">
                <span className="font-serif text-sm italic text-accent">No. {i + 1}</span>
                <h3 className="mt-2 font-serif text-2xl">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
            <Link to="/interests" className="group grid place-items-center bg-primary p-7 text-primary-foreground">
              <span className="font-serif text-2xl italic">Themes overview <span className="inline-block transition-transform group-hover:translate-x-1">→</span></span>
            </Link>
          </div>
        </section>
      </main>

    </div>
  );
}
