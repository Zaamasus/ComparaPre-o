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
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    onChange({
      ...produto,
      [name]: name === 'preco' || name === 'quantidade' ? Number(value) : value,
    });
  };

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Nome do Produto
        </label>
        <input
          type="text"
          name="nome"
          value={produto.nome}
          onChange={handleChange}
          placeholder="Ex: Detergente Marca X"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Preço (R$)
          </label>
          <input
            type="number"
            name="preco"
            value={produto.preco}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Quantidade
          </label>
          <input
            type="number"
            name="quantidade"
            value={produto.quantidade}
            onChange={handleChange}
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Unidade de Medida
        </label>
        <select
          name="unidade"
          value={produto.unidade}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="ml">Mililitros (ml)</option>
          <option value="l">Litros (l)</option>
          <option value="g">Gramas (g)</option>
          <option value="kg">Quilogramas (kg)</option>
          <option value="un">Unidades (un)</option>
        </select>
      </div>
    </div>
  );
};

export default ProductInput;