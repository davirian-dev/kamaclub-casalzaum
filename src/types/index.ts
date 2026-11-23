export type GameMode = 'amigos' | 'esquenta' | 'kama';

export type GenderIdentity = 'homem_cis' | 'mulher_cis' | 'homem_trans' | 'mulher_trans' | 'nao_binario' | 'outro';

export type SexualOrientation = 'hetero' | 'bi_pan' | 'gay' | 'lesbica' | 'lgbtqia' | 'flexivel';

export type IntimateRole = 'ativo' | 'passivo' | 'versatil';

export interface Participant {
  id: string;
  name: string;
  gender: GenderIdentity;
  orientation: SexualOrientation;
  role: IntimateRole;
  interactsWithAll: boolean; // se true interage livremente, se false respeita orientacao estrita
}

export interface Position {
  id: string;
  title: string;
  subtitle: string;
  category: 'classicas' | 'controle' | 'profundidade' | 'acrobaticas' | 'oral' | 'menage' | 'swing' | 'lgbtqia';
  complexity: 'Iniciante' | 'Intermediário' | 'Avançado' | 'Acrobático';
  intensity: 'Leve' | 'Média' | 'Alta' | 'Intensa';
  location: 'Cama' | 'Sofá' | 'Chão / Tapete' | 'Em Pé' | 'Chuveiro';
  focus: string;
  rating: number;
  illustrationUrl: string;
  description: string;
  instructions: string[];
  comfortTip: string;
  activeTip?: string;
  passiveTip?: string;
  versatileTip?: string;
  isVip?: boolean;
}

export interface Challenge {
  id: string;
  type: 'verdade' | 'desafio' | 'eu_nunca' | 'garrafa';
  mode: GameMode; // amigos (leve), esquenta, kama (+18)
  level: 1 | 2 | 3;
  targetRole?: 'qualquer' | 'ativo' | 'passivo';
  text: string;
  timeSeconds?: number;
  points: number;
  refusalOption?: string; // ex: Beber 1 gole ou pagar prenda
}

export interface PlaceCategory {
  id: string;
  name: string;
  icon: string;
  items: {
    id: string;
    name: string;
    done: boolean;
  }[];
}

export interface IdeaCard {
  id: string;
  title: string;
  category: 'Criativo' | 'Escandalosos' | 'Acessível' | 'Rápido' | 'Clássico';
  description: string;
  status: 'todas' | 'novas' | 'feitas';
}
