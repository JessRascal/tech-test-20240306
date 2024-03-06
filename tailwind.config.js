/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(253, 40, 74)',
        secondary: 'rgb(119, 53, 255)',
      },
    },
  },
  plugins: [],
}
