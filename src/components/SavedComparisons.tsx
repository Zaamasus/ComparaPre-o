import React from 'react';
import { Comparacao, Produto } from '../types';
import { formatarPreco, calcularPrecoUnidade } from '../utils/calculations';
import { Calendar, Trash2 } from 'lucide-react';

interface SavedComparisonsProps {
  comparacoes: Comparacao[];
  onDelete: (id: string) => void;
}

const SavedComparisons: React.FC<SavedComparisonsProps> = ({ comparacoes, onDelete }) => {
  if (comparacoes.length === 0) {
    return (
      <div className="text-center py-10 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-500">Nenhuma comparação salva ainda.</p>
        <p className="text-gray-400 text-sm mt-2">
          Compare produtos e salve para ver seu histórico aqui.
        </p>
      </div>
    );
  }

  // Função para encontrar o produto mais econômico de uma comparação
  const encontrarMaisEconomico = (produtos: Produto[]): Produto | null => {
    if (!produtos.length) return null;
    
    // Agrupa produtos por tipo de unidade (volume vs peso)
    const porVolume = produtos.filter(p => p.unidade === 'ml' || p.unidade === 'l');
    const porPeso = produtos.filter(p => p.unidade === 'g' || p.unidade === 'kg');
    
    // Encontra o mais econômico para cada grupo
    const maisEconomicoVolume = porVolume.length 
      ? porVolume.reduce((menor, atual) => 
          (calcularPrecoUnidade(atual) < calcularPrecoUnidade(menor)) ? atual : menor
        )
      : null;
      
    const maisEconomicoPeso = porPeso.length
      ? porPeso.reduce((menor, atual) => 
          (calcularPrecoUnidade(atual) < calcularPrecoUnidade(menor)) ? atual : menor
        )
      : null;
    
    if (maisEconomicoVolume && maisEconomicoPeso) {
      // Se houver produtos de ambos os grupos, não podemos determinar um único mais econômico
      return null;
    }
    
    return maisEconomicoVolume || maisEconomicoPeso;
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Comparações Salvas</h2>
      
      {comparacoes.map((comparacao) => {
        const data = new Date(comparacao.data);
        const dataFormatada = data.toLocaleDateString('pt-BR');
        const maisEconomico = encontrarMaisEconomico(comparacao.produtos);
        
        return (
          <div key={comparacao.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="flex justify-between items-center px-6 py-4 bg-blue-50 border-b border-blue-100">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-blue-500 mr-2" />
                <span className="font-medium text-blue-700">{dataFormatada}</span>
              </div>
              <button 
                onClick={() => onDelete(comparacao.id)}
                className="text-red-500 hover:text-red-700 transition-colors"
                aria-label="Excluir comparação"
              >
                <Trash2 size={18} />
              </button>
            </div>
            
            <div className="px-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {comparacao.produtos.map((produto) => {
                  const isEconomico = maisEconomico && produto.id === maisEconomico.id;
                  const precoUnidade = calcularPrecoUnidade(produto);
                  const unidadeExibicao = produto.unidade === 'l' || produto.unidade === 'ml' ? 'ml' : 'g';
                  
                  return (
                    <div 
                      key={produto.id} 
                      className={`
                        p-4 rounded-md border 
                        ${isEconomico ? 'border-green-300 bg-green-50' : 'border-gray-200'}
                      `}
                    >
                      <h4 className="font-medium text-gray-800 mb-2">{produto.nome}</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-gray-500">Preço:</p>
                          <p className="font-semibold">{formatarPreco(produto.preco)}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Quantidade:</p>
                          <p className="font-semibold">{produto.quantidade} {produto.unidade}</p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <p className="text-gray-500 text-sm">Preço por unidade:</p>
                        <p className={`font-bold text-sm ${isEconomico ? 'text-green-700' : 'text-gray-700'}`}>
                          {precoUnidade.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                            minimumFractionDigits: 6,
                            maximumFractionDigits: 6,
                          })} / {unidadeExibicao}
                        </p>
                      </div>
                      {isEconomico && (
                        <div className="mt-2">
                          <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded">
                            Melhor custo-benefício
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SavedComparisons;