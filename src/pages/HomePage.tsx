import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <main className="flex-grow pt-[57px] md:pt-[65px]">
      {/* Seção Principal */}
      <section className="bg-blue-700 text-white py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              ComparaPreço - Seu Assistente de Compras
            </h1>
            <p className="text-lg md:text-xl mb-6 text-blue-100 max-w-3xl mx-auto">
              Compare preços, organize suas compras e economize dinheiro de forma inteligente.
            </p>
            <Link 
              to="/lista-compras"
              className="inline-block bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Criar Lista de Compras
            </Link>
          </div>
        </div>
      </section>

      {/* Seção de Recursos */}
      {/* <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Como o ComparaPreço pode ajudar você
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-semibold mb-3">Listas Organizadas</h3>
              <p className="text-gray-600">
                Crie e organize suas listas de compras de forma simples e eficiente
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-3">Compare Preços</h3>
              <p className="text-gray-600">
                Compare preços entre diferentes estabelecimentos e economize
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-3">Controle de Gastos</h3>
              <p className="text-gray-600">
                Acompanhe seus gastos e mantenha o controle do seu orçamento
              </p>
            </div>
          </div>
        </div>
      </section> */}
    </main>
  );
};

export default HomePage; 