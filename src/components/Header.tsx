import React, { useState, useEffect } from 'react';
import { Scale, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Controla a mudança de estilo do header ao rolar a página
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-blue-700/95 backdrop-blur-sm shadow-lg' : 'bg-blue-700'
    }`}>
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Scale className="h-6 w-6 md:h-7 md:w-7 mr-2" />
            <div>
              <h1 className="text-base md:text-xl font-bold text-white">ComparaPreço</h1>
              <p className="text-[10px] md:text-xs text-blue-200">por Samuel Gomes</p>
            </div>
          </div>

          {/* Menu Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-white hover:text-blue-200 transition-colors text-sm">
              Início
            </a>
            <a href="#comparar" className="text-white hover:text-blue-200 transition-colors text-sm">
              Comparar
            </a>
            <a href="#como-funciona" className="text-white hover:text-blue-200 transition-colors text-sm">
              Como Funciona
            </a>
            <a href="#historico" className="text-white hover:text-blue-200 transition-colors text-sm">
              Histórico
            </a>
          </nav>

          {/* Botão Menu Mobile */}
          <button 
            onClick={toggleMenu}
            className="block md:hidden p-1.5 hover:bg-blue-600 rounded-lg transition-colors"
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Menu Mobile */}
        {isMenuOpen && (
          <div className="fixed inset-0 top-[57px] bg-blue-700/95 backdrop-blur-sm md:hidden">
            <nav className="container mx-auto px-4 py-6">
              <ul className="space-y-4">
                <li>
                  <a 
                    href="#" 
                    className="flex items-center text-lg text-white hover:text-blue-200 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Início
                  </a>
                </li>
                <li>
                  <a 
                    href="#comparar" 
                    className="flex items-center text-lg text-white hover:text-blue-200 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Comparar
                  </a>
                </li>
                <li>
                  <a 
                    href="#como-funciona" 
                    className="flex items-center text-lg text-white hover:text-blue-200 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Como Funciona
                  </a>
                </li>
                <li>
                  <a 
                    href="#historico" 
                    className="flex items-center text-lg text-white hover:text-blue-200 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Histórico
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;