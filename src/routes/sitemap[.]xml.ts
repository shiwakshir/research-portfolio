import { createFileRoute } from "@tanstack/react-router";
import { SITE } from "@/config/site";
import { getArticles, getProjects, getPublicSeries } from "@/lib/content";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const pages = ["", "about", "journal", "series", "projects", "interests", "contact", "privacy", "evidence-checks"];
        const urls = [
          ...pages.map((p) => `${SITE.url}/${p ? p + "/" : ""}`),
          ...getArticles().map((a) => `${SITE.url}/journal/${a.slug}/`),
          ...getPublicSeries().map((s) => `${SITE.url}/series/${s.slug}/`),
          ...getProjects().map((p) => `${SITE.url}/projects/${p.slug}/`),
        ];
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc><changefreq>weekly</changefreq><priority>${u === SITE.url + "/" ? "1.0" : "0.8"}</priority></url>`).join("\n")}
</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" } });
      },
    },
  },
});
