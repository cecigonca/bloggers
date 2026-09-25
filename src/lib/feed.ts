// Tamanho e cor de cada card do feed, pela posição dele.
// O padrão de tamanhos se repete a cada 18 posts e encaixa certinho numa grade de 4 colunas,
// com os cards grandes aparecendo em lugares diferentes (meio, direita, esquerda).
// Quando entra um post novo (ou alguém filtra por aba), tudo se reorganiza sozinho.

export type Formato = 'grande' | 'largo' | 'alto' | 'pequeno';

const padrao: Formato[] = [
  // bloco 1: alto | grande (meio) | dois pequenos
  'alto', 'grande', 'pequeno', 'pequeno',
  // bloco 2: largo + pequeno + alto (direita), embaixo pequeno + largo
  'largo', 'pequeno', 'alto', 'pequeno', 'largo',
  // bloco 3: dois pequenos + grande (direita), embaixo largo
  'pequeno', 'pequeno', 'grande', 'largo',
  // bloco 4: alto (esquerda) + pequeno + largo, embaixo largo + pequeno
  'alto', 'pequeno', 'largo', 'largo', 'pequeno',
];

const cores = ['marinho', 'claro', 'azul'];

export function formatoDoCard(posicao: number): Formato {
  return padrao[posicao % padrao.length];
}

export function corDoCard(posicao: number) {
  return cores[posicao % cores.length];
}
