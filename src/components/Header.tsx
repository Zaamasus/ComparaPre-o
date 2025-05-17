import React from 'react';
import { Scale } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Scale className="h-8 w-8 mr-2" />
          <div>
            <h1 className="text-2xl font-bold">ComparaPreço</h1>
            <p className="text-sm text-blue-200">por Samuel Gomes</p>
          </div>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a href="#" className="hover:text-blue-200 transition-colors">
                Início
              </a>
            </li>
            <li>
              <a href="#como-funciona" className="hover:text-blue-200 transition-colors">
                Como Funciona
              </a>
            </li>
            <li>
              <a href="#historico" className="hover:text-blue-200 transition-colors">
                Histórico
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;