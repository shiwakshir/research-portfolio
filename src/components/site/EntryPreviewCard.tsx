import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pad } from "@/lib/content";
import type { EntryPreview } from "@/lib/entry-previews";

export function EntryPreviewCard({ entry }: { entry: EntryPreview }) {
  return (
    <article className="entry-preview-card">
      <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_auto] gap-3 font-sans text-xs text-fg-muted">
        <span className="min-w-0">{entry.entryType} · Entry {pad(entry.articleNumber)} · {entry.topic}</span>
        <span className="text-link">In preparation</span>
      </div>
      <h3 className="font-serif text-2xl sm:text-3xl font-normal text-fg leading-tight">{entry.title}</h3>
      <p className="font-serif italic text-lg text-fg-secondary">{entry.subtitle}</p>
      <p className="font-sans text-xs text-fg-muted">Entry placeholder · Published studies only · No findings yet</p>
      <Button asChild variant="link" className="justify-self-start h-auto p-0 text-xs font-normal">
        <Link to="/journal/previews/$entry" params={{ entry: entry.slug }}>Open entry preview <ArrowUpRight aria-hidden="true" /></Link>
      </Button>
    </article>
  );
}