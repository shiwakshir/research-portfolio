import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '@/config/site';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  // Only include published articles in RSS feed
  const publishedArticles = await getCollection('journal', ({ data }) => !data.draft);

  const sortedArticles = publishedArticles.sort(
    (a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime()
  );

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site?.toString() || SITE.url,
    items: sortedArticles.map((article) => ({
      title: `No. ${String(article.data.articleNumber || 1).padStart(2, '0')}: ${article.data.title}`,
      description: article.data.abstract,
      pubDate: article.data.publishDate,
      link: `/journal/${article.slug}/`,
      categories: [article.data.category, ...(article.data.tags || [])],
    })),
    customData: `<language>en-gb</language>`,
  });
}
