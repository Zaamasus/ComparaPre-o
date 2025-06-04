import React, { useState,} from 'react';
import { Trash2, Plus, Share2, CheckCircle, TrendingUp } from 'lucide-react';
import useLocalStorage from '../hooks/useLocalStorage';
import Header from '../components/Header';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ItemCompra {
  id: number;
  nome: string;
  quantidade: number;
  preco: number;
  categoria?: string;
  observacao?: string;
}

interface CompraHistorico {
  id: string;
  data: string; // ISO
  itens: ItemCompra[];
  total: number;
  quantidadeTotal: number;
}

const ListaComprasPage: React.FC = () => {
  const [itens, setItens] = useLocalStorage<ItemCompra[]>('lista-compras', []);
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState(1);
  const [preco, setPreco] = useState(0);
  const [categoria, setCategoria] = useState('');
  const [observacao, setObservacao] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [modoFacil, setModoFacil] = useState(false);
  const [contadorFacil, setContadorFacil] = useState(1);
  const [historico, setHistorico] = useLocalStorage<CompraHistorico[]>('historico-compras', []);

  const categorias = [
    'Alimentos',
    'Bebidas',
    'Limpeza',
    'Higiene',
    'Outros'
  ];

  const adicionarItem = (e: React.FormEvent) => {
    e.preventDefault();
    let nomeItem = nome;
    let categoriaItem = categoria;
    if (modoFacil) {
      nomeItem = `Item ${contadorFacil}`;
      categoriaItem = 'Outros';
    }
    const novoItem: ItemCompra = {
      id: Date.now(),
      nome: nomeItem,
      quantidade,
      preco,
      categoria: categoriaItem || 'Outros',
      observacao
    };
    setItens([...itens, novoItem]);
    setNome('');
    setQuantidade(1);
    setPreco(0);
    setCategoria('');
    setObservacao('');
    if (modoFacil) setContadorFacil(contadorFacil + 1);
  };

  const removerItem = (id: number) => {
    setItens(itens.filter(item => item.id !== id));
  };

  const limparLista = () => {
    if (window.confirm('Tem certeza que deseja limpar toda a lista?')) {
      setItens([]);
      setContadorFacil(1);
    }
  };

  const finalizarCompra = () => {
    if (itens.length === 0) return;
    if (!window.confirm('Deseja finalizar e salvar esta compra no histórico?')) return;
    const total = itens.reduce((acc, item) => acc + (item.quantidade * item.preco), 0);
    const quantidadeTotal = itens.reduce((acc, item) => acc + item.quantidade, 0);
    const novaCompra: CompraHistorico = {
      id: `${Date.now()}`,
      data: new Date().toISOString(),
      itens,
      total,
      quantidadeTotal
    };
    setHistorico([novaCompra, ...historico]);
    setItens([]);
    setContadorFacil(1);
    alert('Compra salva no histórico!');
  };

  const compartilharLista = () => {
    if (itens.length === 0) return;

    const dataAtual = new Date().toLocaleDateString('pt-BR');
    let mensagem = `🛒 Lista de Compras (${dataAtual})\n\n`;

    itens.forEach((item, index) => {
      mensagem += `${index + 1}. ${item.nome}\n`;
      mensagem += `   📦 Qtd: ${item.quantidade}\n`;
      mensagem += `   💵 Preço: R$ ${item.preco.toFixed(2)}\n`;
      mensagem += `   💰 Subtotal: R$ ${(item.quantidade * item.preco).toFixed(2)}\n`;
      if (item.observacao) {
        mensagem += `   📝 Obs: ${item.observacao}\n`;
      }
      mensagem += '\n';
    });

    const total = itens.reduce((acc, item) => acc + (item.quantidade * item.preco), 0);
    mensagem += `\n🛍️ Total da Compra: R$ ${total.toFixed(2)}`;

    const url = `whatsapp://send?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
  };

  const itensFiltrados = filtroCategoria
    ? itens.filter(item => item.categoria === filtroCategoria)
    : itens;

  const total = itensFiltrados.reduce((acc, item) => acc + (item.quantidade * item.preco), 0);

  // Função para formatar data e hora
  const formatarDataHora = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleString('pt-BR');
  };

  // Função para formatar preço
  const formatarPreco = (valor: number) => {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="flex-grow pt-[57px] md:pt-[65px]">
        <section className="bg-blue-700 text-white py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Lista de Compras
              </h1>
              <p className="text-lg md:text-xl mb-6 text-blue-100 max-w-3xl mx-auto">
                Organize suas compras, adicione itens e mantenha o controle do seu orçamento.
                Planeje suas compras de forma inteligente e economize.
              </p>
            </div>
          </div>
        </section>

        <section className="py-8 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-medium text-gray-700">Modo Fácil</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={modoFacil}
                    onChange={e => setModoFacil(e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                </label>
                <span className="text-xs text-gray-500">(Sem nome/categoria)</span>
              </div>

              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Adicionar Item</h2>
                <div className="flex gap-2">
                  <button
                    onClick={compartilharLista}
                    className="flex items-center justify-center bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition-colors"
                    disabled={itens.length === 0}
                    title="Compartilhar"
                  >
                    <Share2 size={20} />
                  </button>
                  <button
                    onClick={limparLista}
                    className="flex items-center justify-center bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors"
                    disabled={itens.length === 0}
                    title="Limpar Lista"
                  >
                    <Trash2 size={20} />
                  </button>
                  <button
                    onClick={finalizarCompra}
                    className="flex items-center justify-center bg-blue-700 text-white p-2 rounded-md hover:bg-blue-800 transition-colors"
                    disabled={itens.length === 0}
                    title="Finalizar e Salvar Compra"
                  >
                    <CheckCircle size={20} />
                  </button>
                </div>
              </div>

              <form onSubmit={adicionarItem} className="mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {!modoFacil && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Item</label>
                      <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                  )}
                  {!modoFacil && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                      <select
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="">Selecione uma categoria</option>
                        {categorias.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Quantidade</label>
                    <input
                      type="number"
                      value={quantidade}
                      onChange={(e) => setQuantidade(Number(e.target.value))}
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preço (R$)</label>
                    <input
                      type="number"
                      value={preco}
                      onChange={(e) => setPreco(Number(e.target.value))}
                      step="0.01"
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Observação</label>
                    <input
                      type="text"
                      value={observacao}
                      onChange={(e) => setObservacao(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="Adicione uma observação (opcional)"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Plus size={20} />
                  Adicionar Item
                </button>
              </form>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Filtrar por Categoria</label>
                <select
                  value={filtroCategoria}
                  onChange={(e) => setFiltroCategoria(e.target.value)}
                  className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Todas as categorias</option>
                  {categorias.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Lista responsiva de itens */}
              <div className="block md:hidden space-y-3">
                {itensFiltrados.length === 0 && (
                  <div className="text-gray-500 text-center py-4">Nenhum item adicionado.</div>
                )}
                {itensFiltrados.map(item => (
                  <div key={item.id} className="bg-gray-50 rounded-lg p-3 shadow flex flex-col gap-1 relative">
                    <button
                      onClick={() => removerItem(item.id)}
                      className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                      title="Remover"
                    >
                      <Trash2 size={18} />
                    </button>
                    <div className="font-bold text-blue-700">{item.nome}</div>
                    {item.observacao && (
                      <div className="text-xs text-gray-500">{item.observacao}</div>
                    )}
                    <div className="text-xs text-gray-600">Categoria: <span className="font-medium">{item.categoria}</span></div>
                    <div className="text-xs text-gray-600">Quantidade: <span className="font-medium">{item.quantidade}</span></div>
                    <div className="text-xs text-gray-600">Preço Unit.: <span className="font-medium">R$ {item.preco.toFixed(2)}</span></div>
                    <div className="text-xs text-gray-600">Total: <span className="font-medium">R$ {(item.quantidade * item.preco).toFixed(2)}</span></div>
                  </div>
                ))}
                {itensFiltrados.length > 0 && (
                  <div className="bg-blue-50 rounded-lg p-3 text-blue-700 font-bold text-center mt-2">
                    Total Geral: R$ {total.toFixed(2)}
                  </div>
                )}
              </div>

              {/* Tabela tradicional para telas médias/grandes */}
              <div className="overflow-x-auto hidden md:block">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-2 text-left">Item</th>
                      <th className="px-4 py-2 text-left">Categoria</th>
                      <th className="px-4 py-2 text-left">Quantidade</th>
                      <th className="px-4 py-2 text-left">Preço Unit.</th>
                      <th className="px-4 py-2 text-left">Total</th>
                      <th className="px-4 py-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {itensFiltrados.map(item => (
                      <tr key={item.id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-2">
                          <div>
                            <div className="font-medium">{item.nome}</div>
                            {item.observacao && (
                              <div className="text-sm text-gray-500">{item.observacao}</div>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-2">{item.categoria}</td>
                        <td className="px-4 py-2">{item.quantidade}</td>
                        <td className="px-4 py-2">R$ {item.preco.toFixed(2)}</td>
                        <td className="px-4 py-2">R$ {(item.quantidade * item.preco).toFixed(2)}</td>
                        <td className="px-4 py-2">
                          <button
                            onClick={() => removerItem(item.id)}
                            className="text-red-600 hover:text-red-800"
                            title="Remover"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="font-bold bg-gray-50">
                      <td colSpan={4} className="px-4 py-2 text-right">Total Geral:</td>
                      <td className="px-4 py-2">R$ {total.toFixed(2)}</td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Painel comparativo do histórico */}
        {historico.length > 0 && (
          <section className="py-8">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between mb-2 gap-2 flex-wrap">
                  <h2 className="text-xl font-bold text-gray-800">Comparativo do Histórico</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        if(window.confirm('Tem certeza que deseja apagar todo o histórico de compras? Essa ação não pode ser desfeita.')){
                          setHistorico([]);
                        }
                      }}
                      className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded text-sm font-semibold border border-red-300"
                    >
                      Limpar Histórico
                    </button>
                  </div>
                </div>

                {/* Gráficos */}
                <div className="mb-8 space-y-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <TrendingUp className="text-blue-600" size={20} />
                      Evolução dos Gastos
                    </h3>
                    <Line
                      data={{
                        labels: historico.map(compra => {
                          const data = new Date(compra.data);
                          return data.toLocaleDateString('pt-BR');
                        }).reverse(),
                        datasets: [
                          {
                            label: 'Valor Total (R$)',
                            data: historico.map(compra => compra.total).reverse(),
                            borderColor: 'rgb(59, 130, 246)',
                            backgroundColor: 'rgba(59, 130, 246, 0.5)',
                            tension: 0.4,
                          },
                        ],
                      }}
                      options={{
                        responsive: true,
                        plugins: {
                          legend: {
                            position: 'top' as const,
                          },
                          tooltip: {
                            callbacks: {
                              label: function(context) {
                                return `R$ ${context.raw?.toString()}`;
                              }
                            }
                          }
                        },
                        scales: {
                          y: {
                            beginAtZero: true,
                            ticks: {
                              callback: function(value) {
                                return `R$ ${value}`;
                              }
                            }
                          }
                        }
                      }}
                    />
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Quantidade de Itens por Compra</h3>
                    <Bar
                      data={{
                        labels: historico.map(compra => {
                          const data = new Date(compra.data);
                          return data.toLocaleDateString('pt-BR');
                        }).reverse(),
                        datasets: [
                          {
                            label: 'Quantidade de Itens',
                            data: historico.map(compra => compra.quantidadeTotal).reverse(),
                            backgroundColor: 'rgba(99, 102, 241, 0.5)',
                            borderColor: 'rgb(99, 102, 241)',
                            borderWidth: 1,
                          },
                        ],
                      }}
                      options={{
                        responsive: true,
                        plugins: {
                          legend: {
                            position: 'top' as const,
                          },
                        },
                        scales: {
                          y: {
                            beginAtZero: true,
                            ticks: {
                              stepSize: 1
                            }
                          }
                        }
                      }}
                    />
                  </div>
                </div>

                {/* Lista de Compras */}
                <div className="space-y-4">
                  {historico.map((compra, index) => {
                    const isUltima = index === 0;
                    const dataCompra = new Date(compra.data);
                    const mesAno = dataCompra.toLocaleString('pt-BR', { month: 'long', year: 'numeric' });
                    
                    // Encontra a compra mais cara e com mais itens
                    const isMaisCara = compra.total === Math.max(...historico.map(c => c.total));
                    const isMaisItens = compra.quantidadeTotal === Math.max(...historico.map(c => c.quantidadeTotal));
                    
                    // Calcula diferenças percentuais em relação à média
                    const mediaTotal = historico.reduce((acc, c) => acc + c.total, 0) / historico.length;
                    const mediaItens = historico.reduce((acc, c) => acc + c.quantidadeTotal, 0) / historico.length;
                    
                    const diffTotal = ((compra.total - mediaTotal) / mediaTotal) * 100;
                    const diffItens = ((compra.quantidadeTotal - mediaItens) / mediaItens) * 100;

                    return (
                      <div 
                        key={compra.id}
                        className={`rounded-xl p-5 border-2 bg-white
                          ${isUltima ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
                          ${isMaisCara ? 'border-red-400' : isMaisItens ? 'border-blue-400' : 'border-gray-200'}
                        `}
                      >
                        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">{mesAno}</h3>
                            <p className="text-sm text-gray-500">{formatarDataHora(compra.data)}</p>
                          </div>
                          <div className="flex gap-2">
                            {isMaisCara && (
                              <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                                Maior gasto
                              </span>
                            )}
                            {isMaisItens && (
                              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                                Mais itens
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-500">Total da compra:</p>
                            <p className="text-xl font-bold text-green-700">{formatarPreco(compra.total)}</p>
                            {!isNaN(diffTotal) && (
                              <p className={`text-xs ${diffTotal > 0 ? 'text-red-600' : 'text-green-600'}`}>
                                {diffTotal > 0 ? '↑' : '↓'} {Math.abs(diffTotal).toFixed(1)}% em relação à média
                              </p>
                            )}
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Quantidade de itens:</p>
                            <p className="text-xl font-bold text-blue-700">{compra.quantidadeTotal}</p>
                            {!isNaN(diffItens) && (
                              <p className={`text-xs ${diffItens > 0 ? 'text-red-600' : 'text-green-600'}`}>
                                {diffItens > 0 ? '↑' : '↓'} {Math.abs(diffItens).toFixed(1)}% em relação à média
                              </p>
                            )}
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-2">Itens desta compra:</p>
                          <div className="space-y-2">
                            {compra.itens.map((item) => (
                              <div 
                                key={item.id}
                                className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                              >
                                <div className="flex-1">
                                  <p className="font-medium text-gray-800">{item.nome}</p>
                                  {item.observacao && (
                                    <p className="text-xs text-gray-500">{item.observacao}</p>
                                  )}
                                </div>
                                <div className="text-right">
                                  <p className="text-sm font-medium text-gray-800">
                                    {item.quantidade}x {formatarPreco(item.preco)}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    Total: {formatarPreco(item.quantidade * item.preco)}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default ListaComprasPage; 