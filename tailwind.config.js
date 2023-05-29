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
          yellow: '#ffc542',
          orange: '#ff7e40',
          red: '#fd614a',
          steel: '#e7effe'
        },
    },
    
  },
  plugins: [
    require("daisyui"),
    require('tailwind-scrollbar-hide'),
  ],
}
