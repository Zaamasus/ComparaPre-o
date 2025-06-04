import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ListaComprasPage from './pages/ListaComprasPage';
import ComparisonForm from './components/ComparisonForm';
import HowItWorks from './components/HowItWorks';
import SavedComparisons from './components/SavedComparisons';
import PartnersAds from './components/PartnersAds';
import { Comparacao } from './types';
import useLocalStorage from './hooks/useLocalStorage';
import CalculadoraPage from './pages/CalculadoraPage';

const App: React.FC = () => {
  const [comparacoes, setComparacoes] = useLocalStorage<Comparacao[]>('comparacoes', []);

  const handleSaveComparison = (comparacao: Comparacao) => {
    setComparacoes(prevComparacoes => [comparacao, ...prevComparacoes]);
  };

  const handleDeleteComparison = (id: string) => {
    setComparacoes(prevComparacoes => prevComparacoes.filter(comp => comp.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Routes>
        <Route path="/ComparaPre-o/lista-compras" element={<ListaComprasPage />} />
        <Route path="/ComparaPre-o/" element={
          <>
            <Header />
         
            <main className="flex-grow pt-[57px] md:pt-[65px]">
              {/* Seção Principal */}
              <section className="bg-blue-700 text-white py-8 md:py-16">
                <div className="container mx-auto px-4">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 mb-8 md:mb-0">
                      <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 leading-tight">
                        Compare preços e organize suas compras de forma inteligente
                      </h1>
                      <p className="text-lg md:text-xl mb-6 md:mb-8 text-blue-100">
                        Descubra qual produto oferece o melhor custo-benefício comparando 
                        preços por unidade de medida e use nossa calculadora para planejar 
                        suas compras com economia.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <Link 
                          to="/ComparaPre-o/#comparar" 
                          className="inline-block bg-white text-blue-700 font-semibold py-2.5 md:py-3 px-5 md:px-6 rounded-lg shadow-md hover:bg-blue-50 transition-colors text-sm md:text-base text-center"
                        >
                          Começar a Comparar
                        </Link>

                        <Link 
                          to="/ComparaPre-o/lista-compras" 
                          className="inline-block bg-green-500 text-white font-semibold py-2.5 md:py-3 px-5 md:px-6 rounded-lg shadow-md hover:bg-green-600 transition-colors text-sm md:text-base text-center"
                        >
                          Abrir Lista de Compras
                        </Link>
                      </div>
                    </div>
                    <div className="md:w-1/2 md:pl-10 w-full">
                      <div className="bg-blue-800 p-4 md:p-8 rounded-lg shadow-lg transform rotate-1">
                        <div className="bg-white p-4 md:p-6 rounded-lg shadow-inner transform -rotate-2">
                          <h3 className="text-blue-700 text-lg md:text-xl font-bold mb-3">Exemplo Rápido:</h3>
                          <div className="space-y-3 md:space-y-4 text-gray-800 text-sm md:text-base">
                            <div className="flex justify-between pb-2 border-b">
                              <span>Detergente 500ml:</span>
                              <span className="font-semibold">R$ 7,90</span>
                            </div>
                            <div className="flex justify-between pb-2 border-b">
                              <span>Preço por ml:</span>
                              <span className="font-semibold">R$ 0,0158</span>
                            </div>
                            <div className="flex justify-between pb-2 border-b">
                              <span>Detergente 900ml:</span>
                              <span className="font-semibold">R$ 12,90</span>
                            </div>
                            <div className="flex justify-between pb-2 border-b">
                              <span>Preço por ml:</span>
                              <span className="font-semibold">R$ 0,0143</span>
                            </div>
                            <div className="bg-green-100 p-2 md:p-3 rounded-md text-green-800 font-medium text-sm md:text-base">
                              Economia de 9,5% no detergente maior!
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              
              {/* Seção de Comparação */}
              <section id="comparar" className="py-8 md:py-16 scroll-mt-[65px]">
                <div className="container mx-auto px-4">
                  <ComparisonForm onSaveComparison={handleSaveComparison} />
                </div>
              </section>
              
              {/* Seção Como Funciona */}
              <section id="como-funciona" className="scroll-mt-[65px]">
                <HowItWorks />
              </section>

              {/* Seção de Anúncios dos Parceiros */}
              <PartnersAds />
              
              {/* Seção de Comparações Salvas */}
              <section id="historico" className="py-8 md:py-16 scroll-mt-[65px]">
                <div className="container mx-auto px-4">
                  <SavedComparisons 
                    comparacoes={comparacoes}
                    onDelete={handleDeleteComparison}
                  />
                </div>
              </section>
            </main>
            <Footer />
          </>
        } />
        <Route path="/ComparaPre-o/calculadora" element={<CalculadoraPage />} />
        <Route path="*" element={<Navigate to="/ComparaPre-o/" replace />} />
      </Routes>
    </div>
  );
};

export default App;