// Aqui ficam os formulários do admin (/keystatic).
// As opções de categoria, nota e autora vêm de src/lib/rotulos.ts.
// Se mudar algum campo de post aqui, lembre de mudar também em src/content.config.ts.
import { createElement as h } from 'react';
import { config, fields, collection, singleton } from '@keystatic/core';
import { categorias, notas, autoras } from './src/lib/rotulos';

// O balãozinho do logo do blog, no canto do admin.
function Logo({ colorScheme }: { colorScheme: 'light' | 'dark' }) {
  const balao = colorScheme === 'dark' ? '#c7d0dd' : '#14213d';
  const pontos = colorScheme === 'dark' ? '#14213d' : '#ffffff';
  return h(
    'svg',
    { viewBox: '0 0 32 32', width: 26, height: 26, 'aria-hidden': true },
    h('path', { d: 'M6 5h20a4 4 0 0 1 4 4v11a4 4 0 0 1-4 4H13l-6 5v-5H6a4 4 0 0 1-4-4V9a4 4 0 0 1 4-4z', fill: balao }),
    h('circle', { cx: 10.5, cy: 14.5, r: 1.8, fill: pontos }),
    h('circle', { cx: 16, cy: 14.5, r: 1.8, fill: pontos }),
    h('circle', { cx: 21.5, cy: 14.5, r: 1.8, fill: pontos })
  );
}

export default config({
  // 'local' = salva os posts como arquivos no seu computador.
  // Quando o site for pro ar, trocamos para 'github'.
  storage: { kind: 'local' },

  // Botões e menus do admin em português.
  locale: 'pt-BR',

  ui: {
    brand: { name: 'chatinhas', mark: Logo },
    navigation: {
      Blog: ['posts'],
      Páginas: ['sobre'],
    },
  },

  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'titulo',
      path: 'src/content/posts/*',
      entryLayout: 'content',
      format: { contentField: 'conteudo' },
      // Colunas da lista de posts.
      columns: ['titulo', 'categoria', 'nota', 'data'],
      // Botão "ver" no formulário, que abre o post no site.
      previewUrl: '/posts/{slug}',
      schema: {
        titulo: fields.slug({
          name: {
            label: 'Título',
            description: 'Capricha, é a primeira coisa que a galera vê.',
            validation: { isRequired: true },
          },
          slug: {
            label: 'Endereço do post',
            description: 'É o final do link do post. Se preenche sozinho, não precisa mexer.',
          },
        }),
        categoria: fields.select({
          label: 'Categoria principal',
          description: 'A aba principal do post. É o nome que aparece na capa do card.',
          options: categorias,
          defaultValue: 'aleatorio',
        }),
        tambemEm: fields.multiselect({
          label: 'Também aparece em',
          description: 'Opcional. Marque outras abas onde o post deve aparecer (ex.: Trending).',
          options: categorias,
        }),
        nota: fields.select({
          label: 'Veredito',
          description: 'O que vocês acharam, no fim das contas?',
          options: notas.map((n) => ({ value: n.value, label: `${n.value}★ · ${n.label} (${n.descricao})` })),
          defaultValue: '3',
        }),
        resumo: fields.text({
          label: 'A fofoca em uma frase',
          description: 'Aparece no card do feed. Uma ou duas frases, curtinho.',
          multiline: true,
        }),
        capa: fields.image({
          label: 'Foto de capa',
          description: 'Opcional. Sem foto, o card ganha um fundo colorido com o nome da categoria.',
          directory: 'public/images/posts',
          publicPath: '/images/posts/',
        }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          description: 'Palavrinhas soltas sobre o post, tipo "barato" ou "date".',
          itemLabel: (props) => props.value,
        }),
        autora: fields.select({
          label: 'Quem escreveu',
          options: autoras,
          defaultValue: 'cecilia',
        }),
        data: fields.date({
          label: 'Data',
          description: 'Já vem com a data de hoje.',
          defaultValue: { kind: 'today' },
          validation: { isRequired: true },
        }),
        conteudo: fields.markdoc({
          label: 'Texto',
          options: {
            image: {
              directory: 'public/images/posts',
              publicPath: '/images/posts/',
            },
          },
        }),
      },
    }),
  },

  singletons: {
    sobre: singleton({
      label: 'Sobre nós',
      path: 'src/data/sobre',
      previewUrl: '/sobre',
      schema: {
        chamada: fields.text({
          label: 'Frase de destaque',
          description: 'A frase grandona do topo da página.',
        }),
        texto: fields.text({
          label: 'Texto de apresentação',
          description: 'Pule uma linha para começar um parágrafo novo.',
          multiline: true,
        }),
        pessoas: fields.array(
          fields.object({
            nome: fields.text({ label: 'Nome' }),
            bio: fields.text({ label: 'Bio', multiline: true }),
            foto: fields.image({
              label: 'Foto',
              directory: 'public/images/sobre',
              publicPath: '/images/sobre/',
            }),
          }),
          {
            label: 'Quem somos',
            itemLabel: (props) => props.fields.nome.value || 'Pessoa nova',
          }
        ),
      },
    }),
  },
});
