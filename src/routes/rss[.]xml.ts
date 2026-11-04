import { createFileRoute } from "@tanstack/react-router";
import { SITE } from "@/config/site";
import { getArticles, pad } from "@/lib/content";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export const Route = createFileRoute("/rss.xml")({
  server: {
    handlers: {
      GET: async () => {
        const items = getArticles()
          .map((a) => {
            const link = `${SITE.url}/journal/${a.slug}/`;
            const cats = [a.data.category, ...a.data.tags].map((c) => `<category>${esc(c)}</category>`).join("");
            return `<item><title>${esc(`No. ${pad(a.data.articleNumber)}: ${a.data.title}`)}</title><link>${link}</link><guid isPermaLink="true">${link}</guid><description>${esc(a.data.abstract)}</description><pubDate>${a.data.publishDate.toUTCString()}</pubDate>${cats}</item>`;
          })
          .join("");
        const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${esc(SITE.title)}</title><description>${esc(SITE.description)}</description><link>${SITE.url}/</link><language>en-gb</language>${items}</channel></rss>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
      },
    },
  },
});
