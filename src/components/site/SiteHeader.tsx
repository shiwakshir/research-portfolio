import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SITE } from "@/config/site";

function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => setDark(document.documentElement.classList.contains("dark")), []);
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
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className="min-h-8 min-w-8 p-2 text-fg-muted hover:text-fg transition-colors flex items-center justify-center rounded-sm"
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
    </button>
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
        <div className="flex items-center justify-between h-14 gap-4">
          <Link to="/" className="group flex items-center gap-2.5 font-serif text-lg text-fg hover:text-link transition-colors font-normal tracking-tight">
            <span aria-hidden="true" className="grid place-items-center size-8 rounded-full border border-rule-strong font-serif italic text-[0.8rem] group-hover:border-link transition-colors">{SITE.author.monogram}</span>
            {SITE.author.name}
          </Link>
          <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
            {SITE.navLinks.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                className={`text-sm font-sans transition-colors pb-0.5 ${
                  isActive(l.href) ? "text-fg font-medium border-b border-rule-strong" : "text-fg-muted hover:text-fg"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onSearch}
              aria-label="Search articles"
              className="min-h-8 min-w-8 p-1.5 text-xs font-sans text-fg-muted hover:text-fg transition-colors flex items-center justify-center gap-1.5 rounded-sm"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="hidden sm:inline">Search</span>
            </button>
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={open}
              aria-controls="mobile-nav"
              className="md:hidden min-h-8 min-w-8 p-1.5 text-fg-muted hover:text-fg transition-colors flex items-center justify-center rounded-sm"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
        {open && (
          <nav id="mobile-nav" className="md:hidden border-t border-rule py-3 space-y-2" aria-label="Mobile navigation">
            {SITE.navLinks.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                className={`block py-1 text-sm font-sans transition-colors ${
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
