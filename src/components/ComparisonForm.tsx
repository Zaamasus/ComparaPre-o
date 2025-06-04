import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Produto, Comparacao } from '../types';
import ProductInput from './ProductInput';
import ComparisonResult from './ComparisonResult';
import { PlusCircle, Save } from 'lucide-react';

interface ComparisonFormProps {
  onSaveComparison: (comparacao: Comparacao) => void;
}

const ComparisonForm: React.FC<ComparisonFormProps> = ({ onSaveComparison }) => {
  const [produtos, setProdutos] = useState<Produto[]>([
    {
      id: uuidv4(),
      nome: '',
      preco: 0,
      quantidade: 0,
      unidade: 'ml'
    },
    {
      id: uuidv4(),
      nome: '',
      preco: 0,
      quantidade: 0,
      unidade: 'ml'
    }
  ]);

  const handleProdutoChange = (produtoAtualizado: Produto) => {
    setProdutos(prevProdutos => 
      prevProdutos.map(p => 
        p.id === produtoAtualizado.id ? produtoAtualizado : p
      )
    );
  };

  const adicionarProduto = () => {
    setProdutos(prevProdutos => [
      ...prevProdutos,
      {
        id: uuidv4(),
        nome: '',
        preco: 0,
        quantidade: 0,
        unidade: 'ml'
      }
    ]);
  };

  const removerProduto = (id: string) => {
    setProdutos(prevProdutos => prevProdutos.filter(p => p.id !== id));
  };

  const salvarComparacao = () => {
    const produtosValidos = produtos.filter(
      p => p.nome && p.preco > 0 && p.quantidade > 0
    );
    
    if (produtosValidos.length < 2) {
      alert('É necessário pelo menos dois produtos válidos para salvar a comparação.');
      return;
    }
    
    const novaComparacao: Comparacao = {
      id: uuidv4(),
      data: new Date().toISOString(),
      produtos: produtosValidos
    };
    
    onSaveComparison(novaComparacao);
    alert('Comparação salva com sucesso!');
  };

  return (
    <div className="mb-10">
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold text-gray-800">Comparar Produtos</h2>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
            <button
              onClick={adicionarProduto}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center"
            >
              <PlusCircle size={18} className="mr-1" />
              Adicionar Produto
            </button>
            <button
              onClick={salvarComparacao}
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center"
              disabled={produtos.filter(p => p.nome && p.preco > 0 && p.quantidade > 0).length < 2}
            >
              <Save size={18} className="mr-1" />
              Salvar Comparação
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {produtos.map((produto, index) => (
            <div key={produto.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Produto {index + 1}</h3>
                {produtos.length > 2 && (
                  <button
                    onClick={() => removerProduto(produto.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remover
                  </button>
                )}
              </div>
              <ProductInput
                produto={produto}
                onChange={handleProdutoChange}
                onRemove={() => removerProduto(produto.id)}
                removerHabilitado={produtos.length > 2}
              />
            </div>
          ))}
        </div>
      </div>
      
      <ComparisonResult produtos={produtos} />

    
    </div>
  );
};

export default ComparisonForm;