import { getCollection } from 'astro:content';
import { SITE } from '@/config/site';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const publishedArticles = await getCollection('journal', ({ data }) => !data.draft);
  const seriesEntries = await getCollection('series', ({ data }) => data.isPublic);
  const projectEntries = await getCollection('projects', ({ data }) => !data.draft);

  const staticPages = [
    '',
    'about',
    'journal',
    'series',
    'projects',
    'interests',
    'contact',
    'privacy',
    'evidence-checks',
  ];

  const urls: string[] = [
    ...staticPages.map((page) => `${SITE.url}/${page ? page + '/' : ''}`),
    ...publishedArticles.map((a) => `${SITE.url}/journal/${a.slug}/`),
    ...seriesEntries.map((s) => `${SITE.url}/series/${s.slug}/`),
    ...projectEntries.map((p) => `${SITE.url}/projects/${p.slug}/`),
  ];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>${url === SITE.url + '/' ? '1.0' : '0.8'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemapXml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
