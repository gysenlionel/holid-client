/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors:
      {
        grayModal: '#645D5A',
        backgroundHeader: '#141414',
        background: '#131218',
        backgroundFrom: '#3D3B42',
        backgroundTo: '#494949',
        orangeMain: '#F44A1F',
        grayCard: '#2E2C32',
        grayBackgroundTo: '#BFBFC0',
        grayX: '#33363F',
        whiteOpacity: 'rgba(255, 255, 255, 0.7)',
        tripadv: '#34E0A1',
      },
      fontFamily: {
        'body': ['EB Garamond', 'serif'],
        'heading': ['Figtree', 'sans-serif']
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('tailwind-scrollbar'),
    require('@tailwindcss/line-clamp'),
  ],
}
