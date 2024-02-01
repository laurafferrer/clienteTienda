/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        // Nuevos tonos de rojo
        colorTexto1: '#8B0000', // Rojo oscuro
        colorTexto2: '#8b1700', // Rojo menos oscuro
        colorLink: '#ff6329', // Rojo oscuro salmón
        // Tonos de gris
        darkGray: '#333333',
        mediumGray: '#666666',
        lightGray: '#999999', // Menu y footer
        extraLightGray: '#dbdbdb', //Login
      }
    },
  },
  plugins: [],
}

