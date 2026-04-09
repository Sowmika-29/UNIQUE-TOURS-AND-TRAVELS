/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        brand: '#0ea5e9',       // sky blue
        'brand-dark': '#0284c7',
        'brand-light': '#e0f2fe'
      }
    },
  },
  plugins: [],
}
