/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        },
        colors: {
          transparent: 'transparent',
          current: 'currentColor',
          black: '#454958',
          white: '#f2f2f2',
          gray: '#e5e5e5',
          orange: {
            100: '#fee2b2',
            200: '#fdcf7f',
            300: '#fdbb4a',
            400: '#fdac1e',
            500: '#fd9e00',
            600: '#fa9200',
            700: '#f48200',
            800: '#ef7200',
            900: '#e65700',
          },
          red: {
            100: '#fec8bd',
            200: '#fda493',
            300: '#fd8069',
            400: '#fd624a',
            500: '#fd422e',
            600: '#f23c2a',
            700: '#e43525',
            800: '#d62e20',
            900: '#bc2017',
          },
          teal: {
            100: '#a0effd',
            200: '#4ae5fd',
            300: '#00d9f9',
            400: '#00cff4',
            500: '#00c5ef',
            600: '#00b5db',
            700: '#00a0bf',
            800: '#008ca5',
            900: '#006976',
          }
        },
    },
    
  },
  plugins: [
    require("daisyui"),
    require('tailwind-scrollbar-hide'),
  ],
}
