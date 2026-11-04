import { createFileRoute } from "@tanstack/react-router";
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
    <Main>
      <header className="space-y-4 mb-8">
        <p className="font-sans text-xs text-fg-muted uppercase tracking-wider">Privacy</p>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-fg leading-[1.15] tracking-tight">Privacy notice</h1>
        <p className="text-base sm:text-lg text-fg-body max-w-3xl leading-relaxed">{DESCRIPTION}</p>
      </header>
      <hr className="border-t border-rule-strong my-8" />
      <div className="space-y-8 font-sans text-sm sm:text-base leading-relaxed text-fg-body max-w-[38rem]">
        <div className="py-2 border-b border-rule text-xs text-fg-muted"><strong>Last updated:</strong> 4 November 2026</div>
        <section className="space-y-3">
          <h2 className="font-serif text-xl font-normal text-fg">1. Summary</h2>
          <p>This is a personal website where I publish independent research. I built it to collect as little data as possible.</p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li><strong>No health data:</strong> I do not ask for, collect or process medical histories, symptom diaries or health records.</li>
            <li><strong>No advertising or tracking:</strong> I have not added advertising pixels, analytics scripts or tracking cookies.</li>
            <li><strong>No accounts:</strong> You do not need an account to read anything on this website.</li>
            <li><strong>No external fonts:</strong> The fonts load from this website, not from a third-party font service.</li>
          </ul>
        </section>
        <section className="space-y-3">
          <h2 className="font-serif text-xl font-normal text-fg">2. Server logs</h2>
          <p>When you visit this website, my hosting provider automatically records standard request data, such as your IP address, your browser type and the page you asked for. The provider uses this data to run the website and keep it secure.</p>
        </section>
        <section className="space-y-3">
          <h2 className="font-serif text-xl font-normal text-fg">3. Theme setting</h2>
          <p>This website uses your browser's <code>localStorage</code> only to remember whether you chose the light or dark theme. This setting stays on your device. The website does not send it to a server.</p>
        </section>
        <section className="space-y-3">
          <h2 className="font-serif text-xl font-normal text-fg">4. When you contact me</h2>
          <p>This website has no contact forms, so it does not store messages. If you email me or message me on LinkedIn, you choose what you share. I use your message only to reply to you. LinkedIn processes messages under its own privacy policy.</p>
          <p className="text-xs text-fg-muted italic">Please do not send medical records or personal medical histories.</p>
        </section>
        <section className="space-y-3">
          <h2 className="font-serif text-xl font-normal text-fg">5. Why I can use your data</h2>
          <p>When you contact me, I process your name, your contact details and your message so that I can reply. The lawful basis is my legitimate interest in answering messages about my work.</p>
        </section>
        <section className="space-y-3">
          <h2 className="font-serif text-xl font-normal text-fg">6. How long I keep messages</h2>
          <p>I keep messages for as long as they are relevant to our conversation.</p>
        </section>
        <section className="space-y-3">
          <h2 className="font-serif text-xl font-normal text-fg">7. Your rights</h2>
          <p>Under UK data protection law, you can ask for a copy of the personal data I hold about you. You can also ask me to correct or delete it, or object to how I use it. If you are not satisfied with my answer, you can complain to the Information Commissioner's Office (ICO) at ico.org.uk.</p>
        </section>
        <section className="space-y-3">
          <h2 className="font-serif text-xl font-normal text-fg">8. Privacy questions</h2>
          <p>If you have a question about this notice, contact me. You can also send me a message on LinkedIn.</p>
          <p className="font-sans text-sm">
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
