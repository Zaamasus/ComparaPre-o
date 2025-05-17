/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
      },
      colors: {
        blue: {
          50: '#f0f6ff',
          100: '#e0edff',
          200: '#c0daff',
          300: '#94c0ff',
          400: '#609cff',
          500: '#3366CC',
          600: '#2552b3',
          700: '#1e4294',
          800: '#1c387a',
          900: '#1c3165',
        },
        green: {
          50: '#f0fdf6',
          100: '#dcfce9',
          200: '#bbf7d6',
          300: '#86efb0',
          400: '#4ade80',
          500: '#4CAF50',
          600: '#16a34a',
          700: '#158a40',
          800: '#166d38',
          900: '#145a30',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};