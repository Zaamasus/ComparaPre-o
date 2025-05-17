import React from 'react';
import { Scale } from 'lucide-react';

const Footer: React.FC = () => {
  const ano = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white py-6 md:py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-4 md:space-y-6">
          <div className="flex items-center">
            <Scale className="h-6 w-6 md:h-8 md:w-8 mr-2" />
            <span className="text-xl md:text-2xl font-bold">ComparaPreço</span>
          </div>
          
          <div className="flex flex-col items-center space-y-2 md:space-y-3">
            <img 
              src="foto-samuel.png"
              alt="Samuel Gomes"
              className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white shadow-lg"
            />
            <div className="text-center">
              <p className="text-lg md:text-xl font-semibold">Samuel Gomes</p>
              <p className="text-sm md:text-base text-gray-300">Desenvolvedor</p>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-base md:text-lg">© {ano} ComparaPreço</p>
            <p className="text-xs md:text-sm text-gray-400 mt-2">
              Economize dinheiro comparando preços de produtos de forma inteligente.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;