import { createFileRoute } from "@tanstack/react-router";
import { SITE, isConfirmed, pageHead } from "@/config/site";
import { Main, PageHeader } from "@/components/site/bits";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead({
      path: "/contact",
      title: "Contact",
      description: "Contact Shiwakshi Rashmi about digital health, UX research methods or AI in research.",
    }),
  component: Contact,
});

function Contact() {
  return (
    <Main>
      <PageHeader
        eyebrow="Connect"
        title="Contact"
        lede="I would be glad to hear about the questions you are working on."
      />
      <section className="space-y-6 my-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 font-sans text-sm">
          {isConfirmed(SITE.author.email) && (
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider text-fg-muted font-semibold block">Email</span>
              <a href={`mailto:${SITE.author.email}`} className="text-base text-link underline underline-offset-2 break-all">{SITE.author.email}</a>
            </div>
          )}
          {isConfirmed(SITE.author.linkedIn) && (
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider text-fg-muted font-semibold block">LinkedIn</span>
              <a href={SITE.author.linkedIn} target="_blank" rel="noopener noreferrer" className="text-base text-link underline underline-offset-2 break-all">Shiwakshi Rashmi on LinkedIn ↗</a>
            </div>
          )}
          <p className="m-0 leading-relaxed text-fg-body">
            If you’re exploring digital health, lived experience of long-term or fluctuating conditions, UX research methods, or AI in research, I’d love to exchange ideas. You’re welcome to reach out on LinkedIn with a question, a reading recommendation, or a possible collaboration.
          </p>
        </div>
      </section>
      <section className="border-t border-b border-rule py-4 my-8 font-sans text-sm text-fg-body space-y-1">
        <strong className="text-fg block text-xs uppercase tracking-wider">Privacy and medical scope</strong>
        <p className="m-0 leading-relaxed text-sm">
          Please do not send medical records, clinical histories or urgent health questions. I am a UX and market researcher, not a doctor or clinician. I cannot assess symptoms or give medical advice.
        </p>
      </section>
      <section className="pt-4 font-sans text-sm text-fg-muted">
        <p className="m-0 leading-relaxed">
          I would like to hear from researchers, patient advocates, healthcare professionals and people with lived experience of long-term or fluctuating conditions. I am not recruiting study participants at present.
        </p>
      </section>
    </Main>
  );
}
