/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        slate: '#0B3B59', //Azul
        dark: '#260808', //Rojo vino
        darkRed: '#731D1D', //Rosa oscuro
        red: '#A62E2E', //Rosa 
        lightRed: '#F25C5C', //Rosa claro
      }
    },
  },
  plugins: [],
}

