# pitacadas — contexto do projeto

Blog de avaliação de coisas, feito por duas amigas, **Cecília e Katsuki**, que **não são da área de tecnologia**.
Explique tudo em português simples, sem jargão, e sempre diga como ver o resultado (`npm run dev` → http://localhost:4321).

O nome do blog é **pitacadas** (de "dar pitaco"). Antes se chamava "chatinhas"; o valor interno `chatinhas` continua existindo no campo `opiniao` (= as duas concordam) e em alguns nomes de pasta, mas na tela aparece "pitacadas".
Logo: "pitacadas" na fonte do site com uma **estrela dourada à direita, na mesma linha** (centralizada com o texto, não no alto) (`src/components/Logo.astro`); favicon é a estrela. No admin a estrela fica à esquerda (limitação do Keystatic). A Cecília rejeitou logos com cara de IA (balão, formas geométricas perfeitas); busca algo cool/descolado, com vibe tipo Gossip Girl, para o futuro. O repositório no GitHub se chama `cecigonca/bloggers`.
O trabalho está na branch `v0` (a `main` ainda só tem o README original).

## Conceito e tom de voz

- Ideia central: **"do wpp pro blog"**. Tudo que elas já julgavam no grupo, agora em público, porque todo mundo merece saber o que presta.
- Linguagem descontraída e jovem, de amigas para amigos: "a gente", "pra", "tá", "vc". Nada de tom de revista formal.
- **Fugir do "brega"** (feedback repetido da Cecília): nada de frase de marketing, nada que tente demais,
  nada de gíria millennial ("grupo do zap" → "wpp"). Menos texto explicando. Escrever como mensagem de verdade
  (ex.: "mano sim... achei horrivel", "SERIO?", "KKKKKKK"). Nada inclinado/torto tipo adesivo.
  Ela rejeitou: legenda das notas em formato de chat, botão "ver julgamentos", "A gente é chata. Com carinho.".
- **Ao escrever um post pra elas:** em minúscula como mensagem de chat, sem exagero (nada de "a série favorita da vida"),
  mas com corpo: vários parágrafos desenvolvendo a opinião, e pode ter listas simples ("o que salvou / o que não salvou").
  Mais longo que o `morando-cravejado.mdoc` (post curtinho da Cecília, bom como referência de tom).
  Usar só o que elas contaram, sem inventar detalhes. Rejeitado: primeira versão do post de Outer Banks (dramática demais).
- Títulos e cabeçalhos com a primeira letra maiúscula ("É isso mesmo, a gente julga tudo.", "Leia também").
  Minúscula só em detalhes pequenos (links do menu, nome da categoria na capa do card).
- Nota sempre como número + estrela + nome: "4★ · aprovado" (componentes `Veredito.astro` e `Estrela.astro`).
  Vale pro site inteiro: cards, post, legenda, "Sobre nós" e opções do admin. No selo, o "4★" é maior que o nome, pra ser lido primeiro.

## Visual

- Vibe: moderna, minimalista, simples, mas descontraída e cool.
- Paleta: cinzas, cinza azulado e azul-marinho. Tokens em `src/styles/global.css` (`--marinho`, `--marinho-claro`,
  `--azul-cinza`, `--azul-cinza-claro`, `--cinza`, `--cinza-claro`, `--fundo`).
  Única exceção: `--dourado` (#c08b1e), usado **só na nota 5**: selo dourado com letra branca, estrela do veredito final e régua da legenda (escolha da Cecília entre 5 opções testadas). Não introduzir outras cores sem combinar com elas.
- Fontes (Google Fonts): **Bricolage Grotesque** nos títulos, **DM Sans** no texto.
- Elementos marcantes: balões de conversa (chat do topo da home, logo, "..." nas capas dos cards), cards com cantos bem arredondados.
- Abas de tópicos: faixa entre duas linhas, em CAIXA ALTA, a selecionada em pílula marinho, grudadas no topo ao rolar
  (a Cecília preferiu esse modelo ao de balão). Nada além das abas nessa faixa.
- Feed em mosaico (`src/lib/feed.ts`): 4 formatos (grande, largo, alto, pequeno) e 3 cores num padrão de 18 posts que se repete,
  recalculado ao filtrar. Os grandes aparecem em colunas diferentes (nada de "grande à esquerda e diminuindo").
  Card no modelo da v0: capa colorida com o nome da categoria + "..." (ou foto), selo da nota na borda da capa, texto embaixo.
  No largo, capa à esquerda.
- Legenda das notas (`src/components/LegendaNotas.astro`, um `<dialog>`): régua de 1★ a 5★ com número grande, estrela, nome e frase curta;
  no celular vira lista. Abre pelo link "nossas notas →" ao lado do botão "ver posts" e pelo selo na página do post
  (qualquer elemento com `data-abrir-legenda`). NÃO colocar na faixa de abas e NÃO fazer em formato de chat.

## Decisões técnicas

- **Site:** Astro 7 (site estático).
- **Admin / formulário:** Keystatic em `/keystatic`. Formulários em `keystatic.config.ts`.
- **Listas compartilhadas** (categorias, vereditos 1–5, autoras): `src/lib/rotulos.ts`. São usadas pelo admin e pelo site.
- **Posts:** arquivos `.mdoc` (Markdoc) em `src/content/posts/`, lidos via `src/content.config.ts`.
  Ao mudar um campo no Keystatic, mude também o schema em `src/content.config.ts` e ajuste os posts existentes.
  Títulos com ":" no frontmatter precisam de aspas (o Keystatic já faz isso sozinho).
- **Página "Sobre nós":** editável pelo admin (singleton `sobre`), salva em `src/data/sobre.yaml`, lida com o reader do Keystatic.
  Estrutura (inspirada no The Infatuation e no Cup of Jo): chamada + uma frase → "Como funciona aqui" (regras curtas, título forte + uma frase, editáveis) → "Quem escreve" (bio curta de cada uma) → "As notas" (régua). Títulos de seção pequenos, em caixa alta, com linha embaixo.
  Rejeitados: mini ficha de "especialidade", "Quem julga", "E de quem é a opinião", texto com expressão pronta ("caiu a ficha", "sem filtro"), frases de efeito sob os nomes.
- **Katsuki:** o valor interno continua `amiga` (posts e campos `notaAmiga`/`opiniaoAmiga`); na tela aparece "Katsuki" via `src/lib/rotulos.ts`.
- **Imagens:** `public/images/posts/` e `public/images/sobre/`.
- **Filtro por tópico na home:** feito no navegador (JS em `src/pages/index.astro`) e guardado no link como `?topico=...`.
- **Estrutura do post** (decidida com as duas via protótipo): tudo numa coluna só de 880px (título, capa, blocos, ficha, texto, galeria, veredito com as mesmas bordas).
  Ordem: voltar pro feed → chips → título → fofoca → quem/nota → aviso de spoiler → capa → blocos **Positivo / Negativo**
  (dois quadros brancos de mesmo peso, "+" e "−") → **ficha rápida** (faixa entre duas linhas, SEM fundo, pra não parecer com os blocos)
  → texto livre (opcional, sem título) → galeria → veredito final → tags → leia também.
  Rejeitado: "O que presta / o que não presta", "o textão" como título, opiniões divididas numa seção no meio do post, foto mais larga que o resto.
- **De quem é a opinião:** campo `opiniao` (conditional do Keystatic, salvo como `{ discriminant, value }`): `cecilia` | `amiga` | `chatinhas` (as duas concordam) com `nota`,
  ou `divididas` com `notaCecilia`, `opiniaoCecilia`, `notaAmiga`, `opiniaoAmiga`. Lido por `src/lib/opiniao.ts`.
  Divididas: dois selos compactos ("C 3★ · A 4★") no card e no topo; o veredito final vira um placar dividido ao meio + "resumindo".
- **Fotos no meio do texto:** o "title" da imagem no editor vira legenda (`markdoc.config.mjs` → `src/components/FotoNoTexto.astro`).
- **Esconder data / quem escreveu:** caixinhas `esconderData` e `esconderAutoria` por post. A data continua obrigatória (ordena o feed).
- **Voltar pro feed:** volta pra aba de onde a pessoa veio (lê o `document.referrer`).
- **Post em mais de uma aba:** campo `categoria` (principal, vai na capa do card) + `tambemEm` (lista de outras abas, ex.: `trending`). O card leva todas em `data-categorias`; na página do post viram chips clicáveis.
- **Hospedagem planejada:** Vercel (adapter `@astrojs/vercel` já instalado).
- **Storage do Keystatic:** `local` por enquanto. Na etapa de ir pro ar, trocar para `github` (repo `cecigonca/bloggers`) e configurar o GitHub App do Keystatic.
- Evitar `backdrop-filter` no topo fixo: dava problema de renderização ao rolar a página.
- Depois de mudar CSS de componente, se o navegador mostrar a página sem estilo, reiniciar o `npm run dev` (o servidor às vezes fica desatualizado).
- **Bloqueio do Windows (desde 29/09/2026):** o Controle de Aplicativos do Windows passou a bloquear o binário nativo
  `@bruits/satteri-win32-x64-msvc` (usado pelo Astro para Markdown). Não mexer na segurança do Windows. Solução em uso:
  a versão WebAssembly oficial (`npm install @bruits/satteri-wasm32-wasi@0.10.5 --no-save --force`) + variável
  `NAPI_RS_FORCE_WASI=true` ao rodar `dev`/`build`. O `--no-save` some a cada `npm install`: reinstalar se voltar o erro.
  O PowerShell também bloqueia `npm.ps1`; usar `npm.cmd`. Em outros computadores e na Vercel nada disso é necessário.
- No Windows PowerShell 5.1, ler arquivos com `[IO.File]::ReadAllText` (UTF-8), nunca com `Get-Content -Raw` sem `-Encoding UTF8`: corrompe os acentos.

## Pendências com elas

- Tópicos definitivos das abas (os atuais são provisórios).
- Textos reais do "Sobre nós" e fotos.
- Confirmar o nome "chatinhas".
- Com poucos posts sobra um buraco no fim do mosaico (dá para esticar o último card, se elas quiserem).

## Plano

1. ✅ Base: projeto rodando local, formulário funcionando.
2. ✅ Visual v1: paleta, fontes, home com topo, abas e feed, página de post, "Sobre nós", formulário com textos explicativos.
3. ✅ v1.x: textos menos bregas, chat novo, feed em mosaico com cards da v0, legenda das notas em régua, nota com estrela, 5★ dourado.
4. ✅ Post com seções (formulário + página), opinião de quem, spoiler, galeria, voltar pro feed.
5. ⏳ Ajustes finos com elas (tópicos, textos, nome, fotos).
6. ⏳ No ar: Vercel + Keystatic em modo GitHub + acesso para as duas + domínio.
7. ⏳ Extras: busca, comentários, compartilhar no WhatsApp, newsletter.

## Convenções

- Nomes de arquivos, variáveis e comentários em português.
- Salvar cada etapa com commit no GitHub, para poder voltar atrás.
