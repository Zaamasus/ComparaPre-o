import React, { useState } from 'react';
import { Scale, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-blue-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 md:py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Scale className="h-6 w-6 md:h-8 md:w-8 mr-2 md:mr-3" />
            <div>
              <h1 className="text-lg md:text-2xl font-bold">ComparaPreço</h1>
              <p className="text-xs md:text-sm text-blue-200">por Samuel Gomes</p>
            </div>
          </div>

          {/* Menu Desktop */}
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-lg hover:text-blue-200 transition-colors">
              Início
            </a>
            <a href="#como-funciona" className="text-lg hover:text-blue-200 transition-colors">
              Como Funciona
            </a>
            <a href="#historico" className="text-lg hover:text-blue-200 transition-colors">
              Histórico
            </a>
          </nav>

          {/* Botão Menu Mobile */}
          <button 
            onClick={toggleMenu}
            className="block md:hidden lg:hidden xl:hidden 2xl:hidden p-2 hover:bg-blue-600 rounded-lg transition-colors"
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Menu Mobile */}
        {isMenuOpen && (
          <nav className="block md:hidden lg:hidden xl:hidden 2xl:hidden mt-4 bg-blue-600 rounded-lg overflow-hidden">
            <ul className="py-2">
              <li>
                <a 
                  href="#" 
                  className="block px-4 py-2 hover:bg-blue-700 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Início
                </a>
              </li>
              <li>
                <a 
                  href="#como-funciona" 
                  className="block px-4 py-2 hover:bg-blue-700 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Como Funciona
                </a>
              </li>
              <li>
                <a 
                  href="#historico" 
                  className="block px-4 py-2 hover:bg-blue-700 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Histórico
                </a>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;