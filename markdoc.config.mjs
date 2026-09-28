// Como o texto dos posts (Markdoc) vira HTML. Aqui só trocamos a imagem por uma versão com legenda.
import { defineMarkdocConfig, nodes, component } from '@astrojs/markdoc/config';

export default defineMarkdocConfig({
  nodes: {
    image: {
      ...nodes.image,
      render: component('./src/components/FotoNoTexto.astro'),
    },
  },
});
