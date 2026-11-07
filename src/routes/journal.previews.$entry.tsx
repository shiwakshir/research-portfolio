import { createFileRoute, notFound } from "@tanstack/react-router";
import { NotebookEntry } from "@/components/site/NotebookEntry";
import { pageHead } from "@/config/site";
import { getEntryPreview } from "@/lib/entry-previews";

export const Route = createFileRoute("/journal/previews/$entry")({
  loader: ({ params }) => {
    const entry = getEntryPreview(params.entry);
    if (!entry) throw notFound();
    return entry;
  },
  head: ({ loaderData }) => {
    const head = pageHead({
      path: loaderData ? `/journal/previews/${loaderData.slug}` : "/journal",
      title: loaderData ? `${loaderData.title} · Entry preview` : "Entry preview unavailable",
      description: loaderData
        ? "An entry in preparation for the desk research stage. How research defines pain flares, and what pain apps may miss. No findings are published yet."
        : "A research entry preview is unavailable.",
    });
    return { ...head, meta: [...head.meta, { name: "robots", content: "noindex, follow" }] };
  },
  component: EntryPreviewPage,
});

function EntryPreviewPage() {
  return <NotebookEntry entry={Route.useLoaderData()} />;
}