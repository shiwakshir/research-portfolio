import { createFileRoute } from "@tanstack/react-router";
import { getArticles } from "@/lib/content";

export const Route = createFileRoute("/search.json")({
  server: {
    handlers: {
      GET: async () => {
        const index = getArticles().map((a) => ({
          title: a.data.title,
          subtitle: a.data.subtitle ?? "",
          abstract: a.data.abstract,
          category: a.data.category,
          tags: a.data.tags,
          readingTime: a.data.readingTime,
          articleNumber: a.data.articleNumber,
          slug: a.slug,
        }));
        return Response.json(index, { headers: { "Cache-Control": "public, max-age=3600" } });
      },
    },
  },
});
