import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SITE } from "@/config/site";
import { Button } from "@/components/ui/button";

function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const update = () => setDark(document.documentElement.classList.contains("dark"));
    update();
    const obs = new MutationObserver(update);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);
  const toggle = () => {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
    document.getElementById("theme-color-meta")?.setAttribute("content", next ? "#151412" : "#FAF7F0");
    setDark(next);
  };
  return (
    <Button
      variant="ghost"
      size="icon"
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      title={dark ? "Switch to light theme" : "Switch to dark theme"}
      className="size-11 shrink-0 text-fg-muted hover:text-fg rounded-sm"
    >
      {dark ? (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
        </svg>
      )}
    </Button>
  );
}

export function SiteHeader({ onSearch }: { onSearch: () => void }) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);
  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="border-b border-rule bg-paper/85 backdrop-blur-md sticky top-0 z-40 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center min-h-16 gap-2 lg:gap-5">
          <Link to="/" aria-label={`${SITE.author.name} home`} className="group flex min-w-0 items-center gap-2.5 font-serif text-base sm:text-lg text-fg hover:text-link transition-colors font-normal">
            <span aria-hidden="true" className="grid place-items-center size-8 shrink-0 rounded-full border border-rule-strong font-serif italic text-[0.8rem] group-hover:border-link transition-colors">{SITE.author.monogram}</span>
            <span className="min-w-0 truncate max-[359px]:hidden">{SITE.author.name}</span>
          </Link>
          <nav className="hidden lg:flex items-center gap-5" aria-label="Main navigation">
            {SITE.navLinks.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={`text-sm font-sans transition-colors pb-0.5 ${
                  isActive(l.href) ? "text-fg font-medium border-b border-rule-strong" : "text-fg-muted hover:text-fg"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex shrink-0 items-center justify-end gap-0.5">
            <Button
              variant="ghost"
              type="button"
              onClick={onSearch}
              aria-label="Search articles"
              title="Search articles"
              className="h-11 min-w-11 px-2 text-xs font-sans text-fg-muted hover:text-fg gap-1.5 rounded-sm"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="hidden sm:inline">Search</span>
            </Button>
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={open}
              aria-controls="mobile-nav"
              title={open ? "Close navigation menu" : "Open navigation menu"}
              className="lg:hidden size-11 text-fg-muted hover:text-fg rounded-sm"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </Button>
          </div>
        </div>
        {open && (
          <nav id="mobile-nav" className="lg:hidden border-t border-rule py-3 grid grid-cols-2 gap-x-6 gap-y-1" aria-label="Mobile navigation">
            {SITE.navLinks.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={`flex min-h-11 items-center text-sm font-sans transition-colors ${
                  isActive(l.href) ? "text-fg font-medium underline underline-offset-4" : "text-fg-muted hover:text-fg"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
