import { Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { getSearchIndex, searchSite } from "@/lib/search";
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
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      }
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

  const searchIndex = useMemo(() => getSearchIndex(), [open]);
  const matches = useMemo(() => searchSite(q, searchIndex), [q, searchIndex]);
  const query = q.trim();

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
      <div className="w-full max-w-xl max-h-[calc(100dvh-5rem)] bg-paper border border-rule rounded-sm overflow-hidden flex flex-col">
        <h2 id="search-title" className="sr-only">Search the site</h2>
        <div className="border-b border-rule p-3 sm:p-4 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 sm:gap-3 shrink-0">
          <svg className="w-4 h-4 text-fg-muted shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                e.preventDefault();
                e.stopPropagation();
                onClose();
              }
            }}
            aria-label="Search"
            placeholder="Search the journal, projects and research themes"
            className="min-w-0 w-full bg-transparent font-sans text-base text-fg placeholder:text-fg-muted focus:outline-none"
            autoComplete="off"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close search"
            title="Close search"
            className="size-11 shrink-0 text-fg-muted hover:text-fg"
          >
            <X aria-hidden="true" />
          </Button>
        </div>
        <div aria-live="polite" className="overflow-y-auto p-4 space-y-2 text-sm">
          {!query ? (
            <p className="font-sans text-xs text-fg-muted text-center py-6">
              Type to search the journal, projects and research themes.
            </p>
          ) : matches.length === 0 ? (
            <p className="font-sans text-xs text-fg-muted py-4 text-center">
              No results for "{query}".
            </p>
          ) : (
            <div className="space-y-2">
              {matches.map((item) => (
                <Link
                  key={item.id}
                  to={item.url}
                  onClick={onClose}
                  className="block p-3 border border-rule hover:border-rule-strong hover:bg-paper-sunken/30 transition-colors"
                >
                  <div className="font-sans text-xs text-fg-muted mb-1 flex items-center justify-between gap-2">
                    <span className="font-medium text-link">{item.type}</span>
                  </div>
                  <h4 className="font-serif text-base text-fg font-normal leading-snug">{item.title}</h4>
                  {item.summary && <p className="font-sans text-xs text-fg-secondary line-clamp-2 mt-1">{item.summary}</p>}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
