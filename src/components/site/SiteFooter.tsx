import { Link } from "@tanstack/react-router";
import { SITE } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-rule bg-paper mt-20 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2 space-y-2">
            <span className="font-serif text-base font-normal text-fg block">{SITE.author.name}</span>
            <p className="font-sans text-xs text-fg-muted">
              {SITE.author.fullTitle} · {SITE.author.location}
            </p>
            <p className="font-sans text-xs text-fg-muted max-w-md leading-relaxed pt-1">{SITE.author.experienceSummary}</p>
          </div>
          <div className="space-y-2 font-sans text-xs">
            <h2 className="font-semibold uppercase tracking-wider text-fg mb-2">Publication</h2>
            <ul className="text-fg-muted [&_a]:inline-block [&_a]:py-1">
              <li><Link to="/journal" className="hover:text-fg transition-colors">Journal</Link></li>
              <li><Link to="/projects" className="hover:text-fg transition-colors">Projects</Link></li>
              <li><Link to="/interests" className="hover:text-fg transition-colors">Research themes</Link></li>
            </ul>
          </div>
          <div className="space-y-2 font-sans text-xs">
            <h2 className="font-semibold uppercase tracking-wider text-fg mb-2">Methodology & Contact</h2>
            <ul className="text-fg-muted [&_a]:inline-block [&_a]:py-1">
              <li><Link to="/evidence-checks" className="text-link underline underline-offset-2">How I check evidence →</Link></li>
              <li><Link to="/about" className="hover:text-fg transition-colors">About</Link></li>
              <li><Link to="/contact" className="hover:text-fg transition-colors">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-fg transition-colors">Privacy notice</Link></li>
              <li><a href="/rss.xml" className="hover:text-fg transition-colors">RSS feed</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-6 border-t border-rule flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-xs text-fg-muted">
          <p>© {new Date().getFullYear()} {SITE.author.name}. Independent work, not affiliated with my employer.</p>
          <a href="#" className="hover:text-fg">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
