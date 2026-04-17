/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        brand: '#00b1ea',       // Vibrant Cyan from logo
        aqua: '#a4dded',        // Light Aqua from UI elements
        'brand-dark': '#0098ca',
        'brand-light': '#a4dded'
      }
    },
  },
  plugins: [],
}
