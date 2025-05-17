export interface Produto {
  id: string;
  nome: string;
  preco: number;
  quantidade: number;
  unidade: 'ml' | 'l' | 'g' | 'kg';
  precoUnidade?: number;
}

export interface Comparacao {
  id: string;
  data: string;
  produtos: Produto[];
  maisEconomico?: string;
}