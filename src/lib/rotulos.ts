// Listas usadas pelo formulário do admin E pelo site.
// Mudou aqui, muda nos dois lugares. `value` é o que fica salvo no post (sem acento/espaço),
// `label` é o que aparece para as pessoas.

export const categorias = [
  { value: 'trending', label: 'Trending' },
  { value: 'comida', label: 'Comes & bebes' },
  { value: 'roles', label: 'Rolês' },
  { value: 'telinha', label: 'Filmes & séries' },
  { value: 'beleza', label: 'Beleza' },
  { value: 'compras', label: 'Comprinhas' },
  { value: 'livros', label: 'Livros' },
  { value: 'aleatorio', label: 'Aleatórios' },
];

// A nota vira um "veredito" com nome, que é mais divertido que só estrelinha.
export const notas = [
  { value: '5', label: 'Obrigatório', descricao: 'larga tudo e vai. sério' },
  { value: '4', label: 'Aprovado', descricao: 'vale cada centavo' },
  { value: '3', label: 'De boa', descricao: 'não muda sua vida, mas ok' },
  { value: '2', label: 'Meh', descricao: 'só se não tiver outra opção...' },
  { value: '1', label: 'Fujam', descricao: 'a gente sofreu pra vc não sofrer' },
];

export const autoras = [
  { value: 'cecilia', label: 'Cecília' },
  { value: 'amiga', label: 'Amiga' },
  { value: 'chatinhas', label: 'chatinhas' },
];

type Opcao = { value: string; label: string };

export function rotulo(lista: Opcao[], value: string) {
  return lista.find((item) => item.value === value)?.label ?? value;
}

export function veredito(nota: number) {
  return notas.find((item) => item.value === String(nota)) ?? notas[2];
}

const meses = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

export function dataCurta(data: Date) {
  return `${data.getUTCDate()} ${meses[data.getUTCMonth()]}`;
}

export function dataLonga(data: Date) {
  return data.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}
