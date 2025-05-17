import React, { useState } from 'react';

// Interface para definir a estrutura de um item de compra
interface ShoppingItem {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
}

export const ShoppingCalculator: React.FC = () => {
  // Estado para armazenar a lista de itens
  const [items, setItems] = useState<ShoppingItem[]>([]);
  // Estados para controlar os campos do formulário
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [quantidade, setQuantidade] = useState('1');

  // Função para adicionar um novo item à lista
  const adicionarItem = () => {
    if (nome && preco && quantidade) {
      const novoItem: ShoppingItem = {
        id: Date.now(), // Usa timestamp como ID único
        nome,
        preco: parseFloat(preco),
        quantidade: parseInt(quantidade),
      };
      setItems([...items, novoItem]);
      // Limpa os campos após adicionar
      setNome('');
      setPreco('');
      setQuantidade('1');
    }
  };

  // Função para remover um item da lista
  const removerItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  // Calcula o valor total da compra
  const total = items.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Calculadora de Compras</h2>
      
      {/* Formulário para adicionar novos itens */}
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome do produto"
          className="p-2 border rounded flex-1"
        />
        <input
          type="number"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          placeholder="Preço"
          step="0.01"
          min="0"
          className="p-2 border rounded w-24"
        />
        <input
          type="number"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
          placeholder="Qtd"
          min="1"
          className="p-2 border rounded w-20"
        />
        <button
          onClick={adicionarItem}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Adicionar
        </button>
      </div>

      {/* Lista de itens adicionados */}
      <div className="space-y-2">
        {items.map(item => (
          <div key={item.id} className="flex flex-wrap justify-between items-center bg-gray-50 p-2 rounded">
            <span className="font-medium">{item.nome}</span>
            <div className="flex items-center gap-4">
              <span>{item.quantidade}x</span>
              <span>R$ {item.preco.toFixed(2)}</span>
              <span className="font-semibold">Total: R$ {(item.preco * item.quantidade).toFixed(2)}</span>
              <button
                onClick={() => removerItem(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                Remover
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Exibe o total apenas se houver itens na lista */}
      {items.length > 0 && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <div className="text-xl font-bold text-blue-700">
            Total da Compra: R$ {total.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
}; 