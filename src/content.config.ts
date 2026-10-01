// Diz ao site como ler os posts que o formulário salva em src/content/posts.
// Precisa bater com os campos de keystatic.config.ts.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const nota = z.coerce.number().min(1).max(5);

// "De quem é a opinião?": o formulário salva { discriminant, value }.
const opiniao = z.union([
  z.object({
    discriminant: z.enum(['cecilia', 'amiga', 'chatinhas']),
    value: z.object({ nota }),
  }),
  z.object({
    discriminant: z.literal('divididas'),
    value: z.object({
      notaCecilia: nota,
      opiniaoCecilia: z.string().default(''),
      notaAmiga: nota,
      opiniaoAmiga: z.string().default(''),
    }),
  }),
]);

const posts = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/content/posts' }),
  schema: z.object({
    titulo: z.string(),
    categoria: z.string(),
    tambemEm: z.array(z.string()).default([]),
    opiniao,
    spoiler: z.boolean().default(false),
    resumo: z.string().optional(),
    capa: z.string().nullable().optional(),
    positivo: z.array(z.string()).default([]),
    negativo: z.array(z.string()).default([]),
    // Campos de dentro de listas podem vir em branco do formulário: nunca podem quebrar o site.
    ficha: z.array(z.object({ rotulo: z.string().default(''), valor: z.string().default('') })).default([]),
    galeria: z.array(z.object({ foto: z.string().nullable().optional(), legenda: z.string().default('') })).default([]),
    resumindo: z.string().optional(),
    tags: z.array(z.string()).default([]),
    data: z.coerce.date(),
    esconderData: z.boolean().default(false),
    esconderAutoria: z.boolean().default(false),
  }),
});

export const collections = { posts };
