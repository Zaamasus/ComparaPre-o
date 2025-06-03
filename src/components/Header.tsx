import React, { useState, useEffect } from 'react';
import { Scale, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full top-0 z-50 ${isScrolled ? 'bg-blue-700/95 backdrop-blur-sm shadow-lg' : 'bg-blue-700'}`}>
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-14">
          <div className="flex items-center">
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <Scale className="h-6 w-6 text-white" />
                <span className="text-xl font-bold text-white">ComparaPreço</span>
              </div>
              <span className="text-green-400 text-sm ml-8 font-bold">por Samuel Gomes</span>
            </div>
          </div>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-white hover:text-blue-200 transition-colors">
              Início
            </a>
            <a href="#comparar" className="text-white hover:text-blue-200 transition-colors">
              Comparar Preços
            </a>
            <a href="/calculadora.html" className="text-white hover:text-blue-200 transition-colors">
              Calculadora
            </a>
            <a href="#como-funciona" className="text-white hover:text-blue-200 transition-colors">
              Como Funciona
            </a>
          </div>

          {/* Menu Mobile Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-blue-600 rounded-lg transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
          </button>
        </nav>

        {/* Menu Mobile */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="py-2">
              <a 
                href="/" 
                className="block py-2 text-white hover:text-blue-200 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Início
              </a>
              <a 
                href="#comparar" 
                className="block py-2 text-white hover:text-blue-200 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Comparar Preços
              </a>
              <a 
                href="/calculadora.html" 
                className="block py-2 text-white hover:text-blue-200 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Calculadora
              </a>
              <a 
                href="#como-funciona" 
                className="block py-2 text-white hover:text-blue-200 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Como Funciona
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;