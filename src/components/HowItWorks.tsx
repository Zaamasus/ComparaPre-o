import React from 'react';
import { Calculator, Scale, Share2, ShoppingCart } from 'lucide-react';

const HowItWorks: React.FC = () => {
  return (
    <section className="py-12 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Compare Preços e Economize nas Suas Compras! 🛍️
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Descubra o melhor custo-benefício e organize suas compras de forma inteligente.
            Nossa calculadora e comparador de preços ajudam você a economizar tempo e dinheiro! 💰
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <Scale className="w-12 h-12 text-blue-500 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Compare Preços</h3>
            <p className="text-gray-600">
              Compare preços por unidade (g/kg ou ml/l) e descubra qual produto oferece o melhor valor. 
              Economize comparando diferentes marcas e tamanhos! 📊
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <Calculator className="w-12 h-12 text-blue-500 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Calcule Suas Compras</h3>
            <p className="text-gray-600">
              Use nossa calculadora para organizar sua lista, somar valores e acompanhar o total em tempo real.
              Mantenha suas compras dentro do orçamento! 🧮
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <ShoppingCart className="w-12 h-12 text-blue-500 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Modo Rápido</h3>
            <p className="text-gray-600">
              Adicione itens rapidamente à sua lista ou faça comparações detalhadas.
              Escolha o modo que melhor se adapta às suas necessidades! ⚡
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <Share2 className="w-12 h-12 text-blue-500 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Compartilhe</h3>
            <p className="text-gray-600">
              Compartilhe suas comparações e listas de compras no WhatsApp.
              Ajude amigos e família a economizarem também! 📱
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;