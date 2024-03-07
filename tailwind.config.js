/** @type {import('tailwindcss').Config} */

import { amber, cyan, green, gray, red } from 'tailwindcss/colors';

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'rgb(119, 53, 255)',
          light: 'rgb(148, 141, 241)',
          transparent: 'rgba(119, 53, 255, 0.05)',
        },
        secondary: {
          DEFAULT: 'rgb(253, 40, 74)',
        },
        success: green[600],
        warning: amber[600],
        danger: red[600],
        info: cyan[600],
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
  // load these classes so they can be used dynamically (not needed if used elsewhere)
  // https://tailwindcss.com/docs/content-configuration#safelisting-classes
  safelist: [
    {
      pattern:
        /(bg)-(primary|secondary|success|warning|danger|info|default)/,
      variants: ['hover'],
    },
  ],
};
