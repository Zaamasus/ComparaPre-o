import React from 'react';
import { Megaphone, Mail } from 'lucide-react';

const PartnersAds: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-blue-100 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Espaço dos Parceiros</h2>
          <p className="text-gray-600">Em breve, anúncios exclusivos dos nossos parceiros</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex flex-col items-center justify-center min-h-[200px]">
              <Megaphone className="h-12 w-12 text-blue-300 mb-4" />
              <p className="text-gray-500 text-center">
                Espaço reservado para parceiros
              </p>
              <p  className="text-sm text-blue-400 mt-2" >
                Entre em contato para anunciar aqui
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 mb-4">
            Interessado em anunciar? Entre em contato conosco:
          </p>
          <a 
            href="samuelginformatica@gmail.com" 
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md"
          >
            <Mail className="h-5 w-5 mr-2" />
            Enviar Email para Samuel Gomes
          </a>
        </div>
      </div>
    </section>
  );
};

export default PartnersAds;