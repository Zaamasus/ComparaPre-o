import React, { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { Trash2, Tag, Share2 } from 'lucide-react';

// Interface para definir a estrutura de um item de compra
interface ShoppingItem {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
}

export const ShoppingCalculator: React.FC = () => {
  // Estado para armazenar a lista de itens usando localStorage
  const [items, setItems] = useLocalStorage<ShoppingItem[]>('shopping-items', []);
  // Estados para controlar os campos do formulário
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [quantidade, setQuantidade] = useState('1');
  // Estado para controlar o modo de entrada (com ou sem nome)
  const [modoCompleto, setModoCompleto] = useState(true);
  // Contador para nomes automáticos
  const [contadorItems, setContadorItems] = useState(1);

  // Função para adicionar um novo item à lista
  const adicionarItem = () => {
    if ((!modoCompleto || nome) && preco && quantidade) {
      const nomeItem = modoCompleto ? nome : `Item ${contadorItems}`;
      const novoItem: ShoppingItem = {
        id: Date.now(),
        nome: nomeItem,
        preco: parseFloat(preco),
        quantidade: parseInt(quantidade),
      };
      setItems([...items, novoItem]);
      // Limpa os campos após adicionar
      setNome('');
      setPreco('');
      setQuantidade('1');
      // Incrementa o contador se estiver no modo rápido
      if (!modoCompleto) {
        setContadorItems(contadorItems + 1);
      }
    }
  };

  // Função para remover um item da lista
  const removerItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  // Função para limpar toda a lista
  const limparLista = () => {
    setItems([]);
    setContadorItems(1);
  };

  // Função para compartilhar no WhatsApp
  const compartilharNoWhatsApp = () => {
    if (items.length === 0) return;

    const dataAtual = new Date().toLocaleDateString('pt-BR');
    let mensagem = `🛒 Lista de Compras (${dataAtual})\n\n`;

    // Adiciona cada item à mensagem
    items.forEach((item, index) => {
      mensagem += `✨ ${index + 1}. ${item.nome}\n`;
      mensagem += `   📦 Qtd: ${item.quantidade}\n`;
      mensagem += `   💵 Preço: R$ ${item.preco.toFixed(2)}\n`;
      mensagem += `   💰 Subtotal: R$ ${(item.preco * item.quantidade).toFixed(2)}\n\n`;
    });

    // Adiciona o total
    const total = items.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);
    mensagem += `\n🛍️ Total da Compra: R$ ${total.toFixed(2)}`;

    try {
      // Tenta usar a API do WhatsApp Web primeiro
      const urlWeb = `https://web.whatsapp.com/send?text=${encodeURIComponent(mensagem)}`;
      
      // Verifica se está em um dispositivo móvel
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      
      // Se for mobile, usa a URL do WhatsApp mobile
      const urlFinal = isMobile ? `whatsapp://send?text=${encodeURIComponent(mensagem)}` : urlWeb;
      
      window.open(urlFinal, '_blank');
    } catch (error) {
      alert('Não foi possível abrir o WhatsApp. Por favor, tente novamente.');
    }
  };

  // Calcula o valor total da compra
  const total = items.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);

  return (
    <div className="p-2 md:p-4 bg-white rounded-lg shadow-md w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
        <h2 className="text-xl md:text-2xl font-bold">Calculadora de Compras</h2>
        <div className="flex flex-wrap items-center gap-2 md:gap-4 w-full md:w-auto">
          {/* Toggle para modo de entrada */}
          <div className="flex items-center gap-2">
            <span className="text-xs md:text-sm text-gray-600">Modo Rápido</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={modoCompleto}
                onChange={(e) => setModoCompleto(e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
            <span className="text-xs md:text-sm text-gray-600">Modo Completo</span>
          </div>
          {items.length > 0 && (
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              <button
                onClick={compartilharNoWhatsApp}
                className="flex items-center gap-2 bg-green-500 text-white px-3 py-1.5 md:px-4 md:py-2 rounded text-sm hover:bg-green-600 transition-colors"
                title="Compartilhar no WhatsApp"
              >
                <Share2 size={16} />
                Compartilhar
              </button>
              <button
                onClick={limparLista}
                className="flex items-center gap-2 bg-red-500 text-white px-3 py-1.5 md:px-4 md:py-2 rounded text-sm hover:bg-red-600 transition-colors"
              >
                <Trash2 size={16} />
                Limpar Lista
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Formulário para adicionar novos itens */}
      <div className="flex flex-col md:flex-row gap-2 mb-4">
        {modoCompleto && (
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome do produto"
            className="p-2 border rounded w-full md:flex-1"
          />
        )}
        <div className="flex gap-2">
          <input
            type="number"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            placeholder="Preço"
            step="0.01"
            min="0"
            className="p-2 border rounded w-full md:w-24"
          />
          <input
            type="number"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            placeholder="Qtd"
            min="1"
            className="p-2 border rounded w-full md:w-20"
          />
          <button
            onClick={adicionarItem}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 whitespace-nowrap"
          >
            Adicionar
          </button>
        </div>
      </div>

      {/* Lista de itens adicionados */}
      <div className="space-y-2">
        {items.map(item => (
          <div key={item.id} className="flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-50 p-2 rounded gap-2">
            <span className="font-medium flex items-center gap-2">
              <Tag size={16} className="text-gray-500" />
              {item.nome}
            </span>
            <div className="flex flex-wrap items-center gap-2 md:gap-4 w-full md:w-auto">
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
          <div className="text-lg md:text-xl font-bold text-blue-700">
            Total da Compra: R$ {total.toFixed(2)}
          </div>
        </div>
      )}

      {/* Rodapé com mensagem especial */}
      <div className="mt-6 text-center text-sm text-gray-500 animate-pulse">
        <p className="font-semibold italic">~ CATRINE A CHATA ~</p>
        <p className="text-xs">👑 A Rainha da Economia 👑</p>
      </div>
    </div>
  );
}; 