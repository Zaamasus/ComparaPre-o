interface ProdutoPreDefinido {
  nome: string;
  categoria: string;
}

export const produtosPreDefinidos: ProdutoPreDefinido[] = [
  // Alimentos
  { nome: "Arroz", categoria: "Alimentos" },
  { nome: "Feijão", categoria: "Alimentos" },
  { nome: "Macarrão", categoria: "Alimentos" },
  { nome: "Açúcar", categoria: "Alimentos" },
  { nome: "Café", categoria: "Alimentos" },
  { nome: "Óleo de Soja", categoria: "Alimentos" },
  { nome: "Sal", categoria: "Alimentos" },
  { nome: "Farinha de Trigo", categoria: "Alimentos" },
  { nome: "Leite em Pó", categoria: "Alimentos" },
  { nome: "Biscoito", categoria: "Alimentos" },
  { nome: "Molho de Tomate", categoria: "Alimentos" },
  
  // Bebidas
  { nome: "Leite", categoria: "Bebidas" },
  { nome: "Refrigerante", categoria: "Bebidas" },
  { nome: "Suco", categoria: "Bebidas" },
  { nome: "Água Mineral", categoria: "Bebidas" },
  { nome: "Cerveja", categoria: "Bebidas" },
  { nome: "Café Solúvel", categoria: "Bebidas" },
  
  // Limpeza
  { nome: "Detergente", categoria: "Limpeza" },
  { nome: "Sabão em Pó", categoria: "Limpeza" },
  { nome: "Água Sanitária", categoria: "Limpeza" },
  { nome: "Amaciante", categoria: "Limpeza" },
  { nome: "Desinfetante", categoria: "Limpeza" },
  { nome: "Sabão em Barra", categoria: "Limpeza" },
  { nome: "Multiuso", categoria: "Limpeza" },
  { nome: "Esponja", categoria: "Limpeza" },
  
  // Higiene
  { nome: "Papel Higiênico", categoria: "Higiene" },
  { nome: "Sabonete", categoria: "Higiene" },
  { nome: "Shampoo", categoria: "Higiene" },
  { nome: "Condicionador", categoria: "Higiene" },
  { nome: "Creme Dental", categoria: "Higiene" },
  { nome: "Desodorante", categoria: "Higiene" },
  { nome: "Absorvente", categoria: "Higiene" },
  { nome: "Escova de Dentes", categoria: "Higiene" }
]; 