export const listaComprasTeste = [
  {
    id: 1,
    nome: "Arroz Integral",
    quantidade: 2,
    preco: 8.99,
    categoria: "Alimentos",
    observacao: "Preferência marca X"
  },
  {
    id: 2,
    nome: "Feijão Carioca",
    quantidade: 3,
    preco: 7.50,
    categoria: "Alimentos",
    observacao: "Pacote de 1kg"
  },
  {
    id: 3,
    nome: "Detergente",
    quantidade: 4,
    preco: 2.99,
    categoria: "Limpeza",
    observacao: "Neutro"
  },
  {
    id: 4,
    nome: "Papel Higiênico",
    quantidade: 1,
    preco: 18.90,
    categoria: "Higiene",
    observacao: "Pacote com 12 rolos"
  },
  {
    id: 5,
    nome: "Leite Integral",
    quantidade: 6,
    preco: 4.99,
    categoria: "Bebidas",
    observacao: "Caixa 1L"
  },
  {
    id: 6,
    nome: "Sabão em Pó",
    quantidade: 1,
    preco: 15.90,
    categoria: "Limpeza",
    observacao: "Embalagem 1kg"
  },
  {
    id: 7,
    nome: "Café em Pó",
    quantidade: 2,
    preco: 12.99,
    categoria: "Alimentos",
    observacao: "500g"
  },
  {
    id: 8,
    nome: "Açúcar Refinado",
    quantidade: 1,
    preco: 4.50,
    categoria: "Alimentos",
    observacao: "Pacote 1kg"
  },
  {
    id: 9,
    nome: "Óleo de Soja",
    quantidade: 2,
    preco: 9.99,
    categoria: "Alimentos",
    observacao: "Garrafa 900ml"
  },
  {
    id: 10,
    nome: "Sal Refinado",
    quantidade: 1,
    preco: 2.99,
    categoria: "Alimentos",
    observacao: "Pacote 1kg"
  }
];

export const historicoComprasTeste = [
  {
    id: "1",
    data: new Date(2024, 2, 15).toISOString(),
    itens: [
      {
        id: 101,
        nome: "Café em Pó",
        quantidade: 2,
        preco: 12.99,
        categoria: "Alimentos",
        observacao: "Extra forte"
      },
      {
        id: 102,
        nome: "Açúcar",
        quantidade: 1,
        preco: 4.50,
        categoria: "Alimentos",
        observacao: "Refinado"
      }
    ],
    total: 30.48,
    quantidadeTotal: 3
  },
  {
    id: "2",
    data: new Date(2024, 2, 10).toISOString(),
    itens: [
      {
        id: 201,
        nome: "Sabonete",
        quantidade: 5,
        preco: 2.99,
        categoria: "Higiene",
        observacao: "Neutro"
      },
      {
        id: 202,
        nome: "Shampoo",
        quantidade: 1,
        preco: 18.90,
        categoria: "Higiene",
        observacao: "Anti-caspa"
      }
    ],
    total: 33.85,
    quantidadeTotal: 6
  },
  {
    id: "3",
    data: new Date(2024, 1, 25).toISOString(),
    itens: [
      {
        id: 301,
        nome: "Arroz Branco",
        quantidade: 2,
        preco: 7.99,
        categoria: "Alimentos",
        observacao: "Pacote 5kg"
      },
      {
        id: 302,
        nome: "Feijão Preto",
        quantidade: 2,
        preco: 8.50,
        categoria: "Alimentos",
        observacao: "Pacote 1kg"
      },
      {
        id: 303,
        nome: "Óleo de Soja",
        quantidade: 1,
        preco: 9.99,
        categoria: "Alimentos",
        observacao: "Garrafa 900ml"
      }
    ],
    total: 42.97,
    quantidadeTotal: 5
  }
]; 