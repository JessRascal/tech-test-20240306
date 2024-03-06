/** @type {import('tailwindcss').Config} */

import { gray } from 'tailwindcss/colors';

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(253, 40, 74)',
        secondary: 'rgb(119, 53, 255)',
        // for text colours
        high: gray[700],
        medium: gray[600],
        low: gray[400],
        disabled: gray[300],
      },
    },
  },
  plugins: [],
};
