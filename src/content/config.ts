import { defineCollection, z } from 'astro:content';

const journalCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    publishDate: z.date(),
    updatedDate: z.date().optional(),
    author: z.string().default("[Your Name]"),
    readingTime: z.string().default("8 min read"),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    abstract: z.string(),
    draft: z.boolean().default(false),
    researchStatus: z.enum([
      'Literature Exploration',
      'Research in Progress',
      'Critical Review',
      'Field Note',
      'Methodological Inquiry',
      'Editorial Note'
    ]).default('Literature Exploration'),
    series: z.object({
      id: z.string(),
      title: z.string(),
      order: z.number(),
    }).optional(),
    researchQuestion: z.string().optional(),
    whyItMatters: z.string().optional(),
    methodsNote: z.string().optional(),
    limitationsNote: z.string().optional(),
    doi: z.string().optional(),
    originalSourceUrl: z.string().url().optional(),
    references: z.array(z.object({
      number: z.number(),
      citation: z.string(),
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
    role: z.string().default("Research Lead / Insights Specialist"),
    problem: z.string(),
    approach: z.string(),
    methods: z.array(z.string()),
    timeline: z.string().optional(),
    status: z.enum(['Ongoing', 'Completed', 'Framework Exploration']).default('Completed'),
    evidenceFindings: z.string().optional(),
    reflectionsLimitations: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  journal: journalCollection,
  series: seriesCollection,
  projects: projectsCollection,
};
