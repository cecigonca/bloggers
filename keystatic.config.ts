// Aqui ficam os formulários do admin (/keystatic).
// As opções de categoria, nota e autora vêm de src/lib/rotulos.ts.
// Se mudar algum campo de post aqui, lembre de mudar também em src/content.config.ts.
import { createElement as h } from 'react';
import { config, fields, collection, singleton } from '@keystatic/core';
import { categorias, notas } from './src/lib/rotulos';

// A estrela dourada do logo, no canto do admin (o Keystatic sempre põe o símbolo à esquerda do nome).
function Logo() {
  return h(
    'svg',
    { viewBox: '0 0 24 24', width: 22, height: 22, 'aria-hidden': true },
    h('path', {
      d: 'M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z',
      fill: '#c08b1e',
      stroke: '#c08b1e',
      strokeWidth: 1.6,
      strokeLinejoin: 'round',
    })
  );
}

// Campo de nota (1★ a 5★), usado em mais de um lugar do formulário.
function campoNota(label: string) {
  return fields.select({
    label,
    options: notas.map((n) => ({ value: n.value, label: `${n.value}★ · ${n.label} (${n.descricao})` })),
    defaultValue: '3',
  });
}

export default config({
  // 'local' = salva os posts como arquivos no seu computador.
  // Quando o site for pro ar, trocamos para 'github'.
  storage: { kind: 'local' },

  // Botões e menus do admin em português.
  locale: 'pt-BR',

  ui: {
    brand: { name: 'pitacadas', mark: Logo },
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
      columns: ['titulo', 'categoria', 'data'],
      // Botão "ver" no formulário, que abre o post no site.
      previewUrl: '/posts/{slug}',
      // Ordem do formulário: primeiro o que aparece no card do feed, depois o que só aparece dentro do post.
      // Cada descrição começa com "FEED + POST" ou "SÓ NO POST" pra deixar isso claro.
      schema: {
        // ───────── Aparece no card do feed (e no post) ─────────
        titulo: fields.slug({
          name: {
            label: 'Título',
            description: 'FEED + POST · Capricha, é a primeira coisa que a galera vê.',
            validation: { isRequired: true },
          },
          slug: {
            label: 'Endereço do post',
            description: 'É o final do link do post. Se preenche sozinho, não precisa mexer.',
          },
        }),
        categoria: fields.select({
          label: 'Categoria principal',
          description: 'FEED + POST · A aba principal do post. É o nome que aparece na capa do card.',
          options: categorias,
          defaultValue: 'aleatorio',
        }),
        tambemEm: fields.multiselect({
          label: 'Também aparece em',
          description: 'FEED + POST · Opcional. Outras abas do feed onde o post aparece (ex.: Trending).',
          options: categorias,
        }),
        // De quem é a opinião. Quando "cada uma acha uma coisa", aparecem nota e frase de cada uma.
        opiniao: fields.conditional(
          fields.select({
            label: 'De quem é a opinião?',
            description: 'FEED + POST · Define o "por ..." e a nota do card.',
            options: [
              { label: 'Só da Cecília', value: 'cecilia' },
              { label: 'Só da Katsuki', value: 'amiga' },
              { label: 'Das duas (a gente concorda)', value: 'chatinhas' },
              { label: 'Cada uma acha uma coisa', value: 'divididas' },
            ],
            defaultValue: 'chatinhas',
          }),
          {
            cecilia: fields.object({ nota: campoNota('Veredito') }),
            amiga: fields.object({ nota: campoNota('Veredito') }),
            chatinhas: fields.object({ nota: campoNota('Veredito') }),
            divididas: fields.object({
              notaCecilia: campoNota('Nota da Cecília'),
              opiniaoCecilia: fields.text({
                label: 'O que a Cecília achou',
                description: 'SÓ NO POST · Uma ou duas frases. Aparece no veredito final.',
                multiline: true,
              }),
              notaAmiga: campoNota('Nota da Katsuki'),
              opiniaoAmiga: fields.text({
                label: 'O que a Katsuki achou',
                description: 'SÓ NO POST · Uma ou duas frases. Aparece no veredito final.',
                multiline: true,
              }),
            }),
          }
        ),
        resumo: fields.text({
          label: 'A fofoca em uma frase',
          description: 'FEED + POST · Aparece no card e embaixo do título. Uma ou duas frases, curtinho.',
          multiline: true,
        }),
        capa: fields.image({
          label: 'Foto de capa',
          description: 'FEED + POST · Opcional. Sem foto, o card ganha um fundo colorido com o nome da categoria.',
          directory: 'public/images/posts',
          publicPath: '/images/posts/',
        }),
        data: fields.date({
          label: 'Data',
          description: 'FEED + POST · Já vem com a data de hoje. Mesmo escondida, é ela que define a ordem do feed.',
          defaultValue: { kind: 'today' },
          validation: { isRequired: true },
        }),
        esconderData: fields.checkbox({
          label: 'Esconder a data',
          description: 'FEED + POST · Marcado, a data não aparece no card nem no post.',
          defaultValue: false,
        }),
        esconderAutoria: fields.checkbox({
          label: 'Esconder quem escreveu',
          description: 'FEED + POST · Marcado, o "por ..." não aparece no card nem no post. A nota continua aparecendo.',
          defaultValue: false,
        }),

        // ───────── Só aparece dentro do post ─────────
        spoiler: fields.checkbox({
          label: 'Tem spoiler?',
          description: 'SÓ NO POST · Marcado, o post mostra um aviso antes da foto e dos blocos.',
          defaultValue: false,
        }),
        positivo: fields.array(fields.text({ label: 'Item' }), {
          label: 'Positivo',
          description: 'SÓ NO POST · O que tem de bom. Um item por linha, curtinho.',
          itemLabel: (props) => props.value || 'item novo',
        }),
        negativo: fields.array(fields.text({ label: 'Item' }), {
          label: 'Negativo',
          description: 'SÓ NO POST · O que não rolou. Um item por linha, curtinho.',
          itemLabel: (props) => props.value || 'item novo',
        }),
        ficha: fields.array(
          fields.object({
            rotulo: fields.text({ label: 'Nome', description: 'Ex.: Onde assistir, Onde fica, Preço' }),
            valor: fields.text({ label: 'Informação', description: 'Ex.: Netflix, Pinheiros, R$ 39,90' }),
          }),
          {
            label: 'Ficha rápida',
            description:
              'SÓ NO POST · Opcional. Informações curtas. Ideias: série → onde assistir, gênero · restaurante → onde fica, quanto custa, precisa reservar? · produto → onde comprar, preço, compraria de novo? · rolê → onde, quanto, melhor dia.',
            itemLabel: (props) => [props.fields.rotulo.value, props.fields.valor.value].filter(Boolean).join(': ') || 'linha nova',
          }
        ),
        galeria: fields.array(
          fields.object({
            foto: fields.image({ label: 'Foto', directory: 'public/images/posts', publicPath: '/images/posts/' }),
            legenda: fields.text({ label: 'Legenda (opcional)' }),
          }),
          {
            label: 'Galeria',
            description: 'SÓ NO POST · Opcional. Fotos que aparecem juntas depois do texto. A primeira fica maior.',
            itemLabel: (props) => props.fields.legenda.value || 'foto',
          }
        ),
        resumindo: fields.text({
          label: 'Resumindo',
          description: 'SÓ NO POST · Uma frase final. Aparece no quadro do veredito.',
          multiline: true,
        }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          description: 'SÓ NO POST · Palavrinhas soltas sobre o post, tipo "barato" ou "date".',
          itemLabel: (props) => props.value,
        }),
        conteudo: fields.markdoc({
          label: 'Texto (opcional)',
          description: 'SÓ NO POST · Pra quando quiser escrever mais. Dá pra colocar foto no meio pelo botão de imagem da barra.',
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
            foto: fields.image({
              label: 'Foto',
              description: 'Opcional. Sem foto, aparece a inicial do nome.',
              directory: 'public/images/sobre',
              publicPath: '/images/sobre/',
            }),
            frase: fields.text({
              label: 'Uma frase que te define',
              description: 'Curtinha, aparece embaixo do nome. Ex.: "a que testa tudo primeiro".',
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
