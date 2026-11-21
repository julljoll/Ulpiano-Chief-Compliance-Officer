/**
 * ULPIANO CCO — Astro 7 Content Layer Configuration (Zod Build-Time Validation)
 * Replaces client-side registry.ts, diagrams-registry.ts, and lazy Markdown chunks completely.
 */
import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

const semanticVariantSchema = z.enum(['primary', 'success', 'warning', 'error', 'forensic']);

const normativa = defineCollection({
  loader: glob({ pattern: '*.md', base: './docs' }),
  schema: z.looseObject({}),
});

const versiones = defineCollection({
  loader: file('./registry.json'),
  schema: z.object({
    id: z.string(),
    kind: z.enum(['normative', 'catalog']).default('normative'),
    label: z.string(),
    shortLabel: z.string(),
    sourceFile: z.string(),
    type: z.string(),
    hierarchy: z.string(),
    hierarchySub: z.string(),
    articlesCount: z.number(),
    titlesCount: z.string(),
    coverage: z.string(),
    coverageSub: z.string(),
    badge: z.string(),
    badgeText: z.string(),
    date: z.string(),
    changes: z.number(),
    changesLabel: z.string(),
    changesTag: z.string(),
    description: z.string(),
    highlights: z.array(z.string()),
    coreReforms: z.array(
      z.object({
        tag: z.string(),
        variant: semanticVariantSchema.optional(),
        articles: z.string(),
        title: z.string(),
        desc: z.string(),
        before: z.string(),
        after: z.string(),
        benefit: z.string(),
      })
    ),
    reformsDistribution: z.object({
      labels: z.array(z.string()),
      data: z.array(z.number()),
    }),
  }),
});

const diagramas = defineCollection({
  loader: file('./src/data/diagrams.json'),
  schema: z.object({
    id: z.string(),
    category: z.enum(['gobernanza', 'normativa', 'arquitectura']),
    name: z.string(),
    shortName: z.string(),
    badge: z.string(),
    sub: z.string(),
    file: z.string(),
    breakdown: z.array(
      z.object({
        title: z.string(),
        badge: z.string(),
        variant: semanticVariantSchema,
        desc: z.string(),
      })
    ),
  }),
});

const reformas = defineCollection({
  loader: file('./src/data/reforms.json'),
  schema: z.object({
    id: z.string(),
    article: z.string(),
    type: z.string(),
    variant: semanticVariantSchema,
    summary: z.string(),
    impact: z.string(),
    before: z.string(),
    beforeTag: z.string(),
    after: z.string(),
    afterTag: z.string(),
    targetDoc: z.string(),
    targetAnchor: z.string(),
  }),
});

export const collections = {
  normativa,
  versiones,
  diagramas,
  reformas,
};
