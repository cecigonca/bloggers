// Fotos mais leves. Foto de celular chega a 2–3 MB; no site no ar, a Vercel entrega cada foto
// já diminuída para o tamanho da tela de quem está vendo (e em formato mais leve, tipo WebP).
// Fora da Vercel (npm run dev, build no computador), usa a foto original.
// As larguras precisam bater com `imagesConfig.sizes` em astro.config.mjs.
export const larguras = [480, 828, 1200, 1920];

const naVercel = import.meta.env.PROD && process.env.VERCEL === '1';

function urlVercel(src: string, largura: number) {
  return `/_vercel/image?url=${encodeURIComponent(src)}&w=${largura}&q=75`;
}

// Atributos de <img>. `tamanhos` diz ao navegador a largura que a foto ocupa na tela,
// pra ele baixar só a versão que precisa. Ex.: '(max-width: 600px) 100vw, 880px'.
export function foto(src: string, tamanhos: string) {
  if (!naVercel || !src.startsWith('/')) return { src };
  return {
    src: urlVercel(src, 1200),
    srcset: larguras.map((l) => `${urlVercel(src, l)} ${l}w`).join(', '),
    sizes: tamanhos,
  };
}
