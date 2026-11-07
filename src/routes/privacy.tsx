import { createFileRoute, Link } from "@tanstack/react-router";
import { SITE, isConfirmed, pageHead } from "@/config/site";
import { Main, PageHeader } from "@/components/site/bits";

const DESCRIPTION =
  "This notice explains what data this website collects. I have not added analytics, advertising or tracking scripts, and the website does not ask for health information.";

export const Route = createFileRoute("/privacy")({
  head: () => pageHead({ path: "/privacy", title: "Privacy notice", description: DESCRIPTION }),
  component: Privacy,
});

function Privacy() {
  return (
    <Main className="max-w-2xl">
      <PageHeader eyebrow="Privacy" title="Privacy notice" lede={DESCRIPTION} />
      <p className="font-sans text-caption text-fg-muted mb-8">
        Last updated · <time dateTime="2026-11-07">7 November 2026</time>
      </p>
      <div className="prose notice-body">
        <section>
          <h2>1. Summary</h2>
          <p>This is a personal website where I publish independent research. I built it to collect as little data as possible.</p>
          <ul>
            <li><strong>No health data:</strong> I do not ask for, collect or process medical histories, symptom diaries or health records.</li>
            <li><strong>No advertising or tracking:</strong> I have not added advertising pixels, analytics scripts or tracking cookies.</li>
            <li><strong>No accounts:</strong> You do not need an account to read anything on this website.</li>
            <li><strong>No external fonts:</strong> The fonts load from this website, not from a third-party font service.</li>
          </ul>
        </section>
        <section>
          <h2>2. Server logs</h2>
          <p>When you visit this website, my hosting provider, Cloudflare, automatically records standard request data, such as your IP address, your browser type and the page you asked for. The provider uses this data to run the website and keep it secure.</p>
        </section>
        <section>
          <h2>3. Theme setting</h2>
          <p>This website uses your browser's <code>localStorage</code> only to remember whether you chose the light or dark theme. This setting stays on your device. The website does not send it to a server.</p>
        </section>
        <section>
          <h2>4. When you contact me</h2>
          <p>This website has no contact forms, so it does not store messages. If you message me on LinkedIn, you choose what you share. I use your message only to reply to you. LinkedIn processes messages under its own privacy policy.</p>
          <p className="not-prose font-sans text-caption text-fg-muted italic">Please do not send medical records or personal medical histories.</p>
        </section>
        <section>
          <h2>5. Why I can use your data</h2>
          <p>When you contact me, I process your name, your contact details and your message so that I can reply. The lawful basis is my legitimate interest in answering messages about my work.</p>
        </section>
        <section>
          <h2>6. How long I keep messages</h2>
          <p>I keep messages for as long as they are relevant to our conversation.</p>
        </section>
        <section>
          <h2>7. Your rights</h2>
          <p>Under UK data protection law, you can ask for a copy of the personal data I hold about you. You can also ask me to correct or delete it, or object to how I use it. If you are not satisfied with my answer, you can complain to the Information Commissioner's Office (ICO) at <a href="https://ico.org.uk/" target="_blank" rel="noopener noreferrer">ico.org.uk</a>.</p>
        </section>
        <section>
          <h2>8. Privacy questions</h2>
          <p>If you have a question about this notice, <Link to="/contact">contact me</Link>. You can also send me a message on <a href={SITE.author.linkedIn} target="_blank" rel="noopener noreferrer">LinkedIn</a>.</p>
          <p className="not-prose font-sans text-sm text-fg-muted">
            {SITE.author.name}
            {isConfirmed(SITE.author.email) && (
              <> · <a href={`mailto:${SITE.author.email}`} className="text-link underline underline-offset-2">{SITE.author.email}</a></>
            )}
          </p>
        </section>
      </div>
    </Main>
  );
}
