import React from 'react';
import { Produto } from '../types';
import { Trash2 } from 'lucide-react';

interface ProductInputProps {
  produto: Produto;
  onChange: (produto: Produto) => void;
  onRemove: () => void;
  removerHabilitado: boolean;
}

const ProductInput: React.FC<ProductInputProps> = ({ 
  produto, 
  onChange, 
  onRemove,
  removerHabilitado
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const novoValor = name === 'preco' || name === 'quantidade' 
      ? parseFloat(value) || 0 
      : value;
    
    onChange({
      ...produto,
      [name]: novoValor,
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-4 border-l-4 border-blue-500">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Detalhes do Produto</h3>
        {removerHabilitado && (
          <button 
            onClick={onRemove}
            className="text-red-500 hover:text-red-700 transition-colors"
            aria-label="Remover produto"
          >
            <Trash2 size={20} />
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label htmlFor={`nome-${produto.id}`} className="block text-sm font-medium text-gray-700 mb-1">
            Nome do Produto
          </label>
          <input
            type="text"
            id={`nome-${produto.id}`}
            name="nome"
            value={produto.nome}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ex: Detergente Marca X"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor={`preco-${produto.id}`} className="block text-sm font-medium text-gray-700 mb-1">
              Preço (R$)
            </label>
            <input
              type="number"
              id={`preco-${produto.id}`}
              name="preco"
              value={produto.preco || ''}
              onChange={handleChange}
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0,00"
            />
          </div>
          
          <div>
            <label htmlFor={`quantidade-${produto.id}`} className="block text-sm font-medium text-gray-700 mb-1">
              Quantidade
            </label>
            <input
              type="number"
              id={`quantidade-${produto.id}`}
              name="quantidade"
              value={produto.quantidade || ''}
              onChange={handleChange}
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor={`unidade-${produto.id}`} className="block text-sm font-medium text-gray-700 mb-1">
            Unidade de Medida
          </label>
          <select
            id={`unidade-${produto.id}`}
            name="unidade"
            value={produto.unidade}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ml">Mililitros (ml)</option>
            <option value="l">Litros (L)</option>
            <option value="g">Gramas (g)</option>
            <option value="kg">Quilogramas (kg)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProductInput;