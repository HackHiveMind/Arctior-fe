import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'ark-purple': '#2D1B33',
        'ark-purple-light': '#3D2844',
        'ark-gold': '#C19A6B',
      },
    },
  },
  plugins: [],
};

export default config;
