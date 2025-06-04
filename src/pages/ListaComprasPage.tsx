import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Trash2, Plus, Share2, CheckCircle, TrendingUp, PieChart, BarChart, Search, Tag, Pencil, X } from 'lucide-react';
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
  ArcElement,
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { produtosPreDefinidos } from '../data/produtosPreDefinidos';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
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
  const [preco, setPreco] = useState<number | null>(null);
  const [categoria, setCategoria] = useState('');
  const [observacao, setObservacao] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [modoFacil, setModoFacil] = useState(false);
  const [usarCategoria, setUsarCategoria] = useState(true);
  const [historico, setHistorico] = useLocalStorage<CompraHistorico[]>('historico-compras', []);
  const [tipoGrafico, setTipoGrafico] = useState<'evolucao' | 'quantidade' | 'categoria'>('evolucao');
  const [sugestaoSelecionada, setSugestaoSelecionada] = useState(-1);
  const [mostrarSugestoes, setMostrarSugestoes] = useState(false);
  const [orcamento, setOrcamento] = useLocalStorage<number | null>('orcamento-compras', null);
  const [editandoItem, setEditandoItem] = useState<ItemCompra | null>(null);
  const [editandoValores, setEditandoValores] = useState({
    nome: '',
    quantidade: 1,
    preco: 0,
    categoria: '',
    observacao: ''
  });
  const sugestoesRef = useRef<HTMLDivElement>(null);
  const [usarObservacao, setUsarObservacao] = useState(false);
  const [mostrarFiltroCategoria, setMostrarFiltroCategoria] = useState(false);

  const categorias = [
    { id: 'Alimentos', nome: 'Alimentos', cor: 'bg-green-100 text-green-800', icone: '🍽️' },
    { id: 'Bebidas', nome: 'Bebidas', cor: 'bg-blue-100 text-blue-800', icone: '🥤' },
    { id: 'Limpeza', nome: 'Limpeza', cor: 'bg-purple-100 text-purple-800', icone: '🧹' },
    { id: 'Higiene', nome: 'Higiene', cor: 'bg-pink-100 text-pink-800', icone: '🧴' },
    { id: 'Outros', nome: 'Outros', cor: 'bg-gray-100 text-gray-800', icone: '📦' }
  ];

  // Calcular o próximo número para o modo fácil baseado nos itens existentes
  const proximoNumeroModoFacil = useMemo(() => {
    const itensNumerados = itens
      .filter(item => item.nome.startsWith('Item '))
      .map(item => {
        const numero = parseInt(item.nome.replace('Item ', ''));
        return isNaN(numero) ? 0 : numero;
      });
    
    return itensNumerados.length > 0 ? Math.max(...itensNumerados) + 1 : 1;
  }, [itens]);

  // Função para obter sugestões únicas do histórico e produtos predefinidos
  const sugestoesProdutos = useMemo(() => {
    const produtos = new Map<string, string | undefined>();
    
    // Adiciona produtos predefinidos
    produtosPreDefinidos.forEach(produto => {
      produtos.set(produto.nome, produto.categoria);
    });
    
    // Adiciona produtos do histórico
    historico.forEach(compra => {
      compra.itens.forEach(item => {
        if (!produtos.has(item.nome)) {
          produtos.set(item.nome, item.categoria);
        }
      });
    });
    
    // Adiciona produtos da lista atual
    itens.forEach(item => {
      if (!produtos.has(item.nome)) {
        produtos.set(item.nome, item.categoria);
      }
    });
    
    return Array.from(produtos.entries()).map(([nome, categoria]) => ({
      nome,
      categoria
    }));
  }, [historico, itens]);

  // Filtra sugestões baseado no input atual
  const sugestoesFiltradas = useMemo(() => {
    if (!nome) return [];
    const termoBusca = nome.toLowerCase();
    return sugestoesProdutos
      .filter(produto => produto.nome.toLowerCase().includes(termoBusca))
      .slice(0, 5); // Limita a 5 sugestões
  }, [nome, sugestoesProdutos]);

  // Fecha sugestões quando clicar fora
  useEffect(() => {
    const handleClickFora = (event: MouseEvent) => {
      if (sugestoesRef.current && !sugestoesRef.current.contains(event.target as Node)) {
        setMostrarSugestoes(false);
      }
    };

    document.addEventListener('mousedown', handleClickFora);
    return () => {
      document.removeEventListener('mousedown', handleClickFora);
    };
  }, []);

  // Função para selecionar uma sugestão
  const selecionarSugestao = (sugestao: { nome: string; categoria?: string }) => {
    setNome(sugestao.nome);
    if (usarCategoria && sugestao.categoria) {
      setCategoria(sugestao.categoria);
    }
    setMostrarSugestoes(false);
    setSugestaoSelecionada(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!sugestoesFiltradas.length) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSugestaoSelecionada(prev => 
          prev < sugestoesFiltradas.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSugestaoSelecionada(prev => prev > 0 ? prev - 1 : 0);
        break;
      case 'Enter':
        if (sugestaoSelecionada >= 0) {
          e.preventDefault();
          selecionarSugestao(sugestoesFiltradas[sugestaoSelecionada]);
        }
        break;
      case 'Escape':
        setMostrarSugestoes(false);
        setSugestaoSelecionada(-1);
        break;
    }
  };

  const adicionarItem = (e: React.FormEvent) => {
    e.preventDefault();
    let nomeItem = nome;
    let categoriaItem = categoria;
    
    if (modoFacil) {
      nomeItem = `Item ${proximoNumeroModoFacil}`;
      categoriaItem = 'Outros';
    }
    
    const novoItem: ItemCompra = {
      id: Date.now(),
      nome: nomeItem,
      quantidade,
      preco: preco || 0,
      categoria: categoriaItem || 'Outros',
      observacao: usarObservacao ? observacao : ''
    };
    
    setItens([...itens, novoItem]);
    setNome('');
    setQuantidade(1);
    setPreco(null);
    setCategoria('');
    setObservacao('');
  };

  const iniciarEdicao = (item: ItemCompra) => {
    setEditandoItem(item);
    setEditandoValores({
      nome: item.nome,
      quantidade: item.quantidade,
      preco: item.preco,
      categoria: item.categoria || '',
      observacao: item.observacao || ''
    });
  };

  const salvarEdicaoInline = (itemId: number) => {
    const itensAtualizados = itens.map(item => 
      item.id === itemId 
        ? {
            ...item,
            nome: editandoValores.nome,
            quantidade: editandoValores.quantidade,
            preco: editandoValores.preco,
            categoria: editandoValores.categoria || 'Outros',
            observacao: editandoValores.observacao
          }
        : item
    );

    setItens(itensAtualizados);
    setEditandoItem(null);
  };

  const cancelarEdicaoInline = () => {
    setEditandoItem(null);
  };

  const removerItem = (id: number) => {
    setItens(itens.filter(item => item.id !== id));
  };

  const limparLista = () => {
    if (window.confirm('Tem certeza que deseja limpar toda a lista?')) {
      setItens([]);
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

  // Função para gerar dados fictícios
  const gerarDadosFicticios = () => {
    const produtos = [
      { nome: 'Arroz', categoria: 'Alimentos', precoMin: 15, precoMax: 25 },
      { nome: 'Feijão', categoria: 'Alimentos', precoMin: 5, precoMax: 12 },
      { nome: 'Óleo', categoria: 'Alimentos', precoMin: 8, precoMax: 15 },
      { nome: 'Macarrão', categoria: 'Alimentos', precoMin: 3, precoMax: 8 },
      { nome: 'Café', categoria: 'Alimentos', precoMin: 15, precoMax: 30 },
      { nome: 'Açúcar', categoria: 'Alimentos', precoMin: 3, precoMax: 8 },
      { nome: 'Leite', categoria: 'Alimentos', precoMin: 4, precoMax: 8 },
      { nome: 'Pão', categoria: 'Alimentos', precoMin: 5, precoMax: 12 },
      { nome: 'Detergente', categoria: 'Limpeza', precoMin: 2, precoMax: 5 },
      { nome: 'Sabão em Pó', categoria: 'Limpeza', precoMin: 15, precoMax: 30 },
      { nome: 'Amaciante', categoria: 'Limpeza', precoMin: 10, precoMax: 25 },
      { nome: 'Desinfetante', categoria: 'Limpeza', precoMin: 8, precoMax: 15 },
      { nome: 'Papel Higiênico', categoria: 'Higiene', precoMin: 12, precoMax: 25 },
      { nome: 'Shampoo', categoria: 'Higiene', precoMin: 8, precoMax: 20 },
      { nome: 'Sabonete', categoria: 'Higiene', precoMin: 2, precoMax: 5 },
      { nome: 'Creme Dental', categoria: 'Higiene', precoMin: 3, precoMax: 8 },
      { nome: 'Refrigerante', categoria: 'Bebidas', precoMin: 5, precoMax: 12 },
      { nome: 'Suco', categoria: 'Bebidas', precoMin: 4, precoMax: 10 },
      { nome: 'Água Mineral', categoria: 'Bebidas', precoMin: 2, precoMax: 5 },
      { nome: 'Cerveja', categoria: 'Bebidas', precoMin: 12, precoMax: 25 }
    ];

    const observacoes = [
      'Promoção',
      'Marca preferida',
      'Última unidade',
      'Preço bom',
      'Validade próxima',
      'Embalagem econômica'
    ];

    // Função para gerar número aleatório entre min e max
    const aleatorio = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

    // Função para gerar data aleatória nos últimos 6 meses
    const gerarData = () => {
      const hoje = new Date();
      const seismesesAtras = new Date();
      seismesesAtras.setMonth(hoje.getMonth() - 6);
      return new Date(seismesesAtras.getTime() + Math.random() * (hoje.getTime() - seismesesAtras.getTime()));
    };

    // Gerar 10 compras aleatórias
    const novasCompras: CompraHistorico[] = Array.from({ length: 10 }, () => {
      const numItens = aleatorio(3, 8);
      const itens: ItemCompra[] = Array.from({ length: numItens }, () => {
        const produto = produtos[aleatorio(0, produtos.length - 1)];
        return {
          id: Date.now() + aleatorio(1, 1000000),
          nome: produto.nome,
          quantidade: aleatorio(1, 5),
          preco: aleatorio(produto.precoMin * 100, produto.precoMax * 100) / 100,
          categoria: produto.categoria,
          observacao: Math.random() > 0.7 ? observacoes[aleatorio(0, observacoes.length - 1)] : undefined
        };
      });

      const total = itens.reduce((acc, item) => acc + (item.quantidade * item.preco), 0);
      const quantidadeTotal = itens.reduce((acc, item) => acc + item.quantidade, 0);

      return {
        id: Date.now().toString() + aleatorio(1, 1000000),
        data: gerarData().toISOString(),
        itens,
        total,
        quantidadeTotal
      };
    });

    // Ordenar por data
    novasCompras.sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());

    if (window.confirm('Isso irá substituir todo o seu histórico atual por dados fictícios. Deseja continuar?')) {
      setHistorico(novasCompras);
    }
  };

  // Função para encontrar o mês com compra mais cara
  const mesCompraMaisCara = useMemo(() => {
    if (historico.length === 0) return null;
    
    const compraMaisCara = historico.reduce((max, compra) => 
      compra.total > max.total ? compra : max
    , historico[0]);
    
    const data = new Date(compraMaisCara.data);
    return {
      mes: data.toLocaleString('pt-BR', { month: 'long', year: 'numeric' }),
      total: compraMaisCara.total
    };
  }, [historico]);

  // Dados para o gráfico de pizza por categoria
  const dadosGraficoPizza = useMemo(() => {
    if (historico.length === 0) return null;

    const categoriasTotais: Record<string, number> = {};
    
    historico.forEach(compra => {
      compra.itens.forEach(item => {
        const categoria = item.categoria || 'Outros';
        if (!categoriasTotais[categoria]) {
          categoriasTotais[categoria] = 0;
        }
        categoriasTotais[categoria] += item.quantidade * item.preco;
      });
    });

    const cores = [
      'rgba(255, 99, 132, 0.8)',
      'rgba(54, 162, 235, 0.8)',
      'rgba(255, 206, 86, 0.8)',
      'rgba(75, 192, 192, 0.8)',
      'rgba(153, 102, 255, 0.8)',
    ];

    const labels = Object.keys(categoriasTotais);
    const data = labels.map(label => categoriasTotais[label]);
    const backgroundColor = labels.map((_, i) => cores[i % cores.length]);

    return {
      labels,
      datasets: [{
        data,
        backgroundColor,
        borderWidth: 1,
      }],
    };
  }, [historico]);

  const contadorCategorias = useMemo(() => {
    const contador: Record<string, { quantidade: number; total: number }> = {};
    itens.forEach(item => {
      const categoria = item.categoria || 'Outros';
      if (!contador[categoria]) {
        contador[categoria] = { quantidade: 0, total: 0 };
      }
      contador[categoria].quantidade += 1;
      contador[categoria].total += item.quantidade * item.preco;
    });
    return contador;
  }, [itens]);

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

        <section className="">
          <div className="container mx-auto md:px-20 xl:px-0 px-4 max-w-4xl flex justify-start my-4">
            <a
              href="/ComparaPre-o/checklist"
              className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 font-semibold px-4 py-2 rounded-md border border-blue-200 hover:bg-blue-200 transition-colors"
            >
              <CheckCircle size={18} /> Minha Checklist
            </a>
          </div>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
              {/* Orçamento com hierarquia visual */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Controle de Orçamento</span>
                  <div className="h-px flex-1 bg-gray-100"></div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <input
                        type="number"
                        value={orcamento === null ? '' : orcamento}
                        onChange={(e) => setOrcamento(e.target.value === '' ? null : Number(e.target.value))}
                        step="0.01"
                        min="0"
                        className="w-32 px-2 py-1 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="Orçamento disponível"
                      />
                    </div>
                    <span className="text-sm text-gray-400">→</span>
                    <div className="text-sm">
                      <span className="text-gray-500">Total: </span>
                      <span className="font-medium text-gray-700">{formatarPreco(total)}</span>
                    </div>
                  </div>
                  {orcamento !== null && (
                    <div className="text-sm">
                      <span className="text-gray-500">Saldo: </span>
                      <span className={`font-medium ${orcamento - total >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatarPreco(orcamento - total)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Modo Fácil com hierarquia visual */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Configurações</span>
                  <div className="h-px flex-1 bg-gray-100"></div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-medium text-gray-700">Modo Fácil</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={modoFacil}
                      onChange={e => {
                        setModoFacil(e.target.checked);
                        if (e.target.checked) {
                          setNome('');
                          setCategoria('');
                          setUsarCategoria(false);
                        }
                      }}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                  </label>
                  <span className="text-xs text-gray-500">(Sem nome/categoria)</span>
                </div>
              </div>

              {/* Ações com hierarquia visual */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Ações</span>
                  <div className="h-px flex-1 bg-gray-100"></div>
                </div>
                <div className="flex justify-between items-center">
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
              </div>

              <form onSubmit={adicionarItem} className="mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {!modoFacil && (
                    <>
                      <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Item</label>
                        <div className="relative">
                          <input
                            type="text"
                            value={nome}
                            onChange={(e) => {
                              setNome(e.target.value);
                              setMostrarSugestoes(true);
                              setSugestaoSelecionada(-1);
                            }}
                            onFocus={() => setMostrarSugestoes(true)}
                            onKeyDown={handleKeyDown}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md pr-10"
                            required
                            autoComplete="off"
                            placeholder="Digite o nome do produto..."
                          />
                          <Search 
                            size={18} 
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                          />
                        </div>
                        
                        {/* Sugestões de Autocomplete */}
                        {mostrarSugestoes && sugestoesFiltradas.length > 0 && (
                          <div 
                            ref={sugestoesRef}
                            className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto"
                          >
                            {sugestoesFiltradas.map((sugestao, index) => (
                              <button
                                key={sugestao.nome}
                                type="button"
                                onClick={() => selecionarSugestao(sugestao)}
                                className={`w-full text-left px-4 py-2 hover:bg-blue-50 flex items-center justify-between ${
                                  index === sugestaoSelecionada ? 'bg-blue-50' : ''
                                }`}
                              >
                                <span>{sugestao.nome}</span>
                                {sugestao.categoria && (
                                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full flex items-center gap-1">
                                    <Tag size={12} />
                                    {sugestao.categoria}
                                  </span>
                                )}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="block text-sm font-medium text-gray-700">Categoria</label>
                          <label className="flex items-center gap-2 text-sm text-gray-600">
                            <input
                              type="checkbox"
                              checked={usarCategoria}
                              onChange={(e) => {
                                setUsarCategoria(e.target.checked);
                                if (!e.target.checked) {
                                  setCategoria('');
                                }
                              }}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            Usar categorias
                          </label>
                        </div>
                        <select
                          value={categoria}
                          onChange={(e) => setCategoria(e.target.value)}
                          className={`w-full px-3 py-2 border border-gray-300 rounded-md ${
                            !usarCategoria ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                          disabled={!usarCategoria}
                        >
                          <option value="">Selecione uma categoria</option>
                          {categorias.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.nome}</option>
                          ))}
                        </select>
                      </div>
                    </>
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
                    <label 
                      className="block text-sm font-medium text-gray-700 mb-1 cursor-pointer" 
                      onClick={() => setPreco(null)}
                    >
                      Preço (R$)
                    </label>
                    <input
                      type="number"
                      value={preco === null ? '' : preco}
                      onChange={(e) => setPreco(e.target.value === '' ? null : Number(e.target.value))}
                      step="0.01"
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                      placeholder="0,00"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <div className="flex items-center justify-end mb-1">
                      <label className="flex items-center gap-2 text-sm text-gray-600">
                        <input
                          type="checkbox"
                          checked={usarObservacao}
                          onChange={(e) => {
                            setUsarObservacao(e.target.checked);
                            if (!e.target.checked) {
                              setObservacao('');
                            }
                          }}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        Adicionar observação
                      </label>
                    </div>
                    {usarObservacao && (
                      <>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Observação</label>
                        <input
                          type="text"
                          value={observacao}
                          onChange={(e) => setObservacao(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          placeholder="Digite sua observação"
                        />
                      </>
                    )}
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

              {/* Checkbox para mostrar filtro de categoria */}
              <div className="mb-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="toggleFiltroCategoria"
                  checked={mostrarFiltroCategoria}
                  onChange={e => setMostrarFiltroCategoria(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="toggleFiltroCategoria" className="text-sm text-gray-700 cursor-pointer select-none">
                  Filtrar por categoria
                </label>
              </div>
              {mostrarFiltroCategoria && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Filtrar por Categoria</label>
                  <div className="space-y-2">
                    <button
                      onClick={() => setFiltroCategoria('')}
                      className={`w-full flex items-center justify-between px-4 py-2 rounded-lg border transition-colors ${
                        filtroCategoria === '' 
                          ? 'bg-blue-50 border-blue-200' 
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>🛒</span>
                        <span>Todas as categorias</span>
                      </span>
                      <span className="text-sm">
                        {itens.length} {itens.length === 1 ? 'item' : 'itens'}
                      </span>
                    </button>
                    {categorias.map(categoria => {
                      const stats = contadorCategorias[categoria.id] || { quantidade: 0, total: 0 };
                      const isSelected = filtroCategoria === categoria.id;
                      return (
                        <button
                          key={categoria.id}
                          onClick={() => setFiltroCategoria(categoria.id)}
                          className={`w-full flex items-center justify-between px-4 py-2 rounded-lg border transition-colors ${
                            isSelected
                              ? 'bg-green-50 border-green-200'
                              : 'border-gray-200 hover:bg-gray-50'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span>{categoria.icone}</span>
                            <span>{categoria.nome}</span>
                          </span>
                          <div className="text-right">
                            <div className="text-sm">
                              {stats.quantidade} {stats.quantidade === 1 ? 'item' : 'itens'}
                            </div>
                            {stats.quantidade > 0 && (
                              <div className="text-xs text-gray-500">
                                R$ {stats.total.toFixed(2)}
                              </div>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Lista responsiva de itens */}
              <div className="block md:hidden space-y-3">
                {itensFiltrados.length === 0 && (
                  <div className="text-gray-500 text-center py-4">Nenhum item adicionado.</div>
                )}
                {itensFiltrados.map(item => (
                  <div key={item.id} className="bg-gray-50 rounded-lg p-3 shadow flex flex-col gap-1 relative">
                    {editandoItem?.id === item.id ? (
                      <>
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={editandoValores.nome}
                            onChange={(e) => setEditandoValores(prev => ({ ...prev, nome: e.target.value }))}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md"
                            placeholder="Nome do item"
                          />
                          <select
                            value={editandoValores.categoria}
                            onChange={(e) => setEditandoValores(prev => ({ ...prev, categoria: e.target.value }))}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md"
                          >
                            {categorias.map(cat => (
                              <option key={cat.id} value={cat.id}>{cat.nome}</option>
                            ))}
                          </select>
                          <div className="flex gap-2">
                            <input
                              type="number"
                              value={editandoValores.quantidade}
                              onChange={(e) => setEditandoValores(prev => ({ ...prev, quantidade: Number(e.target.value) }))}
                              min="1"
                              className="w-20 px-2 py-1 border border-gray-300 rounded-md"
                            />
                            <input
                              type="number"
                              value={editandoValores.preco}
                              onChange={(e) => setEditandoValores(prev => ({ ...prev, preco: Number(e.target.value) }))}
                              step="0.01"
                              min="0"
                              className="w-24 px-2 py-1 border border-gray-300 rounded-md"
                            />
                          </div>
                        </div>
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => salvarEdicaoInline(item.id)}
                            className="flex-1 bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700"
                          >
                            Salvar
                          </button>
                          <button
                            onClick={cancelarEdicaoInline}
                            className="flex-1 bg-gray-600 text-white px-3 py-1 rounded-md hover:bg-gray-700"
                          >
                            Cancelar
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex gap-2 absolute top-2 right-2">
                          <button
                            onClick={() => iniciarEdicao(item)}
                            className="text-blue-600 hover:text-blue-800"
                            title="Editar"
                          >
                            <Pencil size={18} />
                          </button>
                          <button
                            onClick={() => removerItem(item.id)}
                            className="text-red-600 hover:text-red-800"
                            title="Remover"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                        <div className="font-bold text-blue-700">{item.nome}</div>
                        {item.observacao && (
                          <div className="text-xs text-gray-500">{item.observacao}</div>
                        )}
                        <div className="text-xs text-gray-600">Categoria: <span className="font-medium">{item.categoria}</span></div>
                        <div className="text-xs text-gray-600">Quantidade: <span className="font-medium">{item.quantidade}</span></div>
                        <div className="text-xs text-gray-600">Preço Unit.: <span className="font-medium">R$ {item.preco.toFixed(2)}</span></div>
                        <div className="text-xs text-gray-600">Total: <span className="font-medium">R$ {(item.quantidade * item.preco).toFixed(2)}</span></div>
                      </>
                    )}
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
                          {editandoItem?.id === item.id ? (
                            <input
                              type="text"
                              value={editandoValores.nome}
                              onChange={(e) => setEditandoValores(prev => ({ ...prev, nome: e.target.value }))}
                              className="w-full px-2 py-1 border border-gray-300 rounded-md"
                            />
                          ) : (
                            <div>
                              <div className="font-medium">{item.nome}</div>
                              {item.observacao && (
                                <div className="text-sm text-gray-500">{item.observacao}</div>
                              )}
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-2">
                          {editandoItem?.id === item.id ? (
                            <select
                              value={editandoValores.categoria}
                              onChange={(e) => setEditandoValores(prev => ({ ...prev, categoria: e.target.value }))}
                              className="w-full px-2 py-1 border border-gray-300 rounded-md"
                            >
                              {categorias.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.nome}</option>
                              ))}
                            </select>
                          ) : (
                            item.categoria
                          )}
                        </td>
                        <td className="px-4 py-2">
                          {editandoItem?.id === item.id ? (
                            <input
                              type="number"
                              value={editandoValores.quantidade}
                              onChange={(e) => setEditandoValores(prev => ({ ...prev, quantidade: Number(e.target.value) }))}
                              min="1"
                              className="w-20 px-2 py-1 border border-gray-300 rounded-md"
                            />
                          ) : (
                            item.quantidade
                          )}
                        </td>
                        <td className="px-4 py-2">
                          {editandoItem?.id === item.id ? (
                            <input
                              type="number"
                              value={editandoValores.preco}
                              onChange={(e) => setEditandoValores(prev => ({ ...prev, preco: Number(e.target.value) }))}
                              step="0.01"
                              min="0"
                              className="w-24 px-2 py-1 border border-gray-300 rounded-md"
                            />
                          ) : (
                            `R$ ${item.preco.toFixed(2)}`
                          )}
                        </td>
                        <td className="px-4 py-2">
                          R$ {(item.quantidade * item.preco).toFixed(2)}
                        </td>
                        <td className="px-4 py-2">
                          {editandoItem?.id === item.id ? (
                            <div className="flex gap-2">
                              <button
                                onClick={() => salvarEdicaoInline(item.id)}
                                className="text-green-600 hover:text-green-800"
                                title="Salvar"
                              >
                                <CheckCircle size={18} />
                              </button>
                              <button
                                onClick={cancelarEdicaoInline}
                                className="text-gray-600 hover:text-gray-800"
                                title="Cancelar"
                              >
                                <X size={18} />
                              </button>
                            </div>
                          ) : (
                            <div className="flex gap-2">
                              <button
                                onClick={() => iniciarEdicao(item)}
                                className="text-blue-600 hover:text-blue-800"
                                title="Editar"
                              >
                                <Pencil size={18} />
                              </button>
                              <button
                                onClick={() => removerItem(item.id)}
                                className="text-red-600 hover:text-red-800"
                                title="Remover"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          )}
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
                <div className="flex items-center justify-between pb-4 mb-2 gap-3 flex-wrap">
                  <h2 className="text-2xl font-bold mx-auto pb-4 text-gray-800">Comparativo do Histórico</h2>
                  <div className="flex gap-16 items-center justify-between  mx-auto ">
                    <button
                      onClick={gerarDadosFicticios}
                      className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded text-sm font-semibold border border-blue-300 flex items-center gap-1"
                    >
                      Gerar Dados de Exemplo
                    </button>
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

                {/* Mês com Compra Mais Cara */}
                {mesCompraMaisCara && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-4 mb-8 ">
                    <p className="text-yellow-800">
                      <span className="font-semibold">Mês com maior gasto:</span> {mesCompraMaisCara.mes} - 
                      <span className="font-bold"> {formatarPreco(mesCompraMaisCara.total)}</span>
                    </p>
                  </div>
                )}

                {/* Seletor de Tipo de Gráfico */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
                  <span className="text-sm font-medium text-gray-700">Visualizar:</span>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setTipoGrafico('evolucao')}
                      className={`flex items-center gap-1 px-2 py-1 rounded text-xs sm:text-sm font-medium ${
                        tipoGrafico === 'evolucao'
                          ? 'bg-blue-100 text-blue-700 border border-blue-300'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <TrendingUp size={14} />
                      <span className="hidden sm:inline">Evolução dos</span>
                      <span>Gastos</span>
                    </button>
                    <button
                      onClick={() => setTipoGrafico('quantidade')}
                      className={`flex items-center gap-1 px-2 py-1 rounded text-xs sm:text-sm font-medium ${
                        tipoGrafico === 'quantidade'
                          ? 'bg-blue-100 text-blue-700 border border-blue-300'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <BarChart size={14} />
                      <span className="hidden sm:inline">Quantidade de</span>
                      <span>Itens</span>
                    </button>
                    <button
                      onClick={() => setTipoGrafico('categoria')}
                      className={`flex items-center gap-1 px-2 py-1 rounded text-xs sm:text-sm font-medium ${
                        tipoGrafico === 'categoria'
                          ? 'bg-blue-100 text-blue-700 border border-blue-300'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <PieChart size={14} />
                      <span className="hidden sm:inline">Gastos por</span>
                      <span>Categoria</span>
                    </button>
                  </div>
                </div>

                {/* Gráficos */}
                <div className="mb-8 space-y-6">
                  {tipoGrafico === 'evolucao' && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-base sm:text-lg font-semibold mb-4 flex items-center gap-2">
                        <TrendingUp className="text-blue-600" size={18} />
                        <span className="hidden sm:inline">Evolução dos</span> Gastos
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
                  )}

                  {tipoGrafico === 'quantidade' && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-base sm:text-lg font-semibold mb-4 flex items-center gap-2">
                        <BarChart className="text-blue-600" size={18} />
                        <span className="hidden sm:inline">Quantidade de</span> Itens
                      </h3>
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
                  )}

                  {tipoGrafico === 'categoria' && dadosGraficoPizza && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-base sm:text-lg font-semibold mb-4 flex items-center gap-2">
                        <PieChart className="text-blue-600" size={18} />
                        <span className="hidden sm:inline">Gastos por</span> Categoria
                      </h3>
                      <div className="aspect-square max-w-md mx-auto">
                        <Pie
                          data={dadosGraficoPizza}
                          options={{
                            responsive: true,
                            plugins: {
                              legend: {
                                position: 'right' as const,
                              },
                              tooltip: {
                                callbacks: {
                                  label: function(context) {
                                    const value = context.raw as number;
                                    const total = (context.dataset.data as number[]).reduce((a, b) => a + b, 0);
                                    const percentage = ((value / total) * 100).toFixed(1);
                                    return `${context.label}: ${formatarPreco(value)} (${percentage}%)`;
                                  }
                                }
                              }
                            }
                          }}
                        />
                      </div>
                    </div>
                  )}
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