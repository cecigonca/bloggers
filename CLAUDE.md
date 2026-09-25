# chatinhas — contexto do projeto

Blog de avaliação de coisas, feito por duas amigas (Cecília e uma amiga) que **não são da área de tecnologia**.
Explique tudo em português simples, sem jargão, e sempre diga como ver o resultado (`npm run dev` → http://localhost:4321).

"chatinhas" é o nome provisório (chat + ser chatinha pra avaliar). O repositório no GitHub se chama `cecigonca/bloggers`.

## Conceito e tom de voz

- Ideia central: **"do grupo do zap pro blog"**. Tudo que elas já julgavam no grupo, agora em público, porque todo mundo merece saber o que presta.
- Linguagem descontraída e jovem, de amigas para amigos: "a gente", "pra", "tá", humor e um pouco de exagero. Nada de tom de revista formal.
- Textos da interface também seguem esse tom, em minúsculas quando for um detalhe ("feed", "mais julgamentos", "veredito final").

## Visual

- Vibe: moderna, minimalista, simples, mas descontraída e cool.
- Paleta: cinzas, cinza azulado e azul-marinho. Tokens em `src/styles/global.css` (`--marinho`, `--azul-cinza`, `--azul-cinza-claro`, `--cinza`, `--cinza-claro`, `--fundo`). Não introduzir outras cores sem combinar com elas.
- Fontes (Google Fonts): **Bricolage Grotesque** nos títulos, **DM Sans** no texto.
- Elementos marcantes: balões de conversa (hero da home, logo, "..." nos cards), selo de veredito levemente torto como um adesivo, cards com cantos bem arredondados.
- Abas de tópicos: faixa entre duas linhas, com texto em caixa alta (referência que elas mandaram), grudada no topo ao rolar.

## Decisões técnicas

- **Site:** Astro 7 (site estático).
- **Admin / formulário:** Keystatic em `/keystatic`. Formulários em `keystatic.config.ts`.
- **Listas compartilhadas** (categorias, vereditos 1–5, autoras): `src/lib/rotulos.ts`. São usadas pelo admin e pelo site.
- **Posts:** arquivos `.mdoc` (Markdoc) em `src/content/posts/`, lidos via `src/content.config.ts`.
  Ao mudar um campo no Keystatic, mude também o schema em `src/content.config.ts` e ajuste os posts existentes.
  Títulos com ":" no frontmatter precisam de aspas (o Keystatic já faz isso sozinho).
- **Página "Sobre nós":** editável pelo admin (singleton `sobre`), salva em `src/data/sobre.yaml`, lida com o reader do Keystatic.
- **Imagens:** `public/images/posts/` e `public/images/sobre/`.
- **Filtro por tópico na home:** feito no navegador (JS em `src/pages/index.astro`) e guardado no link como `?topico=...`.
- **Hospedagem planejada:** Vercel (adapter `@astrojs/vercel` já instalado).
- **Storage do Keystatic:** `local` por enquanto. Na etapa de ir pro ar, trocar para `github` (repo `cecigonca/bloggers`) e configurar o GitHub App do Keystatic.
- Evitar `backdrop-filter` no topo fixo: dava problema de renderização ao rolar a página.

## Pendências com elas

- Nome real da amiga (trocar "Amiga" em `src/lib/rotulos.ts` e em `src/data/sobre.yaml`).
- Tópicos definitivos das abas (os atuais são provisórios).
- Textos reais do "Sobre nós" e fotos.
- Confirmar o nome "chatinhas".
- Os 6 posts atuais são exemplos (tag `exemplo`) e devem ser apagados antes de lançar.

## Plano

1. ✅ Base: projeto rodando local, formulário funcionando.
2. ✅ Visual v1: paleta, fontes, home com hero, abas e feed, página de post, "Sobre nós", formulário com textos explicativos.
3. ⏳ Ajustes finos com elas (tópicos, textos, nome, fotos).
4. ⏳ No ar: Vercel + Keystatic em modo GitHub + acesso para as duas + domínio.
5. ⏳ Extras: busca, comentários, compartilhar no WhatsApp, newsletter.

## Convenções

- Nomes de arquivos, variáveis e comentários em português.
- Salvar cada etapa com commit no GitHub, para poder voltar atrás.
