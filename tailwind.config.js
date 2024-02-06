/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        // Colores marrones
        KhakiTitulo: '#ebe58f',
        DarkKhaki: '#BDB76B',
        Khaki: '#F0E68C',
        PaleGoldenrod: '#c8c38f',
        Moccasin: '#febd4b',
        KhakiBotones: '#B0AC6D',
        // Colores grises
        Gainsboro: '#DCDCDC',
        LightGray: '#D3D3D3',
        Silver: '#C0C0C0',
        DarkGray: '#A9A9A9',
        Gray: '#8a8a8a',
      }
    },
  },
  plugins: [],
}

