import { defineCollection, z } from 'astro:content';

const journalCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    publishDate: z.date(),
    updatedDate: z.date().optional(),
    author: z.string().default("Shiwakshi Rashmi"),
    readingTime: z.string().default("8 min read"),
    category: z.string(),
    tags: z.array(z.string()).max(2).default([]),
    abstract: z.string(),
    draft: z.boolean().default(false),
    articleNumber: z.number().default(1),
    dropCap: z.boolean().default(true),
    isHealthRelated: z.boolean().default(false),
    researchStatus: z.enum([
      'Literature exploration',
      'Research in progress',
      'Critical review'
    ]).default('Literature exploration'),
    series: z.object({
      id: z.string(),
      title: z.string(),
      order: z.number(),
    }).optional(),
    researchQuestion: z.string().optional(),
    whyItMatters: z.string().optional(),
    methodsNote: z.string().optional(),
    methodsSummary: z.string().optional(),
    limitationsNote: z.string().optional(),
    limitations: z.string().optional(),
    doi: z.string().optional(),
    originalSourceUrl: z.string().url().optional(),
    references: z.array(z.object({
      number: z.number(),
      citation: z.string(),
      shortCitation: z.string().optional(),
      url: z.string().url().optional(),
      doi: z.string().optional(),
    })).default([]),
  }),
});

const seriesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    order: z.number().default(1),
    status: z.enum(['Active', 'Planned / In Development', 'Completed']).default('Planned / In Development'),
    description: z.string(),
    featured: z.boolean().default(false),
    isPublic: z.boolean().default(false), // Only published when author approves!
    proposedArticles: z.array(z.object({
      order: z.number(),
      title: z.string(),
      status: z.enum(['Published', 'In Progress', 'Planned']),
      slug: z.string().optional(),
      summary: z.string().optional(),
    })).default([]),
  }),
});

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    role: z.string(),
    sector: z.string(),
    methods: z.array(z.string()),
    order: z.number().default(1),
    isLead: z.boolean().default(false),
    award: z.string().optional(),
    techStack: z.array(z.string()).optional(),
    githubUrl: z.string().optional(),
    featured: z.boolean().default(true),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  journal: journalCollection,
  series: seriesCollection,
  projects: projectsCollection,
};
