import React, { useState, useMemo, useEffect } from 'react';
import { Plus, Trash2, Save, FilePlus2, List, Edit2, X, CheckCircle } from 'lucide-react';
import useLocalStorage from '../hooks/useLocalStorage';
import { produtosPreDefinidos } from '../data/produtosPreDefinidos';
import Header from '../components/Header';

interface ChecklistItem {
  id: number;
  nome: string;
  feito: boolean;
  quantidade?: number;
  valor?: number;
}

interface Checklist {
  id: string;
  nome: string;
  data: string;
  itens: ChecklistItem[];
}

const ChecklistMercadoPage: React.FC = () => {
  // Todas as listas salvas
  const [listas, setListas] = useLocalStorage<Checklist[]>('checklists-mercado', []);
  // ID da lista atualmente aberta
  const [idListaAtual, setIdListaAtual] = useState<string | null>(listas[0]?.id || null);
  // Estados para nova lista
  const [criandoNova, setCriandoNova] = useState(false);
  const [nomeNovaLista, setNomeNovaLista] = useState('');

  // Estados para edição de itens da lista atual
  const listaAtual = listas.find(l => l.id === idListaAtual) || null;
  const [novoItem, setNovoItem] = useState('');
  const [quantidade, setQuantidade] = useState<number | ''>('');
  const [valor, setValor] = useState<number | ''>('');
  const [mostrarSugestoes, setMostrarSugestoes] = useState(false);
  const [sugestaoSelecionada, setSugestaoSelecionada] = useState(-1);
  const [editandoNome, setEditandoNome] = useState(false);
  const [novoNomeLista, setNovoNomeLista] = useState('');
  const [modoEdicao, setModoEdicao] = useState(false);

  // Autocomplete: sugestões de produtos predefinidos
  const sugestoesProdutos = useMemo(() => {
    if (!novoItem) return [];
    const termo = novoItem.toLowerCase();
    return produtosPreDefinidos.filter(produto => produto.nome.toLowerCase().includes(termo)).slice(0, 5);
  }, [novoItem]);

  const selecionarSugestao = (nome: string) => {
    setNovoItem(nome);
    setMostrarSugestoes(false);
    setSugestaoSelecionada(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!sugestoesProdutos.length) return;
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSugestaoSelecionada(prev => prev < sugestoesProdutos.length - 1 ? prev + 1 : prev);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSugestaoSelecionada(prev => prev > 0 ? prev - 1 : 0);
        break;
      case 'Enter':
        if (sugestaoSelecionada >= 0) {
          e.preventDefault();
          selecionarSugestao(sugestoesProdutos[sugestaoSelecionada].nome);
        }
        break;
      case 'Escape':
        setMostrarSugestoes(false);
        setSugestaoSelecionada(-1);
        break;
    }
  };

  // Adicionar item à lista atual
  const adicionarItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoItem.trim() || !listaAtual) return;
    const novo: ChecklistItem = {
      id: Date.now(),
      nome: novoItem.trim(),
      feito: false,
      quantidade: quantidade === '' ? undefined : Number(quantidade),
      valor: valor === '' ? undefined : Number(valor)
    };
    const novasListas = listas.map(l =>
      l.id === listaAtual.id ? { ...l, itens: [...l.itens, novo] } : l
    );
    setListas(novasListas);
    setNovoItem('');
    setQuantidade('');
    setValor('');
    setMostrarSugestoes(false);
    setSugestaoSelecionada(-1);
  };

  // Marcar/desmarcar item
  const alternarFeito = (id: number) => {
    if (!listaAtual) return;
    const novasListas = listas.map(l =>
      l.id === listaAtual.id
        ? { ...l, itens: l.itens.map(item => item.id === id ? { ...item, feito: !item.feito } : item) }
        : l
    );
    setListas(novasListas);
  };

  // Remover item
  const removerItem = (id: number) => {
    if (!listaAtual) return;
    const novasListas = listas.map(l =>
      l.id === listaAtual.id
        ? { ...l, itens: l.itens.filter(item => item.id !== id) }
        : l
    );
    setListas(novasListas);
  };

  // Limpar checklist
  const limparChecklist = () => {
    if (!listaAtual) return;
    if (window.confirm('Tem certeza que deseja limpar toda a checklist?')) {
      const novasListas = listas.map(l =>
        l.id === listaAtual.id ? { ...l, itens: [] } : l
      );
      setListas(novasListas);
    }
  };

  // Criar nova lista
  const criarNovaLista = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nomeNovaLista.trim()) return;
    const nova: Checklist = {
      id: Date.now().toString(),
      nome: nomeNovaLista.trim(),
      data: new Date().toISOString(),
      itens: []
    };
    setListas([nova, ...listas]);
    setIdListaAtual(nova.id);
    setNomeNovaLista('');
    setCriandoNova(false);
  };

  // Salvar lista (atualiza data)
  const salvarLista = () => {
    if (!listaAtual) return;
    const novasListas = listas.map(l =>
      l.id === listaAtual.id ? { ...l, data: new Date().toISOString() } : l
    );
    setListas(novasListas);
  };

  // Excluir lista
  const excluirLista = (id: string) => {
    if (!window.confirm('Tem certeza que deseja excluir esta lista?')) return;
    const novas = listas.filter(l => l.id !== id);
    setListas(novas);
    if (idListaAtual === id) {
      setIdListaAtual(novas[0]?.id || null);
    }
  };

  // Renomear lista
  const iniciarRenomear = () => {
    if (!listaAtual) return;
    setNovoNomeLista(listaAtual.nome);
    setEditandoNome(true);
  };
  const salvarNovoNome = () => {
    if (!listaAtual || !novoNomeLista.trim()) return;
    const novasListas = listas.map(l =>
      l.id === listaAtual.id ? { ...l, nome: novoNomeLista.trim() } : l
    );
    setListas(novasListas);
    setEditandoNome(false);
  };

  // Corrigir modo de edição ao salvar e ao trocar de lista
  useEffect(() => {
    if (listaAtual && listaAtual.itens.length > 0) {
      setModoEdicao(false);
    } else {
      setModoEdicao(true);
    }
    // eslint-disable-next-line
  }, [idListaAtual, listas.length]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="flex-grow pt-[57px] md:pt-[65px]">
        <section className="bg-blue-700 text-white py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Checklist do Mercado
              </h1>
              <p className="text-lg md:text-xl mb-6 text-blue-100 max-w-3xl mx-auto">
                Crie e salve várias listas de compras para diferentes ocasiões. Marque os itens conforme for comprando, adicione quantidade e valor se quiser, e mantenha tudo organizado!
              </p>
            </div>
          </div>
        </section>
        <div className="container mx-auto px-4 max-w-2xl flex justify-start mb-2 mt-9">
                <a
                  href="/ComparaPre-o/lista-compras"
                  className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 font-semibold px-4 py-2 rounded-md border border-blue-200 hover:bg-blue-200 transition-colors"
                >
                  <CheckCircle size={18} /> Ir para Lista de Compras
                </a>
              </div>
        <section className=" ">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
              
              {/* Seletor de listas salvas */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-2 items-center mb-2">
                  <span className="text-sm text-gray-700 font-medium flex items-center gap-1"><List size={16}/> Minhas listas:</span>
                  {listas.map(lista => (
                    <button
                      key={lista.id}
                      onClick={() => setIdListaAtual(lista.id)}
                      className={`px-3 py-1 rounded-md border text-sm font-medium flex items-center gap-1 transition-colors ${
                        lista.id === idListaAtual ? 'bg-blue-100 border-blue-300 text-blue-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                      }`}
                      title={`Criada em ${new Date(lista.data).toLocaleDateString('pt-BR')}`}
                    >
                      {lista.nome}
                      <button
                        onClick={e => { e.stopPropagation(); excluirLista(lista.id); }}
                        className="ml-1 text-red-400 hover:text-red-600"
                        title="Excluir lista"
                      >
                        <X size={14}/>
                      </button>
                      {lista.id === idListaAtual && (
                        <button
                          onClick={e => { e.stopPropagation(); iniciarRenomear(); }}
                          className="ml-1 text-gray-400 hover:text-gray-700"
                          title="Renomear lista"
                        >
                          <Edit2 size={14}/>
                        </button>
                      )}
                    </button>
                  ))}
                  <button
                    onClick={() => setCriandoNova(true)}
                    className="px-3 py-1 rounded-md border border-green-300 bg-green-50 text-green-700 font-medium flex items-center gap-1 hover:bg-green-100"
                  >
                    <FilePlus2 size={16}/> Nova lista
                  </button>
                </div>
                {criandoNova && (
                  <form onSubmit={criarNovaLista} className="flex gap-2 mt-2">
                    <input
                      type="text"
                      value={nomeNovaLista}
                      onChange={e => setNomeNovaLista(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="Nome da nova lista"
                      autoFocus
                    />
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-1">
                      <Plus size={18}/> Criar
                    </button>
                    <button type="button" onClick={() => setCriandoNova(false)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300">Cancelar</button>
                  </form>
                )}
                {editandoNome && (
                  <form onSubmit={e => {e.preventDefault(); salvarNovoNome();}} className="flex gap-2 mt-2">
                    <input
                      type="text"
                      value={novoNomeLista}
                      onChange={e => setNovoNomeLista(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="Novo nome da lista"
                      autoFocus
                    />
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-1">
                      <Save size={18}/> Salvar
                    </button>
                    <button type="button" onClick={() => setEditandoNome(false)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300">Cancelar</button>
                  </form>
                )}
              </div>
              {/* Formulário de itens da lista atual */}
              {listaAtual ? (
                <>
                  {modoEdicao && (
                    <form onSubmit={adicionarItem} className="grid grid-cols-1 sm:grid-cols-4 gap-2 mb-6 relative">
                      <div className="sm:col-span-2 relative">
                        <input
                          type="text"
                          value={novoItem}
                          onChange={e => {
                            setNovoItem(e.target.value);
                            setMostrarSugestoes(true);
                            setSugestaoSelecionada(-1);
                          }}
                          onFocus={() => setMostrarSugestoes(true)}
                          onKeyDown={handleKeyDown}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          placeholder="Adicionar novo item..."
                          autoFocus
                          autoComplete="off"
                        />
                        {/* Sugestões de autocomplete */}
                        {mostrarSugestoes && sugestoesProdutos.length > 0 && (
                          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                            {sugestoesProdutos.map((sugestao, index) => (
                              <button
                                key={sugestao.nome}
                                type="button"
                                onClick={() => selecionarSugestao(sugestao.nome)}
                                className={`w-full text-left px-4 py-2 hover:bg-blue-50 flex items-center justify-between ${
                                  index === sugestaoSelecionada ? 'bg-blue-50' : ''
                                }`}
                              >
                                <span>{sugestao.nome}</span>
                                {sugestao.categoria && (
                                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full ml-2">
                                    {sugestao.categoria}
                                  </span>
                                )}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      <input
                        type="number"
                        value={quantidade}
                        onChange={e => setQuantidade(e.target.value === '' ? '' : Number(e.target.value))}
                        min="1"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="Qtd (opcional)"
                      />
                      <input
                        type="number"
                        value={valor}
                        onChange={e => setValor(e.target.value === '' ? '' : Number(e.target.value))}
                        min="0"
                        step="0.01"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="Valor (opcional)"
                      />
                      <button
                        type="submit"
                        className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-1 justify-center"
                      >
                        <Plus size={18} />
                        Adicionar
                      </button>
                    </form>
                  )}
                  <ul className="space-y-2">
                    {listaAtual.itens.length === 0 && (
                      <li className="text-gray-400 text-center">Nenhum item na checklist.</li>
                    )}
                    {listaAtual.itens.map(item => (
                      <li key={item.id} className={`flex items-center justify-between bg-white rounded-lg px-4 py-2 shadow-sm ${item.feito ? 'opacity-60' : ''}`}>
                        <label className="flex items-center gap-2 cursor-pointer flex-1">
                          <input
                            type="checkbox"
                            checked={item.feito}
                            onChange={() => alternarFeito(item.id)}
                            className="accent-blue-600 w-5 h-5"
                          />
                          <span className={`text-base ${item.feito ? 'line-through text-gray-400' : 'text-gray-800'}`}>{item.nome}</span>
                          {item.quantidade !== undefined && (
                            <span className="text-xs text-gray-500 ml-2">Qtd: {item.quantidade}</span>
                          )}
                          {item.valor !== undefined && (
                            <span className="text-xs text-gray-500 ml-2">R$ {item.valor.toFixed(2)}</span>
                          )}
                        </label>
                        <button
                          onClick={() => removerItem(item.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                          title="Remover"
                          disabled={!modoEdicao}
                        >
                          <Trash2 size={18} />
                        </button>
                      </li>
                    ))}
                  </ul>
                  {listaAtual.itens.length > 0 && (
                    <div className="flex gap-2 mt-6 justify-center">
                      {modoEdicao ? (
                        <>
                          <button
                            type="button"
                            onClick={() => { salvarLista(); setModoEdicao(false); }}
                            className="flex-1 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 font-medium flex items-center justify-center gap-2 max-w-xs"
                          >
                            <Save size={18}/> Salvar Lista
                          </button>
                          <button
                            onClick={limparChecklist}
                            className="flex-1 bg-red-100 text-red-700 py-2 rounded-md hover:bg-red-200 font-medium max-w-xs"
                          >
                            Limpar Checklist
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => setModoEdicao(true)}
                          className="bg-blue-100 text-blue-700 py-2 px-6 rounded-md hover:bg-blue-200 font-medium mx-auto"
                          style={{marginTop: '16px'}}
                        >
                          Editar Lista
                        </button>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <div className="text-gray-500 text-center py-8">Nenhuma lista selecionada. Crie uma nova lista para começar!</div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ChecklistMercadoPage; 