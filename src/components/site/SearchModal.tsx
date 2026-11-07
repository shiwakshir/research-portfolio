import { Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { getArticles, pad } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastActive = useRef<Element | null>(null);

  useEffect(() => {
    if (open) {
      lastActive.current = document.activeElement;
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQ("");
      (lastActive.current as HTMLElement | null)?.focus?.();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && dialogRef.current) {
        const items = [...dialogRef.current.querySelectorAll<HTMLElement>("input,button,a[href]")].filter((el) => el.offsetParent);
        const first = items[0], last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const query = q.trim().toLowerCase();
  const articles = useMemo(() => getArticles(), []);
  const matches = query
    ? articles.filter(
        (a) =>
          a.data.title.toLowerCase().includes(query) ||
          a.data.abstract.toLowerCase().includes(query) ||
          a.data.category.toLowerCase().includes(query) ||
          a.data.tags.some((t) => t.toLowerCase().includes(query)),
      )
    : [];

  if (!open) return null;
  return (
    <div
      ref={dialogRef}
      className="fixed inset-0 z-50 bg-fg/40 flex items-start justify-center pt-16 sm:pt-20 px-3 sm:px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-title"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-xl max-h-[calc(100dvh-5rem)] bg-paper border border-rule rounded-sm overflow-hidden">
        <h2 id="search-title" className="sr-only">Search the journal</h2>
        <div className="border-b border-rule p-3 sm:p-4 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 sm:gap-3">
          <svg className="w-4 h-4 text-fg-muted shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Search the journal"
            placeholder="Search articles and methods"
            className="min-w-0 w-full bg-transparent font-sans text-base text-fg placeholder:text-fg-muted focus:outline-none"
            autoComplete="off"
          />
          <Button type="button" variant="ghost" size="icon" onClick={onClose} aria-label="Close search" title="Close search" className="size-11 shrink-0 text-fg-muted hover:text-fg"><X aria-hidden="true" /></Button>
        </div>
        <div aria-live="polite" className="max-h-96 overflow-y-auto p-4 space-y-2 text-sm">
          {!query ? (
            <p className="font-sans text-xs text-fg-muted text-center py-6">
              Type to search across published research articles and literature reviews.
            </p>
          ) : matches.length === 0 ? (
            <p className="font-sans text-xs text-fg-muted py-4 text-center">No articles found matching "{q.trim()}".</p>
          ) : (
            <div className="space-y-2">
              {matches.map((a) => (
                <Link
                  key={a.slug}
                  to="/journal/$slug"
                  params={{ slug: a.slug }}
                  onClick={onClose}
                  className="block p-3 border border-rule hover:border-rule-strong transition-colors"
                >
                  <div className="font-sans text-xs text-fg-muted mb-1">
                    No. {pad(a.data.articleNumber)} · {a.data.category} · {a.data.readingTime}
                  </div>
                  <h4 className="font-serif text-base text-fg font-normal leading-snug">{a.data.title}</h4>
                  <p className="font-sans text-xs text-fg-body line-clamp-1 mt-1">{a.data.abstract}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
