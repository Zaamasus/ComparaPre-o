import React from 'react';
import { ShoppingCalculator } from '../components/ShoppingCalculator';

const CalculadoraPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-2 sm:px-4">
      <div className="w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto">
        <ShoppingCalculator />
      </div>
    </div>
  );
};

export default CalculadoraPage; 