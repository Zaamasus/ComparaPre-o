import { Produto } from '../types';

// Converte todas as unidades para unidades básicas (ml ou g)
export const converterParaUnidadeBase = (produto: Produto): number => {
  let quantidadeBase = produto.quantidade;
  
  if (produto.unidade === 'l') {
    quantidadeBase = produto.quantidade * 1000; // l para ml
  } else if (produto.unidade === 'kg') {
    quantidadeBase = produto.quantidade * 1000; // kg para g
  }
  
  return quantidadeBase;
};

// Calcula o preço por unidade (ml ou g)
export const calcularPrecoUnidade = (produto: Produto): number => {
  const quantidadeBase = converterParaUnidadeBase(produto);
  
  if (quantidadeBase <= 0) {
    return 0;
  }
  
  return produto.preco / quantidadeBase;
};

// Retorna o produto mais econômico da lista
export const encontrarMaisEconomico = (produtos: Produto[]): Produto | null => {
  if (!produtos.length) return null;
  
  // Agrupa produtos por tipo de unidade (volume vs peso)
  const porVolume = produtos.filter(p => p.unidade === 'ml' || p.unidade === 'l');
  const porPeso = produtos.filter(p => p.unidade === 'g' || p.unidade === 'kg');
  
  // Encontra o mais econômico para cada grupo
  const maisEconomicoVolume = encontrarMaisEconomicoPorGrupo(porVolume);
  const maisEconomicoPeso = encontrarMaisEconomicoPorGrupo(porPeso);
  
  // Retorna o produto mais econômico se houver apenas um grupo
  if (!maisEconomicoVolume) return maisEconomicoPeso;
  if (!maisEconomicoPeso) return maisEconomicoVolume;
  
  // Se houver produtos de ambos os grupos, não podemos comparar diretamente
  return null;
};

// Encontra o produto mais econômico dentro de um grupo (volume ou peso)
const encontrarMaisEconomicoPorGrupo = (produtos: Produto[]): Produto | null => {
  if (!produtos.length) return null;
  
  return produtos.reduce((maisEconomico, produto) => {
    const precoUnidadeAtual = calcularPrecoUnidade(produto);
    const precoUnidadeMaisEconomico = calcularPrecoUnidade(maisEconomico);
    
    return precoUnidadeAtual < precoUnidadeMaisEconomico ? produto : maisEconomico;
  });
};

// Formatar preço para moeda brasileira
export const formatarPreco = (valor: number): string => {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};

// Formatar preço por unidade para moeda brasileira
export const formatarPrecoUnidade = (produto: Produto): string => {
  const precoUnidade = calcularPrecoUnidade(produto);
  const unidadeBase = produto.unidade === 'l' || produto.unidade === 'ml' ? 'ml' : 'g';
  
  return `${precoUnidade.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 6,
    maximumFractionDigits: 6,
  })} por ${unidadeBase}`;
};

// Função para formatar a diferença em porcentagem
export const calcularDiferencaPorcentagem = (produtoA: Produto, produtoB: Produto): number => {
  const precoUnidadeA = calcularPrecoUnidade(produtoA);
  const precoUnidadeB = calcularPrecoUnidade(produtoB);
  
  if (precoUnidadeA <= 0 || precoUnidadeB <= 0) return 0;
  
  const maior = Math.max(precoUnidadeA, precoUnidadeB);
  const menor = Math.min(precoUnidadeA, precoUnidadeB);
  
  return ((maior - menor) / maior) * 100;
};