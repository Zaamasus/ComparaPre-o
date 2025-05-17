import React, { useMemo } from 'react';
import { Produto } from '../types';
import { 
  calcularPrecoUnidade, 
  formatarPreco, 
  calcularDiferencaPorcentagem 
} from '../utils/calculations';
import { Check, AlertTriangle } from 'lucide-react';

interface ComparisonResultProps {
  produtos: Produto[];
}

const ComparisonResult: React.FC<ComparisonResultProps> = ({ produtos }) => {
  // Filtramos apenas produtos válidos (com preço e quantidade)
  const produtosValidos = useMemo(() => {
    return produtos.filter(p => p.nome && p.preco > 0 && p.quantidade > 0);
  }, [produtos]);

  // Se não tivermos pelo menos 2 produtos válidos, não mostramos resultado
  if (produtosValidos.length < 2) {
    return (
      <div className="bg-gray-100 p-6 rounded-lg border border-gray-300 text-center">
        <AlertTriangle className="mx-auto h-12 w-12 text-yellow-500 mb-3" />
        <h3 className="text-lg font-medium text-gray-700 mb-2">Não é possível comparar ainda</h3>
        <p className="text-gray-600">
          Preencha pelo menos dois produtos com nome, preço e quantidade para ver a comparação.
        </p>
      </div>
    );
  }

  // Calculamos o preço por unidade para cada produto
  const produtosComPrecoUnidade = produtosValidos.map(produto => ({
    ...produto,
    precoUnidade: calcularPrecoUnidade(produto)
  }));

  // Separamos produtos por tipo (volume vs peso)
  const produtosVolume = produtosComPrecoUnidade.filter(p => p.unidade === 'ml' || p.unidade === 'l');
  const produtosPeso = produtosComPrecoUnidade.filter(p => p.unidade === 'g' || p.unidade === 'kg');

  // Ordenamos por melhor preço (menor preço por unidade)
  const produtosVolumeOrdenados = [...produtosVolume].sort((a, b) => 
    (a.precoUnidade || 0) - (b.precoUnidade || 0)
  );
  
  const produtosPesoOrdenados = [...produtosPeso].sort((a, b) => 
    (a.precoUnidade || 0) - (b.precoUnidade || 0)
  );

  // Determinamos o melhor produto para cada categoria
  const melhorVolume = produtosVolumeOrdenados[0];
  const melhorPeso = produtosPesoOrdenados[0];

  const renderGrupo = (produtos: Produto[], titulo: string, melhor: Produto) => {
    if (produtos.length === 0) return null;

    return (
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">{titulo}</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {produtos.map(produto => {
            const isMelhor = produto.id === melhor.id;
            const precoUnidade = produto.precoUnidade || 0;
            const unidadeBase = produto.unidade === 'l' || produto.unidade === 'ml' ? 'ml' : 'g';
            const diferencaPct = produto.id !== melhor.id 
              ? calcularDiferencaPorcentagem(melhor, produto)
              : 0;

            return (
              <div 
                key={produto.id}
                className={`
                  relative rounded-lg overflow-hidden border shadow-sm
                  ${isMelhor ? 'border-green-500 shadow-green-100' : 'border-gray-200'}
                `}
              >
                {/* Badge para melhor opção */}
                {isMelhor && (
                  <div className="absolute top-0 right-0 bg-green-500 text-white px-3 py-1 text-sm font-semibold rounded-bl-lg">
                    <div className="flex items-center">
                      <Check size={16} className="mr-1" />
                      Melhor Opção
                    </div>
                  </div>
                )}
                
                <div className="p-5">
                  <h4 className="text-lg font-medium text-gray-800 mb-3 pr-20">{produto.nome}</h4>
                  
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Preço</p>
                      <p className="font-semibold">{formatarPreco(produto.preco)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Quantidade</p>
                      <p className="font-semibold">{produto.quantidade} {produto.unidade}</p>
                    </div>
                  </div>
                  
                  <div className={`py-3 px-4 rounded-md ${isMelhor ? 'bg-green-50' : 'bg-gray-50'}`}>
                    <p className="text-sm text-gray-500 mb-1">Preço por unidade</p>
                    <p className={`font-bold ${isMelhor ? 'text-green-700' : 'text-gray-700'}`}>
                      {precoUnidade.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                        minimumFractionDigits: 6,
                        maximumFractionDigits: 6,
                      })} / {unidadeBase}
                    </p>
                  </div>
                  
                  {!isMelhor && (
                    <div className="mt-3 text-right">
                      <p className="text-red-600 text-sm font-medium">
                        {diferencaPct.toFixed(2)}% mais caro por {unidadeBase}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Resultado da Comparação</h2>
      
      {renderGrupo(produtosVolume, "Produtos Líquidos", melhorVolume)}
      {renderGrupo(produtosPeso, "Produtos por Peso", melhorPeso)}
      
      <div className="mt-4 p-4 bg-blue-50 rounded-md border border-blue-100">
        <h3 className="text-lg font-medium text-blue-800 mb-2">Dica de economia</h3>
        <p className="text-blue-700">
          Para economizar, escolha sempre os produtos com menor preço por unidade de medida.
          Isso garante que você está obtendo mais produto pelo valor investido.
        </p>
      </div>
    </div>
  );
};

export default ComparisonResult;