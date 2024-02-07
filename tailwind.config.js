/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        // Colores marrones
        'KhakiTitulo': '#411917',
        'DarkKhaki': '#672c2c',
        'Khaki': '#8b2f23',
        'PaleGoldenrod': '#884d4d',
        'Moccasin': '#f7896b',
        'KhakiBotones': '#bd5946',
        // Colores grises
        'Gainsboro': '#DCDCDC',
        'LightGray': '#D3D3D3',
        'Silver': '#C0C0C0',
        'DarkGray': '#A9A9A9',
        'Gray': '#8a8a8a',
        // Base
        'White': '#FFFFFF',
        'Black': '#000000',

        'Roig': 'ff0000',
        'Blau': '0000ff',
        'Verd': '008000',
      }
    },
  },
  plugins: [],
}

