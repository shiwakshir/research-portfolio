import { createFileRoute } from "@tanstack/react-router";
import { getSearchIndex } from "@/lib/search";

export const Route = createFileRoute("/search.json")({
  server: {
    handlers: {
      GET: async () => {
        const index = getSearchIndex().map((item) => ({
          id: item.id,
          title: item.title,
          type: item.type,
          summary: item.summary,
          url: item.url,
        }));
        return Response.json(index, { headers: { "Cache-Control": "public, max-age=3600" } });
      },
    },
  },
});
