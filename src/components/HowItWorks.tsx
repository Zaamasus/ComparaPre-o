import React from 'react';
import { Calculator, DollarSign, BarChart, Save } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <Calculator className="h-12 w-12 text-blue-500" />,
      title: 'Insira os Detalhes',
      description: 'Adicione informações como nome, preço e quantidade dos produtos que deseja comparar.'
    },
    {
      icon: <BarChart className="h-12 w-12 text-blue-500" />,
      title: 'Compare os Valores',
      description: 'O sistema calcula automaticamente qual opção oferece o melhor custo-benefício.'
    },
    {
      icon: <DollarSign className="h-12 w-12 text-blue-500" />,
      title: 'Economize Dinheiro',
      description: 'Visualize a diferença de preço por unidade e escolha a opção mais econômica.'
    },
    {
      icon: <Save className="h-12 w-12 text-blue-500" />,
      title: 'Salve suas Comparações',
      description: 'Guarde os resultados para consultar novamente quando precisar.'
    }
  ];

  return (
    <section id="como-funciona" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Como Funciona</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            O ComparaPreço analisa produtos de diferentes tamanhos e preços para 
            determinar qual oferece o melhor valor por unidade de medida.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center transform transition-transform hover:scale-105">
              <div className="flex justify-center mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
              <div className="mt-4">
                <span className="inline-block bg-blue-100 text-blue-800 font-bold rounded-full w-8 h-8 flex items-center justify-center">
                  {index + 1}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-blue-700 text-white p-8 rounded-lg shadow-lg">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
              <h3 className="text-2xl font-bold mb-3">Por que comparar preço por unidade?</h3>
              <p className="mb-4">
                Muitas vezes, as embalagens maiores nem sempre são mais econômicas. 
                Empresas frequentemente usam estratégias de precificação que podem confundir o consumidor.
              </p>
              <p>
                Com o ComparaPreço, você consegue identificar rapidamente qual produto 
                realmente oferece o melhor custo-benefício, economizando dinheiro em suas compras.
              </p>
            </div>
            <div className="md:w-1/3 text-center">
              <div className="bg-white text-blue-700 rounded-lg p-6 shadow-inner">
                <p className="text-4xl font-bold mb-2">30%</p>
                <p className="text-sm uppercase tracking-wide">
                  É o quanto você pode economizar comparando preços por unidade
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;