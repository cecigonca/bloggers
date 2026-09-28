// Transforma o campo "De quem é a opinião?" do post em algo fácil de mostrar na tela.
import type { CollectionEntry } from 'astro:content';
import { autoras, rotulo } from './rotulos';

type Opiniao = CollectionEntry<'posts'>['data']['opiniao'];

export type Voto = { quem: string; nome: string; nota: number; texto: string };

export type LeituraOpiniao =
  | { divididas: false; quem: string; nome: string; nota: number }
  | { divididas: true; nome: string; votos: [Voto, Voto] };

export function lerOpiniao(opiniao: Opiniao): LeituraOpiniao {
  if (opiniao.discriminant === 'divididas') {
    const v = opiniao.value;
    return {
      divididas: true,
      nome: `${rotulo(autoras, 'cecilia')} e ${rotulo(autoras, 'amiga')}`,
      votos: [
        { quem: 'cecilia', nome: rotulo(autoras, 'cecilia'), nota: v.notaCecilia, texto: v.opiniaoCecilia },
        { quem: 'amiga', nome: rotulo(autoras, 'amiga'), nota: v.notaAmiga, texto: v.opiniaoAmiga },
      ],
    };
  }
  return {
    divididas: false,
    quem: opiniao.discriminant,
    nome: rotulo(autoras, opiniao.discriminant),
    nota: opiniao.value.nota,
  };
}
