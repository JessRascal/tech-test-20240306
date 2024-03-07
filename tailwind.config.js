/** @type {import('tailwindcss').Config} */

import { gray } from 'tailwindcss/colors';

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'rgb(119, 53, 255)',
          light: 'rgb(148, 141, 241)',
        },
        secondary: {
          DEFAULT: 'rgb(253, 40, 74)',
        },
        default: gray[200],
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
