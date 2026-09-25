# chatinhas â€” contexto do projeto

Blog de avaliaÃ§Ã£o de coisas, feito por duas amigas (CecÃ­lia e uma amiga) que **nÃ£o sÃ£o da Ã¡rea de tecnologia**.
Explique tudo em portuguÃªs simples, sem jargÃ£o, e sempre diga como ver o resultado (`npm run dev` â†’ http://localhost:4321).

"chatinhas" Ã© o nome provisÃ³rio (chat + ser chatinha pra avaliar). O repositÃ³rio no GitHub se chama `cecigonca/bloggers`.

## Conceito e tom de voz

- Ideia central: **"do grupo do zap pro blog"**. Tudo que elas jÃ¡ julgavam no grupo, agora em pÃºblico, porque todo mundo merece saber o que presta.
- Linguagem descontraÃ­da e jovem, de amigas para amigos: "a gente", "pra", "tÃ¡", humor e um pouco de exagero. Nada de tom de revista formal.
- Textos da interface tambÃ©m seguem esse tom, em minÃºsculas quando for um detalhe ("feed", "leia tambÃ©m", "veredito final").
- **Fugir do "brega"** (feedback da CecÃ­lia na v1): nada de frase de marketing, nada que tente demais,
  nada de gÃ­ria millennial ("grupo do zap" â†’ "wpp"). Menos texto explicando. Escrever como mensagem de verdade
  (ex.: "mano sim... achei horrivel", "SERIO?", "KKKKKKK"). Nada inclinado/torto tipo adesivo.
- Nota sempre com a escala visÃ­vel: "4/5 Â· aprovado" (sÃ³ "nota 4" deixa a pessoa sem saber de quanto Ã©).

## Visual

- Vibe: moderna, minimalista, simples, mas descontraÃ­da e cool.
- Paleta: cinzas, cinza azulado e azul-marinho. Tokens em `src/styles/global.css` (`--marinho`, `--azul-cinza`, `--azul-cinza-claro`, `--cinza`, `--cinza-claro`, `--fundo`). NÃ£o introduzir outras cores sem combinar com elas.
- Fontes (Google Fonts): **Bricolage Grotesque** nos tÃ­tulos, **DM Sans** no texto.
- Elementos marcantes: balÃµes de conversa (chat do hero, logo, aba selecionada, "fofoca em uma frase" nos cards), cards com cantos bem arredondados.
- Abas de tÃ³picos: em minÃºscula, a selecionada vira um balÃ£o de chat, grudadas no topo ao rolar. (A referÃªncia inicial era um menu em caixa alta entre duas linhas; mudamos para ter identidade prÃ³pria.)
- Feed em mosaico: 4 formatos (grande, largo, alto, pequeno) e 4 cores num padrÃ£o que se repete (`src/lib/feed.ts`), recalculado ao filtrar. Card com foto = foto ocupando tudo; sem foto = resumo num balÃ£o de chat.

## DecisÃµes tÃ©cnicas

- **Site:** Astro 7 (site estÃ¡tico).
- **Admin / formulÃ¡rio:** Keystatic em `/keystatic`. FormulÃ¡rios em `keystatic.config.ts`.
- **Listas compartilhadas** (categorias, vereditos 1â€“5, autoras): `src/lib/rotulos.ts`. SÃ£o usadas pelo admin e pelo site.
- **Posts:** arquivos `.mdoc` (Markdoc) em `src/content/posts/`, lidos via `src/content.config.ts`.
  Ao mudar um campo no Keystatic, mude tambÃ©m o schema em `src/content.config.ts` e ajuste os posts existentes.
  TÃ­tulos com ":" no frontmatter precisam de aspas (o Keystatic jÃ¡ faz isso sozinho).
- **PÃ¡gina "Sobre nÃ³s":** editÃ¡vel pelo admin (singleton `sobre`), salva em `src/data/sobre.yaml`, lida com o reader do Keystatic.
- **Imagens:** `public/images/posts/` e `public/images/sobre/`.
- **Filtro por tÃ³pico na home:** feito no navegador (JS em `src/pages/index.astro`) e guardado no link como `?topico=...`.
- **Hospedagem planejada:** Vercel (adapter `@astrojs/vercel` jÃ¡ instalado).
- **Storage do Keystatic:** `local` por enquanto. Na etapa de ir pro ar, trocar para `github` (repo `cecigonca/bloggers`) e configurar o GitHub App do Keystatic.
- Evitar `backdrop-filter` no topo fixo: dava problema de renderizaÃ§Ã£o ao rolar a pÃ¡gina.

## PendÃªncias com elas

- Nome real da amiga (trocar "Amiga" em `src/lib/rotulos.ts` e em `src/data/sobre.yaml`).
- TÃ³picos definitivos das abas (os atuais sÃ£o provisÃ³rios).
- Textos reais do "Sobre nÃ³s" e fotos.
- Confirmar o nome "chatinhas".
- Os 6 posts atuais sÃ£o exemplos (tag `exemplo`) e devem ser apagados antes de lanÃ§ar.

## Plano

1. âœ… Base: projeto rodando local, formulÃ¡rio funcionando.
2. âœ… Visual v1: paleta, fontes, home com hero, abas e feed, pÃ¡gina de post, "Sobre nÃ³s", formulÃ¡rio com textos explicativos.
3. âœ… v1: textos menos bregas, chat novo, abas prÃ³prias, feed em mosaico, selos retos.
4. â³ Ajustes finos com elas (tÃ³picos, textos, nome, fotos).
4. â³ No ar: Vercel + Keystatic em modo GitHub + acesso para as duas + domÃ­nio.
5. â³ Extras: busca, comentÃ¡rios, compartilhar no WhatsApp, newsletter.

## ConvenÃ§Ãµes

- Nomes de arquivos, variÃ¡veis e comentÃ¡rios em portuguÃªs.
- Salvar cada etapa com commit no GitHub, para poder voltar atrÃ¡s.
