import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ShoppingCalculator } from '../components/ShoppingCalculator';

const CalculadoraPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      
      <main className="flex-grow pt-[57px] md:pt-[65px]">
        {/* Seção Principal */}
        <section className="bg-blue-700 text-white py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Calculadora de Lista de Compras
              </h1>
              <p className="text-lg md:text-xl mb-6 text-blue-100 max-w-3xl mx-auto">
                Organize suas compras, calcule o total e economize tempo e dinheiro.
                Adicione itens, quantidades e preços para ter um controle completo do seu orçamento.
              </p>
            </div>
          </div>
        </section>

        {/* Seção da Calculadora */}
        <section className="py-8 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <ShoppingCalculator />
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CalculadoraPage; 