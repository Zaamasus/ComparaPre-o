import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ComparisonForm from './components/ComparisonForm';
import HowItWorks from './components/HowItWorks';
import SavedComparisons from './components/SavedComparisons';
import PartnersAds from './components/PartnersAds';
import { Comparacao } from './types';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
  const [comparacoes, setComparacoes] = useLocalStorage<Comparacao[]>('comparacoes', []);

  const handleSaveComparison = (comparacao: Comparacao) => {
    setComparacoes(prevComparacoes => [comparacao, ...prevComparacoes]);
  };

  const handleDeleteComparison = (id: string) => {
    setComparacoes(prevComparacoes => prevComparacoes.filter(comp => comp.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-blue-700 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  Compare preços e economize nas suas compras
                </h1>
                <p className="text-xl mb-8 text-blue-100">
                  Descubra qual produto oferece o melhor custo-benefício comparando 
                  preços por unidade de peso ou volume.
                </p>
                <a 
                  href="#comparar" 
                  className="inline-block bg-white text-blue-700 font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-50 transition-colors"
                >
                  Começar a Comparar
                </a>
              </div>
              <div className="md:w-1/2 md:pl-10">
                <div className="bg-blue-800 p-8 rounded-lg shadow-lg transform rotate-1">
                  <div className="bg-white p-6 rounded-lg shadow-inner transform -rotate-2">
                    <h3 className="text-blue-700 text-xl font-bold mb-3">Exemplo Rápido:</h3>
                    <div className="space-y-4 text-gray-800">
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
                      <div className="bg-green-100 p-3 rounded-md text-green-800 font-medium">
                        Economia de 9,5% no detergente maior!
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Comparison Section */}
        <section id="comparar" className="py-16">
          <div className="container mx-auto px-4">
            <ComparisonForm onSaveComparison={handleSaveComparison} />
          </div>
        </section>
        
        {/* How It Works Section */}
        <HowItWorks />
        
        {/* Partners Ads Section */}
        <PartnersAds />
        
        {/* Saved Comparisons Section */}
        <section id="historico" className="py-16">
          <div className="container mx-auto px-4">
            <SavedComparisons 
              comparacoes={comparacoes}
              onDelete={handleDeleteComparison}
            />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;