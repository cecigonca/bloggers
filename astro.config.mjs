// Configuração geral do site.
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel';

export default defineConfig({
  integrations: [react(), markdoc(), keystatic()],
  // Libera o serviço de fotos da Vercel, que entrega cada foto diminuída (ver src/lib/fotos.ts).
  adapter: vercel({ imagesConfig: { sizes: [480, 828, 1200, 1920], formats: ['image/avif', 'image/webp'] } }),
});
