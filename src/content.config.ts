// Diz ao site como ler os posts que o formulário salva em src/content/posts.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/content/posts' }),
  schema: z.object({
    titulo: z.string(),
    resumo: z.string().optional(),
    capa: z.string().nullable().optional(),
    nota: z.coerce.number().min(1).max(5),
    categoria: z.string(),
    autora: z.string(),
    data: z.coerce.date(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { posts };
