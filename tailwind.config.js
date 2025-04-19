/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef2f7',
          100: '#fde6ef',
          200: '#fbd0e3',
          300: '#f9aacb',
          400: '#f57daa',
          500: '#ed5485',
          600: '#db2c5e',
          700: '#be1f4a',
          800: '#9c1c40',
          900: '#841b3a',
          950: '#4c0a1d',
        },
        secondary: {
          50: '#fcf9ed',
          100: '#f8f2d9',
          200: '#f1e3b3',
          300: '#e9d08a',
          400: '#e1b95f',
          500: '#d9a242',
          600: '#c68834',
          700: '#a4692d',
          800: '#85522b',
          900: '#6d4327',
          950: '#3d2212',
        },
        accent: {
          50: '#f5f3ff',
          100: '#ede8ff',
          200: '#dcd5fe',
          300: '#c3b2fd',
          400: '#a585fb',
          500: '#8b55f6',
          600: '#7934ec',
          700: '#6a22d4',
          800: '#591eac',
          900: '#4a1c8b',
          950: '#2d1165',
        },
      },
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
        serif: ['Lora', 'serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};