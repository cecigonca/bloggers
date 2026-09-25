// Tamanho e cor de cada card do feed, pela posição dele.
// O padrão de tamanhos se repete a cada 13 posts e encaixa certinho numa grade de 4 colunas.
// Quando entra um post novo (ou alguém filtra por aba), tudo se reorganiza sozinho.

export type Formato = 'grande' | 'largo' | 'alto' | 'pequeno';

const padrao: Formato[] = [
  // bloco 1: grande + alto + dois pequenos
  'grande', 'alto', 'pequeno', 'pequeno',
  // bloco 2: largo, pequeno, alto, largo, pequeno
  'largo', 'pequeno', 'alto', 'largo', 'pequeno',
  // bloco 3: espelho do primeiro
  'pequeno', 'alto', 'grande', 'pequeno',
];

const cores = ['marinho', 'claro', 'branco', 'azul'];

export function formatoDoCard(posicao: number): Formato {
  return padrao[posicao % padrao.length];
}

export function corDoCard(posicao: number) {
  return cores[posicao % cores.length];
}
