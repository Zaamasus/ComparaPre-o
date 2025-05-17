import React from 'react';
import { Scale } from 'lucide-react';

const Footer: React.FC = () => {
  const ano = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-6">
          <div className="flex items-center">
            <Scale className="h-8 w-8 mr-2" />
            <span className="text-2xl font-bold">ComparaPreço</span>
          </div>
          
          <div className="flex flex-col items-center space-y-3">
            <img 
              src="foto-samuel.png"
              alt="Samuel Gomes"
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
            />
            <div className="text-center">
              <p className="text-xl font-semibold">Samuel Gomes</p>
              <p className="text-gray-300">Desenvolvedor</p>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-lg">© {ano} ComparaPreço</p>
            <p className="text-sm text-gray-400 mt-2">
              Economize dinheiro comparando preços de produtos de forma inteligente.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;