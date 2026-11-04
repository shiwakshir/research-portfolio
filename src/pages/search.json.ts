import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  // Only index published articles (exclude drafts)
  const articles = await getCollection('journal', ({ data }) => !data.draft);

  const searchIndex = articles.map((article) => ({
    title: article.data.title,
    subtitle: article.data.subtitle || '',
    abstract: article.data.abstract,
    category: article.data.category,
    tags: article.data.tags,
    readingTime: article.data.readingTime,
    slug: article.slug,
  }));

  return new Response(JSON.stringify(searchIndex), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
