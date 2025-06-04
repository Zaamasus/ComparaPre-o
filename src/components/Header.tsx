import React, { useState, useEffect } from 'react';
import { Scale, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

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
            <Link to="/ComparaPre-o/" className="flex flex-col">
              <div className="flex items-center space-x-2">
                <Scale className="h-6 w-6 text-white" />
                <span className="text-xl font-bold text-white">ComparaPreço</span>
              </div>
              <span className="text-green-400 text-sm ml-8 font-bold">por Samuel Gomes</span>
            </Link>
          </div>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/ComparaPre-o/" className="text-white hover:text-blue-200 transition-colors">
              Início
            </Link>
            <a href="#comparar" className="text-white hover:text-blue-200 transition-colors">
              Comparar Preços
            </a>
            <Link to="/ComparaPre-o/lista-compras" className="text-white hover:text-blue-200 transition-colors">
              Lista de Compras
            </Link>
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
              <Link 
                to="/ComparaPre-o/" 
                className="block py-2 text-white hover:text-blue-200 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Início
              </Link>
              <a 
                href="#comparar" 
                className="block py-2 text-white hover:text-blue-200 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Comparar Preços
              </a>
              <Link 
                to="/ComparaPre-o/lista-compras" 
                className="block py-2 text-white hover:text-blue-200 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Lista de Compras
              </Link>
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