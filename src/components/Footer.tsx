import React from 'react';
import { Scale } from 'lucide-react';

const Footer: React.FC = () => {
  const ano = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Scale className="h-6 w-6 mr-2" />
            <span className="text-xl font-semibold">ComparaPreço</span>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 rounded-full border-2 border-white mr-4 overflow-hidden">
                <img 
                  src="/foto-samuel.png" 
                  alt="Samuel Gomes - Desenvolvedor"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p>© {ano} ComparaPreço</p>
                <p className="font-semibold">Desenvolvido por Samuel Gomes</p>
              </div>
            </div>
            <p className="text-sm text-gray-400">
              Economize dinheiro comparando preços de produtos de forma inteligente.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;