import React, { useState,} from 'react';
import { Trash2, Plus, Share2, CheckCircle } from 'lucide-react';
import useLocalStorage from '../hooks/useLocalStorage';
import Header from '../components/Header';

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
                  <h2 className="text-xl font-bold text-gray-800">Comparativo Mensal do Histórico</h2>
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
                <p className="text-gray-600 text-sm mb-6">Veja abaixo um resumo mensal das suas compras. O painel mostra o total gasto, a quantidade de itens e todas as compras feitas em cada mês. Os destaques indicam o mês com maior gasto (<span className='text-red-600 font-semibold'>vermelho</span>) e o mês com mais itens comprados (<span className='text-blue-600 font-semibold'>azul</span>).</p>
                {(() => {
                  // Agrupa por 'YYYY-MM'
                  const meses: { [mes: string]: CompraHistorico[] } = {};
                  historico.forEach(compra => {
                    const data = new Date(compra.data);
                    const mes = `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}`;
                    if (!meses[mes]) meses[mes] = [];
                    meses[mes].push(compra);
                  });

                  // Ordena meses do mais recente para o mais antigo
                  const mesesOrdenados = Object.entries(meses).sort((a, b) => b[0].localeCompare(a[0]));

                  // Descobre destaques (agora por compra individual)
                  let compraMaisCara: CompraHistorico | null = null;
                  let compraMaisItens: CompraHistorico | null = null;
                  let maiorGasto = 0;
                  let maiorQtd = 0;

                  historico.forEach((compra) => {
                    if (compra.total > maiorGasto) {
                      maiorGasto = compra.total;
                      compraMaisCara = compra;
                    }
                    if (compra.quantidadeTotal > maiorQtd) {
                      maiorQtd = compra.quantidadeTotal;
                      compraMaisItens = compra;
                    }
                  });

                  // Função para exibir mês/ano bonito
                  const formatarMes = (mes: string) => {
                    const [ano, m] = mes.split('-');
                    const nomes = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
                    return `${nomes[parseInt(m,10)-1]}/${ano}`;
                  };

                  // Função para exibir data e hora completa
                  const formatarDataHora = (iso: string) => {
                    const d = new Date(iso);
                    return d.toLocaleString('pt-BR');
                  };

                  return (
                    <div className="space-y-8">
                      {mesesOrdenados.map(([mes, compras]) => (
                        <div key={mes} className="bg-gray-50 rounded-xl p-6">
                          <h3 className="text-xl font-bold text-gray-800 mb-4">{formatarMes(mes)}</h3>
                          <div className="grid gap-4">
                            {compras.map((compra) => (
                              <div 
                                key={compra.id}
                                className={`rounded-xl p-5 shadow border-2 bg-white flex flex-col gap-3 relative
                                  ${compra === compraMaisCara ? 'border-red-400' : ''}
                                  ${compra === compraMaisItens ? 'border-blue-400' : 'border-gray-200'}
                                `}
                              >
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="font-semibold text-gray-700">
                                    {formatarDataHora(compra.data)}
                                  </span>
                                  {compra === compraMaisCara && (
                                    <span className="px-2 py-0.5 rounded bg-red-100 text-red-700 text-xs font-semibold">
                                      Maior gasto
                                    </span>
                                  )}
                                  {compra === compraMaisItens && (
                                    <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-700 text-xs font-semibold">
                                      Mais itens
                                    </span>
                                  )}
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <span className="text-gray-500 text-sm">Total da compra:</span>
                                    <p className="font-bold text-green-700 text-lg">
                                      R$ {compra.total.toFixed(2)}
                                    </p>
                                  </div>
                                  <div>
                                    <span className="text-gray-500 text-sm">Quantidade de itens:</span>
                                    <p className="font-bold text-blue-700 text-lg">
                                      {compra.quantidadeTotal}
                                    </p>
                                  </div>
                                </div>

                                <div className="mt-2">
                                  <span className="text-gray-500 text-sm block mb-2">Itens desta compra:</span>
                                  <div className="grid gap-2">
                                    {compra.itens.map((item) => (
                                      <div key={item.id} className="text-sm bg-gray-50 p-2 rounded flex justify-between items-center">
                                        <div>
                                          <span className="font-medium">{item.nome}</span>
                                          {item.observacao && (
                                            <span className="text-gray-500 text-xs ml-2">({item.observacao})</span>
                                          )}
                                        </div>
                                        <div className="text-right">
                                          <span className="text-gray-600">{item.quantidade}x</span>
                                          <span className="ml-2 font-medium">R$ {item.preco.toFixed(2)}</span>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default ListaComprasPage; 