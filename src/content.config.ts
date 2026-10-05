import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string().max(70),
    description: z.string().max(160),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Equipo Tanques de Agua'),
    image: z.string().optional(),
    /** Servicio relacionado (slug) para enlazado interno */
    service: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
