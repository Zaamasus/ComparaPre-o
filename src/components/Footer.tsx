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
          <div className="text-center md:text-right">
            <p>© {ano} ComparaPreço. Desenvolvido por Samuel Gomes.</p>
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