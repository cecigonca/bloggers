# bloggers
Blog de avaliação de coisas.

## Como rodar no seu computador

Precisa ter instalado: [Node.js](https://nodejs.org) (versão 22 ou mais nova) e Git.

1. Abra o terminal dentro da pasta `bloggers`.
2. Só na primeira vez (ou quando alguém adicionar pacotes novos):
   ```bash
   npm install
   ```
3. Para ligar o site:
   ```bash
   npm run dev
   ```
4. Abra no navegador:
   - **Blog:** http://localhost:4321
   - **Admin (criar/editar posts):** http://localhost:4321/keystatic

Para desligar, aperte `Ctrl + C` no terminal.

## Como publicar um post (por enquanto, só no computador)

1. Entre em http://localhost:4321/keystatic → **Posts** → **Add**.
2. Preencha o formulário e clique em **Create** (ou **Save**, ao editar).
3. O post aparece na hora em http://localhost:4321.

Cada post vira um arquivo em `src/content/posts/`. Para ele ir pro GitHub, é preciso salvar (commit + push).
Quando o site estiver no ar, o admin vai publicar direto, sem esse passo.

## Onde fica cada coisa

| Pasta / arquivo | O que é |
|---|---|
| `keystatic.config.ts` | Os campos do formulário do admin |
| `src/content.config.ts` | Como o site lê os posts (precisa bater com os campos acima) |
| `src/content/posts/` | Os posts, um arquivo por post |
| `public/images/posts/` | As fotos enviadas pelo formulário |
| `src/pages/` | As páginas: `index.astro` (home), `posts/[slug].astro` (post), `sobre.astro` |
| `src/components/` | Pedaços reutilizáveis: card do post, selo de veredito, logo |
| `src/layouts/Base.astro` | Topo e rodapé, comuns a todas as páginas |
| `src/styles/global.css` | Cores e fontes |
| `src/lib/rotulos.ts` | Categorias (abas), vereditos (notas) e autoras, usados pelo site e pelo admin |
| `src/data/sobre.yaml` | Textos da página "Sobre nós" (editável pelo admin) |
